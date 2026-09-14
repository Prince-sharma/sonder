
/* ═══════════════════════════ MEMBER ═══════════════════════════ */
const SCREENS={};

function phead(title,sub,actions=""){
  return `<div class="phead"><div class="phead-row"><div style="min-width:0">
    <h1>${title}</h1>${sub?`<p class="sub">${sub}</p>`:""}</div>
    ${actions?`<div class="phead-actions">${actions}</div>`:""}</div></div>`;
}

SCREENS["m/today"]=()=>{
  const pend=APPROVALS.filter(a=>!state.approved.has(a.id)).length;
  return `<div class="wrap">
  ${phead("Monday morning","Nothing here was written by you. Six agents ran between 07:00 and 10:00 and this is what they think needs you.",
    `<span class="chip">${ICON.clock}Last run 09:58</span>`)}
  ${note("**The home screen is a feed, not a chat list.** The decision you settled: a single ‘Today’ surface where every installed agent drops cards, each expandable into that agent's own thread. The habit lives here — which is also where the usage signal comes from.")}
  <div class="tiles" style="margin-bottom:22px">
    <div class="tile"><span class="lbl">Needs you</span><span class="val">5</span><span class="foot">Ranked by rupees at risk</span></div>
    <div class="tile"><span class="lbl">Drafts waiting</span><span class="val">${pend}</span><span class="foot">Nothing sent without you</span></div>
    <div class="tile"><span class="lbl">Agents that ran</span><span class="val">6<small> of 6</small></span><span class="foot">All healthy</span></div>
    <div class="tile"><span class="lbl">Quarter pacing</span><span class="val">74<small>%</small></span><span class="foot">₹62 L to go · 16 days</span></div>
  </div>
  <div class="stack g16">${FEED.map(card).join("")}</div>
  </div>`;
};

function card(f){
  const a=A(f.agent);
  return `<section class="panel" style="${f.quiet?"opacity:.82":""}">
    <div class="panel-h">
      ${glyph(a,"sm")}
      <div style="min-width:0"><h3>${esc(f.title)}</h3>
        <div class="tiny faint" style="margin-top:2px">${esc(a.name)}${f.time?" · "+f.time:""}</div></div>
      <div class="r">${f.time?`<span class="chip plain">${esc(f.meta)}</span>`:""}</div>
    </div>
    <div class="rows">
      ${f.items.map(it=>`<div class="row s-${it.s}"><span class="stripe"></span>
        <div class="row-main"><span class="row-title">${esc(it.t)}</span>
        <span class="row-sub">${esc(it.d)}</span></div></div>`).join("")}
    </div>
    <div class="panel-f">
      ${f.cta?`<a class="btn sm pri" href="${f.cta.to}">${esc(f.cta.label)} ${ICON.arrowr}</a>`:
              `<a class="btn sm" href="#/m/thread/${a.id}">${ICON.chat}Ask about this</a>`}
      <span class="topbar-spacer"></span>
      <button class="btn sm ghost" data-act="useful" data-v="1">Useful</button>
      <button class="btn sm ghost" data-act="useful" data-v="0">Not useful</button>
    </div>
  </section>`;
}

SCREENS["m/store"]=()=>{
  const mine=AGENTS.filter(a=>!a.org), org=AGENTS.filter(a=>a.org);
  return `<div class="wrap wide">
  ${phead("Agent store","Built by people on your team who already do the job well. Install and it runs from the next trigger — no setup call, no prompt to write.",
    `<span class="chip ok">${ICON.users}Sales · 14 people</span>`)}
  ${note("**Install, don't build.** An installer can change the input parameters an author exposed and nothing else. That's deliberate — the author already optimised this. The ‘Suggest a change' path on the detail page is how a user pushes back, and it lands in the admin's Requests inbox rather than forking the agent.")}
  ${note("**v2 — the store speaks in outcomes, not platform vocabulary.** Verified badges, version numbers and Suggest/Draft/Schedule/Event chips are gone from everything a member sees. A member needs three things: what it does, when it runs, and whether it can do anything without them. Admin screens keep the full vocabulary — it's their job to care.")}
  <div class="rowflex" style="margin-bottom:18px">
    <div class="seg"><button aria-pressed="true">All 8</button><button aria-pressed="false">Not installed 3</button>
      <button aria-pressed="false">Most used</button><button aria-pressed="false">New</button></div>
    <span class="topbar-spacer"></span>
    <span class="tiny faint">Your team installs an average of <b class="mono" style="color:var(--ink-2)">5.1</b> agents</span>
  </div>
  <div class="eyebrow" style="margin-bottom:11px">Sales · built by your team</div>
  <div class="cards" style="margin-bottom:30px">${mine.map(storeCard).join("")}</div>
  <div class="eyebrow" style="margin-bottom:11px">Everyone at Plum</div>
  <div class="cards">${org.map(storeCard).join("")}</div>
  </div>`;
};

function storeCard(a){
  const on=state.installed.has(a.id), b=P(a.by), teamN=a.org?78:14;
  return `<article class="card" data-go="#/m/agent/${a.id}">
    <div class="card-h">${glyph(a)}
      <div style="min-width:0;flex:1"><div class="t">${esc(a.name)}</div>
        <div class="by">${esc(b.n)} · ${esc(b.r)}</div></div>
      ${a.isNew?`<span class="chip info">${ICON.spark}New</span>`:""}</div>
    <p class="card-d">${esc(a.blurb)}</p>
    <div class="card-m">
      <div class="rowflex" style="gap:6px">${plainRun(a)}${plainTrust(a)}</div>
      <div class="rowflex tiny" style="gap:8px">
        <span class="faint nowrap">Moves</span>
        <b style="font-size:12px;font-weight:600">${esc(a.metric.name)}</b></div>
      <div class="rowflex" style="gap:8px">
        <span class="mono tiny faint">${fmtMetric(a.metric,a.metric.base)}</span>
        <span class="faint">${ICON.arrowr}</span>
        <span class="mono tiny" style="color:var(--good);font-weight:600">${fmtMetric(a.metric,a.metric.now)}</span>
        ${spark(a.metric.series,{w:70,h:20})}</div>
    </div>
    <div class="card-f">
      <span class="tiny faint">${a.installs} of ${teamN} installed</span>
      ${on?`<span class="chip ok">${ICON.check}Installed</span>`
          :`<button class="btn sm pri" data-act="install" data-id="${a.id}">${ICON.plus}Install</button>`}
    </div></article>`;
}

SCREENS["m/agent"]=(id)=>{
  const a=A(id); if(!a) return `<div class="wrap"><div class="empty">Agent not found.</div></div>`;
  const on=state.installed.has(a.id), b=P(a.by);
  return `<div class="wrap">
  <div class="phead tight"><div class="phead-row">
    <div style="display:flex;gap:14px;align-items:flex-start;min-width:0">${glyph(a,"lg")}
      <div style="min-width:0"><h1 style="font-size:27px">${esc(a.name)}</h1>
      <div class="rowflex" style="margin-top:8px;gap:7px"><span class="chip plain">${esc(a.team)}</span>${plainRun(a)}${plainTrust(a)}</div></div></div>
    <div class="phead-actions">
      ${on?`<button class="btn" data-act="uninstall" data-id="${a.id}">Uninstall</button>
            <a class="btn pri" href="#/m/thread/${a.id}">${ICON.chat}Open</a>`
         :`<button class="btn pri" data-act="install" data-id="${a.id}">${ICON.plus}Install</button>`}
    </div></div></div>
  <p class="sub muted" style="max-width:70ch;margin:14px 0 24px;font-size:14.5px;line-height:1.65">${esc(a.long)}</p>
  <div class="split">
    <div class="stack g16">
      <section class="panel"><div class="panel-h"><h3>What it aims to move</h3>
        <div class="r"><span class="chip ${hitTarget(a.metric)?"ok":"hot"}">${hitTarget(a.metric)?ICON.check:ICON.alert}${hitTarget(a.metric)?"On target":"Short"}</span></div></div>
        <div class="panel-b"><div class="rowflex" style="justify-content:space-between;margin-bottom:14px">
          <div><div class="eyebrow" style="margin-bottom:5px">Outcome metric</div>
            <b style="font-size:15px">${esc(a.metric.name)}</b></div>
          <div style="text-align:right"><div class="display" style="font-size:26px">${fmtMetric(a.metric,a.metric.now)}</div>
            ${metricDelta(a.metric)}</div></div>
        ${metricChart(a.metric,{h:190})}
        <div class="callout info" style="margin-top:14px"><b>Measured from:</b> ${esc(a.metric.src)}.
          Every agent declares one of these when it's built — it's how adoption gets argued about in numbers rather than vibes.</div></div></section>

      ${note("**The outcome metric is a first-class field on the agent, not a dashboard afterthought.** Research says no shipping platform does this — Glean has a ‘define success metrics' stage, Microsoft lets you upload org KPIs to the tenant. Nobody binds a metric to the agent and reads it back per user. This is the sharpest thing in your thesis; the builder should refuse to publish without one.")}

      <section class="panel"><div class="panel-h"><h3>What you can change</h3>
        <div class="r"><span class="tiny faint">${a.params.length} settings</span></div></div>
        <div class="rows">${a.params.map(p=>`<div class="row s-none">
          <div class="row-main"><span class="row-title">${esc(p.label)}</span>
            ${p.hint?`<span class="row-sub">${esc(p.hint)}</span>`:""}</div>
          <div class="row-aside"><span class="code">${esc(Array.isArray(p.val)?p.val.length+" selected":String(p.val))}</span></div></div>`).join("")}</div>
        <div class="panel-f"><button class="btn sm" data-act="configure" data-id="${a.id}">Change these</button>
          <span class="tiny faint">Only affects your copy</span></div></section>

      <section class="panel"><div class="panel-h"><h3>What you can't change</h3>
        <div class="r"><span class="chip">${ICON.lock}Locked by ${esc(b.n.split(" ")[0])}</span></div></div>
        <div class="rows">${a.locked.map(l=>`<div class="row s-none" style="padding-block:10px">
          <div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(l)}</span></div></div>`).join("")}</div>
        <div class="panel-f"><button class="btn sm" data-act="suggest" data-id="${a.id}">Suggest a change</button>
          <span class="tiny faint">Goes to ${esc(b.n)} with your reason</span></div></section>
    </div>

    <aside class="stack g16">
      <section class="panel"><div class="panel-b stack g16">
        <div class="kv"><dt>Built by</dt><dd class="rowflex" style="gap:8px">${av(a.by,"sm")}<span>${esc(b.n)}<br><span class="tiny faint">${esc(b.r)}</span></span></dd></div>
        <div class="kv"><dt>Runs when</dt><dd class="rowflex" style="gap:6px">${ICON[a.trigger.icon]}${esc(a.trigger.detail)}</dd></div>
        <div class="kv"><dt>Reads</dt><dd>${a.reads.map(r=>`<span class="chip" style="margin:0 4px 4px 0">${esc(r)}</span>`).join("")}</dd></div>
        <div class="kv"><dt>Writes</dt><dd>${a.writes.length?a.writes.map(r=>`<span class="chip hot" style="margin:0 4px 4px 0">${esc(r)}</span>`).join(""):`<span class="tiny faint">Nothing. Read-only.</span>`}</dd></div>
        <div class="kv"><dt>On its own</dt><dd>${plainTrust(a)}</dd></div>
      </div></section>
      <section class="panel"><div class="panel-h"><h3>On your team</h3></div><div class="panel-b stack g12">
        <div class="rowflex"><span class="tiny faint">Installed by</span><span class="topbar-spacer"></span>
          <b class="mono">${a.installs} of ${a.org?78:14}</b></div>
        <span class="meter"><i style="width:${(a.installs/(a.org?78:14)*100).toFixed(0)}%"></i></span>
        <div class="rowflex" style="gap:4px;margin-top:4px">${["karan","rhea","vikram","aditya","meera","sanya"].slice(0,Math.max(0,Math.min(6,a.installs))).map(p=>av(p,"sm")).join("")}
          ${a.installs>6?`<span class="tiny faint">and ${a.installs-6} more</span>`:""}</div>
        <hr class="hr">
        <div class="rowflex"><span class="tiny faint">Acted on</span><span class="topbar-spacer"></span><b class="mono">${a.actedPct}%</b></div>
        <div class="rowflex"><span class="tiny faint">Dismissed</span><span class="topbar-spacer"></span><b class="mono">${a.dismissPct}%</b></div>
        <div class="rowflex"><span class="tiny faint">Runs, last 30 days</span><span class="topbar-spacer"></span><b class="mono">${a.runs30}</b></div>
      </div></section>
      <section class="panel"><div class="panel-h"><h3>Ask before you install</h3></div>
        <div class="starters" style="padding:14px 16px">
          <button class="starter" data-act="ask">What exactly will it read?</button>
          <button class="starter" data-act="ask">Will it ever email a client?</button>
          <button class="starter" data-act="ask">How is the metric measured?</button>
          <button class="starter" data-act="ask">What does it cost me to try?</button>
        </div></section>
    </aside></div></div>`;
};

SCREENS["m/installed"]=()=>{
  const mine=AGENTS.filter(a=>state.installed.has(a.id));
  const rest=AGENTS.filter(a=>!state.installed.has(a.id));
  return `<div class="wrap">
  ${phead("My agents",`${mine.length} running for you. Each one is your own copy — your settings, your data, your triggers.`,
    `<a class="btn" href="#/m/store">${ICON.grid}Browse store</a>`)}
  <section class="panel"><div class="rows">
    ${mine.map(a=>`<div class="row s-ok"><span class="stripe"></span>${glyph(a,"sm")}
      <div class="row-main"><span class="row-title">${esc(a.name)}</span>
        <span class="row-sub">${esc(a.trigger.detail)} · last run ${["08:15","08:16","09:58","07:02","4 days ago","Friday 15:58"][mine.indexOf(a)]||"today"}</span></div>
      <div class="row-aside">
        <button class="btn sm" data-act="configure" data-id="${a.id}">Settings</button>
        <button class="switch" role="switch" aria-checked="true" aria-label="Pause ${esc(a.name)}" data-act="pause"></button></div></div>`).join("")}
  </div></section>
  <div class="eyebrow" style="margin:26px 0 10px">Available to you, not installed</div>
  <section class="panel"><div class="rows">
    ${rest.map(a=>`<div class="row s-none">${glyph(a,"sm")}
      <div class="row-main"><span class="row-title">${esc(a.name)}</span><span class="row-sub">${esc(a.blurb)}</span></div>
      <div class="row-aside"><span class="tiny faint">${a.installs} on your team</span>
        <button class="btn sm pri" data-act="install" data-id="${a.id}">Install</button></div></div>`).join("")}
  </div></section></div>`;
};

SCREENS["m/approvals"]=()=>{
  const open=APPROVALS.filter(a=>!state.approved.has(a.id));
  return `<div class="wrap">
  ${phead("Approvals",`Everything an agent wants to send, in one queue. ${open.length} waiting.`,
    open.length>1?`<button class="btn" data-act="approveall">Approve all ${open.length}</button>`:"")}
  ${note("**This queue exists because of the autonomy model you chose.** Suggest-level agents never appear here. Draft-level agents always do. Auto-act agents post here after the fact, as a record rather than a gate — see CD Watch in the audit log.")}
  ${open.length?open.map(approvalCard).join(""):`<div class="panel"><div class="empty">Queue's clear. ${APPROVALS.length} handled today.</div></div>`}
  </div>`;
};

function approvalCard(ap){
  const a=A(ap.agent);
  return `<section class="panel" style="margin-bottom:16px">
    <div class="panel-h">${glyph(a,"sm")}
      <div style="min-width:0"><h3>${esc(ap.subject)}</h3>
        <div class="tiny faint" style="margin-top:2px">${esc(ap.kind)} · ${esc(a.name)} · ${esc(ap.when)}</div></div></div>
    <div class="panel-b stack g12">
      <div class="rowflex tiny" style="gap:16px">
        <span><span class="faint">To</span> <b>${esc(ap.to)}</b></span>
        ${ap.cc?`<span><span class="faint">Cc</span> <b>${esc(ap.cc)}</b></span>`:""}</div>
      <div style="background:var(--surface-2);border:1px solid var(--line-2);border-radius:8px;padding:14px 16px;
        font-size:13px;line-height:1.72;white-space:pre-wrap;max-height:290px;overflow-y:auto">${esc(ap.body)}</div>
      <div class="rowflex" style="gap:7px">${ap.flags.map(f=>`<span class="chip ${f.s}">${f.s==="ok"?ICON.check:f.s==="hot"?ICON.alert:ICON.eye}${esc(f.t)}</span>`).join("")}</div>
    </div>
    <div class="panel-f">
      <button class="btn sm pri" data-act="approve" data-id="${ap.id}">${ICON.check}Approve &amp; send</button>
      <button class="btn sm" data-act="edit">Edit first</button>
      <button class="btn sm ghost" data-act="reject" data-id="${ap.id}">Bin it</button>
      <span class="topbar-spacer"></span>
      <button class="btn sm ghost" data-act="always">Always approve “${esc(ap.kind)}”</button>
    </div></section>`;
}

SCREENS["m/thread"]=(id)=>{
  const a=A(id)||A("rundown");
  const msgs = a.id==="rundown" ? THREAD_RUNDOWN : [
    {role:"agent", t:`**${a.name}** last ran ${a.id==="dealroom"?"at 09:58 — the Fabrik Labs brief is below.":"this morning."}\n\n${a.long}`},
    {role:"agent", t:a.id==="dealroom"
      ? `**Fabrik Labs · 11:30 today · Priya Sundaram, Head of People**\n\n**The company** 640 lives, up from 410 in March. Series B, ₹210 Cr, Mar 2026. Hiring engineering in Bengaluru and a field ops team in Pune — that second group is the interesting one, they won't be on the office roll.\n\n**What they have now** A Niva Bupa GMC through a regional broker, expiring 31 March. Inferred from a job post that names the TPA — **not confirmed, ask them**.\n\n**Where it stalled** You sent the proposal on 4 Sep. They opened it 4 Sep 19:10 and 9 Sep 08:22. No reply. Two opens and silence usually means an internal objection, not disinterest.\n\n**Expect** The parent-cover cost objection. 41% of their headcount is under 30 and won't use it — so lead with the family-definition split rather than the headline premium.\n\n**Open with** “You opened the proposal twice and didn't come back — what stalled?” Don't re-pitch.`
      : `Ask me anything about how I work, or tell me what I got wrong.`}
  ];
  return `<div class="wrap">
  <div class="phead tight"><div class="phead-row">
    <div style="display:flex;gap:12px;align-items:center">${glyph(a)}
      <div><h1 style="font-size:24px">${esc(a.name)}</h1>
        <div class="tiny faint" style="margin-top:3px">Your thread · only you can see this</div></div></div>
    <div class="phead-actions">
      <button class="btn sm" data-act="configure" data-id="${a.id}">Settings</button>
      <a class="btn sm" href="#/m/agent/${a.id}">About</a></div></div></div>
  ${note("**Every card in the feed opens into its agent's own thread.** The thread is where a user argues with the output — ‘why did you rank it that way' — and where the agent explains its own logic. Those exchanges are the richest adoption signal on the platform, and they feed the admin's Requests inbox.")}
  <section class="panel" style="margin-top:18px">
    <div class="chat">${msgs.map(m=>`<div class="msg ${m.role==="me"?"me":"them"}">
      ${m.role==="me"?av("rhea","sm"):glyph(a,"sm")}
      <div class="bub">${md(m.t)}</div></div>`).join("")}</div>
    <div class="starters">
      <button class="starter" data-act="ask">Why this order?</button>
      <button class="starter" data-act="ask">Skip the CD section tomorrow</button>
      <button class="starter" data-act="ask">Show me what you read</button>
      <button class="starter" data-act="ask">This was wrong</button>
    </div>
    <div class="composer">
      <textarea class="inp" id="composer-${a.id}" rows="1" placeholder="Ask ${esc(a.name)} something, or tell it what it got wrong…"></textarea>
      <button class="btn pri" data-act="send">Send</button></div>
  </section>
  <section class="panel" style="margin-top:16px"><div class="panel-h"><h3>What it did this morning</h3>
    <div class="r"><span class="chip plain mono">run #4471 · 11.4s</span></div></div>
    <div class="panel-b"><div class="trace">
      <div class="tstep done"><b>Triggered</b> — schedule, 08:15 IST</div>
      <div class="tstep done"><b>Read Gmail</b> — 214 threads since Friday 08:15</div>
      <div class="tstep done"><b>Read Slack</b> — 31 channels, 96 messages mentioning an account name</div>
      <div class="tstep done"><b>Read HubSpot</b> — 18 open deals, last-activity timestamps</div>
      <div class="tstep done"><b>Read CD ledger</b> — 6 accounts you own</div>
      <div class="tstep done"><b>Ranked</b> by expected premium at risk × days to deadline</div>
      <div class="tstep done"><b>Dropped 9 items</b> below your ₹10,00,000 floor</div>
      <div class="tstep live"><b>Delivered</b> 5 items to Bench and your Slack DM</div>
    </div></div></section></div>`;
};

SCREENS["m/impact"]=()=>{
  const mine=AGENTS.filter(a=>state.installed.has(a.id));
  return `<div class="wrap">
  ${phead("What changed for me","Your own numbers on the metrics your installed agents are aiming at. Nobody else on the team sees this page.")}
  ${note("**Impact is shown to the user before it's shown to a manager.** Deliberate: the research on enterprise AI rollouts says public individual rankings invite metric-gaming and surveillance backlash. The leaderboard in the admin view is team-level and opt-in; this page is the user's own mirror.")}
  <div class="tiles" style="margin:0 0 20px">
    <div class="tile"><span class="lbl">Agents running</span><span class="val">${mine.length}</span><span class="foot">Team average is 5.1</span></div>
    <div class="tile"><span class="lbl">Items acted on</span><span class="val">68<small>%</small></span><span class="foot">You act more than you dismiss</span></div>
    <div class="tile"><span class="lbl">Approvals cleared</span><span class="val">141</span><span class="foot">Last 30 days · 6 edited first</span></div>
    <div class="tile"><span class="lbl">Your segment</span><span class="val" style="font-size:21px">Power user</span><span class="foot">15+ actions/week, 9 of 12 weeks</span></div>
  </div>
  <section class="panel"><div class="panel-h"><h3>Metrics your agents are aiming at</h3>
    <div class="r"><span class="tiny faint">You vs the Sales team</span></div></div>
  <div class="tablewrap" style="border:0;border-radius:0">
  <table><thead><tr><th>Metric</th><th>Agent</th><th class="num">Feb</th><th class="num">Now</th>
    <th class="num">Team now</th><th>Progress to target</th></tr></thead><tbody>
    ${mine.map(a=>{const m=a.metric, teamNow=m.dir==="down"?m.now*1.18:m.now*0.94;
      const span=Math.abs(m.base-m.target)||1, prog=Math.min(100,Math.max(0,Math.abs(m.base-m.now)/span*100));
      return `<tr><td style="font-weight:600;max-width:260px">${esc(m.name)}</td>
      <td><span class="cellname">${glyph(a,"sm")}<span class="t tiny">${esc(a.name)}</span></span></td>
      <td class="num mono faint">${fmtMetric(m,m.base)}</td>
      <td class="num mono" style="font-weight:600;color:var(--good)">${fmtMetric(m,m.now)}</td>
      <td class="num mono faint">${fmtMetric(m,teamNow)}</td>
      <td><span class="rowflex" style="gap:8px"><span class="meter"><i class="${prog>=100?"":"hot"}" style="width:${prog.toFixed(0)}%"></i></span>
        <span class="mono tiny">${prog.toFixed(0)}%</span></span></td></tr>`}).join("")}
  </tbody></table></div>
  <div class="panel-f"><span class="tiny faint">Pulled from HubSpot, Gmail and the policy admin system nightly. Nothing here is self-reported.</span></div>
  </section></div>`;
};
