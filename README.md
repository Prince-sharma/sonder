# Sonder — Bench prototype, versioned

UI/UX prototype for an internal agent platform ("Bench"): a subject-matter expert
builds an agent once, their team installs it, and it runs from the next trigger.
Pilot tenant: **Plum**, a group employee-benefits insurance broker in India.
Pilot team: **Sales**, 14 people.

This repo holds the prototype as **separate version folders**. Each version is a
self-contained HTML page you can open directly; a version switcher in each page's
top bar jumps between versions, keeping your current route.

## Open it

- **Published:** `https://prince-sharma.github.io/sonder/` — passworded (see below)
- **`index.html`** — version index. Start here.
- `versions/v1/bench.html` — v1 · Pilot
- `versions/v2/bench.html` — v2 · Simpler member UI
- `versions/v3/bench.html` — v3 · Fresh install
- `versions/v4/bench.html` — v4 · Operational  ← **start here**

Or serve the folder (`python3 -m http.server`) and open `/`.

## The access gate (published site only)

The published Pages site asks for a password once per browser (30 days). It's a
casual gate for a design prototype on static hosting — not real security; there
is no server to verify a password, so a determined reader can get past it.

How it works:

- `gate.js` (repo root) runs on every published page. Locked → redirects to
  `access.html?next=…`. Not active for `file://` opens or `localhost`.
- `access.html` hashes the entered password with SHA-256 (Web Crypto) and
  compares it to the hash in the source. The password itself is never in the
  repo. Match → stores `hash|timestamp` in `localStorage` → returns you to
  where you were going.
- Each version's `build.sh` injects the `<script src="../../gate.js">` tag into
  the standalone `bench.html` only — `dist/artifact-body.html` (for Claude
  Artifacts) stays clean, and `src/` is untouched.

**To change the password:** pick a new one, compute
`printf '%s' 'new-password' | shasum -a 256`, and replace the `HASH` constant in
**both** `gate.js` and `access.html` (they must match), then rebuild all four
versions and push.

## The versions

| Version | What it shows |
|---|---|
| **v1 · Pilot** | The destination. A sales team eight weeks in — 8 live agents, adoption and impact data, approvals, requests. All three personas, full seed data, design-notes overlay, developer handoff section. |
| **v2 · Simpler member UI** | Members see less jargon. Verified badges, agent version numbers and Suggest/Draft/Schedule/Event chips are gone from member screens, replaced with plain language ("Every weekday at 8:15", "Nothing sends without you"). Admin screens keep the full vocabulary. |
| **v3 · Fresh install** | Day zero. What a fresh install looks like for an org, with setup nudges — super admin first (team, people, connections), then team admin (business context → build → test → publish). A journey control walks the org from empty to the v1 state. |
| **v4 · Operational** | The gap between a design artifact and a product, closed against evidence. Built from a four-day founder teardown of a shipping agent platform (`~/Desktop/code/gumloop`), it adds the operational layer v1–v3 declared and never drew: a run log and per-step trace, a five-value run status where a blocked run is never called completed, a “waiting on you” surface for members, schedules with budgets and a cost projection before you commit, publishing as a transfer of ownership, and a create moment. Opens at the full pilot; v3's journey still works from the bar. |

## Layout

```
index.html              version index (open this)
versions/
  v1/                   v1 · Pilot — the original prototype
  v2/                   v2 · Simpler member UI
  v3/                   v3 · Fresh install
  v4/                   v4 · Operational — the build-ready version
work/                   the thinking: teardown digest, gap analysis, decisions
Bench-Product-Requirements-v1.0.pdf   the spec a developer builds from
```

Each `versions/vN/` folder is independent:

```
bench.html              generated, self-contained — double-click to open
build.sh                rebuilds bench.html + dist/artifact-body.html from src/
src/                    the editable pieces (see versions/v1/README.md)
docs/                   brief, research, open questions
dist/artifact-body.html same page without the html wrapper, for Claude Artifacts
```

To edit a version: change `versions/vN/src/…`, then `bash versions/vN/build.sh`.
The version switcher lives in `src/01-shell.html` (the `<select>`), its CSS in
`src/00-head.html` (`.versel`), and its wiring at the bottom of `src/70-app.js`
(`THIS_VERSION` + the change handler). Adding a v4: copy a version folder, add
an `<option>` to every version's `src/01-shell.html`, and add a card to
`index.html`.

## What it is not

No backend, no model, no persistence. Buttons that aren't wired say so in a
toast. State resets on reload. It is a design artifact for aligning on screens
and flows before a developer builds it.

The original prototype README (architecture, theme system, screen map) lives at
`versions/v1/README.md` and applies to every version.
