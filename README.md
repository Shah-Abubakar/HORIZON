# HORIZON — Student Founder Platform

**Status: 🟡 Active Development — Pre-Alpha**

A platform connecting student founders, builders, and collaborators. Find co-founders, join startups, or recruit team members — all within the student ecosystem.

---

##  Current Status

| Aspect | Progress |
|--------|----------|
| Authentication (Supabase + Google) | Complete |
| User profiles | 80% complete |
| Startups listing & creation | Complete |
| Smart discovery algorithm | 60% complete |
| Real-time chat | ⏳ Not started |
| Collaboration posts | ⏳ Not started |
| Horizon Score (gamification) | 30% complete |

**Last updated:** June 12, 2026

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Supabase** | Auth + PostgreSQL database + Realtime |
| **HTML/CSS/JS** | Frontend (no framework) |
| **Tailwind CSS** | Styling |
| **Custom ML logic** | Smart matching algorithm (discovery.js) |

---

## Features (Implemented)

- ✅ Google OAuth sign-in
- ✅ User onboarding (4-step flow)
- ✅ Profile creation (bio, skills, looking for, projects)
- ✅ Startup creation and editing
- ✅ Startup search (name, skills, founder)
- ✅ Smart match scores (based on skills + stage + intent)
- ✅ Real-time startup updates (Supabase Realtime)
- ✅ Save startups for later

---

## In Progress

-  Smart Discovery feed (personalized recommendations)
-  Collaboration posts
-  Horizon Score system
-  Direct messaging

---

## Quick Start (Local)

```bash
# 1. Clone the repo
git clone https://github.com/Shah-Abubakar/HORIZON.git

# 2. Open index.html in your browser
# No build step required — all CDN-based
