# The brief, and the four decisions that shaped the build

## Problem as stated

Employees get individual Claude subscriptions. A few make excellent use of them —
automating work, building workflows. Most don't adopt at all. Some adopt but never get
much out of it. This is about business teams, not engineering/product/design.

Why it's a problem: high AI spend for the return, no way to share how the good users
work, poor change management across business teams, and the productivity gain never
lands.

## Thesis

Individual subscriptions are the wrong unit. One application where the person with the
most domain expertise — who has already built this for themselves — publishes an agent,
and their whole team installs it and gets value from the first trigger. Effort
concentrates on building the agent well; everyone else just uses it.

Worked example, sales: a daily digest, an email drafter, a pre-meeting researcher, an
RFQ helper, a deck builder. Each declares input parameters the user can set (when the
digest arrives, how often) and one output parameter it aims to move (email response
TAT, % of emails unaddressed for three days).

Roles: the admin publishes; the user installs, changes input parameters only, and can
suggest changes but not fork; the super admin sees every agent, every user, adoption
and impact, and uses that to drive change management. Teams are first-class (sales,
marketing, claims, account management) with some org-wide agents. Each team's business
context — how it works, its targets, its incentive structure, what separates a good
performer from a weak one — is captured and attached to its agents.

Intended moat: agent creation itself. The platform runs test cases on sample inputs,
evaluates the agent, and tells the admin how to make it better.

Pitch: cheaper than a seat per business user, drives org-wide AI change management, and
replicates your best performer's skill across the team.

## The four decisions

Asked and answered before any screen was drawn.

**1. How an SME builds an agent → chat drafts, form refines.**
The SME describes it in chat; the platform interviews them and produces a structured
config they can edit field by field. Chat alone leaves an admin nothing to review,
version or test. A form alone hands a sales lead a blank page. The config is also the
schema a developer builds against.

**2. Where output lands → a Today feed, plus per-agent threads.**
Every installed agent drops cards on one home surface; each card opens into that
agent's own thread. Makes the platform a daily habit, which is also where the usage
signal comes from. Per-agent threads alone give no single "what needs me today".

**3. Autonomy → per-agent levels, admin-set.**
Suggest / Draft / Auto-act. Anything above Draft flows through an approval inbox. Gives
a regulated broker a trust story and a place to see everything an agent wants to send.

**4. Prototype scope → all three roles, sales end-to-end.**
Rather than going deep on one slice.

## Design decisions taken inside the prototype

- **The outcome metric is a required field that blocks publish.** Not a dashboard
  afterthought. See `03-research-agent-platforms.md` — nothing on the market does this.
- **Per-user input parameters are declared by the author**, who also writes the list of
  what is locked and why. The user's only route past a lock is a request.
- **Requests are the adoption loop.** Users can't fork, so pressure has to go somewhere.
  Uninstalling forces a reason. Requests carry vote counts and link to the version that
  ships them. Release notes name the person who asked.
- **Individual usage rankings are admin-only.** See `04-research-eval-adoption.md` on
  how public AI-usage leaderboards backfire. Users see their own numbers on a page
  nobody else can open.
- **"Ignored" is tracked separately from "dismissed."** Dismissed is a judgement call;
  ignored is a design failure. Every incumbent's analytics conflates them.
- **Eval vocabulary is banned from the UI.** No "eval", "grader", "dataset". A sales
  lead gets situations, what should happen, what did happen, and what broke.
- **Team setup enforces its order:** business context before the first agent. Teams that
  published first produced generic agents.
