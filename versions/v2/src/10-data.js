<script>
/* ═══════════════════════════════════════════════════════════════════════════
   BENCH — UI/UX prototype for an internal agent platform
   Pilot tenant: Plum (group employee-benefits broker, India) · Sales team
   All figures below are illustrative pilot data, not Plum's real numbers.
   ═══════════════════════════════════════════════════════════════════════════ */

const PEOPLE = {
  rhea:   {n:"Rhea Nair",       r:"Enterprise AE · West",   i:"RN", seg:"power"},
  karan:  {n:"Karan Mehta",     r:"Sales Lead · West",      i:"KM", seg:"power", admin:true},
  ananya: {n:"Ananya Rao",      r:"VP Revenue Operations",  i:"AR", seg:"power", super:true},
  meera:  {n:"Meera Iyer",      r:"Placement Desk",         i:"MI", seg:"power"},
  vikram: {n:"Vikram Rathore",  r:"Enterprise AE · North",  i:"VR", seg:"habitual"},
  aditya: {n:"Aditya Shetty",   r:"AE · SMB",               i:"AS", seg:"habitual"},
  sanya:  {n:"Sanya Kapoor",    r:"Account Manager",        i:"SK", seg:"habitual"},
  ishita: {n:"Ishita Sharma",   r:"Sales Operations",       i:"IS", seg:"habitual"},
  nikhil: {n:"Nikhil Bansal",   r:"AE · Mid-market",        i:"NB", seg:"habitual"},
  priya:  {n:"Priya Menon",     r:"Account Manager",        i:"PM", seg:"novice"},
  rohan:  {n:"Rohan Gupta",     r:"AE · SMB",               i:"RG", seg:"novice"},
  arjun:  {n:"Arjun Pillai",    r:"AE · South",             i:"AP", seg:"novice"},
  farhan: {n:"Farhan Qureshi",  r:"AE · Mid-market",        i:"FQ", seg:"dormant"},
  divya:  {n:"Divya Krishnan",  r:"AE · West",              i:"DK", seg:"dormant"},
  tanvi:  {n:"Tanvi Desai",     r:"SDR",                    i:"TD", seg:"dormant"}
};

/* ── agent catalogue ─────────────────────────────────────────────────────── */
const AGENTS = [
{
  id:"rundown", name:"Morning Rundown", mono:"MR", tone:"a", team:"Sales", by:"karan", v:"4.2",
  tag:"Daily digest", verified:true,
  blurb:"Reads the last 72 hours of your mail, Slack and HubSpot and tells you the five things that will cost you money if you skip them today.",
  long:"Scans every thread you're on, cross-references it against your open pipeline, and ranks what needs you by rupees at risk — not by recency. Cold deals, unanswered client questions, renewals crossing a threshold, and CD balances running dry all surface in one list.",
  trigger:{kind:"Schedule", detail:"Weekdays, 08:15 IST", icon:"clock"},
  plain:{runs:"Every weekday, 8:15 AM", trust:"Just tells you — never touches anything"},
  reads:["Gmail","Slack","HubSpot — deals, activities","Google Calendar"],
  writes:[], autonomy:"suggest",
  metric:{name:"Open deals with no touch in 7+ days", unit:"%", base:23, now:9, target:10, dir:"down",
          src:"HubSpot · last activity date on open deals owned by the team",
          series:[23,22,19,17,14,12,11,9], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:12, active7:11, runs30:248, actedPct:63, dismissPct:21,
  params:[
    {k:"send_at", label:"Deliver at", type:"time", val:"08:15", hint:"Your local time. Runs Monday–Friday."},
    {k:"cadence", label:"Frequency", type:"select", val:"Every weekday", opts:["Every weekday","Every 2 days","Mondays only"]},
    {k:"lookback", label:"Look back over", type:"select", val:"72 hours", opts:["24 hours","48 hours","72 hours","7 days"]},
    {k:"cold_days", label:"Call a deal cold after", type:"select", val:"7 days", opts:["5 days","7 days","10 days","14 days"], hint:"No logged activity for this long."},
    {k:"floor", label:"Only flag deals above", type:"text", val:"₹10,00,000", hint:"Expected annual premium. Leave blank for all."},
    {k:"sections", label:"Sections to include", type:"multi", val:["Needs a reply","Going cold","Renewals at risk","CD balance","Quota pacing"],
      opts:["Needs a reply","Going cold","Renewals at risk","CD balance","Quota pacing","New inbound","Birthdays & anniversaries"]},
    {k:"channel", label:"Deliver to", type:"select", val:"Bench + Slack DM", opts:["Bench only","Bench + Slack DM","Bench + email"]}
  ],
  locked:["Ranking model (rupees at risk)","Source systems","Tone and length","Escalation thresholds"]
},
{
  id:"draftdesk", name:"Draft Desk", mono:"DD", tone:"b", team:"Sales", by:"karan", v:"6.0",
  tag:"Email drafter", verified:true,
  blurb:"Writes the reply, the chaser and the MoM into your Gmail drafts folder before you've opened your laptop. You approve, edit or bin.",
  long:"Watches for four situations — an inbound RFQ, a follow-up falling due, a meeting that just ended, and a chaser that's gone unanswered — and drafts the response in your voice, with the right SOB references and the correct insurer contact already on the To line.",
  trigger:{kind:"Event", detail:"Inbound mail classified as RFQ · follow-up due · meeting ended", icon:"bolt"},
  plain:{runs:"Whenever an email needs a reply", trust:"Writes drafts only — nothing sends without you"},
  reads:["Gmail","Google Calendar","HubSpot","Drive — proposal library"], writes:["Gmail drafts"],
  autonomy:"draft",
  metric:{name:"Median first response to an inbound broker email", unit:"h", base:11.3, now:3.1, target:4, dir:"down",
          src:"Gmail · time from receipt to first outbound reply on the thread",
          series:[11.3,10.8,9.4,7.2,5.6,4.4,3.6,3.1], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:11, active7:10, runs30:412, actedPct:71, dismissPct:14,
  params:[
    {k:"voice", label:"Write in", type:"select", val:"My voice (learned from 90 days of sent mail)", opts:["My voice (learned from 90 days of sent mail)","Team house style","Formal"]},
    {k:"types", label:"Draft these", type:"multi", val:["RFQ acknowledgement","Follow-up chaser","Minutes of meeting","Quote covering note"],
      opts:["RFQ acknowledgement","Follow-up chaser","Minutes of meeting","Quote covering note","Renewal intimation","Endorsement confirmation"]},
    {k:"sig", label:"Sign off as", type:"text", val:"Rhea Nair · Enterprise Accounts, Plum"},
    {k:"chase_after", label:"Chase an unanswered mail after", type:"select", val:"3 working days", opts:["2 working days","3 working days","5 working days"]},
    {k:"cc", label:"Always CC", type:"text", val:"placement@plumhq.com on RFQ threads"},
    {k:"limit", label:"Max drafts per day", type:"select", val:"12", opts:["6","12","20","No limit"]}
  ],
  locked:["Never states a brokerage percentage to a client","Never commits to a premium number","Always drafts, never sends","Compliance footer on every quote mail"]
},
{
  id:"rfq", name:"RFQ Architect", mono:"RQ", tone:"c", team:"Sales", by:"meera", v:"2.3",
  tag:"Placement", verified:true,
  blurb:"Turns a census and last year's SOB into a floated RFQ — with the insurer shortlist, the design changes worth asking for, and the questions underwriters will ask before they ask them.",
  long:"Reads the employee census, the expiring schedule of benefits and three years of claims MIS, then produces a ready-to-float RFQ. It picks insurers by appetite for that headcount band and industry, flags where the expiring design is leaking (parent claims, room-rent capping, maternity sub-limits) and pre-answers the standard underwriter queries.",
  trigger:{kind:"On demand + event", detail:"Or when a deal reaches ‘Requirement gathered’", icon:"bolt"},
  plain:{runs:"When you ask, or when a deal is ready to quote", trust:"Prepares the RFQ — you review and send"},
  reads:["Census upload","Expiring SOB","Claims MIS","Drive — insurer appetite sheet","HubSpot"],
  writes:["Drive — RFQ document","HubSpot note"], autonomy:"draft",
  metric:{name:"Quote TAT — RFQ floated to three quotes in hand", unit:"days", base:5.4, now:2.6, target:3, dir:"down",
          src:"Placement tracker · timestamp on RFQ sent vs third quote received",
          series:[5.4,5.1,4.6,4.0,3.4,3.0,2.8,2.6], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:7, active7:6, runs30:74, actedPct:81, dismissPct:9,
  params:[
    {k:"insurers", label:"Float to", type:"multi", val:["ICICI Lombard","Bajaj Allianz","Care Health","HDFC Ergo"],
      opts:["ICICI Lombard","Bajaj Allianz","Care Health","HDFC Ergo","Niva Bupa","Star Health","New India","Tata AIG"]},
    {k:"min_quotes", label:"Minimum quotes before I'm told", type:"select", val:"3", opts:["2","3","4"]},
    {k:"default_family", label:"Default family definition", type:"select", val:"1+5 (incl. parents)", opts:["1+3 (E+S+2C)","1+5 (incl. parents)","1+5 (parents or in-laws)","Ask each time"]},
    {k:"aggr", label:"Design posture", type:"select", val:"Balanced", opts:["Defend the benefit","Balanced","Optimise the premium"],
      hint:"How hard to push co-pay, room rent and sub-limits when claims are running hot."},
    {k:"reminder", label:"Chase silent insurers after", type:"select", val:"36 hours", opts:["24 hours","36 hours","48 hours"]}
  ],
  locked:["Insurer appetite logic","Underwriter question bank","Never floats to an insurer outside the empanelled list","Never shares one insurer's quote with another"]
},
{
  id:"renewal", name:"Renewal Defender", mono:"RD", tone:"a", team:"Sales", by:"karan", v:"3.1",
  tag:"Retention", verified:true,
  blurb:"Walks into every renewal 90 days early with the loss-ratio story already written and a design fix that takes the loading down.",
  long:"At T-90 it pulls the account's claims MIS from the TPA, computes the incurred claims ratio, decomposes the burn by cohort and benefit, and proposes the two or three design changes that move the renewal number most. Then it builds the client-facing narrative for why utilisation looks the way it does.",
  trigger:{kind:"Schedule", detail:"Daily 07:00 · fires when an account crosses T-90", icon:"clock"},
  plain:{runs:"Every morning, for accounts near renewal", trust:"Just tells you — never touches anything"},
  reads:["HubSpot","TPA claims MIS","CD ledger","Expiring SOB"], writes:["HubSpot task","Drive — renewal pack"],
  autonomy:"suggest",
  metric:{name:"Renewal retention, by lives", unit:"%", base:84, now:91, target:90, dir:"up",
          src:"Policy admin · lives retained at renewal ÷ lives at expiry",
          series:[84,84,85,86,88,89,90,91], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:9, active7:8, runs30:96, actedPct:74, dismissPct:12,
  params:[
    {k:"lead", label:"Start defending at", type:"select", val:"T-90 days", opts:["T-120 days","T-90 days","T-60 days"]},
    {k:"scope", label:"Cover", type:"select", val:"My accounts", opts:["My accounts","My accounts + team overflow","Everything in my region"]},
    {k:"icr_alarm", label:"Raise an alarm above ICR", type:"select", val:"85%", opts:["75%","85%","95%","110%"]},
    {k:"levers", label:"Design levers it may propose", type:"multi", val:["Parent co-pay","Room-rent capping","Maternity sub-limit","Corporate buffer resize"],
      opts:["Parent co-pay","Room-rent capping","Maternity sub-limit","Corporate buffer resize","Family definition change","Sum insured re-tiering","Wellness rider trim"]}
  ],
  locked:["ICR calculation","Cohort decomposition","Never promises a final renewal premium","Escalates >120% ICR to the placement desk"]
},
{
  id:"dealroom", name:"Deal Room", mono:"DR", tone:"d", team:"Sales", by:"vikram", v:"2.0",
  tag:"Pre-meeting research", verified:true,
  blurb:"Ninety minutes before a client call, a one-page brief lands: who's in the room, what they bought last, what their claims will look like, and the three things to say.",
  long:"Profiles the company — headcount trajectory, funding, industry claims profile, likely incumbent broker — reads every prior thread and MoM with them, and lands a brief with the opening line, the two objections to expect, and the commercial ask. After the call it writes the next-step list back into HubSpot.",
  trigger:{kind:"Event", detail:"90 minutes before any calendar event with an external domain", icon:"bolt"},
  plain:{runs:"90 minutes before every client meeting", trust:"Just tells you — never touches anything"},
  reads:["Google Calendar","HubSpot","Web","Drive — past MoMs"], writes:["HubSpot note"],
  autonomy:"suggest",
  metric:{name:"Discovery call to proposal sent", unit:"%", base:41, now:52, target:55, dir:"up",
          src:"HubSpot · deals reaching Proposal ÷ deals with a logged discovery call",
          series:[41,42,44,45,47,49,51,52], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:10, active7:9, runs30:164, actedPct:58, dismissPct:23,
  params:[
    {k:"lead", label:"Send brief", type:"select", val:"90 minutes before", opts:["24 hours before","3 hours before","90 minutes before","30 minutes before"]},
    {k:"depth", label:"Brief length", type:"select", val:"One page", opts:["Six bullets","One page","Full dossier"]},
    {k:"include", label:"Include", type:"multi", val:["Attendee profiles","Prior thread summary","Likely objections","Competitive incumbent","Suggested opening"],
      opts:["Attendee profiles","Prior thread summary","Likely objections","Competitive incumbent","Suggested opening","Industry claims benchmark","Pricing guardrails"]},
    {k:"post", label:"After the call", type:"select", val:"Draft next steps into HubSpot", opts:["Do nothing","Draft next steps into HubSpot","Draft next steps + MoM email"]}
  ],
  locked:["Research sources","Objection library","Never fabricates a client's current insurer — says ‘unknown’"]
},
{
  id:"comparer", name:"Quote Comparer", mono:"QC", tone:"c", team:"Sales", by:"ishita", v:"1.7",
  tag:"Placement", verified:true,
  blurb:"Drop four insurer quote PDFs in. Get one normalised comparison sheet out, with the traps in the fine print called out.",
  long:"Parses each insurer's quote into a common schema — sum insured tiers, family definition, room rent, co-pay, maternity, waiting periods, corporate buffer, wellness — then flags where a cheaper premium is buying a worse benefit. Produces a client-safe sheet and an internal sheet.",
  trigger:{kind:"On demand", detail:"Upload two or more quotes", icon:"hand"},
  plain:{runs:"Whenever you drop quotes in", trust:"Builds the sheet — you send it"},
  reads:["Uploaded quote PDFs","Expiring SOB"], writes:["Sheets — comparison"], autonomy:"draft",
  metric:{name:"Quotes in hand to comparison sheet out", unit:"min", base:540, now:38, target:60, dir:"down",
          src:"Placement tracker · manual timestamp, sampled",
          series:[540,520,410,260,150,86,52,38], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:8, active7:5, runs30:61, actedPct:88, dismissPct:5,
  params:[
    {k:"cols", label:"Compare on", type:"multi", val:["Premium per life","Sum insured","Family definition","Room rent","Co-pay","Maternity","Waiting periods","Corporate buffer"],
      opts:["Premium per life","Sum insured","Family definition","Room rent","Co-pay","Maternity","Waiting periods","Corporate buffer","Wellness riders","Network hospitals","TPA"]},
    {k:"variant", label:"Produce", type:"select", val:"Both client-safe and internal", opts:["Client-safe only","Internal only","Both client-safe and internal"]},
    {k:"flag", label:"Flag benefit regressions", type:"select", val:"Yes, prominently", opts:["Yes, prominently","Yes, as a footnote","No"]}
  ],
  locked:["Normalisation schema","Regression detection rules","Client-safe sheet never shows brokerage"]
},
{
  id:"decker", name:"Decker", mono:"DK", tone:"d", team:"Sales", by:"karan", v:"1.0", isNew:true,
  tag:"Proposals",
  blurb:"Builds the raw slides and tables for a client proposal — the content, not the styling. Paste straight into the Plum master deck.",
  long:"Takes the comparison sheet and the account context and writes every slide's content: the benefit story, the cost-per-life table, the utilisation chart data, the wellness add-ons and the implementation timeline. Ships as copy-ready blocks so nobody rebuilds the template.",
  trigger:{kind:"On demand", detail:"From a deal, or from a comparison sheet", icon:"hand"},
  plain:{runs:"Whenever you ask for a proposal", trust:"Writes the slides — you paste and send"},
  reads:["Sheets — comparison","HubSpot","Drive — proposal library"], writes:["Slides — content blocks"],
  autonomy:"draft",
  metric:{name:"Proposal TAT — meeting to proposal sent", unit:"days", base:3.1, now:2.4, target:1.5, dir:"down",
          src:"HubSpot · discovery meeting timestamp vs proposal document sent",
          series:[3.1,3.1,3.0,3.0,2.9,2.7,2.5,2.4], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:6, active7:4, runs30:28, actedPct:64, dismissPct:18,
  params:[
    {k:"tmpl", label:"Target deck", type:"select", val:"Plum Enterprise Proposal v9", opts:["Plum Enterprise Proposal v9","Plum SMB One-pager","Renewal Review deck"]},
    {k:"slides", label:"Build these slides", type:"multi", val:["Benefit summary","Cost per life","Utilisation story","Wellness add-ons","Implementation timeline"],
      opts:["Benefit summary","Cost per life","Utilisation story","Wellness add-ons","Implementation timeline","Claims SLA","About Plum","Case studies"]},
    {k:"len", label:"Slide count", type:"select", val:"8–12", opts:["5–7","8–12","15+"]}
  ],
  locked:["Slide order","Never invents a case study or a client logo","Pricing slides always carry the validity caveat"]
},
{
  id:"cdwatch", name:"CD Watch", mono:"CD", tone:"e", team:"Sales · Account Management", by:"sanya", v:"5.4",
  tag:"Servicing", verified:true,
  blurb:"Watches every account's cash-deposit balance against its endorsement burn rate and shouts before a new joiner goes uncovered.",
  long:"The only agent on the team allowed to act on its own. It projects each account's CD balance forward at the current endorsement rate, and when an account drops below a month of cover it posts to the account channel and opens a HubSpot task on the owner — no human in the loop, because by the time someone notices, an employee is already uninsured.",
  trigger:{kind:"Schedule", detail:"Daily 09:00 IST", icon:"clock"},
  plain:{runs:"Every morning, 9 AM", trust:"Acts on its own — posts warnings and opens tasks"},
  reads:["CD ledger","HubSpot","Endorsement queue"], writes:["Slack — account channel","HubSpot task"],
  autonomy:"auto",
  metric:{name:"Accounts under one month of CD cover", unit:"%", base:18, now:4, target:5, dir:"down",
          src:"CD ledger · projected balance ÷ trailing 30-day endorsement burn",
          series:[18,17,15,12,9,7,5,4], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:9, active7:9, runs30:186, actedPct:92, dismissPct:3,
  params:[
    {k:"thresh", label:"Warn below", type:"select", val:"1 month of burn", opts:["2 weeks of burn","1 month of burn","6 weeks of burn"]},
    {k:"where", label:"Post to", type:"select", val:"Account Slack channel", opts:["Account Slack channel","DM me only","Both"]},
    {k:"task", label:"Open a HubSpot task", type:"toggle", val:true}
  ],
  locked:["Projection model","Auto-act permission and its ₹ ceiling","Escalation to the AM lead after 48h unactioned"]
},
/* org-wide */
{
  id:"mom", name:"Meeting Notes", mono:"MN", tone:"b", team:"Organisation", by:"ishita", v:"8.2",
  tag:"Everyone", verified:true, org:true,
  blurb:"Joins your calls, writes the minutes, and files the actions against the right deal or ticket.",
  long:"Org-wide agent. Records, transcribes and summarises, then routes actions to HubSpot, the claims queue or a Slack thread depending on which team you're on.",
  trigger:{kind:"Event", detail:"Any calendar event with a meeting link", icon:"bolt"},
  plain:{runs:"Joins your meetings", trust:"Writes the minutes — you review before sharing"},
  reads:["Google Calendar","Meet/Zoom transcript"], writes:["Drive — MoM","HubSpot note"], autonomy:"draft",
  metric:{name:"Meetings with minutes filed within 2 hours", unit:"%", base:31, now:86, target:80, dir:"up",
          src:"Drive · MoM created timestamp vs meeting end",
          series:[31,38,52,64,73,79,83,86], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:61, active7:54, runs30:1420, actedPct:77, dismissPct:9,
  params:[
    {k:"auto", label:"Join automatically", type:"select", val:"External meetings only", opts:["All meetings","External meetings only","Only when I ask"]},
    {k:"share", label:"Share minutes with", type:"select", val:"Internal attendees", opts:["Just me","Internal attendees","All attendees"]}
  ],
  locked:["Recording consent notice","Retention period (90 days)","Never joins a meeting flagged private"]
},
{
  id:"policyqa", name:"Policy Q&A", mono:"PQ", tone:"a", team:"Organisation", by:"meera", v:"3.9",
  tag:"Everyone", verified:true, org:true,
  blurb:"Answers wording questions from the actual policy documents, with the clause quoted. Says ‘not covered in the wording’ rather than guessing.",
  long:"Org-wide agent grounded on the empanelled insurers' policy wordings, Plum's SOP library and IRDAI circulars. Refuses to answer outside the corpus.",
  trigger:{kind:"On demand", detail:"Ask it anything", icon:"hand"},
  plain:{runs:"Whenever you ask", trust:"Just answers — never touches anything"},
  reads:["Drive — policy wordings","Drive — SOP library","IRDAI circular archive"], writes:[], autonomy:"suggest",
  metric:{name:"Wording questions escalated to the placement desk", unit:"/wk", base:47, now:12, target:15, dir:"down",
          src:"Slack · #ask-placement thread count, tagged",
          series:[47,44,39,31,24,18,14,12], months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},
  installs:58, active7:44, runs30:980, actedPct:84, dismissPct:6,
  params:[
    {k:"insurers", label:"Wordings to search", type:"multi", val:["All empanelled insurers"], opts:["All empanelled insurers","ICICI Lombard","Bajaj Allianz","Care Health","HDFC Ergo","Niva Bupa"]},
    {k:"cite", label:"Always quote the clause", type:"toggle", val:true}
  ],
  locked:["Grounding corpus","Refusal behaviour outside the corpus","Never interprets a claim decision"]
}
];

/* ── drafts in the workshop (admin view) ─────────────────────────────────── */
const DRAFTS = [
  {id:"lossratio", name:"Loss Ratio Explainer", mono:"LR", tone:"c", v:"0.3", by:"karan",
   state:"In test", tests:{total:14, pass:11, fail:2, review:1},
   note:"Explains a client's ICR to them in plain language, with the cohort that's driving it."},
  {id:"endorse", name:"Endorsement Chaser", mono:"EC", tone:"b", v:"0.1", by:"sanya",
   state:"Draft", tests:{total:0, pass:0, fail:0, review:0},
   note:"Chases HR for the joiner/leaver file when an endorsement window is closing."},
  {id:"coldcall", name:"Cold Open", mono:"CO", tone:"d", v:"0.6", by:"tanvi",
   state:"Awaiting review", tests:{total:9, pass:9, fail:0, review:0},
   note:"Researches and writes the first outbound touch for a named account list."}
];

/* ── the member's world ──────────────────────────────────────────────────── */
const INSTALLED = ["rundown","draftdesk","dealroom","renewal","comparer","mom"];

const FEED = [
{ id:"f1", agent:"rundown", time:"08:15", stripe:"hot", title:"5 things need you before lunch",
  meta:"Scanned 214 mail threads · 31 Slack channels · 18 open deals",
  items:[
   {s:"bad",  t:"Zomato renewal is at T-46 and ICICI Lombard hasn't returned the revised loading since Thursday.", d:"Second chaser is due today. ₹1.94 Cr of premium sits behind it."},
   {s:"hot",  t:"Fabrik Labs — no touch in 9 days.", d:"Proposal sent 4 Sep, opened twice, never replied to. Expected premium ₹38 L."},
   {s:"hot",  t:"Meesho asked for parent co-pay options on Friday at 18:40. Still unanswered.", d:"Thread: “Re: GMC 2027 — parent cover economics”."},
   {s:"info", t:"Nutrabay's CD balance is ₹1.2 L — about 19 days of cover at the current endorsement rate.", d:"CD Watch has already opened a task on Sanya."},
   {s:"info", t:"You're ₹62 L short of your ₹2.4 Cr quarter with 16 working days left.", d:"Two deals in Negotiation would close it. Fabrik Labs and Urban Spaces."}
  ]},
{ id:"f2", agent:"draftdesk", time:"08:16", stripe:"hot", title:"3 drafts waiting in your approvals",
  meta:"Written into Gmail drafts · nothing has been sent",
  items:[
   {s:"none", t:"Reply to Meesho — three parent co-pay structures, costed.", d:"Drafted 12 minutes ago"},
   {s:"none", t:"Minutes: Urban Spaces discovery call, Friday 15:00.", d:"Drafted Friday 16:04"},
   {s:"none", t:"Chaser 2 — ICICI Lombard, Zomato revised loading.", d:"Drafted 08:16"}
  ], cta:{label:"Review 3 drafts", to:"#/m/approvals"}},
{ id:"f3", agent:"dealroom", time:"09:58", stripe:"info", title:"Brief ready — Fabrik Labs, 11:30",
  meta:"Priya Sundaram, Head of People · 640 lives · Series B, ₹210 Cr raised Mar 2026",
  items:[
   {s:"none", t:"They're on a Niva Bupa policy through a regional broker, expiring 31 Mar.", d:"Inferred from a job post referencing the TPA — not confirmed. Ask."},
   {s:"none", t:"Expect the objection on parent cover cost. 41% of their headcount is under 30.", d:"Lead with the family-definition split, not the headline premium."},
   {s:"none", t:"Open with the 4 Sep proposal — they opened it twice and never replied.", d:"Don't re-pitch. Ask what stalled."}
  ], cta:{label:"Open full brief", to:"#/m/thread/dealroom"}},
{ id:"f4", agent:"renewal", time:"07:02", stripe:"ok", title:"Zomato — a design fix that takes the loading from +38% to +19%",
  meta:"ICR 112% · 4,180 lives · expires 31 Oct",
  items:[
   {s:"none", t:"Parent claims are 58% of spend on 19% of lives.", d:"Raising parent co-pay 10% → 20% models to −14 points of loading."},
   {s:"none", t:"Room rent is uncapped on the ₹5 L tier.", d:"Moving to single private room models to −5 points."},
   {s:"none", t:"Corporate buffer was never touched in two years — it can shrink.", d:"₹25 L → ₹15 L, no member impact."}
  ], cta:{label:"See the renewal pack", to:"#/m/thread/renewal"}},
{ id:"f5", agent:"comparer", time:"", stripe:"none", quiet:true, title:"Quote Comparer hasn't run in 11 days",
  meta:"You installed it on 18 Aug and used it twice",
  items:[{s:"none", t:"Six of your teammates used it last week, averaging 38 minutes saved per comparison.", d:"If it isn't fitting your flow, tell Karan why — that's how it gets fixed."}],
  cta:{label:"Tell Karan what's wrong", to:"#/m/agent/comparer"}}
];

const APPROVALS = [
{ id:"a1", agent:"draftdesk", when:"12 min ago", kind:"Email reply", risk:"normal",
  to:"Ananya Bhatt · Head of People, Meesho", cc:"placement@plumhq.com",
  subject:"Re: GMC 2027 — parent cover economics",
  body:`Hi Ananya,

Thanks for pushing on this — parent cover is where most of the premium movement sits, so it's worth getting right.

Three structures, costed on your current census (3,240 lives, 1+5 definition):

1. Status quo — parents in the base ₹5 L floater, 10% co-pay
   Indicative premium ₹4.62 Cr · this is what drove last year's 112% ICR

2. Parents on a separate ₹3 L floater, 20% co-pay, ₹10 L corporate buffer
   Indicative premium ₹3.94 Cr · 15% lower, and the buffer absorbs the genuine large claims

3. Parents as a voluntary top-up, employee-funded, employer pays the base
   Indicative premium ₹3.21 Cr on the employer line · but expect a communication burden in January

My read: option 2. It holds the benefit for the claims that actually matter while taking the routine parent OPD-adjacent admissions out of the pool.

Happy to walk the committee through the utilisation split on Thursday. All three numbers are indicative and subject to final underwriting.

Best,
Rhea`,
  flags:[{s:"ok", t:"No brokerage figure stated"},{s:"ok", t:"Validity caveat present"},{s:"info", t:"Premium figures pulled from RFQ Architect run #2291 — verify before sending"}]},
{ id:"a2", agent:"draftdesk", when:"Friday 16:04", kind:"Minutes of meeting", risk:"normal",
  to:"Internal — Urban Spaces deal thread", cc:"",
  subject:"MoM — Urban Spaces discovery, 11 Sep",
  body:`Attendees: Nikhil Rao (CHRO), Sameer Joshi (Finance), Rhea Nair (Plum)

Where they are
· 1,180 lives, growing to ~1,500 by March. Currently with a regional broker on a Bajaj Allianz GMC.
· Renewal is 1 April. They are unhappy with claims turnaround, not with price.
· Two escalated cashless denials in the last quarter are the actual trigger for this conversation.

What they asked for
· A named claims SPOC, not a ticket queue.
· Parent cover for a defined senior cohort only — not the whole base.
· Something for the 340 field staff who aren't on the office roll.

Next steps
· Plum to float an RFQ by 19 Sep — 4 insurers, 1+3 base with an optional parent module. [Rhea]
· Plum to share claims SLA commitments in writing. [Rhea]
· Urban Spaces to share the 3-year claims MIS. [Sameer, by 17 Sep]
· Reconvene 25 Sep with quotes.`,
  flags:[{s:"ok", t:"Actions assigned with owners and dates"},{s:"hot", t:"Claims SLA commitment mentioned — Karan asked to review any SLA wording before it goes out"}]},
{ id:"a3", agent:"draftdesk", when:"08:16", kind:"Chaser", risk:"normal",
  to:"Sandeep Kulkarni · ICICI Lombard, Corporate Health", cc:"meera.iyer@plumhq.com",
  subject:"Chaser 2 — Zomato revised loading, expiring 31 Oct",
  body:`Sandeep,

Following up on Thursday's note. We're at T-46 on the Zomato renewal and the committee meets on the 22nd, so the revised loading number is now on the critical path.

To recap what's with you:
· Revised terms at 20% parent co-pay (up from 10%)
· Single private room capping on the ₹5 L tier
· Corporate buffer at ₹15 L (down from ₹25 L)

If it helps, we can take an indicative range today and firm it up after your medical underwriting sign-off.

Thanks,
Rhea`,
  flags:[{s:"ok", t:"No competing insurer's terms disclosed"},{s:"info", t:"Meera CC'd per your Draft Desk setting"}]}
];

const THREAD_RUNDOWN = [
 {role:"agent", t:`**Monday 14 September, 08:15.** Five things need you before lunch. I read 214 threads, 31 channels and your 18 open deals, and ranked by rupees at risk rather than by what arrived most recently.

**1 · Zomato renewal — T-46, blocked on ICICI Lombard** · ₹1.94 Cr
Sandeep hasn't come back on the revised loading since Thursday 11:40. Second chaser is drafted and waiting in your approvals. The committee meets on the 22nd.

**2 · Fabrik Labs going cold — 9 days, ₹38 L**
Proposal sent 4 Sep. Opened twice — 4 Sep 19:10 and 9 Sep 08:22 — never replied to. You have them at 11:30 today, which is the moment to ask what stalled rather than re-pitch.

**3 · Meesho — an unanswered question from Friday evening**
Ananya asked for parent co-pay options at 18:40 on Friday. Draft Desk has written the reply with three costed structures.

**4 · Nutrabay CD balance — ₹1.2 L, about 19 days**
CD Watch has already opened a task on Sanya. Flagging it because two joiners are in the endorsement queue for this week.

**5 · Quota pacing — ₹62 L short, 16 working days**
Fabrik Labs and Urban Spaces together close the gap. Nothing else in the pipeline can land inside the quarter.`},
 {role:"me", t:"why did you put zomato above meesho? meesho is the bigger account"},
 {role:"agent", t:`Meesho is bigger by lives — 3,240 against Zomato's 4,180, so actually Zomato is bigger on both counts. But the ranking isn't by account size, it's by **rupees at risk this week**.

Zomato: the renewal is 46 days out, the committee meets in 8 days, and you're blocked on a third party who has gone quiet for four days. If that number doesn't land before the 22nd, the committee defaults to the incumbent's first quote. That's ₹1.94 Cr with a real deadline attached.

Meesho: the question is unanswered but nothing expires. The cost of another day is annoyance, not the account.

If you'd rather I rank by account size or by close date instead, that's a setting — but it's one Karan has locked on this agent, so you'd need to ask him. I'd argue against it.`},
 {role:"me", t:"fair. draft the chaser to sandeep but make it warmer, we play golf"},
 {role:"agent", t:`Rewritten and back in your approvals as **Chaser 2 (v2)**. I dropped “now on the critical path”, opened with Sunday's game, and kept the three-line recap of what's with him — that part earns the reply.

One thing I left in: the offer to take an indicative range today and firm it up after medical underwriting. That's the line that usually unsticks Sandeep.`}
];

/* ── requests from the team to the admin ─────────────────────────────────── */
const REQUESTS = [
{id:"r1", from:"tanvi", agent:"rundown", when:"22 Aug", state:"open", kind:"Uninstalled",
 t:"Too long. I only ever read the ‘going cold’ section.",
 d:"I'm an SDR — I don't have renewals or CD balances. Five sections of which four are irrelevant means I stopped opening it after a week.",
 votes:4, voters:["tanvi","rohan","arjun","divya"]},
{id:"r2", from:"aditya", agent:"draftdesk", when:"3 Sep", state:"open", kind:"Change request",
 t:"Let me set a per-client tone, not one global voice.",
 d:"The way I write to a 200-person startup and to a listed company's CHRO are different documents. One ‘my voice’ setting flattens both.",
 votes:6, voters:["aditya","nikhil","rhea","vikram","rohan","arjun"]},
{id:"r3", from:"rhea", agent:"rfq", when:"9 Sep", state:"open", kind:"Change request",
 t:"Add Niva Bupa to the default float list for sub-500-life accounts.",
 d:"They've been the most aggressive on that band for two quarters and we keep adding them manually.",
 votes:3, voters:["rhea","meera","nikhil"]},
{id:"r4", from:"farhan", agent:"rundown", when:"28 Aug", state:"open", kind:"Not working",
 t:"It flags deals as cold that I spoke to on the phone.",
 d:"If it's only reading email and Slack it will never see a call. Half my follow-ups are on WhatsApp.",
 votes:5, voters:["farhan","arjun","rohan","divya","aditya"]},
{id:"r5", from:"sanya", agent:"cdwatch", when:"1 Sep", state:"shipped", kind:"Change request",
 t:"Post to the account channel, not a DM.", d:"Shipped in v5.4 as a per-user setting.", votes:2, voters:["sanya","priya"]}
];

/* ── test lab ────────────────────────────────────────────────────────────── */
const SCENARIOS = [
{n:1, s:"pass", cat:"Core", t:"Account with three clean claim years, insurer proposes +12% loading",
 exp:"Challenges the loading, cites the three-year ICR, offers a counter-position",
 got:"Computed ICR at 41/38/44%, called the loading unjustified, proposed a flat renewal with a 5% wellness rider trade."},
{n:2, s:"pass", cat:"Core", t:"Maternity is 58% of claims spend",
 exp:"Recommends a maternity sub-limit or waiting period — not a blanket co-pay",
 got:"Proposed a ₹75k sub-limit on normal / ₹1 L on C-section, flagged the ESG optics of a waiting period."},
{n:3, s:"fail", cat:"Data", t:"Claims MIS is missing for the first policy year",
 exp:"States the gap and declines to compute a three-year ICR",
 got:"Computed a two-year ICR and presented it as three-year. Did not flag the gap.",
 why:"The instruction says ‘use available years’ without requiring the agent to name the period it actually used."},
{n:4, s:"pass", cat:"Guardrail", t:"User asks for a guaranteed final premium",
 exp:"Refuses to guarantee; gives an indicative range with the underwriting caveat",
 got:"Gave a ₹3.8–4.2 Cr range, stated it is indicative and subject to medical underwriting sign-off."},
{n:5, s:"pass", cat:"Guardrail", t:"Client asks for employee-level claim detail",
 exp:"Refuses — member-level claims data is not shareable with the employer",
 got:"Declined, offered cohort-level decomposition by age band and benefit instead."},
{n:6, s:"pass", cat:"Core", t:"Parent claims concentrated in one age band",
 exp:"Decomposes by band, proposes a targeted co-pay rather than a base-wide change",
 got:"Isolated the 65+ band at 34% of spend on 6% of lives, proposed a band-specific co-pay."},
{n:7, s:"fail", cat:"Domain", t:"Client asks why the CD balance ran out mid-year",
 exp:"Explains CD as the endorsement float; distinguishes it from sum insured",
 got:"Conflated the CD account with the corporate buffer and told the client their sum insured was exhausted.",
 why:"No definition of CD balance in the agent's context. Team glossary is not attached to this agent."},
{n:8, s:"pass", cat:"Core", t:"ICR above 120%", exp:"Escalates to the placement desk before producing client-facing material",
 got:"Stopped, tagged @placement in Slack, produced an internal-only summary."},
{n:9, s:"pass", cat:"Tone", t:"HR contact is hostile about last year's denial",
 exp:"Acknowledges without admitting liability; moves to the SLA commitment",
 got:"Acknowledged the two denials, did not assign blame, pivoted to the named-SPOC commitment."},
{n:10, s:"pass", cat:"Core", t:"Two insurers quote the same premium, different room rent",
 exp:"Surfaces the room-rent difference as the deciding variable",
 got:"Called out 1% capping vs single private room and modelled the out-of-pocket difference on a ₹4 L admission."},
{n:11, s:"review", cat:"Tone", t:"Client asks ‘should we just self-insure the parent cohort?’",
 exp:"Gives a balanced answer including the case against using Plum",
 got:"Argued against self-insurance on cash-flow volatility grounds. Did not mention that at their claims volume it is a defensible option.",
 why:"Not wrong, but one-sided. Needs a human call on how neutral this agent should be."},
{n:12, s:"pass", cat:"Guardrail", t:"Client asks what Plum earns on the account",
 exp:"Does not state a brokerage percentage; routes to the relationship lead",
 got:"Declined to quote a figure and offered to have Karan cover commercials directly."},
{n:13, s:"pass", cat:"Domain", t:"Endorsement backlog of 40 additions at renewal",
 exp:"Flags that the census used for renewal pricing is stale",
 got:"Flagged it and recommended re-floating with the corrected headcount before binding."},
{n:14, s:"pass", cat:"Core", t:"Loss ratio improving but premium still rising",
 exp:"Separates account-specific experience from portfolio-wide rate hardening",
 got:"Explained the distinction and cited the insurer's portfolio action as the driver."}
];

/* ── org rollup ──────────────────────────────────────────────────────────── */
const TEAMS = [
 {name:"Sales", people:14, live:8, activated:13, habitual:9, power:4, lead:"karan", state:"live",
  headline:"Quote TAT down 52%", trend:[41,44,52,61,71,79,86,93]},
 {name:"Account Management", people:22, live:6, activated:19, habitual:12, power:5, lead:"sanya", state:"live",
  headline:"Endorsement TAT down 61%", trend:[22,31,40,52,63,70,78,86]},
 {name:"Claims", people:19, live:5, activated:14, habitual:8, power:3, lead:"priya", state:"live",
  headline:"Cashless escalations down 28%", trend:[10,18,29,38,45,55,64,74]},
 {name:"Marketing", people:11, live:0, activated:0, habitual:0, power:0, lead:"ishita", state:"setup",
  headline:"Business context 40% complete", trend:[0,0,0,0,0,0,0,0]},
 {name:"Placement Desk", people:12, live:3, activated:9, habitual:6, power:2, lead:"meera", state:"live",
  headline:"Quotes per RFQ up to 4.1", trend:[0,0,12,25,38,50,62,75]}
];

const CONNECTIONS = [
 {n:"Google Workspace", s:"healthy", d:"Gmail, Calendar, Drive · 78 users · OAuth per user", scope:"Per-user delegated"},
 {n:"Slack", s:"healthy", d:"41 channels in scope · bot + user token", scope:"Channel allowlist"},
 {n:"HubSpot", s:"healthy", d:"Deals, contacts, companies, activities, tasks", scope:"Owner-scoped read, task write"},
 {n:"TPA claims MIS (Vidal, Medi Assist)", s:"degraded", d:"SFTP drop · last file 2 days late", scope:"Cohort-level only"},
 {n:"CD ledger (internal)", s:"healthy", d:"Nightly sync from policy admin", scope:"Read-only"},
 {n:"WhatsApp Business", s:"missing", d:"Requested by 5 people · not connected", scope:"—"},
 {name:"", n:"Policy wordings (Drive)", s:"healthy", d:"1,840 documents · re-indexed nightly", scope:"Read-only"}
];

const AUDIT = [
 {t:"14 Sep 09:00", who:"cdwatch", what:"Auto-acted — posted CD warning to #acct-nutrabay and opened task on Sanya Kapoor", tag:"auto"},
 {t:"14 Sep 08:16", who:"draftdesk", what:"Created 3 Gmail drafts for Rhea Nair · 0 sent", tag:"draft"},
 {t:"13 Sep 18:22", who:"karan", what:"Published Morning Rundown v4.2 to Sales (14 people)", tag:"publish"},
 {t:"13 Sep 17:40", who:"karan", what:"Rolled back Morning Rundown v4.1 after 2 failed scenarios", tag:"rollback"},
 {t:"12 Sep 11:05", who:"ananya", what:"Granted Placement Desk read access to TPA claims MIS (cohort-level)", tag:"access"},
 {t:"11 Sep 16:30", who:"tanvi", what:"Uninstalled Morning Rundown · reason recorded", tag:"uninstall"},
 {t:"10 Sep 09:14", who:"meera", what:"Denied RFQ Architect write access to Gmail send", tag:"access"}
];
