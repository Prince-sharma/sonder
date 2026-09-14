# Eval UX for non-engineers · adoption measurement · seat economics

## A. Making an eval product a sales lead will use

Every platform surveyed — Braintrust, LangSmith, Langfuse, Vellum, Humanloop, Promptfoo,
OpenAI Evals, Azure AI Foundry, Agentforce Testing Center — converges on the same object
model: **dataset → evaluator → run → results table → comparison → iterate**.

Graders come in three families everywhere: LLM-as-judge, code assertions, human review.
Vocabulary splits by vendor: Braintrust "scorers", LangSmith/Azure "evaluators",
Promptfoo "assertions", Humanloop "Evaluators" with a review queue. Salesforce
deliberately avoids "dataset" — it says **test cases** with columns *Utterance, Expected
Subagent, Expected Actions, Expected Response*.

**Auto-generation from config exists, and Salesforce is the precedent.** Agentforce
Testing Center generates test cases from the agent's assigned subagents and actions: pick
a count, write a description, click Generate. Aimed at admins, not developers. Azure adds
"generate test data" plus an **AI Red Teaming Agent** for adversarial cases.

**"Improve the prompt" features.** Braintrust **Loop** is the clearest — a conversational
assistant that optimises prompts, **bootstraps scorers from production traces**, and
**builds datasets from problematic traces**, pitched so "product managers can analyze
production behavior without writing code".

### What survives for a non-technical domain expert

| Keep | Hide | Rename |
|---|---|---|
| A list of realistic situations | Scorer code and config | *eval* → "test run" |
| Plain pass/fail with a one-line reason | Judge model and temperature | *dataset* → "situations" |
| A run button | Thresholds | *grader* → "what good looks like" |
| Before/after side by side | Token and cost columns | *experiment* → "version" |
| "What got worse" flagged | Trace trees, SDK/CI | *regression* → "what broke" |

The strongest pattern is Agentforce's: **auto-generate the scenarios from the config the
admin already built**, so the blank-page problem never appears, and express results as
expected-vs-actual behaviour rather than numeric scores. That is what the Test Lab screen
implements.

## B. Enterprise AI adoption — what's real

**Microsoft's segment definitions are the de-facto standard** (Viva Insights) and the
prototype uses them verbatim:

- **Power user:** ≥15 actions/week **and** active in ≥9 of the past 12 weeks
- **Habitual:** 1–14 actions/week and ≥9 of 12 weeks
- **Novice:** any action in 12 weeks but <9 active weeks
- **Non-user:** none

**Seats bought vs seats used.** Microsoft disclosed **>30M paid Copilot seats** (Q4 FY2026
earnings, 29 July 2026), up from 20M in April and 15M in January — but **has never
published activation rates**. Two caveats matter: Microsoft's default adoption threshold
is **one use per 28 days**, which Gartner's Dan Wilson criticised as far too loose; and
Gartner (2 June 2025, n=187 IT leaders) found only **5% of pilots moved to larger-scale
deployment**, with nearly half rating pilots as merely "some value, shows promise".

*Do not cite* "only 1% use Copilot weekly" or "70% of Fortune 500 adopted Copilot" —
both are unsourced or frozen 2024 pilot figures.

**Measured time savings are real but modest.** UK Cross-Government trial: **26 min/day**.
DWP: **19 min/day**. HMRC Phase III: **~60 min/week**. NBER WP 33795 (May 2025): ~2 fewer
email hours/week for engaged users but **no detected shift in task quantity or
composition** — time saved ≠ output gained. This is why the prototype's outcome metrics
are instrumented business numbers, never "hours saved".

**ROI attribution is genuinely hard.** McKinsey State of AI (Nov 2025): 88% use AI in at
least one function, **only 39% report EBIT impact**. PwC 29th Global CEO Survey (2026,
n=4,454): **56% saw neither revenue increase nor cost reduction**; only 12% achieved both.
Plug and Play (Aug 2026): 74% of large enterprises run ≥1 AI solution but **half cannot
consistently measure whether it works**. (MIT NANDA's "95% of pilots deliver zero return"
is widely cited but thin — 52 interviews, 153 survey responses; flag it if used.)

**Frameworks.** BCG's **10-20-70 rule** (Jan 2025): 10% algorithms, 20% data/tech,
**70% people, process, culture**. Leaders focus on 3.5 use cases vs 6.1 for others and
expect 2.1× ROI; fewer than a third of companies have upskilled even a quarter of their
workforce. Microsoft publishes a formal Copilot Adoption Playbook (champions networks,
role-based scenario libraries, habit formation).

**Leaderboards backfire, documented.** The "leaderboard loser effect" disenfranchises the
majority ranked below the top; public social comparison produces stress; "pointless
pointification" reads as manipulative; and the overjustification effect (Deci, 1971) means
extrinsic rewards erode intrinsic motivation and usage collapses once rewards stop.
**Practical read: team-level, opt-in, progress-vs-self survives. Individual public
rankings of AI usage invite metric-gaming and surveillance backlash.** Hence the
prototype keeps per-person rankings admin-only and gives the user their own mirror page.

## C. Seat economics (list prices, verified 14 Sept 2026)

| Product | Annual | Monthly | Conditions |
|---|---|---|---|
| Claude Pro | $17/mo | $20/mo | Individual |
| Claude Team Standard | **$20/seat/mo** | $25 | 2–150 seats |
| Claude Team Premium | $100/seat/mo | $125 | 5× usage |
| Claude Enterprise | $20/seat + usage | — | Annual, minimum commitment |
| ChatGPT Business | **$20/seat/mo** | $25 | Min 2 seats; cut from $25/$30 April 2026 |
| ChatGPT Enterprise | ~$45–75/seat/mo (est.) | — | **Not published**; ~150-seat floor |
| M365 Copilot | **$30/user/mo** | — | Annual; requires eligible M365 base |
| M365 Copilot Business | $18/user/mo | $25.20 | **Promo expires 30 Sept 2026** |
| Google Workspace Bus. Standard | ~$14/user/mo | — | Gemini bundled, not optional |
| Glean | ~$60–65 all-in (est.) | — | **Not published**; ~100-seat floor |
| Dust Pro | €24/seat/mo | €30 | 8,000 credits/seat/mo |

**The argument that actually works.** The per-business-user floor is $20/seat/mo and the
realistic enterprise band is $30–65. A platform licence lands in the same range, so
**price-per-seat is not the pitch**. The pitch is the denominator: at a 28-day activity
threshold and a 5% pilot-to-production rate, a large share of those seats is provably
idle, so one platform licence per business user competes against
**$20 × N × (1 / activation rate)**, not $20 × N. That is what the org overview screen
argues: $54 per *active* user before, $18 after.

**Stale-risk flags.** Glean and ChatGPT Enterprise figures are third-party estimates. The
M365 Copilot Business $18 rate expires 30 Sept 2026. Microsoft has never disclosed
activation rates, so any "% of seats actively used" claim is inference. Reconfirm before
quoting externally.
