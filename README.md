# CodeVolve

An IT training platform for school students and college grads — learn to code alongside school,
ship real projects with industry mentors, and evolve through four stages modeled on the git
workflow: **init → commit → merge → deploy**.

Built on Next.js 16 (App Router, Cache Components/PPR), Clerk auth, and Neon Postgres via Drizzle.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Clerk + Neon credentials (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without env vars set, pages still render;
Clerk falls back to a "keyless" dev mode and DB-backed pages (marketing content, dashboard,
admin) show a "connect a database" placeholder instead of erroring.

**Clerk's keyless dev mode treats every local request as signed in**, purely so you can preview
authenticated UI without setting up real credentials — it does **not** reflect real access
control. Don't use it to judge whether auth/admin gating actually works; that only happens once
real Clerk keys are provisioned (confirmed: `next start` without real keys correctly refuses to
serve any page rather than fall back to an open state).

### Provisioning auth & database

```bash
vercel integration add clerk   # provisions NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY
vercel integration add neon    # provisions DATABASE_URL
vercel env pull .env.local
npm run db:push                # create all tables
npm run db:seed                # populate tracks/modules/lessons/mentors/testimonials
```

### Granting the first admin

There's no self-serve admin signup. After you've signed up for a student account once:

1. Open the [Clerk Dashboard](https://dashboard.clerk.com) → Users → your user → Metadata.
2. Add to **Public metadata**: `{ "role": "admin" }`.
3. Visit `/admin`.

Once you have one admin, grant others from **Students → (their profile) → Grant admin access**
instead of going back to the Clerk Dashboard.

## Project structure

- `app/(marketing)/` — public site (home, tracks, how-it-works, mentors, pricing, legal, etc.)
- `app/dashboard/` — authenticated student app (progress, lesson viewer, profile, settings)
- `app/admin/` — admin-only CMS: tracks/modules/lessons, mentors, testimonials, student roster
  (gated by `lib/admin.ts`'s `verifyAdmin()`, checking Clerk `publicMetadata.role === "admin"`)
- `app/scout-legal/`, `app/scout-landing/` — the separate Scout product's pages, rewritten to
  from `scout.codevolve.com.au` via `proxy.ts` (unrelated to CodeVolve's own content)
- `lib/content.ts` — cached, database-backed reads for tracks/mentors/testimonials (the
  `/admin` counterpart is each `app/admin/**/actions.ts`)
- `lib/evolution.ts` — the `init`/`commit`/`merge`/`deploy` stage constants (static, not
  admin-editable — it's branding/structure, not content)
- `lib/dal.ts` — the data access layer for the *current* student: auth checks (`verifySession`)
  + their own enrollment/progress reads
- `lib/clerk-admin.ts` — admin-only wrapper around Clerk's Backend API (student roster)
- `src/db/schema.ts` — Drizzle schema (content tables + `enrollments` / `lesson_progress`)
- `src/db/seed-data.ts`, `src/db/seed.ts` — the placeholder content and the script that loads it
- `proxy.ts` — Next 16's routing middleware: Clerk auth context + the `scout.*` host rewrites

## Notes for whoever picks this up next

- `/privacy`, `/terms`, `/delete-account` policies are **drafts** and need legal review before
  real student data is collected — see the in-page notices.
- Seed mentor profiles and testimonials (`src/db/seed-data.ts`) are illustrative placeholders,
  not real people — edit them from `/admin` (or re-seed) before launch.
- An AI-powered coding mentor (hint-only chat on lesson pages, via the AI SDK) is a natural next
  feature but is intentionally out of scope for this build.
- Before this content model existed, marketing content shipped compiled into the app with zero
  setup. Now it lives in Postgres — an unprovisioned/unseeded database means an empty site, not
  just a broken dashboard. `npm run db:seed` is a one-command fix once `DATABASE_URL` is set.
