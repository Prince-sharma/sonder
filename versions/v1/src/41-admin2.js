
/* ── test lab ─────────────────────────────────────────────────────────── */
SCREENS["a/test"]=()=>{
  const ran=state.testRun;
  const pass=SCENARIOS.filter(s=>s.s==="pass").length, fail=SCENARIOS.filter(s=>s.s==="fail").length,
        rev=SCENARIOS.filter(s=>s.s==="review").length;
  return `<div class="wrap wide">
  <div class="phead tight"><div class="phead-row"><div>
    <div class="eyebrow" style="margin-bottom:6px">Test lab · Loss Ratio Explainer v0.3</div>
    <h1 style="font-size:27px">Fourteen situations this agent will meet</h1>
    <p class="sub">Generated from the config — its sources, its instructions and each hard stop. Six are adversarial. You didn't write any of them.</p></div>
    <div class="phead-actions">
      <button class="btn" data-act="addscenario">${ICON.plus}Add a situation</button>
      <button class="btn pri" data-act="runtests">${ran?"Run again":"Run all 14"}</button></div></div></div>
  ${note("**‘Eval’, ‘grader’, ‘dataset’ don't appear anywhere on this screen.** A sales lead gets: situations, what should happen, what did happen, and what broke. Salesforce's Testing Center is the only shipping product that auto-generates cases from the agent's own config — that's the pattern worth copying, minus the vocabulary.")}
  <div class="tiles" style="margin:18px 0 18px">
    <div class="tile"><span class="lbl">Behaved correctly</span><span class="val" style="color:var(--good)">${ran?pass:"—"}<small>/14</small></span><span class="foot">${ran?"Up from 9 on v0.2":"Not run yet"}</span></div>
    <div class="tile"><span class="lbl">Got it wrong</span><span class="val" style="color:${ran&&fail?"var(--crit)":"inherit"}">${ran?fail:"—"}</span><span class="foot">Both are fixable in one edit</span></div>
    <div class="tile"><span class="lbl">Needs your call</span><span class="val" style="color:${ran&&rev?"var(--warn)":"inherit"}">${ran?rev:"—"}</span><span class="foot">Not wrong, just a judgement</span></div>
    <div class="tile"><span class="lbl">Guardrails held</span><span class="val">${ran?"3<small>/3</small>":"—"}</span><span class="foot">Can't publish if any fails</span></div>
  </div>
  ${!ran?`<section class="panel"><div class="panel-b" style="padding:44px 20px;text-align:center">
    <div class="display" style="font-size:22px;margin-bottom:8px">Fourteen scenarios are ready</div>
    <p class="muted" style="max-width:52ch;margin:0 auto 18px;font-size:13.5px">Six core behaviours, three domain traps, three guardrail probes and two tone checks — written from the config you just drafted.</p>
    <button class="btn pri" data-act="runtests">Run all 14</button></div></section>`
  :`<div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Results</h3>
      <div class="r"><div class="seg"><button aria-pressed="true">All 14</button><button aria-pressed="false">Problems 3</button>
        <button aria-pressed="false">Guardrails 3</button></div></div></div>
      <div class="rows">${SCENARIOS.map(sc=>`<div class="row s-${sc.s==="pass"?"ok":sc.s==="fail"?"bad":"hot"}">
        <span class="stripe"></span>
        <span class="chip ${sc.s==="pass"?"ok":sc.s==="fail"?"bad":"hot"}" style="border-radius:50%;width:22px;height:22px;padding:0;justify-content:center;flex-shrink:0">
          ${sc.s==="pass"?ICON.check:sc.s==="fail"?ICON.x:ICON.alert}</span>
        <div class="row-main">
          <span class="row-title"><span class="mono faint tiny" style="margin-right:7px">${String(sc.n).padStart(2,"0")}</span>${esc(sc.t)}</span>
          <div class="stack g8" style="margin-top:6px">
            <span class="row-sub"><span class="eyebrow" style="margin-right:7px">Should</span>${esc(sc.exp)}</span>
            <span class="row-sub" style="color:${sc.s==="pass"?"var(--ink-2)":"var(--ink)"}"><span class="eyebrow" style="margin-right:7px">Did</span>${esc(sc.got)}</span>
            ${sc.why?`<div class="callout ${sc.s==="fail"?"bad":"hot"}" style="margin-top:4px"><b>Why:</b> ${esc(sc.why)}</div>`:""}
          </div></div>
        <div class="row-aside"><span class="chip ${sc.cat==="Guardrail"?"bad":""}">${esc(sc.cat)}</span>
          ${sc.s!=="pass"?`<button class="btn sm" data-act="fix">Fix</button>`:""}</div></div>`).join("")}</div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>${ICON.spark}Two fixes it proposes</h3></div>
      <div class="panel-b stack g12">
        <div class="callout bad"><b>Scenario 03 — missing claims year.</b><br>
          <span class="muted">Add to instructions:</span> “State the exact policy years your ICR covers. If a year is missing, say so before presenting any ratio.”
          <div class="rowflex" style="margin-top:10px;gap:7px"><button class="btn sm pri" data-act="applyfix">Apply</button>
            <button class="btn sm ghost" data-act="edit">Edit first</button></div></div>
        <div class="callout bad"><b>Scenario 07 — CD balance confusion.</b><br>
          <span class="muted">Attach the Sales glossary.</span> It defines CD balance, corporate buffer and sum insured. Three other agents already use it, and none of them have made this error.
          <div class="rowflex" style="margin-top:10px;gap:7px"><button class="btn sm pri" data-act="attach">Attach glossary</button>
            <a class="btn sm ghost" href="#/a/context">See the glossary</a></div></div>
      </div></section>
    <section class="panel"><div class="panel-h"><h3>Against the last version</h3></div>
      <div class="panel-b stack g12">
        <div class="rowflex"><span class="tiny faint">v0.2 → v0.3</span><span class="topbar-spacer"></span>
          <span class="chip ok">${ICON.check}+2 fixed</span><span class="chip">0 broken</span></div>
        <div class="rows" style="border:1px solid var(--line);border-radius:9px">
          <div class="row s-ok" style="padding-block:9px"><span class="stripe"></span><div class="row-main">
            <span class="row-sub" style="color:var(--ink)">05 · Employee-level claim detail</span>
            <span class="tiny faint">was failing — now refuses correctly</span></div></div>
          <div class="row s-ok" style="padding-block:9px"><span class="stripe"></span><div class="row-main">
            <span class="row-sub" style="color:var(--ink)">12 · Brokerage percentage</span>
            <span class="tiny faint">was failing — now routes to Karan</span></div></div>
        </div>
        <span class="tiny faint">A version that breaks something previously passing can't be published without an explicit override.</span>
      </div></section>
    <section class="panel"><div class="panel-b">
      <div class="rowflex" style="justify-content:space-between;margin-bottom:12px">
        <span class="tiny faint">Ready to publish?</span><span class="chip hot">${ICON.alert}2 failures</span></div>
      <a class="btn pri" href="#/a/publish" style="width:100%;justify-content:center">Go to publish anyway ${ICON.arrowr}</a>
      <div class="tiny faint" style="margin-top:9px">Failures on core and domain scenarios are a warning. A failure on a guardrail scenario is a hard block.</div>
    </div></section>
  </aside></div>`}</div>`;
};

/* ── publish & rollout ────────────────────────────────────────────────── */
SCREENS["a/publish"]=()=>`<div class="wrap wide">
  ${phead("Publish Morning Rundown v4.2","Twelve people are on v4.1 right now. Here's exactly what changes for them.",
    `<button class="btn">Save as draft</button><button class="btn pri" data-act="publish">Publish to 14 people</button>`)}
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>What changed</h3>
      <div class="r"><div class="seg"><button aria-pressed="true">Summary</button><button aria-pressed="false">Field diff</button></div></div></div>
      <div class="rows">
        ${[["ok","Added","A ‘Sections to include' setting — installers can now switch off the four sections they don't use","Answers Tanvi's uninstall and 3 other requests"],
           ["ok","Added","WhatsApp Business as a source, behind a per-user connection","Answers Farhan's ‘it flags deals I called'"],
           ["hot","Changed","Cold-deal threshold default 10 days → 7 days","12 installers are on the old default. They keep it unless they reset."],
           ["","Removed","Birthday and anniversary section","Acted on 0.4% of the time since March"]]
          .map(([s,k,t,d])=>`<div class="row s-${s||"none"}" style="padding-block:12px">${s?'<span class="stripe"></span>':""}
            <span class="chip ${s}" style="min-width:74px;justify-content:center">${esc(k)}</span>
            <div class="row-main"><span class="row-title" style="font-size:13px">${esc(t)}</span>
              <span class="row-sub tiny">${esc(d)}</span></div></div>`).join("")}</div></section>

    <section class="panel"><div class="panel-h"><h3>Who gets it</h3></div>
      <div class="panel-b stack g16">
        <div class="rows" style="border:1px solid var(--line);border-radius:9px">
          ${[["Everyone on Sales","14 people · 12 already installed","on"],
             ["Pre-install for people who haven't got it","Divya and Tanvi. They can uninstall.","off"],
             ["Ring it out — 3 people first, then everyone in 48h","Karan, Rhea, Meera","off"]]
            .map(([t,d,s],i)=>`<div class="row ${s==="on"?"s-ok":"s-none"}" style="padding-block:12px">
              ${s==="on"?'<span class="stripe"></span>':""}
              <input type="radio" name="roll" id="roll-${i}" ${s==="on"?"checked":""} style="margin-top:3px;accent-color:var(--brand-fill)">
              <div class="row-main"><label for="roll-${i}" class="row-title" style="cursor:pointer;font-size:13px">${esc(t)}</label>
                <span class="row-sub tiny">${esc(d)}</span></div></div>`).join("")}
        </div>
        <div class="field"><label>What the team will be told</label>
          <textarea class="inp" id="pub-note" rows="4">You can now turn off the sections you don't use — open Settings on Morning Rundown and untick anything that isn't your job. Tanvi asked for this, and four of you agreed.

WhatsApp is now a source if you connect it, so a deal you followed up on WhatsApp won't get flagged as cold.</textarea>
          <span class="hint">Goes out in the feed and as a Slack DM. Naming who asked for a change is the single cheapest adoption lever you have.</span></div>
      </div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Version history</h3></div>
      <div class="panel-b"><div class="trace">
        <div class="tstep live"><b>v4.2</b> — about to publish · 14/14 scenarios<br><span class="tiny faint">Karan Mehta, today</span></div>
        <div class="tstep done"><b>v4.1</b> — live since 13 Sep · 12 installs<br><span class="tiny faint">Added quota pacing section</span></div>
        <div class="tstep done"><b>v4.0</b> — rolled back after 4 hours<br><span class="tiny faint">Broke the CD balance lookup for 3 users</span></div>
        <div class="tstep done"><b>v3.7</b> — live 2 Aug – 13 Sep<br><span class="tiny faint">The version Tanvi uninstalled</span></div>
      </div></div>
      <div class="panel-f"><button class="btn sm">Roll back to v4.1</button></div></section>
    <section class="panel"><div class="panel-h"><h3>Blast radius</h3></div><div class="panel-b stack g12">
      <div class="rowflex"><span class="tiny faint">People affected</span><span class="topbar-spacer"></span><b class="mono">12</b></div>
      <div class="rowflex"><span class="tiny faint">Runs per day</span><span class="topbar-spacer"></span><b class="mono">~12</b></div>
      <div class="rowflex"><span class="tiny faint">Settings that will reset</span><span class="topbar-spacer"></span><b class="mono">0</b></div>
      <div class="rowflex"><span class="tiny faint">New permission asked for</span><span class="topbar-spacer"></span><b class="mono" style="color:var(--warn)">WhatsApp</b></div>
      <hr class="hr"><div class="callout hot tiny">WhatsApp is a new scope. Each person is asked individually before their first run — the agent doesn't inherit it from you.</div>
    </div></section>
  </aside></div></div>`;

/* ── per-agent analytics ──────────────────────────────────────────────── */
SCREENS["a/analytics"]=(id)=>{
  const a=A(id)||A("rundown");
  const board=[
   {p:"karan", runs:44, acted:78, trend:"+6"},{p:"rhea", runs:48, acted:71, trend:"+2"},
   {p:"meera", runs:41, acted:74, trend:"+9"},{p:"vikram", runs:36, acted:66, trend:"−3"},
   {p:"aditya", runs:39, acted:52, trend:"+1"},{p:"sanya", runs:31, acted:69, trend:"+4"},
   {p:"nikhil", runs:28, acted:58, trend:"0"},{p:"ishita", runs:24, acted:61, trend:"+2"},
   {p:"priya", runs:14, acted:44, trend:"−8"},{p:"rohan", runs:11, acted:39, trend:"−2"},
   {p:"arjun", runs:9, acted:41, trend:"+3"},{p:"farhan", runs:0, acted:0, trend:"—"}
  ];
  return `<div class="wrap wide">
  <div class="phead tight"><div class="phead-row">
    <div style="display:flex;gap:14px;align-items:flex-start">${glyph(a,"lg")}
      <div><div class="eyebrow" style="margin-bottom:5px">Agent analytics</div>
        <h1 style="font-size:27px">${esc(a.name)}</h1>
        <div class="rowflex" style="margin-top:8px;gap:7px">${verChip(a)}${autChip(a.autonomy)}<span class="chip">v${a.v}</span></div></div></div>
    <div class="phead-actions"><div class="seg"><button aria-pressed="false">7 days</button>
      <button aria-pressed="true">30 days</button><button aria-pressed="false">This quarter</button></div>
      <a class="btn" href="#/a/publish">Edit &amp; publish</a></div></div></div>
  <div class="tiles" style="margin:18px 0 20px">
    <div class="tile"><span class="lbl">Installed</span><span class="val">${a.installs}<small>/14</small></span>
      <span class="foot">${14-a.installs} haven't · 1 uninstalled</span></div>
    <div class="tile"><span class="lbl">Active last 7 days</span><span class="val">${a.active7}</span>
      <span class="foot">${a.installs-a.active7} installed but quiet</span></div>
    <div class="tile"><span class="lbl">Items acted on</span><span class="val">${a.actedPct}<small>%</small></span>
      <span class="foot">${a.dismissPct}% dismissed, ${100-a.actedPct-a.dismissPct}% ignored</span></div>
    <div class="tile"><span class="lbl">${esc(a.metric.name)}</span>
      <span class="val" style="color:${hitTarget(a.metric)?"var(--good)":"var(--warn)"}">${fmtMetric(a.metric,a.metric.now)}</span>
      <span class="foot">${metricDelta(a.metric)} from ${fmtMetric(a.metric,a.metric.base)}</span></div>
  </div>
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>The metric it claims to move</h3>
      <div class="r"><span class="chip plain tiny">${esc(a.metric.src)}</span></div></div>
      <div class="panel-b">${metricChart(a.metric,{h:210})}</div>
      <div class="panel-f"><span class="tiny faint">Installers vs non-installers, same team, same quarter — the only honest comparison while 2 people haven't installed.</span></div></section>

    ${note("**Usage and outcome, side by side, per person.** Microsoft is the only vendor with a per-user × per-agent table and it counts *responses received* — a volume proxy with no outcome attached. Joining ‘how much did you use it' to ‘did your number move' is the thing worth building.")}

    <section class="panel"><div class="panel-h"><h3>Who's getting value</h3>
      <div class="r"><span class="chip">${ICON.lock}Team-level, not published to the team</span></div></div>
      <div class="tablewrap" style="border:0;border-radius:0"><table>
      <thead><tr><th>Person</th><th class="num">Runs</th><th>Acted on</th><th class="num">Their metric</th><th>Segment</th></tr></thead>
      <tbody>${board.map((b,i)=>{const p=P(b.p);
        const seg=p.seg, sc={power:"ok",habitual:"",novice:"info",dormant:"bad"}[seg];
        const mv = b.runs===0 ? "—" : fmtMetric(a.metric, a.metric.now*(1+(0.5-b.acted/100)*0.6));
        return `<tr><td><span class="cellname">${av(b.p,"sm")}<span class="t">${esc(p.n)}</span>
          ${i===0?`<span class="chip ok">${ICON.spark}Top</span>`:""}</span>
          <div class="tiny faint" style="margin-left:31px">${esc(p.r)}</div></td>
        <td class="num mono">${b.runs||"—"}</td>
        <td><span class="rowflex" style="gap:8px"><span class="meter" style="max-width:64px"><i class="${b.acted>=60?"":b.acted>=40?"hot":"bad"}" style="width:${Math.max(2,b.acted)}%"></i></span>
          <span class="mono tiny">${b.acted?b.acted+"%":"—"}</span></span></td>
        <td class="num mono ${b.runs?"":"faint"}">${mv}</td>
        <td><span class="chip ${sc}">${esc(seg)}</span></td></tr>`}).join("")}</tbody></table></div>
      <div class="panel-f"><span class="tiny faint">Individual rankings are never shown to the team. The research on enterprise rollouts is consistent: public AI-usage leaderboards produce gaming and resentment, not adoption.</span></div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>What people do with it</h3></div><div class="panel-b">
      ${barlist([{l:"Acted on",v:a.actedPct},{l:"Dismissed",v:a.dismissPct},{l:"Never opened",v:100-a.actedPct-a.dismissPct}],
        {max:100,fmt:v=>v+"%",cls:""})}
      <hr class="hr" style="margin:16px 0">
      <div class="eyebrow" style="margin-bottom:10px">Which sections earn their place</div>
      ${barlist([{l:"Going cold",v:81},{l:"Needs a reply",v:74},{l:"Renewals at risk",v:68},
                 {l:"CD balance",v:39},{l:"Quota pacing",v:22},{l:"Birthdays",v:1}],{max:100,fmt:v=>v+"%"})}
      <div class="callout hot tiny" style="margin-top:14px">Birthdays is acted on 1% of the time and costs a section of everyone's attention every morning. Cut it.</div>
    </div></section>
    <section class="panel"><div class="panel-h"><h3>Drop-off</h3></div>
      <div class="rows">
        <div class="row s-bad"><span class="stripe"></span>${av("tanvi","sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Tanvi Desai uninstalled</span>
            <span class="row-sub tiny">22 Aug · “Too long. I only read the going-cold section.”</span></div></div>
        <div class="row s-hot"><span class="stripe"></span>${av("farhan","sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Farhan Qureshi — installed, 0 opens in 14 days</span>
            <span class="row-sub tiny">Filed: it flags deals he followed up by phone and WhatsApp</span></div></div>
        <div class="row s-none"><span class="stripe"></span>${av("divya","sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Divya Krishnan — never installed</span>
            <span class="row-sub tiny">Opened the store twice, didn't install anything</span></div></div>
      </div>
      <div class="panel-f"><a class="btn sm" href="#/a/requests">Both complaints are fixed in v4.2 ${ICON.arrowr}</a></div></section>
  </aside></div></div>`;
};

/* ── requests ─────────────────────────────────────────────────────────── */
SCREENS["a/requests"]=()=>{
  const open=REQUESTS.filter(r=>r.state==="open"), done=REQUESTS.filter(r=>r.state!=="open");
  return `<div class="wrap">
  ${phead("Requests from the team","When someone can't change a locked setting, this is where they push back. Every uninstall asks for a reason and lands here too.")}
  ${note("**The closed loop your model needs.** Users can't fork an agent, so the pressure has to go somewhere. Requests carry the reason, who else agrees, and — critically — which uninstalls they explain. Shipping a request and naming the person who asked is the cheapest adoption lever on the platform.")}
  <div class="stack g16">${open.map(r=>{const a=A(r.agent);
    return `<section class="panel"><div class="panel-h">
      <span class="chip ${r.kind==="Uninstalled"?"bad":r.kind==="Not working"?"hot":"info"}">${esc(r.kind)}</span>
      <div style="min-width:0"><h3>${esc(r.t)}</h3>
        <div class="tiny faint" style="margin-top:2px">${esc(P(r.from).n)} · ${esc(a.name)} · ${esc(r.when)}</div></div>
      <div class="r">${glyph(a,"sm")}</div></div>
      <div class="panel-b stack g12">
        <p class="muted" style="font-size:13.5px;line-height:1.65">${esc(r.d)}</p>
        <div class="rowflex" style="gap:8px"><span class="tiny faint">${r.votes} people agree</span>
          ${r.voters.map(v=>av(v,"sm")).join("")}</div>
      </div>
      <div class="panel-f">
        <button class="btn sm pri" data-act="triage">Turn into a change</button>
        <button class="btn sm" data-act="reply">Reply to ${esc(P(r.from).n.split(" ")[0])}</button>
        <button class="btn sm ghost" data-act="decline">Won't do</button>
        <span class="topbar-spacer"></span>
        <span class="tiny faint">${r.agent==="rundown"?"Already in v4.2":""}</span>
      </div></section>`}).join("")}</div>
  <div class="eyebrow" style="margin:26px 0 10px">Shipped</div>
  <section class="panel"><div class="rows">${done.map(r=>`<div class="row s-ok"><span class="stripe"></span>
    <div class="row-main"><span class="row-title">${esc(r.t)}</span>
      <span class="row-sub">${esc(P(r.from).n)} · ${esc(r.d)}</span></div>
    <div class="row-aside"><span class="chip ok">${ICON.check}Shipped</span></div></div>`).join("")}</div></section></div>`;
};

/* ── business context ─────────────────────────────────────────────────── */
SCREENS["a/context"]=()=>`<div class="wrap wide">
  ${phead("How Sales actually works","Written once, attached to every agent on this team. It's the difference between an agent that knows insurance and an agent that knows <em>your</em> insurance business.",
    `<span class="chip ok">${ICON.check}92% complete</span><button class="btn">Edit</button>`)}
  ${note("**This is the onboarding a buyer sees first, and the thing that makes agents non-generic.** It's also the part that's hardest to get out of a customer — so the platform should interview a team lead for it rather than hand them an empty form. Eight of the eleven Plum agents reference something on this page.")}
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Shape of the team</h3><div class="r"><span class="chip plain mono">context.org</span></div></div>
      <div class="panel-b stack g12">
        <p style="font-size:13.5px;line-height:1.7">Fourteen people. Seven AEs split SMB / mid-market / enterprise by lives — under 300, 300–1,500, above 1,500. One placement desk that owns every insurer relationship and floats all RFQs. Two account managers on endorsements, CD balances and claims escalation. One SDR, one sales ops.</p>
        <div class="callout"><b>The placement desk is the bottleneck, not the AEs.</b> Nothing reaches a client without Meera's team floating the RFQ and normalising what comes back. Any agent that speeds up an AE without speeding up placement just moves the queue.</div>
      </div></section>
    <section class="panel"><div class="panel-h"><h3>Targets and incentives</h3><div class="r"><span class="chip plain mono">context.incentives</span></div></div>
      <div class="rows">
      ${[["Quota","₹2.4 Cr placed premium per AE per quarter · ₹18 Cr team FY27"],
         ["Comp split","75:25 fixed to variable for AEs. 85:15 for account managers."],
         ["What variable pays on","Brokerage earned, not premium placed. A ₹1 Cr policy at 5% and at 12.5% are different deals."],
         ["Weighting","New business counts 2.5× renewal in an AE's plan. AMs are paid on renewal retention."],
         ["Accelerator","1.4× above 100% of quota, quarterly."],
         ["Clawback","If the policy lapses inside 90 days or the CD is never funded within 45 days."]]
        .map(([k,v])=>`<div class="row s-none" style="padding-block:12px">
          <div class="row-main" style="flex-direction:row;gap:16px;align-items:baseline;flex-wrap:wrap">
            <span class="eyebrow" style="min-width:96px">${esc(k)}</span>
            <span class="row-sub" style="color:var(--ink);flex:1;min-width:200px">${esc(v)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Morning Rundown reads this to compute quota pacing. Renewal Defender reads it to know that an AM, not an AE, owns the retention number.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>What separates a top performer here</h3>
      <div class="r"><span class="chip plain mono">context.excellence</span></div></div>
      <div class="rows">
      ${[["They sell the renewal defence, not the first policy","A lowball year-one quote wins the logo and loses the account at renewal when the loading lands. The good ones price for year two."],
         ["They have underwriter relationships, not insurer contacts","A top AE gets a marginal loss-ratio account looked at <em>at all</em>, and gets terms desk-approved in 48 hours instead of a week."],
         ["They read the claims MIS before the client does","Arriving at renewal with a utilisation story and a design fix beats arriving with three quotes."],
         ["Their servicing never slips","CD never hits zero, endorsements clear inside SLA, a stuck cashless authorisation escalates in hours. HR remembers exactly one thing at renewal: what happened the day someone's claim got stuck."]]
        .map(([t,d],i)=>`<div class="row s-ok"><span class="stripe"></span>
          <span class="mono faint" style="font-size:11px;padding-top:2px">${i+1}</span>
          <div class="row-main"><span class="row-title">${esc(t)}</span>
            <span class="row-sub">${d}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">This is the section that turns "install an agent" into "install Karan's judgement". It took a 40-minute interview to write.</span></div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Renewal calendar</h3></div><div class="panel-b">
      ${barlist([{l:"1 April",v:58},{l:"1 January",v:19},{l:"1 July",v:11},{l:"Everything else",v:12}],{max:100,fmt:v=>v+"%"})}
      <div class="callout hot tiny" style="margin-top:14px">58% of the book renews on 1 April, which means January and February are the only months that matter and every agent's thresholds should know it.</div>
    </div></section>
    <section class="panel"><div class="panel-h"><h3>Glossary</h3>
      <div class="r"><span class="chip">28 terms</span></div></div>
      <div class="rows">
      ${[["CD balance","The cash float the corporate parks with the insurer that endorsements draw down. Not the sum insured. Not the corporate buffer."],
         ["SOB","Schedule of Benefits — the document that defines what's actually covered."],
         ["ICR","Incurred claims ratio. Claims paid ÷ premium earned, over a stated period."],
         ["Loading","The premium uplift an insurer applies for adverse claims experience."],
         ["Endorsement","Any mid-term change to the member list. Pro-rata premium, drawn from the CD."],
         ["Corporate buffer","A pooled top-up kitty for claims that exceed an individual's sum insured."],
         ["TPA","Third-party administrator. Runs cashless authorisation and claims settlement."],
         ["1+5","Family definition covering employee, spouse, two children and two parents."]]
        .map(([t,d])=>`<div class="row s-none" style="padding-block:11px">
          <div class="row-main"><span class="row-title mono" style="font-size:12px">${esc(t)}</span>
            <span class="row-sub tiny">${esc(d)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><button class="btn sm">See all 28</button>
        <span class="tiny faint">Attached to 8 of 11 agents</span></div></section>
    <section class="panel"><div class="panel-h"><h3>Still missing</h3></div>
      <div class="rows">
        <div class="row s-hot"><span class="stripe"></span><div class="row-main">
          <span class="row-title" style="font-size:13px">Insurer appetite by headcount band</span>
          <span class="row-sub tiny">RFQ Architect is guessing. Meera has this in a spreadsheet.</span></div></div>
        <div class="row s-hot"><span class="stripe"></span><div class="row-main">
          <span class="row-title" style="font-size:13px">Which accounts are politically sensitive</span>
          <span class="row-sub tiny">Two agents have surfaced things to the wrong person.</span></div></div>
      </div></section>
  </aside></div></div>`;
