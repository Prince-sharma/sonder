# Bench — UI/UX prototype

An internal agent platform for business teams. A subject-matter expert builds an
agent once; their teammates install it and it runs from the next trigger. Replaces
handing every business user an individual AI subscription.

**Pilot tenant in this prototype:** Plum, a group employee-benefits insurance broker
in India. **Team:** Sales, 14 people.

"Bench" is a working name. It appears in `src/01-shell.html` and in the `<title>` at
the top of `src/00-head.html` — two places to change.

---

## Open it

Double-click **`bench.html`**. No server, no build step, no dependencies. It is one
self-contained file; the only network request is Google Fonts, and it degrades to
system fonts offline.

Top bar controls:

| Control | What it does |
|---|---|
| Member / Team admin / Super admin | Switches persona. The left rail and every screen change. |
| ⓘ | **Design notes.** Overlays the rationale behind each screen. Read the prototype with this on. |
| ◗ | Light / dark. |

23 routes, all reachable from the rail. `#/h/spec`, `#/h/flows` and `#/h/open` are
the developer handoff section.

## Edit it

`bench.html` is generated. Edit the pieces in `src/`, then:

```bash
bash build.sh
```

That writes two files:

- `bench.html` — standalone, opens locally
- `dist/artifact-body.html` — the same page without `<!doctype>/<html>/<head>/<body>`,
  which is what gets published to the Claude Artifact (the host supplies the wrapper)

### What's in `src/`

| File | Contains |
|---|---|
| `00-head.html` | `<title>`, font links, **all design tokens**, every CSS rule |
| `01-shell.html` | Top bar, rail and main containers |
| `10-data.js` | Seed data — agents, people, feed, approvals, requests, scenarios, teams, audit |
| `20-lib.js` | Helpers, icon set, chart functions (sparkline, metric chart, bar list, segment bar) |
| `30-member.js` | Member screens |
| `40-admin.js` | Team-admin: pulse, agent list, the four builder tabs |
| `41-admin2.js` | Team-admin: test lab, publish, analytics, requests, business context |
| `50-super.js` | Super-admin screens |
| `60-handoff.js` | Object model, flows, open questions |
| `70-app.js` | Navigation, router, modals, event handling |

Screens live in a `SCREENS` map keyed by route (`"m/today"`, `"a/test"`, …). Each is a
function returning an HTML string. To add a screen: add the entry, add a rail item in
`ROLES` at the top of `70-app.js`.

## Theme

Neutral monochrome. Chrome — buttons, nav, charts, meters, avatars, agent glyphs —
carries no hue. Colour survives only in status: four dark, low-chroma hues on severity
stripes and status chips, each of which also ships an icon and a word, so meaning never
rests on colour alone. Every text value clears 4.5:1 on its own surface in both themes.

Tokens are the first block of `src/00-head.html`, defined three times: bare `:root`
for light, `@media (prefers-color-scheme: dark)` guarded with `:root:not([data-theme="light"])`,
and `:root[data-theme="dark"]`. Change a colour in all three or the toggle breaks.

A Plum-branded version was built and replaced — `docs/05-plum-brand-tokens.md` has the
real values read off plumhq.com's live stylesheet if you want it back.

## What it is not

No backend, no model, no persistence. Buttons that aren't wired say so in a toast.
State (installs, approvals, test runs) lives in memory and resets on reload. This is a
design artifact for aligning on screens and flows, not a spike.

`docs/06-open-questions.md` lists what needs deciding before someone builds it.
