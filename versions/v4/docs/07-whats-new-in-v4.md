# What's new in v4 — and why each thing is here

v4 is v3 plus the operational layer, and every addition traces to an observation from the
founder teardown in `~/Desktop/code/gumloop` — a real operator driving a real shipping
agent platform on a real account for four compressed days. The evidence digest is in
`~/Desktop/code/sonder/work/01-gumloop-digest.md`; the decisions are in `03-decisions-log.md`.

v4 opens at the **full pilot** so every new surface is populated on load. v3's journey bar
still works — take any stage from it, or deep-link `bench.html?stage=1`.

---

## New screens

| Route | Screen | The finding that put it there |
|---|---|---|
| `#/a/runs` | **Run log** | "Could really use a log" is the #1 organic feature request by engagement on the incumbent's own forum, ahead of agent customization and connector depth. v1–v3 declared `Run.trace[]` in the object model and drew it on no screen. |
| `#/a/run/<id>` | **Run trace** | A run in that product is a chat thread with a "16 Steps" counter you can read but not open. Amber steps here are decisions *not* to act — a missing source, a declared unknown, a refusal. |
| `#/a/schedules` | **Schedules & budget** | Creating a trigger there is one visible click; deleting one took six passes, behind an unlabelled ellipsis with no aria-label. And: one agent on that builder's own suggested cadence burns a month's allowance in 5–11 days. |
| `#/a/new` | **Create an agent** | "Create Agent does not open a wizard — it instantly creates a working agent and drops you in a full workspace. Zero-to-agent in ~12 seconds." The four nudges that follow are the pattern the journal says to steal verbatim. |
| `#/a/share` | **Share & ownership** | The teardown's headline failure: nothing crosses personal → team. Org sharing was switched on and verified; the team's list, home, triggers and knowledge all stayed empty. There is no move-to-team control anywhere in that product. |
| `#/s/spend` | **Spend & governance** | That product designed per-role spend caps correctly and priced them, with rollover and insights, above the tier that feels the pain. Five of nine documented churn stories are billing mechanics; none cite the sticker price. |
| `#/m/waiting` | **Waiting on you** (member) | "A scheduled agent that blocks on a question has no visible surface outside its own chat: if you are not watching, you do not know it is waiting for you." |

## Changed screens

**`#/a/build` — the builder.**
The trigger is a sentence now, not a dropdown: type "Every day at 7, and when an account
crosses T-90", it parses and echoes the parse back — and directly under it, what that
cadence costs a month, before you save. A fifth tab, **Try it for real**, runs the draft
read-only against three of your own accounts and lists every write it *would* have made.

**`#/a/pulse` — team pulse.**
Opens with a "Needs you today" strip: the failed run and its cause, the run waiting on
Vikram, the agent about to cross its budget, the install that has found nothing three days
running, and the draft nobody has touched in nine days. Every one of those five is invisible
in the product we studied.

**`#/a/publish` — publish & rollout.**
Adds the cost projection and the budget cap defaulted from it, and a rollback panel — a
publish gate with no undo behind it is half a control.

**The install modal.**
Shows what the agent would have said for you this morning, on your own data, read-only —
*before* the consent step. Then each source is a separate grant you can decline, with a
plain line saying what it lets the agent see. The onboarding we studied sells outcomes for
five steps before asking a single permission, and then pre-selects "Unrestricted access to
everything" as Recommended.

**`#/h/spec` and `#/h/flows` — the handoff.**
`Run` is rewritten with a five-value status, `RunStep`, `Ask` and `Failure`. `Trigger`,
`Budget`, `Agent.ownership`, `AgentProposal` and `SelfModPolicy` are new. Three flows added:
a run that stops, publish as a transfer, and budget bites. The permissions table gains eight
rows. Two items left the "deliberately not drawn" list — the runtime and billing — and four
honest new ones took their place.

---

## The five rules v4 is built on

1. **A run that did no work is never called completed.** Five statuses; members see two, in words.
2. **Cost appears before the commitment**, never only in a ledger afterwards.
3. **One number, one source.** Two cost surfaces disagreeing by three units is the bug being designed against.
4. **Anything created in one click can be stopped in one click, from a labelled control.**
5. **An agent may propose; only a person publishes.**

---

## What v4 still doesn't draw

Mobile. One person's day zero (v3 draws the org's). Search. The invoice and plan page —
there is a meter, a projection and caps, but no bill. Notifications as a system: six places
now say "and both of them are told", and what the channel is, what it says and how someone
turns it down is not drawn. The deployment ladder for the regulated segment is in the spec
and on no screen.
