const rules = (window.RULE_DATA || []).slice();

const categoryOrder = [
  "전체","기본규정","경기장","선수·지도자","체급","계체","경기운영",
  "허용기술","득점","감점 및 금지행위","우세판정","경기결과",
  "선수안전","심판","소청·상벌","징계","기타"
];
const categories = categoryOrder.filter(c => c === "전체" || rules.some(r => r.category === c));

let activeCategory = "전체";
let currentQuery = "";
let selectedId = null;
let favoritesOnly = false;

const els = {
  searchInput: document.querySelector("#searchInput"),
  searchButton: document.querySelector("#searchButton"),
  categoryChips: document.querySelector("#categoryChips"),
  tocList: document.querySelector("#tocList"),
  resultsList: document.querySelector("#resultsList"),
  resultsTitle: document.querySelector("#resultsTitle"),
  resultsCount: document.querySelector("#resultsCount"),
  detailPanel: document.querySelector("#detailPanel"),
  recentSearches: document.querySelector("#recentSearches"),
  clearFilters: document.querySelector("#clearFilters"),
  favoritesToggle: document.querySelector("#favoritesToggle"),
  quickSearches: document.querySelector("#quickSearches")
};

function getFavorites() {
  try { return JSON.parse(localStorage.getItem("tkd-favorites") || "[]"); }
  catch { return []; }
}
function saveFavorites(ids) {
  localStorage.setItem("tkd-favorites", JSON.stringify(ids));
}
function getRecent() {
  try { return JSON.parse(localStorage.getItem("tkd-recent") || "[]"); }
  catch { return []; }
}
function saveRecent(term) {
  if (!term.trim()) return;
  const next = [term.trim(), ...getRecent().filter(v => v !== term.trim())].slice(0, 8);
  localStorage.setItem("tkd-recent", JSON.stringify(next));
}
function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\s·ㆍ.,()\[\]{}'"“”‘’:;!?/\\_-]+/g, "");
}
function excerpt(text, query, max=115) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!query) return clean.slice(0, max) + (clean.length > max ? "…" : "");
  const q = query.trim();
  const i = clean.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return clean.slice(0, max) + (clean.length > max ? "…" : "");
  const start = Math.max(0, i - 35);
  const end = Math.min(clean.length, i + q.length + 70);
  return (start ? "…" : "") + clean.slice(start, end) + (end < clean.length ? "…" : "");
}

function filteredRules() {
  const q = normalize(currentQuery);
  const favorites = getFavorites();
  return rules.filter(rule => {
    const categoryMatch = activeCategory === "전체" || rule.category === activeCategory;
    const favoriteMatch = !favoritesOnly || favorites.includes(rule.id);
    const haystack = normalize([
      rule.article, rule.title, rule.category, rule.officialText, ...(rule.keywords || [])
    ].join(" "));
    return categoryMatch && favoriteMatch && (!q || haystack.includes(q));
  });
}

function renderCategories() {
  els.categoryChips.innerHTML = categories.map(cat =>
    `<button class="chip ${cat === activeCategory ? "active" : ""}" data-category="${cat}">${cat}</button>`
  ).join("");
  els.categoryChips.querySelectorAll("[data-category]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      selectedId = null;
      render();
      renderDetail(null);
    });
  });
}

function renderQuickSearches() {
  const items = window.QUICK_SEARCHES || [];
  if (!els.quickSearches) return;
  els.quickSearches.innerHTML = items.map(item =>
    `<button class="quick-btn" data-quick="${escapeHtml(item.query)}">${escapeHtml(item.label)}</button>`
  ).join("");
  els.quickSearches.querySelectorAll("[data-quick]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = "전체";
      favoritesOnly = false;
      els.searchInput.value = btn.dataset.quick;
      runSearch();
    });
  });
}

function renderRecent() {
  const items = getRecent();
  els.recentSearches.innerHTML = items.length
    ? "<span class='muted'>최근 검색:</span>" + items.map(v => `<button data-recent="${escapeHtml(v)}">${escapeHtml(v)}</button>`).join("")
    : "";
  els.recentSearches.querySelectorAll("[data-recent]").forEach(btn => {
    btn.addEventListener("click", () => {
      els.searchInput.value = btn.dataset.recent;
      runSearch();
    });
  });
}

function renderToc(items) {
  els.tocList.innerHTML = items.length ? items.map(rule =>
    `<button class="toc-item ${selectedId === rule.id ? "active" : ""}" data-id="${rule.id}">
      <strong>${rule.article}</strong><br><span>${rule.title}</span>
    </button>`
  ).join("") : "<p class='muted'>일치하는 항목이 없습니다.</p>";
  bindRuleButtons(els.tocList);
}

function renderResults(items) {
  const label = favoritesOnly ? "즐겨찾기" : activeCategory === "전체" ? "전체 조항" : activeCategory;
  els.resultsTitle.textContent = currentQuery ? `“${currentQuery}” 검색 결과` : label;
  els.resultsCount.textContent = `${items.length}개 조항 · 2026 경기규칙 PDF 기반`;
  els.resultsList.innerHTML = items.length ? items.map(rule =>
    `<button class="result-item" data-id="${rule.id}">
      <div class="result-top">
        <span class="result-title">${rule.article} · ${rule.title}</span>
        <span class="tag">${rule.category}</span>
      </div>
      <p>${escapeHtml(excerpt(rule.officialText.replace(/^제[^\n]+\n?/, ""), currentQuery))}</p>
      <small class="source-note">PDF ${rule.sourcePageStart}${rule.sourcePageEnd !== rule.sourcePageStart ? "–" + rule.sourcePageEnd : ""}쪽</small>
    </button>`
  ).join("") : `<div class="empty-state"><strong>검색 결과가 없습니다</strong><span>다른 키워드나 카테고리를 선택해 보세요.</span></div>`;
  bindRuleButtons(els.resultsList);
}

function renderDetail(rule) {
  if (!rule) {
    els.detailPanel.innerHTML = `<div class="empty-state"><strong>규정을 선택하세요</strong><span>목차나 검색 결과를 누르면 2026 경기규칙 원문을 확인할 수 있습니다.</span></div>`;
    return;
  }
  const favorites = getFavorites();
  const isFavorite = favorites.includes(rule.id);
  const pages = rule.sourcePageStart === rule.sourcePageEnd
    ? `${rule.sourcePageStart}쪽`
    : `${rule.sourcePageStart}–${rule.sourcePageEnd}쪽`;

  els.detailPanel.innerHTML = `
    <div class="detail-head">
      <small>${rule.category} · 2026 경기규칙 · PDF ${pages}</small>
      <h3>${rule.article} · ${rule.title}</h3>
    </div>
    <div class="detail-body">
      <div class="source-banner">
        <strong>공식 자료 기반</strong>
        <span>업로드된 「2026 태권도 겨루기 경기규칙」 PDF에서 추출한 내용입니다. 개정일: 2025.11.26.</span>
      </div>
      <section class="info-block">
        <h4>규정 원문 및 해설</h4>
        <pre class="official-text">${escapeHtml(rule.officialText)}</pre>
      </section>
      ${renderEducation(rule)}
      <section class="info-block">
        <h4>관련 기능</h4>
        <p class="muted">즐겨찾기와 빠른검색을 이용하면 경기 현장에서 자주 보는 조항을 더 빨리 찾을 수 있습니다.</p>
      </section>
    </div>
    <div class="detail-actions">
      <button id="copyBtn" class="favorite-btn" type="button">원문 복사</button>
      <button id="favoriteBtn" class="favorite-btn ${isFavorite ? "active" : ""}" type="button">${isFavorite ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기 추가"}</button>
    </div>
  `;

  document.querySelector("#favoriteBtn").addEventListener("click", () => {
    const next = getFavorites();
    const index = next.indexOf(rule.id);
    if (index >= 0) next.splice(index, 1); else next.push(rule.id);
    saveFavorites(next);
    render();
    renderDetail(rule);
  });
  document.querySelector("#copyBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(rule.officialText);
      document.querySelector("#copyBtn").textContent = "복사됨";
      setTimeout(() => { const b=document.querySelector("#copyBtn"); if(b) b.textContent="원문 복사"; }, 1200);
    } catch {}
  });
}

function renderEducation(rule) {
  const data = (window.EDUCATION_DATA || {})[rule.id];
  if (!data) {
    return `<section class="info-block">
      <h4>교육용 해설</h4>
      <p class="muted">이 조항의 쉬운 해설과 판정 사례는 순차적으로 추가할 예정입니다.</p>
    </section>`;
  }

  const points = (data.refereePoints || []).map(v => `<li>${escapeHtml(v)}</li>`).join("");
  const cases = (data.cases || []).map(item => `
    <article class="case-card">
      <h5>${escapeHtml(item.title)}</h5>
      <p><strong>상황</strong> ${escapeHtml(item.situation)}</p>
      <p><strong>판정</strong> <span class="decision-badge">${escapeHtml(item.decision)}</span></p>
      <p><strong>근거</strong> ${escapeHtml(item.reason)}</p>
    </article>
  `).join("");

  const requestTable = data.requestTable ? `
    <section class="info-block education-block">
      <h4>지도자 영상판독 신청 가능 / 불가</h4>
      <div class="ivr-grid">
        <div class="ivr-column ivr-yes">
          <h5>✓ 신청 가능</h5>
          <ul>${(data.requestTable.allowed || []).map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>
        </div>
        <div class="ivr-column ivr-no">
          <h5>✕ 신청 대상 아님</h5>
          <ul>${(data.requestTable.notAllowed || []).map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>
        </div>
      </div>
      ${data.requestTable.note ? `<p class="ivr-note"><strong>요청 범위:</strong> ${escapeHtml(data.requestTable.note)}</p>` : ""}
    </section>
  ` : "";

  return `
    <section class="info-block education-block">
      <h4>쉽게 풀어쓴 해설 <span class="edu-label">원문 기반 교육용</span></h4>
      <p>${escapeHtml(data.summary)}</p>
    </section>
    <section class="info-block education-block">
      <h4>심판 핵심 포인트</h4>
      <ul class="referee-points">${points}</ul>
    </section>
    ${requestTable}
    <section class="info-block education-block">
      <h4>실제 경기 상황 예시</h4>
      <div class="case-list">${cases}</div>
      <p class="education-note">※ 위 사례는 해당 조항 원문을 이해하기 쉽게 재구성한 교육용 예시입니다. 실제 판정은 해당 경기의 적용 규정과 구체적 상황을 함께 확인하세요.</p>
    </section>
  `;
}

function bindRuleButtons(root) {
  root.querySelectorAll("[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedId = btn.dataset.id;
      render();
      renderDetail(rules.find(r => r.id === selectedId));
      if (window.innerWidth < 720) els.detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function runSearch() {
  currentQuery = els.searchInput.value.trim();
  saveRecent(currentQuery);
  selectedId = null;
  render();
  const found = filteredRules();
  if (found.length === 1) {
    selectedId = found[0].id;
    render();
    renderDetail(found[0]);
  } else {
    renderDetail(null);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  renderCategories();
  renderQuickSearches();
  renderRecent();
  const items = filteredRules();
  renderToc(items);
  renderResults(items);
  els.favoritesToggle.textContent = favoritesOnly ? "★ 즐겨찾기만 보는 중" : "☆ 즐겨찾기";
  els.favoritesToggle.classList.toggle("active", favoritesOnly);
  if (selectedId) renderDetail(rules.find(r => r.id === selectedId));
}

els.searchButton.addEventListener("click", runSearch);
els.searchInput.addEventListener("keydown", event => { if (event.key === "Enter") runSearch(); });
els.clearFilters.addEventListener("click", () => {
  activeCategory = "전체";
  currentQuery = "";
  favoritesOnly = false;
  selectedId = null;
  els.searchInput.value = "";
  render();
  renderDetail(null);
});
els.favoritesToggle.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  selectedId = null;
  render();
  renderDetail(null);
});

render();
if (rules.length) {
  selectedId = rules[0].id;
  render();
  renderDetail(rules[0]);
}
