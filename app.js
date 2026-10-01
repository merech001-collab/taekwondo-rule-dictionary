const rules = [
  {
    id: "sample-01",
    article: "샘플 제1조",
    title: "경기구역 이탈 상황",
    category: "감점 및 금지행위",
    keywords: ["감점", "경계선", "경기구역", "이탈"],
    summary: "선수가 경기구역 밖으로 이탈하는 상황을 가정한 샘플 규정입니다.",
    original: "※ 샘플 원문: 실제 공식 경기규칙이 아닙니다. 공식 PDF 입력 후 해당 조항의 정확한 원문으로 교체합니다.",
    easy: "경기 중 선수가 지정된 경기구역을 벗어났을 때 어떤 기준으로 판단하는지 빠르게 확인하는 영역입니다.",
    keypoint: "실제 적용 전에는 반드시 최신 공식 경기규칙의 해당 조항과 개정일을 확인해야 합니다.",
    caseText: "샘플 상황: 두 선수가 공방 중 한 선수가 경계선 밖으로 완전히 벗어난 것으로 보이는 상황.",
    judgement: "샘플 판정: 공식 규정 입력 전이므로 실제 감점 여부를 확정하지 않습니다.",
    related: ["경기구역", "감점 및 금지행위"]
  },
  {
    id: "sample-02",
    article: "샘플 제2조",
    title: "비디오판독 요청",
    category: "비디오판독",
    keywords: ["비디오판독", "IVR", "판독", "요청"],
    summary: "코치의 비디오판독 요청 절차를 보여주기 위한 샘플 항목입니다.",
    original: "※ 샘플 원문: 실제 공식 경기규칙이 아닙니다. 공식 규정의 판독 절차와 요청 가능 사유를 입력할 예정입니다.",
    easy: "어떤 상황에서 판독을 요청할 수 있고, 요청 후 어떤 절차가 이어지는지 한 화면에서 확인하도록 설계합니다.",
    keypoint: "요청 가능 사유, 요청 횟수, 판독 결과 처리 방식은 대회 적용 규정과 최신 개정본을 기준으로 확인해야 합니다.",
    caseText: "샘플 상황: 머리 공격 득점 여부에 대해 지도자가 판독을 요청하려는 상황.",
    judgement: "샘플 판정: 실제 판독 가능 여부는 공식 규정 입력 후 자동 안내하도록 구현할 예정입니다.",
    related: ["머리 공격", "득점", "코치"]
  },
  {
    id: "sample-03",
    article: "샘플 제3조",
    title: "전자호구 득점 확인",
    category: "전자호구",
    keywords: ["전자호구", "득점", "센서", "강도"],
    summary: "전자호구를 통한 득점 인식 상황을 설명하는 샘플 항목입니다.",
    original: "※ 샘플 원문: 실제 공식 경기규칙이 아닙니다. 전자호구 관련 최신 규정 및 장비 운영 지침으로 교체합니다.",
    easy: "전자호구가 인식한 득점과 심판의 판단이 어떻게 연결되는지 설명하는 해설 공간입니다.",
    keypoint: "장비 설정값, 체급별 기준, 대회별 시스템 운영 지침을 공식 자료와 함께 관리하는 구조로 확장할 수 있습니다.",
    caseText: "샘플 상황: 몸통 공격이 있었으나 전자호구에 점수가 표시되지 않은 상황.",
    judgement: "샘플 판정: 실제 조치와 판정은 공식 경기규칙 및 장비 운영 규정 입력 후 안내합니다.",
    related: ["득점", "장비", "센서"]
  },
  {
    id: "sample-04",
    article: "샘플 제4조",
    title: "넘어짐 상황",
    category: "감점 및 금지행위",
    keywords: ["넘어짐", "감점", "균형", "공격"],
    summary: "선수가 경기 중 넘어졌을 때의 판정 구조를 보여주는 샘플입니다.",
    original: "※ 샘플 원문: 실제 공식 경기규칙이 아닙니다.",
    easy: "넘어짐의 원인과 직전 공격 상황을 함께 살펴 판정 기준을 이해하도록 구성합니다.",
    keypoint: "넘어짐 자체만이 아니라 원인, 공격 동작, 상대 행동 등 관련 요소를 함께 확인하도록 사례형 설명을 제공합니다.",
    caseText: "샘플 상황: 공격 동작 후 선수가 균형을 잃고 바닥에 닿은 상황.",
    judgement: "샘플 판정: 실제 감점 여부는 공식 규정 입력 후 정확한 기준을 표시합니다.",
    related: ["감점", "공격", "균형"]
  },
  {
    id: "sample-05",
    article: "샘플 제5조",
    title: "머리 공격 득점 상황",
    category: "득점",
    keywords: ["머리 공격", "득점", "얼굴", "발차기"],
    summary: "머리 공격과 득점 판단을 보여주는 샘플 항목입니다.",
    original: "※ 샘플 원문: 실제 공식 경기규칙이 아닙니다.",
    easy: "머리 부위 공격의 득점 여부를 검색했을 때 관련 규정, 해설, 판정 사례를 함께 보여주는 예시입니다.",
    keypoint: "득점 기준과 점수 체계는 반드시 최신 공식 규정으로 교체해야 합니다.",
    caseText: "샘플 상황: 발 기술이 머리 부위에 접촉했으나 전자 시스템과 심판 판단이 다르게 보이는 상황.",
    judgement: "샘플 판정: 실제 득점 여부는 공식 규정과 대회 시스템 기준 입력 후 안내합니다.",
    related: ["득점", "비디오판독", "전자호구"]
  },
  {
    id: "sample-06",
    article: "샘플 제6조",
    title: "경기시간 및 휴식",
    category: "경기운영",
    keywords: ["경기시간", "휴식", "회전", "운영"],
    summary: "경기시간과 회전 운영을 확인하는 화면의 샘플입니다.",
    original: "※ 샘플 원문: 실제 공식 경기규칙이 아닙니다.",
    easy: "대회 형태별 경기시간과 휴식 시간을 쉽게 찾을 수 있도록 구성할 예정입니다.",
    keypoint: "연령, 경기방식, 대회 규정에 따라 운영 시간이 달라질 수 있으므로 공식 대회요강과 함께 확인해야 합니다.",
    caseText: "샘플 상황: 다음 회전 시작 전 휴식 시간이 정확히 얼마나 남았는지 확인해야 하는 상황.",
    judgement: "샘플 안내: 공식 규정과 대회요강 데이터를 함께 연결하도록 확장할 수 있습니다.",
    related: ["경기시간", "대회요강", "회전"]
  }
];

const categories = ["전체", "득점", "감점 및 금지행위", "비디오판독", "전자호구", "경기운영", "심판", "선수", "장비 및 보호구"];

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
  favoritesToggle: document.querySelector("#favoritesToggle")
};

function getFavorites() {
  return JSON.parse(localStorage.getItem("tkd-favorites") || "[]");
}
function saveFavorites(ids) {
  localStorage.setItem("tkd-favorites", JSON.stringify(ids));
}
function getRecent() {
  return JSON.parse(localStorage.getItem("tkd-recent") || "[]");
}
function saveRecent(term) {
  if (!term.trim()) return;
  const next = [term.trim(), ...getRecent().filter(v => v !== term.trim())].slice(0, 6);
  localStorage.setItem("tkd-recent", JSON.stringify(next));
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, "");
}

function filteredRules() {
  const q = normalize(currentQuery);
  const favorites = getFavorites();
  return rules.filter(rule => {
    const categoryMatch = activeCategory === "전체" || rule.category === activeCategory;
    const favoriteMatch = !favoritesOnly || favorites.includes(rule.id);
    const haystack = normalize([
      rule.article, rule.title, rule.category, rule.summary,
      rule.easy, rule.keypoint, rule.caseText, ...rule.keywords
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
    });
  });
}

function renderRecent() {
  const items = getRecent();
  els.recentSearches.innerHTML = items.length
    ? "<span class='muted'>최근 검색:</span>" + items.map(v => `<button data-recent="${v}">${v}</button>`).join("")
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
  const label = favoritesOnly ? "즐겨찾기" : activeCategory === "전체" ? "전체 규정" : activeCategory;
  els.resultsTitle.textContent = currentQuery ? `“${currentQuery}” 검색 결과` : label;
  els.resultsCount.textContent = `${items.length}개 항목 · 현재는 샘플 데이터`;
  els.resultsList.innerHTML = items.length ? items.map(rule =>
    `<button class="result-item" data-id="${rule.id}">
      <div class="result-top">
        <span class="result-title">${rule.article} · ${rule.title}</span>
        <span class="tag">${rule.category}</span>
      </div>
      <p>${rule.summary}</p>
    </button>`
  ).join("") : `<div class="empty-state"><strong>검색 결과가 없습니다</strong><span>다른 키워드나 카테고리를 선택해 보세요.</span></div>`;
  bindRuleButtons(els.resultsList);
}

function renderDetail(rule) {
  if (!rule) {
    els.detailPanel.innerHTML = `<div class="empty-state"><strong>규정을 선택하세요</strong><span>목차나 검색 결과를 누르면 상세 내용을 확인할 수 있습니다.</span></div>`;
    return;
  }
  const favorites = getFavorites();
  const isFavorite = favorites.includes(rule.id);
  els.detailPanel.innerHTML = `
    <div class="detail-head">
      <small>${rule.category} · 샘플 데이터</small>
      <h3>${rule.article} · ${rule.title}</h3>
    </div>
    <div class="detail-body">
      <div class="notice"><strong>중요:</strong> 아래 내용은 기능 확인용 예시이며 공식 경기규칙이 아닙니다.</div>
      <section class="info-block"><h4>공식 규정 원문</h4><p>${rule.original}</p></section>
      <section class="info-block"><h4>쉽게 풀어쓴 설명</h4><p>${rule.easy}</p></section>
      <section class="info-block"><h4>심판이 꼭 알아야 할 핵심</h4><p>${rule.keypoint}</p></section>
      <section class="info-block"><h4>실제 경기 판정 사례</h4><p>${rule.caseText}</p><div class="judgement"><strong>판정:</strong> ${rule.judgement}</div></section>
      <section class="info-block"><h4>관련 규정</h4><p>${rule.related.map(v => `<span class="tag">${v}</span>`).join(" ")}</p></section>
    </div>
    <div class="detail-actions">
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
}

function render() {
  renderCategories();
  renderRecent();
  const items = filteredRules();
  renderToc(items);
  renderResults(items);
  els.favoritesToggle.textContent = favoritesOnly ? "★ 즐겨찾기만 보는 중" : "☆ 즐겨찾기";
  els.favoritesToggle.classList.toggle("active", favoritesOnly);
  if (selectedId) renderDetail(rules.find(r => r.id === selectedId));
}

els.searchButton.addEventListener("click", runSearch);
els.searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") runSearch();
});
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
