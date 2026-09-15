# Bench — UI/UX prototype · v4 (Operational)

An internal agent platform for business teams. A subject-matter expert builds an
agent once; their teammates install it and it runs from the next trigger. Replaces
handing every business user an individual AI subscription.

**Pilot tenant in this prototype:** Plum, a group employee-benefits insurance broker
in India. **Team:** Sales, 14 people.

"v4" is v3 plus the layer that makes it a product rather than a design artifact:
runs you can read, failures you can see, schedules you can stop, budgets that bite
before the invoice does, and publishing that actually hands the agent to the team.
Every addition traces to an observation from a four-day founder teardown of a shipping
agent platform — see **[docs/07-whats-new-in-v4.md](docs/07-whats-new-in-v4.md)** for
the screen-by-screen list and the finding behind each one, and `../../work/` for the
digest, the gap analysis and the decisions log.

v4 **opens at the full pilot** so every operational surface is populated on load.
v3's journey still works from the bar, or deep-link `bench.html?stage=1`.

---

## What's different in v3 (still here)

v1/v2 open with the pilot preloaded — eight agents, adoption data, approvals
flowing. v3 answers the question behind that: **how does an org get there from
nothing?** It opens at day zero and walks the setup in order.

The **Journey bar** (the strip under the top bar) has four stages:

| Stage | What exists | Whose move |
|---|---|---|
| **0 · Day 0** | Nothing. Only the super admin has an account. | Super admin: create the Sales team, invite Karan as team admin, connect Google Workspace, Slack, HubSpot |
| **1 · Org ready** | Team, 15 people, connections. No agents. | Team admin: write the business context, build the first agent, test it, publish it |
| **2 · First agent** | Morning Rundown v1.0 live, 3 installs, week-one numbers | Everyone: install, act, request |
| **3 · Full pilot** | The v1 world, byte-for-byte | — |

Two ways to walk it:

- **Do the steps.** Each checklist step has a Do-it button (a prototype mock of
  the real action). Complete all five super-admin steps and the platform advances
  to Org ready and hands over to Karan; complete his four and the first agent
  goes live. The role switcher unlocks Team admin and Member only after the org
  exists — at Day 0 only the super admin has an account.
- **Jump.** Click any stage on the Journey bar. Stage 3 restores the full v1
  dataset verbatim, so the destination is exactly the world v1/v2 show.

Every screen has an honest empty state at the early stages — the store, the feed,
analytics, requests, the test lab — each saying what's coming and whose move it
is. Deep-link a stage with `bench.html?stage=2#/m/today`.

The journey lives in `src/65-journey.js`: stage data, the checklists, the
replacement screens, and the wiring. `src/10-data.js` declares its collections
with `let` so stages can swap them; the full pilot set is snapshotted at load and
restored verbatim at stage 3.

v3 also carries v2's simpler member UI (plain-language runs/trust instead of
Suggest/Draft/Schedule/Event chips, no Verified badge, no version numbers on
member screens).

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

Tokens are the first block of `src/00-head.html`, defined twice: bare `:root` for
light — the default for every visitor, regardless of OS setting — and
`:root[data-theme="dark"]`, which only the toggle sets. Change a colour in both
or the toggle breaks.

A Plum-branded version was built and replaced — `docs/05-plum-brand-tokens.md` has the
real values read off plumhq.com's live stylesheet if you want it back.

## What it is not

No backend, no model, no persistence. Buttons that aren't wired say so in a toast.
State (installs, approvals, test runs) lives in memory and resets on reload. This is a
design artifact for aligning on screens and flows, not a spike.

`docs/06-open-questions.md` lists what needs deciding before someone builds it.
