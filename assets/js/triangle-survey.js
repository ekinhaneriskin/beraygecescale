/* Triangular Survey Template
   This file is the reusable survey engine. It does not contain study-specific questions.
   Put all study content in content/survey-content.template.js or in your own content file.
*/

const SURVEY = window.SURVEY_CONTENT || {};

const CONFIG = Object.assign({
  apiUrl: "[SUBMISSION_ENDPOINT]", // Replace with your backend endpoint, e.g., "/submit". Do not commit private URLs or API keys.
  requiredAllTriangleItems: true,
  minRequiredTriangleItems: 1,
  pageSize: 20,
  saveKey: "triangular_survey_template_state",
  storeUserAgent: false, // Set true only if approved by your ethics/privacy protocol.
  storeTimestamp: true
}, SURVEY.config || {});

const COMPONENTS = Object.assign({
  masculine: { label: "[COMPONENT_A_LABEL]", cornerLabel: "[COMPONENT_A_CORNER_LABEL]" },
  feminine: { label: "[COMPONENT_B_LABEL]", cornerLabel: "[COMPONENT_B_CORNER_LABEL]" },
  androgynous: { label: "[COMPONENT_C_LABEL]", cornerLabel: "[COMPONENT_C_CORNER_LABEL]" }
}, SURVEY.components || {});

const TRIANGLE_ITEMS = Array.isArray(SURVEY.triangleItems) ? SURVEY.triangleItems : [];
const DEMOGRAPHICS = Array.isArray(SURVEY.demographics) ? SURVEY.demographics : [];
const OPEN_ENDED = Array.isArray(SURVEY.openEnded) ? SURVEY.openEnded : [];

const TRI_POSITIONS = [
  {t:3.2,l:49.7},
  {t:16.67,l:42.6},{t:16.67,l:56.8},
  {t:32.83,l:34.55},{t:32.83,l:49.7},{t:32.83,l:64.9},
  {t:49.0,l:26.5},{t:49.0,l:42.6},{t:49.0,l:56.8},{t:49.0,l:72.6},
  {t:65.17,l:18.2},{t:65.17,l:33.93},{t:65.17,l:49.7},{t:65.17,l:64.9},{t:65.17,l:80.6},
  {t:81.33,l:10.4},{t:81.33,l:26.5},{t:81.33,l:42.6},{t:81.33,l:56.8},{t:81.33,l:72.6},{t:81.33,l:88.9},
  {t:96.5,l:2.6},{t:96.5,l:17.76},{t:96.5,l:33.93},{t:96.5,l:49.7},{t:96.5,l:64.9},{t:96.5,l:81.6},{t:96.5,l:96.6}
];

const POINTS_DATA = {
  "1":  { feminine:100, masculine:0, androgynous:0 },
  "2":  { feminine:83.3333333333333, masculine:16.6666666666667, androgynous:0 },
  "3":  { feminine:83.3333333333333, masculine:0, androgynous:16.6666666666667 },
  "4":  { feminine:66.6666666666667, masculine:33.3333333333333, androgynous:0 },
  "5":  { feminine:66.6666666666667, masculine:16.6666666666667, androgynous:16.6666666666667 },
  "6":  { feminine:66.6666666666667, masculine:0, androgynous:33.3333333333333 },
  "7":  { feminine:50, masculine:50, androgynous:0 },
  "8":  { feminine:50, masculine:33.3333333333333, androgynous:16.6666666666667 },
  "9":  { feminine:50, masculine:16.6666666666667, androgynous:33.3333333333334 },
  "10": { feminine:50, masculine:0, androgynous:50 },
  "11": { feminine:33.3333333333333, masculine:66.6666666666667, androgynous:0 },
  "12": { feminine:33.3333333333333, masculine:50, androgynous:16.6666666666667 },
  "13": { feminine:33.3333333333333, masculine:33.3333333333333, androgynous:33.3333333333334 },
  "14": { feminine:33.3333333333333, masculine:16.6666666666667, androgynous:50 },
  "15": { feminine:33.3333333333333, masculine:0, androgynous:66.6666666666667 },
  "16": { feminine:16.6666666666666, masculine:83.3333333333333, androgynous:0 },
  "17": { feminine:16.6666666666666, masculine:66.6666666666667, androgynous:16.6666666666667 },
  "18": { feminine:16.6666666666666, masculine:50, androgynous:33.3333333333334 },
  "19": { feminine:16.6666666666666, masculine:33.3333333333333, androgynous:50 },
  "20": { feminine:16.6666666666666, masculine:16.6666666666667, androgynous:66.6666666666667 },
  "21": { feminine:16.6666666666666, masculine:0, androgynous:83.3333333333334 },
  "22": { feminine:0, masculine:100, androgynous:0 },
  "23": { feminine:0, masculine:83.3333333333333, androgynous:16.6666666666667 },
  "24": { feminine:0, masculine:66.6666666666667, androgynous:33.3333333333333 },
  "25": { feminine:0, masculine:50, androgynous:50 },
  "26": { feminine:0, masculine:33.3333333333333, androgynous:66.6666666666667 },
  "27": { feminine:0, masculine:16.6666666666666, androgynous:83.3333333333334 },
  "28": { feminine:0, masculine:0, androgynous:100 }
};

const $ = sel => document.querySelector(sel);

const slugify = s => (s || "")
  .toLocaleLowerCase("tr-TR")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/ı/g, "i")
  .replace(/ç/g, "c")
  .replace(/ğ/g, "g")
  .replace(/ö/g, "o")
  .replace(/ş/g, "s")
  .replace(/ü/g, "u")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

function loadState(){
  try { return JSON.parse(localStorage.getItem(CONFIG.saveKey)) || {}; }
  catch (_) { return {}; }
}

function saveState(s){
  localStorage.setItem(CONFIG.saveKey, JSON.stringify(s));
}

let state = Object.assign({
  page: 0,
  demographics: {},
  triangleAnswers: {},
  openEndedAnswers: {},
  tutorialOk: false
}, loadState());

let postRevealedOnce = false;

function setText(id, value){
  const el = document.getElementById(id);
  if(el && value !== undefined && value !== null) el.textContent = value;
}

function setHtml(id, value){
  const el = document.getElementById(id);
  if(el && value !== undefined && value !== null) el.innerHTML = value;
}

function initStaticText(){
  setText("surveyTitle", SURVEY.title || "[SURVEY_TITLE]");
  setHtml("preamble", SURVEY.preambleHtml || "<p>[PREAMBLE_HTML_PLACEHOLDER]</p>");
  setText("consentText", SURVEY.consentText || "[CONSENT_CHECKBOX_TEXT]");
  setText("demographicsHeading", SURVEY.demographicsTitle || "[DEMOGRAPHICS_SECTION_TITLE]");
  setText("triangleHeading", SURVEY.triangleTitle || "[TRIANGLE_SECTION_TITLE]");
  setText("triangleInstructions", SURVEY.triangleInstructions || "[TRIANGLE_INSTRUCTIONS]");
  setText("openEndedHeading", SURVEY.openEndedTitle || "[OPEN_ENDED_SECTION_TITLE]");
  setText("tutTitle", SURVEY.tutorialTitle || "[TUTORIAL_TITLE]");
  setHtml("tutorialBody", SURVEY.tutorialHtml || "<p>[TUTORIAL_HTML_PLACEHOLDER]</p>");
  setHtml("debriefText", SURVEY.debriefHtml || "<p>[DEBRIEF_HTML_PLACEHOLDER]</p>");
  document.documentElement.lang = SURVEY.language || "[LANGUAGE_CODE]";
}

function buildDemographics(){
  const host = $("#demographicsHost");
  host.innerHTML = "";

  DEMOGRAPHICS.forEach(field => {
    const wrap = document.createElement("div");
    wrap.className = "col-6";
    const required = field.required ? "required" : "";
    const value = state.demographics[field.name] || "";

    if(field.type === "number" || field.type === "text"){
      wrap.innerHTML = `
        <label for="${field.name}">${field.label}</label>
        <input id="${field.name}" name="${field.name}" type="${field.type}" value="${value}" ${required}
          ${field.min ? `min="${field.min}"` : ""} ${field.max ? `max="${field.max}"` : ""}
          ${field.maxlength ? `maxlength="${field.maxlength}"` : ""}>
      `;
    }

    if(field.type === "radio"){
      const options = (field.options || []).map((opt, idx) => {
        const id = `${field.name}_${idx}`;
        const checked = state.demographics[field.name] === opt.value ? "checked" : "";
        return `<div class="radline"><input type="radio" id="${id}" name="${field.name}" value="${opt.value}" ${checked} ${required}><label for="${id}">${opt.label}</label></div>`;
      }).join("");
      wrap.innerHTML = `<fieldset><legend>${field.label}</legend>${options}</fieldset>`;
    }

    host.appendChild(wrap);
  });
}

function buildOpenEnded(){
  const host = $("#openEndedHost");
  host.innerHTML = "";

  OPEN_ENDED.forEach(q => {
    const value = state.openEndedAnswers[q.name] || "";
    const block = document.createElement("div");
    block.className = "card";
    block.innerHTML = `
      <label for="${q.name}">${q.label}</label>
      <textarea id="${q.name}" name="${q.name}" rows="${q.rows || 3}" ${q.required ? "required" : ""}>${value}</textarea>
    `;
    host.appendChild(block);
  });
}

function pageCount(){
  return Math.ceil(TRIANGLE_ITEMS.length / CONFIG.pageSize) || 1;
}

function updatePageNav(){
  const pages = pageCount();
  const pageNav = $("#pageNav");
  if(pageNav) pageNav.hidden = pages <= 1;
  setText("pageTotal", String(pages));
  setText("pageNow", String(state.page + 1));
  $("#prevPage").disabled = state.page <= 0;
  $("#nextPage").disabled = state.page >= pages - 1;
}

function answerLabel(d){
  return `${COMPONENTS.masculine.label}: ${d.masculine.toFixed(1)}%, ${COMPONENTS.feminine.label}: ${d.feminine.toFixed(1)}%, ${COMPONENTS.androgynous.label}: ${d.androgynous.toFixed(1)}%`;
}

function refreshProgress(){
  const done = Object.keys(state.triangleAnswers).length;
  const total = TRIANGLE_ITEMS.length;
  setText("doneCount", String(done));
  setText("totalCount", String(total));
  setText("gateProgress", String(done));
  setText("gateTotal", String(total));
  $("#progressBar").style.width = total ? (done / total * 100).toFixed(1) + "%" : "0%";

  const complete = total > 0 && done >= total;
  $("#gateNote").hidden = complete;
  $("#postSections").hidden = !complete;

  if(complete && !postRevealedOnce){
    postRevealedOnce = true;
    $("#postSections").scrollIntoView({behavior:"smooth", block:"start"});
  }
}

function buildTriangle(container, slug){
  const box = document.createElement("div");
  box.className = "tri-box";

  const tri = document.createElement("div");
  tri.className = "tri";
  tri.setAttribute("role", "radiogroup");

  TRI_POSITIONS.forEach((pos, idx) => {
    const i = idx + 1;
    const lab = document.createElement("label");
    lab.className = "tp";
    lab.style.top = pos.t + "%";
    lab.style.left = pos.l + "%";
    lab.title = `Point ${i}`;

    const r = document.createElement("input");
    r.type = "radio";
    r.className = "radio";
    r.name = `grp_${slug}`;
    r.value = String(i);

    lab.appendChild(r);
    tri.appendChild(lab);
  });

  const topLbl = document.createElement("div");
  topLbl.className = "c-label c-top";
  topLbl.innerHTML = `<i></i>${COMPONENTS.feminine.cornerLabel}`;

  const leftLbl = document.createElement("div");
  leftLbl.className = "c-label c-left";
  leftLbl.innerHTML = `<i></i>${COMPONENTS.masculine.cornerLabel}`;

  const rightLbl = document.createElement("div");
  rightLbl.className = "c-label c-right";
  rightLbl.innerHTML = `<i></i>${COMPONENTS.androgynous.cornerLabel}`;

  box.appendChild(tri);
  box.appendChild(topLbl);
  box.appendChild(leftLbl);
  box.appendChild(rightLbl);
  container.appendChild(box);

  return tri;
}

function buildBars(container, base){
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="legend">
      <span class="lg-m"><i></i>${COMPONENTS.masculine.label}</span>
      <span class="lg-f"><i></i>${COMPONENTS.feminine.label}</span>
      <span class="lg-a"><i></i>${COMPONENTS.androgynous.label}</span>
    </div>
    <div class="bars">
      <div class="bar" data-kind="m"><div class="bc" id="${base}-m"></div></div>
      <div class="bar" data-kind="f"><div class="bc" id="${base}-f"></div></div>
      <div class="bar" data-kind="a"><div class="bc" id="${base}-a"></div></div>
    </div>
    <div class="muted center" style="margin-top:4px">
      Selection: <span id="${base}-t">None</span>
    </div>
  `;
  container.appendChild(wrap);
}

function renderPage(){
  refreshProgress();
  $("#host").innerHTML = "";

  const start = state.page * CONFIG.pageSize;
  const list = TRIANGLE_ITEMS.slice(start, start + CONFIG.pageSize);

  list.forEach((item, i) => {
    const title = item.label || `[TRIANGLE_ITEM_${start + i + 1}]`;
    const itemId = item.id || slugify(title);
    const slug = slugify(itemId);
    const idx = start + i + 1;

    const card = document.createElement("section");
    card.className = "card";
    card.innerHTML = `<h3 style="margin:.25rem 0 .6rem">${idx}. ${title}</h3>`;

    const triWrap = document.createElement("div");
    card.appendChild(triWrap);
    const barsBase = "bar-" + slug;

    buildBars(card, barsBase);
    const tri = buildTriangle(triWrap, slug);
    $("#host").appendChild(card);

    const cur = state.triangleAnswers[itemId];
    if(cur){
      const r = tri.querySelector(`input[value="${cur.point}"]`);
      if(r) r.checked = true;
      document.getElementById(barsBase + "-m").style.height = cur.masculine + "%";
      document.getElementById(barsBase + "-f").style.height = cur.feminine + "%";
      document.getElementById(barsBase + "-a").style.height = cur.androgynous + "%";
      document.getElementById(barsBase + "-t").textContent = cur.label;
    }

    tri.addEventListener("change", e => {
      if(!e.target?.matches('input[type="radio"]')) return;
      const val = Number(e.target.value);
      const d = POINTS_DATA[String(val)];

      const result = {
        itemId,
        itemLabel: title,
        point: val,
        masculine: d.masculine,
        feminine: d.feminine,
        androgynous: d.androgynous,
        label: answerLabel(d)
      };

      state.triangleAnswers[itemId] = result;
      saveState(state);

      document.getElementById(barsBase + "-m").style.height = d.masculine + "%";
      document.getElementById(barsBase + "-f").style.height = d.feminine + "%";
      document.getElementById(barsBase + "-a").style.height = d.androgynous + "%";
      document.getElementById(barsBase + "-t").textContent = result.label;

      refreshProgress();
    });
  });

  updatePageNav();
}

function collectFormData(){
  const meta = {};
  if(CONFIG.storeTimestamp) meta.timestamp = Date.now();
  if(CONFIG.storeUserAgent) meta.userAgent = navigator.userAgent;

  return {
    demographics: state.demographics,
    triangleAnswers: state.triangleAnswers,
    openEndedAnswers: state.openEndedAnswers,
    meta
  };
}

function bindEvents(){
  $("#consent").addEventListener("change", () => {
    $("#start").disabled = !$("#consent").checked;
  });

  $("#start").addEventListener("click", () => {
    if(!$("#consent").checked) return;
    $("#form").hidden = false;
    if(!state.tutorialOk) $("#tutorial").hidden = false;
    else $("#form").scrollIntoView({behavior:"smooth"});
  });

  $("#reset").addEventListener("click", () => {
    localStorage.removeItem(CONFIG.saveKey);
    location.reload();
  });

  $("#tutOk").addEventListener("click", () => {
    state.tutorialOk = true;
    saveState(state);
    $("#tutorial").hidden = true;
    $("#host").scrollIntoView({behavior:"smooth", block:"start"});
  });

  $("#helpFab").addEventListener("click", () => {
    $("#tutorial").hidden = false;
  });

  $("#prevPage").addEventListener("click", () => {
    if(state.page > 0){
      state.page--;
      saveState(state);
      renderPage();
      $("#host").scrollIntoView({behavior:"smooth", block:"start"});
    }
  });

  $("#nextPage").addEventListener("click", () => {
    if(state.page < pageCount() - 1){
      state.page++;
      saveState(state);
      renderPage();
      $("#host").scrollIntoView({behavior:"smooth", block:"start"});
    }
  });

  $("#form").addEventListener("input", e => {
    const name = e.target.name;
    if(!name) return;

    if(DEMOGRAPHICS.some(f => f.name === name)){
      state.demographics[name] = e.target.value;
    }
    if(OPEN_ENDED.some(f => f.name === name)){
      state.openEndedAnswers[name] = e.target.value;
    }
    saveState(state);
  });

  $("#form").addEventListener("submit", async e => {
    e.preventDefault();

    const chosen = Object.keys(state.triangleAnswers).length;
    const total = TRIANGLE_ITEMS.length;
    if(CONFIG.requiredAllTriangleItems && chosen !== total){
      $("#formMsg").textContent = "Please complete all triangular-scale items.";
      return;
    }
    if(!CONFIG.requiredAllTriangleItems && chosen < CONFIG.minRequiredTriangleItems){
      $("#formMsg").textContent = `Please complete at least ${CONFIG.minRequiredTriangleItems} triangular-scale items.`;
      return;
    }
    if(!$("#form").reportValidity()){
      $("#formMsg").textContent = "Please complete required fields.";
      return;
    }

    const payload = collectFormData();

    // Placeholder mode: no private backend is included in this template.
    if(!CONFIG.apiUrl || CONFIG.apiUrl === "[SUBMISSION_ENDPOINT]"){
      $("#formMsg").textContent = "No submission endpoint configured. Data printed to console for local testing.";
      console.log("Survey payload:", payload);
      return;
    }

    try{
      $("#formMsg").textContent = "Submitting...";
      const res = await fetch(CONFIG.apiUrl, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });

      if(res.ok){
        localStorage.removeItem(CONFIG.saveKey);
        $("#formMsg").textContent = "Thank you. Your responses were recorded.";
        Array.from($("#form").elements).forEach(el => el.disabled = true);
        $("#debrief").hidden = false;
        $("#debrief").scrollIntoView({behavior:"smooth"});
      }else{
        $("#formMsg").textContent = "Submission error.";
      }
    }catch(err){
      $("#formMsg").textContent = "Network error. Please check your connection and try again.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStaticText();
  buildDemographics();
  buildOpenEnded();

  const pagesNow = pageCount();
  if(state.page >= pagesNow){
    state.page = Math.max(0, pagesNow - 1);
    saveState(state);
  }

  bindEvents();
  renderPage();
  refreshProgress();
});
