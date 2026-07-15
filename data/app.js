/* ════ app.js — shared logic for all pages ════
   Each page sets a global SCOPE before loading this file:
   SCOPE = { dataPage: "main"|"airline"|"sim"|"ALL", subjects: "ALL"|["MET"] }
*/

/* ════ STATE ════ */
let sessionKnown = 0;
let sessionTests = 0;
let flashSubject = "ALL";
let flashDeck = [];
let flashIndex = 0;
let flashFlipped = false;
let testQuestions = [];
let testIndex = 0;
let testAnswers = [];
let testTimerInterval = null;
let testTimeLeft = 0;
let testTimerPerQ = 0;

/* ════ DATA HELPERS ════ */
function scopedData() {
  let d = DATA;
  if (SCOPE.dataPage !== "ALL") d = d.filter(x => x.page === SCOPE.dataPage);
  if (Array.isArray(SCOPE.subjects)) d = d.filter(x => SCOPE.subjects.includes(x.subject));
  return d;
}

/* ════ INIT ════ */
function init() {
  updateStats();
  buildFilters();
  const qaList = document.getElementById("qaList");
  if (qaList) buildQAList("qaList");
  const airlineList = document.getElementById("airlineList");
  if (airlineList) buildQAList("airlineList", "airline");
  const simList = document.getElementById("simList");
  if (simList) buildQAList("simList", "sim");
  buildFlashDeck("ALL");
  const notesSidebar = document.getElementById("notesSidebar");
  if (notesSidebar) buildNotesSidebar();
  const testSubjectSelect = document.getElementById("testSubjectSelect");
  if (testSubjectSelect) buildTestSubjectSelect();
}

function updateStats() {
  const mainQs = DATA.filter(d => d.page === "main");
  const scopeQs = scopedData();

  const elTotal = document.getElementById("statTotal");
  if (elTotal) elTotal.textContent = scopeQs.length;

  const elSubjects = document.getElementById("statSubjects");
  if (elSubjects) elSubjects.textContent = Object.keys(NOTES).length;

  const elKnown = document.getElementById("statKnown");
  if (elKnown) elKnown.textContent = sessionKnown;

  const elTests = document.getElementById("statTests");
  if (elTests) elTests.textContent = sessionTests;

  const elQa = document.getElementById("mcQa");
  if (elQa) {
    const q = scopeQs.filter(d => d.page === "main");
    elQa.textContent = `${q.length} questions`;
  }
  const elFlash = document.getElementById("mcFlash");
  if (elFlash) {
    const q = scopeQs.filter(d => d.page === "main");
    elFlash.textContent = `${q.length} cards`;
  }
  const elTest = document.getElementById("mcTest");
  if (elTest) {
    const q = scopeQs.filter(d => d.page === "main" && d.options);
    elTest.textContent = `${q.length} MCQ questions`;
  }
  const elAirline = document.getElementById("mcAirline");
  if (elAirline) {
    elAirline.textContent = `${DATA.filter(d => d.page === "airline").length} questions`;
  }
  const elSim = document.getElementById("mcSim");
  if (elSim) {
    elSim.textContent = `${DATA.filter(d => d.page === "sim").length} questions`;
  }
}

/* ════ NAVIGATION ════ */
function goPage(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  document.getElementById("page-search").classList.remove("active");
  if (btn) btn.classList.add("active");
  if (id === "flash") renderFlashCard();
  document.getElementById("globalSearch").value = "";
}

/* ════ THEME ════ */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("themeLabel").textContent = isDark ? "LIGHT" : "DARK";
}

/* ════ SEARCH ════ */
function handleSearch(val) {
  if (!val.trim()) {
    document.getElementById("page-search").classList.remove("active");
    return;
  }
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-search").classList.add("active");
  const q = val.toLowerCase();
  const results = DATA.filter(d => d.q.toLowerCase().includes(q) || d.a.toLowerCase().includes(q));
  document.getElementById("searchCount").textContent = `${results.length} result${results.length !== 1 ? "s" : ""} for "${val}"`;
  const list = document.getElementById("searchList");
  list.innerHTML = results.length
    ? results.map(d => qaCardHTML(d, val)).join("")
    : `<div class="empty-state"><div class="empty-state-icon">🔍</div><p>No questions found.</p></div>`;
  attachQAListeners(list);
}

function highlight(text, term) {
  if (!term) return text;
  const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}

/* ════ Q&A ════ */
function getSubjectsForScope(pageFilter) {
  const pool = pageFilter
    ? DATA.filter(d => d.page === pageFilter)
    : scopedData();
  return [...new Set(pool.map(d => d.subject))];
}

function buildFilters() {
  const qaFilter = document.getElementById("qaFilter");
  if (qaFilter) buildFilterChips("qaFilter", getSubjectsForScope("main"), sub => filterQA("main", sub, "qaList"));
  const airlineFilter = document.getElementById("airlineFilter");
  if (airlineFilter) buildFilterChips("airlineFilter", getSubjectsForScope("airline"), sub => filterQA("airline", sub, "airlineList"));
  const simFilter = document.getElementById("simFilter");
  if (simFilter) buildFilterChips("simFilter", getSubjectsForScope("sim"), sub => filterQA("sim", sub, "simList"));
  const flashFilter = document.getElementById("flashFilter");
  if (flashFilter) {
    const subjs = Array.isArray(SCOPE.subjects) ? SCOPE.subjects : getSubjectsForScope("main");
    buildFilterChips("flashFilter", ["ALL", ...subjs], sub => { flashSubject = sub; buildFlashDeck(sub); renderFlashCard(); }, true);
  }
}

function buildFilterChips(containerId, subjects, onClickFn, hasAll) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const allSubjects = hasAll ? subjects : ["ALL", ...subjects];
  el.innerHTML = allSubjects.map((s, i) =>
    `<button class="filter-chip${i === 0 ? " active" : ""}" data-sub="${s}">${s === "ALL" ? "All" : (SUBJECTS[s] || s)}</button>`
  ).join("");
  el.querySelectorAll(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      el.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      onClickFn(btn.dataset.sub);
    });
  });
}

function buildQAList(listId, pageOverride) {
  const page = pageOverride || SCOPE.dataPage;
  const items = page === "ALL" ? DATA : DATA.filter(d => d.page === page);
  const list = document.getElementById(listId);
  list.innerHTML = items.length
    ? items.map(d => qaCardHTML(d)).join("")
    : `<div class="empty-state"><div class="empty-state-icon">📭</div><p>No questions yet. Add some to DATA in data/questions.js!</p></div>`;
  attachQAListeners(list);
}

function filterQA(page, subject, listId) {
  const items = subject === "ALL"
    ? DATA.filter(d => d.page === page)
    : DATA.filter(d => d.page === page && d.subject === subject);
  const list = document.getElementById(listId);
  list.innerHTML = items.length
    ? items.map(d => qaCardHTML(d)).join("")
    : `<div class="empty-state"><div class="empty-state-icon">📭</div><p>No questions for this subject yet.</p></div>`;
  attachQAListeners(list);
}

function qaCardHTML(d, searchTerm) {
  return `<div class="qa-card" data-id="${d.id}" data-subject="${d.subject}">
    <div class="qa-question">
      <div style="flex:1">
        <div class="qa-topic">${d.subject} — ${d.topic}</div>
        <div class="qa-q-text">${highlight(d.q, searchTerm)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
        <span class="qa-subject-badge">${d.subject}</span>
        <span class="qa-toggle-icon">▾</span>
      </div>
    </div>
    <div class="qa-answer">${highlight(d.a, searchTerm)}</div>
  </div>`;
}

function attachQAListeners(container) {
  container.querySelectorAll(".qa-question").forEach(q => {
    q.addEventListener("click", () => q.closest(".qa-card").classList.toggle("open"));
  });
}

/* ════ FLASHCARDS ════ */
function buildFlashDeck(subject) {
  const base = Array.isArray(SCOPE.subjects)
    ? DATA.filter(d => d.page === "main" && SCOPE.subjects.includes(d.subject))
    : DATA.filter(d => d.page === "main");
  flashDeck = subject === "ALL" ? [...base] : base.filter(d => d.subject === subject);
  flashDeck = shuffle(flashDeck);
  flashIndex = 0;
  flashFlipped = false;
  updateFlashProgress();
}

function renderFlashCard() {
  if (!flashDeck.length) {
    document.getElementById("flashQ").textContent = "No cards in this subject yet.";
    document.getElementById("flashA").textContent = "";
    document.getElementById("flashSubBadge").textContent = "";
    return;
  }
  const card = flashDeck[flashIndex];
  document.getElementById("flashQ").textContent = card.q;
  document.getElementById("flashA").textContent = card.a;
  document.getElementById("flashSubBadge").textContent = `${card.subject} — ${card.topic}`;
  document.getElementById("flashCard").classList.remove("flipped");
  flashFlipped = false;
  updateFlashProgress();
}

function flipCard() {
  flashFlipped = !flashFlipped;
  document.getElementById("flashCard").classList.toggle("flipped", flashFlipped);
}

function nextCard() {
  flashIndex = (flashIndex + 1) % flashDeck.length;
  renderFlashCard();
}

function markCard(known) {
  if (known) { sessionKnown++; updateStats(); }
  nextCard();
}

function updateFlashProgress() {
  const total = flashDeck.length;
  const pct = total ? Math.round((flashIndex / total) * 100) : 0;
  document.getElementById("flashBar").style.width = pct + "%";
  document.getElementById("flashProgressText").textContent = total ? `${flashIndex + 1} / ${total}` : "0 / 0";
}

/* ════ MOCK TEST ════ */
function buildTestSubjectSelect() {
  const sel = document.getElementById("testSubjectSelect");
  const pool = Array.isArray(SCOPE.subjects)
    ? DATA.filter(d => d.page === "main" && d.options && SCOPE.subjects.includes(d.subject))
    : DATA.filter(d => d.page === "main" && d.options);
  const subjects = [...new Set(pool.map(d => d.subject))];
  sel.innerHTML = `<option value="ALL">All Subjects</option>` +
    subjects.map(s => `<option value="${s}">${SUBJECTS[s] || s}</option>`).join("");
}

function startTest() {
  const subject = document.getElementById("testSubjectSelect").value;
  const numQ = document.getElementById("testNumQ").value;
  testTimerPerQ = parseInt(document.getElementById("testTimeQ").value);
  let pool = Array.isArray(SCOPE.subjects)
    ? DATA.filter(d => d.page === "main" && d.options && SCOPE.subjects.includes(d.subject))
    : DATA.filter(d => d.page === "main" && d.options);
  if (subject !== "ALL") pool = pool.filter(d => d.subject === subject);
  pool = shuffle(pool);
  testQuestions = numQ === "all" ? pool : pool.slice(0, parseInt(numQ));
  if (!testQuestions.length) { alert("No MCQ questions for this selection. Add questions with options[] and correct fields."); return; }
  testIndex = 0;
  testAnswers = new Array(testQuestions.length).fill(null);
  document.getElementById("testSetup").style.display = "none";
  document.getElementById("testRunning").style.display = "block";
  document.getElementById("testResult").style.display = "none";
  renderTestQuestion();
}

function renderTestQuestion() {
  const q = testQuestions[testIndex];
  const total = testQuestions.length;
  document.getElementById("testMeta").textContent = `Subject: ${q.subject} — ${q.topic}`;
  document.getElementById("testQNum").textContent = `Question ${testIndex + 1} of ${total}`;
  document.getElementById("testQText").textContent = q.q;
  document.getElementById("testBar").style.width = `${(testIndex / total) * 100}%`;
  document.getElementById("testNextBtn").disabled = true;
  document.getElementById("testExplanation").style.display = "none";
  const opts = document.getElementById("testOptions");
  opts.innerHTML = q.options.map((o, i) =>
    `<button class="test-option" onclick="selectTestOption(${i})">${String.fromCharCode(65 + i)}. ${o}</button>`
  ).join("");
  clearInterval(testTimerInterval);
  if (testTimerPerQ > 0) {
    testTimeLeft = testTimerPerQ;
    updateTimerDisplay();
    testTimerInterval = setInterval(() => {
      testTimeLeft--;
      updateTimerDisplay();
      if (testTimeLeft <= 0) { clearInterval(testTimerInterval); autoAdvance(); }
    }, 1000);
  } else {
    document.getElementById("testTimer").textContent = "";
  }
}

function updateTimerDisplay() {
  const el = document.getElementById("testTimer");
  el.textContent = testTimeLeft + "s";
  el.classList.toggle("warning", testTimeLeft <= 10);
}

function autoAdvance() { if (testAnswers[testIndex] === null) selectTestOption(-1); }

function selectTestOption(idx) {
  clearInterval(testTimerInterval);
  document.getElementById("testTimer").textContent = "";
  if (testAnswers[testIndex] !== null) return;
  testAnswers[testIndex] = idx;
  const q = testQuestions[testIndex];
  document.querySelectorAll(".test-option").forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add("correct");
    else if (i === idx && idx !== q.correct) b.classList.add("wrong");
  });
  if (idx !== -1) {
    const expEl = document.getElementById("testExplanation");
    expEl.style.display = "block";
    expEl.textContent = idx === q.correct ? "✓ Correct! " + q.a.slice(0, 120) + "…" : "✗ Incorrect. " + q.a.slice(0, 120) + "…";
  }
  document.getElementById("testNextBtn").disabled = false;
  document.getElementById("testNextBtn").textContent = testIndex === testQuestions.length - 1 ? "Finish Test →" : "Next →";
}

function nextTestQ() {
  if (testIndex < testQuestions.length - 1) { testIndex++; renderTestQuestion(); }
  else showTestResult();
}

function showTestResult() {
  clearInterval(testTimerInterval);
  document.getElementById("testRunning").style.display = "none";
  document.getElementById("testResult").style.display = "block";
  const correct = testAnswers.filter((a, i) => a === testQuestions[i].correct).length;
  const total = testQuestions.length;
  const pct = Math.round((correct / total) * 100);
  document.getElementById("resultScore").textContent = pct + "%";
  document.getElementById("resultStatus").textContent = pct >= 75 ? "✓ Pass" : "✗ Study More";
  document.getElementById("resultStatus").style.color = pct >= 75 ? "var(--green-pass)" : "var(--red)";
  document.getElementById("resCorrect").textContent = correct;
  document.getElementById("resWrong").textContent = total - correct;
  document.getElementById("resTotal").textContent = total;
  sessionTests++;
  updateStats();
}

function endTestEarly() { clearInterval(testTimerInterval); showTestResult(); }

function resetTest() {
  document.getElementById("testSetup").style.display = "block";
  document.getElementById("testRunning").style.display = "none";
  document.getElementById("testResult").style.display = "none";
}

/* ════ NOTES ════ */
function buildNotesSidebar() {
  const sb = document.getElementById("notesSidebar");
  const notesToShow = Array.isArray(SCOPE.subjects)
    ? Object.fromEntries(Object.entries(NOTES).filter(([k]) => SCOPE.subjects.includes(k)))
    : NOTES;
  sb.innerHTML = Object.entries(notesToShow).map(([code, n]) =>
    `<button class="notes-subject-btn" onclick="showNote('${code}', this)"><span class="subj-code">${code}</span>${n.label}</button>`
  ).join("");
}

function showNote(code, btn) {
  document.querySelectorAll(".notes-subject-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("notesContent").innerHTML = NOTES[code].html;
}

/* ════ UTILS ════ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

init();
