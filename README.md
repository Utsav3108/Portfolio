# Portfolio — Utsav Pandya

Public-facing portfolio site + a single-admin panel to edit it. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Prisma (SQLite).

Design system: `design-system.md` (asphalt/steel/beacon-amber palette, mono + serif type pairing). Content source: `details.md`.

## Develop

```bash
npm install        # also runs `prisma generate` via postinstall
npm run db:migrate  # first time only — creates dev.db
npm run db:seed     # first time only — seeds it from the original copy
npm run dev
```

Public site: http://localhost:3000
Admin: http://localhost:3000/admin/login — credentials are in `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH_B64`, base64-encoded bcrypt hash — see the comment in `.env` for why it's not a plain hash).

## Structure

- `app/page.tsx` — homepage, server component reading `SiteContent` + `Project` from the DB via Prisma
- `components/` — public site components (Chip, StatStrip, ProjectCard, DispatchTracker, …)
- `lib/content.ts` — only the roadmap + working-principles copy, which stays static (narrative content, not admin-editable)
- `lib/prisma.ts`, `lib/auth.ts`, `lib/validation.ts`, `lib/rate-limit.ts` — DB client, session/auth helpers, zod schemas, login rate limiter
- `prisma/schema.prisma` — `SiteContent` (singleton profile/hero/stats/practice row) + `Project` (`isFlagship` boolean, ordered)
- `app/admin/login` — public login page; everything else under `app/admin/(dashboard)` is behind auth
- `app/admin/(dashboard)/{projects,profile,stats,practice}` — CRUD/edit screens
- `app/api/admin/*` — route handlers behind `middleware.ts` (session-cookie check)
- `components/admin/` — form primitives (Field, Input, TagInput) + the CRUD forms

## Auth

Single-admin, no user accounts. `POST /api/admin/login` checks email + bcrypt-compared password, signs a JWT (`jose`, HS256) into an httpOnly/SameSite=Lax cookie. `middleware.ts` gates `/admin/**` and `/api/admin/**` (except the login routes). Login is rate-limited (in-memory, per-IP).

## Known limitations — read before deploying

- **SQLite is a local file** (`./dev.db`). Fine for `next dev`/`next start` on a single persistent machine; **will not persist on serverless platforms** (Vercel functions have an ephemeral filesystem) — writes from the admin panel would vanish on the next cold start. Before deploying there, swap the Prisma datasource + driver adapter to a hosted DB (Neon/Vercel Postgres/Turso) and update `DATABASE_URL`; the schema and queries don't need to change.
- **Uploaded photos** go to `public/uploads/` on disk — same ephemeral-filesystem caveat. Swap to a blob store (Vercel Blob, S3, Cloudinary) for anything beyond local use.
- **Middleware naming**: Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`; left as-is for now since it still works (just a build warning) and I didn't want to blind-rename auth-critical code on an unreleased convention without verifying behavior.

## Known content gaps (see `details.md` §7)

LinkedIn URL, WebCodeGenie role details, Stickies repo link, resume PDF.
