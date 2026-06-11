#!/usr/bin/env python3
"""
Horizon Firestore Diagnostic Script
Checks if Firestore is properly connected and accessible.
Uses the Firebase REST API with the web API key.

Usage: python diagnose_firestore.py <API_KEY>
Get your API key from: https://console.firebase.google.com/project/horizo-n/settings/general
"""

import sys
import json
import urllib.request
import urllib.error

PROJECT_ID = "horizo-n"
FIRESTORE_BASE = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents"

def check_firestore(api_key):
    """Check Firestore connection and list startups."""
    url = f"{FIRESTORE_BASE}/startups?key={api_key}&pageSize=10"
    
    print(f"Connecting to Firestore...")
    print(f"URL: {url[:80]}...")
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            
            if "documents" in data:
                docs = data["documents"]
                print(f"[OK] Connection successful! Found {len(docs)} startup(s):")
                for doc in docs:
                    name = doc.get("fields", {}).get("name", {}).get("stringValue", "Unknown")
                    doc_id = doc["name"].split("/")[-1]
                    print(f"  - {name} (id: {doc_id})")
                return True
            else:
                print(f"[OK] Connection successful! Collection is empty (no startups)")
                return True
                
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"[ERROR] HTTP {e.code}: {e.reason}")
        try:
            err_data = json.loads(body)
            err_msg = err_data.get("error", {}).get("message", body)
            print(f"  Message: {err_msg}")
        except:
            print(f"  Body: {body[:300]}")
        
        if e.code == 403:
            print("\n[DIAGNOSIS] Firestore security rules are blocking access!")
            print("FIX: Go to Firebase Console > Firestore > Rules")
            print("Make sure reads are allowed:")
            print('  allow read: if true;')
        elif e.code == 401:
            print("\n[DIAGNOSIS] Invalid API key!")
        elif e.code == 404:
            print("\n[DIAGNOSIS] Firestore database not found!")
            print("FIX: Go to Firebase Console > Firestore > Create database")
        return False
        
    except urllib.error.URLError as e:
        print(f"[ERROR] Connection failed: {e.reason}")
        print("[DIAGNOSIS] Check your internet connection")
        return False
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}")
        return False


def check_write_access(api_key):
    """Try to write a test document to check write permissions."""
    import time
    test_id = f"test_{int(time.time())}"
    url = f"{FIRESTORE_BASE}/startups/{test_id}?key={api_key}"
    
    data = json.dumps({
        "fields": {
            "name": {"stringValue": "DIAGNOSTIC TEST"},
            "tagline": {"stringValue": "This is a test document"},
            "stage": {"stringValue": "Testing"},
            "founderName": {"stringValue": "Diagnostic Script"},
            "founderId": {"stringValue": "diagnostic_test"},
            "createdAt": {"stringValue": "2026-01-01T00:00:00Z"}
        }
    }).encode()
    
    print(f"\nTesting write access (creating test doc: {test_id})...")
    
    try:
        req = urllib.request.Request(url, data=data, method="PATCH")
        req.add_header("Content-Type", "application/json")
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read().decode())
            print(f"[OK] Write successful!")
            print(f"  Document: {result.get('name', 'unknown')}")
            
            # Clean up - delete test doc
            del_req = urllib.request.Request(url, method="DELETE")
            try:
                urllib.request.urlopen(del_req, timeout=10)
                print(f"[OK] Test document cleaned up")
            except:
                print(f"[INFO] Could not delete test doc (may need manual cleanup)")
            return True
            
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"[ERROR] Write failed - HTTP {e.code}: {e.reason}")
        try:
            err_data = json.loads(body)
            err_msg = err_data.get("error", {}).get("message", body)
            print(f"  Message: {err_msg}")
        except:
            print(f"  Body: {body[:300]}")
        
        if e.code == 403:
            print("\n[DIAGNOSIS] Firestore security rules are blocking WRITES!")
            print("FIX: Go to Firebase Console > Firestore > Rules")
            print("Change rules to allow writes:")
            print('  allow write: if true;')
            print("Or for authenticated users only:")
            print('  allow write: if request.auth != null;')
        return False
        
    except Exception as e:
        print(f"[ERROR] Write test failed: {e}")
        return False


def main():
    print("="*60)
    print("Horizon Firestore Diagnostic")
    print("="*60)
    
    if len(sys.argv) < 2:
        print("\nUsage: python diagnose_firestore.py <API_KEY>")
        print("\nTo get your API key:")
        print("1. Go to https://console.firebase.google.com/project/horizo-n/settings/general")
        print("2. Under 'Your apps', find the Web app")
        print("3. Copy the 'API Key' value")
        print("4. Run: python diagnose_firestore.py YOUR_API_KEY")
        sys.exit(1)
    
    api_key = sys.argv[1]
    
    # Test read
    read_ok = check_firestore(api_key)
    
    # Test write
    write_ok = check_write_access(api_key)
    
    print("\n" + "="*60)
    print("Summary:")
    print(f"  Read access:  {'OK' if read_ok else 'FAILED'}")
    print(f"  Write access: {'OK' if write_ok else 'FAILED'}")
    print("="*60)
    
    if not read_ok or not write_ok:
        print("\nMost likely cause: Firestore Security Rules")
        print("Go to: https://console.firebase.google.com/project/horizo-n/firestore/rules")
        print("\nRecommended rules for development:")
        print("  rules_version = '2';")
        print("  service cloud.firestore {")
        print("    match /databases/{database}/documents {")
        print("      match /{document=**} {")
        print("        allow read, write: if true;")
        print("      }")
        print("    }")
        print("  }")
    else:
        print("\nFirestore is properly connected!")
        print("If startups still don't appear, the issue is in the JavaScript code.")

if __name__ == "__main__":
    main()
