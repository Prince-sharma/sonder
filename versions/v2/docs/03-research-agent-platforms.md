# Who already builds internal agent platforms, and what they don't do

Surveyed Sept 2026. The conclusion that matters is at the bottom: **the two things
central to this thesis — per-user parameters on a shared agent, and an outcome metric
bound to the agent — are not shipped by anyone.**

## Per product

### Microsoft — M365 Copilot Agent Store + Copilot Studio
Agent Store sits inside Teams/Outlook/Word/Excel/PowerPoint with a **"Built by your org"**
collection. Publishing is gated: maker submits from Copilot Studio → pending in the M365
admin center → admin publishes or rejects. Three install paths: Microsoft-preinstalled
and pre-pinned, admin-installed with user/group targeting, user-installed.

Agent Builder has a **Describe** tab (chat) and a **Configure** tab (form) — name, icon,
description, instructions (8,000 chars), knowledge (≤20 sources), capabilities, model
mode, starter prompts. Copilot Studio adds topics, tools, autonomous triggers.
**No per-user installer-set parameters.**

**Agent Evaluation (GA)** is the second-strongest eval product here: test sets ≤100
cases generated from description, knowledge, topics and **production conversation
themes**, or CSV import; 7 graders; 89-day retention.

The **Copilot Agents Usage Report** is the only true **per-user × per-agent** table
found anywhere — agents used, responses received, creator type, licensed/unlicensed
actives, last activity. It counts *responses*, a volume proxy with no outcome attached.

Pricing: M365 Copilot **$30/user/mo** enterprise, Business $21. Copilot Studio prepay
$200/mo per 25,000 credits; PAYG $0.01/credit.

### OpenAI — Workspace Agents + AgentKit
Workspace agents replace org custom GPTs (being deprecated for Business/Enterprise/Edu).
An **Agents tab** lists coworker-built agents grouped by team. No per-user install action
documented — sharing is permission-based. Chat-first creation powered by Codex; agents
carry memory. On-demand, scheduled and Slack-mention triggers; output lands in Slack,
email drafts and connected tools. **Write actions default to "Always ask"** — a genuine
HITL default. AgentKit (developer surface) is a drag-and-drop node canvas with inline
evals, versioning and automated prompt optimisation.

Analytics are thin: total runs, unique users, an activity feed. ChatGPT Business from
$20/user/mo; Enterprise not published.

### Glean
**Agent Library** cards show name, verified/company badge, author and usage signals;
search covers internal steps too. No install/pin/favourite — you just launch. **Agent
Builder** is a step-by-step workflow editor, buildable by natural language; preview
sandbox, 30 retained versions. Triggers: chat message, **input form** (text, upload,
multiple choice), content/event change, and schedules that reuse saved inputs.

The **Enterprise Agent Development Lifecycle** (May 2026) adds a "Performance" stage for
defining success metrics and an Agent Insights dashboard — adoption, top use cases,
**estimated hours saved** — marked *coming soon*. Shipping status unverified. Per-seat
pricing not published; third parties quote ~$50+/user/mo with ~$100k annual minimums.

### Dust
Publish → visible to all workspace members with data access. Discovery by admin-managed
tags, not a curated store. Builder: handle, description, tags, rich-text instructions
with accept/reject AI diffs, model + temperature, MCP tools, knowledge. Invoke via
`@agent` in Dust or `@dust +Agent` in Slack.

Scheduling exists but **"triggers are currently personal, and only the editor can
observe the runs"** — the inverse failure of what this platform needs. Analytics are
cost-shaped: credits by agent, member, group, model, tool. Most transparent pricing in
the set: Pro €24/seat/mo yearly, Max €120.

### Salesforce Agentforce
Low-code Agent Builder over Flows/Prompts/Apex/MuleSoft; Agent Script for determinism.
AgentExchange is a partner/ISV marketplace, not an employee store.

**Testing Center is the deepest eval product surveyed** — AI-generated tests from the
agent's own subagents and actions, knowledge Q&A tests, uploads, batch runs, scorers for
accuracy, action validation, completeness, coherence, conciseness, latency, instruction
adherence, custom scorers, and version comparison. Command Center gives real-time health,
error rates, escalations, adoption ranking, OpenTelemetry tracing.
Pricing: $0.10/action, $2.00/conversation, ~$125/user/mo seats reported.

### Google — Gemini Enterprise (ex-Agentspace)
Best discovery UX in the set. **Agent Gallery** cards show name, description, Draft/Live
status, a **pin icon** and a ⋮ menu; categories are All / **Pinned** / Made by Google /
From your organization / Your agents / **Marketplace**. **Pinning is the de-facto
per-user install** — pinned agents persist in the left nav. Agent Designer fields: name,
description, instructions, model, data & tools, knowledge uploads, starter prompts.
Scheduled runs take a fixed prompt and are **explicitly not supported for actions
involving other people**. Business $21/seat, Standard $30+, Plus $50–60.

### Prosumer tier
**Zapier Agents** — templates gallery, per-agent Owner/Editor/Viewer sharing, no org
directory. **Relay.app** — strong HITL approvals, $38/$138 per month.
**Gumloop** — node canvas, $37 Solo / $244 Team. **Lindy** — $29.99–$199.99/user.

### Others
**Moveworks** — AI Agent Marketplace (admin-level install, not per-employee), Agent
Studio with **slots** for structured user input, Go-Live Checklist. **Writer** — 100+
ready agents, no analytics or ROI tooling found. **Sierra** — Ghostwriter builds from
SOPs and transcripts; **outcome-based pricing, you pay per successful resolution**.

## Patterns that have become standard

1. **Gallery + @mention duality** — a library for discovery, in-chat `@agent` to invoke.
2. **Verified / "built by your org" badge** as curation instead of app-store review.
3. **Describe-then-configure dual-mode builder.** Everyone converged on this. It is the
   right call — and it's decision 1 in the brief.
4. **Starter prompts as the onboarding affordance** — the industry's substitute for
   input parameters.
5. **In-builder preview pane + versioned publish.**
6. **Trigger trilogy:** on-demand, schedule, content/event.
7. **"Always ask" approval gate on write actions** (OpenAI, Gemini, Lindy, Relay).
8. **Admin report keyed on active users + responses/runs.**
9. **Credit meters** layered over seats.

## The four gaps

**Per-user parameters on a shared agent.** Only Glean's Input Form trigger and Moveworks'
slots come close, and both are *per-run* inputs, not durable per-installer configuration.
Nobody lets an employee bind persistent personal values — my region, my project, my
quota — to a shared agent without forking it. Dust demonstrates the inverse failure:
triggers are personal but only the editor sees the runs.

**Outcome metric attached to an agent.** Not a first-class field anywhere. Glean's ADLC
has a "Performance" stage; the shipped surface is adoption and *estimated hours saved*.
Microsoft lets you upload org KPIs into Viva Insights, but they attach to the tenant,
not to an agent.

**Adoption + impact per agent AND per user.** Microsoft alone has the per-user ×
per-agent join, and it counts responses. Dust's per-agent/per-user data is credit spend.
**No product joins agent usage to a business-system metric.**

**"Replicate the top performer's workflow."** No product does this. The nearest
primitives — Glean's card usage signals, Dust's Insights tab, OpenAI's activity feed —
all report volume, never *who achieves good outcomes*, and none package a high
performer's configuration for redistribution. This is the clearest open thesis in the
space.

**Does anyone bind the business metric to the agent?** No, with one oblique exception:
**Sierra** makes the business outcome the *billing unit*. But it's a single vertical
(CX), a contract term rather than an authored field, and pricing is unpublished.

## Not verified
M365 Agent Store card fields; Glean, ChatGPT Enterprise, Sierra, Agentforce seat,
Moveworks and Writer per-seat prices (none published — figures are third-party);
OpenAI's dollars-per-credit; whether Glean's Agent Insights has shipped; Moveworks'
marketplace install flow.
