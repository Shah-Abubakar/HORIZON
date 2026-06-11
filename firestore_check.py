#!/usr/bin/env python3
"""
Horizon Firestore Diagnostic & Setup Tool
==========================================
Diagnoses Firestore connection issues and seeds sample data.

Prerequisites:
    pip install firebase-admin

Usage:
    1. Get your Firebase API key:
       https://console.firebase.google.com/project/horizo-n/settings/general
       Copy the "API Key" value

    2. Run this script:
       python firestore_check.py YOUR_API_KEY

    Or for full admin access (seed data, etc.):
       python firestore_check.py --service-account path/to/serviceAccountKey.json
"""

import sys
import json
import urllib.request
import urllib.error
import os

PROJECT_ID = "horizo-n"
FIRESTORE_BASE = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/startup"


def check_read(api_key):
    """Check if we can read from Firestore."""
    url = f"{FIRESTORE_BASE}/startups?key={api_key}&pageSize=10"
    print(f"\n[TEST] Reading startups collection...")
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            if "documents" in data:
                docs = data["documents"]
                print(f"  [OK] Found {len(docs)} startup(s):")
                for doc in docs:
                    name = doc.get("fields", {}).get("name", {}).get("stringValue", "Unknown")
                    doc_id = doc["name"].split("/")[-1]
                    print(f"    - {name} (id: {doc_id})")
                return True
            else:
                print(f"  [OK] Connection works! Collection is empty.")
                return True
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"  [FAIL] HTTP {e.code}: {e.reason}")
        try:
            err = json.loads(body).get("error", {}).get("message", "")
            print(f"    {err}")
        except:
            if body:
                print(f"    {body[:200]}")
        return False
    except Exception as e:
        print(f"  [FAIL] {e}")
        return False


def check_write(api_key):
    """Check if we can write to Firestore."""
    import time
    test_id = f"diag_{int(time.time())}"
    url = f"{FIRESTORE_BASE}/startups/{test_id}?key={api_key}"
    
    data = json.dumps({
        "fields": {
            "name": {"stringValue": "DIAGNOSTIC TEST"},
            "tagline": {"stringValue": "Diagnostic test document"},
            "stage": {"stringValue": "Testing"},
            "founderName": {"stringValue": "Diagnostic"},
            "founderId": {"stringValue": "diagnostic"},
            "createdAt": {"stringValue": "2026-01-01T00:00:00Z"}
        }
    }).encode()
    
    print(f"\n[TEST] Writing test document...")
    
    try:
        req = urllib.request.Request(url, data=data, method="PATCH")
        req.add_header("Content-Type", "application/json")
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(f"  [OK] Write successful!")
            
            # Clean up
            del_req = urllib.request.Request(url, method="DELETE")
            try:
                urllib.request.urlopen(del_req, timeout=10)
                print(f"  [OK] Test document cleaned up")
            except:
                pass
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"  [FAIL] HTTP {e.code}: {e.reason}")
        try:
            err = json.loads(body).get("error", {}).get("message", "")
            print(f"    {err}")
        except:
            if body:
                print(f"    {body[:200]}")
        return False
    except Exception as e:
        print(f"  [FAIL] {e}")
        return False


def diagnose_error(code, message):
    """Provide diagnosis based on error code."""
    print(f"\n{'='*50}")
    print("DIAGNOSIS")
    print(f"{'='*50}")
    
    if code == 403 or "permission" in message.lower() or "forbidden" in message.lower():
        print("""
PROBLEM: Firestore security rules are blocking access.

FIX:
1. Go to: https://console.firebase.google.com/project/horizo-n/firestore/rules
2. Update the rules to:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }

3. Click "Publish"

NOTE: These rules allow public access. For production, use:
   allow read: if true;
   allow write: if request.auth != null;
""")
    elif code == 401 or "unauthorized" in message.lower():
        print("""
PROBLEM: Invalid API key.

FIX:
1. Go to: https://console.firebase.google.com/project/horizo-n/settings/general
2. Under "Your apps", find your Web app
3. Copy the correct API key
""")
    elif code == 404 or "not found" in message.lower():
        print("""
PROBLEM: Firestore database doesn't exist.

FIX:
1. Go to: https://console.firebase.google.com/project/horizo-n/firestore
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a region and click "Enable"
""")
    elif code == 400 or "invalid" in message.lower():
        print("""
PROBLEM: Invalid request format.

This might mean the Firestore API is not enabled.
FIX:
1. Go to: https://console.firebase.google.com/project/horizo-n/firestore
2. Make sure Firestore is enabled
""")
    else:
        print(f"""
PROBLEM: Unexpected error (HTTP {code})

Common causes:
1. Firestore not enabled in Firebase Console
2. Security rules blocking access
3. Network/firewall issues
4. API key restrictions

Check: https://console.firebase.google.com/project/horizo-n/firestore
""")


def seed_with_service_account(sa_path):
    """Seed Firestore using service account (admin access)."""
    try:
        import firebase_admin
        from firebase_admin import credentials, firestore
    except ImportError:
        print("ERROR: firebase-admin not installed. Run: pip install firebase-admin")
        return False
    
    if not os.path.exists(sa_path):
        print(f"ERROR: Service account file not found: {sa_path}")
        return False
    
    try:
        cred = credentials.Certificate(sa_path)
        firebase_admin.initialize_app(cred, {"projectId": PROJECT_ID})
        db = firestore.client()
        print(f"[OK] Firebase Admin initialized")
    except Exception as e:
        print(f"[FAIL] Failed to initialize: {e}")
        return False
    
    # Check existing
# Check existing
existing = list(db.collection("startup").limit(5).stream())
print(f"\n[INFO] Found {len(existing)} existing startup(s)")
    
if existing:
    resp = input("Delete all and re-seed? (y/N): ").strip().lower()
    if resp == 'y':
        for doc in db.collection("startup").stream():
            doc.reference.delete()
        print("[OK] Deleted existing startups")
    else:
        print("Skipping seed.")
        return True
    
# Seed data
startups = [
    {"name": "Nova Labs", "tagline": "Simplifying student payments with UPI", "stage": "Building MVP", "neededSkills": ["React Developer", "UI Designer", "Backend Engineer"], "location": "Remote", "requiredCommitment": "Part-time", "compensation": "Equity", "teamSize": 3, "logo": "NL", "founderName": "Arun R", "founderEmail": "arun@novalabs.com", "founderId": "founder_1", "team": [{"name": "Arun R", "role": "Founder and CEO"}, {"name": "Priya S", "role": "Lead Developer"}]},
    {"name": "Orb", "tagline": "AI-powered content curation for students", "stage": "Just an idea", "neededSkills": ["ML Engineer", "Frontend Developer", "Product Manager"], "location": "Remote", "requiredCommitment": "Weekends", "compensation": "Equity", "teamSize": 2, "logo": "OR", "founderName": "Maria S", "founderEmail": "maria@orb.ai", "founderId": "founder_2", "team": [{"name": "Maria S", "role": "Founder"}]},
    {"name": "FinTrack", "tagline": "Personal finance made simple", "stage": "Launched", "neededSkills": ["Marketing Lead", "Growth Hacker", "Content Creator"], "location": "Hybrid", "requiredCommitment": "Part-time", "compensation": "Stipend plus Equity", "teamSize": 4, "logo": "FT", "founderName": "Rohan K", "founderEmail": "rohan@fintrack.com", "founderId": "founder_3", "team": [{"name": "Rohan K", "role": "Founder"}]},
    {"name": "SkillBridge", "tagline": "Connecting students with industry mentors", "stage": "Building MVP", "neededSkills": ["Full Stack Developer", "UX Designer"], "location": "Remote", "requiredCommitment": "Part-time", "compensation": "Equity", "teamSize": 3, "logo": "SB", "founderName": "Amit P", "founderEmail": "amit@skillbridge.com", "founderId": "founder_4", "team": [{"name": "Amit P", "role": "Founder"}]},
    {"name": "EcoCart", "tagline": "Sustainable shopping made easy", "stage": "Launched", "neededSkills": ["React Native Developer", "Marketing Specialist"], "location": "In-person", "requiredCommitment": "Full-time", "compensation": "Salary plus Equity", "teamSize": 5, "logo": "EC", "founderName": "Sneha M", "founderEmail": "sneha@ecocart.com", "founderId": "founder_5", "team": [{"name": "Sneha M", "role": "Founder and CEO"}]},
]
    
print("\nSeeding startups...")
for s in startups:
    try:
        doc_ref = db.collection("startup").add(s)
        print(f"  [OK] {s['name']} (id: {doc_ref[1].id})")
    except Exception as e:
        print(f"  [FAIL] {s['name']}: {e}")
    
# Verify
count = len(list(db.collection("startup").stream()))
print(f"\n[DONE] {count} startups in Firestore")
return True


def main():
    print("=" * 60)
    print("Horizon Firestore Diagnostic Tool")
    print("=" * 60)
    
    if len(sys.argv) < 2:
        print("\nUsage:")
        print("  Check connection:  python firestore_check.py YOUR_API_KEY")
        print("  Seed with admin:   python firestore_check.py --service-account key.json")
        print("\nGet API key from:")
        print("  https://console.firebase.google.com/project/horizo-n/settings/general")
        print("\nGet service account key from:")
        print("  https://console.firebase.google.com/project/horizo-n/settings/serviceaccounts/adminsdk")
        return
    
    if sys.argv[1] == "--service-account":
        if len(sys.argv) < 3:
            print("ERROR: Provide path to service account JSON file")
            return
        seed_with_service_account(sys.argv[2])
        return
    
    api_key = sys.argv[1]
    
    # Test read
    read_ok = check_read(api_key)
    
    # Test write
    write_ok = check_write(api_key)
    
    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    print(f"  Read:  {'OK' if read_ok else 'FAILED'}")
    print(f"  Write: {'OK' if write_ok else 'FAILED'}")
    
    if not read_ok or not write_ok:
        # Try to get more details about the error
        url = f"{FIRESTORE_BASE}/startups?key={api_key}&pageSize=1"
        try:
            req = urllib.request.Request(url)
            urllib.request.urlopen(req, timeout=10)
        except urllib.error.HTTPError as e:
            body = e.read().decode() if e.fp else ""
            msg = ""
            try:
                msg = json.loads(body).get("error", {}).get("message", "")
            except:
                pass
            diagnose_error(e.code, msg)
        except Exception as e:
            print(f"\nCould not determine error details: {e}")
    else:
        print("\nFirestore is properly connected!")
        print("If startups still don't appear in the app, check the browser console.")


if __name__ == "__main__":
    main()
