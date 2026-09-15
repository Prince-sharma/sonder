# 02 — Gap analysis: prototype → product

The prototype (v1–v3) against the three pillars. For each: what it draws today, what a
real product needs, and what the gap costs if it ships unclosed.

The prototype's own `06-open-questions.md` already names five things "deliberately not
drawn". Four of them — the runtime, billing, onboarding a new user, search — turn out to
be exactly where the Gumloop teardown spends its strongest findings. That is the useful
coincidence this work is built on: **the prototype's known blind spots and the shipping
product's observed failures are the same list.**

---

## Pillar 1 — Agent creation

### What v3 draws
- `a/build` with four tabs: Describe (chat), Config, What users can change, Outcome metric
- Chat-drafts-form-refines: the chat produces a complete config, every field editable
- Scopes as read/write/denied rows, each inheriting the installer's own permissions
- Instructions box inheriting team business context automatically
- Autonomy radio (Suggest / Draft / Auto-act) + hard stops, each generating its own tests
- Publish checklist in the sidebar, outcome metric required to publish
- `a/test` — 14 generated scenarios, pass/fail/needs-your-call, proposed fixes, guardrail
  failures as a hard block, comparison against the previous version

This is already stronger than what the teardown found shipping. The outcome-metric gate
and the generated adversarial scenarios have no equivalent in Gumloop.

### The gaps

| # | Gap | Evidence | Cost if unclosed |
|---|---|---|---|
| 1.1 | **No create moment.** The builder assumes a draft already exists. There is no screen for "I clicked Create". | A1, A2 — Gumloop's one-click create + four nudges is the single best-liked moment in the journal | The first 60 seconds are the ones that decide whether a sales lead builds anything. Undrawn. |
| 1.2 | **Trigger is a dropdown, not a sentence.** Config shows Daily / Twice daily / Weekly selects. | A3 — natural-language cron is "the best trigger UX I have used" | Loses the one interaction the teardown singles out as category-leading. |
| 1.3 | **No cost anywhere in the build.** Nothing tells the author what a cadence will cost. | C6, C7 — one agent on its own default cadence burns the monthly allowance in 5–11 days | The author picks "every 30 minutes" because it's the middle option. Nobody finds out until the invoice. |
| 1.4 | **No live dry run.** Scenarios are synthetic; the agent never runs on real data before publish. | A4, B7 — Gumloop's first run happens at minute 17 and is what makes it real | An author publishes something they have never seen work. First contact with reality is a teammate's Monday. |
| 1.5 | **Self-modification not modelled.** No position on whether an agent may change its own config. | A6 — four AI-managed subsystems on one panel, all ON by default | Either the product bans it silently (and loses the compounding) or permits it silently (and fails the compliance review). |
| 1.6 | **Unfinished drafts go nowhere.** `DRAFTS` exists in data; nothing nudges. | A8 — abandonment is silent, and only noticed inside the workspace you already left | Half-built agents are the largest silent loss in the funnel. |
| 1.7 | **No rollback.** Version history shows "Roll back to v4.1" as a button; no flow behind it. | C10 — Gumloop's agent versions have no deploy or rollback endpoint, so an eval can flag a regression and nothing can act on it | The publish gate is only half a control without the undo. |

---

## Pillar 2 — Sharing

### What v3 draws
- `a/publish` — what changed, who gets it, rollout choice (everyone / pre-install / ring of three), the note the team is told
- `m/store` — cards with outcome, plain-language run/trust, install count
- Install modal — what it reads, what it writes, what it does on its own, defaults pre-set
- Per-user params with an author-written list of what is locked and why
- Requests as the only route past a lock; uninstall forces a reason
- Version history with a rolled-back entry

The publish→install→request loop is the prototype's best idea and has no equivalent in
anything the teardown examined.

### The gaps

| # | Gap | Evidence | Cost if unclosed |
|---|---|---|---|
| 2.1 | **Ownership is never transferred.** The object has one `author_id` and the prototype's own open questions flag it: "who owns an agent when its author leaves?" | B1 — the single biggest failure in the teardown: nothing crosses personal→team, and the team namespace is an empty room | This is the thesis. If publishing is a permission grant rather than a transfer, Bench is Gumloop with a nicer store. |
| 2.2 | **No maintainer.** Nobody is named as responsible for a live agent. | B1 | An agent with eleven installs and a departed author is an outage waiting to be discovered by a customer. |
| 2.3 | **Fork is banned but undrawn.** "Users can't fork" is a decision; another *team* wanting the agent has no path. | B2 (setup link vs agent link), B5 (distribution stays one-to-one without a gallery) | Account Management rebuilds Sales' agent by hand. The pattern doesn't spread, which is the whole pitch. |
| 2.4 | **Scope consent is all-or-nothing.** The install modal lists what it reads; you cannot decline one source. | B6 — the unrestricted-by-default scope modal, and 28 forum topics of IT refusing broad grants | Plum's IT reviews one screen and says no. |
| 2.5 | **No preview before consent.** The install modal describes; it doesn't show. | B7 — the onboarding sells outcomes for five steps before asking for a single permission | Install-day churn. A scheduled agent installed at 4pm is silent until 08:15 tomorrow, and v3's own flows note this and don't draw the fix. |
| 2.6 | **No deprecation contract.** "Installs auto-advance" is stated in the flows; nothing says what a user is owed when something is removed. | B8 — deprecation broke running flows with no notice and the repair was pushed onto customers | The first removed section produces the first uninstall wave. |
| 2.7 | **Copy semantics undefined.** What an install copies vs references is implicit. | B3 | Two engineers build two different products from the same screen. |

---

## Pillar 3 — Monitoring

### What v3 draws
- `a/analytics/<id>` — installs, active, acted/dismissed/ignored, the outcome metric chart, a per-person table joining usage to outcome, drop-off with named people and reasons
- `a/pulse` — team view
- `s/overview`, `s/connections` — org rollup and an audit log
- `Run` and `RunItem` in the object model, including `trace[]` and the acted/dismissed/**ignored** distinction

The ignored-vs-dismissed split and the usage×outcome join are genuinely ahead of the field —
the teardown's landscape file notes Microsoft is the only vendor with a per-user × per-agent
table and it counts responses received, a volume proxy with no outcome attached.

### The gaps — the largest of the three

| # | Gap | Evidence | Cost if unclosed |
|---|---|---|---|
| 3.1 | **`trace[]` is in the object model and on no screen.** There is no run log and no run detail. | C1 — a log is the #1 organic feature request on the incumbent's own forum; C3 — output hides in per-run threads | The prototype's own list says it: "A run that fails halfway is drawn as if it can't happen." It can, and it will, on day one. |
| 3.2 | **No failure states at all.** No run status vocabulary, no failed queue, no blocked queue. | C2 — blocked runs land as Completed; the Failed and Approval Required tabs never fire | The exact failure the teardown calls its sharpest: an agent waiting on a question that nobody can see. |
| 3.3 | **No schedules surface.** Triggers are a field on an agent. Nothing lists them. | C8 — creation one click, deletion six passes, behind an unlabelled ellipsis | Nobody can answer "what is running right now, and what is it costing us?" |
| 3.4 | **No cost model of any kind.** The prototype's own list: "No plan page, no usage meter, no overage." | C4, C5, C6 — the cliff is structural and arrives with one agent | A pilot that looks free in week one and produces an unexplainable invoice in week six. This is the finding most likely to kill a renewal. |
| 3.5 | **Approvals are one flat queue.** Every draft, no conditions, no batch, no Slack. | C11 — approvals conditioned on the *arguments* of the action; Slack as the surface where the approver already is | An AE with 12 drafts a day stops opening the queue in week two. |
| 3.6 | **No alerting.** Nothing tells anyone that anything went wrong. | C2, C9 | Silence reads as health. It isn't. |
| 3.7 | **Ignored is defined and never computed.** The object model defines ignored as "no response within the next run's window"; no screen shows the window. | — (prototype's own gap) | The best metric in the product is undeliverable as specified. |

---

## What this adds up to

Creation is **80% there** — it needs a create moment, a sentence-shaped trigger, a cost
number and a real first run.

Sharing is **60% there** — the loop is right, the ownership model is missing, and the
missing part is the thesis.

Monitoring is **25% there** — the analytics are ahead of the market and the operational
layer underneath them does not exist. Everything the teardown found broken in a shipping
product is in this pillar, and the prototype does not yet contradict any of it.

Order of work implied: **monitoring first**, because it is both the largest gap and the
category's top organic ask; **sharing second**, because it carries the thesis; **creation
third**, because it is already close.
