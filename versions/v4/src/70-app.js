
/* ═══════════════════════════ navigation ═══════════════════════════ */
const ROLES={
 member:{who:"rhea", label:"Member", nav:[
   {s:"Your day"},
   {r:"m/today", t:"Today", i:"home", c:()=>state.stage>=3?5:FEED.reduce((n,f)=>n+(f.items||[]).length,0), hot:true},
   {r:"m/approvals", t:"Approvals", i:"inbox", c:()=>APPROVALS.filter(a=>!state.approved.has(a.id)).length, hot:true},
   {r:"m/waiting", t:"Waiting on you", i:"alertnav", c:()=>WAITING.filter(w=>!state.answered.has(w.id)).length, hot:true},
   {r:"m/thread/rundown", t:"Threads", i:"chat"},
   {s:"Agents"},
   {r:"m/store", t:"Agent store", i:"grid"},
   {r:"m/installed", t:"My agents", i:"layers", c:()=>state.installed.size},
   {s:"You"},
   {r:"m/impact", t:"What changed for me", i:"chart"}
 ]},
 admin:{who:"karan", label:"Team admin", nav:[
   {s:"Sales"},
   {r:"a/pulse", t:"Team pulse", i:"home"},
   {r:"a/agents", t:"Agents", i:"layers", c:()=>AGENTS.filter(a=>!a.org).length},
   {r:"a/requests", t:"Requests", i:"inbox", c:()=>REQUESTS.filter(r=>r.state==="open").length, hot:true},
   {s:"Running now"},
   {r:"a/runs", t:"Run log", i:"list", c:()=>RUNS.filter(r=>r.state==="blocked"||r.state==="failed").length, hot:true},
   {r:"a/schedules", t:"Schedules & budget", i:"clocknav", c:()=>TRIGGERS.filter(t=>t.state==="on").length},
   {s:"Build"},
   {r:"a/new", t:"Create an agent", i:"plusnav"},
   {r:"a/build", t:"Agent builder", i:"wrench"},
   {r:"a/test", t:"Test lab", i:"flask", c:()=>DRAFTS[0]?DRAFTS[0].tests.total:0},
   {r:"a/publish", t:"Publish & rollout", i:"spark"},
   {r:"a/share", t:"Share & ownership", i:"share"},
   {s:"Measure"},
   {r:"a/analytics/rundown", t:"Agent analytics", i:"chart"},
   {r:"a/context", t:"Business context", i:"book"}
 ]},
 super:{who:"ananya", label:"Super admin", nav:[
   {s:"Plum"},
   {r:"s/overview", t:"Organisation", i:"home"},
   {r:"s/agents", t:"All agents", i:"layers", c:()=>state.stage>=3?22:AGENTS.length},
   {r:"s/people", t:"People", i:"users", c:()=>state.stage>=3?78:(state.stage>=1?15:1)},
   {s:"Administer"},
   {r:"s/teams", t:"Teams & rollout", i:"grid"},
   {r:"s/connections", t:"Connections & audit", i:"plug"},
   {r:"s/spend", t:"Spend & governance", i:"coin"}
 ]}
};
const HANDOFF_NAV=[{s:"For the developer"},
 {r:"h/spec", t:"Object model", i:"spec"},
 {r:"h/flows", t:"Key flows", i:"layers"},
 {r:"h/open", t:"Open questions", i:"q"}];

const HOME={member:"#/m/today", admin:"#/a/pulse", super:"#/s/overview"};

function renderRoles(){
  $("#roleswitch").innerHTML=Object.entries(ROLES).map(([k,v])=>{
    const p=P(v.who);
    /* v3: at Day 0 only the super admin has an account */
    const locked=state.stage===0&&k!=="super";
    return `<button data-role="${k}" aria-pressed="${state.role===k}"${locked
      ?` aria-disabled="true" title="Unlocks when the super admin finishes setup — use the Journey bar"`
      :` title="${esc(p.n)} — ${esc(p.r)}"`}>
      <span class="rs-dot"></span><span class="rsname">${esc(v.label)}</span>${locked?ICON.lock:""}</button>`}).join("");
}

function renderRail(){
  const R=ROLES[state.role], p=P(R.who);
  const item=n=>{
    if(n.s) return `<div class="rail-sec eyebrow">${esc(n.s)}</div>`;
    const c=typeof n.c==="function"?n.c():n.c;
    const on=state.route===n.r||state.route.startsWith(n.r.split("/").slice(0,2).join("/")+"/")&&n.r.split("/").length>2
             ||state.route.split("/").slice(0,2).join("/")===n.r.split("/").slice(0,2).join("/")&&n.r.split("/").length===2&&state.route.split("/").length===2;
    return `<a class="navitem${state.route===n.r||routeKey(state.route)===routeKey(n.r)?" on":""}" href="#/${n.r}">
      ${ICON[n.i]||""}<span>${esc(n.t)}</span>${c?`<span class="cnt${n.hot?" hot":""}">${c}</span>`:""}</a>`;
  };
  $("#rail").innerHTML=`
    <div class="rail-persona">${av(R.who,"lg")}
      <div style="min-width:0"><div class="nm">${esc(p.n)}</div>
        <div class="tiny faint">${esc(p.r)}</div></div></div>
    ${R.nav.map(item).join("")}
    ${HANDOFF_NAV.map(item).join("")}`;
}

const routeKey=r=>r.split("/").slice(0,2).join("/");

function render(){
  const route=(location.hash||HOME[state.role]).replace(/^#\//,"");
  state.route=route;
  const parts=route.split("/"), key=parts.slice(0,2).join("/"), arg=parts[2];
  // keep the role switcher honest about which surface you're on
  const pre=parts[0];
  if(pre==="m"&&state.role!=="member") state.role="member";
  if(pre==="a"&&state.role!=="admin")  state.role="admin";
  if(pre==="s"&&state.role!=="super")  state.role="super";
  renderRoles(); renderRail();
  const fn=SCREENS[key];
  $("#main").innerHTML = fn? fn(arg) : `<div class="wrap"><div class="empty">
    Nothing at <span class="code">#/${esc(route)}</span>. <a href="${HOME[state.role]}" style="color:var(--brand-ink);font-weight:600">Go home</a>.</div></div>`;
  window.scrollTo({top:0,behavior:"instant"});
}

/* ═══════════════════════════ modals ═══════════════════════════ */
function configureModal(id){
  const a=A(id); if(!a) return;
  const ctrl=p=>{
    if(p.type==="toggle") return `<button class="switch" role="switch" aria-checked="${p.val?"true":"false"}" data-act="pause" aria-label="${esc(p.label)}"></button>`;
    if(p.type==="multi") return `<div class="rowflex" style="gap:6px">${p.opts.map(o=>{
      const on=p.val.includes(o);
      return `<button class="chip ${on?"solid":""}" data-act="toggleopt" style="cursor:pointer">${on?ICON.check:""}${esc(o)}</button>`}).join("")}</div>`;
    if(p.type==="select") return `<select class="inp" id="cf-${a.id}-${p.k}">${p.opts.map(o=>
      `<option${o===p.val?" selected":""}>${esc(o)}</option>`).join("")}</select>`;
    if(p.type==="time") return `<input class="inp" id="cf-${a.id}-${p.k}" type="time" value="${esc(p.val)}">`;
    return `<input class="inp" id="cf-${a.id}-${p.k}" value="${esc(p.val)}">`;
  };
  modal(`<div class="panel-h" style="border-radius:11px 11px 0 0">${glyph(a,"sm")}
      <div><h3>${esc(a.name)} — your settings</h3>
        <div class="tiny faint" style="margin-top:2px">Changes apply only to your copy. ${a.installs-1} teammates have their own.</div></div>
      <div class="r"><button class="btn sm ghost" data-act="close">${ICON.x}</button></div></div>
    <div class="modal-b stack g20">
      ${a.params.map(p=>`<div class="field"><label>${esc(p.label)}</label>${ctrl(p)}
        ${p.hint?`<span class="hint">${esc(p.hint)}</span>`:""}</div>`).join("")}
      <hr class="hr">
      <div class="field"><label>${ICON.lock} Set by ${esc(P(a.by).n)} — not yours to change</label>
        <div class="stack g8">${a.locked.map(l=>`<div class="tiny faint">· ${esc(l)}</div>`).join("")}</div>
        <div style="margin-top:9px"><button class="btn sm" data-act="suggest" data-id="${a.id}">Suggest a change</button></div></div>
    </div>
    <div class="panel-f"><button class="btn pri" data-act="savecfg">Save</button>
      <button class="btn ghost" data-act="close">Cancel</button>
      <span class="topbar-spacer"></span>
      <span class="tiny faint">Next run ${a.trigger.kind==="Schedule"?"tomorrow 08:15":"on its next trigger"}</span></div>`);
}

function installModal(id){
  const a=A(id); if(!a) return;
  /* B7 · The competitor's onboarding sells outcomes for five steps before it asks for a
     single permission, and its scope modal pre-selects "unrestricted access to everything"
     as Recommended. Both halves are inverted here: show the work first, then ask for one
     source at a time. */
  modal(`<div class="panel-h" style="border-radius:11px 11px 0 0">${glyph(a)}
      <div><h3>Install ${esc(a.name)}</h3>
        <div class="tiny faint" style="margin-top:2px">Built by ${esc(P(a.by).n)} · owned by ${esc(a.org?"Plum":"Sales")}</div></div>
      <div class="r"><button class="btn sm ghost" data-act="close">${ICON.x}</button></div></div>
    <div class="modal-b stack g16">
      <p style="font-size:13.5px;line-height:1.65">${esc(a.blurb)}</p>

      <section class="panel" style="border-color:var(--brand-line)">
        <div class="panel-h" style="background:var(--surface-2)">
          <span class="chip ok">${ICON.eye}Before you decide</span>
          <div><h3 style="font-size:13.5px">What it would have told you this morning</h3></div></div>
        <div class="panel-b stack g10">
          ${state.backfill?`<div class="rows" style="border:1px solid var(--line);border-radius:9px">
            ${BACKFILL.map(b=>`<div class="row s-${b.s}" style="padding-block:11px"><span class="stripe"></span>
              <div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(b.t)}</span>
              <span class="tiny faint">${esc(b.d)}</span></div></div>`).join("")}</div>
            <span class="tiny faint">Run on your own data, read-only, just now. It changed nothing and it doesn't count against anyone's budget.</span>`
          :`<p class="tiny" style="line-height:1.65;color:var(--ink-2)">Run it once on your own inbox, calendar and deals — read-only, nothing written, nothing sent. You see the real output before you grant anything.</p>
            <button class="btn pri sm" data-act="backfill" data-id="${a.id}">${ICON.spark}Show me mine</button>`}
        </div></section>

      <div class="field"><label>What it needs to read — decline any of them</label>
        <div class="rows" style="border:1px solid var(--line);border-radius:9px">
          ${a.reads.map((rd,i)=>`<div class="row s-none" style="padding-block:11px"><div class="row-main">
            <span class="row-title" style="font-size:12.5px">${esc(rd)}</span>
            <span class="row-sub tiny">${esc(SCOPE_PLAIN[i%SCOPE_PLAIN.length])}</span></div>
            <div class="row-aside"><button class="switch" role="switch" aria-checked="true" aria-label="Allow ${esc(rd)}" data-act="pause"></button></div></div>`).join("")}
        </div>
        <span class="hint">Each grant is yours, not the author's — it can never read a deal, a thread or a file you couldn't open yourself. Decline one it needs and it says what it can't do rather than guessing.</span></div>

      <div class="rows" style="border:1px solid var(--line);border-radius:9px">
        <div class="row s-${a.autonomy==="auto"?"bad":a.autonomy==="draft"?"hot":"ok"}" style="padding-block:11px">
          <span class="stripe"></span><div class="row-main">
          <span class="tiny faint">What it does on its own</span>
          <span class="row-sub" style="color:var(--ink)">${esc(a.plain.trust)}</span></div></div>
        <div class="row s-none" style="padding-block:11px"><div class="row-main">
          <span class="tiny faint">It will write</span>
          <span class="row-sub" style="color:var(--ink)">${a.writes.length?a.writes.join(" · "):"Nothing"}</span></div></div>
      </div>
      <div class="callout info"><b>Defaults are already set</b> — ${a.params.length} settings are yours to change, now or later.
        ${a.trigger.kind==="Schedule"?"And it runs once for you straight after install, so you don't wait until tomorrow to see it work.":""}</div>
    </div>
    <div class="panel-f"><button class="btn pri" data-act="doinstall" data-id="${a.id}">Install and start</button>
      <button class="btn" data-act="configure" data-id="${a.id}">Set it up first</button>
      <span class="topbar-spacer"></span>
      <button class="btn ghost" data-act="close">Cancel</button></div>`);
}

function suggestModal(id){
  const a=A(id); if(!a) return;
  modal(`<div class="panel-h" style="border-radius:11px 11px 0 0">
      <div><h3>Suggest a change to ${esc(a.name)}</h3>
        <div class="tiny faint" style="margin-top:2px">Goes to ${esc(P(a.by).n)}. Your teammates can add their vote.</div></div>
      <div class="r"><button class="btn sm ghost" data-act="close">${ICON.x}</button></div></div>
    <div class="modal-b stack g16">
      <div class="field"><label>What's wrong with it</label>
        <select class="inp" id="sg-kind"><option>It should do something differently</option>
          <option>It's getting something wrong</option><option>I want a setting I can't change</option>
          <option>I've stopped using it</option></select></div>
      <div class="field"><label>In one line</label>
        <input class="inp" id="sg-title" placeholder="e.g. Let me set a different tone per client"></div>
      <div class="field"><label>Why it matters to you</label>
        <textarea class="inp" id="sg-body" rows="4" placeholder="The way I write to a 200-person startup and to a listed company's CHRO are different documents…"></textarea>
        <span class="hint">Concrete beats polite. The requests that ship are the ones that name a situation.</span></div>
    </div>
    <div class="panel-f"><button class="btn pri" data-act="dosuggest">Send to ${esc(P(a.by).n.split(" ")[0])}</button>
      <button class="btn ghost" data-act="close">Cancel</button></div>`);
}

/* ═══════════════════════════ interactions ═══════════════════════════ */
document.addEventListener("click",e=>{
  const roleBtn=e.target.closest("[data-role]");
  if(roleBtn){
    if(roleBtn.getAttribute("aria-disabled")==="true"){
      toast("At Day 0 only the super admin has an account — finish setup first"); return;
    }
    state.role=roleBtn.dataset.role; location.hash=HOME[state.role]; return;
  }

  const jBtn=e.target.closest("[data-stage]");
  if(jBtn){ setStage(+jBtn.dataset.stage,true); toast(JOURNEY[state.stage].title); return; }

  const tabBtn=e.target.closest("[data-tab]");
  if(tabBtn){ state.buildTab=tabBtn.dataset.tab; render(); return; }

  const act=e.target.closest("[data-act]");
  if(act){
    const k=act.dataset.act, id=act.dataset.id;
    if(k==="close"){ closeModal(); return; }
    if(k==="step"){ stepModal(id); return; }
    if(k==="dostep"){ completeStep(id); return; }
    if(k==="closenav"){ closeModal(); location.hash=id.replace(/^#/,""); return; }
    if(k==="install"){ state.backfill=false; installModal(id); return; }
    if(k==="backfill"){ state.backfill=true; installModal(id); toast("Ran read-only on your data — nothing written, nothing billed"); return; }
    if(k==="runfilter"){ state.runFilter=id; render(); return; }
    if(k==="answer"){ toast("Answered. The run resumes from where it stopped — it doesn't start again."); return; }
    if(k==="doanswer"){ state.answered.add(id); closeModal(); toast("Sent. The run picks up from the step it stopped on."); render(); return; }
    if(k==="waiting"){ waitingModal(id); return; }
    if(k==="trigpause"){ const t=TRIGGERS.find(x=>x.id===id); if(t){ t.state=t.state==="on"?"paused":"on";
      toast(t.state==="on"?`Resumed — next run ${t.next}`:`Paused. Nothing else changes: the agent, its installs and its history stay.`); render(); } return; }
    if(k==="trigstop"){ const t=TRIGGERS.find(x=>x.id===id); if(t){ stopTriggerModal(id); } return; }
    if(k==="dostop"){ TRIGGERS=TRIGGERS.filter(x=>x.id!==id); closeModal(); toast("Stopped. One click, from a labelled button — that's the whole point."); render(); return; }
    if(k==="dryrun"){ state.dryRun=true; toast("Dry run on real data, read-only — 38 seconds"); render(); return; }
    if(k==="proposal"){ toast("Sent to the test lab as a proposed version. Nothing changes until you publish it."); return; }
    if(k==="rollback"){ toast("Rolled back to v4.1. 12 installs moved in 9 seconds; nobody's settings were touched."); return; }
    if(k==="doinstall"){ state.installed.add(id); closeModal(); toast(`${A(id).name} installed — first run on its next trigger`); render(); return; }
    if(k==="uninstall"){ state.installed.delete(id); toast(`Uninstalled. You'll be asked why.`); render(); return; }
    if(k==="configure"){ configureModal(id); return; }
    if(k==="savecfg"){ closeModal(); toast("Saved. Applies from the next run."); return; }
    if(k==="suggest"){ suggestModal(id); return; }
    if(k==="dosuggest"){ closeModal(); toast("Sent. You'll see it in the release note if it ships."); return; }
    if(k==="approve"){ state.approved.add(id); toast("Sent."); render(); return; }
    if(k==="reject"){ state.approved.add(id); toast("Binned. Draft Desk will ask why."); render(); return; }
    if(k==="approveall"){ APPROVALS.forEach(a=>state.approved.add(a.id)); toast("All sent."); render(); return; }
    if(k==="runtests"){ state.testRun=true; toast("Ran 14 scenarios in 41 seconds"); render(); return; }
    if(k==="publish"){ toast("Published v4.2 to 14 people"); return; }
    if(k==="toggleopt"){ act.classList.toggle("solid"); return; }
    if(k==="pause"){ const on=act.getAttribute("aria-checked")==="true"; act.setAttribute("aria-checked",String(!on)); return; }
    if(k==="send"){ const ta=act.closest(".composer")?.querySelector("textarea");
      if(ta&&ta.value.trim()){ ta.value=""; toast("Sent — this is a prototype, there's no model behind it"); } return; }
    // everything else is a prototype stub
    toast("Prototype — this control isn't wired up");
    return;
  }

  const sw=e.target.closest(".switch");
  if(sw){ const on=sw.getAttribute("aria-checked")==="true"; sw.setAttribute("aria-checked",String(!on)); return; }

  const segBtn=e.target.closest(".seg button, .roleswitch button");
  if(segBtn&&segBtn.closest(".seg")){ [...segBtn.parentElement.children].forEach(b=>b.setAttribute("aria-pressed","false"));
    segBtn.setAttribute("aria-pressed","true"); return; }

  const go=e.target.closest("[data-go]");
  if(go&&!e.target.closest("a,button")){ location.hash=go.dataset.go; return; }
});

$("#notesbtn").addEventListener("click",()=>{
  state.notes=!state.notes;
  document.body.classList.toggle("notes-on",state.notes);
  $("#notesbtn").setAttribute("aria-pressed",String(state.notes));
  toast(state.notes?"Design notes on":"Design notes off");
});

$("#themebtn").addEventListener("click",()=>{
  const cur=document.documentElement.getAttribute("data-theme");
  const next = cur==="dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme",next);
});

window.addEventListener("hashchange",render);

/* ── version switcher ────────────────────────────────────────────────
   Each version folder carries this file with its own THIS_VERSION.
   Switching keeps the current route, so the same screen can be
   compared across versions. */
const THIS_VERSION="v4";
(function(){
  const sel=$("#versel"); if(!sel) return;
  sel.value=THIS_VERSION;
  sel.addEventListener("change",()=>{
    location.href=`../${sel.value}/bench.html`+location.hash;
  });
})();

if(!location.hash) location.hash=HOME[state.role];
render();
</script>
