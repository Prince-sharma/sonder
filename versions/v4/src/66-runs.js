
/* ═══════════════════════════════════════════════════════════════════════════
   V4 · THE RUN LOG AND THE TRACE
   "Could really use a log" is the #1 organic feature request by engagement on
   the incumbent's own forum, ahead of agent customization and connector depth
   (kill-list §1.4). The prototype had Run.trace[] in its object model and on no
   screen. This is the screen.
   ═══════════════════════════════════════════════════════════════════════════ */

const TRACEKIND={ok:"done", warn:"warn", fail:"fail", auto:"auto", block:"block"};

function runRow(r){
  const a=A(r.agent), p=P(r.who), s=RUNSTATE[r.state];
  return `<div class="row s-${s.s} link" data-go="#/a/run/${r.id}">
    <span class="stripe"></span>${glyph(a,"sm")}
    <div class="row-main">
      <span class="row-title" style="font-size:13px">${esc(a.name)}
        <span class="mono faint tiny" style="margin-left:7px">${esc(r.id)}</span></span>
      <span class="row-sub">${esc(r.out)}</span>
      <span class="tiny faint" style="margin-top:3px;display:block">${esc(r.trigger)} · for ${esc(p.n)} · ${esc(r.started)} · ${esc(r.dur)}</span>
    </div>
    <div class="row-aside" style="flex-direction:column;align-items:flex-end;gap:6px">
      ${stateChip(r.state)}
      <span class="tiny faint mono">${esc(COSTBAND[r.band].l)}</span>
    </div></div>`;
}

SCREENS["a/runs"]=()=>{
  const f=state.runFilter||"all";
  const counts={all:RUNS.length};
  Object.keys(RUNSTATE).forEach(k=>counts[k]=RUNS.filter(r=>r.state===k).length);
  const shown = f==="all"?RUNS:RUNS.filter(r=>r.state===f);
  const attn=RUNS.filter(r=>r.state==="blocked"||r.state==="failed").length;
  return `<div class="wrap wide">
  ${phead("Run log","Every run of every Sales agent, today. What it read, what it changed, what it cost, and — for the ones that stopped — why.",
    `<div class="seg"><button aria-pressed="true">Today</button><button aria-pressed="false">7 days</button><button aria-pressed="false">30 days</button></div>`)}
  ${note("**This screen is the product's biggest single gap closed.** A log is the #1 organic feature request on the incumbent's own forum — ahead of agent customization and connector depth — and the prototype declared `Run.trace[]` in its object model and drew it nowhere. The teardown's sharpest finding lives here too: in the product we studied, a run that stopped for a missing input and a run that hit a hard block both recorded as **Completed**, and the Failed tab read ‘No history yet' after seven scheduled runs including a blocked one.")}

  <div class="tiles" style="margin:18px 0 18px">
    <div class="tile"><span class="lbl">Runs today</span><span class="val">${RUNS.length}</span>
      <span class="foot">Across 8 live agents and 12 people</span></div>
    <div class="tile"><span class="lbl">Need a human</span>
      <span class="val" style="color:${attn?"var(--warn)":"inherit"}">${attn}</span>
      <span class="foot">${counts.blocked} waiting on a person · ${counts.failed} failed</span></div>
    <div class="tile"><span class="lbl">Ran, nothing to say</span><span class="val">${counts.nothing}</span>
      <span class="foot">Not the same as ‘completed'. Three in a row is a setup problem.</span></div>
    <div class="tile"><span class="lbl">Spent today</span><span class="val">412<small> runs</small></span>
      <span class="foot">Month to date 9,840 of 14,000</span></div>
  </div>

  <div class="rowflex" style="margin-bottom:14px;gap:7px;flex-wrap:wrap">
    ${[["all","Everything"],["blocked","Waiting on a person"],["failed","Failed"],["partial","Partly done"],
       ["nothing","Nothing to do"],["completed","Completed"]].map(([k,l])=>
      `<button class="chip ${f===k?"solid":""}${k==="blocked"&&counts.blocked?" hot":k==="failed"&&counts.failed?" bad":""}"
        data-act="runfilter" data-id="${k}" style="cursor:pointer">${esc(l)} ${counts[k]??0}</button>`).join("")}
    <span class="topbar-spacer"></span>
    <span class="tiny faint">One row per run. One number, one source — this ledger is what every cost surface reads.</span>
  </div>

  <section class="panel"><div class="rows">${shown.length?shown.map(runRow).join("")
    :`<div class="row s-none"><div class="row-main"><span class="row-sub">No runs in this state today.</span></div></div>`}</div>
    <div class="panel-f"><span class="tiny faint">Runs are kept 90 days. Traces 30. Pin a run to keep its trace indefinitely.</span></div></section>

  <div class="g g2" style="margin-top:18px;gap:16px">
    <section class="panel"><div class="panel-h"><h3>Why five states and not two</h3></div>
      <div class="rows">${Object.entries(RUNSTATE).map(([k,v])=>`<div class="row s-${v.s}" style="padding-block:11px">
        <span class="stripe"></span><div class="row-main">
        <span class="row-title" style="font-size:13px">${esc(v.l)}</span>
        <span class="row-sub">${esc(v.m)}</span></div>
        <div class="row-aside"><span class="mono tiny faint">${esc(k)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Members see two of these, in words: “needs you” and “nothing today”.</span></div></section>
    <section class="panel"><div class="panel-h"><h3>What happens without anyone watching</h3></div>
      <div class="panel-b stack g12">
        <div class="callout hot"><b>A blocked run always finds a person.</b> It raises an item on the installer's
          “Waiting on you”, a row here, and — if it is still unanswered when the agent would next run — a notification
          to the installer and the maintainer. Nothing waits silently inside a thread.</div>
        <div class="callout bad"><b>A failed run notifies the maintainer immediately</b>, with the cause named.
          <span class="muted">RFQ Architect failed at 10:26 because a Drive file was moved at 09:41. Meera was told at 10:27.</span></div>
        <div class="callout"><b>Three consecutive “nothing to do” runs raise a setup flag.</b>
          <span class="muted">Farhan's rundown has found nothing three days running — his floor is set at ₹10 L and his book is SMB.
          That is a configuration problem wearing the costume of a quiet week.</span></div>
      </div></section>
  </div></div>`;
};

/* ── the trace ──────────────────────────────────────────────────────────── */
SCREENS["a/run"]=(id)=>{
  const r=RUN(id)||RUNS[0], a=A(r.agent), p=P(r.who), s=RUNSTATE[r.state];
  const total=r.trace.reduce((n,t)=>n+t.ms,0);
  return `<div class="wrap">
  <div class="phead tight"><div class="phead-row">
    <div style="display:flex;gap:14px;align-items:flex-start;min-width:0">${glyph(a,"lg")}
      <div style="min-width:0"><div class="eyebrow" style="margin-bottom:5px">
        <a href="#/a/runs" style="color:inherit">Run log</a> · ${esc(r.id)}</div>
        <h1 style="font-size:25px">${esc(a.name)}</h1>
        <div class="rowflex" style="margin-top:8px;gap:7px;flex-wrap:wrap">${stateChip(r.state)}
          <span class="chip">${ICON.clock}${esc(r.started)}</span>
          <span class="chip plain">${esc(r.dur)}</span>
          <span class="chip plain mono">${esc(COSTBAND[r.band].l)} run</span>
          ${r.auto?`<span class="chip bad">${ICON.bolt}Acted on its own</span>`:""}</div></div></div>
    <div class="phead-actions">
      <button class="btn" data-act="rerun">Run it again</button>
      <a class="btn" href="#/a/analytics/${a.id}">Agent analytics ${ICON.arrowr}</a></div></div></div>

  ${note("**The trace is what a switcher gives up when they leave a node graph.** A run in the product we studied is a chat thread with a ‘16 Steps' counter you can read but not open; a Zapier or n8n run is an inspectable graph you can debug. This is the answer to that — every step, its source, its duration, and the part nobody ships: what it decided **not** to do.")}

  <div class="rowflex" style="margin:16px 0 14px;gap:9px;flex-wrap:wrap">
    <span class="tiny faint">Ran for</span>${av(r.who,"sm")}<b style="font-size:13px">${esc(p.n)}</b>
    <span class="tiny faint">· ${esc(r.trigger)}</span><span class="topbar-spacer"></span>
    <span class="tiny faint">Reading with ${esc(p.n.split(" ")[0])}'s own credentials — never more than they could open themselves</span>
  </div>

  ${r.state==="blocked"&&r.ask?`<section class="panel" style="margin-bottom:16px;border-color:var(--warn-line)">
    <div class="panel-h" style="background:var(--warn-soft)">
      <span class="chip hot">${ICON.alert}Waiting on ${esc(P(r.ask.who).n)}</span>
      <div><h3>It stopped and asked</h3></div></div>
    <div class="panel-b stack g14">
      <p style="font-size:14.5px;line-height:1.65;font-weight:500">${esc(r.ask.q)}</p>
      <div class="callout"><b>Why it didn't just decide:</b> ${esc(r.ask.why)}</div>
      <div class="rowflex" style="gap:8px;flex-wrap:wrap">
        ${r.ask.opts.map((o,i)=>`<button class="btn ${i===0?"pri":""} sm" data-act="answer">${esc(o)}</button>`).join("")}</div>
    </div>
    <div class="panel-f"><span class="tiny faint">Raised to Vikram's “Waiting on you” at 07:04. If it is still unanswered at tomorrow's 07:00 trigger, Vikram and Karan are both told.</span></div></section>`:""}

  ${r.state==="failed"&&r.fail?`<section class="panel" style="margin-bottom:16px;border-color:var(--crit-line)">
    <div class="panel-h" style="background:var(--crit-soft)">
      <span class="chip bad">${ICON.x}Failed</span><div><h3>What broke, and where</h3></div></div>
    <div class="rows">
      ${[["Cause",r.fail.cause],["What it tried",r.fail.did],["The fix",r.fail.fix]].map(([k,v])=>
        `<div class="row s-none" style="padding-block:12px"><div class="row-main">
          <span class="eyebrow" style="margin-bottom:4px">${esc(k)}</span>
          <span class="row-sub" style="color:var(--ink)">${v}</span></div></div>`).join("")}</div>
    <div class="panel-f"><button class="btn sm pri" data-act="fixpoint">Point it at the new file</button>
      <span class="topbar-spacer"></span><span class="tiny faint">Meera was notified at 10:27, one minute after it stopped.</span></div></section>`:""}

  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Every step</h3>
      <div class="r"><span class="chip plain mono">${r.trace.length} steps · ${(total/1000).toFixed(1)}s</span></div></div>
      <div class="panel-b"><div class="trace">${r.trace.map(t=>`
        <div class="tstep ${TRACEKIND[t.k]||"done"}">
          <b>${esc(t.s)}</b>
          <span class="mono tiny faint" style="margin-left:8px">${esc(t.t)}</span>
          ${t.ms?`<span class="mono tiny faint" style="margin-left:6px">${t.ms<1000?t.ms+"ms":(t.ms/1000).toFixed(1)+"s"}</span>`:""}
          <br>${esc(t.d)}</div>`).join("")}</div></div>
      <div class="panel-f"><span class="tiny faint">Amber steps are decisions not to act — a missing source, a declared unknown, a refusal. They are the most useful rows on this screen and every incumbent hides them.</span></div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>What it touched</h3></div>
      <div class="rows">
        <div class="row s-none" style="padding-block:11px"><div class="row-main">
          <span class="eyebrow" style="margin-bottom:5px">Read</span>
          ${r.read.map(x=>`<span class="row-sub" style="color:var(--ink)">${ICON.eye} ${esc(x)}</span>`).join("")}</div></div>
        <div class="row s-${r.wrote.length?"hot":"none"}" style="padding-block:11px">${r.wrote.length?'<span class="stripe"></span>':""}
          <div class="row-main"><span class="eyebrow" style="margin-bottom:5px">Wrote</span>
          ${r.wrote.length?r.wrote.map(x=>`<span class="row-sub" style="color:var(--ink)">${ICON.alert} ${esc(x)}</span>`).join("")
            :`<span class="row-sub">Nothing. This agent only ever tells you.</span>`}</div></div>
        <div class="row s-none" style="padding-block:11px"><div class="row-main">
          <span class="eyebrow" style="margin-bottom:5px">Sent outside Plum</span>
          <span class="row-sub" style="color:var(--ink)">Nothing</span></div></div>
      </div></section>
    <section class="panel"><div class="panel-h"><h3>Cost</h3></div>
      <div class="panel-b stack g10">
        <div class="rowflex"><span class="tiny faint">This run</span><span class="topbar-spacer"></span>
          <b class="mono">${esc(COSTBAND[r.band].l)} · ${COSTBAND[r.band].n}</b></div>
        <div class="rowflex"><span class="tiny faint">${esc(a.name)} this month</span><span class="topbar-spacer"></span>
          <b class="mono">${budgetOf(a.id)?budgetOf(a.id).used.toLocaleString():"—"} of ${budgetOf(a.id)?budgetOf(a.id).cap.toLocaleString():"—"}</b></div>
        <span class="meter"><i class="${budgetOf(a.id)&&budgetOf(a.id).state==="over"?"bad":budgetOf(a.id)&&budgetOf(a.id).state==="near"?"hot":""}"
          style="width:${budgetOf(a.id)?Math.min(100,budgetOf(a.id).used/budgetOf(a.id).cap*100).toFixed(0):0}%"></i></span>
        <span class="tiny faint">Three bands — light, standard, heavy. One unit, published, and it is the same ledger the schedules screen and the invoice read.</span>
      </div>
      <div class="panel-f"><a class="btn sm" href="#/a/schedules">Schedules &amp; budget ${ICON.arrowr}</a></div></section>
    <section class="panel"><div class="panel-h"><h3>Other runs of this agent today</h3></div>
      <div class="rows">${runsFor(r.agent).map(x=>`<div class="row s-${RUNSTATE[x.state].s} link" data-go="#/a/run/${x.id}" style="padding-block:10px">
        <span class="stripe"></span><div class="row-main">
        <span class="row-sub" style="color:var(--ink)">${esc(P(x.who).n)} · ${esc(x.started)}</span>
        <span class="tiny faint">${esc(RUNSTATE[x.state].l)}</span></div></div>`).join("")}</div></section>
  </aside></div></div>`;
};

/* ── member: what's waiting on you ────────────────────────────────────────
   C2 · The finding this screen exists for, verbatim from the teardown: "A
   scheduled agent that blocks on a question has no visible surface outside its
   own chat: if you are not watching, you do not know it is waiting for you."
   In that product the Approval Required tab read "No history yet" after seven
   scheduled runs including a blocked one. */
SCREENS["m/waiting"]=()=>{
  const open=WAITING.filter(w=>!state.answered.has(w.id));
  return `<div class="wrap">
  ${phead("Waiting on you","Two of your agents stopped because they'd rather ask than guess. Neither has done anything while it waits.")}
  ${note("**This is the surface the teardown says nobody ships.** Agents that block on a question are recorded as *completed* in the competitor's ledger, its Failed tab stays empty, and the question sits inside a chat thread the user has no reason to open. Here a blocked run raises an item for a named person, appears in the admin's run log, and escalates to both of them if it is still unanswered when the agent would next run.")}
  ${open.length?`<div class="stack g16" style="margin-top:18px">${open.map(w=>{const a=A(w.agent);
    return `<section class="panel" style="border-color:var(--warn-line)">
      <div class="panel-h" style="background:var(--warn-soft)">${glyph(a,"sm")}
        <div><h3>${esc(a.name)} stopped and asked</h3>
          <div class="tiny faint" style="margin-top:2px">${esc(w.when)} · it has done nothing since</div></div>
        <div class="r"><span class="chip hot">${ICON.alert}Waiting</span></div></div>
      <div class="panel-b stack g14">
        <p style="font-size:14.5px;line-height:1.65;font-weight:500">${esc(w.q)}</p>
        <div class="callout"><b>Why it didn't decide for itself:</b> ${esc(w.why)}</div>
      </div>
      <div class="panel-f" style="flex-wrap:wrap;gap:8px">
        ${w.opts.map((o,i)=>`<button class="btn sm ${i===0?"pri":""}" data-act="doanswer" data-id="${w.id}">${esc(o)}</button>`).join("")}
        <span class="topbar-spacer"></span>
        <a class="btn sm ghost" href="#/m/thread/${a.id}">${ICON.chat}Ask it something first</a></div></section>`}).join("")}</div>`
   :`<div style="margin-top:18px">${emptyPanel("Nothing is waiting","Every agent that ran today either did the job or found nothing worth telling you. When one stops to ask, it lands here — you never have to go looking inside a thread.")}</div>`}

  <section class="panel" style="margin-top:18px"><div class="panel-h"><h3>What ran for you today</h3>
    <div class="r"><span class="chip plain">6 agents</span></div></div>
    <div class="rows">
      ${[["ok","Morning Rundown","08:15 · five things, ranked"],
         ["ok","Draft Desk","08:16 · three drafts waiting for you"],
         ["ok","Deal Room","09:58 · brief for Fabrik Labs at 11:30"],
         ["hot","Renewal Defender","07:02 · stopped to ask you something"],
         ["none","Quote Comparer","Nothing to do — you didn't upload anything"],
         ["ok","Meeting Notes","15:30 · minutes filed, four actions routed"]]
        .map(([s,n,d])=>`<div class="row s-${s}" style="padding-block:11px">${s!=="none"?'<span class="stripe"></span>':""}
          <div class="row-main"><span class="row-title" style="font-size:13px">${esc(n)}</span>
          <span class="row-sub">${esc(d)}</span></div></div>`).join("")}</div>
    <div class="panel-f"><span class="tiny faint">No costs, no run ids, no step counts. A member gets two words for all of this — “needs you” and “nothing today”.</span></div></section>
  </div>`;
};

/* ── modals ──────────────────────────────────────────────────────────────── */
function waitingModal(id){
  const w=WAITING.find(x=>x.id===id); if(!w) return; const a=A(w.agent);
  modal(`<div class="panel-h" style="border-radius:11px 11px 0 0">${glyph(a,"sm")}
      <div><h3>${esc(a.name)} is waiting</h3></div>
      <div class="r"><button class="btn sm ghost" data-act="close">${ICON.x}</button></div></div>
    <div class="modal-b stack g14"><p style="font-size:14px;line-height:1.65">${esc(w.q)}</p>
      <div class="callout"><b>Why:</b> ${esc(w.why)}</div></div>
    <div class="panel-f" style="flex-wrap:wrap;gap:8px">
      ${w.opts.map((o,i)=>`<button class="btn sm ${i===0?"pri":""}" data-act="doanswer" data-id="${w.id}">${esc(o)}</button>`).join("")}</div>`);
}

function stopTriggerModal(id){
  const t=TRIGGERS.find(x=>x.id===id); if(!t) return; const a=A(t.agent);
  modal(`<div class="panel-h" style="border-radius:11px 11px 0 0">
      <div><h3>Stop “${esc(t.label)}” for good?</h3>
        <div class="tiny faint" style="margin-top:2px">${esc(a.name)} · ${esc(t.nl)}</div></div>
      <div class="r"><button class="btn sm ghost" data-act="close">${ICON.x}</button></div></div>
    <div class="modal-b stack g14">
      <div class="rows" style="border:1px solid var(--line);border-radius:9px">
        <div class="row s-bad" style="padding-block:11px"><span class="stripe"></span><div class="row-main">
          <span class="row-title" style="font-size:13px">This stops</span>
          <span class="row-sub">${projectRuns(t.perDay).toLocaleString()} runs a month, for ${a.installs} people. Nobody gets the ${esc(t.nl.toLowerCase())} output any more.</span></div></div>
        <div class="row s-ok" style="padding-block:11px"><span class="stripe"></span><div class="row-main">
          <span class="row-title" style="font-size:13px">This keeps</span>
          <span class="row-sub">The agent, everyone's installs and settings, every past run and its trace. You are stopping a clock, not deleting anything.</span></div></div>
      </div>
      <div class="callout tiny">Prefer <b>Pause</b> if you might want it back this week — it is one click in both directions and it tells the team.</div>
    </div>
    <div class="panel-f"><button class="btn pri" data-act="dostop" data-id="${t.id}">Stop it</button>
      <button class="btn" data-act="trigpause" data-id="${t.id}">Pause instead</button>
      <span class="topbar-spacer"></span><button class="btn ghost" data-act="close">Cancel</button></div>`);
}
