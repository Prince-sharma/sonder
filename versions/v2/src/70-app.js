
/* ═══════════════════════════ navigation ═══════════════════════════ */
const ROLES={
 member:{who:"rhea", label:"Member", nav:[
   {s:"Your day"},
   {r:"m/today", t:"Today", i:"home", c:"5", hot:true},
   {r:"m/approvals", t:"Approvals", i:"inbox", c:()=>APPROVALS.filter(a=>!state.approved.has(a.id)).length, hot:true},
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
   {r:"a/agents", t:"Agents", i:"layers", c:"8"},
   {r:"a/requests", t:"Requests", i:"inbox", c:"4", hot:true},
   {s:"Build"},
   {r:"a/build", t:"Agent builder", i:"wrench"},
   {r:"a/test", t:"Test lab", i:"flask", c:"14"},
   {r:"a/publish", t:"Publish & rollout", i:"spark"},
   {s:"Measure"},
   {r:"a/analytics/rundown", t:"Agent analytics", i:"chart"},
   {r:"a/context", t:"Business context", i:"book"}
 ]},
 super:{who:"ananya", label:"Super admin", nav:[
   {s:"Plum"},
   {r:"s/overview", t:"Organisation", i:"home"},
   {r:"s/agents", t:"All agents", i:"layers", c:"22"},
   {r:"s/people", t:"People", i:"users", c:"78"},
   {s:"Administer"},
   {r:"s/teams", t:"Teams & rollout", i:"grid"},
   {r:"s/connections", t:"Connections & audit", i:"plug"}
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
    return `<button data-role="${k}" aria-pressed="${state.role===k}" title="${esc(p.n)} — ${esc(p.r)}">
      <span class="rs-dot"></span><span class="rsname">${esc(v.label)}</span></button>`}).join("");
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
  modal(`<div class="panel-h" style="border-radius:11px 11px 0 0">${glyph(a)}
      <div><h3>Install ${esc(a.name)}</h3>
        <div class="tiny faint" style="margin-top:2px">Built by ${esc(P(a.by).n)}</div></div>
      <div class="r"><button class="btn sm ghost" data-act="close">${ICON.x}</button></div></div>
    <div class="modal-b stack g16">
      <p style="font-size:13.5px;line-height:1.65">${esc(a.blurb)}</p>
      <div class="rows" style="border:1px solid var(--line);border-radius:9px">
        <div class="row s-none" style="padding-block:11px"><div class="row-main">
          <span class="tiny faint">It will read</span>
          <span class="row-sub" style="color:var(--ink)">${a.reads.join(" · ")}</span></div></div>
        <div class="row s-none" style="padding-block:11px"><div class="row-main">
          <span class="tiny faint">It will write</span>
          <span class="row-sub" style="color:var(--ink)">${a.writes.length?a.writes.join(" · "):"Nothing"}</span></div></div>
        <div class="row s-${a.autonomy==="auto"?"bad":a.autonomy==="draft"?"hot":"ok"}" style="padding-block:11px">
          <span class="stripe"></span><div class="row-main">
          <span class="tiny faint">What it does on its own</span>
          <span class="row-sub" style="color:var(--ink)">${esc(a.plain.trust)}</span></div></div>
      </div>
      <div class="callout info"><b>Defaults are already set.</b> You can install now and change anything later — ${a.params.length} settings are yours.</div>
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
  if(roleBtn){ state.role=roleBtn.dataset.role; location.hash=HOME[state.role]; return; }

  const tabBtn=e.target.closest("[data-tab]");
  if(tabBtn){ state.buildTab=tabBtn.dataset.tab; render(); return; }

  const act=e.target.closest("[data-act]");
  if(act){
    const k=act.dataset.act, id=act.dataset.id;
    if(k==="close"){ closeModal(); return; }
    if(k==="install"){ installModal(id); return; }
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
const THIS_VERSION="v2";
(function(){
  const sel=$("#versel"); if(!sel) return;
  sel.value=THIS_VERSION;
  sel.addEventListener("change",()=>{
    location.href=`../${sel.value}/bench.html`+location.hash;
  });
})();

if(!location.hash) location.hash=HOME.member;
render();
</script>
