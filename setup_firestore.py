#!/usr/bin/env python3
"""
Horizon Firestore Setup Script
Seeds the Firestore database with sample startups data.
Uses Firebase Admin SDK with a service account key.

Usage:
    1. Get your service account key from Firebase Console:
       https://console.firebase.google.com/project/horizo-n/settings/serviceaccounts/adminsdk
       Click "Generate new private key" and download the JSON file.
    
    2. Save the file as 'serviceAccountKey.json' in the same directory as this script.
    
    3. Run: python setup_firestore.py
"""

import json
import os
import sys
import firebase_admin
from firebase_admin import credentials, firestore

# Configuration
PROJECT_ID = "horizo-n"
SERVICE_ACCOUNT_FILE = "serviceAccountKey.json"

# Sample startup data (matching the data in startup.js)
SAMPLE_STARTUPS = [
    {
        "name": "Nova Labs",
        "tagline": "Simplifying student payments with UPI",
        "stage": "Building MVP",
        "neededSkills": ["React Developer", "UI Designer", "Backend Engineer"],
        "location": "Remote",
        "requiredCommitment": "Part-time",
        "compensation": "Equity",
        "teamSize": 3,
        "logo": "NL",
        "founderName": "Arun R",
        "founderEmail": "arun@novalabs.com",
        "founderId": "founder_1",
        "team": [
            {"name": "Arun R", "role": "Founder and CEO", "email": "arun@novalabs.com"},
            {"name": "Priya S", "role": "Lead Developer", "email": "priya@novalabs.com"}
        ]
    },
    {
        "name": "Orb",
        "tagline": "AI-powered content curation for students",
        "stage": "Just an idea",
        "neededSkills": ["ML Engineer", "Frontend Developer", "Product Manager"],
        "location": "Remote",
        "requiredCommitment": "Weekends",
        "compensation": "Equity",
        "teamSize": 2,
        "logo": "OR",
        "founderName": "Maria S",
        "founderEmail": "maria@orb.ai",
        "founderId": "founder_2",
        "team": [{"name": "Maria S", "role": "Founder", "email": "maria@orb.ai"}]
    },
    {
        "name": "FinTrack",
        "tagline": "Personal finance made simple",
        "stage": "Launched",
        "neededSkills": ["Marketing Lead", "Growth Hacker", "Content Creator"],
        "location": "Hybrid",
        "requiredCommitment": "Part-time",
        "compensation": "Stipend plus Equity",
        "teamSize": 4,
        "logo": "FT",
        "founderName": "Rohan K",
        "founderEmail": "rohan@fintrack.com",
        "founderId": "founder_3",
        "team": [{"name": "Rohan K", "role": "Founder", "email": "rohan@fintrack.com"}]
    },
    {
        "name": "SkillBridge",
        "tagline": "Connecting students with industry mentors",
        "stage": "Building MVP",
        "neededSkills": ["Full Stack Developer", "UX Designer"],
        "location": "Remote",
        "requiredCommitment": "Part-time",
        "compensation": "Equity",
        "teamSize": 3,
        "logo": "SB",
        "founderName": "Amit P",
        "founderEmail": "amit@skillbridge.com",
        "founderId": "founder_4",
        "team": [{"name": "Amit P", "role": "Founder", "email": "amit@skillbridge.com"}]
    },
    {
        "name": "EcoCart",
        "tagline": "Sustainable shopping made easy",
        "stage": "Launched",
        "neededSkills": ["React Native Developer", "Marketing Specialist"],
        "location": "In-person",
        "requiredCommitment": "Full-time",
        "compensation": "Salary plus Equity",
        "teamSize": 5,
        "logo": "EC",
        "founderName": "Sneha M",
        "founderEmail": "sneha@ecocart.com",
        "founderId": "founder_5",
        "team": [{"name": "Sneha M", "role": "Founder and CEO", "email": "sneha@ecocart.com"}]
    }
]


def init_firebase():
    """Initialize Firebase Admin SDK."""
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"ERROR: {SERVICE_ACCOUNT_FILE} not found!")
        print()
        print("To get your service account key:")
        print("1. Go to https://console.firebase.google.com/project/horizo-n/settings/serviceaccounts/adminsdk")
        print("2. Click 'Generate new private key'")
        print("3. Save the downloaded file as 'serviceAccountKey.json' in this directory")
        print("4. Run this script again")
        sys.exit(1)
    
    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_FILE)
        firebase_admin.initialize_app(cred, {"projectId": PROJECT_ID})
        print(f"[OK] Firebase initialized for project: {PROJECT_ID}")
        return firestore.client()
    except Exception as e:
        print(f"[ERROR] Failed to initialize Firebase: {e}")
        sys.exit(1)


def check_startups(db):
    """Check existing startups in Firestore."""
    try:
        docs = db.collection("startup").limit(5).get()
        count = len(docs)
        print(f"[INFO] Found {count} startup(s) in Firestore")
        for doc in docs:
            data = doc.to_dict()
            print(f"  - {data.get('name', 'Unknown')} (id: {doc.id})")
        return count
    except Exception as e:
        print(f"[ERROR] Failed to query startups: {e}")
        return -1


def seed_startups(db):
    """Seed sample startups into Firestore."""
    print("\nSeeding startups...")
    
    # Check if already seeded
    existing = check_startups(db)
    if existing > 0:
        response = input("\nStartups already exist. Overwrite? (y/N): ").strip().lower()
        if response != 'y':
            print("Skipping seed.")
            return
    
    # Delete existing startups
    try:
        docs = db.collection("startup").stream()
        deleted = 0
        for doc in docs:
            doc.reference.delete()
            deleted += 1
        if deleted:
            print(f"[OK] Deleted {deleted} existing startup(s)")
    except Exception as e:
        print(f"[WARN] Could not delete existing startups: {e}")
    
    # Add sample startups
    added = 0
    for startup in SAMPLE_STARTUPS:
        try:
            doc_ref = db.collection("startup").add(startup)
            print(f"  [OK] Added: {startup['name']} (id: {doc_ref[1].id})")
            added += 1
        except Exception as e:
            print(f"  [ERROR] Failed to add {startup['name']}: {e}")
    
    print(f"\n[DONE] Added {added}/{len(SAMPLE_STARTUPS)} startups to Firestore")


def verify_firestore_rules():
    """Print Firestore security rules recommendation."""
    print("\n" + "="*60)
    print("IMPORTANT: Firestore Security Rules")
    print("="*60)
    print("""
Make sure your Firestore security rules allow reads/writes.
Go to: https://console.firebase.google.com/project/horizo-n/firestore/rules

For development, use these rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /startups/{document} {
      allow read, write: if true;
    }
    match /users/{document} {
      allow read, write: if true;
    }
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

WARNING: These rules allow public access. For production,
restrict to authenticated users:
    allow read: if true;
    allow write: if request.auth != null;
""")


def main():
    print("="*60)
    print("Horizon Firestore Setup")
    print("="*60)
    
    db = init_firebase()
    
    print("\nOptions:")
    print("  1. Seed sample startups")
    print("  2. Check existing startups")
    print("  3. Seed + verify")
    print("  4. Show Firestore rules recommendation")
    print("  5. Exit")
    
    while True:
        choice = input("\nChoose (1-5): ").strip()
        
        if choice == '1':
            seed_startups(db)
        elif choice == '2':
            check_startups(db)
        elif choice == '3':
            seed_startups(db)
            print("\nVerifying...")
            check_startups(db)
        elif choice == '4':
            verify_firestore_rules()
        elif choice == '5':
            print("Bye!")
            break
        else:
            print("Invalid choice")


if __name__ == "__main__":
    main()
