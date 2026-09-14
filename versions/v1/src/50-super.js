
/* ═══════════════════════════ SUPER ADMIN ═══════════════════════════ */

SCREENS["s/overview"]=()=>{
  const live=TEAMS.filter(t=>t.state==="live");
  const ppl=TEAMS.reduce((s,t)=>s+t.people,0), act=TEAMS.reduce((s,t)=>s+t.activated,0),
        hab=TEAMS.reduce((s,t)=>s+t.habitual,0), pow=TEAMS.reduce((s,t)=>s+t.power,0);
  return `<div class="wrap wide">
  ${phead("Plum — organisation","Five business teams, 78 licences, 22 published agents. This page answers one question: is AI actually changing how work gets done here, and where isn't it.",
    `<div class="seg"><button aria-pressed="false">This month</button><button aria-pressed="true">Since March</button></div>`)}
  <div class="tiles" style="margin-bottom:20px">
    <div class="tile"><span class="lbl">Licences</span><span class="val">${ppl}</span><span class="foot">Across 5 teams</span></div>
    <div class="tile"><span class="lbl">Activated</span><span class="val">${act}<small> · ${pct(act/ppl*100)}</small></span>
      <span class="foot">Used something in 28 days</span></div>
    <div class="tile"><span class="lbl">Habitual</span><span class="val">${hab}<small> · ${pct(hab/ppl*100)}</small></span>
      <span class="foot">Active 9 of the last 12 weeks</span></div>
    <div class="tile"><span class="lbl">Cost per active user</span><span class="val">$18<small>/mo</small></span>
      <span class="foot">Was $54 on individual seats</span></div>
  </div>
  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Teams</h3>
      <div class="r"><a class="btn sm" href="#/s/teams">Manage</a></div></div>
      <div class="tablewrap" style="border:0;border-radius:0"><table>
      <thead><tr><th>Team</th><th>Lead</th><th class="num">People</th><th class="num">Agents</th>
        <th>Activated</th><th>What moved</th><th>Adoption</th></tr></thead><tbody>
      ${TEAMS.map(t=>`<tr data-go="#/s/people" style="cursor:pointer">
        <td style="font-weight:600">${esc(t.name)}
          ${t.state==="setup"?`<span class="chip info" style="margin-left:6px">In setup</span>`:""}</td>
        <td><span class="cellname">${av(t.lead,"sm")}<span class="tiny">${esc(P(t.lead).n)}</span></span></td>
        <td class="num mono">${t.people}</td><td class="num mono">${t.live||"—"}</td>
        <td><span class="rowflex" style="gap:8px"><span class="meter" style="max-width:58px">
          <i class="${t.activated/t.people>=.7?"":"hot"}" style="width:${(t.activated/t.people*100).toFixed(0)}%"></i></span>
          <span class="mono tiny">${t.activated}/${t.people}</span></span></td>
        <td class="tiny ${t.state==="setup"?"faint":""}">${esc(t.headline)}</td>
        <td>${t.live?spark(t.trend,{w:72,h:20}):`<span class="tiny faint">—</span>`}</td></tr>`).join("")}
      </tbody></table></div></section>

    <section class="panel"><div class="panel-h"><h3>What you're paying for, and what you're getting</h3>
      <div class="r"><span class="chip plain tiny">List prices, Sept 2026</span></div></div>
      <div class="panel-b stack g16">
        <div class="g g2" style="gap:16px">
          <div style="border:1px solid var(--line);border-radius:9px;padding:15px">
            <div class="eyebrow" style="margin-bottom:9px">Before · individual AI seats</div>
            <div class="display" style="font-size:29px;margin-bottom:3px">$54<span style="font-size:14px;font-weight:600;letter-spacing:0"> /active user/mo</span></div>
            <div class="tiny faint" style="margin-bottom:13px">78 seats × $20 ÷ 29 people who actually used one</div>
            ${barlist([{l:"Paid for",v:78,cls:"n"},{l:"Ever used it",v:52,cls:"n"},{l:"Used it weekly",v:29,cls:"hot"}],{max:78,fmt:v=>v+" people"})}
          </div>
          <div style="border:1px solid var(--good-line);background:var(--good-soft);border-radius:9px;padding:15px">
            <div class="eyebrow" style="margin-bottom:9px;color:var(--good)">Now · platform licences</div>
            <div class="display" style="font-size:29px;margin-bottom:3px;color:var(--good)">$18<span style="font-size:14px;font-weight:600;letter-spacing:0"> /active user/mo</span></div>
            <div class="tiny" style="color:var(--good);opacity:.85;margin-bottom:13px">78 licences × $14 ÷ 61 people who actually used one</div>
            ${barlist([{l:"Paid for",v:78},{l:"Ever used it",v:68},{l:"Used it weekly",v:61}],{max:78,fmt:v=>v+" people"})}
          </div>
        </div>
        <div class="callout"><b>The argument isn't the seat price — those are within a few dollars of each other.</b> It's the denominator. An individual subscription is idle unless the person already knows what to ask for; an installed agent runs whether or not they do. That gap is the whole business case, and it's the number a CFO will actually check.</div>
      </div></section>

    ${note("**Make the buyer's argument for them.** The published research is that activation, not licence cost, is where enterprise AI money leaks — Microsoft counts a seat ‘active' at one use per 28 days, and Gartner found 5% of pilots reached scale. A super-admin view that shows paid-for vs habitually-used is the slide that closes this deal.")}
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>The whole organisation</h3></div><div class="panel-b">
      ${segbar([{l:"Power",v:pow},{l:"Habitual",v:hab-pow},{l:"Novice",v:act-hab},{l:"Never started",v:ppl-act}],ppl)}
      <div class="callout info tiny" style="margin-top:16px">Segments follow the definitions the industry has settled on: <b>power</b> is 15+ actions a week in 9 of 12 weeks; <b>habitual</b> is any weekly use in 9 of 12; <b>novice</b> is used-but-inconsistent.</div>
    </div></section>
    <section class="panel"><div class="panel-h"><h3>Agents that aren't earning their place</h3></div>
      <div class="rows">
        <div class="row s-hot"><span class="stripe"></span>${glyph(A("decker"),"sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Decker</span>
            <span class="row-sub tiny">6 installs, 28 runs, metric moved 0.7 days in six weeks</span></div></div>
        <div class="row s-hot"><span class="stripe"></span>${glyph(A("comparer"),"sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Quote Comparer</span>
            <span class="row-sub tiny">Metric is excellent. Only 5 of 8 installers used it last week.</span></div></div>
        <div class="row s-bad"><span class="stripe"></span><span class="glyph sm">TE</span>
          <div class="row-main"><span class="row-title" style="font-size:13px">Travel &amp; Expense <span class="faint">(org-wide)</span></span>
            <span class="row-sub tiny">41 installs, 3 runs in 30 days. Installed at rollout, never used.</span></div></div>
      </div>
      <div class="panel-f"><span class="tiny faint">High installs and a flat metric is the signal to retire an agent, not promote it.</span></div></section>
    <section class="panel"><div class="panel-h"><h3>Where the practice came from</h3></div><div class="panel-b">
      ${barlist([{l:"Karan Mehta",v:4},{l:"Meera Iyer",v:3},{l:"Sanya Kapoor",v:3},{l:"Ishita Sharma",v:3},
                 {l:"Vikram Rathore",v:2},{l:"6 others",v:7,cls:"n"}],{fmt:v=>v+" agents"})}
      <div class="callout tiny" style="margin-top:14px">Eleven people authored all 22 agents. Four of them authored half. That concentration is the product working — and the risk if any of them leaves.</div>
    </div></section>
  </aside></div></div>`;
};

SCREENS["s/agents"]=()=>`<div class="wrap wide">
  ${phead("Every agent at Plum","Twenty-two published across five teams. Sorted by the gap between how much it's used and whether its number moved.")}
  <div class="rowflex" style="margin-bottom:16px">
    <div class="seg"><button aria-pressed="true">All</button><button aria-pressed="false">Sales</button>
      <button aria-pressed="false">Account Mgmt</button><button aria-pressed="false">Claims</button><button aria-pressed="false">Org-wide</button></div>
    <span class="topbar-spacer"></span><span class="tiny faint">Showing 11 of 22 in this prototype</span></div>
  <div class="tablewrap"><table>
  <thead><tr><th>Agent</th><th>Team</th><th>Author</th><th>Autonomy</th><th class="num">Installs</th>
    <th class="num">Weekly active</th><th>Outcome metric</th><th class="num">Baseline</th><th class="num">Now</th><th>Verdict</th></tr></thead><tbody>
  ${AGENTS.map(a=>{const base=a.org?78:14, good=hitTarget(a.metric), used=a.active7/a.installs;
    const verdict = good&&used>=.7 ? ["ok","Working"] : good&&used<.7 ? ["info","Works, under-used"] :
                    !good&&used>=.7 ? ["hot","Used, not moving"] : ["bad","Neither"];
    return `<tr><td><span class="cellname">${glyph(a,"sm")}<span class="t">${esc(a.name)}</span>${verChip(a)}</span></td>
    <td class="tiny muted">${esc(a.team)}</td>
    <td><span class="cellname">${av(a.by,"sm")}<span class="tiny">${esc(P(a.by).n.split(" ")[0])}</span></span></td>
    <td>${autChip(a.autonomy)}</td>
    <td class="num mono">${a.installs}/${base}</td>
    <td class="num"><span class="rowflex" style="justify-content:flex-end;gap:8px">
      <span class="meter" style="max-width:44px"><i class="${used>=.7?"":"hot"}" style="width:${(used*100).toFixed(0)}%"></i></span>
      <span class="mono tiny">${pct(used*100)}</span></span></td>
    <td class="tiny muted" style="max-width:220px">${esc(a.metric.name)}</td>
    <td class="num mono faint">${fmtMetric(a.metric,a.metric.base)}</td>
    <td class="num mono" style="font-weight:600;color:${good?"var(--good)":"var(--warn)"}">${fmtMetric(a.metric,a.metric.now)}</td>
    <td><span class="chip ${verdict[0]}">${verdict[0]==="ok"?ICON.check:verdict[0]==="bad"?ICON.x:ICON.alert}${verdict[1]}</span></td></tr>`}).join("")}
  </tbody></table></div>
  ${note("**Four verdicts, not one score.** ‘Used but not moving' and ‘works but under-used' need completely different interventions — the first is a design problem for the author, the second is a change-management problem for the team lead. Collapsing them into one adoption percentage is what makes most dashboards useless.")}
  </div>`;

SCREENS["s/people"]=()=>{
  const rows=Object.entries(PEOPLE).map(([k,p])=>{
    const inst={power:[6,7,8][k.length%3], habitual:[4,5][k.length%2], novice:[2,3][k.length%2], dormant:[0,3][k.length%2]}[p.seg];
    const runs={power:[188,214,166][k.length%3], habitual:[74,96][k.length%2], novice:[21,34][k.length%2], dormant:[0,2][k.length%2]}[p.seg];
    return {k,p,inst,runs};
  });
  const order={power:0,habitual:1,novice:2,dormant:3};
  rows.sort((a,b)=>order[a.p.seg]-order[b.p.seg]||b.runs-a.runs);
  return `<div class="wrap wide">
  ${phead("People","Who's using what, and whether their numbers moved. This is the change-management worklist — the four dormant names are the entire job.")}
  <div class="tiles" style="margin-bottom:18px">
    <div class="tile"><span class="lbl">Power</span><span class="val" style="color:var(--ramp-1)">4</span><span class="foot">Authored 12 of 22 agents</span></div>
    <div class="tile"><span class="lbl">Habitual</span><span class="val" style="color:var(--ramp-2)">5</span><span class="foot">Steady, not yet building</span></div>
    <div class="tile"><span class="lbl">Novice</span><span class="val" style="color:var(--ramp-3)">3</span><span class="foot">Installed, inconsistent</span></div>
    <div class="tile"><span class="lbl">Dormant</span><span class="val" style="color:var(--warn)">3</span><span class="foot">Two share the same blocker</span></div>
  </div>
  <div class="tablewrap"><table>
  <thead><tr><th>Person</th><th>Role</th><th>Segment</th><th class="num">Installed</th><th class="num">Runs 90d</th>
    <th>Agents they use</th><th>Authored</th><th></th></tr></thead><tbody>
  ${rows.map(({k,p,inst,runs})=>{
    const sc={power:"ok",habitual:"",novice:"info",dormant:"bad"}[p.seg];
    const authored=AGENTS.filter(a=>a.by===k).length;
    const uses=AGENTS.filter((a,i)=>i<inst).slice(0,4);
    return `<tr><td><span class="cellname">${av(k,"sm")}<span class="t">${esc(p.n)}</span></span></td>
      <td class="tiny muted">${esc(p.r)}</td>
      <td><span class="chip ${sc}">${p.seg==="power"?ICON.spark:p.seg==="dormant"?ICON.alert:""}${esc(p.seg)}</span></td>
      <td class="num mono">${inst}</td><td class="num mono ${runs?"":"faint"}">${runs||"—"}</td>
      <td>${inst?`<span class="rowflex" style="gap:4px">${uses.map(a=>glyph(a,"sm")).join("")}${inst>4?`<span class="tiny faint">+${inst-4}</span>`:""}</span>`:`<span class="tiny faint">Nothing installed</span>`}</td>
      <td>${authored?`<span class="chip ok">${ICON.spark}${authored}</span>`:`<span class="tiny faint">—</span>`}</td>
      <td><button class="btn sm ghost" data-act="nudge">${p.seg==="dormant"?"Find out why":"View"}</button></td></tr>`}).join("")}
  </tbody></table></div>
  <div class="g g2" style="margin-top:20px">
    <section class="panel"><div class="panel-h"><h3>The dormant three</h3>
      <div class="r"><span class="chip bad">${ICON.alert}Worth a conversation, not a nudge email</span></div></div>
      <div class="rows">
        <div class="row s-bad"><span class="stripe"></span>${av("farhan","sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Farhan Qureshi</span>
            <span class="row-sub">Installed three, opened none in 14 days. His follow-ups happen on WhatsApp and calls, which nothing could see until v4.2.</span></div></div>
        <div class="row s-bad"><span class="stripe"></span>${av("divya","sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Divya Krishnan</span>
            <span class="row-sub">Opened the store twice, installed nothing. No complaint filed — which usually means she doesn't believe it'll help, not that it can't.</span></div></div>
        <div class="row s-hot"><span class="stripe"></span>${av("tanvi","sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">Tanvi Desai</span>
            <span class="row-sub">Uninstalled with a precise reason and then built an agent of her own. Arguably the most engaged person on this list.</span></div></div>
      </div></section>
    <section class="panel"><div class="panel-h"><h3>How adoption actually moved</h3></div><div class="panel-b">
      ${metricChart({name:"Habitual users",unit:"%",base:12,now:53,target:60,dir:"up",src:"",
        series:[12,18,24,31,38,44,49,53],months:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]},{h:180})}
      <div class="callout tiny" style="margin-top:12px">Every step up follows a publish that named the person who asked for it. The two flat months are the two months nobody shipped a request.</div>
    </div></section></div></div>`;
};

SCREENS["s/teams"]=()=>`<div class="wrap">
  ${phead("Teams and rollout","A team goes live when its business context is written, its sources are connected and one person has published one agent. Marketing is at step one.",
    `<button class="btn pri">${ICON.plus}Add a team</button>`)}
  <section class="panel" style="margin-bottom:18px"><div class="panel-h"><h3>Marketing — setup, 40% done</h3>
    <div class="r"><span class="chip info">In setup</span></div></div>
    <div class="panel-b"><div class="trace">
      <div class="tstep done"><b>Team created</b> — 11 people invited, 9 accepted</div>
      <div class="tstep done"><b>Lead assigned</b> — Ishita Sharma</div>
      <div class="tstep live"><b>Business context</b> — 40%. How the team works and targets are written; incentives and “what separates a top performer” are blank.<br>
        <span class="tiny faint">This is where every team stalls. Budget a 40-minute interview with the lead, don't send a form.</span></div>
      <div class="tstep"><b>Connect sources</b> — Gmail and Slack done, HubSpot marketing hub not requested yet</div>
      <div class="tstep"><b>First agent published</b> — none yet</div>
      <div class="tstep"><b>Go live</b></div>
    </div></div>
    <div class="panel-f"><button class="btn sm pri">Book the context interview</button>
      <span class="tiny faint">Teams that complete context before their first agent reach habitual use 3× faster in this pilot</span></div></section>
  ${note("**Sequence matters more than features here.** Every team in this pilot that published an agent before writing its business context produced a generic agent, watched it get ignored, and had to start again. Make the setup flow refuse to reorder itself.")}
  <section class="panel"><div class="panel-h"><h3>Live teams</h3></div>
    <div class="rows">${TEAMS.filter(t=>t.state==="live").map(t=>`<div class="row s-ok"><span class="stripe"></span>
      <div class="row-main"><span class="row-title">${esc(t.name)}</span>
        <span class="row-sub">${t.people} people · ${t.live} agents · ${t.activated} activated · led by ${esc(P(t.lead).n)}</span></div>
      <div class="row-aside">${av(t.lead,"sm")}<span class="chip ok">${ICON.check}Live</span>
        <button class="btn sm">Settings</button></div></div>`).join("")}</div></section>
  <section class="panel" style="margin-top:18px"><div class="panel-h"><h3>Agents shared across teams</h3></div>
    <div class="rows">
      ${AGENTS.filter(a=>a.org||a.team.includes("·")).map(a=>`<div class="row s-none">${glyph(a,"sm")}
        <div class="row-main"><span class="row-title">${esc(a.name)}</span>
          <span class="row-sub">${esc(a.team)} · ${a.installs} installs</span></div>
        <div class="row-aside"><span class="chip">${esc(a.org?"Organisation":"Two teams")}</span></div></div>`).join("")}</div>
    <div class="panel-f"><span class="tiny faint">An agent promoted to organisation level keeps its author and its metric, but its business context becomes the org's rather than one team's.</span></div></section></div>`;

SCREENS["s/connections"]=()=>`<div class="wrap wide">
  ${phead("Connections and governance","What agents may reach, on whose authority, and a record of everything they did with it.")}
  <div class="split"><div class="stack g16">
  <section class="panel"><div class="panel-h"><h3>Sources</h3>
    <div class="r"><button class="btn sm">${ICON.plus}Connect</button></div></div>
    <div class="rows">${CONNECTIONS.map(c=>`<div class="row s-${c.s==="healthy"?"ok":c.s==="degraded"?"hot":"none"}">
      <span class="stripe"></span>
      <div class="row-main"><span class="row-title">${esc(c.n)}</span><span class="row-sub">${esc(c.d)}</span></div>
      <div class="row-aside"><span class="chip plain tiny">${esc(c.scope)}</span>
        <span class="chip ${c.s==="healthy"?"ok":c.s==="degraded"?"hot":"bad"}">
          ${c.s==="healthy"?ICON.check:c.s==="degraded"?ICON.alert:ICON.x}${esc(c.s)}</span></div></div>`).join("")}</div>
    <div class="panel-f"><span class="tiny faint">Every source is connected per user with that user's own permissions. An agent can never read a record its installer couldn't open themselves.</span></div></section>

  <section class="panel"><div class="panel-h"><h3>Everything that happened</h3>
    <div class="r"><div class="seg"><button aria-pressed="true">All</button><button aria-pressed="false">Writes only</button>
      <button aria-pressed="false">Access changes</button></div></div></div>
    <div class="rows">${AUDIT.map(e=>{const who=PEOPLE[e.who]?P(e.who):A(e.who);
      const c={auto:"bad",draft:"hot",publish:"ok",rollback:"hot",access:"info",uninstall:""}[e.tag];
      return `<div class="row s-none" style="padding-block:11px">
        <span class="mono tiny faint nowrap" style="min-width:88px">${esc(e.t)}</span>
        ${PEOPLE[e.who]?av(e.who,"sm"):glyph(who,"sm")}
        <div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(e.what)}</span></div>
        <div class="row-aside"><span class="chip ${c}">${esc(e.tag)}</span></div></div>`}).join("")}</div>
    <div class="panel-f"><span class="tiny faint">Retained 24 months. Exportable. Every auto-act entry names the guardrail that permitted it.</span></div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Autonomy across the org</h3></div><div class="panel-b">
      ${barlist([{l:"Suggest",v:13},{l:"Draft",v:8},{l:"Auto-act",v:1,cls:"bad"}],{fmt:v=>v+" agents"})}
      <div class="callout bad tiny" style="margin-top:14px"><b>One agent can act unsupervised.</b> CD Watch posts to Slack and opens HubSpot tasks. It cannot email a client, move money, or touch a policy. Every auto-act agent needs a named owner and a written reason — Sanya's is: “by the time a human notices, an employee is already uninsured.”</div>
    </div></section>
    <section class="panel"><div class="panel-h"><h3>Asked for, not connected</h3></div>
      <div class="rows">
        <div class="row s-hot"><span class="stripe"></span><div class="row-main">
          <span class="row-title" style="font-size:13px">WhatsApp Business</span>
          <span class="row-sub tiny">5 requests. Two of our three dormant users blame this. Highest-leverage connection on the list.</span></div></div>
        <div class="row s-none"><div class="row-main">
          <span class="row-title" style="font-size:13px">Insurer portals (ICICI, Bajaj)</span>
          <span class="row-sub tiny">Would close the loop on quote TAT. No API — needs a browser agent.</span></div></div>
      </div></section>
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
