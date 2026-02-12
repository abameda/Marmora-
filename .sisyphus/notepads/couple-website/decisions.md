# Architectural Decisions — Couple Website

## [2026-02-12T02:11] Task 1: Scaffold
- **Auth**: `jose` library (Edge Runtime compatible) instead of `jsonwebtoken`
- **State**: Upstash Redis for cache + bucket list (no filesystem due to Vercel)
- **Styling**: Tailwind CSS with dark mode (`darkMode: 'class'`)
- **Photo Storage**: Cached in Redis from iCloud API (no local storage)
- **Password**: Single shared password (bcrypt hash in env var)
- **Session**: JWT in httpOnly cookie (7-day expiry)

