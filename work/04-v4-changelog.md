# 04 — What changed in the prototype, and why

v4 = v3 + the operational layer. Every entry names the finding that drove it
(`01-gumloop-digest.md`) or the decision behind it (`03-decisions-log.md`).
Source lives in `versions/v4/src/`; `bash versions/v4/build.sh` rebuilds.

v4 **opens at the full pilot** (stage 3) so every new surface is populated on load.
v3's journey bar still works from any stage; the v4 screens carry an honest empty state
before stage 3 rather than showing pilot data in an empty world.

## New source files

| File | Lines | What it holds |
|---|---|---|
| `11-data-ops.js` | ~300 | Run status vocabulary, 9 runs with real traces, schedules, budgets, org spend, agent proposals, ownership + lineage, install semantics, the waiting queue, backfill data, projection helpers |
| `66-runs.js` | ~250 | `a/runs` (run log), `a/run/<id>` (trace), `m/waiting`, the waiting and stop-trigger modals |
| `67-schedules.js` | ~130 | `a/schedules` — every live trigger, projections, budget table, cost bands, the measured cliff |
| `68-share.js` | ~190 | `a/new` (the create moment), `a/share` (audience, ownership, forks, deprecation contract) |
| `69-spend.js` | ~140 | `s/spend` (org spend, caps, self-mod policy, agent proposals) + the stage guard |

## New screens

| Route | Screen | Driven by |
|---|---|---|
| `#/a/runs` | Run log | C1 (a log is the #1 organic ask), C2, C3 |
| `#/a/run/<id>` | Run trace | C3, C12 (determinism is what a switcher gives up) |
| `#/a/schedules` | Schedules & budget | C6 (the cliff), C8 (deletion behind an unlabelled ellipsis) |
| `#/a/new` | Create an agent | A1 (one-click create), A2 (the four nudges), A8 (silent abandonment) |
| `#/a/share` | Share & ownership | B1 (nothing crosses personal→team), B3, B5, B8 |
| `#/s/spend` | Spend & governance | C6, D1 (governance priced above the pain), A6/D4 (self-mod) |
| `#/m/waiting` | Waiting on you | C2 — the sharpest finding in the teardown |

## Changed screens

**`#/a/build`** — the trigger section is now a sentence with a parse echo and a monthly cost
projection above the Save (A3 + C6 + C7). A fifth tab, *Try it for real*, runs the draft
read-only on real accounts and lists every suppressed write (A4, B7).

**`#/a/pulse`** — opens with a *Needs you today* strip: the failed run and its cause, the run
waiting on a person, the budget about to bite, the install that has found nothing three days
running, the draft stalled for nine days. All five are invisible in the product we studied
(C2, C6, A8, C9).

**`#/a/publish`** — adds the cost projection, the budget cap defaulted from it, and a rollback
panel (C6, C10).

**The install modal** — a real backfill preview before the consent step, then per-source
grants with a plain sentence each (B7, B6).

**`#/h/spec`** — `Run` rewritten with a five-value status plus `RunStep`, `Ask`, `Failure`;
`Trigger`, `Budget`, `Agent.ownership`, `AgentProposal`, `SelfModPolicy` added. Three flows
added (a run that stops · publish as a transfer · budget bites). Eight rows added to the
permissions table.

**`#/h/open`** — the runtime and billing leave the "deliberately not drawn" list; four honest
replacements take their place (the invoice, notifications as a system, one person's day zero,
the deployment ladder).

## New CSS

Five trace-step kinds in `00-head.html` (`.tstep.warn/.fail/.block/.auto`) and `.chip.solid`.
Amber = a decision not to act; red = a stop. No new colour tokens — the existing four status
hues carry it, and every status still ships an icon and a word.

## What was NOT changed

The theme, the token system, the chart functions, the member's plain-language vocabulary
(v2's decision), the outcome-metric publish gate, the requests loop, the test lab's banned
vocabulary, and v3's journey. The brief was to extend the framework, not replace it — every
new screen is built from the same helpers and reads as the same product.

## Verification

- 31 routes render at all four journey stages: **0 JS errors**
- 19 interaction paths exercised (install → backfill → install, run filter, trace, answer a
  blocked run, pause/stop a trigger, dry run, proposals, role switches, theme, design notes):
  **0 JS errors**
- 400px width: 4px horizontal overflow on the three surfaces checked — inherited from v1–v3,
  not introduced here
- `dist/artifact-body.html` parses as JS in isolation
