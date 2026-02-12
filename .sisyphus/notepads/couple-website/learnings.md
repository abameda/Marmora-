# Learnings — Couple Website

## [2026-02-12T02:11] Task 1: Scaffold
- Used Bun package manager throughout
- Next.js 15 with App Router
- TypeScript strict mode enabled
- Dependencies: `icloud-shared-album`, `@upstash/redis`, `jose`, `bcryptjs`
- Image whitelist configured for `*.icloud-content.com` in next.config.ts
- All files created as placeholders (3-15 lines) — need full implementation in Tasks 2-7
- Bcrypt hash generated for password: `$2b$10$DCl0QMt.79T5eJzXPoG.r.iZv3r4am9.M9O6FWKe1BuScPHSv71L6`

## [2026-02-12T02:41] Task 2: Authentication System

### Implementation Summary
- JWT auth using `jose` library (HS256, 7-day expiry)
- Shared password via bcrypt comparison
- httpOnly session cookie with secure flags
- Middleware-based route protection

### Files Implemented
- `src/lib/auth.ts`: JWT + bcrypt helpers (verifyPassword, createJWT, verifyJWT)
- `src/middleware.ts`: Route protection with JWT verification
- `src/app/api/auth/login/route.ts`: Login endpoint with password validation
- `src/app/login/page.tsx`: Login UI with error handling

### Key Learnings
- **bcrypt hash in .env**: Dollar signs (`$`) in .env files must be escaped (`\$`) to prevent shell interpolation
- **jose library**: Edge Runtime compatible, uses TextEncoder for secret encoding
- **Middleware matcher**: Used negative lookahead pattern `/((?!_next/static|_next/image|favicon.ico).*)` to match all routes except static files
- **Session cookie flags**: httpOnly=true, secure (prod only), sameSite=lax, 7-day expiry (604800 seconds)
- **Public paths**: Login, auth API, cron endpoints, Next.js internals all excluded from auth check

### Verification Results
✅ TypeScript compilation: 0 errors
✅ Production build: Successful
✅ Login with correct password: 200 + session cookie
✅ Login with wrong password: 401 error
✅ Protected route without auth: 307 redirect to /login
✅ Protected route with auth: 200 success

### Next Steps Unblocked
Tasks 3-7 (Gallery, Memories, Bucket List, Cron, Redis) now have working authentication
