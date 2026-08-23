# Portfolio Content Inventory — Utsav Pandya

Source material for the portfolio site. Compiled from prior conversations plus a pass over the public GitHub profile. Gaps flagged at the bottom.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Utsav Pandya |
| Role | iOS Developer |
| Experience | 2 years professional |
| Current employer | WebCodeGenie Technology Pvt Ltd, Ahmedabad |
| Location | Ahmedabad, Gujarat, India |
| GitHub | https://github.com/Utsav3108 |
| X / Twitter | [@imutsavpandya](https://twitter.com/imutsavpandya) |
| Primary audience for site | Hiring managers & recruiters |
| Secondary audiences | Ripple early adopters, investors |

**Positioning angle:** iOS developer by trade; the shipped work spans full-stack product building — FastAPI backends, AI orchestration, cross-platform mobile, web frontends, infrastructure. Lead with "builds complete products," not "writes Swift."

---

## 2. Employment

### WebCodeGenie Technology Pvt Ltd — iOS Developer
Ahmedabad-based IT services and web/mobile development company (founded 2017, ~40+ staff, offshore development model, clients ranging from startups to enterprises). Services span web, mobile app development, cloud, and data.

> **Needs from you:** job title as written on your resume, start date, and 2–3 concrete things you shipped or owned. Agency work is often under NDA — if so, describe the domain and your contribution without naming clients ("led iOS build for a US healthcare scheduling client, 30k MAU").

---

## 3. Projects

### Ripple — AI personas with mood states
A platform simulating AI personas of historical and notable figures, with **dynamic mood states**: personas shift tone and disposition over a conversation rather than responding as a static character.

- **Live:** https://ripple-web-utsav-1d89.vercel.app/login
- **Backend:** https://github.com/Utsav3108/Ripple-Backend
- **Flutter app:** https://github.com/Utsav3108/Ripple
- **Web app:** https://github.com/Utsav3108/Ripple-Web
- **Admin panel:** https://github.com/Utsav3108/Ripple-Admin-Panel

**Stack:** FastAPI · Gemini · Flutter · React · Redis · AWS · Vercel

**Why it carries the portfolio:** it's a five-repo system, not an app. Mobile client, web client, admin surface, and backend — that's the strongest available evidence of architectural range. The mood-state model is the intellectual differentiator; most persona chatbots are a system prompt and nothing else. Write the case study around how mood is represented, persisted, and decayed across a session.

**Tagline in use:** *Chat with anybody — beyond the timeline.*

> **Two things to fix before recruiters see this:**
> 1. The live link lands on `/login`. A hiring manager will not create an account. Either expose a demo persona pre-login, or record a 30–60s screen capture and embed it on the case study page.
> 2. `Ripple-Backend`'s GitHub description currently reads "A backend for President WhatsApp." That's a stale internal name and it undercuts the project. Rewrite all five repo descriptions to match how the site presents Ripple.

---

### NexaFlow — patient flow & consultation management
An intelligent patient queue platform for clinics. Patients scan a hospital QR to join a doctor's queue and get a live position plus a dynamic wait estimate; doctors run the consultation lifecycle, and each completed consultation feeds back into that doctor's historical stats.

- **Repo:** https://github.com/Utsav3108/NexaFlow (backend; iOS client maintained separately)
- **iOS:** SwiftUI, Swift Concurrency
- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL, Alembic, uv
- **Realtime:** live queue state pushed to clients

**The technical detail worth leading with:** ETA uses the **median** consultation duration per doctor, not the mean — one 45-minute outlier in a set of ~20-minute consultations doesn't distort everyone's estimate. Small decision, clearly reasoned, and exactly the kind of thing that separates a real engineer from a tutorial follower in an interview.

**Roadmap as stated:** Phase 1 smart-queue MVP → Phase 2 context-aware ETA (new vs returning patient, consultation type, time of day) → Phase 3 evaluate regression models *against the Phase 1 median baseline*.

**Product philosophy on record:** technology should solve the waiting problem, not just digitize it.

**Status:** early development, Phase 1.

> **This is your strongest iOS story.** It's SwiftUI + Swift Concurrency + a backend you also built, in a real domain, with a measurable outcome. If you only write one deep case study, consider making it this one rather than Ripple.

---

### Stickies — offline-first notes
A privacy-focused, **fully offline** note-taking app.

- **Framework:** Flutter
- **Auth:** local, device-level — no accounts, no server
- **Feature:** color-coded data types
- **Core constraint:** no network dependency; data never leaves the device

**Why it belongs:** it's a stance, not just an app, and it's the counterweight to Ripple. One is a distributed AI system; the other is a deliberate exercise in constraint. Together they show you pick architecture to fit the problem instead of defaulting to one.

---

### Rentals
Addresses the rental-search problem for everyday users. https://github.com/Utsav3108/Rentals

> **Needs from you:** stack, status, and whether this is portfolio-grade or archive. If it's an old college project, leave it off the site.

---

### Portfolio site (this project)
The site is itself a work sample.

- **Stack:** Next.js (App Router), Tailwind, TypeScript
- **Spec covers:** IA, design tokens, typography, component specs, content inventory, phased roadmap
- **Progress:** Phases 0 and 1 complete

**Locked design decisions:**

| Element | Decision |
|---|---|
| Palette | Warm light — bone paper, ink, oxblood accent |
| Display / italic | Newsreader (dominant role) |
| Masthead signature | Archivo (this use only) |
| Utility text | IBM Plex Mono (all of it) |
| Hero | Minimal masthead; name as small byline; large Newsreader italic thesis headline as dominant element; scannable mono-label definition list in place of prose |
| Signature component | Dispatch tracker — milestone timeline styled like a shipping tracker |

**Cut deliberately:** variable font load animation, concentric ripple arcs. Both judged ornamental.
**Superseded:** Fraunces, swapped for reading as generic.
**Open bug:** container width mismatch — hero renders narrower than the Practice section below it.

---

## 4. Skills — evidenced, not claimed

Every item below maps to a shipped repo.

**iOS / Mobile**
SwiftUI · Swift Concurrency · Flutter / Dart · local device authentication · offline-first data architecture · QR-based flows

**Backend**
Python · FastAPI · SQLAlchemy · PostgreSQL · Alembic · Redis · uv · realtime communication · REST API design

**AI / ML**
Gemini integration · persona and mood-state modeling · median-baseline ETA estimation, with a stated plan to evaluate regression models against that baseline

**Web**
React · Next.js (App Router) · TypeScript · Tailwind CSS

**Infrastructure**
AWS · Vercel

**Data (earlier focus — GitHub bio still reads "Data Science enthusiast")**
scikit-learn · NumPy · pandas · Matplotlib · Django · Node.js

> Decide whether the data-science framing is part of the story or a leftover. If it isn't, update the GitHub bio — it's the first thing a recruiter reads after clicking through from your site, and right now it contradicts the positioning.

---

## 5. Working principles

Genuine positions from the build process — usable as site copy:

- **Decoration has to earn its place.** Ornamental flourishes were cut for a single purposeful signature component.
- **Foundation before surface.** Design system before copy; structure before polish.
- **Generic is a failure state.** The first build was rejected specifically for reading as a template.
- **Judge the artifact, not the description.** Rendered specimens over written explanations.
- **Baseline before sophistication.** NexaFlow ships the median first and holds ML to the standard of beating it — the same instinct as cutting the ripple arcs.
- **Converge fast.** Once a direction is confirmed, move.

---

## 6. Suggested structure

```
/                     Hero (thesis headline + mono definition list)
                      Practice
                      Selected Work — NexaFlow, Ripple, Stickies
                      Dispatch tracker
                      Contact

/work/nexaflow        Case study — median-ETA reasoning, SwiftUI + FastAPI
/work/ripple          Case study — mood-state architecture, five-surface system
/work/stickies        Case study — the offline-first argument
/about                Short. Principles, not biography.
```

Three projects on the homepage. Rentals and the older repos stay on GitHub.

---

## 7. Still missing

- [ ] Email / preferred contact method
- [ ] LinkedIn URL
- [ ] Job title, start date, and 2–3 shipped outcomes at WebCodeGenie
- [ ] Any App Store apps from professional work — named, or NDA-safe descriptions
- [ ] Education
- [ ] Stickies repo link and distribution status (App Store / Play / TestFlight / unreleased)
- [ ] Ripple demo access that doesn't require signup
- [ ] Screenshots and product imagery for all three projects
- [ ] Any writing, talks, or open source you want surfaced
- [ ] Availability signal — open to work, freelance, or not looking
- [ ] Resume PDF, if downloadable

---

*Draft source of truth. Verify before publishing.*


Note: you have to create 2 systems.

one would be admin:
from here i will be able to update my details such as change profile photo personal details, descriptions, about products and etc

the other will be actual portfolio site that everybody will see.

in the first phase only create portfolio website, so i can confirm design and all.

backend, frontend security everything has to be managed by you!

in admin panel, it should be quite easy to create, update, delete projects.
