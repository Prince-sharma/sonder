# 01 — The Gumloop digest: what a real product taught us

Findings from the founder teardown (n=1, 2026-09-13, free tier, 4 compressed days),
filtered to what bears on Bench. Each carries its evidence ref and the verdict:
**STEAL** (copy it), **INVERT** (they got it wrong, do the opposite), **AVOID**
(anti-pattern with a documented cost), or **NOTE** (context, no direct action).

Tags follow the journal's own vocabulary.

---

## A · Agent creation

### A1 · Zero-to-agent is one click, not a wizard — **STEAL**
"Create Agent does not open a wizard — it instantly creates a working agent (default
name 'Smart Jet') and drops you in a full workspace… Zero-to-agent in ~12 seconds,
before I had told it anything." (journal 16:49 [DELIGHT], `day1/03`)

The philosophy is the opposite of form-first. The object exists before it is
configured, so there is always something to react to.

**For Bench:** the Create button creates a live draft immediately and routes into its
workspace. No modal asking for a name first. Name is editable, defaulted, never blocking.

### A2 · The empty workspace teaches the object model — **STEAL (verbatim)**
The fresh agent shows a "Get started" nudge with four next steps in the product's own
voice: "Set up a trigger — I want you to start doing things without me having to ask",
"Build a live dashboard", "Create a skill — I want to teach you how I do things",
"Personalize yourself". (journal 16:51 [STEAL], `day1/07`)

The journal's note: "This is onboarding-by-agent-suggestion, and it teaches the object
model (triggers, skills) while selling proactivity. We should steal this pattern verbatim."

**For Bench:** four nudges, phrased in the author's voice, mapped to Bench's own objects —
trigger, knowledge, what users can change, the outcome metric.

### A3 · Natural-language cron is the best trigger UX in the category — **STEAL**
"The scheduled form takes 'Every 30 minutes' as typed text or a chip, has a Generate
button that parses it, and shows the parsed result ('Every 30 minutes, every hour,
every day'). No cron syntax anywhere. This is the best trigger UX I have used."
(journal 17:00 [DELIGHT], `day1/13`, `day1/15`)

**For Bench:** type it in English, parse it, echo the parse back, and — Bench's addition —
show what that cadence *costs* per month before it is saved (see C6).

### A4 · TTFA 17.5 minutes, ~4 of them operator error — **NOTE (the bar)**
Create-click to a running scheduled agent with a working first run: 17 min 30 s.
First run = 16 steps, 45 credits, artifact saved unprompted. (teardown §1)

**For Bench:** this is the number to beat. The spec's build flow has a stated budget of
**under 20 minutes** for a first published agent, and it is an acceptance criterion,
not an aspiration.

### A5 · Two config tabs, split unintuitively — **AVOID**
"'Settings' holds name/description/secrets/danger-zone; 'Agent' holds the actual brain —
instructions, triggers, connectors, skills, knowledge, subagents, abilities. I looked for
instructions under Settings first and found a dead end. The tab that matters most is
named the least descriptively." (journal 16:55 [CONFUSED], teardown §7)

**For Bench:** one config surface, sectioned, each section named for what it does
("When it runs", "What it may read and write"). No tab called "Settings".

### A6 · The agent can rewrite itself — four AI-managed subsystems on one panel — **INVERT**
Allow Self-Updates; Triggers "AI Managed: ON"; Connectors "AI Discovery: ON"; Skills
"AI Skill Editing: ON"; self-cloning subagents; Tool Discovery on AUTO. (journal 18:15
[STEAL], `day3/13`)

Powerful, and unshippable at a regulated broker without a control. The journal marks it
STEAL; for Bench's buyer it inverts.

**For Bench:** self-modification is a named, per-agent, admin-set policy — **off by
default**, every self-change is a proposed version that goes through the same test gate
and lands in the audit log. An agent may propose; only a human publishes.

### A7 · The agent refuses to hallucinate, and says exactly why — **STEAL (as a requirement)**
Given "fetch the competitor data we discussed from the usual site": it searched the chat,
the workspace, AGENT.md and prior conversations, found nothing, and reported "I did not
guess a competitor URL, did not write a new tracker, and did not touch email/Slack."
Pointed at a bot-blocked page it tried three variants, reported the block, refused to
substitute third-party snippets, and asked two questions. (journal 18:37–18:38 [DELIGHT],
`day3/29-30`; teardown §8)

"This is the honest-failure behavior the agent-platform market claims and rarely shows."

**For Bench:** declared-unknowns is a test category in the Test Lab and a guardrail class,
not a hope. An agent that cannot complete says which input is missing and stops.

### A8 · Abandonment is silent — **INVERT**
A deliberately half-finished agent drew no nudge anywhere outside its own workspace —
not on home, not in tasks, not in the agents list. "The product notices abandonment only
inside the workspace you already left, which is precisely where you will not be."
(journal 17:36 [CONFUSED], teardown §7)

**For Bench:** unfinished drafts decay into the admin's pulse after 72 hours with the
reason they stalled.

### A9 · Knowledge enters by sync or upload, never by typing — **INVERT**
"For a product called Brain, you cannot think into it directly." (journal 17:24 [CONFUSED])

**For Bench:** business context is authored conversationally and typed directly — it is
already the thing v3 gets right, and the teardown confirms the gap is real in shipping
products.

---

## B · Sharing

### B1 · There is no promotion. Nothing crosses personal → team — **INVERT (the headline)**
The team namespace mirrors the personal one completely — home, agents, brain, skills,
artifacts, connectors, tasks, secrets — and every surface is empty. Org share was
performed and verified persisted; the team agents page still did not list the agent,
team home still showed no activity and no upcoming triggers, team Brain stayed empty.
The agent Settings tab has no move-to-team control; its affordances are Make a Copy and
a Danger Zone. (journal 18:06, 18:13, 18:18 [AHA], `day3/01-20`; teardown §5)

Verdict in the teardown: "The multiplayer layer is real infrastructure wrapped around an
empty room… a parallel silo you would rebuild in, not a destination you move to."

**For Bench:** this is the whole thesis. Publishing is a **transfer of ownership to the
team**, not a permission grant. After publish the agent belongs to the team, has a named
maintainer, appears in the team store, and its runs, metric and requests roll up to the
team. The author keeps credit, not custody.

### B2 · Sharing is Google-Docs-shaped and familiar — **STEAL (the shape only)**
"People you share with can chat with this agent, edit its configuration and settings, and
view their own chat history with it." General Access: Restricted / Organization
("Users in Astronaut can view this Agent") / Anyone. Plus "Copy agent link" and
"Copy setup link". (journal 18:14 [AHA], `day3/12-13`)

Two useful pieces: the familiar three-level audience picker, and the distinction between
sharing the *running instance* and sharing the *build config*.

**For Bench:** audience picker = My team / Whole org / Named people. And an explicit
split: **Install** (use it, your data, your params) vs **Use as a template** (fork the
config into another team, which is the only sanctioned fork).

### B3 · Each collaborator gets their own history; ownership stays personal — **NOTE → spec it**
Sharing grants view/chat/edit and a private history; listing, trigger, knowledge and
ownership all stay with the author. (teardown §5)

**For Bench:** the spec must say, per field, what an install *copies* (param values,
credentials, history) versus what it *references* (instructions, guardrails, scopes,
version). v3 had this implicitly; it is now explicit.

### B4 · Artifacts run on the viewer's credentials and bill to the viewer — **STEAL**
Interactive artifacts are "HTML files that pull live data from your connected
integrations every time you open them", running "using the viewer's connected accounts,
not the creator's". (`03-AGENT-BUILDING-INSIGHTS` §2.6)

This is exactly Bench's per-user OAuth model, already drawn. The teardown confirms a
shipping product made the same call.

**For Bench:** keep per-user credentials; add the missing half — a granular per-connector
scope picker at grant time (see B6).

### B5 · Distribution stays one-to-one without a gallery — **STEAL the counter**
"With no public marketplace post-pivot, distribution stays one-to-one." The insight file's
recommendation: "pair it with a public gallery so distribution is one-to-many."

**For Bench:** the store *is* the gallery, and the spec adds cross-team promotion
(team → org) as a first-class flow rather than a copy-paste.

### B6 · The OAuth default is "unrestricted access to everything" — **AVOID**
The onboarding's scope modal pre-selects, as "Recommended", "Unrestricted access to
everything Gumloop can do with this connector"; the alternative is "Control scopes".
(`08-walkthrough` §1)

The documented cost: 28 forum topics on oauth-permissions, including a company refusing
the Slack integration's broad scope and an O365 admin grant being declined.
(`03-AGENT-BUILDING-INSIGHTS` §2.5)

**For Bench:** scope selection is per-connector, least-privilege by default, and the
install screen states in one line what each scope lets the agent see. A regulated
broker's IT will read this screen.

### B7 · Sell the outcome before asking for the permission — **STEAL**
The onboarding shows a simulated drafted reply, a meeting brief, a dashboard and a
terminal session *before* any connect button appears; permission asks land at steps 6–8.
(`08-walkthrough` §1)

**For Bench:** the install screen shows **what this agent would have said for you this
morning** — a real backfill preview on the installer's own data — before the consent step.

### B8 · Silent deprecation, with the repair pushed onto the customer — **AVOID**
Model deprecations broke running flows with no notice; the staff remedy was "if you
delete and add back the Ask AI and the Extract Data nodes you should be all set". Loop
modes, JavaScript support and templates were removed. The free-tier sunset locked
non-payers out of their own chat history. (`03-AGENT-BUILDING-INSIGHTS` §3.2)

**For Bench:** a written deprecation contract — notice window, automatic param migration,
version pinning, and a changelog that names the person who asked for each change.

---

## C · Monitoring — where the category is weakest

### C1 · The number-one organic feature request is a log — **STEAL (build it first)**
"Could really use a log" (topic 2736, 12 posts) is the #1 request by engagement on
Gumloop's own forum, ahead of agent customization and connector depth. Debuggability
carries 65 tagged complaint topics; the canonical failure is an error message that points
at the wrong node. (`03-AGENT-BUILDING-INSIGHTS` §2.8)

**For Bench:** the Run Log and the per-run trace are P0. Not analytics. A log.

### C2 · Blocked runs land as "Completed" — **INVERT (the sharpest finding)**
Two runs that could not do their job — one stopped for missing input, one hit a hard
block — both recorded as **Completed** in the ledger (25 credits for the blocked one).
The **Failed** tab read "No history yet" after seven scheduled runs including a blocked
one. The **Approval Required** tab read "No history yet" even though the agent asked
direct questions mid-run. (journal 18:40 [CONFUSED], `day3/31-33`; 19:20, `day4/23-25`;
teardown §8, §9)

The journal's verdict: "A scheduled agent that blocks on a question has no visible surface
outside its own chat: if you are not watching, you do not know it is waiting for you."

**For Bench:** a five-value run status — `completed` / `nothing_to_do` / `blocked` /
`failed` / `partial` — and a hard rule: **any run that ends `blocked` creates a visible
item for a named human outside the agent's own thread.** A run that did no work is never
called completed.

### C3 · The output hides in per-run chat threads — **INVERT**
Each triggered run spawns its own thread; the ledger records only cost and status.
"If you are not watching the threads, you do not know what your agents did — the ledger
will not tell you." (teardown §9, `day4/23-28c`)

**For Bench:** the run row carries the outcome in one line — what it read, what it
produced, what it changed — and opens into the full trace. The thread is a view of the
run, not its hiding place.

### C4 · The best cost surface in the product is buried — **INVERT**
`/settings/profile/usage-limits` (not `/settings/usage`, which redirects) itemises every
charge with timestamp, category, name, amount and a View link. "Every other cost surface
shows credits after the fact; this one itemizes them — and almost nobody will find it."
(journal 18:55 [AHA], `day4/11`)

**For Bench:** cost lives where the decision is made — on the trigger form, on the publish
screen, on the agent page, on the team pulse. Not only in settings.

### C5 · Two cost surfaces disagree — **AVOID**
The trigger drawer's credit counter undercounts the ledger's per-run sums by exactly 3 on
all three triggers (18 vs 21, 100 vs 103, 56 vs 59). (teardown §10, `day4/53`)

**For Bench:** one number, one source. Any surface showing cost reads the same ledger.

### C6 · The credit cliff is structural, and one agent is enough to trigger it — **AVOID (with numbers)**
Measured unit costs per triggered run: floor **7** (a heartbeat replying one word),
**19** (a run that only blocks), **33** (a 30-row scrape), **37–85** (the watchdog, n=4).

- 4-agent grid on 15-min schedules: 157 credits / 20 min ≈ 11,300/day → the 20k monthly
  allowance in **under 2 days**
- one watchdog on the trigger builder's own default cadence: 1,776–4,080/day → **5–11 days**
- the floor — a do-nothing agent on a 15-minute schedule: 672/day → **~30 days**

The counterpoint that matters: the entire four-day program — every build, chat and read —
cost ~1,200 credits. **The chat product is cheap; the scheduler is the cliff.**
(teardown §10; journal 19:26 [AHA])

Plus a background meter: `inbox_classification` bills 1 credit every 1–3 hours whether the
product is used or not.

**For Bench:** three requirements fall straight out. (1) Cost is projected **before** a
schedule is saved. (2) Every agent carries a run budget with an auto-pause and a
notification — never a silent disable. (3) Nothing bills that does not appear as a run.

### C7 · The one place a price appears before the action — **STEAL**
The Brain's pre-sync panel: "documents found: 1, to sync: 1, estimated cost ~5 credits",
with a re-sync warning. "This is the first place in the product that shows a price BEFORE
an action rather than in the task ledger after it. Every credit-consuming surface should
work that way." (journal 17:26 [DELIGHT], `day1/40`; teardown §3)

**For Bench:** adopted as a product law — see `03-decisions-log.md`, law 6.

### C8 · Creation is one click; deletion took six passes — **AVOID**
The trigger drawer shows only "Edit trigger"; the edit form offers only Back and Save.
The actual trigger menu — Deactivate / Delete — hides behind an **unlabelled ellipsis
with no aria-label**, invisible to text navigation and screen readers. Locating it cost
~640 credits of accidental runs. (teardown §7, §10; journal 21:00, `day4/50-52c`)

**For Bench:** one Schedules screen listing every live trigger across the team, with
pause and delete on the row, labelled, keyboard reachable. Symmetry rule: **anything you
can create in one click you can stop in one click.**

### C9 · The home page pulls you back — **STEAL**
Recent Activity, Upcoming Triggers and Most Used Agents surface accrued state on return.
"The retention loop has a visible entry point." (journal 17:34 [DELIGHT], teardown §2)

**For Bench:** the admin pulse opens with a health strip — what ran, what is waiting, what
is burning budget, what stalled.

### C10 · An eval that cannot block anything is shelf-ware — **STEAL (already right)**
Gumloop shipped a 17-operation Evaluations API; exactly 1 of 6,377 forum posts contains
"evaluation", and it is noise. Agent versions have no deploy or rollback endpoint, so an
evaluation can flag a regression and nothing can act on it. Relevance AI took the opposite
side: publish gates that block deployment below a pass rate.
(`03-AGENT-BUILDING-INSIGHTS` §2.7)

"An eval coupled to a gate is a control; an eval coupled to nothing is a report nobody reads."

**For Bench:** v3 already blocks publish on a failing guardrail scenario. The spec keeps it
and adds the missing half — **rollback**, and a regression rule (a version that breaks a
previously passing scenario cannot publish without an explicit, logged override).

### C11 · Approvals as an API primitive, conditioned on arguments — **STEAL**
Sessions pause in `approval_required`; `POST /sessions/{id}/approvals` resolves 1–20 asks
per call and returns a cursor to resume. **App Rules** are "conditional approval
requirements using CEL expressions that evaluate the actual arguments of each tool call",
org-wide or per agent. (`03-AGENT-BUILDING-INSIGHTS` §2.3)

The recommendation attached: "make Slack the default approval surface, where the approver
already is."

**For Bench:** approval rules are conditional on what the action *is* — value threshold,
external recipient, named client — not merely on the agent's autonomy level. Batch
approve. Slack as a surface.

### C12 · Determinism is what a switcher gives up — **NOTE (the design constraint)**
"A Gumloop run is a chat thread — '16 Steps' you can read but not open; a Zapier/n8n run
is an inspectable graph you can debug." (teardown §12)

**For Bench:** the trace is the answer to this. Every step, its source, its duration, its
cost, and — the part nobody ships — what it decided *not* to do.

---

## D · Carried context (not directly actioned)

- **Per-user OAuth wins activation and fails the security review.** Bench already chose
  per-user; the fix is granular scopes, not a service account. (`03` §2.5)
- **Breadth-first connectors without per-connector depth** is the third-largest complaint
  family (226 topics). Depth on the ~20 systems that matter beats a connector count.
  (`03` §3.3)
- **Keep the self-serve ladder.** Deleting entry tiers to force enterprise produced an
  acqui-hire at Stack AI. (`03` §3.4)
- **Chat-first authoring, deterministic workflow as the escape hatch, never a canvas as
  the front door** — three practitioners abandoned the canvas within a year.
  (`03` §2.10, `04` D1). Bench's chat-drafts-form-refines decision already agrees.
- **Governance in the base tier.** Gumloop designed per-role spend caps correctly and
  priced them above the users who feel the pain. (`03` §2.4, §3.1)
