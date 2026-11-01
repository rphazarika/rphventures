"use strict";
const $ = (sel) => document.querySelector(sel);
let data = null;
let visibleIssues = [];
function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch])); }
function linkUrl(v) { try { const u = new URL(v); return u.protocol === "https:" ? esc(u.href) : "#"; } catch { return "#"; } }
function prettyDate(s,short=false) { const d = new Date(String(s) + "T12:00:00Z"); return new Intl.DateTimeFormat("en-IN",short?{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"}:{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(d); }
function words(s) { return String(s || "").toLowerCase(); }
function sourceHtml(s) { return '<div class="source-entry"><div><strong>'+esc(s.publisher)+' — '+esc(s.title)+'</strong><br><span>Published '+esc(prettyDate(s.published,true))+' · Reporting period '+esc(s.period)+' · '+esc(s.type)+'</span></div><a href="'+linkUrl(s.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Open original source, '+esc(s.publisher)+'">ORIGINAL SOURCE ↗</a></div>'; }
function htmlMetric(m,compact=false) { return '<div class="'+(compact?'aside-metric':'metric')+'"><div class="metric-value">'+esc(m.value)+'</div><div class="metric-label">'+esc(m.label)+'</div><div class="metric-context">'+esc(m.context)+'</div></div>'; }
function card(d,n) { return '<article class="desk-card"><span class="desk-num">'+esc(d.number)+'</span><div class="desk-title">'+esc(d.name)+'</div><h3>'+esc(d.headline)+'</h3><p>'+esc(d.check)+'</p><div class="desk-metric"><strong>WATCH: </strong>'+esc(d.metric)+'</div><a aria-label="Read '+esc(d.name)+' analysis" href="#issue-'+esc(n)+'-'+esc(d.slug)+'"></a></article>'; }
function renderHome() {
 const it=visibleIssues[0]; if(!it) { $("#lead-title").textContent="No editions available yet."; $("#lead-summary").textContent="Editorial previews appear after source verification."; return; }
 $("#lead-title").textContent=it.title; $("#lead-summary").textContent=it.summary;
 $("#lead-date").textContent=prettyDate(it.date,true).toUpperCase(); $("#lead-read").href="#issue-"+it.number;
 $("#issue-stamp").innerHTML='<span>EDITION</span><strong>'+esc(it.number)+'</strong><span>'+esc(prettyDate(it.date,true).toUpperCase())+'</span>';
 $("#metrics").innerHTML=it.metrics.map(m=>htmlMetric(m)).join("");
 $("#source-note").textContent=it.sourceNote;
 $("#evidence-note").textContent="DATA TYPE: "+it.reportingType+". Editorial recommendations are not official industry benchmarks.";
 $("#desk-grid").innerHTML=it.desks.map(d=>card(d,it.number)).join("");
 $("#huddle-heading").textContent=it.huddleTitle;
 $("#huddle-summary").textContent=it.huddleSummary;
 $(".workshop-link").href="#issue-"+it.number+"-huddle";
 $("#source-list").innerHTML=it.sources.map(sourceHtml).join("");
 renderArchive("");
}
function renderArchive(q){
 const t=words(q); const matches=visibleIssues.filter(it=>words(it.title+" "+it.summary+" "+it.featureDesk+" "+it.desks.map(d=>d.name+" "+d.headline).join(" ")).includes(t));
 $("#archive-list").innerHTML=matches.length?matches.map(it=>'<article class="archive-item"><div><span class="archive-date">ISSUE '+esc(it.number)+' · '+esc(prettyDate(it.date,true).toUpperCase())+' · '+(it.status==="published"?"PUBLISHED":"EDITORIAL PREVIEW")+'</span><h3><a href="#issue-'+esc(it.number)+'">'+esc(it.title)+'</a></h3><p>'+esc(it.category)+' / '+esc(it.featureDesk)+'</p></div><a href="#issue-'+esc(it.number)+'" aria-label="Read issue '+esc(it.number)+'">↗</a></article>').join(""):'<div class="no-results">No matching editions. Try a different term.</div>';
}
function article(it){
 const intro=it.intro.map(p=>'<p>'+esc(p)+'</p>').join("");
 const checks=it.desks.map(d=>'<section class="five-check" id="desk-'+esc(d.slug)+'"><div class="eyebrow">'+esc(d.number)+' / '+esc(d.name)+'</div><h3>'+esc(d.headline)+'</h3><p><strong>Practical check:</strong> '+esc(d.check)+'</p><p class="check-metric"><strong>Suggested metric:</strong> '+esc(d.metric)+'</p><p>'+esc(d.rationale)+'</p></section>').join("");
 const sourceList=it.sources.map(s=>'<li><a href="'+linkUrl(s.url)+'" rel="noopener noreferrer" target="_blank">'+esc(s.publisher)+' — '+esc(s.title)+'</a>. Published '+esc(prettyDate(s.published,true))+'. Reporting period: '+esc(s.period)+'.</li>').join("");
 const limitation=it.limitations.map(x=>'<li>'+esc(x)+'</li>').join("");
 const huddle=it.huddle.map(x=>'<li>'+esc(x)+'</li>').join("");
 const aside='<aside class="article-aside"><div class="aside-panel"><h3>Source data at a glance</h3>'+it.metrics.map(m=>htmlMetric(m,true)).join("")+'<small>These market figures are not a measure of any individual dealership’s results.</small></div></aside>';
 return '<article><header class="article-head"><div class="eyebrow">'+esc(it.category)+' / ISSUE '+esc(it.number)+'</div><h1>'+esc(it.title)+'</h1><p class="article-dek">'+esc(it.summary)+'</p><div class="article-info"><span>'+esc(prettyDate(it.date))+'</span><span>'+(it.status==="published"?"PUBLISHED":"EDITORIAL PREVIEW")+'</span><span>'+esc(it.reportingType)+'</span></div></header><div class="article-layout"><div class="article-body"><div class="eyebrow">THE EVIDENCE</div>'+intro+'<div class="article-caution"><strong>Data definition:</strong> '+esc(it.sourceNote)+'</div><h2>'+esc(it.interpretation.heading)+'</h2><ul>'+it.interpretation.points.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul><h2>Five operational checks</h2><p>These are RPHV editorial recommendations. They are not official SIAM performance targets.</p><div class="five-checks">'+checks+'</div><section class="article-huddle" id="desk-huddle"><div class="eyebrow light">15-MINUTE TEAM HUDDLE</div><h2>'+esc(it.huddleTitle)+'</h2><ol>'+huddle+'</ol></section><section class="article-sources"><div class="eyebrow">AUDIT TRAIL</div><h2>Sources and limitations</h2><ul>'+sourceList+'</ul><h2>How to read this report</h2><ul>'+limitation+'</ul><p>Source links and reporting windows are preserved so readers can challenge or verify a claim against the original publication.</p><h2>Corrections</h2>'+(it.corrections.length?it.corrections.map(c=>'<p>'+esc(c)+'</p>').join(""):'<p>No corrections have been recorded for this editorial preview.</p>')+'</section></div>'+aside+'</div></article>';
}
function setView(name){
 ["home","article","policy","about"].forEach(v=>$("#"+v+"-view").classList.toggle("hidden",v!==name));
}
function navigate(){
 if(!data)return;
 const hash=decodeURIComponent(location.hash.slice(1)||"home");
 if(hash==="policy"||hash==="about"){setView(hash);window.scrollTo(0,0);document.title=(hash==="policy"?"Editorial Policy":"About")+" | RPHV DAILY";return;}
 const m=hash.match(/^issue-(\d{3})(?:-([\w-]+))?$/);
 if(m){
  const it=visibleIssues.find(x=>x.number===m[1]);
  if(it){setView("article");$("#article-content").innerHTML=article(it);document.title=it.title+" | RPHV DAILY";window.scrollTo(0,0);if(m[2])requestAnimationFrame(()=>document.getElementById("desk-"+m[2])?.scrollIntoView({block:"start"}));return;}
 }
 setView("home");document.title="RPHV DAILY | People, Process & Technology";
 if(hash!=="home")requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView({block:"start"}));
 else window.scrollTo(0,0);
}
async function init(){
 const day=new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"short",year:"numeric",timeZone:"Asia/Kolkata"}).format(new Date());
 $("#today-date").textContent="INDIA / "+day.toUpperCase();
 $("#copyright-year").textContent=new Date().getFullYear();
 try{
  const res=await fetch("./issues.json",{cache:"no-store"});if(!res.ok)throw Error("HTTP "+res.status);
  data=await res.json();
  if(!Array.isArray(data.issues))throw Error("Invalid content schema");
  const preview=String(data.version).startsWith("web-preview");
  visibleIssues=data.issues.filter(it=>it.status==="published"||(preview&&it.status==="editorial-preview")).sort((a,b)=>b.date.localeCompare(a.date));
  const latest=visibleIssues[0];if(latest)$("#lead-date").textContent=prettyDate(latest.date,true).toUpperCase();
  renderHome();navigate();window.addEventListener("hashchange",navigate);
  $("#archive-query").addEventListener("input",e=>renderArchive(e.target.value));
 }catch(e){
  $("#lead-title").textContent="The newsroom is temporarily unavailable";
  $("#lead-summary").textContent="Content could not be loaded. Please try again or view the original source via the editorial team.";
  $("#metrics").innerHTML='<p class="no-results">Edition data unavailable.</p>';
  console.error("RPHV Daily content load:",e);
 }
}
document.addEventListener("DOMContentLoaded",init);
