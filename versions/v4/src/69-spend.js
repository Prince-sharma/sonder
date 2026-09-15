
/* ═══════════════════════════════════════════════════════════════════════════
   V4 · ORG SPEND AND GOVERNANCE (super admin), AND WHAT THE AGENTS PROPOSE
   C6/3.1 · The incumbent designed per-role spend caps correctly — audit-trailed,
        API-manageable, highest-limit-wins across roles — and then priced the
        whole governance suite above the tier that feels the pain. Five of nine
        documented churn stories are billing mechanics; none cite the sticker
        price. Governance belongs in the base tier.
   D4   · And the self-improvement loop, with the commit moved to a human.
   ═══════════════════════════════════════════════════════════════════════════ */

SCREENS["s/spend"]=()=>{
  const o=ORGSPEND, pctUsed=Math.round(o.used/o.cap*100), pctProj=Math.round(o.proj/o.cap*100);
  return `<div class="wrap wide">
  ${phead("Spend &amp; governance","What the platform is costing Plum this month, which team is spending it, and the caps that stop a schedule running away.",
    `<div class="seg"><button aria-pressed="true">September</button><button aria-pressed="false">Quarter</button></div>`)}
  ${note("**Governance in the base tier, not above it.** The competitor built the right primitive — per-role monthly caps, audit-trailed, recalculated mid-cycle — and gated it, with rollover and spend insights, behind Enterprise: the cure priced above the pain. Five of nine documented churn stories on its own forum are billing mechanics and none of them cite the subscription price. Caps, rollover and this screen ship on every plan.")}

  <div class="tiles" style="margin:18px 0 20px">
    <div class="tile"><span class="lbl">Used this month</span><span class="val">${(o.used/1000).toFixed(1)}<small>k runs</small></span>
      <span class="foot">${pctUsed}% of the ${(o.cap/1000).toFixed(0)}k cap · 15 days in</span></div>
    <div class="tile"><span class="lbl">Projected</span>
      <span class="val" style="color:${pctProj>100?"var(--crit)":pctProj>90?"var(--warn)":"var(--good)"}">${(o.proj/1000).toFixed(1)}<small>k</small></span>
      <span class="foot">${pctProj}% of cap · ${o.cap-o.proj>0?((o.cap-o.proj)/1000).toFixed(1)+"k headroom":"over"}</span></div>
    <div class="tile"><span class="lbl">Cost per active person</span><span class="val">₹—<small>/mo</small></span>
      <span class="foot">Against ₹1,650 for an individual AI seat × 78</span></div>
    <div class="tile"><span class="lbl">Unattended share</span><span class="val">71<small>%</small></span>
      <span class="foot">Schedules and events, not people typing. This is where a cliff starts.</span></div>
  </div>

  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>By team</h3>
      <div class="r"><span class="chip plain mono">caps set by you</span></div></div>
      <div class="tablewrap" style="border:0;border-radius:0"><table>
      <thead><tr><th>Team</th><th class="num">People</th><th class="num">Used</th><th>Against cap</th>
        <th class="num">Projected</th><th class="num">Per head</th></tr></thead>
      <tbody>${o.teams.map(t=>{const pv=Math.min(100,t.used/t.cap*100), over=t.proj>t.cap;
        return `<tr><td style="font-weight:600">${esc(t.n)}</td>
        <td class="num mono faint">${t.people}</td>
        <td class="num mono">${t.used.toLocaleString()}</td>
        <td><span class="rowflex" style="gap:9px"><span class="meter" style="max-width:120px">
          <i class="${over?"bad":pv>85?"hot":""}" style="width:${Math.max(2,pv).toFixed(0)}%"></i></span>
          <span class="mono tiny faint">${t.cap.toLocaleString()}</span></span></td>
        <td class="num mono ${over?"":""}" ${over?'style="color:var(--crit);font-weight:600"':""}>${t.proj.toLocaleString()}</td>
        <td class="num mono faint">${t.perHead||"—"}</td></tr>`}).join("")}</tbody></table></div>
      <div class="panel-f"><span class="tiny faint">Marketing is at zero because it has no agents yet — its business context is 40% written. An empty team costs nothing, which is the honest shape of this number.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>The month so far</h3>
      <div class="r"><span class="chip plain">Cumulative runs</span></div></div>
      <div class="panel-b">${metricChart({name:"Runs this month", unit:"%", base:o.trend[0], now:o.used, target:o.cap,
        dir:"up", series:o.trend, months:["1","3","5","7","9","11","13","15"]},{h:190})}
        <div class="callout tiny" style="margin-top:12px">The line is nearly straight, which is what a healthy schedule load looks like.
          A step means someone armed a new trigger; a curve means one is compounding. Both are worth a question.</div></div></section>

    <section class="panel"><div class="panel-h"><h3>What the agents are asking to change about themselves</h3>
      <div class="r"><span class="chip">${ICON.spark}${PROPOSALS.length} proposals</span></div></div>
      <div class="rows">
        ${PROPOSALS.map(p=>{const a=A(p.agent);
          return `<div class="row s-${p.warn?"hot":"none"}" style="padding-block:13px">${p.warn?'<span class="stripe"></span>':""}
          ${glyph(a,"sm")}<div class="row-main">
            <span class="rowflex" style="gap:8px;flex-wrap:wrap"><span class="row-title" style="font-size:13px">${esc(p.t)}</span>
              <span class="chip ${p.kind==="New source"?"hot":""}" style="font-size:10px">${esc(p.kind)}</span>
              <span class="chip plain" style="font-size:10px">${esc(a.name)}</span></span>
            <span class="row-sub">${esc(p.d)}</span>
            <span class="tiny faint" style="margin-top:4px;display:block">Evidence: ${esc(p.from)} · ${esc(p.tests)}</span>
            ${p.warn?`<div class="callout hot tiny" style="margin-top:8px">${esc(p.warn)}</div>`:""}</div>
          <div class="row-aside" style="flex-direction:column;gap:6px;align-items:flex-end">
            <button class="btn sm pri" data-act="proposal">Send to test</button>
            <button class="btn sm ghost" data-act="proposal">Decline</button></div></div>`}).join("")}</div>
      <div class="panel-f"><span class="tiny faint">An agent may propose; only a person publishes. Accepting sends the change into the normal draft → test → publish pipeline as a version authored by the agent — it never takes effect on its own.</span></div></section>
  </div>

  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Caps and what they do</h3></div>
      <div class="panel-b stack g14">
        <div class="field"><label>Organisation cap</label>
          <div class="rowflex" style="gap:7px"><input class="inp" id="cap-org" value="48,000 runs / month">
            <button class="btn sm" data-act="savecap">Save</button></div>
          <span class="hint">At 80% every team admin is told. At 100% scheduled and event triggers pause org-wide; people typing are never blocked.</span></div>
        <hr class="hr">
        <div class="rows" style="border:1px solid var(--line);border-radius:9px">
          ${[["Per team","Set by you. A team cannot raise its own."],
             ["Per agent","Set by the team admin at publish, defaulted from the projection."],
             ["Per person","Off. People are not the unit that runs away — schedules are."]]
            .map(([t,d])=>`<div class="row s-none" style="padding-block:10px"><div class="row-main">
              <span class="row-title" style="font-size:12.5px">${esc(t)}</span>
              <span class="row-sub tiny">${esc(d)}</span></div></div>`).join("")}</div>
        <div class="callout tiny"><b>Unused allowance rolls over for one month.</b> The alternative — no rollover plus a fine-grained meter — is the documented source of this category's worst bill-shock complaints.</div>
      </div></section>

    <section class="panel"><div class="panel-h"><h3>Self-modification policy</h3>
      <div class="r"><span class="chip bad">${ICON.lock}Org-wide</span></div></div>
      <div class="rows">
        ${[["May propose instruction changes",true],["May propose new test scenarios",true],
           ["May propose a new data source",true],["May change its own config without review",false],
           ["May create its own triggers",false],["May clone itself into sub-agents",false]]
          .map(([t,on])=>`<div class="row s-none" style="padding-block:11px"><div class="row-main">
            <span class="row-sub" style="color:var(--ink)">${esc(t)}</span></div>
          <div class="row-aside"><button class="switch" role="switch" aria-checked="${on}" aria-label="${esc(t)}" data-act="pause"></button></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">The competitor ships all six of these on by default, on one panel, plus self-cloning sub-agents and tool discovery on AUTO. Powerful, and not a thing a broker's compliance function signs.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>Where the money actually goes</h3></div>
      <div class="panel-b">
        ${barlist([{l:"Scheduled runs",v:48},{l:"Event-triggered runs",v:23},{l:"People asking",v:21},
                   {l:"Backfills &amp; previews",v:5},{l:"Tests",v:3}],{max:100,fmt:v=>v+"%"})}
        <div class="callout tiny" style="margin-top:14px"><b>71% of spend happens with nobody watching.</b>
          That is the product working — and it is exactly why the projection appears on the trigger form
          rather than in a settings page nobody opens.</div>
      </div></section>
  </aside></div></div>`;
};

/* ── stage guard ──────────────────────────────────────────────────────────
   The v4 screens are operational views of an org that is running. v3's journey
   still works from the bar, and before stage 3 there is nothing to operate — so
   they say so rather than showing the pilot's data in an empty world. */
const V4_EMPTY={
 "a/runs":     ["Run log","Nothing has run yet.","Every run of every agent lands here the moment one exists — what it read, what it changed, what it cost, and for the ones that stop, why."],
 "a/run":      ["Run","No such run at this stage.","Jump to Full pilot on the Journey bar to read a real trace."],
 "a/schedules":["Schedules &amp; budget","Nothing is scheduled.","When the first agent gets a trigger, it appears here with its projected runs a month and a stop button on the row."],
 "a/new":      ["Create an agent","The team isn't ready yet.","Business context comes before the first agent — teams that published first produced generic agents."],
 "a/share":    ["Share &amp; ownership","Nothing is published.","Publishing is what moves an agent from one person's drafts to the team. Until then there is nothing to share and nobody to maintain it."],
 "s/spend":    ["Spend &amp; governance","Nothing is being spent.","Caps, projections and the self-modification policy appear once a team has agents running."],
 "m/waiting":  ["Waiting on you","Nothing is waiting.","When an agent stops to ask you something, it lands here rather than sitting inside a thread nobody opens."]
};
(function guardV4(){
  if(typeof JOURNEY==="undefined") return;
  Object.keys(V4_EMPTY).forEach(k=>{
    const full=SCREENS[k]; if(!full) return;
    SCREENS[k]=(arg)=>{
      if(state.stage>=3) return full(arg);
      const [t,h,b]=V4_EMPTY[k];
      return `<div class="wrap">${phead(t,"Not yet — this is a view of an org that is running.")}
        ${emptyPanel(h,b,`<a class="btn pri" href="#" data-stage="3">Jump to the full pilot ${ICON.arrowr}</a>`)}</div>`;
    };
  });
})();
