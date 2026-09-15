
/* ═══════════════════════════════════════════════════════════════════════════
   V4 · THE CREATE MOMENT, AND SHARING AS A TRANSFER OF CUSTODY
   A1/A2 · "Create Agent does not open a wizard — it instantly creates a working
        agent and drops you in a full workspace. Zero-to-agent in ~12 seconds,
        before I had told it anything." The empty workspace then nudges four
        next steps in the product's own voice — the journal marks it
        "steal this pattern verbatim".
   B1  · And the finding that inverts: nothing crosses personal → team. Org
        sharing was performed and verified; the team's agent list, home, triggers
        and knowledge all stayed empty. There is no move-to-team control
        anywhere in that product. Sharing is permission; it is never transfer.
   ═══════════════════════════════════════════════════════════════════════════ */

const NUDGES=[
 {k:"trigger", i:"clock", t:"Tell me when to run",
  v:"“I want you to start working without anyone asking.”",
  d:"Type it in English — “every weekday at 8:15”. You'll see what that costs a month before you save it.", to:"#/a/build"},
 {k:"know", i:"book", t:"Give me the team's context",
  v:"“Everything you'd tell a new joiner in their first week.”",
  d:"Sales' targets, incentive structure, glossary and renewal calendar attach automatically. Add what's specific to this job.", to:"#/a/context"},
 {k:"open", i:"wrench", t:"Decide what your team can change",
  v:"“Which knobs are safe for someone who isn't you?”",
  d:"Everything else stays yours. This is the decision that stops fourteen people forking fourteen variants.", to:"#/a/build"},
 {k:"metric", i:"chart", t:"Say what good looks like",
  v:"“One number this should move.”",
  d:"Required before you can publish. If you can name three, you're building three agents.", to:"#/a/build"}
];

SCREENS["a/new"]=()=>{
  const done=state.nudgeDone||new Set();
  return `<div class="wrap">
  <div class="phead tight"><div class="phead-row"><div>
    <div class="eyebrow" style="margin-bottom:6px">Created just now · draft v0.1 · only you can see it</div>
    <h1 style="font-size:27px">Untitled agent <span class="faint" style="font-weight:400">— name it whenever</span></h1>
    <p class="sub">It already exists. It has a workspace, a version and a place in your drafts. Nothing you do next is a form you have to finish.</p></div>
    <div class="phead-actions"><button class="btn" data-act="discard">Discard</button>
      <a class="btn pri" href="#/a/build">Open the builder ${ICON.arrowr}</a></div></div></div>
  ${note("**One click, and the object exists.** The teardown's most-liked moment: Create Agent opens no wizard — it makes a working agent in about twelve seconds and drops you into its workspace, which then suggests four next steps in the product's own voice. The journal's note reads “steal this pattern verbatim”. This is that, mapped onto Bench's four objects instead of theirs.")}

  <div class="cards" style="margin:18px 0 24px">
    ${NUDGES.map(n=>`<article class="card link" data-go="${n.to}">
      <div class="card-h"><span class="glyph ${done.has(n.k)?"a":"e"}">${ICON[n.i]}</span>
        <div style="min-width:0;flex:1"><div class="t">${esc(n.t)}</div>
          <div class="by">${esc(n.v)}</div></div>
        ${done.has(n.k)?`<span class="chip ok">${ICON.check}</span>`:""}</div>
      <p class="card-d">${esc(n.d)}</p>
      <div class="card-f"><span class="tiny faint">${done.has(n.k)?"Done":"Not yet"}</span>
        <span class="btn sm">${done.has(n.k)?"Change":"Do it"} ${ICON.arrowr}</span></div></article>`).join("")}
  </div>

  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Or don't start from nothing</h3></div>
      <div class="rows">
      ${[["Describe it in chat","The fastest route, and the one this product is built around. Say what the job is; it interviews you and fills the config.","spark"],
         ["Fork one that works","Renewal Defender v3.1 — 9 installs, metric on target. You get its config, not its history.","layers"],
         ["Paste an SOP","If the process is already written down, that written-down thing is a first draft.","spec"],
         ["Walk a person's week","Pick whoever does this best and describe their Monday. The platform asks the questions.","users"]]
        .map(([t,d,i])=>`<div class="row s-none link"><div class="row-main">
          <span class="row-title" style="font-size:13px">${ICON[i]} ${esc(t)}</span>
          <span class="row-sub">${esc(d)}</span></div><div class="row-aside">${ICON.arrowr}</div></div>`).join("")}</div></section>

    <section class="panel"><div class="panel-h"><h3>Your unfinished drafts</h3>
      <div class="r"><span class="chip hot">${ICON.alert}1 stalled</span></div></div>
      <div class="rows">
        <div class="row s-hot" style="padding-block:12px"><span class="stripe"></span>
          <span class="glyph b sm">EC</span>
          <div class="row-main"><span class="row-title" style="font-size:13px">Endorsement Chaser — v0.1, untouched for 9 days</span>
            <span class="row-sub">Named and described, then nothing. No trigger, no instructions, no metric. Sanya started it on the 5th.</span></div>
          <div class="row-aside"><button class="btn sm">Nudge Sanya</button><button class="btn sm ghost">Archive</button></div></div>
        <div class="row s-none" style="padding-block:12px"><span class="glyph c sm">LR</span>
          <div class="row-main"><span class="row-title" style="font-size:13px">Loss Ratio Explainer — v0.3, in test</span>
            <span class="row-sub">14 scenarios, 2 failing. Moving.</span></div>
          <div class="row-aside"><a class="btn sm" href="#/a/test">Open ${ICON.arrowr}</a></div></div>
      </div>
      <div class="panel-f"><span class="tiny faint">A draft untouched for 72 hours surfaces here and on the team pulse. In the product we studied, an abandoned agent drew no nudge anywhere outside the workspace its author had already left.</span></div></section>
  </div>
  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>What you're aiming at</h3></div>
      <div class="panel-b stack g12">
        <div class="rowflex"><span class="tiny faint">Create → published, target</span><span class="topbar-spacer"></span>
          <b class="mono" style="font-size:16px">&lt; 20 min</b></div>
        <span class="tiny faint" style="line-height:1.6">The competitor's measured time from clicking Create to a running, scheduled agent with a working first run was <b>17 minutes 30 seconds</b>, about four of them operator error. That is the bar, and it is an acceptance criterion in the spec rather than an aspiration.</span>
        <hr class="hr">
        <div class="eyebrow" style="margin-bottom:8px">Your team's last four</div>
        ${barlist([{l:"Decker",v:24},{l:"Quote Comparer",v:31},{l:"CD Watch",v:19},{l:"Deal Room",v:38}],
          {max:45,fmt:v=>v+" min"})}
      </div></section>
    <section class="panel"><div class="panel-h"><h3>Nothing is live yet</h3></div>
      <div class="panel-b"><p class="tiny" style="line-height:1.65;color:var(--ink-2)">
        A draft is yours alone. It has no installs, runs no schedules, costs nothing and appears in no store.
        It becomes the team's the moment you publish — and that is a change of ownership, not a sharing setting.
        <a href="#/a/share" style="color:var(--brand-ink);font-weight:600">See what publishing actually does</a>.</p></div></section>
  </aside></div></div>`;
};

/* ── share, ownership and the deprecation contract ───────────────────────── */
SCREENS["a/share"]=()=>{
  const a=A("rundown");
  return `<div class="wrap wide">
  ${phead("Share &amp; ownership — Morning Rundown","Who has it, who owns it, who maintains it, and what the team is owed when it changes.",
    `<a class="btn" href="#/a/publish">Publish v4.2 ${ICON.arrowr}</a>`)}
  ${note("**The single biggest inversion in v4.** In the product we studied, the team namespace mirrors the personal one completely — home, agents, knowledge, triggers, tasks — and every surface of it is empty. Org-wide sharing was switched on and verified persisted; the agent still did not appear in the team's list, the team's home showed no activity and no upcoming triggers, and the team's knowledge base stayed empty. There is no move-to-team control anywhere in the product. Sharing grants permission and never moves custody — so a team is a parallel silo you rebuild in, not a destination you move to. Bench's whole thesis is the opposite, so publishing here **transfers the object**.")}

  <div class="split"><div class="stack g16">
    <section class="panel"><div class="panel-h"><h3>Who can use it</h3>
      <div class="r"><span class="chip plain mono">agent.audience</span></div></div>
      <div class="rows" style="border-bottom:0">
        ${[["Sales — the team that owns it","14 people · 12 installed · appears in their store","on"],
           ["Everyone at Plum","78 people. Use this for the two org-wide agents, not for team practice.","off"],
           ["Named people outside Sales","Meera Iyer and Sanya Kapoor already have it this way.","off"]]
          .map(([t,d,s],i)=>`<div class="row ${s==="on"?"s-ok":"s-none"}" style="padding-block:12px">
            ${s==="on"?'<span class="stripe"></span>':""}
            <input type="radio" name="aud" id="aud-${i}" ${s==="on"?"checked":""} style="margin-top:3px;accent-color:var(--brand-fill)">
            <div class="row-main"><label for="aud-${i}" class="row-title" style="cursor:pointer;font-size:13px">${esc(t)}</label>
              <span class="row-sub tiny">${esc(d)}</span></div></div>`).join("")}
      </div>
      <div class="panel-f"><span class="tiny faint">Audience decides who can <b>install</b>. It never decides who owns the object — that moved to Sales on 13 September.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>Ownership</h3>
      <div class="r"><span class="chip ok">${ICON.check}Owned by Sales</span></div></div>
      <div class="panel-b g g2" style="gap:16px">
        <div class="field"><label>Owning team</label>
          <select class="inp" id="own-team"><option>Sales</option><option>Account Management</option><option>Organisation-wide</option></select>
          <span class="hint">Moved here from Karan's drafts when he first published. It does not move back.</span></div>
        <div class="field"><label>Maintainer</label>
          <select class="inp" id="own-maint"><option>Karan Mehta (author)</option><option>Rhea Nair</option><option>Meera Iyer</option></select>
          <span class="hint">Gets the failures, the budget warnings and the requests. Reassignable in one click; forced on account deactivation.</span></div>
      </div>
      <div class="rows" style="border-top:1px solid var(--line)">
        ${OWNERSHIP.history.map(h=>`<div class="row s-none" style="padding-block:10px">${av(h.who,"sm")}
          <div class="row-main"><span class="row-sub" style="color:var(--ink)">${esc(h.w)}</span>
            <span class="tiny faint">${esc(h.t)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Built by Karan Mehta — permanently, on the store card, in every release note and in the analytics. Credit is the author's; custody is the team's.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>Other teams running a fork of this</h3>
      <div class="r"><span class="chip">${ICON.layers}2 forks · 20 installs</span></div></div>
      <div class="rows">
        ${OWNERSHIP.forks.map(f=>`<div class="row s-none" style="padding-block:12px">${av(f.by,"sm")}
          <div class="row-main"><span class="row-title" style="font-size:13px">${esc(f.agent)} <span class="faint">v${esc(f.v)}</span></span>
            <span class="row-sub">${esc(f.team)} · forked by ${esc(P(f.by).n)} on ${esc(f.when)} · ${f.installs} installs</span>
            <span class="tiny faint" style="margin-top:3px;display:block">Drift: ${esc(f.drift)}</span></div>
          <div class="row-aside"><button class="btn sm ghost">See the diff</button></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">A member can never fork. A <b>team admin</b> can take a published agent as a template — that is the only sanctioned fork, and both ends keep the lineage. Without a one-to-many channel, a good agent spreads by being rebuilt by hand, which is how practice fragments.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>The deprecation contract</h3>
      <div class="r"><span class="chip plain">What the team is owed</span></div></div>
      <div class="rows">
        ${[["Notice","A removed setting or source is announced in the feed and by Slack DM 14 days before it goes. Named, with the reason."],
           ["Automatic migration","Parameter values are migrated, never silently dropped. A removed key is retired and stated; a new key takes its default and is stated."],
           ["Pinning","Anyone can pin to the version they have for up to 60 days. Pinned installs are listed here so the maintainer knows who is behind."],
           ["Nothing disappears behind a paywall","Runs, traces and history stay readable regardless of billing state. Data survives a downgrade; access to it does not depend on payment."]]
          .map(([t,d])=>`<div class="row s-ok" style="padding-block:12px"><span class="stripe"></span>
            <div class="row-main"><span class="row-title" style="font-size:13px">${esc(t)}</span>
              <span class="row-sub">${esc(d)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Written because the alternative is documented: model deprecations that broke running agents with no notice, and a staff remedy that told customers to delete and re-add the broken nodes themselves.</span></div></section>
  </div>

  <aside class="stack g16">
    <section class="panel"><div class="panel-h"><h3>What an install copies</h3></div>
      <div class="rows">
        ${INSTALL_SEMANTICS.map(s=>`<div class="row s-none" style="padding-block:10px"><div class="row-main">
          <span class="rowflex" style="gap:8px"><span class="row-title" style="font-size:12.5px">${esc(s.k)}</span>
            <span class="chip ${s.v==="copied"?"info":s.v==="pinned"?"hot":""}" style="font-size:10px">${esc(s.v)}</span></span>
          <span class="row-sub tiny">${esc(s.d)}</span></div></div>`).join("")}</div>
      <div class="panel-f"><span class="tiny faint">Stated per field because otherwise two engineers build two products from one screen.</span></div></section>

    <section class="panel"><div class="panel-h"><h3>Links</h3></div>
      <div class="panel-b stack g12">
        <div class="field"><label>Install link — for a person</label>
          <div class="rowflex" style="gap:7px"><input class="inp" id="lnk-i" value="bench.plumhq.com/i/morning-rundown" readonly>
            <button class="btn sm" data-act="copy">Copy</button></div>
          <span class="hint">Opens the install screen, with the backfill preview, for anyone in the audience.</span></div>
        <div class="field"><label>Template link — for another team's admin</label>
          <div class="rowflex" style="gap:7px"><input class="inp" id="lnk-t" value="bench.plumhq.com/t/morning-rundown" readonly>
            <button class="btn sm" data-act="copy">Copy</button></div>
          <span class="hint">Copies the config into their drafts with lineage recorded. Not the running instance, and no data.</span></div>
      </div></section>

    <section class="panel"><div class="panel-h"><h3>Pinned installs</h3></div>
      <div class="rows">
        <div class="row s-hot" style="padding-block:11px"><span class="stripe"></span>${av("farhan","sm")}
          <div class="row-main"><span class="row-sub" style="color:var(--ink)">Farhan Qureshi — pinned to v3.7</span>
            <span class="tiny faint">41 days. Pin expires 9 Oct, then auto-advances.</span></div></div>
      </div>
      <div class="panel-f"><span class="tiny faint">One pinned install is a preference. Four is a signal that the last publish was wrong.</span></div></section>
  </aside></div></div>`;
};
