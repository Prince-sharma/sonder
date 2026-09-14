/* ═══════════════════════════════════════════════════════════════════════════
   V3 — THE FRESH-INSTALL JOURNEY  (bare JS — sits inside the script block)
   v1/v2 show the pilot world preloaded. v3 starts at day zero and answers
   "how does an org get to that world from nothing?"

   The Journey bar (under the top bar) walks four stages:
     0  Day 0        — fresh install, only the super admin exists
     1  Org ready    — team + people + connections, no agents
     2  First agent  — Morning Rundown v1.0 live, week one
     3  Full pilot   — the v1 world, eight weeks in

   Stage 0→1 is driven by the super-admin checklist, 1→2 by the team-admin
   checklist; both advance themselves when every step is done. Stage 3 is a
   time jump, not an action — take it from the Journey bar.

   Data globals (let, in 10-data.js) are swapped per stage; the full pilot
   dataset is snapshotted at load and restored verbatim, so stage 3 is
   byte-for-byte the v1 world.
   ═══════════════════════════════════════════════════════════════════════════ */

const JOURNEY=[
  {id:0, label:"Day 0",       title:"Fresh install",   cap:"Fresh install — nothing exists yet. Only the super admin has an account."},
  {id:1, label:"Org ready",   title:"The org is ready",cap:"Org ready — Sales, Karan, connections. No agents yet."},
  {id:2, label:"First agent", title:"First agent live",cap:"First agent live — week one of the pilot."},
  {id:3, label:"Full pilot",  title:"Eight weeks in",  cap:"Eight weeks in — the destination. Same world as v1."}
];

/* ── full-pilot snapshot (the v1 world, restored verbatim at stage 3) ────── */
const FULL={AGENTS:AGENTS.slice(), DRAFTS:DRAFTS.slice(), INSTALLED:INSTALLED.slice(),
  FEED:FEED.slice(), APPROVALS:APPROVALS.slice(), REQUESTS:REQUESTS.slice(),
  TEAMS:TEAMS.slice(), CONNECTIONS:CONNECTIONS.slice(), AUDIT:AUDIT.slice()};

/* ── stage data ──────────────────────────────────────────────────────────── */
function week1Agent(){
  const r=FULL.AGENTS.find(a=>a.id==="rundown");
  return {...r, v:"1.0", verified:false, isNew:true,
    installs:3, active7:3, runs30:6, actedPct:67, dismissPct:0,
    metric:{...r.metric, now:21, series:[23,21], months:["Aug","Sep"]}};
}
const W1_FEED={id:"w1", agent:"rundown", time:"08:15", stripe:"hot",
  title:"Your first rundown — 4 things need you",
  meta:"Scanned 96 mail threads · 12 Slack channels · 6 open deals",
  items:[
    {s:"hot",  t:"Fabrik Labs — no touch in 9 days.", d:"Proposal sent 4 Sep, opened twice, never replied to. Expected premium ₹38 L."},
    {s:"hot",  t:"Meesho asked for parent co-pay options on Friday at 18:40. Still unanswered.", d:"Thread: “Re: GMC 2027 — parent cover economics”."},
    {s:"info", t:"You're ₹62 L short of your ₹2.4 Cr quarter with 16 working days left.", d:"Two deals in Negotiation would close it."},
    {s:"info", t:"This is run #6. The ranking learns from what you act on.", d:"Useful / Not useful on each item is how it tunes itself to you."}
  ], cta:{label:"Open the rundown", to:"#/m/thread/rundown"}};

const S1_TEAM={name:"Sales", people:14, live:0, activated:0, habitual:0, power:0, lead:"karan",
  state:"setup", headline:"Awaiting business context", trend:[0,0,0,0,0,0,0,0]};
const W1_TEAM={name:"Sales", people:14, live:1, activated:4, habitual:0, power:0, lead:"karan",
  state:"live", headline:"First agent live — week one", trend:[0,0,0,0,0,0,0,25]};

function stageConnections(n){
  return FULL.CONNECTIONS.map(c=>{
    if(n===0) return {...c, s:"missing", d:"Not connected yet", scope:"—"};
    const core=c.n.startsWith("Google Workspace")||c.n.startsWith("Slack")||
               c.n.startsWith("HubSpot")||c.n.startsWith("CD ledger")||c.n.startsWith("Policy wordings");
    if(core) return {...c};
    return {...c, s:"missing",
      d:c.n.startsWith("TPA")?"Needed before Renewal Defender — not requested yet":"Not requested yet", scope:"—"};
  });
}
const S1_AUDIT=[
  {t:"14 Sep 09:02", who:"ananya", what:"Created team Sales — 14 licences", tag:"access"},
  {t:"14 Sep 09:12", who:"ananya", what:"Invited Karan Mehta as team admin, Sales", tag:"access"},
  {t:"14 Sep 09:30", who:"ananya", what:"Connected Google Workspace — 78 users asked to consent", tag:"access"},
  {t:"14 Sep 09:38", who:"ananya", what:"Connected Slack — 41 channels in scope", tag:"access"},
  {t:"14 Sep 09:41", who:"ananya", what:"Connected HubSpot — owner-scoped read, task write", tag:"access"}
];
const W1_AUDIT=[
  {t:"18 Sep 08:00", who:"karan",  what:"Published Morning Rundown v1.0 to Sales (14 people)", tag:"publish"},
  {t:"18 Sep 07:58", who:"karan",  what:"Test lab: 14 scenarios, 14 passed, 3 guardrails held", tag:"publish"},
  {t:"17 Sep 16:20", who:"karan",  what:"Business context for Sales marked complete (92%)", tag:"access"},
  ...S1_AUDIT
];

function applyStageData(n){
  state.stage=n;
  state.installed=new Set(); state.approved=new Set(); state.testRun=false; state.buildTab="chat";
  if(n>=1) SETUP.super.forEach(s=>state.setupDone.add(s.k));
  if(n>=2) SETUP.admin.forEach(s=>state.setupDone.add(s.k));
  if(n===3){
    AGENTS=FULL.AGENTS.slice(); DRAFTS=FULL.DRAFTS.slice(); INSTALLED=FULL.INSTALLED.slice();
    FEED=FULL.FEED.slice(); APPROVALS=FULL.APPROVALS.slice(); REQUESTS=FULL.REQUESTS.slice();
    TEAMS=FULL.TEAMS.slice(); CONNECTIONS=FULL.CONNECTIONS.slice(); AUDIT=FULL.AUDIT.slice();
    state.installed=new Set(INSTALLED);
  }else if(n===2){
    AGENTS=[week1Agent()]; DRAFTS=[]; INSTALLED=["rundown"]; FEED=[W1_FEED];
    APPROVALS=[]; REQUESTS=[]; TEAMS=[W1_TEAM]; CONNECTIONS=stageConnections(2); AUDIT=W1_AUDIT;
    state.installed=new Set(["rundown"]);
  }else if(n===1){
    AGENTS=[]; DRAFTS=[]; INSTALLED=[]; FEED=[]; APPROVALS=[]; REQUESTS=[];
    TEAMS=[S1_TEAM]; CONNECTIONS=stageConnections(1); AUDIT=S1_AUDIT;
  }else{
    AGENTS=[]; DRAFTS=[]; INSTALLED=[]; FEED=[]; APPROVALS=[]; REQUESTS=[];
    TEAMS=[]; CONNECTIONS=stageConnections(0); AUDIT=[];
  }
}

function setStage(n, rerender){
  applyStageData(n);
  if(state.stage===0&&state.role!=="super"&&typeof HOME!=="undefined"){
    state.role="super"; location.hash=HOME.super;
  }
  renderJourney();
  if(rerender&&typeof render==="function") render();
}

/* ── the setup checklists (the nudges) ───────────────────────────────────── */
const SETUP={
 super:[
  {k:"team",   t:"Create the Sales team",  btn:"Create team",
   d:"One team first — Sales, 14 licences. Add the rest of the org once the pattern works.",
   to:"#/s/teams",
   mock:"Sales · 14 licences · part of Plum (insurance broker, India). Teams can be renamed, merged and added any time — but one team reaching ‘live' first is what proves the pattern."},
  {k:"admin",  t:"Invite the team admin",  btn:"Invite Karan",
   d:"Karan Mehta, Sales Lead · West. He owns agents, requests and publishing for Sales — the SME who builds.",
   to:"#/s/people",
   mock:"karan@plumhq.com → Team admin, Sales. He gets the builder, the test lab and the requests inbox. You keep every connection, boundary and audit."},
  {k:"google", t:"Connect Google Workspace", btn:"Connect",
   d:"Gmail, Calendar, Drive. Per-user consent — an agent only ever reads what its installer could open themselves.",
   to:"#/s/connections",
   mock:"OAuth · Gmail read, Calendar read, Drive read. You grant the org connection; each of the 78 users consents to their own data individually."},
  {k:"slack",  t:"Connect Slack",          btn:"Connect",
   d:"Where digests and alerts land. Channel allowlist, set by you.",
   to:"#/s/connections",
   mock:"Bot + user token · 41 channels in scope · #sales, #placement and the account channels. The allowlist is yours to tighten per team."},
  {k:"hubspot",t:"Connect HubSpot",        btn:"Connect",
   d:"Deals, contacts, activities — the pipeline the agents reason over.",
   to:"#/s/connections",
   mock:"Owner-scoped read on deals, contacts, companies and activities · task write. No contact data leaves the tenant."}
 ],
 admin:[
  {k:"context",t:"Write the business context", btn:"Start the interview",
   d:"How sales works at Plum — targets, incentives, what separates the best from the rest. Agents built on this are the point; agents built without it are generic.",
   to:"#/a/context",
   mock:"A 40-minute guided interview, not a blank form. Produces the context pack every Sales agent is grounded on. The platform refuses the first publish without it."},
  {k:"build",  t:"Build the first agent",      btn:"Open the builder",
   d:"Start with what your best rep already does every morning — the rundown. Describe it in chat; the platform turns it into a config.",
   to:"#/a/build",
   mock:"Chat drafts, the form refines. The config is the schema a developer builds against — and what the test lab writes its situations from."},
  {k:"test",   t:"Test it on real situations", btn:"Open the test lab",
   d:"The platform writes the situations from the config — you didn't write any of them. Nothing publishes with a failed guardrail.",
   to:"#/a/test",
   mock:"Situations, what should happen, what did happen, what broke — and the fix it proposes. No ‘eval' vocabulary; a sales lead gets plain answers."},
  {k:"publish",t:"Publish to the team",        btn:"Publish v1.0",
   d:"Morning Rundown v1.0 → 14 people. They install it; it runs from the next trigger.",
   to:"#/a/publish",
   mock:"The release note goes to the feed and as a Slack DM. Rollback is one click. The outcome metric starts recording the day it goes live."}
 ]
};

const isDone=s=>state.setupDone.has(s.k);

function setupPanel(role){
  const steps=SETUP[role], done=steps.filter(isDone).length, all=done===steps.length;
  const head=role==="super"
    ? ["Set up Bench for Plum","Five steps, all yours. The team admin unlocks when they're done."]
    : ["Get Sales on Bench","Four steps, in this order. The first publish is refused until the context exists."];
  return `<section class="panel setup">
    <div class="panel-h"><div><h3>${head[0]}</h3>
      <div class="tiny faint" style="margin-top:2px">${head[1]}</div></div>
      <div class="r"><span class="chip ${all?"ok":"info"}">${all?ICON.check+"Complete":done+" of "+steps.length}</span></div></div>
    <div class="rows">${steps.map((s,i)=>{const d=isDone(s);
      return `<div class="row s-none setup-step${d?" done":""}">
        <span class="stepnum">${d?ICON.check:i+1}</span>
        <div class="row-main"><span class="row-title"><a href="${s.to}" style="color:inherit">${esc(s.t)}</a></span>
          <span class="row-sub">${esc(s.d)}</span></div>
        <div class="row-aside">${d?`<span class="chip ok">${ICON.check}Done</span>`
          :`<button class="btn sm pri" data-act="step" data-id="${s.k}">${esc(s.btn)}</button>`}</div></div>`}).join("")}</div>
    <div class="panel-f">${role==="super"
      ? `<span class="tiny faint">Then hand over to Karan — he writes the business context and builds the first agent.</span>`
      : `<span class="tiny faint">Order is enforced: context before the first agent. Teams that published first produced generic agents.</span>`}</div>
  </section>`;
}

function stepModal(k){
  const s=[...SETUP.super,...SETUP.admin].find(x=>x.k===k); if(!s) return;
  modal(`<div class="panel-h" style="border-radius:11px 11px 0 0">
      <div><h3>${esc(s.t)}</h3>
        <div class="tiny faint" style="margin-top:2px">Prototype — the real flow lives at ${esc(s.to)}</div></div>
      <div class="r"><button class="btn sm ghost" data-act="close">${ICON.x}</button></div></div>
    <div class="modal-b"><p style="font-size:13.5px;line-height:1.7">${esc(s.mock)}</p></div>
    <div class="panel-f"><button class="btn pri" data-act="dostep" data-id="${k}">${esc(s.btn)}</button>
      <button class="btn" data-act="closenav" data-id="${s.to}">Go to the screen</button>
      <span class="topbar-spacer"></span>
      <button class="btn ghost" data-act="close">Not now</button></div>`);
}

function completeStep(k){
  state.setupDone.add(k); closeModal();
  const superAll=SETUP.super.every(isDone), adminAll=SETUP.admin.every(isDone);
  if(state.stage===0&&superAll){
    setStage(1,true); toast("Sales is set up. Karan's turn — switch to Team admin, top right."); return;
  }
  if(state.stage===1&&adminAll){
    setStage(2,true); toast("Morning Rundown v1.0 is live. Watch the first week."); return;
  }
  render();
}

/* ── shared empty state ──────────────────────────────────────────────────── */
function emptyPanel(t,b,cta=""){
  return `<section class="panel"><div class="panel-b" style="padding:46px 24px;text-align:center">
    <div class="display" style="font-size:20px;margin-bottom:8px;color:var(--ink-2)">${t}</div>
    <p class="muted" style="max-width:56ch;margin:0 auto 16px;font-size:13.5px;line-height:1.65">${b}</p>${cta}</div></section>`;
}

/* ═══════════════════════════ SUPER ADMIN ═══════════════════════════ */

function overviewJourney(){
  const st=state.stage;
  if(st===0) return `<div class="wrap">
  ${phead("Plum — day zero","Bench was installed this morning. No team, no people, no connections, no agents. Five steps stand between here and the first agent running — all five are yours.",
    `<span class="chip info">${ICON.spark}Fresh install</span>`)}
  ${note("**v3 answers ‘how does an org get to the pilot state from nothing?’** The Journey bar under the top bar walks the four stages; this checklist is stage one. Complete all five steps and the platform hands over to the team admin — the same handover you're about to give Karan.")}
  ${setupPanel("super")}
  <section class="panel"><div class="panel-h"><h3>After these five steps</h3>
    <div class="r"><span class="chip plain">Then it's Karan's</span></div></div>
    <div class="panel-b"><div class="trace">
      <div class="tstep"><b>Karan writes the business context</b> — how sales works, targets, incentives, what separates the best</div>
      <div class="tstep"><b>He builds the first agent</b> — chat drafts it, the form refines it, the test lab tries to break it</div>
      <div class="tstep"><b>He publishes</b> — 14 people get a Slack DM with a one-click install</div>
      <div class="tstep"><b>You watch</b> — adoption, impact and the change-management worklist, from this screen</div>
    </div></div>
    <div class="panel-f"><span class="tiny faint">The whole path is walkable — use the Journey bar, or complete the checklist and let it advance itself.</span></div></section>
  </div>`;

  if(st===1) return `<div class="wrap">
  ${phead("Plum — the org is ready","Sales exists, Karan is its team admin, and the tools are connected. No agents yet — that's Karan's half now.",
    `<span class="chip ok">${ICON.check}Stage 2 of 4</span>`)}
  ${setupPanel("super")}
  <div class="tiles" style="margin:20px 0">
    <div class="tile"><span class="lbl">Teams</span><span class="val">1</span><span class="foot">Sales · 14 licences</span></div>
    <div class="tile"><span class="lbl">People</span><span class="val">15</span><span class="foot">14 invited + you</span></div>
    <div class="tile"><span class="lbl">Connections</span><span class="val">3</span><span class="foot">Google · Slack · HubSpot</span></div>
    <div class="tile"><span class="lbl">Agents</span><span class="val">0</span><span class="foot">Karan's next job</span></div>
  </div>
  <div class="callout info"><b>Hand over now.</b> Switch to Team admin (top right) and walk Karan's half: business context → build → test → publish. Or jump the Journey bar to ‘First agent’ or ‘Full pilot’.</div>
  </div>`;

  return `<div class="wrap">
  ${phead("Plum — first agent live","Morning Rundown v1.0 has been running for a week. Three installs, six runs, the metric's baseline recorded. Small numbers — the honest state of week one.",
    `<span class="chip ok">${ICON.check}Stage 3 of 4</span>`)}
  <div class="tiles" style="margin:20px 0">
    <div class="tile"><span class="lbl">Agents</span><span class="val">1</span><span class="foot">Morning Rundown v1.0</span></div>
    <div class="tile"><span class="lbl">Installs</span><span class="val">3<small>/14</small></span><span class="foot">Rhea, Meera, Vikram</span></div>
    <div class="tile"><span class="lbl">Runs this week</span><span class="val">6</span><span class="foot">All healthy</span></div>
    <div class="tile"><span class="lbl">Acted on</span><span class="val">67<small>%</small></span><span class="foot">8 of 12 items</span></div>
  </div>
  <section class="panel"><div class="panel-h"><h3>Sales</h3>
    <div class="r"><a class="btn sm" href="#/s/teams">Setup trace</a></div></div>
    <div class="panel-b"><div class="trace">
      <div class="tstep done"><b>Team created</b> — 14 licences, Karan Mehta as admin</div>
      <div class="tstep done"><b>Sources connected</b> — Google Workspace, Slack, HubSpot</div>
      <div class="tstep done"><b>Business context written</b> — 92%: shape, targets, incentives, excellence</div>
      <div class="tstep done"><b>First agent published</b> — Morning Rundown v1.0, Monday 08:15</div>
      <div class="tstep live"><b>Go live</b> — week one. Three installs. The metric is recording.</div>
    </div></div></section>
  <div class="callout" style="margin-top:16px"><b>What you're watching for.</b> Not the install count — the acted-on count. An installed agent that nobody acts on is a dead agent, and week one is when you find out. The ‘Full pilot’ stage of the Journey bar is where this ends up when it works.</div>
  </div>`;
}

function teamsJourney(){
  const st=state.stage;
  if(st===0) return `<div class="wrap">
  ${phead("Teams and rollout","No teams yet. A team goes live when its business context is written, its sources are connected and one person has published one agent.",
    `<button class="btn pri" data-act="step" data-id="team">${ICON.plus}Create the first team</button>`)}
  ${note("**One team first.** The pitch is org-wide, but the rollout never is. Sales — 14 people, one lead, one pattern to prove. Every team after that copies a working team, not a slide.")}
  <section class="panel"><div class="panel-h"><h3>What ‘create a team’ sets in motion</h3></div>
    <div class="panel-b"><div class="trace">
      <div class="tstep live"><b>Create the team</b> — name, licences, lead</div>
      <div class="tstep"><b>Invite the team admin</b> — the SME who builds</div>
      <div class="tstep"><b>Connect sources</b> — the tools this team works in</div>
      <div class="tstep"><b>Business context</b> — the team admin's first job</div>
      <div class="tstep"><b>First agent published</b></div>
      <div class="tstep"><b>Go live</b></div>
    </div></div>
    <div class="panel-f"><span class="tiny faint">The same trace, per team, is how you track rollout across the org later — see ‘Full pilot’.</span></div></section>
  </div>`;

  return `<div class="wrap">
  ${phead("Teams and rollout",`One team, ${st===1?"mid-setup":"live as of Monday"}. A team goes live when its business context is written, its sources are connected and one person has published one agent.`)}
  <section class="panel" style="margin-bottom:18px"><div class="panel-h"><h3>Sales — ${st===1?"setup, 60% done":"live, week one"}</h3>
    <div class="r"><span class="chip ${st===1?"info":"ok"}">${st===1?"In setup":"Live"}</span></div></div>
    <div class="panel-b"><div class="trace">
      <div class="tstep done"><b>Team created</b> — 14 licences</div>
      <div class="tstep done"><b>Lead assigned</b> — Karan Mehta, team admin</div>
      <div class="tstep done"><b>Sources connected</b> — Gmail, Slack, HubSpot</div>
      ${st===1
        ? `<div class="tstep live"><b>Business context</b> — not written. Karan's first job, before any agent.<br>
             <span class="tiny faint">A 40-minute interview, not a form. The platform refuses the first publish without it.</span></div>
           <div class="tstep"><b>First agent published</b> — none yet</div>
           <div class="tstep"><b>Go live</b></div>`
        : `<div class="tstep done"><b>Business context</b> — 92%. Shape, targets, incentives, excellence.</div>
           <div class="tstep done"><b>First agent published</b> — Morning Rundown v1.0, Monday</div>
           <div class="tstep live"><b>Go live</b> — week one. Three installs, six runs, metric recording.</div>`}
    </div></div>
    ${st===1?`<div class="panel-f"><a class="btn sm pri" href="#/a/context">Karan: write the context</a>
      <span class="tiny faint">Teams that complete context before their first agent reach habitual use 3× faster in this pilot</span></div>`:""}
  </section>
  ${note("**Sequence matters more than features here.** Every team in this pilot that published an agent before writing its business context produced a generic agent, watched it get ignored, and had to start again. Make the setup flow refuse to reorder itself.")}
  </div>`;
}

function peopleJourney(){
  const st=state.stage;
  if(st===0) return `<div class="wrap wide">
  ${phead("People","One account exists — yours. Everyone else arrives when you create a team and invite its admin.",
    `<button class="btn pri" data-act="step" data-id="admin">${ICON.plus}Invite the team admin</button>`)}
  <section class="panel"><div class="rows">
    <div class="row s-ok"><span class="stripe"></span>${av("ananya","sm")}
      <div class="row-main"><span class="row-title">Ananya Rao</span>
        <span class="row-sub">VP Revenue Operations · Super admin · that's you</span></div>
      <div class="row-aside"><span class="chip ok">${ICON.check}Active</span></div></div>
    <div class="row s-none"><span class="avatar n">+</span>
      <div class="row-main"><span class="row-title" style="color:var(--ink-2)">Karan Mehta — not yet invited</span>
        <span class="row-sub">Sales Lead · West. Will be Team admin, Sales.</span></div>
      <div class="row-aside"><button class="btn sm pri" data-act="step" data-id="admin">Invite</button></div></div>
  </div></section></div>`;

  const inst=new Set(["rhea","vikram","meera"]);
  return `<div class="wrap wide">
  ${phead("People",`Fifteen accounts — you, Karan, and the thirteen he invited. ${st===2?"Three have installed the first agent.":"Nobody has installed anything yet — there's nothing to install."}`)}
  <div class="tiles" style="margin-bottom:18px">
    <div class="tile"><span class="lbl">Accounts</span><span class="val">15</span><span class="foot">1 super admin · 14 Sales</span></div>
    <div class="tile"><span class="lbl">Installed something</span><span class="val">${st===2?3:0}</span><span class="foot">${st===2?"Morning Rundown":"Nothing to install yet"}</span></div>
    <div class="tile"><span class="lbl">Segments</span><span class="val" style="font-size:21px">Too early</span><span class="foot">Segments appear after 4 weeks</span></div>
    <div class="tile"><span class="lbl">Dormant</span><span class="val">0</span><span class="foot">Everyone's new</span></div>
  </div>
  <section class="panel"><div class="rows">
    ${Object.keys(PEOPLE).map(k=>{const p=P(k), on=st===2&&inst.has(k);
      return `<div class="row ${on?"s-ok":"s-none"}">${on?'<span class="stripe"></span>':""}${av(k,"sm")}
        <div class="row-main"><span class="row-title">${esc(p.n)}</span>
          <span class="row-sub">${esc(p.r)}${k==="ananya"?" · Super admin":k==="karan"?" · Team admin, Sales":""}</span></div>
        <div class="row-aside">${on?`<span class="chip ok">${ICON.check}Installed</span>`
          :st===2?`<span class="tiny faint">Not yet</span>`:`<span class="tiny faint">Invited</span>`}</div></div>`}).join("")}
  </div>
  <div class="panel-f"><span class="tiny faint">Usage segments, run counts and the change-management worklist appear once agents are live — see the People screen in ‘Full pilot’.</span></div></section></div>`;
}

function agentsSuperJourney(){
  if(!AGENTS.length) return `<div class="wrap wide">
  ${phead("Every agent at Plum","None yet. The first arrives when Karan publishes — a week or two, if the context interview happens this week.")}
  ${emptyPanel("No agents anywhere yet","Agents are built by team admins, not by you and not by the platform. Your view of them: adoption, impact, and the verdicts — working, under-used, used-but-not-moving.")}
  </div>`;
  return `<div class="wrap wide">
  ${phead("Every agent at Plum","One. Eight weeks in there are twenty-two across five teams — the Journey bar's ‘Full pilot’ shows that world.")}
  <div class="tablewrap"><table>
  <thead><tr><th>Agent</th><th>Team</th><th>Author</th><th>Autonomy</th><th class="num">Installs</th>
    <th class="num">Weekly active</th><th>Outcome metric</th><th class="num">Baseline</th><th class="num">Now</th><th>Verdict</th></tr></thead><tbody>
  ${AGENTS.map(a=>{const good=hitTarget(a.metric), used=a.active7/a.installs;
    const verdict=["info","Too early"];
    return `<tr><td><span class="cellname">${glyph(a,"sm")}<span class="t">${esc(a.name)}</span><span class="chip info">New</span></span></td>
    <td class="tiny muted">${esc(a.team)}</td>
    <td><span class="cellname">${av(a.by,"sm")}<span class="tiny">${esc(P(a.by).n.split(" ")[0])}</span></span></td>
    <td>${autChip(a.autonomy)}</td>
    <td class="num mono">${a.installs}/14</td>
    <td class="num"><span class="rowflex" style="justify-content:flex-end;gap:8px">
      <span class="meter" style="max-width:44px"><i class="hot" style="width:${(used*100).toFixed(0)}%"></i></span>
      <span class="mono tiny">${pct(used*100)}</span></span></td>
    <td class="tiny muted" style="max-width:220px">${esc(a.metric.name)}</td>
    <td class="num mono faint">${fmtMetric(a.metric,a.metric.base)}</td>
    <td class="num mono" style="font-weight:600;color:${good?"var(--good)":"var(--warn)"}">${fmtMetric(a.metric,a.metric.now)}</td>
    <td><span class="chip ${verdict[0]}">${ICON.alert}${verdict[1]}</span></td></tr>`}).join("")}
  </tbody></table></div>
  ${note("**Four verdicts, not one score.** ‘Used but not moving’ and ‘works but under-used’ need completely different interventions — the first is a design problem for the author, the second is a change-management problem for the team lead. Collapsing them into one adoption percentage is what makes most dashboards useless. Verdicts need four weeks of data; week one earns ‘too early’.")}
  </div>`;
}

function connectionsJourney(){
  const st=state.stage;
  const aside= st===0
    ? `<section class="panel"><div class="panel-h"><h3>Why connect first</h3></div><div class="panel-b">
        <p class="muted" style="font-size:13.5px;line-height:1.7">Agents read and write through these connections. Nothing can be built — or tested — until the team's tools are in. Connect Google Workspace, Slack and HubSpot from the checklist on the Organisation page.</p>
        <div class="callout info" style="margin-top:12px"><b>Per-user consent, always.</b> An agent can never read a record its installer couldn't open themselves. You grant the org connection; each person consents to their own data.</div>
      </div></section>`
    : `<section class="panel"><div class="panel-h"><h3>Autonomy across the org</h3></div><div class="panel-b">
        ${barlist([{l:"Suggest",v:AGENTS.filter(a=>a.autonomy==="suggest").length},
                   {l:"Draft",v:AGENTS.filter(a=>a.autonomy==="draft").length},
                   {l:"Auto-act",v:AGENTS.filter(a=>a.autonomy==="auto").length}],{fmt:v=>v+" agents"})}
        <div class="callout tiny" style="margin-top:12px">${AGENTS.length?"One agent so far — suggest-level, read-only. Auto-act requires a named owner and a written reason.":"No agents yet — autonomy levels appear as agents publish."}</div>
      </div></section>`;
  return `<div class="wrap wide">
  ${phead("Connections and governance",st===0
    ?"Nothing is connected yet. Three connections stand between here and Karan being able to build."
    :"What agents may reach, on whose authority, and a record of everything that happened with it.")}
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Sources</h3>
      <div class="r">${st===0?`<button class="btn sm pri" data-act="step" data-id="google">${ICON.plus}Connect Google Workspace</button>`
        :`<button class="btn sm">${ICON.plus}Connect</button>`}</div></div>
      <div class="rows">${CONNECTIONS.map(c=>`<div class="row s-${c.s==="healthy"?"ok":c.s==="degraded"?"hot":"none"}">
        <span class="stripe"></span>
        <div class="row-main"><span class="row-title">${esc(c.n)}</span><span class="row-sub">${esc(c.d)}</span></div>
        <div class="row-aside"><span class="chip plain tiny">${esc(c.scope)}</span>
          <span class="chip ${c.s==="healthy"?"ok":c.s==="degraded"?"hot":"bad"}">
            ${c.s==="healthy"?ICON.check:c.s==="degraded"?ICON.alert:ICON.x}${esc(c.s)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Every source is connected per user with that user's own permissions. An agent can never read a record its installer couldn't open themselves.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>Everything that happened</h3></div>
      <div class="rows">${AUDIT.length?AUDIT.map(e=>`<div class="row s-none" style="padding-block:11px">
        <span class="mono tiny faint nowrap" style="min-width:88px">${esc(e.t)}</span>
        ${av(e.who,"sm")}
        <div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(e.what)}</span></div>
        <div class="row-aside"><span class="chip info">${esc(e.tag)}</span></div></div>`).join("")
        :`<div class="empty">Nothing yet — the log starts with the first connection.</div>`}</div>
      <div class="panel-f"><span class="tiny faint">Retained 24 months. Exportable. Every auto-act entry names the guardrail that permitted it.</span></div></section>
  </div>
  <aside class="stack g16">${aside}
    <section class="panel"><div class="panel-h"><h3>Data boundaries</h3></div>
      <div class="rows">
      ${[["Member-level claims data","Never leaves the TPA feed. Agents see cohort aggregates only."],
         ["Brokerage and commission","Readable by 4 named people. No agent may state a figure to a client."],
         ["Client PII","Masked in every agent trace and in the audit log."],
         ["Model training","No customer data leaves the tenant. Nothing is used to train a shared model."]]
        .map(([t,d])=>`<div class="row s-none" style="padding-block:11px">
          <div class="row-main"><span class="row-title" style="font-size:12.5px">${esc(t)}</span>
            <span class="row-sub tiny">${esc(d)}</span></div><div class="row-aside">${ICON.lock}</div></div>`).join("")}</div></section>
  </aside></div></div>`;
}

/* ═══════════════════════════ TEAM ADMIN ═══════════════════════════ */

function adminLocked(){
  return `<div class="wrap">
  ${phead("Sales","This is what the team admin will see — once the team exists and someone has the role.")}
  ${emptyPanel("No team admin yet","At day zero only the super admin has an account. Create the Sales team and invite Karan from the Organisation page, then come back — or walk the whole path with the Journey bar above.")}
  </div>`;
}

function pulseJourney(){
  const st=state.stage;
  if(st===1) return `<div class="wrap wide">
  ${phead("Sales — your turn","The org is connected: Gmail, Slack, HubSpot, the pipeline. Nothing exists for Sales yet — four steps, in this order, and the platform holds your hand through each.")}
  ${note("**v3 — the team admin's half of onboarding.** The super admin set up the org; this checklist is what stands between an empty platform and the first agent running. The order is enforced: business context before the first agent, always.")}
  ${setupPanel("admin")}
  <section class="panel"><div class="panel-h"><h3>What this looks like eight weeks in</h3></div>
    <div class="rows">${[["8 agents","Built by four authors — Karan, Meera, Vikram, Ishita"],
        ["Requests shipping","Every release note names the person who asked"],
        ["Metrics moving","Quote TAT down 52%, response TAT from 11 h to 3 h"],
        ["A habit","9 of 14 people active in 9 of the last 12 weeks"]]
      .map(([t,d])=>`<div class="row s-ok"><span class="stripe"></span>
        <div class="row-main"><span class="row-title" style="font-size:13px">${t}</span>
          <span class="row-sub">${d}</span></div></div>`).join("")}</div>
    <div class="panel-f"><span class="tiny faint">Jump there with the Journey bar above — ‘Full pilot’.</span></div></section>
  </div>`;

  return `<div class="wrap wide">
  ${phead("Sales — week one","Morning Rundown v1.0 went live Monday. Three of fourteen installed. Your job this week: watch who acts on it, answer the first questions fast, and catch the first request.",
    `<a class="btn pri" href="#/a/build">${ICON.plus}Next agent</a>`)}
  <div class="tiles" style="margin-bottom:20px">
    <div class="tile"><span class="lbl">Installed</span><span class="val">3<small>/14</small></span><span class="foot">Rhea, Meera, Vikram</span></div>
    <div class="tile"><span class="lbl">Runs this week</span><span class="val">6</span><span class="foot">Weekdays 08:15</span></div>
    <div class="tile"><span class="lbl">Acted on</span><span class="val">67<small>%</small></span><span class="foot">8 of 12 items actioned</span></div>
    <div class="tile"><span class="lbl">Requests</span><span class="val">0</span><span class="foot">The first one matters</span></div>
  </div>
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Agents you own</h3>
      <div class="r"><a class="btn sm" href="#/a/agents">Manage</a></div></div>
      <div class="tablewrap" style="border:0;border-radius:0"><table>
      <thead><tr><th>Agent</th><th class="num">Installed</th><th class="num">Acted on</th>
        <th>Outcome metric</th><th class="num">Now</th><th>Trend</th></tr></thead><tbody>
      ${AGENTS.map(a=>`<tr data-go="#/a/analytics/${a.id}" style="cursor:pointer">
        <td><span class="cellname">${glyph(a,"sm")}<span class="t">${esc(a.name)}</span><span class="chip info">New</span></span></td>
        <td class="num"><span class="rowflex" style="justify-content:flex-end;gap:8px">
          <span class="meter" style="max-width:46px"><i class="hot" style="width:${(a.installs/14*100).toFixed(0)}%"></i></span>
          <b class="mono tiny">${a.installs}/14</b></span></td>
        <td class="num mono">${a.actedPct}%</td>
        <td class="tiny muted" style="max-width:230px">${esc(a.metric.name)}</td>
        <td class="num mono" style="font-weight:600;color:var(--warn)">${fmtMetric(a.metric,a.metric.now)}</td>
        <td>${spark(a.metric.series,{w:76,h:22})}</td></tr>`).join("")}
      </tbody></table></div></section>

    <section class="panel"><div class="panel-h"><h3>Watch for, this week</h3></div>
      <div class="rows">${[["Who opens it twice","One open is curiosity. Two is a habit forming."],
          ["The first ‘not useful’","Every card has the buttons. The reason behind an early dismissal is the cheapest fix you'll ever get."],
          ["The first request","When it comes, ship it fast and name the person who asked in the note. That's the whole adoption engine."]]
        .map(([t,d])=>`<div class="row s-info"><span class="stripe"></span>
          <div class="row-main"><span class="row-title" style="font-size:13px">${t}</span>
            <span class="row-sub">${d}</span></div></div>`).join("")}</div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Where this goes</h3></div><div class="panel-b">
      ${metricChart(AGENTS[0].metric,{h:170})}
      <div class="callout tiny" style="margin-top:12px">One week of data — the baseline is recorded, the target is declared. Jump to ‘Full pilot’ on the Journey bar to see this chart eight weeks in.</div>
    </div></section>
    <section class="panel"><div class="panel-h"><h3>Next agents, in order of leverage</h3></div>
      <div class="rows">${[["Draft Desk","The rundown tells them what's due; this writes it. Highest paired leverage."],
          ["Deal Room","Pre-meeting briefs. Vikram already built his own version — promote it."],
          ["Renewal Defender","Needs the TPA claims MIS connected first."]]
        .map(([t,d])=>`<div class="row s-none">
          <div class="row-main"><span class="row-title" style="font-size:13px">${t}</span>
            <span class="row-sub">${d}</span></div></div>`).join("")}</div>
      <div class="panel-f"><a class="btn sm pri" href="#/a/build">Open the builder</a></div></section>
  </aside></div></div>`;
}

function agentsAdminEmpty(){
  return `<div class="wrap wide">
  ${phead("Agents",`Nothing published yet. ${state.stage===1?"The first one comes from the builder — after the business context is written.":"Published agents appear here with version, rollout and access."}`,
    state.stage===1?`<a class="btn pri" href="#/a/context">Write the context first</a>`:`<a class="btn pri" href="#/a/build">${ICON.plus}New agent</a>`)}
  ${emptyPanel("Nothing published","Published agents appear here with version, rollout and access. Drafts land in the workshop below once you start building.")}
  </div>`;
}

function testJourney(){
  return `<div class="wrap wide">
  ${phead("Test lab","Nothing to test yet — the lab fills from the config you draft. Build the first agent, and the platform writes its situations itself.")}
  ${emptyPanel("No drafts in the workshop","When a draft exists, the lab generates situations from its config — its sources, its instructions, each hard stop. You didn't write any of them. Nothing publishes with a failed guardrail.")}
  <div class="callout" style="margin-top:16px"><b>What it looks like when there's something to test:</b> fourteen situations, six adversarial — what should happen, what did happen, what broke, and the fix it proposes. See it in ‘Full pilot’.</div>
  </div>`;
}

function publishJourney(){
  if(state.stage<2) return `<div class="wrap wide">
  ${phead("Publish & rollout","Nothing to publish yet. The first publish happens after the context is written, the agent is built and the lab is green.")}
  ${emptyPanel("No version waiting","When a draft passes its scenarios it lands here: what changed, who gets it, what the team will be told — and the blast radius before anything ships.")}
  </div>`;
  return `<div class="wrap wide">
  ${phead("Morning Rundown v1.0 — live","Published Monday 08:00 to 14 people. Three installed in week one. This screen is the record — and where v1.1 will ship from.",
    `<a class="btn pri" href="#/a/build">Start v1.1</a>`)}
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>The first release note</h3></div>
      <div class="panel-b"><div style="background:var(--surface-2);border:1px solid var(--line-2);border-radius:8px;
        padding:14px 16px;font-size:13px;line-height:1.72;white-space:pre-wrap">Your morning rundown is live. It reads the last 72 hours of your mail, Slack and HubSpot, and tells you the things that will cost you money if you skip them today. Install it once — it runs every weekday at 8:15, and nothing it produces sends without you.

— Karan</div></div>
      <div class="panel-f"><span class="tiny faint">Went to the feed and as a Slack DM to all of Sales.</span></div></section>
    <section class="panel"><div class="panel-h"><h3>Week one</h3></div><div class="panel-b stack g12">
      <div class="rowflex"><span class="tiny faint">Installed</span><span class="topbar-spacer"></span><b class="mono">3 / 14</b></div>
      <div class="rowflex"><span class="tiny faint">Runs</span><span class="topbar-spacer"></span><b class="mono">6</b></div>
      <div class="rowflex"><span class="tiny faint">Acted on</span><span class="topbar-spacer"></span><b class="mono">67%</b></div>
      <div class="rowflex"><span class="tiny faint">Rollbacks</span><span class="topbar-spacer"></span><b class="mono">0</b></div>
    </div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Version history</h3></div>
      <div class="panel-b"><div class="trace">
        <div class="tstep live"><b>v1.0</b> — live since Monday · 3 installs<br>
          <span class="tiny faint">Karan Mehta · 14/14 scenarios, 3 guardrails held</span></div>
      </div></div>
      <div class="panel-f"><span class="tiny faint">v4.2 in the ‘Full pilot’ stage shows what this history becomes.</span></div></section>
    <section class="panel"><div class="panel-h"><h3>Blast radius</h3></div><div class="panel-b stack g12">
      <div class="rowflex"><span class="tiny faint">People affected</span><span class="topbar-spacer"></span><b class="mono">3</b></div>
      <div class="rowflex"><span class="tiny faint">Runs per day</span><span class="topbar-spacer"></span><b class="mono">~3</b></div>
      <div class="rowflex"><span class="tiny faint">New permission asked for</span><span class="topbar-spacer"></span><b class="mono">None</b></div>
    </div></section>
  </aside></div></div>`;
}

function analyticsJourney(){
  if(!AGENTS.length) return `<div class="wrap wide">
  ${phead("Agent analytics","Nothing to measure yet. The first metric starts recording the moment the first agent publishes.")}
  ${emptyPanel("No agents, no numbers","Every agent declares one outcome metric at publish time — the number it exists to move. Analytics is that number, per agent, per person, against baseline and target.")}
  </div>`;
  const a=AGENTS[0];
  return `<div class="wrap wide">
  ${phead("Morning Rundown — week one","Three installers, six runs. The leaderboard appears once more than five people have run it — until then, acted-on is the only number that matters.")}
  <div class="tiles" style="margin-bottom:20px">
    <div class="tile"><span class="lbl">Installed</span><span class="val">3<small>/14</small></span><span class="foot">Rhea, Meera, Vikram</span></div>
    <div class="tile"><span class="lbl">Runs</span><span class="val">6</span><span class="foot">Weekdays 08:15</span></div>
    <div class="tile"><span class="lbl">Acted on</span><span class="val">67<small>%</small></span><span class="foot">8 of 12 items</span></div>
    <div class="tile"><span class="lbl">Dismissed</span><span class="val">0<small>%</small></span><span class="foot">Too early to mean anything</span></div>
  </div>
  <section class="panel"><div class="panel-h"><h3>${esc(a.metric.name)}</h3>
    <div class="r"><span class="chip hot">${ICON.alert}Week one — baseline recorded</span></div></div>
    <div class="panel-b">${metricChart(a.metric,{h:200})}
    <div class="callout tiny" style="margin-top:12px">Baseline 23% recorded at publish. Target ≤10%. One week in: 21%. The ‘Full pilot’ stage shows this chart at 9% — eight weeks of Mondays.</div></div></section>
  </div>`;
}

function requestsJourney(){
  return `<div class="wrap">
  ${phead("Requests from the team","None yet — nobody's installed anything. The first request is usually the most valuable message you'll get all month.")}
  ${emptyPanel("No requests","When people install, pressure arrives here: a locked setting someone needs changed, an uninstall with a reason, a ‘this flagged a deal I called’. Requests carry the reason and who else agrees — shipping one and naming who asked is the adoption engine.")}
  ${note("**The closed loop your model needs.** Users can't fork an agent, so the pressure has to go somewhere. Requests carry the reason, who else agrees, and — critically — which uninstalls they explain. Shipping a request and naming the person who asked is the cheapest adoption lever on the platform.")}
  </div>`;
}

function contextJourney(){
  return `<div class="wrap wide">
  ${phead("How Sales actually works","Not written yet. This is the first thing the platform asks Karan for — before any agent — because agents built without it are generic.",
    `<button class="btn pri" data-act="step" data-id="context">Start the interview</button>`)}
  ${note("**This is the onboarding a buyer sees first, and the thing that makes agents non-generic.** It's also the part that's hardest to get out of a customer — so the platform interviews the team lead rather than handing them an empty form. The first publish is refused until it exists.")}
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>The interview covers</h3></div>
      <div class="rows">${[["Shape of the team","Who does what — AEs, the placement desk, account managers. Where the bottleneck actually is."],
          ["Targets and incentives","Quota, comp split, what variable pays on, clawbacks. Agents need to know what a good deal is, not just a closed one."],
          ["What separates a top performer","The judgement to replicate. This section turns ‘install an agent’ into ‘install Karan's judgement’."],
          ["Calendar and seasonality","58% of the book renews 1 April. Thresholds should know that."],
          ["Glossary","CD balance, SOB, ICR, loading, endorsement — the words agents must use correctly."]]
        .map(([t,d],i)=>`<div class="row s-none"><span class="mono faint" style="font-size:11px">${i+1}</span>
          <div class="row-main"><span class="row-title">${t}</span><span class="row-sub">${d}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">40 minutes, guided. Produces the context pack every Sales agent is grounded on.</span></div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Why before the first agent</h3></div><div class="panel-b">
      <div class="callout bad"><b>Every team that skipped this produced a generic agent.</b> It got ignored, and they started again. The pilot's own data: teams that wrote context first reached habitual use 3× faster.</div>
      <div class="callout ok" style="margin-top:12px"><b>Written, it reads like this:</b> “The placement desk is the bottleneck, not the AEs. Nothing reaches a client without Meera's team floating the RFQ.” An agent that knows that is a different product.</div>
      <div class="tiny faint" style="margin-top:12px">Switch the Journey bar above to ‘Full pilot’ to see the finished context pack.</div>
    </div></section>
  </aside></div></div>`;
}

/* ═══════════════════════════ MEMBER ═══════════════════════════ */

function todayJourney(){
  const st=state.stage;
  if(st===0) return `<div class="wrap">
  ${phead("Today","Members haven't been invited yet — you're previewing what this page becomes.")}
  ${note("**v3 starts at day zero.** In v1/v2 this page opens full because the pilot is eight weeks old. Here it opens empty because the org is new — and the empty state is part of the design: it tells the member exactly what's coming and who's building it.")}
  ${emptyPanel("Nothing here yet","When the first agent is published and you install it, this page becomes your morning: everything that needs you, ranked, in one place. Until then there's genuinely nothing to show — and that's the honest state of a fresh install.")}
  </div>`;

  if(st===1) return `<div class="wrap">
  ${phead("Today","You're in. Nothing runs for you yet — your team lead is setting up the first agents.")}
  ${emptyPanel("No agents running for you","Karan is writing the team's business context and building the first agent. When he publishes, you'll get a Slack DM with a one-click install — and from the next morning, this page fills with what needs you.",
    `<a class="btn sm" href="#/m/store">See the store</a>`)}
  </div>`;

  return `<div class="wrap">
  ${phead("Monday morning","One agent ran for you today — the first one Karan published.",
    `<span class="chip">${ICON.clock}Last run 08:15</span>`)}
  <div class="tiles" style="margin-bottom:22px">
    <div class="tile"><span class="lbl">Needs you</span><span class="val">4</span><span class="foot">Ranked by rupees at risk</span></div>
    <div class="tile"><span class="lbl">Agents that ran</span><span class="val">1<small> of 1</small></span><span class="foot">All healthy</span></div>
    <div class="tile"><span class="lbl">Installed</span><span class="val">1</span><span class="foot">1 agent in the store</span></div>
    <div class="tile"><span class="lbl">Drafts waiting</span><span class="val">0</span><span class="foot">Nothing sends without you</span></div>
  </div>
  <div class="stack g16">${FEED.map(card).join("")}</div>
  <div class="callout info" style="margin-top:16px"><b>Week one.</b> Three teammates already installed. As the catalogue grows, this page fills with cards from every agent you install — use the Journey bar above to see where it ends up.</div>
  </div>`;
}

function storeJourney(){
  if(!AGENTS.length) return `<div class="wrap wide">
  ${phead("Agent store","Built by people on your team who already do the job well. Install and it runs from the next trigger.")}
  ${emptyPanel("No agents yet","Your team hasn't published anything. When Karan publishes the first agent it lands here — you install it in one click and it runs from the next trigger. No setup call, no prompt to write.")}
  </div>`;
  return `<div class="wrap wide">
  ${phead("Agent store","One agent on day one. Eight weeks in there are eight — use the Journey bar above to see that world.",
    `<span class="chip ok">${ICON.users}Sales · 14 people</span>`)}
  <div class="rowflex" style="margin-bottom:18px">
    <div class="seg"><button aria-pressed="true">All ${AGENTS.length}</button>
      <button aria-pressed="false">Not installed ${AGENTS.length-state.installed.size}</button></div>
    <span class="topbar-spacer"></span>
    <span class="tiny faint">Published Monday by ${esc(P(AGENTS[0].by).n)}</span></div>
  <div class="eyebrow" style="margin-bottom:11px">Sales · built by your team</div>
  <div class="cards">${AGENTS.filter(a=>!a.org).map(storeCard).join("")}</div>
  </div>`;
}

function installedJourney(){
  const mine=AGENTS.filter(a=>state.installed.has(a.id));
  if(!mine.length) return `<div class="wrap">
  ${phead("My agents","Your installed agents and their settings live here.")}
  ${emptyPanel("Nothing installed",state.stage===2
    ?"One agent is in the store — Morning Rundown, published Monday. Install it and it runs tomorrow at 8:15."
    :"Nothing to install yet — the store fills when your team lead publishes.",
    state.stage===2?`<button class="btn sm pri" data-act="install" data-id="${AGENTS[0].id}">${ICON.plus}Install Morning Rundown</button>`:"")}
  ${state.stage===2?`<div class="cards" style="margin-top:16px">${storeCard(AGENTS[0])}</div>`:""}
  </div>`;
  return `<div class="wrap">
  ${phead("My agents","1 running for you. Your own copy — your settings, your data.")}
  <section class="panel"><div class="rows">
    ${mine.map(a=>`<div class="row s-ok"><span class="stripe"></span>${glyph(a,"sm")}
      <div class="row-main"><span class="row-title">${esc(a.name)}</span>
        <span class="row-sub">${esc(a.plain.runs)} · last run 08:15</span></div>
      <div class="row-aside"><button class="btn sm" data-act="configure" data-id="${a.id}">Settings</button>
        <button class="switch" role="switch" aria-checked="true" aria-label="Pause ${esc(a.name)}" data-act="pause"></button></div></div>`).join("")}
  </div></section></div>`;
}

function impactJourney(){
  if(!AGENTS.length) return `<div class="wrap">
  ${phead("What changed for me","Your own numbers on the metrics your installed agents aim at. Nobody else on the team sees this page.")}
  ${emptyPanel("Nothing to measure","Install an agent and its metric starts recording for you — baseline first, then your numbers against the team's. This page is your mirror, not a leaderboard.")}
  </div>`;
  return `<div class="wrap">
  ${phead("What changed for me","One week of one agent. Your numbers need a month before they mean anything — here's what's already recorded.")}
  <div class="tiles" style="margin:0 0 20px">
    <div class="tile"><span class="lbl">Agents running</span><span class="val">1</span><span class="foot">Morning Rundown</span></div>
    <div class="tile"><span class="lbl">Items acted on</span><span class="val">67<small>%</small></span><span class="foot">8 of 12 this week</span></div>
    <div class="tile"><span class="lbl">Your baseline</span><span class="val">23<small>%</small></span><span class="foot">Recorded at your first run</span></div>
    <div class="tile"><span class="lbl">First comparison</span><span class="val" style="font-size:21px">1 Oct</span><span class="foot">A month of data, then this page fills</span></div>
  </div>
  <section class="panel"><div class="panel-h"><h3>Metric your agent is aiming at</h3></div>
    <div class="panel-b">${metricChart(AGENTS[0].metric,{h:190})}
    <div class="callout tiny" style="margin-top:12px">Team baseline 23% — deals with no touch in 7+ days. You're at 21% after one week. The comparison that matters starts once there are four weeks on both sides.</div></div></section>
  </div>`;
}

function threadJourney(){
  return `<div class="wrap">
  ${phead("Threads","Every card in your feed opens into its agent's own thread — where you argue with the output and it explains itself.")}
  ${emptyPanel("No threads yet","Threads appear when agents run for you. Nothing's installed, so nothing's run.")}
  </div>`;
}

/* ═══════════════════════════ wiring ═══════════════════════════ */

(function wrapScreens(){
  const O={}; Object.keys(SCREENS).forEach(k=>O[k]=SCREENS[k]);
  const st=()=>state.stage;
  const set=(k,fn)=>{ SCREENS[k]=fn; };

  set("s/overview",   ()=> st()<3?overviewJourney():O["s/overview"]());
  set("s/teams",      ()=> st()<3?teamsJourney():O["s/teams"]());
  set("s/people",     ()=> st()<3?peopleJourney():O["s/people"]());
  set("s/agents",     ()=> st()<3?agentsSuperJourney():O["s/agents"]());
  set("s/connections",()=> st()<3?connectionsJourney():O["s/connections"]());

  set("a/pulse",    ()=> st()===0?adminLocked(): st()<3?pulseJourney():O["a/pulse"]());
  set("a/agents",   ()=> st()===0?adminLocked(): st()<2?agentsAdminEmpty():O["a/agents"]());
  set("a/build",    ()=> st()===0?adminLocked():
      st()<3?`<div class="wrap" style="padding-bottom:0"><div class="callout info" style="margin-bottom:14px"><b>Prototype note.</b> This demo conversation builds a later agent. At this stage of the journey, Karan's first build is the Morning Rundown — same flow: describe it in chat, refine the config, declare the metric.</div></div>${O["a/build"]()}`
      :O["a/build"]());
  set("a/test",     ()=> st()===0?adminLocked(): st()<3?testJourney():O["a/test"]());
  set("a/publish",  ()=> st()===0?adminLocked(): st()<3?publishJourney():O["a/publish"]());
  set("a/analytics",()=> st()===0?adminLocked(): st()<3?analyticsJourney():O["a/analytics"]());
  set("a/requests", ()=> st()===0?adminLocked(): st()<3?requestsJourney():O["a/requests"]());
  set("a/context",  ()=> st()===0?adminLocked(): st()<2?contextJourney():O["a/context"]());

  set("m/today",     ()=> st()<3?todayJourney():O["m/today"]());
  set("m/store",     ()=> st()<3?storeJourney():O["m/store"]());
  set("m/installed", ()=> st()<3?installedJourney():O["m/installed"]());
  set("m/impact",    ()=> st()<3?impactJourney():O["m/impact"]());
  set("m/thread",    ()=> st()<2?threadJourney():O["m/thread"]());
})();

/* ── the journey bar ─────────────────────────────────────────────────────── */
function renderJourney(){
  const el=$("#journey"); if(!el) return;
  el.innerHTML=`<div class="jwrap">
    <span class="jlabel">Journey</span>
    <div class="jsteps">${JOURNEY.map((j,i)=>{
      const cur=state.stage===j.id, done=state.stage>j.id;
      return `${i?`<span class="jsep">→</span>`:""}
        <button class="jstep${cur?" cur":""}${done?" done":""}" data-stage="${j.id}" title="${esc(j.title)}">
          <span class="jdot">${done?ICON.check:j.id+1}</span>${esc(j.label)}</button>`}).join("")}</div>
    <span class="topbar-spacer"></span>
    <span class="jcap">${esc(JOURNEY[state.stage].cap)}</span>
  </div>`;
}

/* start at day zero — or at ?stage=N when the URL asks (deep-links for sharing) */
setStage(0,false);
(function(){
  const m=location.search.match(/stage=(\d)/);
  if(m) setStage(Math.min(3,Math.max(0,+m[1])),false);
})();
