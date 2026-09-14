
/* ═══════════════════════════ TEAM ADMIN ═══════════════════════════ */

SCREENS["a/pulse"]=()=>{
  const segs=[{l:"Power",v:4},{l:"Habitual",v:5},{l:"Novice",v:3},{l:"Dormant",v:2}];
  const open=REQUESTS.filter(r=>r.state==="open");
  return `<div class="wrap wide">
  ${phead("Sales — team pulse","Fourteen people, eight live agents. Your job on this page is to find the person who isn't getting value and the agent that isn't earning its install.",
    `<a class="btn pri" href="#/a/build">${ICON.plus}New agent</a>`)}
  <div class="tiles" style="margin-bottom:20px">
    <div class="tile"><span class="lbl">Activated</span><span class="val">13<small>/14</small></span><span class="foot">Used something in the last 28 days</span></div>
    <div class="tile"><span class="lbl">Habitual</span><span class="val">9<small>/14</small></span><span class="foot">Active in 9 of the last 12 weeks</span></div>
    <div class="tile"><span class="lbl">Installs per person</span><span class="val">5.1</span><span class="foot">Up from 3.4 in June</span></div>
    <div class="tile"><span class="lbl">Open requests</span><span class="val">${open.length}</span><span class="foot">Two are the same complaint</span></div>
  </div>
  <div class="split">
    <div class="stack g16">
      <section class="panel"><div class="panel-h"><h3>Agents you own</h3>
        <div class="r"><a class="btn sm" href="#/a/agents">Manage all</a></div></div>
        <div class="tablewrap" style="border:0;border-radius:0"><table>
        <thead><tr><th>Agent</th><th class="num">Installed</th><th class="num">Acted on</th>
          <th>Outcome metric</th><th class="num">Now</th><th>Trend</th></tr></thead><tbody>
        ${AGENTS.filter(a=>!a.org).map(a=>`<tr data-go="#/a/analytics/${a.id}" style="cursor:pointer">
          <td><span class="cellname">${glyph(a,"sm")}<span class="t">${esc(a.name)}</span>${a.isNew?`<span class="chip info">New</span>`:""}</span></td>
          <td class="num"><span class="rowflex" style="justify-content:flex-end;gap:8px">
            <span class="meter" style="max-width:46px"><i class="${a.installs/14>=.6?"":"hot"}" style="width:${(a.installs/14*100).toFixed(0)}%"></i></span>
            <b class="mono tiny">${a.installs}/14</b></span></td>
          <td class="num mono">${a.actedPct}%</td>
          <td class="tiny muted" style="max-width:230px">${esc(a.metric.name)}</td>
          <td class="num mono" style="font-weight:600;color:${hitTarget(a.metric)?"var(--good)":"var(--warn)"}">${fmtMetric(a.metric,a.metric.now)}</td>
          <td>${spark(a.metric.series,{w:76,h:22})}</td></tr>`).join("")}
        </tbody></table></div></section>

      ${note("**Adoption and impact sit in the same table.** An agent with 12 installs and a flat metric is a worse agent than one with 6 installs and a moving metric — and today no platform shows you both in one row. That's the view a change-management conversation actually needs.")}

      <section class="panel"><div class="panel-h"><h3>In the workshop</h3>
        <div class="r"><a class="btn sm" href="#/a/build">${ICON.plus}New</a></div></div>
        <div class="rows">${DRAFTS.map(d=>`<div class="row s-info link" data-go="#/a/${d.state==="In test"?"test":"build"}">
          <span class="stripe"></span>${glyph(d,"sm")}
          <div class="row-main"><span class="row-title">${esc(d.name)} <span class="faint mono tiny">v${d.v}</span></span>
            <span class="row-sub">${esc(d.note)}</span></div>
          <div class="row-aside">${av(d.by,"sm")}
            ${d.tests.total?`<span class="chip ${d.tests.fail?"hot":"ok"}">${d.tests.pass}/${d.tests.total} scenarios</span>`:`<span class="chip">No tests yet</span>`}
            <span class="chip ${d.state==="Awaiting review"?"info":""}">${esc(d.state)}</span></div></div>`).join("")}</div></section>
    </div>
    <aside class="stack g16">
      <section class="panel"><div class="panel-h"><h3>How the team splits</h3></div><div class="panel-b">
        ${segbar(segs,14)}
        <div class="callout hot" style="margin-top:16px"><b>Two dormant.</b> Farhan installed three agents and hasn't opened one in 14 days. Divya has never installed anything. Both filed the same underlying complaint: their follow-ups happen on WhatsApp and calls, which no agent can see.</div>
        <a class="btn sm" href="#/s/people" style="margin-top:12px">See everyone ${ICON.arrowr}</a></div></section>

      <section class="panel"><div class="panel-h"><h3>Needs a decision</h3>
        <div class="r"><a class="btn sm" href="#/a/requests">All ${open.length}</a></div></div>
        <div class="rows">${open.slice(0,3).map(r=>`<div class="row s-hot link" data-go="#/a/requests"><span class="stripe"></span>
          <div class="row-main"><span class="row-title" style="font-size:13px">${esc(r.t)}</span>
            <span class="row-sub tiny">${esc(P(r.from).n)} · ${esc(A(r.agent).name)} · ${r.votes} people agree</span></div></div>`).join("")}</div></section>

      <section class="panel"><div class="panel-h"><h3>Where the team's time went</h3></div><div class="panel-b">
        ${barlist([
          {l:"Draft Desk", v:412},{l:"Morning Rundown", v:248},{l:"CD Watch", v:186},
          {l:"Deal Room", v:164},{l:"Renewal Defender", v:96},{l:"RFQ Architect", v:74},
          {l:"Quote Comparer", v:61},{l:"Decker", v:28}],{fmt:v=>v+" runs"})}
      </div></section>
    </aside></div></div>`;
};

SCREENS["a/agents"]=()=>`<div class="wrap wide">
  ${phead("Agents","Everything published to Sales, plus what's in the workshop. Version, rollout and access all live here.",
    `<a class="btn pri" href="#/a/build">${ICON.plus}New agent</a>`)}
  <div class="tablewrap"><table>
  <thead><tr><th>Agent</th><th>Author</th><th>Version</th><th>Autonomy</th><th class="num">Installs</th>
    <th class="num">Runs 30d</th><th>Outcome</th><th></th></tr></thead><tbody>
  ${AGENTS.filter(a=>!a.org).map(a=>`<tr>
    <td><span class="cellname">${glyph(a,"sm")}<span class="t">${esc(a.name)}</span>${verChip(a)}</span></td>
    <td><span class="cellname">${av(a.by,"sm")}<span class="tiny">${esc(P(a.by).n)}</span></span></td>
    <td class="mono tiny">v${a.v}</td>
    <td>${autChip(a.autonomy)}</td>
    <td class="num mono">${a.installs}/14</td>
    <td class="num mono">${a.runs30}</td>
    <td><span class="rowflex" style="gap:7px"><span class="mono tiny faint">${fmtMetric(a.metric,a.metric.base)}</span>
      ${ICON.arrowr}<span class="mono tiny" style="color:var(--good);font-weight:600">${fmtMetric(a.metric,a.metric.now)}</span></span></td>
    <td><span class="rowflex" style="gap:5px;justify-content:flex-end">
      <a class="btn sm" href="#/a/analytics/${a.id}">Analytics</a>
      <a class="btn sm ghost" href="#/a/build">Edit</a></span></td></tr>`).join("")}
  ${DRAFTS.map(d=>`<tr style="opacity:.75"><td><span class="cellname">${glyph(d,"sm")}<span class="t">${esc(d.name)}</span>
    <span class="chip ${d.state==="Awaiting review"?"info":""}">${esc(d.state)}</span></span></td>
    <td><span class="cellname">${av(d.by,"sm")}<span class="tiny">${esc(P(d.by).n)}</span></span></td>
    <td class="mono tiny">v${d.v}</td><td><span class="chip">Not set</span></td>
    <td class="num faint">—</td><td class="num faint">—</td>
    <td class="tiny faint">${d.tests.total?`${d.tests.pass}/${d.tests.total} scenarios passing`:"No metric declared"}</td>
    <td><span class="rowflex" style="gap:5px;justify-content:flex-end"><a class="btn sm" href="#/a/test">Test lab</a></span></td></tr>`).join("")}
  </tbody></table></div></div>`;

/* ── the builder ──────────────────────────────────────────────────────── */
const BUILD_CHAT=[
 {role:"agent", t:`What do you want this agent to take off your team's plate? Describe it the way you'd explain it to a new joiner — I'll turn it into a config you can edit.`},
 {role:"me", t:`When a renewal is 90 days out I want it to pull the claims MIS from the TPA, work out the ICR, find which cohort is driving the burn, and tell the AE which two design changes bring the loading down the most. Then write the story we'd tell the client about why utilisation looks the way it does.`},
 {role:"agent", t:`Good. That's a scheduled agent with a threshold trigger, not an on-demand one — it should find the account before the AE does.

Five things I need to pin down, and I've guessed at each:

**1 · What counts as "90 days out"** — I've set T-90 on policy expiry, and made it a setting the AE can move to T-120 or T-60. Renewals cluster on 1 April here, so at T-120 a lot of your book fires in one week. Worth leaving at 90.

**2 · Whose accounts** — defaulting to the AE's own book, with an option for region-wide.

**3 · What it may propose** — I've listed parent co-pay, room-rent capping, maternity sub-limit and corporate buffer resize from the Renewal Defender you already run. Family definition and sum-insured re-tiering exist but change the deal shape, so I've left them off by default.

**4 · When it must stop and ask a human** — I've set ICR above 120% to escalate to the placement desk rather than produce client-facing material. Tell me if that's the wrong line.

**5 · What it's for** — every agent here declares one metric. From what you described, the honest one is **renewal retention by lives**, measured from the policy admin system. Not "hours saved" — that's unfalsifiable.

One thing I'd push back on: you said "write the story we'd tell the client". Drafting the narrative is fine. But it shouldn't state a final renewal premium, because underwriting hasn't signed off at T-90. I've added that as a guardrail.`},
 {role:"me", t:`agree on all of it. keep 120% escalation. and it should never share member-level claim detail with the employer`},
 {role:"agent", t:`Added as a hard guardrail, and I've written two scenarios to test it — one where the client asks directly, one where they ask obliquely ("which department is claiming most?").

Config is drafted. **Twelve scenarios** generated from it, six of them adversarial. Open the Config tab to edit any field, or go straight to the Test Lab and watch it run.`}
];

SCREENS["a/build"]=()=>{
  const tab=state.buildTab;
  return `<div class="wrap wide">
  <div class="phead tight"><div class="phead-row"><div>
    <div class="eyebrow" style="margin-bottom:6px">New agent · draft v0.1</div>
    <h1 style="font-size:27px">Renewal Defender <span class="faint" style="font-weight:400">— second draft</span></h1></div>
    <div class="phead-actions"><button class="btn" data-act="savedraft">Save draft</button>
      <a class="btn pri" href="#/a/test">${ICON.flask}Run the tests ${ICON.arrowr}</a></div></div></div>
  ${note("**Chat drafts, the form refines — the choice you made.** The chat is where a sales lead who can't write a prompt gets to 80%. The Config tab is the actual object: every field the chat filled is editable, and it's the exact schema your developer builds against. Neither half is optional — chat alone gives an admin nothing to review, a form alone gives them a blank page.")}
  <div class="tabs" style="margin:18px 0 18px" role="tablist">
    <button class="tab" role="tab" aria-selected="${tab==="chat"}" data-tab="chat">${ICON.chat}Describe</button>
    <button class="tab" role="tab" aria-selected="${tab==="config"}" data-tab="config">${ICON.spec}Config <span class="cnt">9</span></button>
    <button class="tab" role="tab" aria-selected="${tab==="inputs"}" data-tab="inputs">${ICON.wrench}What users can change <span class="cnt">4</span></button>
    <button class="tab" role="tab" aria-selected="${tab==="outcome"}" data-tab="outcome">${ICON.chart}Outcome metric</button>
  </div>
  ${tab==="chat"?buildChat():tab==="config"?buildConfig():tab==="inputs"?buildInputs():buildOutcome()}
  </div>`;
};

function buildChat(){
  return `<div class="split"><section class="panel">
    <div class="chat">${BUILD_CHAT.map(m=>`<div class="msg ${m.role==="me"?"me":"them"}">
      ${m.role==="me"?av("karan","sm"):`<span class="glyph sm a">${ICON.spark}</span>`}
      <div class="bub">${md(m.t)}</div></div>`).join("")}</div>
    <div class="composer"><textarea class="inp" id="build-composer" rows="1" placeholder="Keep describing, or paste the SOP you already wrote…"></textarea>
      <button class="btn pri" data-act="send">Send</button></div>
  </section>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>What it drafted</h3>
      <div class="r"><span class="chip ok">${ICON.check}9 of 9 fields</span></div></div>
      <div class="rows">
      ${[["Trigger","Schedule · daily 07:00, fires at T-90"],["Reads","4 sources"],["Writes","HubSpot task, Drive"],
         ["Autonomy","Suggest"],["User settings","4 exposed"],["Locked","4 rules"],
         ["Guardrails","3 hard stops"],["Outcome metric","Renewal retention, by lives"],["Scenarios","12 generated"]]
        .map(([k,v])=>`<div class="row s-none" style="padding-block:9px">
          <div class="row-main"><span class="tiny faint">${esc(k)}</span></div>
          <div class="row-aside"><span class="tiny" style="font-weight:600">${esc(v)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><button class="btn sm" data-tab="config">Open the config ${ICON.arrowr}</button></div></section>
    <section class="panel"><div class="panel-h"><h3>Start from something</h3></div>
      <div class="rows">
      ${[["Fork an agent that works","Renewal Defender v3.1 — 9 installs, metric on target"],
         ["Paste an SOP","Turn a written process into a first draft"],
         ["Describe a person's week","Pick a top performer and walk through their Monday"]]
        .map(([t,d])=>`<div class="row s-none link"><div class="row-main"><span class="row-title" style="font-size:13px">${esc(t)}</span>
          <span class="row-sub tiny">${esc(d)}</span></div><div class="row-aside">${ICON.arrowr}</div></div>`).join("")}</div></section>
  </aside></div>`;
}

function buildConfig(){
  const F=(label,hint,ctrl)=>`<div class="field">${label?`<label>${esc(label)}</label>`:""}${ctrl}${hint?`<span class="hint">${esc(hint)}</span>`:""}</div>`;
  return `<div class="split"><div class="stack g16">
  <section class="panel"><div class="panel-h"><h3>Identity</h3><div class="r"><span class="chip plain mono">agent.identity</span></div></div>
    <div class="panel-b g g2" style="gap:16px">
      ${F("Name","Shown in the store and the feed.",`<input class="inp" id="cfg-name" value="Renewal Defender">`)}
      ${F("Category","",`<select class="inp" id="cfg-cat"><option>Retention</option><option>Placement</option><option>Proposals</option><option>Servicing</option></select>`)}
      <div style="grid-column:1/-1">${F("One line for the store card","This is what decides whether anyone installs it.",
        `<textarea class="inp" id="cfg-blurb" rows="2">Walks into every renewal 90 days early with the loss-ratio story already written and a design fix that takes the loading down.</textarea>`)}</div>
    </div></section>

  <section class="panel"><div class="panel-h"><h3>When it runs</h3><div class="r"><span class="chip plain mono">agent.trigger</span></div></div>
    <div class="panel-b stack g16">
      <div class="seg"><button aria-pressed="false">On demand</button><button aria-pressed="true">Schedule</button>
        <button aria-pressed="false">Event</button><button aria-pressed="false">Threshold</button></div>
      <div class="g g3" style="gap:14px">
        ${F("Check","",`<select class="inp" id="cfg-freq"><option>Daily</option><option>Twice daily</option><option>Weekly</option></select>`)}
        ${F("At","",`<input class="inp" id="cfg-time" type="time" value="07:00">`)}
        ${F("Fire when","",`<select class="inp" id="cfg-fire"><option>Account crosses T-90</option><option>Account crosses T-120</option></select>`)}
      </div>
      <div class="callout info">Scheduled agents are what make this a daily habit rather than a tool people forget. Six of your eight live agents are scheduled.</div>
    </div></section>

  <section class="panel"><div class="panel-h"><h3>What it may read and write</h3><div class="r"><span class="chip plain mono">agent.scopes</span></div></div>
    <div class="rows">
      ${[["HubSpot — deals, activities","read","ok"],["TPA claims MIS — cohort level","read","ok"],
         ["CD ledger","read","ok"],["Drive — expiring SOB","read","ok"],
         ["HubSpot — create task","write","hot"],["Drive — create renewal pack","write","hot"],
         ["Gmail — send","denied","bad"]].map(([n,k,c])=>`<div class="row s-none" style="padding-block:11px">
        <div class="row-main"><span class="row-title" style="font-size:13px">${esc(n)}</span></div>
        <div class="row-aside"><span class="chip ${c}">${k==="denied"?ICON.x:k==="write"?ICON.alert:ICON.eye}${esc(k)}</span>
          <button class="switch" role="switch" aria-checked="${k!=="denied"}" aria-label="${esc(n)}" data-act="pause"></button></div></div>`).join("")}
    </div>
    <div class="panel-f"><span class="tiny faint">Each scope inherits the installing user's own permissions. An agent can never read a deal its installer can't.</span></div></section>

  <section class="panel"><div class="panel-h"><h3>Instructions</h3><div class="r"><span class="chip plain mono">agent.instructions</span>
    <button class="btn sm ghost" data-act="ask">${ICON.spark}Tighten this</button></div></div>
    <div class="panel-b">
      <textarea class="inp" id="cfg-instr" rows="9">You defend renewals for a group health broker in India. At T-90, pull the account's claims MIS, compute the incurred claims ratio over every year you have data for, and state which years you used.

Decompose the burn by cohort (age band, relationship, benefit) and identify the two design changes that move the renewal number most. Model each one's effect on the loading and say so in points, not adjectives.

Then write the narrative the AE will use with the client: why utilisation looks the way it does, in language an HR head can repeat to a CFO.

Always: name the period your ICR covers. Never: state a final renewal premium, share member-level claim detail with the employer, or produce client-facing material when ICR is above 120% — escalate to the placement desk instead.</textarea>
      <div class="callout" style="margin-top:12px"><b>Team business context is attached automatically.</b> This agent inherits the Sales team's targets, incentive structure, glossary and renewal calendar — so you don't restate that here. <a href="#/a/context" style="color:var(--brand-ink);font-weight:600">See what it inherits</a>.</div>
    </div></section>

  <section class="panel"><div class="panel-h"><h3>Autonomy and guardrails</h3><div class="r"><span class="chip plain mono">agent.autonomy</span></div></div>
    <div class="panel-b stack g16">
      <div class="rows" style="border:1px solid var(--line);border-radius:9px">
      ${Object.entries(AUT).map(([k,v])=>`<div class="row ${k==="suggest"?"s-ok":"s-none"}" style="padding-block:12px">
        ${k==="suggest"?'<span class="stripe"></span>':""}
        <input type="radio" name="aut" id="aut-${k}" ${k==="suggest"?"checked":""} style="margin-top:3px;accent-color:var(--brand-fill)">
        <div class="row-main"><label for="aut-${k}" class="row-title" style="cursor:pointer">${esc(v.l)}</label>
          <span class="row-sub">${esc(v.d)}</span></div>
        <div class="row-aside"><span class="tiny faint">${k==="suggest"?"3 of your agents":k==="draft"?"4 of your agents":"1 of your agents"}</span></div></div>`).join("")}
      </div>
      <div class="field"><label>Hard stops — the agent refuses, every time</label>
        <div class="rows" style="border:1px solid var(--line);border-radius:9px">
        ${["Never states a final renewal premium — underwriting hasn't signed off at T-90",
           "Never shares member-level claim detail with the employer",
           "Escalates to the placement desk above 120% ICR instead of producing client material"]
          .map(g=>`<div class="row s-bad" style="padding-block:10px"><span class="stripe"></span>
            <div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(g)}</span></div>
            <div class="row-aside"><span class="chip bad">${ICON.lock}2 tests</span></div></div>`).join("")}
        </div><span class="hint">Each hard stop generates its own adversarial scenarios in the Test Lab. You can't publish with a failing guardrail test.</span></div>
    </div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Publish checklist</h3></div>
      <div class="rows">
      ${[["ok","Name and store card written"],["ok","Trigger set"],["ok","Scopes approved"],
         ["ok","Instructions drafted"],["ok","Outcome metric declared"],["ok","4 user settings exposed"],
         ["hot","12 scenarios generated · not yet run"],["none","Rollout audience not chosen"]]
        .map(([s,t])=>`<div class="row s-none" style="padding-block:9px">
          <span class="chip ${s==="ok"?"ok":s==="hot"?"hot":""}" style="border-radius:50%;padding:3px;width:20px;height:20px;justify-content:center">
            ${s==="ok"?ICON.check:s==="hot"?ICON.alert:""}</span>
          <div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(t)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><a class="btn sm pri" href="#/a/test">Run the tests ${ICON.arrowr}</a></div></section>
    <section class="panel"><div class="panel-h"><h3>${ICON.spark} What it noticed</h3></div>
      <div class="panel-b stack g12">
        <div class="callout hot"><b>Your glossary isn't attached.</b> Loss Ratio Explainer failed a scenario last week by confusing the CD balance with the corporate buffer. Attach the Sales glossary to stop that class of error.
          <div style="margin-top:9px"><button class="btn sm" data-act="attach">Attach glossary</button></div></div>
        <div class="callout info"><b>Two of your four user settings are never changed.</b> On Renewal Defender v3.1, 9 of 9 installers left “Design levers” and “Scope” at the default. Consider locking them and cutting the install form in half.</div>
      </div></section>
  </aside></div>`;
}

function buildInputs(){
  const rows=[
   {k:"lead", l:"Start defending at", t:"Choice", v:"T-120 / T-90 / T-60", d:"T-90", why:"Renewals cluster on 1 April. At T-120 half the book fires in one week."},
   {k:"scope", l:"Cover", t:"Choice", v:"My accounts / +overflow / My region", d:"My accounts", why:""},
   {k:"icr_alarm", l:"Raise an alarm above ICR", t:"Choice", v:"75 / 85 / 95 / 110 %", d:"85%", why:""},
   {k:"levers", l:"Design levers it may propose", t:"Multi-select", v:"7 options", d:"4 selected", why:"Family definition and sum-insured re-tiering change the deal shape — off by default."}
  ];
  return `<div class="stack g16">
  <div class="callout"><b>This is the part no shipping platform has.</b> Everywhere else, a shared agent is either one-size-fits-all or each person forks their own copy and the team's practice fragments. Here the author decides which knobs are safe to turn, and everything else stays theirs.</div>
  <section class="panel"><div class="panel-h"><h3>Exposed to the installer</h3>
    <div class="r"><button class="btn sm" data-act="addparam">${ICON.plus}Add a setting</button></div></div>
    <div class="tablewrap" style="border:0;border-radius:0"><table>
    <thead><tr><th>Setting</th><th>Type</th><th>Options</th><th>Default</th><th>Why it's open</th><th></th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td style="font-weight:600">${esc(r.l)}<div class="code" style="margin-top:3px">${esc(r.k)}</div></td>
      <td><span class="chip">${esc(r.t)}</span></td><td class="tiny muted">${esc(r.v)}</td>
      <td class="mono tiny">${esc(r.d)}</td><td class="tiny faint" style="max-width:260px">${esc(r.why||"—")}</td>
      <td><button class="btn sm ghost" data-act="edit">Edit</button></td></tr>`).join("")}
    </tbody></table></div></section>
  <section class="panel"><div class="panel-h"><h3>Locked</h3><div class="r"><span class="chip">${ICON.lock}4 rules</span></div></div>
    <div class="rows">
    ${[["ICR calculation and the cohort decomposition","Changing this changes what the number means. Nobody gets to."],
       ["Which sources it reads","Access is granted at the org level, not per person."],
       ["The three hard stops","Compliance. Not negotiable, not per-user."],
       ["Tone and length of the client narrative","This is the part that took four iterations to get right."]]
      .map(([t,d])=>`<div class="row s-none"><div class="row-main"><span class="row-title">${esc(t)}</span>
        <span class="row-sub">${esc(d)}</span></div><div class="row-aside">${ICON.lock}</div></div>`).join("")}</div>
    <div class="panel-f"><span class="tiny faint">A user who disagrees with a locked rule can file a request. It lands in your inbox with the reason and how many teammates agree.</span></div></section>
  <section class="panel"><div class="panel-h"><h3>What the install form will look like</h3>
    <div class="r"><span class="chip plain">${ICON.eye}Preview</span></div></div>
    <div class="panel-b g g2" style="gap:16px;background:var(--surface-2);border-radius:0 0 9px 9px">
      ${rows.map(r=>`<div class="field"><label>${esc(r.l)}</label>
        <select class="inp" id="prev-${r.k}" disabled><option>${esc(r.d)}</option></select>
        ${r.why?`<span class="hint">${esc(r.why)}</span>`:""}</div>`).join("")}
    </div></section></div>`;
}

function buildOutcome(){
  return `<div class="split"><div class="stack g16">
  <section class="panel"><div class="panel-h"><h3>What is this agent for?</h3>
    <div class="r"><span class="chip bad">${ICON.alert}Required to publish</span></div></div>
    <div class="panel-b stack g16">
      <div class="field"><label>Outcome metric</label>
        <select class="inp" id="om-metric">
          <option>Renewal retention, by lives</option><option>Renewal retention, by premium</option>
          <option>Average loading negotiated down, in points</option><option>Renewals closed before T-30</option></select>
        <span class="hint">One metric. If you can name three, you're building three agents.</span></div>
      <div class="g g3" style="gap:14px">
        <div class="field"><label>Direction</label><select class="inp" id="om-dir"><option>Higher is better</option><option>Lower is better</option></select></div>
        <div class="field"><label>Baseline</label><input class="inp" id="om-base" value="84%"><span class="hint">Feb–Sep 2026</span></div>
        <div class="field"><label>Target</label><input class="inp" id="om-target" value="90%"></div>
      </div>
      <div class="field"><label>Where the number comes from</label>
        <select class="inp" id="om-src"><option>Policy admin — lives retained at renewal ÷ lives at expiry</option>
          <option>HubSpot — closed-won renewal deals</option><option>Manual monthly upload</option></select>
        <span class="hint">Instrumented, not self-reported. “Hours saved” is not on this list on purpose — the research on enterprise AI ROI is that self-reported time savings don't survive contact with an actual P&amp;L.</span></div>
      <div class="field"><label>Attribution window</label>
        <select class="inp" id="om-attr"><option>Compare installers against non-installers, same team, same quarter</option>
          <option>Before/after on the installer only</option><option>Team aggregate only</option></select>
        <span class="hint">The first option is the only honest one while some of the team hasn't installed. It stops being available once adoption passes ~85%.</span></div>
    </div></section>
  ${note("**Requiring a metric at publish time is the platform's spine.** It forces the author to say what good looks like, it gives the super admin a real adoption story, and it's what lets you kill an agent that nobody's outcomes improved. Without it you're back to counting messages, which every incumbent already does badly.")}
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>How this will read once it's live</h3></div>
      <div class="panel-b">${(()=>{const ref=A("renewal")||AGENTS[0];
        return ref?metricChart(ref.metric,{h:180})
          :`<div class="callout">No live agents yet. Once this publishes, its metric charts here — baseline, target, and every month after.</div>`;})()}</div></section>
    <section class="panel"><div class="panel-h"><h3>Metrics already claimed</h3></div>
      <div class="rows">${AGENTS.filter(a=>!a.org).slice(0,5).map(a=>`<div class="row s-none" style="padding-block:10px">
        ${glyph(a,"sm")}<div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(a.metric.name)}</span>
        <span class="tiny faint">${esc(a.name)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Two agents can share a metric. Attribution then splits by which one the user acted on.</span></div></section>
  </aside></div>`;
}
