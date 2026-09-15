# 03 — Decisions log

Every call made where the teardown had no answer, or where its answer had to be inverted
for Bench's buyer. Stated as: the decision, why, what it costs if it's wrong, and who
disagrees. Anything not in this file came from the evidence, not from judgement.

---

## Part I — The ten laws

These are the product laws the spec is written against. Seven are lifted from the
teardown; three are judgement.

**L1 · An object exists before it is configured.** Create makes a live draft in one click.
*Source: A1.*

**L2 · The empty state teaches the object model.** Every empty surface names what goes
there and whose move it is. *Source: A2, and v3 already does this well.*

**L3 · Cost is shown before the action, never only after.** Any control that commits
recurring spend states the projection at the moment of commitment. *Source: C7 — the one
surface in Gumloop that does this, and the teardown's own recommendation that every
credit-consuming surface should work that way.*

**L4 · One number, one source.** Any surface showing cost, count or status reads the same
ledger. *Source: C5 — two cost surfaces disagreeing by exactly 3.*

**L5 · A run that did no work is never called completed.** *Source: C2.*

**L6 · Anything that can be created in one click can be stopped in one click, from a
labelled control.** *Source: C8.*

**L7 · Nothing bills that does not appear as a run.** No background meters.
*Source: C6 — `inbox_classification` billing every 1–3 hours whether used or not.*

**L8 · An agent may propose; only a human publishes.** *Judgement — inverts A6 for a
regulated buyer. See D4.*

**L9 · Publishing transfers custody, not just permission.** *Source: B1, inverted.*

**L10 · The vocabulary of the platform never reaches a member's screen.** v2's decision,
kept: no "eval", "grader", "dataset", "credit", "token", "trace". Members get situations,
outcomes and plain sentences. *Source: v2/v3 decision, reinforced by the teardown's
observation that the product's best cost surface is the one nobody finds.*

---

## Part II — The decisions

### D1 · Publishing transfers ownership to the team. The author keeps credit, not custody.
**Decision.** On publish, `owner` moves from `author_id` to `team_id`, and a `maintainer_id`
is set — defaulting to the author, reassignable by the team admin, and forcibly reassigned
when the author's account is deactivated. The author is displayed permanently as "Built by".

**Why.** B1 is the teardown's clearest structural failure and Bench's entire reason to
exist. A shared agent that still belongs to one person reproduces the individual-subscription
problem inside the platform.

**Cost if wrong.** Authors may feel demoted and stop building — the platform depends on a
Karan who *wants* to build. Mitigation: authorship is permanent and visible, on the store
card, in the release note and in the analytics; only the object's custody moves.

**Who disagrees.** Gumloop, explicitly — Make a Copy and a Danger Zone, no transfer.
Dust ships real shared ownership, which the teardown's switch test scores as a reason
people stay with Dust.

**Answers** the prototype's open question "who owns an agent when its author leaves?"

---

### D2 · Run status is a five-value enum, and `blocked` always escalates.
**Decision.** `completed` · `nothing_to_do` · `blocked` · `failed` · `partial`.
A `blocked` run creates an item in the installer's "Waiting on you" queue, a row in the
admin's Run Log, and — after one missed trigger interval — a notification. A `failed` run
notifies the maintainer immediately.

**Why.** C2. A run that stopped for missing input and a run that hit a hard block both
recorded as Completed is the finding that makes the rest of the monitoring surface
untrustworthy. `nothing_to_do` is separated from `completed` because "the digest found
nothing today" and "the digest ran and found five things" are different facts and an
operator reading a list of green rows needs to see which is which.

**Cost if wrong.** Five states is one more than most people will learn. Mitigation: members
only ever see two of them, in words — "needs you" and "nothing today".

---

### D3 · Every agent carries a run budget. Exceeding it pauses the agent and tells a human.
**Decision.** A budget in runs/month is set at publish, defaulted from the projection, and
enforced per agent and per team. At 80% the maintainer is notified; at 100% the agent's
*scheduled* triggers pause — on-demand and event triggers keep working — and both the
maintainer and the super admin are told, with the number and the cause.

**Why.** C6. The measured arithmetic: one agent on the default cadence exhausts a month's
allowance in 5–11 days; a do-nothing agent on a 15-minute schedule does it in 30. And the
observed failure mode on the incumbent's forum is triggers auto-disabling silently after
credit exhaustion, which is the same event handled without telling anyone.

**Why scheduled-only pauses.** A member typing a question should not hit a wall because a
schedule somewhere burned the budget. The cliff is the scheduler; the interactive product
is cheap (~1,200 credits for an entire four-day program).

**Cost if wrong.** A paused agent is an outage. Mitigation: the pause is loud, the override
is one click for the super admin, and the projection shown at publish means nobody should
be surprised.

---

### D4 · Self-modification is a per-agent policy, off by default, and every self-change is a proposed version.
**Decision.** An agent may propose a config change — a new scenario, a tightened
instruction, an additional source — and the proposal enters the normal draft → test →
publish pipeline as a version authored by the agent. It never takes effect without a human
publish. The policy toggle is admin-only and audited.

**Why.** A6 shows the ceiling of the autonomy pitch and its cost. The learning loop is the
one axis where the field is nearly empty and it compounds — but "Allow Self-Updates" plus
"AI Managed: ON" on four subsystems is not a thing a broker's compliance function will
sign. Routing self-change through the existing gate keeps the compounding and keeps the
control.

**Cost if wrong.** Slower learning than a product that lets agents rewrite themselves
freely, and a review burden on the admin. Mitigation: batch review, and proposals expire.

**Caveat carried:** demand for learned skills is unproven — ~3 of 708 forum topics mention
"skill" and none discuss the feature. This is supply-side differentiation, not observed
demand. Ship it small.

---

### D5 · Approval rules are conditional on the action's content, not only on the agent's autonomy level.
**Decision.** An admin writes rules of the form *"anything above ₹X"*, *"anything to an
external domain"*, *"anything mentioning a named account"* → require approval, and who
approves. Drafts that match no rule can be auto-released for agents at Draft autonomy if
the admin opts in. Batch approve up to 20. Slack is a first-class approval surface.

**Why.** C11. Gumloop's App Rules evaluate the actual arguments of each tool call — the
teardown scores it the sole 5 on the HITL axis — and the attached recommendation is to put
the approval where the approver already is. v3's flat queue does not survive an AE with 12
drafts a day.

**Cost if wrong.** Rule-writing is an expert surface. Mitigation: three pre-written rules
ship with the product and cover the regulated cases; the expression editor is optional.

---

### D6 · The install screen shows a real backfill before it asks for consent.
**Decision.** "See what it would have said for you this morning" runs the agent read-only
against the installer's own data, shows the result, and only then presents the scope
consent. The backfill is free and does not count against budget. Scheduled agents also
fire one backfill run immediately on install so the first value is not tomorrow.

**Why.** B7 and the prototype's own flow note, which identifies the problem
("a scheduled agent feels dead for a day and install-day churn spikes") and marks the fix
as a decision to make. The teardown settles it: Gumloop's onboarding sells outcomes for
five steps before asking for a single permission.

**Cost if wrong.** A backfill that produces a weak result kills the install at the door.
That is working as intended — better at the door than in week three.

---

### D7 · Scope consent is per-connector and least-privilege by default.
**Decision.** The install screen lists each source separately with a one-line statement of
what it lets the agent see, and each can be declined. Declining a source the agent requires
blocks install with a plain explanation; declining an optional source installs a degraded
agent that says what it can't do.

**Why.** B6. "Unrestricted access to everything" pre-selected as Recommended is the shape
that produced 28 oauth-permission complaint topics and at least two documented IT refusals.
Plum's compliance team reads this screen.

**Cost if wrong.** Lower activation — some people will decline and get a worse agent.
Accepted: this is the buyer's screen, not the user's.

---

### D8 · One config surface, sectioned. No tab called "Settings".
**Decision.** Identity, When it runs, What it may read and write, Instructions, Autonomy
and guardrails, What users can change, Outcome — one scrollable surface with a section
index, not a tab split.

**Why.** A5 — the tab that mattered most was named least descriptively and cost the
operator a dead end on first contact.

**Cost if wrong.** A long page. Mitigation: the publish checklist doubles as the section index.

---

### D9 · The cost unit is the **run**, not a credit.
**Decision.** Bench meters runs. A run has a cost band (light / standard / heavy) shown as
words to members and as a number to admins. No second currency, no per-token arithmetic in
any user-facing surface.

**Why.** The teardown's pricing insight is explicit: the trust winners are the coarse
meters — n8n's executions, Activepieces' one-credit-one-run — and the most transparent
fine-grained meter in the set coexists with the category's worst bill-shock corpus.
Transparency is necessary and not sufficient; the deliverable is predictability.

**Cost if wrong.** Margin risk — a heavy run and a light run cost Bench very differently
and a flat run price averages that. Mitigation: three bands, published, with the band shown
on the run row. If the bands drift from cost, the bands change, not the unit.

**Open:** whether a run bundles its retries. Drawn as yes — a retry is part of the run that
needed it. See `06-open-questions.md`.

---

### D10 · Members never see cost. Admins always do.
**Decision.** No number on any member surface. The admin's agent page, the schedules
screen, the publish screen and the org spend page all show it.

**Why.** L10, and the observation that the product's most useful cost surface was the one
nobody found. Putting a price on a sales AE's morning digest changes what they do with it,
and not usefully.

**Cost if wrong.** Members can't self-regulate. Accepted: regulating spend is the admin's
job and the budget mechanism (D3) is where it belongs.

---

### D11 · Cross-team spread is a template fork, not a share.
**Decision.** A team admin can take a published agent from another team as a template. The
fork is a new agent with a new owner, a new outcome baseline and a recorded lineage
("forked from Sales · Renewal Defender v3.1"). Members still cannot fork — that decision
stands.

**Why.** B5 — without a one-to-many channel distribution stays one-to-one, which is how
Account Management ends up rebuilding Sales' agent by hand. Lineage is what lets the super
admin see that one good agent became four.

**Cost if wrong.** Drift — four variants of one agent, none maintained. Mitigation: lineage
is visible on both ends, and the origin's maintainer is notified on fork.

---

### D12 · `ignored` is computed at the next trigger, and the window is stated on screen.
**Decision.** A run item not responded to by the time its agent next runs is `ignored`.
On-demand agents use 72 hours. The window is written on the analytics screen next to the
number.

**Why.** The prototype defines `ignored` as the metric that separates a design failure from
a judgement call and leaves the window undefined, which makes it unbuildable.

**Cost if wrong.** For a daily agent this is a 24-hour window, which may be harsh for
someone on leave. Mitigation: out-of-office suppresses it; stated in the spec.

---

### D13 · Retention: runs 90 days, traces 30 days, outcome series forever.
**Decision.** As stated. Traces are the expensive object; the metric series is the cheap
one and the one an annual review needs.

**Why.** Judgement. The teardown's only datum is Gumloop's 90-day MoM retention default and
the free-tier sunset that locked people out of their own history — the second of which is
the thing to avoid. Data survives a downgrade in Bench; access to it does not depend on
payment state.

**Cost if wrong.** A dispute six months old has no trace. Mitigation: a run can be pinned,
which exempts its trace from expiry.

---

## Part III — Deliberately not decided

Carried forward to the spec's open-decisions section rather than settled here, because each
changes the commercial shape and none is a design question:

- Per-seat vs per-run vs per-outcome pricing (the prototype assumes seat + metered runs)
- Whose logo is on it — cross-tenant store or strictly per-tenant
- Replacing individual AI seats or layering on top
- Sales or Account Management as the first team
- Whether the pilot needs WhatsApp on day one

The Gumloop program contributes one thing to all five: its own commercial scale is
unsourced — no ARR, no renewal, no NRR, no cohort data exists anywhere in the corpus. The
middle it occupies is verified unoccupied and its profitability is unproven. None of these
five should be settled by pointing at what Gumloop does.
