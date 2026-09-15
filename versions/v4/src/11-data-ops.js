
/* ═══════════════════════════════════════════════════════════════════════════
   V4 — THE OPERATIONAL LAYER
   Everything v1–v3 declared in the object model and never drew: runs, traces,
   run status, schedules, budgets, spend, ownership and agent-proposed changes.
   Each block names the teardown finding that put it here (see work/01-gumloop-digest.md).
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── run status vocabulary ────────────────────────────────────────────────
   C2 · Gumloop records a run that stopped for missing input and a run that hit
   a hard block both as "Completed". Five values, and only two of them reach a
   member's screen, in words. */
const RUNSTATE={
  completed:   {l:"Completed",      m:"Did the job and produced something",         c:"ok",  s:"ok"},
  nothing:     {l:"Nothing to do",  m:"Ran, found nothing worth your attention",    c:"",    s:"none"},
  blocked:     {l:"Waiting on you", m:"Stopped and asked a question. Nobody is looking at it unless we tell them.", c:"hot", s:"hot"},
  failed:      {l:"Failed",         m:"Could not finish. Cause named, not guessed.",c:"bad", s:"bad"},
  partial:     {l:"Partly done",    m:"Finished some of the work and named what it skipped", c:"info", s:"info"}
};
const COSTBAND={light:{l:"Light", n:1}, standard:{l:"Standard", n:3}, heavy:{l:"Heavy", n:8}};

/* ── the run log ──────────────────────────────────────────────────────────
   C1 · "Could really use a log" is the #1 organic feature request on the
   incumbent's own forum. C3 · the ledger records cost and status; the content
   hides in per-run threads. Every row here carries its outcome in one line. */
let RUNS=[
{id:"r-8841", agent:"rundown", who:"rhea", started:"Mon 08:15", dur:"41s", state:"completed", band:"standard",
 trigger:"Schedule · weekdays 08:15", out:"5 items · 214 threads, 31 channels, 18 deals read · nothing written",
 items:5, read:["Gmail · 214 threads","Slack · 31 channels","HubSpot · 18 open deals","Calendar · 6 events"], wrote:[],
 trace:[
  {s:"Trigger fired", d:"Schedule · weekdays 08:15 IST · on time", t:"08:15:00", ms:0, k:"ok"},
  {s:"Loaded business context", d:"Sales · targets, incentive structure, glossary (31 terms), renewal calendar", t:"08:15:01", ms:340, k:"ok"},
  {s:"Read Gmail", d:"214 threads in the last 72h · installer's own token · read-only", t:"08:15:02", ms:6100, k:"ok"},
  {s:"Read Slack", d:"31 channels on the allowlist · 890 messages", t:"08:15:08", ms:4200, k:"ok"},
  {s:"Read HubSpot", d:"18 open deals owned by Rhea Nair · last-activity dates", t:"08:15:12", ms:2900, k:"ok"},
  {s:"Skipped WhatsApp", d:"Source declared but not connected for this installer. Deals followed up by WhatsApp will read as cold — said so in the output.", t:"08:15:15", ms:10, k:"warn"},
  {s:"Ranked by rupees at risk", d:"18 candidates → 5 items · ₹1.94 Cr top item · ranking model locked by author", t:"08:15:15", ms:18400, k:"ok"},
  {s:"Guardrail check", d:"3 hard stops evaluated, none triggered", t:"08:15:34", ms:900, k:"ok"},
  {s:"Delivered", d:"Feed card + Slack DM · no external action taken", t:"08:15:41", ms:1200, k:"ok"}
 ]},
{id:"r-8840", agent:"draftdesk", who:"rhea", started:"Mon 08:16", dur:"1m 12s", state:"completed", band:"heavy",
 trigger:"Event · inbound mail classified RFQ", out:"3 drafts written to Gmail · 0 sent · 3 awaiting approval",
 items:3, read:["Gmail","Calendar","HubSpot","Drive · proposal library"], wrote:["Gmail drafts × 3"],
 trace:[
  {s:"Trigger fired", d:"Inbound mail from Ananya Bhatt classified as RFQ follow-up", t:"08:16:02", ms:0, k:"ok"},
  {s:"Matched situation", d:"‘Unanswered client question' · 2 of 4 enabled situations matched", t:"08:16:02", ms:600, k:"ok"},
  {s:"Read the thread", d:"‘Re: GMC 2027 — parent cover economics' · 9 messages", t:"08:16:03", ms:2100, k:"ok"},
  {s:"Pulled premium figures", d:"RFQ Architect run #2291 · three costed structures", t:"08:16:05", ms:3400, k:"ok"},
  {s:"Drafted in Rhea's voice", d:"Learned from 90 days of sent mail · 412 words", t:"08:16:09", ms:41000, k:"ok"},
  {s:"Guardrail check", d:"No brokerage figure · validity caveat present · not sent", t:"08:16:50", ms:800, k:"ok"},
  {s:"Wrote 3 Gmail drafts", d:"Unsent. Approval required before anything leaves.", t:"08:16:51", ms:4200, k:"ok"},
  {s:"Raised approvals", d:"3 items to Rhea Nair · 1 flagged for Karan (SLA wording)", t:"08:17:14", ms:300, k:"ok"}
 ]},
{id:"r-8839", agent:"renewal", who:"vikram", started:"Mon 07:02", dur:"2m 04s", state:"blocked", band:"standard",
 trigger:"Schedule · daily 07:00", out:"Stopped — the TPA claims file for Kalyani Foods is 2 days late. Did not estimate.",
 items:0, read:["HubSpot","CD ledger","Expiring SOB"], wrote:[],
 ask:{q:"The Kalyani Foods claims MIS hasn't landed since Friday. Do you want the renewal pack built on the two years I have, clearly labelled, or should I hold until the file arrives?",
      why:"Computing a three-year ICR from two years and presenting it as three is the exact failure scenario 03 was written for.",
      who:"vikram", opts:["Build on two years, label it","Hold until the file arrives","Chase the TPA and hold"]},
 trace:[
  {s:"Trigger fired", d:"Schedule · daily 07:00 IST", t:"07:02:00", ms:0, k:"ok"},
  {s:"Found accounts at T-90", d:"3 accounts crossed the threshold · Kalyani Foods, Zomato, Nutrabay", t:"07:02:01", ms:1800, k:"ok"},
  {s:"Read CD ledger", d:"3 accounts · balances and burn rates", t:"07:02:03", ms:2200, k:"ok"},
  {s:"Fetched TPA claims MIS", d:"SFTP drop · last file 2 days late · FY24 missing for Kalyani Foods", t:"07:02:05", ms:31000, k:"warn"},
  {s:"Refused to estimate", d:"Instruction requires naming the period the ICR covers. Two of three years present. Did not compute, did not guess, did not write a pack.", t:"07:03:36", ms:400, k:"warn"},
  {s:"Asked and stopped", d:"Question raised to Vikram Rathore. Zomato and Nutrabay completed normally in the same run.", t:"07:04:04", ms:200, k:"block"}
 ]},
{id:"r-8838", agent:"cdwatch", who:"sanya", started:"Mon 09:00", dur:"28s", state:"completed", band:"light",
 trigger:"Schedule · daily 09:00", out:"1 account below threshold · posted to #acct-nutrabay · HubSpot task opened on Sanya",
 items:1, read:["CD ledger","HubSpot","Endorsement queue"], wrote:["Slack · #acct-nutrabay","HubSpot task"],
 auto:true,
 trace:[
  {s:"Trigger fired", d:"Schedule · daily 09:00 IST", t:"09:00:00", ms:0, k:"ok"},
  {s:"Projected 41 accounts", d:"Balance ÷ trailing 30-day endorsement burn", t:"09:00:01", ms:9800, k:"ok"},
  {s:"1 below threshold", d:"Nutrabay · ₹1.2 L ≈ 19 days of cover · threshold is 1 month", t:"09:00:11", ms:120, k:"warn"},
  {s:"Checked auto-act ceiling", d:"Posting a warning and opening a task are both inside the author's permitted actions. No ₹ commitment, no client contact.", t:"09:00:11", ms:80, k:"ok"},
  {s:"Acted without asking", d:"Posted to #acct-nutrabay, opened task on Sanya Kapoor. Logged to audit as auto-act.", t:"09:00:12", ms:3100, k:"auto"},
  {s:"Notified the owner", d:"Sanya Kapoor told what was done and why, after the fact — the trade this autonomy level makes.", t:"09:00:16", ms:400, k:"ok"}
 ]},
{id:"r-8837", agent:"dealroom", who:"rhea", started:"Mon 09:58", dur:"1m 47s", state:"completed", band:"heavy",
 trigger:"Event · 90 min before an external calendar event", out:"Brief for Fabrik Labs, 11:30 · 3 points · HubSpot note written",
 items:3, read:["Calendar","HubSpot","Web","Drive · past MoMs"], wrote:["HubSpot note"],
 trace:[
  {s:"Trigger fired", d:"Calendar event ‘Fabrik Labs — GMC 2027' at 11:30 with an external domain", t:"09:58:00", ms:0, k:"ok"},
  {s:"Profiled the company", d:"640 lives · Series B, ₹210 Cr Mar 2026 · headcount trajectory from public sources", t:"09:58:01", ms:22000, k:"ok"},
  {s:"Read prior threads", d:"11 messages, 1 MoM, proposal sent 4 Sep opened twice", t:"09:58:23", ms:8400, k:"ok"},
  {s:"Declared an unknown", d:"Incumbent insurer inferred from a job post referencing the TPA — marked ‘not confirmed, ask' rather than asserted. Guardrail: never fabricate a current insurer.", t:"09:58:32", ms:300, k:"warn"},
  {s:"Wrote the brief", d:"3 points · opening line, expected objection, commercial ask", t:"09:58:32", ms:61000, k:"ok"},
  {s:"Wrote HubSpot note", d:"Attached to the Fabrik Labs deal", t:"09:59:34", ms:2900, k:"ok"}
 ]},
{id:"r-8836", agent:"comparer", who:"aditya", started:"Mon 11:04", dur:"3m 31s", state:"partial", band:"heavy",
 trigger:"On demand · 4 quotes uploaded", out:"3 of 4 quotes normalised · Star Health PDF is a scan, named and skipped",
 items:1, read:["4 uploaded quote PDFs","Expiring SOB"], wrote:["Sheets · comparison"],
 trace:[
  {s:"Started on demand", d:"Aditya Shetty uploaded 4 insurer quotes", t:"11:04:00", ms:0, k:"ok"},
  {s:"Parsed 3 quotes", d:"ICICI Lombard, Bajaj Allianz, Care Health → common schema, 11 columns", t:"11:04:02", ms:96000, k:"ok"},
  {s:"Could not parse 1", d:"Star Health quote is a scanned image with no text layer. Did not guess the numbers off the image.", t:"11:05:38", ms:41000, k:"warn"},
  {s:"Flagged 2 regressions", d:"Care Health is cheapest per life and caps room rent at 1% — called out prominently", t:"11:06:19", ms:9000, k:"ok"},
  {s:"Built the sheet", d:"Client-safe and internal variants · Star Health shown as a blank column labelled ‘not machine-readable'", t:"11:06:28", ms:22000, k:"ok"},
  {s:"Told the user what's missing", d:"Asked for a text PDF or the insurer's quote email instead of silently producing a 3-way comparison", t:"11:07:31", ms:200, k:"warn"}
 ]},
{id:"r-8835", agent:"rfq", who:"meera", started:"Mon 10:22", dur:"6m 12s", state:"failed", band:"standard",
 trigger:"Event · deal reached ‘Requirement gathered'", out:"Failed — insurer appetite sheet in Drive was moved. Named the file, did not substitute.",
 items:0, read:["Census upload","Expiring SOB","HubSpot"], wrote:[],
 fail:{cause:"`Drive › Placement › insurer-appetite-2026.xlsx` returned 404. It was renamed or moved at 09:41 by Ishita Sharma.",
       did:"Retried 3 times over 4 minutes. Searched Drive for the filename and for two prior names. Did not float to a default insurer list and did not build the RFQ without the shortlist.",
       fix:"Point the agent at the new file, or restore the old path. One config change, no rebuild."},
 trace:[
  {s:"Trigger fired", d:"Urban Spaces reached ‘Requirement gathered'", t:"10:22:00", ms:0, k:"ok"},
  {s:"Read the census", d:"1,180 lives · 1+3 base · 340 field staff flagged separately", t:"10:22:01", ms:14000, k:"ok"},
  {s:"Fetched appetite sheet", d:"Drive › Placement › insurer-appetite-2026.xlsx → 404", t:"10:22:15", ms:3000, k:"fail"},
  {s:"Retried", d:"3 attempts over 4m 02s with backoff", t:"10:22:18", ms:242000, k:"warn"},
  {s:"Searched for it", d:"Filename and 2 prior names · no match in the installer's own Drive scope", t:"10:26:20", ms:11000, k:"warn"},
  {s:"Stopped", d:"Insurer shortlist is a locked input. Did not fall back to a default list — floating to the wrong insurers is worse than not floating.", t:"10:26:31", ms:200, k:"fail"}
 ]},
{id:"r-8834", agent:"rundown", who:"farhan", started:"Mon 08:15", dur:"36s", state:"nothing", band:"standard",
 trigger:"Schedule · weekdays 08:15", out:"Ran, found nothing above the ₹10 L floor. Delivered nothing — third quiet run this week.",
 items:0, read:["Gmail","Slack","HubSpot","Calendar"], wrote:[],
 trace:[
  {s:"Trigger fired", d:"Schedule · weekdays 08:15 IST", t:"08:15:00", ms:0, k:"ok"},
  {s:"Read 61 threads", d:"Farhan's own token · 4 Slack channels · 6 open deals", t:"08:15:01", ms:22000, k:"ok"},
  {s:"Nothing cleared the floor", d:"Installer's ‘only flag deals above' is set to ₹10,00,000. His book is SMB — top open deal is ₹6.2 L.", t:"08:15:23", ms:9000, k:"warn"},
  {s:"Delivered nothing", d:"Third consecutive quiet run. This is a setup problem, not a quiet week — flagged to the maintainer.", t:"08:15:36", ms:100, k:"warn"}
 ]},
{id:"r-8833", agent:"mom", who:"nikhil", started:"Mon 15:30", dur:"4m 08s", state:"completed", band:"heavy",
 trigger:"Event · calendar event with a meeting link", out:"Minutes filed to Drive · 4 actions routed to HubSpot",
 items:4, read:["Calendar","Meet transcript"], wrote:["Drive · MoM","HubSpot note"],
 trace:[
  {s:"Joined the meeting", d:"Consent notice played at join · external meeting", t:"15:30:00", ms:0, k:"ok"},
  {s:"Transcribed", d:"38 minutes · 3 speakers identified", t:"15:30:04", ms:228000, k:"ok"},
  {s:"Wrote minutes", d:"Where they are · what they asked for · next steps with owners and dates", t:"16:08:04", ms:14000, k:"ok"},
  {s:"Routed 4 actions", d:"HubSpot tasks against the Urban Spaces deal", t:"16:08:18", ms:4000, k:"ok"}
 ]}
];

/* ── schedules ────────────────────────────────────────────────────────────
   C8 · In Gumloop, creating a trigger is one visible click and deleting one
   took six passes — the control is an unlabelled ellipsis inside a drawer.
   One screen, every live schedule, pause and stop on the row. */
let TRIGGERS=[
 {id:"t1", agent:"rundown",   label:"Weekday morning rundown", nl:"Every weekday at 8:15",  kind:"Schedule",
  next:"Tomorrow 08:15", perDay:12, band:"standard", state:"on",  owner:"karan", created:"13 Sep"},
 {id:"t2", agent:"renewal",   label:"T-90 renewal sweep",      nl:"Every day at 7:00",      kind:"Schedule",
  next:"Tomorrow 07:00", perDay:9,  band:"standard", state:"on",  owner:"karan", created:"2 Aug"},
 {id:"t3", agent:"cdwatch",   label:"CD balance check",        nl:"Every day at 9:00",      kind:"Schedule",
  next:"Tomorrow 09:00", perDay:9,  band:"light",    state:"on",  owner:"sanya", created:"18 Jul"},
 {id:"t4", agent:"draftdesk", label:"Inbound needing a reply", nl:"Whenever an email needs a reply", kind:"Event",
  next:"On the next matching email", perDay:38, band:"heavy", state:"on", owner:"karan", created:"29 Jul"},
 {id:"t5", agent:"dealroom",  label:"Pre-meeting brief",       nl:"90 minutes before every external meeting", kind:"Event",
  next:"Today 16:00 (Urban Spaces)", perDay:14, band:"heavy", state:"on", owner:"vikram", created:"11 Aug"},
 {id:"t6", agent:"mom",       label:"Join and minute",         nl:"Every meeting with a link", kind:"Event",
  next:"Today 16:00", perDay:47, band:"heavy", state:"on", owner:"ishita", created:"4 Jun"},
 {id:"t7", agent:"rundown",   label:"Mid-week catch-up (trial)", nl:"Every 30 minutes",      kind:"Schedule",
  next:"Paused", perDay:480, band:"standard", state:"paused", owner:"karan", created:"14 Sep",
  note:"Karan set this to every 30 minutes on Saturday to test a theory. The projection said ₹— /month and 480 runs a day against a 600-run budget; it auto-paused after 41 runs and told him why."},
 {id:"t8", agent:"policyqa",  label:"On demand only",          nl:"Whenever someone asks",   kind:"On demand",
  next:"—", perDay:31, band:"light", state:"on", owner:"meera", created:"12 May"}
];

/* ── budgets and spend ────────────────────────────────────────────────────
   C6 · Measured: a single agent on the trigger builder's own default cadence
   exhausts a month's allowance in 5–11 days; a do-nothing agent on a 15-minute
   schedule does it in 30. The cliff is the scheduler, not the chat.
   D9 · Bench meters runs, in three bands. No second currency. */
const BUDGET={
  teamCap:14000, teamUsed:9840, teamProj:12900, month:"September",
  perAgent:[
   {id:"draftdesk", cap:5000, used:3980, proj:5120, state:"over"},
   {id:"mom",       cap:4000, used:2840, proj:3700, state:"ok"},
   {id:"dealroom",  cap:2500, used:1640, proj:2140, state:"ok"},
   {id:"rundown",   cap:1500, used:1090, proj:1420, state:"near"},
   {id:"renewal",   cap:1200, used:  620, proj: 810, state:"ok"},
   {id:"cdwatch",   cap: 800, used:  372, proj: 486, state:"ok"},
   {id:"comparer",  cap: 600, used:  183, proj: 240, state:"ok"},
   {id:"rfq",       cap: 900, used:  222, proj: 290, state:"ok"}
  ]
};
const ORGSPEND={
  cap:48000, used:31200, proj:40900,
  teams:[
   {n:"Sales",             cap:14000, used:9840, proj:12900, people:14, perHead:921},
   {n:"Account Management",cap:16000, used:11200,proj:14600, people:22, perHead:664},
   {n:"Claims",            cap:10000, used:6900, proj:8900,  people:19, perHead:468},
   {n:"Placement Desk",    cap: 6000, used:3260, proj:4500,  people:12, perHead:375},
   {n:"Marketing",         cap: 2000, used:   0, proj:   0,  people:11, perHead:0}
  ],
  trend:[4100,7300,11900,16400,21800,26100,29000,31200]
};

/* ── agent-proposed changes ───────────────────────────────────────────────
   A6 / D4 · Gumloop ships Allow Self-Updates plus AI-managed triggers,
   connectors and skills, all on by default. Bench keeps the compounding and
   moves the commit: an agent may propose, only a human publishes. */
let PROPOSALS=[
 {id:"p1", agent:"rundown", when:"Sat 06:12", kind:"Instruction", conf:"high",
  t:"Name the source when a deal is called cold",
  d:"Nine of the last eleven ‘not useful' votes on going-cold items came from people who had called or messaged the client. Proposing: state which channels were checked, so a false cold reads as a gap in my sources rather than a wrong answer.",
  from:"11 negative votes over 9 days · 3 requests referencing the same thing", tests:"Regenerates 2 scenarios"},
 {id:"p2", agent:"comparer", when:"Fri 18:40", kind:"New scenario", conf:"high",
  t:"Add a test for scanned quote PDFs",
  d:"Run r-8836 hit a scanned PDF with no text layer and handled it correctly — named it and skipped it. There is no scenario covering this, so nothing protects the behaviour on the next version.",
  from:"Production run r-8836", tests:"Adds 1 scenario to Data"},
 {id:"p3", agent:"draftdesk", when:"Thu 09:05", kind:"New source", conf:"low",
  t:"Read the shared placement mailbox",
  d:"Twelve drafts in 30 days needed a quote reference that lives in placement@plumhq.com. Currently asks the user to paste it.",
  from:"12 runs where a required input was missing", tests:"New scope — needs org approval",
  warn:"This is a new data source and a widened scope. It cannot be approved here; it goes to Ananya with the reason and the run count."}
];

/* ── ownership and lineage ────────────────────────────────────────────────
   B1 · The teardown's headline failure: nothing crosses personal → team, and
   there is no move-to-team control anywhere in the product. In Bench, publish
   moves custody. */
const OWNERSHIP={
  owner:"Sales", author:"karan", maintainer:"karan", since:"13 Sep",
  history:[
   {t:"13 Sep", w:"Published v4.2 · custody moved from Karan Mehta to Sales", who:"karan"},
   {t:"2 Aug",  w:"Maintainer set to Karan Mehta on first publish", who:"karan"},
   {t:"29 Jul", w:"Created as a personal draft by Karan Mehta", who:"karan"}
  ],
  forks:[
   {team:"Account Management", agent:"Renewal Defender · AM", v:"2.4", when:"21 Aug", by:"sanya", installs:14,
    drift:"Changed the T-90 lead to T-120 and swapped the outcome metric to endorsement TAT."},
   {team:"Placement Desk", agent:"Renewal Defender · Placement", v:"1.1", when:"4 Sep", by:"meera", installs:6,
    drift:"Kept everything, added the underwriter question bank."}
  ]
};

/* ── what an install copies vs references ─────────────────────────────────
   B3 · In Gumloop, sharing grants chat + config-edit + a private history, and
   ownership, listing, triggers and knowledge all stay personal. Bench has to
   be explicit about this or two engineers build two products. */
const INSTALL_SEMANTICS=[
 {k:"Parameter values",      v:"copied",     d:"Yours. Set at install from the author's defaults, never migrated silently afterwards."},
 {k:"Credentials",           v:"copied",     d:"Your own OAuth grant. The agent reads exactly what you could open yourself, and nothing else."},
 {k:"Run history & threads", v:"copied",     d:"Private to you. Your admin sees counts and outcomes, never your content."},
 {k:"Instructions",          v:"referenced", d:"The team's. Changes when the maintainer publishes."},
 {k:"Guardrails & hard stops",v:"referenced",d:"The team's. Cannot be overridden by an installer, ever."},
 {k:"Scopes",                v:"referenced", d:"Declared by the agent, granted by you per source at install."},
 {k:"Outcome metric",        v:"referenced", d:"One definition for everyone, or the team number means nothing."},
 {k:"Version",               v:"pinned",     d:"You are on a version. Publishes advance you unless you pinned deliberately."}
];

/* ── member-facing: what's waiting ────────────────────────────────────────
   C2 · "A scheduled agent that blocks on a question has no visible surface
   outside its own chat: if you are not watching, you do not know it is
   waiting for you." This is that surface. */
let WAITING=[
 {id:"w1", run:"r-8839", agent:"renewal", when:"07:04 today", missed:0,
  q:"The Kalyani Foods claims file hasn't landed since Friday. Build the renewal pack on the two years I have — clearly labelled — or hold until it arrives?",
  why:"Presenting a two-year ratio as three years is the one thing I'm told never to do.",
  opts:["Build on two years, label it","Hold until the file arrives","Chase the TPA and hold"]},
 {id:"w2", run:"r-8836", agent:"comparer", when:"11:07 today", missed:0,
  q:"The Star Health quote is a scan with no text layer. Send me a text PDF or the insurer's quote email and I'll add the column — or shall I publish the three-way comparison as it stands?",
  why:"I won't read numbers off an image into a client-facing sheet.",
  opts:["I'll send a text version","Publish the three-way as it stands"]}
];

/* ── projections ──────────────────────────────────────────────────────────
   C7 · The one surface in Gumloop that shows a price before the action rather
   than in the ledger after it. Made a law here: L3. */
function projectRuns(perDay){ return Math.round(perDay*30.4); }
function bandCost(band,n){ return Math.round(COSTBAND[band].n*n); }
function projectMonth(perDay,band){ return bandCost(band,projectRuns(perDay)); }
function budgetOf(id){ return BUDGET.perAgent.find(b=>b.id===id); }
function runsFor(id){ return RUNS.filter(r=>r.agent===id); }
function RUN(id){ return RUNS.find(r=>r.id===id); }
function stateChip(k){ const s=RUNSTATE[k];
  return `<span class="chip ${s.c}" title="${esc(s.m)}">${k==="completed"?ICON.check:k==="failed"?ICON.x:k==="blocked"?ICON.alert:k==="partial"?ICON.alert:""}${s.l}</span>`; }

/* ── install-time backfill and plain-language scopes ──────────────────────
   B7 · The onboarding we studied sells outcomes for five steps before it asks
   for a single permission, and its scope modal pre-selects "Unrestricted access
   to everything" as the Recommended option. Show the work, then ask narrowly. */
const BACKFILL=[
 {s:"bad",  t:"Kalyani Foods renewal is at T-84 and the revised loading hasn't come back since Thursday.", d:"₹1.1 Cr · second chaser overdue"},
 {s:"hot",  t:"Urban Spaces — no touch in 6 days.", d:"You met them on the 11th. Proposal not sent."},
 {s:"hot",  t:"Two endorsement files from HR sitting unopened since Friday.", d:"Nutrabay and Fabrik Labs"},
 {s:"info", t:"You're ₹41 L short of quarter with 16 working days left.", d:"One deal in Negotiation closes it."}
];
const SCOPE_PLAIN=[
 "Threads you can already open. Never anyone else's mailbox.",
 "Channels on the org allowlist that you are a member of.",
 "Deals, activities and contacts you own in HubSpot.",
 "Your own calendar, including titles and attendees.",
 "Files in the shared drives you already have access to."
];
