# Portfolio — Utsav Pandya

Public-facing portfolio site + a single-admin panel to edit it. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Prisma (Postgres) + Vercel Blob.

Design system: `design-system.md` (asphalt/steel/beacon-amber palette, mono + serif type pairing). Content source: `details.md`.

## First-time setup

### Dev runs on local Docker Postgres — prod runs on Neon

`.env` is local-only (gitignored, never deployed) and is already set up for this: `docker-compose.yml` defines a local Postgres container, and `.env`'s `DATABASE_URL` points at it. **Never replace that with a production connection string** — local dev means creating/deleting test data and running migrations against a live schema on purpose, which is exactly what you don't want happening to your real site's DB.

- **Local dev**: Docker Postgres (`docker-compose.yml`), already wired up in `.env`. Nothing to provision.
- **Production**: a Neon database, created via the Vercel dashboard (Storage tab) or neon.tech directly when you deploy — its connection string goes **only** into Vercel's project environment variables, never into a file on your machine.

Both use the same schema and the same driver adapter (`@prisma/adapter-pg`, standard `pg` — works identically against Docker locally and Neon in prod over its pooled connection string), so there's no dev/prod code split to maintain.

Photo uploads (Vercel Blob) still need a real token even in dev, since it's a hosted service — see below.

### Setup steps

```bash
docker compose up -d   # starts local Postgres
npm install             # also runs `prisma generate` via postinstall
npm run db:migrate      # first time only — creates the schema
npm run db:seed         # first time only — seeds it from the original copy
npm run dev
```

For photo uploads to work in dev, create a Blob store (Vercel dashboard → Storage) and put its token in `BLOB_READ_WRITE_TOKEN` in `.env`. Everything else works without it.

Public site: http://localhost:3000
Admin: http://localhost:3000/admin/login — credentials are in `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH_B64`, base64-encoded bcrypt hash — see the comment in `.env` for why it's not a plain hash).

## Deploying (Vercel)

One deployment — the admin panel and its API routes ship as part of the same Next.js app, there's no separate backend to host. In the Vercel project settings (**not** in local `.env`):

1. Connect a **production** Postgres store (Neon, via the Storage tab) and a **production** Blob store — separate from your local Docker DB — this auto-injects `DATABASE_URL` / `BLOB_READ_WRITE_TOKEN` as production env vars, scoped to Vercel only. Use Neon's *pooled* connection string (not the direct one) since Vercel functions are serverless — the standard `pg` adapter needs pooling to avoid connection exhaustion under concurrent requests.
2. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH_B64`, `SESSION_SECRET` as production env vars too (same values as local, or rotate them — your call).
3. Deploy. Run `npx prisma migrate deploy` once (with the production `DATABASE_URL` set in your shell, *not* the Docker one from local `.env`) to apply the schema, then `npm run db:seed` against it if it's a fresh database.

## Structure

- `app/page.tsx` — homepage, server component reading `SiteContent` + `Project` (+ `Phase`) from the DB via Prisma
- `components/` — public site components (Chip, StatStrip, ProjectCard, DispatchTracker, …)
- `lib/prisma.ts` — Prisma client using `@prisma/adapter-pg` (standard `pg` Pool) — same code path for Docker locally and Neon in prod
- `lib/auth.ts`, `lib/validation.ts`, `lib/rate-limit.ts` — session/auth helpers, zod schemas, login rate limiter
- `prisma/schema.prisma` — `SiteContent` (singleton profile/hero/stats/practice row), `Project` (`isFlagship`, `whyItMatters`, ordered), `Phase` (per-project dispatch-tracker milestones)
- `docker-compose.yml` — local Postgres for dev
- `app/admin/login` — public login page; everything else under `app/admin/(dashboard)` is behind auth
- `app/admin/(dashboard)/{projects,profile,stats,practice}` — CRUD/edit screens
- `app/api/admin/*` — route handlers behind `middleware.ts` (session-cookie check); `upload/route.ts` streams straight to Vercel Blob
- `components/admin/` — form primitives (Field, Input, TagInput) + the CRUD forms

## Auth

Single-admin, no user accounts. `POST /api/admin/login` checks email + bcrypt-compared password, signs a JWT (`jose`, HS256) into an httpOnly/SameSite=Lax cookie. `middleware.ts` gates `/admin/**` and `/api/admin/**` (except the login routes). Login is rate-limited (in-memory, per-IP).

## Known limitations

- **Middleware naming**: Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`; left as-is for now since it still works (just a build warning) and I didn't want to blind-rename auth-critical code on an unreleased convention without verifying behavior.
- **Login rate limiter is in-memory** — per server instance, resets on redeploy/restart. Fine for a single-admin site; wouldn't hold up as a real anti-abuse measure at scale.

## Known content gaps (see `details.md` §7)

LinkedIn URL, WebCodeGenie role details, Stickies repo link, resume PDF.
