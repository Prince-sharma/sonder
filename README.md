# Sonder — Bench prototype, versioned

UI/UX prototype for an internal agent platform ("Bench"): a subject-matter expert
builds an agent once, their team installs it, and it runs from the next trigger.
Pilot tenant: **Plum**, a group employee-benefits insurance broker in India.
Pilot team: **Sales**, 14 people.

This repo holds the prototype as **separate version folders**. Each version is a
self-contained HTML page you can open directly; a version switcher in each page's
top bar jumps between versions, keeping your current route.

## Open it

- **`index.html`** — version index. Start here.
- `versions/v1/bench.html` — v1 · Pilot
- `versions/v2/bench.html` — v2 · Simpler member UI
- `versions/v3/bench.html` — v3 · Fresh install

Or serve the folder (`python3 -m http.server`) and open `/`.

## The versions

| Version | What it shows |
|---|---|
| **v1 · Pilot** | The destination. A sales team eight weeks in — 8 live agents, adoption and impact data, approvals, requests. All three personas, full seed data, design-notes overlay, developer handoff section. |
| **v2 · Simpler member UI** | Members see less jargon. Verified badges, agent version numbers and Suggest/Draft/Schedule/Event chips are gone from member screens, replaced with plain language ("Every weekday at 8:15", "Nothing sends without you"). Admin screens keep the full vocabulary. |
| **v3 · Fresh install** | Day zero. What a fresh install looks like for an org, with setup nudges — super admin first (team, people, connections), then team admin (business context → build → test → publish). A journey control walks the org from empty to the v1 state. |

## Layout

```
index.html              version index (open this)
versions/
  v1/                   v1 · Pilot — the original prototype
  v2/                   v2 · Simpler member UI
  v3/                   v3 · Fresh install
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
