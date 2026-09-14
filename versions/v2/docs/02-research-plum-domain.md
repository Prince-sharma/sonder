# Plum, and how group health broking actually works in India

Research behind the domain content in the prototype. Everything in the seed data — the
RFQ flow, CD balances, ICR, loading, the 1 April cluster — comes from here.

## Plum

Bengaluru, founded 2019 by Abhishek Poddar (CEO, ex-McKinsey/Google) and Saurabh Arora
(CTO). Both an insurtech platform *and* a regulated intermediary: **Plum Benefits
Insurance Brokers Pvt Ltd**, Direct Broker (Life & General), registration **897**,
upgraded from corporate agent around June 2023. The upgrade mattered — as a corporate
agent they were capped at 9 tie-ups per category and ₹5 Cr sum insured.

**Sells:** Group Health (GMC), Group Term Life (GTL), Group Personal Accident (GPA),
FlexCare, plus commercial lines (D&O, cyber, E&O). Wrapped in teleconsults, checkups,
mental health, dental/vision, parental cover, and an employee app for e-cards and claims.

**Scale (company-stated):** 6,000+ companies, ~600,000 lives, 100,000+ claims processed.
Named clients include Zomato, Swiggy, CRED, Urban Company, Atlassian, HubSpot, Notion.

**Financials (filed):** broking entity revenue ₹41.3 Cr FY24, up 2.5× from ₹16.2 Cr FY23.
**93% of revenue is insurance commission** (₹38.5 Cr) — classic brokerage, not SaaS.
Loss narrowed to ₹25.5 Cr from ₹55 Cr. ~$20.6M Series B (₹193 Cr) March 2026, led by
Peak XV with Tanglin and GMO; earlier backers Tiger Global and Sequoia India.

**Competes with:** Onsurity (subscription, from ₹145/employee/month), Loop Health
(YC, in-house doctors), Pazcare, Nova Benefits, Alyve, Even. Kenko Health shut down
August 2024 after an investor deadlock. Displaces traditional brokers: Marsh India,
Aon, WTW, Gallagher, Howden, Lockton, SecureNow, Policybazaar for Business.

## The lifecycle, with its real vocabulary

**Lead → discovery.** Collect the **census** (headcount by age band, salary band, family
composition), prior-year **claims MIS**, and the expiring **SOB**. Census quality
determines quote quality; a bad census means re-rating later.

**RFQ → quotes.** Float an **RFQ** to insurers. They price on **burn cost** from three
years of claims experience. The broker collapses their differing formats into a **quote
comparison sheet** — the single most-used artifact in the business.

**Proposal.** A **benefit illustration** / **SOB (Schedule of Benefits)** documents
**sum insured** tiers, **family definition** (E / E+S+2C, or **1+5** including parents —
the expensive extension), **room rent capping** (1–2% of SI per day, or single private
room), **co-pay** (10–20%, often parent-specific), **corporate buffer** (pooled top-up
for claims exceeding individual SI), maternity limits, waiting periods, PED waivers,
and wellness riders.

**Negotiation → placement.** Levers: **loading** (premium uplift for adverse experience),
co-pay, room rent, buffer size. Issues as a master policy, 3–7 working days.

**Onboarding → servicing.** Member data uploaded in **TPA** format, e-cards issued. Every
mid-term change — joiner, exit, marriage, newborn — is an **endorsement**, pro-rata
premium drawn from the **CD (Cash Deposit) account**, a float the corporate parks with
the insurer. **A depleted CD means new joiners go uncovered**, so chasing top-ups is a
core account-management duty. (This is why CD Watch is the one auto-acting agent in the
prototype.)

**Renewal.** Starts 60–90 days out. Pull **ICR / loss ratio** (claims paid ÷ premium
earned), argue it down, negotiate with the incumbent, re-market if uncompetitive.

**Seasonality.** Renewals cluster heavily on **1 April** (Indian FY), with a secondary
**1 January** cluster from MNC subsidiaries on a global calendar-year cycle. *No
published statistic quantifies the April share — treat it as well-established practice,
not a verified figure.* Renewals dominate revenue: a group book renews annually at
near-zero acquisition cost. **Business is won on advisory and kept on servicing** —
endorsement TAT and claims turnaround decide retention.

## Sales org and metrics

**Roles.** SDR/BD; AE and Enterprise AE (split by lives — under 300 / 300–1,500 /
above 1,500); **Placement / Underwriting Desk** (owns insurer relationships, floats
RFQs, negotiates — the scarcest function and the real bottleneck); Account Manager
(endorsements, CD balance, claims escalation, renewal); Sales Ops.

**KPIs.** SDR: qualified meetings, pipeline coverage (3–4×). AE: win rate, GWP/premium
placed, brokerage revenue, lives covered, cycle length. Placement: **quote TAT** (24–72h
is competitive), proposal TAT, quote-to-bind, options per RFQ. AM: **renewal retention**
(85–90%+ healthy on lives), endorsement TAT, claims TAT, NPS, cross-sell attach.

**Compensation.** India broking pays on **brokerage earned, not premium placed** — a
₹1 Cr premium at 5% and at 12.5% are very different deals. Typically 70:30 or 75:25
fixed:variable for AEs, quarterly quota, accelerators above 100% (1.25–1.5×), new
business weighted 2–3× renewal, clawback if the policy lapses or the CD is never funded.

**Regulatory note.** IRDAI's Payment of Commission Regulations 2023 and EOM Regulations
2023 **removed product-wise commission caps**, replacing them with board-approved
insurer remuneration policies under an overall expenses-of-management ceiling. Group
health brokerage is now negotiated per case. *No reliable current market range could be
verified; treat published percentages cautiously.*

## What separates a top performer

Four things, all specific to this business. These are the `context.excellence` entries
on the Business Context screen.

1. **They sell the renewal defence, not the first policy.** A lowball year-one quote
   wins the logo and loses the account when the loading lands. The good ones price for
   year two.
2. **They have underwriter relationships, not insurer contacts.** A top AE gets a
   marginal loss-ratio account looked at *at all*, and gets terms desk-approved in 48
   hours instead of a week.
3. **They read the claims MIS before the client does.** Arriving at renewal with a
   utilisation story and a design fix beats arriving with three quotes.
4. **Their servicing never slips.** CD never hits zero, endorsements clear inside SLA, a
   stuck cashless authorisation escalates in hours. HR remembers exactly one thing at
   renewal: what happened the day someone's claim got stuck.

## Not verified

The exact 1-April renewal share; current market brokerage percentages; Plum's cumulative
funding (the ~$20.6M figure is the Series B alone); Plum's current GWP placed; the
operating status of Nova Benefits, Vital and Alyve as of Sept 2026.

## Sources

- https://www.plumhq.com/blog/plum-receives-the-irdai-broker-license
- https://www.plumhq.com/blog/how-does-group-health-insurance-work-india
- https://inc42.com/buzz/insurtech-startup-plum-nets-%E2%82%B9193-cr-to-expand-employee-health-benefits-platform/
- https://entrackr.com/fintrackr/plum-insurance-revenue-surges-25x-in-fy24-cuts-losses-by-half-7782487
- https://www.jsalaw.com/newsletters-and-updates/new-regulations-on-payment-of-commission-and-expenses-of-management/
- https://www.business-standard.com/companies/news/peak-xv-backed-kenko-health-shuts-down-after-running-out-of-funds-124082300669_1.html
- https://insurtechdigital.com/articles/onsurity-secures-us-45m-in-series-b-funding-for-smes
