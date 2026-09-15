
/* ═══════════════════════════════════════════════════════════════════════════
   V4 · SCHEDULES AND BUDGET
   Two findings meet on this screen.
   C8 · In the product we studied, creating a trigger is one visible click and
        deleting one took six passes — the control is an unlabelled ellipsis,
        with no aria-label, inside a drawer. Locating it cost ~640 credits of
        accidental runs.
   C6 · Measured unit costs: a heartbeat agent replying one word costs 7 credits
        a run. One agent on the trigger builder's own default cadence burns a
        month's allowance in 5–11 days. A four-agent grid does it in under two.
        The chat product is cheap; the scheduler is the cliff.
   ═══════════════════════════════════════════════════════════════════════════ */

function trigRow(t){
  const a=A(t.agent), on=t.state==="on", perMonth=projectRuns(t.perDay);
  const cost=projectMonth(t.perDay,t.band);
  return `<div class="row s-${on?"none":"hot"}" style="padding-block:13px">
    ${on?"":'<span class="stripe"></span>'}${glyph(a,"sm")}
    <div class="row-main">
      <span class="row-title" style="font-size:13px">${esc(a.name)} — ${esc(t.label)}</span>
      <span class="row-sub">“${esc(t.nl)}” · set by ${esc(P(t.owner).n)} on ${esc(t.created)}</span>
      ${t.note?`<span class="tiny faint" style="margin-top:4px;display:block">${esc(t.note)}</span>`:""}
    </div>
    <div class="row-aside" style="gap:14px">
      <div style="text-align:right;min-width:104px">
        <div class="mono tiny" style="font-weight:600">${perMonth.toLocaleString()}<span class="faint"> runs/mo</span></div>
        <div class="tiny faint mono">${cost.toLocaleString()} units</div></div>
      <div style="text-align:right;min-width:150px">
        <div class="tiny faint">Next</div>
        <div class="tiny" style="font-weight:600">${esc(t.next)}</div></div>
      <button class="btn sm" data-act="trigpause" data-id="${t.id}" aria-label="${on?"Pause":"Resume"} ${esc(t.label)}">
        ${on?"Pause":"Resume"}</button>
      <button class="btn sm ghost" data-act="trigstop" data-id="${t.id}" aria-label="Stop ${esc(t.label)} for good">Stop</button>
    </div></div>`;
}

SCREENS["a/schedules"]=()=>{
  const live=TRIGGERS.filter(t=>t.state==="on"), paused=TRIGGERS.filter(t=>t.state!=="on");
  const runsDay=live.reduce((n,t)=>n+t.perDay,0);
  const projMonth=live.reduce((n,t)=>n+projectMonth(t.perDay,t.band),0);
  const over=BUDGET.perAgent.filter(b=>b.state==="over"), near=BUDGET.perAgent.filter(b=>b.state==="near");
  return `<div class="wrap wide">
  ${phead("Schedules &amp; budget","Everything that can start a run without a person asking, on one screen — with what it costs a month and a stop button on the row.",
    `<button class="btn">${ICON.plus}New schedule</button>`)}
  ${note("**Symmetry rule: anything you can create in one click you can stop in one click, from a labelled control.** In the product we studied, the delete affordance for a trigger was an unlabelled ellipsis inside a drawer with no aria-label — invisible to keyboard and screen readers — and finding it took six passes and about 640 credits of accidental runs. Creation was one click.")}

  <div class="tiles" style="margin:18px 0 18px">
    <div class="tile"><span class="lbl">Live schedules</span><span class="val">${live.length}</span>
      <span class="foot">${live.filter(t=>t.kind==="Schedule").length} on a clock · ${live.filter(t=>t.kind==="Event").length} on an event</span></div>
    <div class="tile"><span class="lbl">Runs a day, unattended</span><span class="val">${runsDay}</span>
      <span class="foot">Nobody has to be at a desk for any of these</span></div>
    <div class="tile"><span class="lbl">Projected this month</span>
      <span class="val" style="color:${projMonth>BUDGET.teamCap?"var(--crit)":"inherit"}">${(projMonth/1000).toFixed(1)}<small>k</small></span>
      <span class="foot">Budget ${(BUDGET.teamCap/1000).toFixed(0)}k · ${projMonth>BUDGET.teamCap?"over":"inside"}</span></div>
    <div class="tile"><span class="lbl">Over or near cap</span>
      <span class="val" style="color:${over.length?"var(--crit)":near.length?"var(--warn)":"inherit"}">${over.length+near.length}</span>
      <span class="foot">${over.length} over · ${near.length} within 10%</span></div>
  </div>

  ${over.length?`<div class="callout bad" style="margin-bottom:16px"><b>Draft Desk will cross its budget on the 27th.</b>
    At the current rate it projects ${over[0].proj.toLocaleString()} runs against a ${over[0].cap.toLocaleString()} cap.
    When it crosses, its <b>scheduled and event triggers pause</b> and Karan and Ananya are both told with the number and the cause.
    On-demand use keeps working — a member typing a question never hits a wall a schedule created.
    <div class="rowflex" style="margin-top:10px;gap:7px"><button class="btn sm pri" data-act="raisecap">Raise the cap to 6,000</button>
      <button class="btn sm" data-act="trimtrigger">Trim the trigger instead</button></div></div>`:""}

  <section class="panel" style="margin-bottom:16px"><div class="panel-h"><h3>Live</h3>
    <div class="r"><span class="chip">${live.length} running</span></div></div>
    <div class="rows">${live.map(trigRow).join("")}</div>
    <div class="panel-f"><span class="tiny faint">Stopping a schedule never deletes the agent, its history or anyone's install. It stops the clock.</span></div></section>

  ${paused.length?`<section class="panel" style="margin-bottom:16px"><div class="panel-h"><h3>Paused</h3>
    <div class="r"><span class="chip hot">${ICON.alert}Auto-paused by budget</span></div></div>
    <div class="rows">${paused.map(trigRow).join("")}</div>
    <div class="panel-f"><span class="tiny faint">A budget pause is loud and reversible. It is never a silent disable — the failure mode this product exists to avoid.</span></div></section>`:""}

  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Budget by agent</h3>
      <div class="r"><span class="chip plain mono">September</span></div></div>
      <div class="tablewrap" style="border:0;border-radius:0"><table>
      <thead><tr><th>Agent</th><th class="num">Used</th><th class="num">Cap</th><th>Month projection</th><th class="num">Ends</th></tr></thead>
      <tbody>${BUDGET.perAgent.map(b=>{const a=A(b.id), pctv=Math.min(100,b.used/b.cap*100);
        return `<tr><td><span class="cellname">${glyph(a,"sm")}<span class="t">${esc(a.name)}</span></span></td>
        <td class="num mono">${b.used.toLocaleString()}</td><td class="num mono faint">${b.cap.toLocaleString()}</td>
        <td><span class="rowflex" style="gap:9px"><span class="meter" style="max-width:110px">
          <i class="${b.state==="over"?"bad":b.state==="near"?"hot":""}" style="width:${pctv.toFixed(0)}%"></i></span>
          <span class="mono tiny">${b.proj.toLocaleString()}</span></span></td>
        <td class="num"><span class="chip ${b.state==="over"?"bad":b.state==="near"?"hot":"ok"}">
          ${b.state==="over"?"27 Sep":b.state==="near"?"Just inside":"Inside"}</span></td></tr>`}).join("")}</tbody></table></div>
      <div class="panel-f"><span class="tiny faint">A cap is set at publish, defaulted from the projection the author was shown before they saved the trigger.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>What a run costs, in bands</h3></div>
      <div class="rows">
        ${[["light","A check that finds nothing. A yes/no lookup. CD Watch's daily sweep.","≈ 28s"],
           ["standard","A digest, a renewal sweep, a ranked list over a few hundred records.","≈ 40s–2m"],
           ["heavy","Drafting in someone's voice, parsing four quote PDFs, joining a call.","≈ 2m–6m"]]
          .map(([k,d,t])=>`<div class="row s-none" style="padding-block:12px"><div class="row-main">
            <span class="row-title" style="font-size:13px">${esc(COSTBAND[k].l)}
              <span class="mono faint tiny" style="margin-left:8px">${COSTBAND[k].n} unit${COSTBAND[k].n>1?"s":""}</span></span>
            <span class="row-sub">${esc(d)}</span></div>
            <div class="row-aside"><span class="tiny faint mono">${esc(t)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Three bands, published, one currency. The trust winners in this category are the coarse meters; the most transparent fine-grained meter on the market coexists with its worst bill-shock complaints.</span></div></section>
  </div>
  <aside class="stack g16">
    <section class="panel" style="border-color:var(--warn-line)"><div class="panel-h" style="background:var(--warn-soft)">
      <h3>The cliff, measured</h3></div>
      <div class="panel-b stack g12">
        <p class="tiny" style="line-height:1.65;color:var(--ink-2)">From the teardown of a shipping competitor, measured per triggered run on a real account:</p>
        ${barlist([{l:"Heartbeat — replies “OK”",v:7},{l:"A run that only blocks",v:19},
                   {l:"A 30-row scrape",v:33},{l:"The watchdog (n=4)",v:85}],{max:90,fmt:v=>v+" cr"})}
        <div class="callout bad tiny"><b>One agent, on the cadence the product's own trigger builder suggested,
          burns a month's allowance in 5–11 days.</b> Four agents on 15-minute schedules did it in under two.
          A do-nothing agent on a 15-minute schedule does it in thirty.</div>
        <div class="callout tiny"><b>And the counterpoint that decides the design:</b> the entire four-day program —
          every build, chat and manual run — cost about 1,200 credits. The interactive product is cheap.
          The scheduler is the cliff. That is why a budget pause stops <i>schedules</i> and leaves people alone.</div>
      </div></section>
    <section class="panel"><div class="panel-h"><h3>Rules this screen enforces</h3></div>
      <div class="rows">
        ${[["Cost before the commitment","The projection appears on the trigger form before Save, not in a ledger afterwards."],
           ["One number, one source","This screen, the publish screen, the run log and the invoice read the same ledger. In the product we studied two cost surfaces disagreed by exactly 3 on all three triggers."],
           ["No background meters","Nothing bills that does not appear as a run. The incumbent charges an inbox classifier every 1–3 hours whether you open the product or not."],
           ["A pause is never silent","Budget exhaustion pauses schedules and names the cause to two people."]]
          .map(([t,d])=>`<div class="row s-none" style="padding-block:11px"><div class="row-main">
            <span class="row-title" style="font-size:12.5px">${esc(t)}</span>
            <span class="row-sub tiny">${esc(d)}</span></div></div>`).join("")}</div></section>
  </aside></div></div>`;
};
