# work/ — the thinking behind v4 and the requirements spec

Written 15 September 2026. This folder is the audit trail for the jump from
**prototype** (versions/v1–v3) to **product spec** (`Bench-Product-Requirements-v1.0.pdf`)
and the **v4 prototype** (`versions/v4/`).

The brief was: take the Gumloop founder teardown — a real operator driving a real
shipping product for four compressed days — and use it to close the gap between a
design artifact and something engineers can build. Three pillars had to be covered
end to end: **agent creation**, **sharing the agent**, **monitoring it**.

## What's in here

| File | What it holds |
|---|---|
| `01-gumloop-digest.md` | Every finding from the teardown that bears on Bench, with its evidence ref and what we do about it. The input side. |
| `02-gap-analysis.md` | The prototype audited against the three pillars. What v1–v3 draw, what they skip, and what each gap costs. |
| `03-decisions-log.md` | Every call made where the teardown had no answer — stated as a decision with its reasoning and its cost of being wrong. |
| `04-v4-changelog.md` | What changed in the prototype, screen by screen, and which finding drove it. |
| `evidence-map.csv` | One row per requirement: claim → source → spec section → v4 screen. The traceability table. |

## Source material

- `~/Desktop/code/gumloop/output/07-FOUNDER-TEARDOWN.md` — the running synthesis, 12 sections + falsifier scoreboard
- `~/Desktop/code/gumloop/research/gumloop/founder-journal.md` — the raw timestamped journal (5 sessions, ~45 KB), tagged [EXPECT] [CONFUSED] [FRICTION] [DELIGHT] [AHA] [TRUST-] [STEAL] [NEVER]
- `~/Desktop/code/gumloop/research/gumloop/08-walkthrough.md` — the onboarding funnel step by step
- `~/Desktop/code/gumloop/output/03-AGENT-BUILDING-INSIGHTS.md` — 12 insights across 27 platforms, 4 anti-patterns
- `~/Desktop/code/gumloop/output/04-IMPLICATIONS-FOR-SARVAM.md` — D1–D5 decisions, wedge ranking, threat map
- `~/Desktop/code/sonder/versions/v3/` — the prototype as it stood

## The honest caveat carried through everything

The teardown is **n=1**: one operator, one free-tier account, four days compressed into
about seven hours. It is the best-instrumented evidence available and it is not a
market verdict. Where a finding is a single observation it is labelled as one. Where
the teardown had nothing to say — most of the insurance-broker domain, all of the
multi-tenant story — the spec says "judgement" and `03-decisions-log.md` records why.
