const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const TEMPLATES=[
  ["Modern Professional","t-modern","Polished corporate layout"],
  ["Minimal Classic","t-minimal","Elegant whitespace and simple typography"],
  ["Executive Slate","t-executive","Premium leadership and management style"],
  ["Tech Talent","t-tech","Technical skills and project-focused layout"],
  ["Creative Edge","t-creative","Expressive modern creative layout"],
  ["Compact One-Page","t-compact","Dense, space-saving one-page format"],
  ["Academic CV","t-academic","Formal academic and research layout"],
  ["Bold Impact","t-bold","Strong typography and high-impact headings"],
  ["Sidebar Profile","t-sidebar","Distinct left profile rail"],
  ["Elegant Serif","t-elegant","Editorial serif typography"],
  ["Modern Blue","t-modernblue","Structured professional blue style"],
  ["Startup Green","t-startup","Fresh startup-inspired layout"],
  ["Nordic Clean","t-nordic","Airy, calm Scandinavian style"],
  ["First Job","t-intern","Student and entry-level friendly"],
  ["Global Standard","t-global","Traditional ATS-friendly format"],
  ["Crimson Corporate","t-crimson","Red-accented corporate two-column feel"],
  ["Monochrome Pro","t-mono","Black-and-white executive simplicity"],
  ["Portfolio Grid","t-portfolio","Visual project and skills emphasis"],
  ["Consultant Plus","t-consult","Structured consulting-style hierarchy"],
  ["Graduate Launch","t-graduate","Education-first graduate layout"]
];
const blank=()=>({id:crypto.randomUUID(),name:"My Resume",template:"t-modern",data:{name:"",title:"",photo:"",email:"",phone:"",location:"",website:"",linkedin:"",github:"",summary:"",skills:"",languages:"",awards:"",volunteer:"",interests:"",experience:[],education:[],projects:[],certifications:[]}});
let state={resumes:[],activeId:null,zoom:100};
function load(){try{const v=JSON.parse(localStorage.getItem("manas-resume-studio-v3")||localStorage.getItem("elevatecv-v2"));if(v?.resumes?.length){state.resumes=v.resumes;state.activeId=v.activeId||v.resumes[0].id}}catch(e){}if(!state.resumes.length){const r=blank();r.data.name="Your Name";r.data.title="Your Professional Title";state.resumes=[r];state.activeId=r.id}renderAll()}
function current(){return state.resumes.find(r=>r.id===state.activeId)||state.resumes[0]}
function save(){localStorage.setItem("manas-resume-studio-v3",JSON.stringify({resumes:state.resumes,activeId:state.activeId}));$("#saveState").textContent="Saved in this browser";renderPreview();renderSelect()}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
function renderSelect(){$("#resumeSelect").innerHTML=state.resumes.map(r=>`<option value="${r.id}" ${r.id===state.activeId?"selected":""}>${esc(r.name)}</option>`).join("")}
function renderFields(){const d=current().data;$$("[data-field]").forEach(el=>el.value=d[el.dataset.field]||"");["experience","education","projects","certifications"].forEach(renderRepeats);
 const pp=$("#photoPreview");pp.innerHTML=d.photo?`<img src="${d.photo}" alt="Profile photo">`:"PHOTO";
 $("#jobDescription").value=current().jobDescription||""}
const schemas={experience:[["role","Job title"],["company","Company"],["location","Location"],["dates","Dates (e.g. Jan 2022 – Present)"],["details","Achievements (one per line; use numbers where possible)","textarea"]],education:[["degree","Degree / qualification"],["school","Institution"],["location","Location"],["dates","Dates"],["details","Relevant coursework, honors or details","textarea"]],projects:[["name","Project name"],["link","Project link"],["dates","Dates"],["details","What you built and the outcome","textarea"]],certifications:[["name","Certification / course"],["issuer","Issuing organization"],["date","Date"]]};
function renderRepeats(type){const arr=current().data[type]||[];$("#"+type+"List").innerHTML=arr.map((item,i)=>`<div class="repeat-card" data-type="${type}" data-index="${i}"><button class="remove-item" title="Remove">×</button><div class="repeat-title">${type.slice(0,-1).toUpperCase()} ${i+1}</div><div class="field-grid two">${schemas[type].map(([key,label,kind])=>`<label>${label}${kind==="textarea"?`<textarea data-repeat="${key}" rows="3">${esc(item[key]||"")}</textarea>`:`<input data-repeat="${key}" value="${esc(item[key]||"")}" placeholder="${label}">`}</label>`).join("")}</div></div>`).join("")}
function addItem(type){current().data[type].push({});renderRepeats(type);save()}
function textLines(s){return (s||"").split(/\n+/).map(x=>x.trim()).filter(Boolean)}
function section(title,html){return html?`<h2>${title}</h2>${html}`:""}
function renderPreview(){const r=current(),d=r.data;const contact=[d.email,d.phone,d.location,d.website,d.linkedin,d.github].filter(Boolean).map(esc).join(" · ");let html=`<div class="resume-header"><div class="resume-header-main"><h1>${esc(d.name||"Your Name")}</h1><div class="r-title">${esc(d.title||"Professional Title")}</div><div class="contact">${contact||"Email · Phone · Location · Portfolio"}</div></div>${d.photo?`<img class="resume-photo" src="${d.photo}" alt="Profile photo">`:""}</div>`;
if(d.summary)html+=section("Professional Summary",`<p class="r-summary">${esc(d.summary)}</p>`);
if(d.experience.length)html+=section("Experience",d.experience.map(x=>`<div class="entry"><div class="entry-head"><b>${esc(x.role||"Role")}${x.company?" · "+esc(x.company):""}</b><span>${esc(x.dates||"")}</span></div>${x.location?`<div class="meta">${esc(x.location)}</div>`:""}${textLines(x.details).length?`<ul>${textLines(x.details).map(y=>`<li>${esc(y.replace(/^[-•]\s*/,""))}</li>`).join("")}</ul>`:""}</div>`).join(""));
if(d.education.length)html+=section("Education",d.education.map(x=>`<div class="entry"><div class="entry-head"><b>${esc(x.degree||"Qualification")}${x.school?" · "+esc(x.school):""}</b><span>${esc(x.dates||"")}</span></div>${x.location?`<div class="meta">${esc(x.location)}</div>`:""}${x.details?`<p>${esc(x.details)}</p>`:""}</div>`).join(""));
if(d.skills)html+=section("Core Skills",`<p class="skill-line">${esc(d.skills.split(",").map(x=>x.trim()).filter(Boolean).join(" · "))}</p>`);
if(d.projects.length)html+=section("Selected Projects",d.projects.map(x=>`<div class="entry"><div class="entry-head"><b>${esc(x.name||"Project")}</b><span>${esc(x.dates||"")}</span></div>${x.link?`<div class="meta">${esc(x.link)}</div>`:""}${textLines(x.details).length?`<ul>${textLines(x.details).map(y=>`<li>${esc(y.replace(/^[-•]\s*/,""))}</li>`).join("")}</ul>`:""}</div>`).join(""));
if(d.certifications.length)html+=section("Certifications",d.certifications.map(x=>`<p><b>${esc(x.name||"Certification")}</b>${x.issuer?" · "+esc(x.issuer):""}${x.date?" · "+esc(x.date):""}</p>`).join(""));
[["Languages",d.languages],["Awards & Achievements",d.awards],["Volunteer Experience",d.volunteer],["Interests",d.interests]].forEach(([t,v])=>{if(v)html+=section(t,`<p>${esc(v).replace(/\n/g,"<br>")}</p>`)});const p=$("#resumePreview");p.className="resume-paper "+r.template;p.innerHTML=html;$("#templateName").textContent=TEMPLATES.find(t=>t[1]===r.template)?.[0]||"Template"}
function renderAll(){renderSelect();renderFields();renderPreview();renderTemplateGrid();renderLibrary()}
function switchTab(tab){$$(".workspace").forEach(x=>x.classList.add("hidden"));$("#"+tab+"Tab").classList.remove("hidden");$$(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.tab===tab));if(tab==="library")renderLibrary()}
function createResume(){const r=blank();r.name="Resume "+(state.resumes.length+1);state.resumes.unshift(r);state.activeId=r.id;renderAll();switchTab("builder");save();toast("New resume created")}
function renderTemplateGrid(){$("#templateGrid").innerHTML=TEMPLATES.map(([name,cls,desc])=>`<button class="template-card ${current().template===cls?"selected":""}" data-template="${cls}"><div class="mini-paper ${cls}"><div class="mini-name">${esc(current().data.name||"Your Name")}</div><div class="mini-line short"></div><div class="mini-accent"></div><div class="mini-head">EXPERIENCE</div><div class="mini-line"></div><div class="mini-line"></div><div class="mini-line short"></div><div class="mini-head">EDUCATION</div><div class="mini-line"></div><div class="mini-line short"></div></div><b>${name}</b><small>${desc}</small></button>`).join("")}
function renderLibrary(){$("#resumeLibrary").innerHTML=state.resumes.map(r=>`<div class="library-card"><h3>${esc(r.name)}</h3><p>${esc(r.data.title||"No professional title yet")} · ${TEMPLATES.find(t=>t[1]===r.template)?.[0]||"Template"}</p><div class="library-buttons"><button class="btn btn-secondary" data-open="${r.id}">Open</button><button class="btn btn-secondary" data-duplicate="${r.id}">Duplicate</button><button class="btn btn-danger" data-delete="${r.id}">Delete</button></div></div>`).join("")}
function keywords(s){const stop=new Set("the and for with from that this will your you are our all have has job role work team using use skills ability experience years preferred required including across into".split(" "));return [...new Set((s.toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g)||[]).filter(w=>!stop.has(w)))].slice(0,100)}
function allResumeText(){const d=current().data;return Object.values(d).flatMap(v=>Array.isArray(v)?v.flatMap(o=>Object.values(o)): [v]).join(" ").toLowerCase()}
function analyze(job,target){const kws=keywords(job),txt=allResumeText();const matched=kws.filter(k=>txt.includes(k)),missing=kws.filter(k=>!txt.includes(k));const score=kws.length?Math.round(matched.length/kws.length*100):0;return{score,matched,missing}}
function renderAnalysis(job,target){const a=analyze(job);target.innerHTML=`<div class="score-row"><div class="score-ring" style="--score:${a.score*3.6}deg"><b>${a.score}%</b></div><div class="score-copy"><b>${a.score>=75?"Strong keyword coverage":a.score>=45?"Room to improve":"Needs more targeting"}</b><p>${a.matched.length} matched · ${a.missing.length} not found in resume text</p></div></div><h4>Keywords found</h4><div class="keyword-list">${a.matched.slice(0,35).map(k=>`<span class="keyword">${esc(k)}</span>`).join("")||"No matching keywords yet"}</div><h4>Potential keywords to review</h4><div class="keyword-list">${a.missing.slice(0,35).map(k=>`<span class="keyword missing">${esc(k)}</span>`).join("")||"Great — no missing keywords from this sample"}</div><h4>Next steps</h4><ul class="suggestion"><li>Only add a keyword if it accurately describes your experience or skills.</li><li>Use specific examples and measurable outcomes in experience bullets.</li><li>Keep headings standard (Experience, Education, Skills) and avoid graphics or tables in the final resume.</li><li>Check spelling, dates, contact details and PDF text before applying.</li></ul>`}
function tailor(){const job=$("#jobDescription").value.trim();if(!job){toast("Paste a job description first");return}current().jobDescription=job;renderAnalysis(job,$("#tailorResults"));$("#atsJob").value=job;save();toast("Job description analyzed")}
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));
document.addEventListener("click",e=>{
 const head=e.target.closest(".section-head");if(head){head.parentElement.classList.toggle("open");return}
 const add=e.target.closest("[data-add]");if(add){addItem(add.dataset.add);return}
 const rm=e.target.closest(".remove-item");if(rm){const card=rm.closest(".repeat-card");current().data[card.dataset.type].splice(+card.dataset.index,1);renderRepeats(card.dataset.type);save();return}
 const tpl=e.target.closest("[data-template]");if(tpl){current().template=tpl.dataset.template;renderTemplateGrid();save();toast("Template applied");return}
 const op=e.target.closest("[data-open]");if(op){state.activeId=op.dataset.open;renderAll();switchTab("builder");save();return}
 const dup=e.target.closest("[data-duplicate]");if(dup){const copy=JSON.parse(JSON.stringify(state.resumes.find(r=>r.id===dup.dataset.duplicate)));copy.id=crypto.randomUUID();copy.name+=" (Copy)";state.resumes.unshift(copy);state.activeId=copy.id;renderAll();save();toast("Resume duplicated");return}
 const del=e.target.closest("[data-delete]");if(del){if(state.resumes.length===1){toast("Keep at least one resume");return}if(confirm("Delete this resume?")){state.resumes=state.resumes.filter(r=>r.id!==del.dataset.delete);if(state.activeId===del.dataset.delete)state.activeId=state.resumes[0].id;renderAll();save()}return}
});
document.addEventListener("input",e=>{const el=e.target;if(el.matches("[data-field]")){current().data[el.dataset.field]=el.value;save()}if(el.matches("[data-repeat]")){const card=el.closest(".repeat-card");current().data[card.dataset.type][+card.dataset.index][el.dataset.repeat]=el.value;save()}});
$("#resumeSelect").addEventListener("change",e=>{state.activeId=e.target.value;renderAll();save()});
$("#newResumeBtn").onclick=createResume;$("#libraryNewBtn").onclick=createResume;
$("#expandAllBtn").onclick=()=>$$(".form-section").forEach(x=>x.classList.add("open"));
$("#downloadBtn").onclick=()=>window.print();
$("#tailorBtn").onclick=tailor;
$("#checkAtsBtn").onclick=()=>{const j=$("#atsJob").value.trim();if(!j){toast("Paste a job description first");return}renderAnalysis(j,$("#atsResult"));};
$("#zoomIn").onclick=()=>zoom(5);$("#zoomOut").onclick=()=>zoom(-5);function zoom(n){state.zoom=Math.max(70,Math.min(110,state.zoom+n));$("#resumePreview").style.zoom=state.zoom/100;$("#zoomLabel").textContent=state.zoom+"%"}
$("#exportDataBtn").onclick=()=>{const blob=new Blob([JSON.stringify({resumes:state.resumes,activeId:state.activeId},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="elevatecv-backup.json";a.click();URL.revokeObjectURL(a.href)};
$("#importDataInput").onchange=async e=>{try{const v=JSON.parse(await e.target.files[0].text());if(!Array.isArray(v.resumes)||!v.resumes.length)throw Error();state.resumes=v.resumes;state.activeId=v.activeId||v.resumes[0].id;save();renderAll();toast("Backup imported")}catch(err){toast("That backup file is not valid")}};
$("#clearDataBtn").onclick=()=>{if(confirm("This clears all resumes saved in this browser. Export a backup first if needed.")){localStorage.removeItem("elevatecv-v2");state.resumes=[];state.activeId=null;load();toast("Local data cleared")}};

$("#photoInput").addEventListener("change",e=>{
 const file=e.target.files?.[0]; if(!file)return;
 if(!["image/jpeg","image/png","image/webp"].includes(file.type)){toast("Please choose a JPG, PNG or WebP image");e.target.value="";return}
 if(file.size>3*1024*1024){toast("Photo must be 3 MB or smaller");e.target.value="";return}
 const reader=new FileReader();
 reader.onload=()=>{
   const img=new Image();
   img.onload=()=>{
     const maxW=700,maxH=900,scale=Math.min(1,maxW/img.width,maxH/img.height);
     const canvas=document.createElement("canvas");
     canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
     canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
     current().data.photo=canvas.toDataURL("image/jpeg",0.82);
     try{save();renderFields();toast("Profile photo added")}
     catch(err){current().data.photo="";toast("Storage is full. Export a backup or use a smaller photo.")}
   };
   img.onerror=()=>toast("Could not read this photo");
   img.src=reader.result;
 };
 reader.readAsDataURL(file);
});
$("#removePhotoBtn").onclick=()=>{current().data.photo="";$("#photoInput").value="";save();renderFields();toast("Profile photo removed")};
load();