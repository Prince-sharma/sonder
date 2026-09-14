
/* ═══════════════════════════ HANDOFF ═══════════════════════════ */

SCREENS["h/spec"]=()=>`<div class="wrap">
  ${phead("Object model","What a developer builds. Everything in this prototype resolves to these seven objects — if a screen shows something that isn't here, the screen is wrong.")}
  <section class="panel" style="margin-bottom:18px"><div class="panel-h"><h3>Agent</h3>
    <div class="r"><span class="chip plain mono">the only object users author</span></div></div>
    <div class="panel-b"><pre class="code">Agent {
  id, name, blurb, longDescription, category, team_id | ORG
  author_id, verified, created_at

  trigger        { kind: on_demand | schedule | event | threshold,
                   cron?, event_source?, threshold_expr? }
  scopes         [ { source, access: read | write, granted: bool } ]
  instructions   text                     // inherits team business_context
  attachments    [ glossary_id, doc_id… ]

  autonomy       suggest | draft | auto_act
  guardrails     [ { rule, generates_tests: true } ]   // hard stops, per-agent
  auto_act_limits{ ceiling?, allowed_actions[], owner_id, written_reason }

  input_schema   [ InputParam ]           // ← what an installer may change
  locked_notes   [ string ]               // shown as "what you can't change"

  outcome        Outcome                  // REQUIRED to publish
  version        semver, changelog, published_at, published_by
  status         draft | in_test | awaiting_review | live | retired
}

InputParam { key, label, type: time|select|multi|text|toggle,
             options[], default, hint, required }

Outcome    { metric_name, unit, direction: up|down,
             baseline, target, source_system, source_query,
             attribution: installers_vs_non | before_after | team_aggregate }</pre></div></section>

  <div class="g g2" style="margin-bottom:18px">
    <section class="panel"><div class="panel-h"><h3>Installation</h3></div>
      <div class="panel-b"><pre class="code">Installation {
  id, agent_id, agent_version, user_id
  param_values   { key: value }   // validated against input_schema
  enabled        bool
  installed_at, last_run_at
  source         store | pre_installed | ring
  uninstalled_at?, uninstall_reason?   // ← always asked
}</pre>
      <p class="tiny faint" style="margin-top:11px">An installation pins a version. A publish advances it unless the user pinned deliberately. Param values never migrate silently — a removed key is dropped, a new key takes its default.</p></div></section>
    <section class="panel"><div class="panel-h"><h3>Run</h3></div>
      <div class="panel-b"><pre class="code">Run {
  id, installation_id, trigger_reason
  started_at, duration_ms, status
  trace          [ { step, source, detail, ts } ]   // user-visible
  items          [ RunItem ]
  tokens, cost
}
RunItem {
  id, severity, title, detail
  action_kind    none | draft | auto_acted
  artifact_ref?  // gmail draft id, hubspot task id…
  user_response  acted | dismissed | ignored | edited
  responded_at?
}</pre></div></section></div>

  <div class="g g2" style="margin-bottom:18px">
    <section class="panel"><div class="panel-h"><h3>Team &amp; business context</h3></div>
      <div class="panel-b"><pre class="code">Team {
  id, name, lead_id, state: setup | live
  setup_progress { context, sources, first_agent }
}
BusinessContext {
  team_id
  how_we_work      text
  targets          text
  incentives       text
  excellence       [ { title, why } ]   // top-performer traits
  calendar         [ { label, share } ]
  glossary         [ { term, definition } ]
  gaps             [ string ]           // what's still missing
}</pre></div></section>
    <section class="panel"><div class="panel-h"><h3>Request &amp; Scenario</h3></div>
      <div class="panel-b"><pre class="code">Request {
  id, agent_id, from_user_id
  kind    change | not_working | uninstalled
  title, body, votes[], state: open|shipped|declined
  shipped_in_version?
}
Scenario {
  id, agent_id, generated_from: config|guardrail|production
  category  core | domain | guardrail | tone
  situation, expected_behaviour
  last_result { verdict: pass|fail|review, actual, why }
}</pre></div></section></div>

  <section class="panel"><div class="panel-h"><h3>Who can do what</h3></div>
    <div class="tablewrap" style="border:0;border-radius:0"><table>
    <thead><tr><th>Capability</th><th>Member</th><th>Team admin</th><th>Super admin</th></tr></thead><tbody>
    ${[["Install an agent for themselves","yes","yes","yes"],
       ["Change exposed input parameters","yes","yes","yes"],
       ["Change instructions, scopes, guardrails","no","own team","any team"],
       ["See their own outcome metrics","yes","yes","yes"],
       ["See another person's usage","no","own team","any team"],
       ["Publish to a team","no","own team","any team"],
       ["Set an agent to auto-act","no","request only","yes"],
       ["Grant a new data source","no","request only","yes"],
       ["Write business context","no","own team","any team"],
       ["Retire an agent","no","own team","any team"],
       ["Read the audit log","own runs","own team","everything"]]
      .map(([c,...v])=>`<tr><td style="font-weight:600">${esc(c)}</td>
        ${v.map(x=>`<td>${x==="yes"?`<span class="chip ok">${ICON.check}Yes</span>`:
          x==="no"?`<span class="chip">${ICON.x}No</span>`:`<span class="chip info">${esc(x)}</span>`}</td>`).join("")}</tr>`).join("")}
    </tbody></table></div></section></div>`;

SCREENS["h/flows"]=()=>`<div class="wrap">
  ${phead("The flows that matter","Five paths. If these work, the product works.")}
  <div class="stack g16">
  ${[
   ["Install and first value","Member",[
     "Store → agent detail. The card must answer ‘what will this do to my morning' before anything else.",
     "Install → the input form built from <span class='code'>input_schema</span>. Defaults are pre-filled; a user can install without touching anything.",
     "First run happens on the agent's own trigger — not on install. A scheduled agent installed at 4pm first speaks at 08:15 tomorrow.",
     "<b>Exception:</b> offer a ‘show me what it would have said this morning' backfill run. Without it, a scheduled agent feels dead for a day and install-day churn spikes."]],
   ["Draft → approve → sent","Member",[
     "Draft-level agent produces a RunItem with <span class='code'>action_kind: draft</span> and writes the artifact in the source system, unsent.",
     "It appears in Approvals and as a feed card. Both point at the same object.",
     "Approve sends it. Edit opens the artifact in its native app (Gmail), and the platform stops tracking the edit — <b>decide this</b>: do you re-import the edited version to learn from it?",
     "Bin it records a reason. Three bins of the same kind should prompt the agent to ask why."]],
   ["Describe → config → test → publish","Team admin",[
     "Chat produces a complete draft config. The admin never sees an empty form.",
     "Config tab is authoritative. Anything the chat set can be overridden; overriding does not lock the field against future chat edits.",
     "Scenarios regenerate whenever instructions, guardrails or scopes change. Guardrail scenarios are non-deletable.",
     "Publish is blocked on: no outcome metric, any failing guardrail scenario, an unapproved new scope. Everything else is a warning.",
     "Rollout: everyone / pre-install for non-installers / ring of three then everyone."]],
   ["Complaint → change → shipped","Both",[
     "User hits a locked setting, or uninstalls. Both paths force a reason.",
     "Request lands in the admin inbox with vote count and which uninstalls it explains.",
     "Admin turns it into a change; the request is linked to the version that ships it.",
     "On publish, the release note names the person who asked. <b>This is the adoption loop</b> — it's the mechanism, not a nicety."]],
   ["Team setup","Super admin",[
     "Create team → assign lead → <b>business context interview</b> → connect sources → first agent → live.",
     "The order is enforced. Teams that published before writing context produced generic agents in this pilot.",
     "Context interview is conversational, 40 minutes, and the platform asks the questions. Do not ship a blank form."]]
  ].map(([t,who,steps])=>`<section class="panel"><div class="panel-h"><h3>${esc(t)}</h3>
    <div class="r"><span class="chip">${esc(who)}</span></div></div>
    <div class="panel-b"><div class="trace">${steps.map(s=>`<div class="tstep done">${s}</div>`).join("")}</div></div></section>`).join("")}
  </div>

  <section class="panel" style="margin-top:18px"><div class="panel-h"><h3>States and what they mean</h3></div>
    <div class="panel-b"><pre class="code">Agent    draft → in_test → awaiting_review → live → retired
                      ↑____________|              ↓
                                             rolled_back → live(previous)

RunItem  produced → { acted | dismissed | ignored | edited }
         ignored = no response within the next run's window.
         Track it separately from dismissed. "Ignored" is a design
         failure; "dismissed" is a judgement call. They look the
         same in every incumbent's analytics and they are not.

Install  active → paused → uninstalled(reason)
         A paused install keeps params and does not count as active.</pre></div></section></div>`;

SCREENS["h/open"]=()=>`<div class="wrap">
  ${phead("What I'd want settled before a developer starts","Grouped by how much they change the build. The first four change screens.")}
  ${[
   ["Changes the build",[
     ["Does an agent run as the user, or as a service account?","Per-user OAuth is the honest model and the one drawn here — an agent can never read what its installer can't. But it means every install triggers a consent screen, and a scheduled agent breaks when someone's token expires. A service account is smoother and much harder to defend to a compliance team at a regulated broker."],
     ["What happens when an admin publishes a breaking change?","Drawn here as: installs auto-advance, params never migrate silently. The alternative — users opt into each version — fragments the team's practice, which is the thing your whole thesis is against."],
     ["Who owns an agent when its author leaves?","Four people authored half of Plum's agents. Today the object has one <span class='code'>author_id</span>. Team ownership with a named maintainer is probably right, but it changes the permissions model."],
     ["Is the outcome metric computed by the platform or read from the source system?","Reading from HubSpot/Gmail/policy-admin is credible but means building a connector per metric. Computing from the platform's own run data is easy and unconvincing. Drawn here as source-system, which is the harder build."]]],
   ["Changes the pitch",[
     ["Is the buyer replacing Claude seats, or adding a layer on top?","The cost screen argues replacement. If the top performers keep their own Claude seats to build with — which they will — the story becomes ‘10 seats for builders, 78 licences for everyone else', which is a better story and a different price card."],
     ["Whose logo is on this — Sarvam's, or the customer's?","Changes whether there's a store across customers (Plum installs an agent another broker built) or strictly per-tenant. A cross-tenant store is a much bigger moat and a much harder sell in insurance."],
     ["What is a licence actually metered on?","Per seat is legible. Per run is fair. Per outcome — Sierra's model — is the most aligned and the hardest to contract. The prototype assumes per seat plus metered runs."]]],
   ["Changes the first team",[
     ["Sales or Account Management first?","AM has the better instrumented metrics — endorsement TAT and CD balance are already numbers in a system. Sales has the better story and the more visible top performer. AM is the easier pilot; Sales is the better case study."],
     ["Does the pilot need WhatsApp on day one?","Two of the three dormant users in this prototype blame WhatsApp. In Indian B2B sales this may not be optional."],
     ["Who at Plum actually authors agents?","Everything here assumes a Karan — a top performer who wants to build. If that person doesn't exist at the customer, the platform needs a services motion for the first five agents, and that changes the company you're building."]]]
  ].map(([g,qs])=>`<div class="eyebrow" style="margin:24px 0 11px">${esc(g)}</div>
    <div class="stack g12">${qs.map(([q,d])=>`<section class="panel"><div class="panel-b">
      <div class="row-title" style="font-size:14px;margin-bottom:7px">${esc(q)}</div>
      <p class="muted" style="font-size:13px;line-height:1.65">${d}</p></div></section>`).join("")}</div>`).join("")}

  <section class="panel" style="margin-top:26px"><div class="panel-h"><h3>What this prototype deliberately doesn't show</h3></div>
    <div class="rows">
    ${[["Mobile","The feed and approvals are obviously phone surfaces. Everything else isn't. This lays out at phone width but isn't designed for it."],
       ["Onboarding a brand-new user","Day one for someone with zero installs. Probably the highest-leverage screen in the product and it isn't drawn."],
       ["The agent runtime","No tool-calling UI, no error states, no retry. A run that fails halfway is drawn as if it can't happen."],
       ["Search","Eleven agents don't need it. Two hundred do."],
       ["Billing","No plan page, no usage meter, no overage. The cost comparison on the org page is an argument, not a bill."]]
      .map(([t,d])=>`<div class="row s-none"><div class="row-main">
        <span class="row-title">${esc(t)}</span><span class="row-sub">${esc(d)}</span></div></div>`).join("")}</div></section>
  </div>`;
