
/* ═══════════════════════════ helpers ═══════════════════════════ */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const A=id=>AGENTS.find(a=>a.id===id)||DRAFTS.find(a=>a.id===id);
const P=id=>PEOPLE[id]||{n:id,r:"",i:"?"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\n/g,"<br>");
const pct=n=>Math.round(n)+"%";

const state={role:"super", route:"", notes:false, installed:new Set(INSTALLED), approved:new Set(),
             buildTab:"chat", testRun:false, builtFromChat:false,
             /* v3 journey — see src/65-journey.js */
             stage:0, setupDone:new Set()};

const ICON={
 clock:'<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.4"/><path d="M8 4.6V8l2.3 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
 bolt:'<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8.8 1.8 3.6 9h3.3l-.7 5.2L12.4 7H9.1l-.3-5.2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
 hand:'<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M5.5 8V3.3a1 1 0 1 1 2 0V7m0 0V2.4a1 1 0 1 1 2 0V7m0 0V3.4a1 1 0 1 1 2 0V9.6c0 2.6-1.6 4.5-4 4.5-2.1 0-3-1-3.6-2.3L2.7 9.2a1.1 1.1 0 0 1 1.8-1.2L5.5 9.4" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>',
 check:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.2 8.4 6.4 11.6l6.4-7.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 x:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
 alert:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2.2 14.5 13.5h-13L8 2.2Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 6.4v3.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.4" r=".85" fill="currentColor"/></svg>',
 eye:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.6 8 3.6 14.5 8 14.5 8 12 12.4 8 12.4 1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.9" stroke="currentColor" stroke-width="1.3"/></svg>',
 lock:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="3.4" y="7" width="9.2" height="6.5" rx="1.6" stroke="currentColor" stroke-width="1.3"/><path d="M5.6 7V5.2a2.4 2.4 0 1 1 4.8 0V7" stroke="currentColor" stroke-width="1.3"/></svg>',
 spark:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1.8 9.3 6 13.5 7.3 9.3 8.6 8 12.8 6.7 8.6 2.5 7.3 6.7 6 8 1.8Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>',
 arrowr:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h9m0 0L8.6 4.6M12 8l-3.4 3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 plus:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3.4v9.2M3.4 8h9.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
 home:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.6 7 8 2.6 13.4 7v6.1a.9.9 0 0 1-.9.9h-3V9.8h-3V14h-3a.9.9 0 0 1-.9-.9V7Z" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/></svg>',
 grid:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="2.4" y="2.4" width="4.7" height="4.7" rx="1.2" stroke="currentColor" stroke-width="1.35"/><rect x="8.9" y="2.4" width="4.7" height="4.7" rx="1.2" stroke="currentColor" stroke-width="1.35"/><rect x="2.4" y="8.9" width="4.7" height="4.7" rx="1.2" stroke="currentColor" stroke-width="1.35"/><rect x="8.9" y="8.9" width="4.7" height="4.7" rx="1.2" stroke="currentColor" stroke-width="1.35"/></svg>',
 inbox:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.2 9.2h3l1 1.8h3.6l1-1.8h3M2.2 9.2 4 3.2h8l1.8 6v3.7a.9.9 0 0 1-.9.9H3.1a.9.9 0 0 1-.9-.9V9.2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
 chat:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13.6 8.6c0 2.7-2.5 4.9-5.6 4.9a6.7 6.7 0 0 1-1.9-.27L2.7 14.2l1-2.7A4.6 4.6 0 0 1 2.4 8.6c0-2.7 2.5-4.9 5.6-4.9s5.6 2.2 5.6 4.9Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
 chart:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.6 13.4h10.8M4.6 13.4V8.2M8 13.4V3.6M11.4 13.4v-3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
 users:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="6.2" cy="5.6" r="2.5" stroke="currentColor" stroke-width="1.3"/><path d="M1.9 13.4c0-2.2 1.9-3.8 4.3-3.8s4.3 1.6 4.3 3.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M11 4c1.2.3 2 1.3 2 2.5s-.8 2.2-2 2.5M11.8 10.1c1.4.4 2.4 1.6 2.4 3.3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
 wrench:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M9.9 3.1a3.4 3.4 0 0 0 3.9 5.3l-8.6 5a1.7 1.7 0 1 1-1.8-2.9l8.6-5A3.4 3.4 0 0 0 9.9 3.1Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
 flask:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6.4 2.2v4L2.9 11.9a1.2 1.2 0 0 0 1 1.9h8.2a1.2 1.2 0 0 0 1-1.9L9.6 6.2v-4M5.4 2.2h5.2M4.7 9.4h6.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 book:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.6 3.1c1.8-.6 3.6-.6 5.4 0v10.2c-1.8-.6-3.6-.6-5.4 0V3.1ZM8 3.1c1.8-.6 3.6-.6 5.4 0v10.2c-1.8-.6-3.6-.6-5.4 0" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
 plug:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 2.2v3.4M10 2.2v3.4M4.2 5.6h7.6v2.7a3.8 3.8 0 0 1-7.6 0V5.6ZM8 12.1v2.1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 layers:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2 2 5.3 8 8.6l6-3.3L8 2ZM2.6 8.6 8 11.6l5.4-3M2.6 11.4 8 14.4l5.4-3" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
 spec:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 2.4h5.4l2.9 2.9v8.3H4V2.4Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9.2 2.6v3h3M6 8.4h4.2M6 10.8h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
 q:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.35"/><path d="M6.3 6.3a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.6-.7 1.1v.3" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/><circle cx="8" cy="11.3" r=".85" fill="currentColor"/></svg>'
};

const AUT={
 suggest:{l:"Suggest", d:"Tells you. Never touches anything.", c:"info", icon:ICON.eye},
 draft:  {l:"Draft",   d:"Writes it, leaves it for you to approve or bin.", c:"hot", icon:ICON.alert},
 auto:   {l:"Auto-act",d:"Acts on its own inside the guardrails the admin set.", c:"bad", icon:ICON.bolt}
};

function av(id,cls=""){const p=P(id);return `<span class="avatar ${cls}" title="${esc(p.n)}">${esc(p.i)}</span>`;}
function glyph(a,cls=""){return `<span class="glyph ${a.tone||""} ${cls}">${esc(a.mono)}</span>`;}
function autChip(k){const a=AUT[k];return `<span class="chip ${a.c}" title="${esc(a.d)}">${a.icon}${a.l}</span>`;}
/* v2 — member-facing plain language. Runs/trust replace the autonomy + trigger
   chips; the icon still encodes the level (eye advises, lock waits, bolt acts). */
function plainRun(a){return `<span class="chip plain">${ICON.clock}${esc(a.plain.runs)}</span>`;}
function plainTrust(a){const ic=a.autonomy==="auto"?ICON.bolt:a.autonomy==="draft"?ICON.lock:ICON.eye;
  return `<span class="chip plain">${ic}${esc(a.plain.trust)}</span>`;}
function verChip(a){return a.verified?`<span class="chip ok" title="Reviewed and published by a team admin">${ICON.check}Verified</span>`:
  (a.isNew?`<span class="chip info">${ICON.spark}New</span>`:"");}
function fmtMetric(m,v){
  if(m.unit==="min") return v>=60?(v/60).toFixed(1)+" h":Math.round(v)+" min";
  if(m.unit==="h")   return v.toFixed(1)+" h";
  if(m.unit==="days")return v.toFixed(1)+" d";
  if(m.unit==="/wk") return Math.round(v)+"/wk";
  return Math.round(v)+"%";
}
function metricDelta(m){
  const good = m.dir==="down" ? m.now<m.base : m.now>m.base;
  const chg = m.base===0?0:Math.round(Math.abs((m.now-m.base)/m.base)*100);
  const arrow = m.now<m.base?"↓":"↑";
  return `<span class="delta ${good?"up":"down"}">${arrow} ${chg}%</span>`;
}
function hitTarget(m){return m.dir==="down"? m.now<=m.target : m.now>=m.target;}

/* ═══════════════════════════ charts ═══════════════════════════
   All single-hue. Categorical palettes are avoided by construction:
   ordinal data uses one ramp, comparisons use accent vs neutral.     */

function spark(series,{w=112,h=30,dir="down"}={}){
  const mn=Math.min(...series), mx=Math.max(...series), r=(mx-mn)||1, pad=3;
  const pts=series.map((v,i)=>[pad+i*((w-pad*2)/(series.length-1)), h-pad-((v-mn)/r)*(h-pad*2)]);
  const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
  const area=d+` L${(w-pad).toFixed(1)} ${h-pad} L${pad} ${h-pad} Z`;
  const last=pts[pts.length-1];
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" style="display:block;overflow:visible">
    <path d="${area}" fill="var(--data)" opacity=".11"/>
    <path d="${d}" fill="none" stroke="var(--data)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="var(--data)" stroke="var(--surface)" stroke-width="2"/></svg>`;
}

function metricChart(m,{h=200}={}){
  const w=640, padL=52, padR=58, padT=24, padB=28;
  const vals=m.series.concat([m.target]);
  let mn=Math.min(...vals), mx=Math.max(...vals);
  const sp=(mx-mn)*0.18||1; mn=Math.max(0,mn-sp); mx=mx+sp;
  const X=i=>padL+i*((w-padL-padR)/(m.series.length-1));
  const Y=v=>padT+(1-(v-mn)/(mx-mn))*(h-padT-padB);
  const pts=m.series.map((v,i)=>[X(i),Y(v)]);
  const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
  const area=d+` L${X(m.series.length-1).toFixed(1)} ${h-padB} L${padL} ${h-padB} Z`;
  const ty=Y(m.target);
  // keep the target caption clear of the current-value label when the two lines converge
  const tyLbl = Math.abs(ty-Y(m.series[m.series.length-1]))<20 ? ty+15 : ty+3.5;
  const ticks=[mn,(mn+mx)/2,mx];
  const last=pts[pts.length-1], first=pts[0];
  const good=hitTarget(m);
  return `<div style="overflow-x:auto"><svg viewBox="0 0 ${w} ${h}" width="100%" style="min-width:420px;display:block" role="img"
    aria-label="${esc(m.name)}: ${fmtMetric(m,m.base)} in ${m.months[0]} to ${fmtMetric(m,m.now)} in ${m.months[m.months.length-1]}, against a target of ${fmtMetric(m,m.target)}">
    ${ticks.map(t=>`<line x1="${padL}" y1="${Y(t).toFixed(1)}" x2="${w-padR}" y2="${Y(t).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>
      <text x="${padL-9}" y="${(Y(t)+4).toFixed(1)}" text-anchor="end" fill="var(--ink-3)" font-size="10.5" font-family="IBM Plex Mono, monospace">${fmtMetric(m,t)}</text>`).join("")}
    <line x1="${padL}" y1="${ty.toFixed(1)}" x2="${w-padR}" y2="${ty.toFixed(1)}" stroke="var(--ink-3)" stroke-width="1.4" stroke-dasharray="5 4"/>
    <text x="${w-padR+7}" y="${tyLbl.toFixed(1)}" fill="var(--ink-3)" font-size="10.5" font-family="IBM Plex Mono, monospace">target</text>
    <path d="${area}" fill="var(--data)" opacity=".10"/>
    <path d="${d}" fill="none" stroke="var(--data)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${first[0].toFixed(1)}" cy="${first[1].toFixed(1)}" r="3.4" fill="var(--surface)" stroke="var(--data)" stroke-width="2"/>
    <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="4.6" fill="var(--data)" stroke="var(--surface)" stroke-width="2.5"/>
    <text x="${(last[0]-9).toFixed(1)}" y="${(last[1]-11).toFixed(1)}" text-anchor="end" fill="var(--ink)" font-size="12.5" font-weight="600" font-family="IBM Plex Mono, monospace">${fmtMetric(m,m.now)}</text>
    ${m.months.map((mo,i)=>`<text x="${X(i).toFixed(1)}" y="${h-9}" text-anchor="middle" fill="var(--ink-3)" font-size="10.5" font-family="IBM Plex Mono, monospace">${mo}</text>`).join("")}
  </svg></div>
  <div class="rowflex tiny faint" style="margin-top:8px;gap:16px">
    <span>Baseline ${m.months[0]}: <b class="mono" style="color:var(--ink-2)">${fmtMetric(m,m.base)}</b></span>
    <span>Target: <b class="mono" style="color:var(--ink-2)">${m.dir==="down"?"≤":"≥"} ${fmtMetric(m,m.target)}</b></span>
    <span class="chip ${good?"ok":"hot"}">${good?ICON.check:ICON.alert}${good?"On target":"Short of target"}</span>
  </div>`;
}

function barlist(rows,{max=null,fmt=v=>v,cls=""}={}){
  const M=max??Math.max(...rows.map(r=>r.v),1);
  return `<div class="barlist">${rows.map(r=>`<div class="barrow">
    <span class="bl" title="${esc(r.l)}">${esc(r.l)}</span>
    <span class="meter"><i class="${r.cls||cls}" style="width:${Math.max(2,(r.v/M)*100).toFixed(1)}%"></i></span>
    <span class="bn">${fmt(r.v)}</span></div>`).join("")}</div>`;
}

/* ordinal segment bar — one hue, light to dark. Never categorical. */
function segbar(segs,total){
  const R=["var(--ramp-1)","var(--ramp-2)","var(--ramp-3)","var(--ramp-5)"];
  let acc=0;
  return `<div style="display:flex;height:12px;border-radius:6px;overflow:hidden;gap:2px;background:var(--surface-3)">
    ${segs.map((s,i)=>{acc+=s.v;return `<span title="${esc(s.l)}: ${s.v}" style="flex:${s.v};background:${R[i]};min-width:3px"></span>`}).join("")}
  </div>
  <div class="rowflex" style="gap:14px;margin-top:9px">${segs.map((s,i)=>`
    <span class="rowflex tiny" style="gap:6px"><span class="dot" style="background:${R[i]}"></span>
    <span class="faint">${esc(s.l)}</span><b class="mono" style="font-size:11.5px">${s.v}</b></span>`).join("")}</div>`;
}

function toast(msg){
  const t=document.createElement("div"); t.className="toast";
  t.innerHTML=`<span style="color:var(--data)">${ICON.check}</span>${esc(msg)}`;
  document.body.appendChild(t); setTimeout(()=>t.remove(),2600);
}
function closeModal(){ $("#layer").innerHTML=""; }
function modal(html){
  $("#layer").innerHTML=`<div class="modalwrap" data-close><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
  $("#layer .modalwrap").addEventListener("click",e=>{ if(e.target.hasAttribute("data-close")) closeModal(); });
}
function note(t){ return `<div class="note">${md(t)}</div>`; }
