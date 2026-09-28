/* ECO / PLANET — script.js
   Структура: 1) данные  2) утилиты  3) рендер секций  4) интерактив  5) init */
"use strict";

/* ========== 1. ДАННЫЕ ========== */
const DATA = {
  stats: [
    { v: 1.1, d: 1, pre: "+", suf: "°C", t: "Потепление 2011–2020 к 1850–1900", s: "IPCC AR6" },
    { v: 8, d: 0, pre: "≈ ", suf: " млрд", t: "Население планеты (с ноября 2022)", s: "ООН" },
    { v: 400, d: 0, pre: "≈ ", suf: " млн т", t: "Пластика производится ежегодно", s: "UNEP" },
    { v: 47000, d: 0, pre: "> ", suf: "", t: "Видов под угрозой (Красный список)", s: "IUCN, 2023–24" }
  ],
  problems: [
    ["🌡️", "Изменение климата", "Рост температур, экстремальные явления, подъём уровня моря.", "Основная причина — выбросы парниковых газов от сжигания ископаемого топлива, вырубки лесов и сельского хозяйства. Последствия: жара, засухи, наводнения, таяние ледников."],
    ["🏭", "Загрязнение воздуха", "Мелкие частицы и газы вредят здоровью.", "Источники: транспорт, энергетика, промышленность, отопление. По данным ВОЗ, загрязнённый воздух связан с миллионами преждевременных смертей в год."],
    ["💧", "Загрязнение воды", "Стоки, пластик и химикаты попадают в водоёмы.", "Промышленные и бытовые стоки, удобрения, нефтепродукты ухудшают качество воды, вредят экосистемам и здоровью людей."],
    ["🌲", "Вырубка лесов", "Леса исчезают из-за земледелия и лесозаготовок.", "Потеря лесов снижает поглощение CO₂, разрушает местообитания и почвы. Главные драйверы — расширение сельхозземель и добыча древесины."],
    ["🦋", "Потеря биоразнообразия", "Виды исчезают быстрее естественных темпов.", "Причины: разрушение местообитаний, перелов, изменение климата, загрязнение и инвазивные виды."],
    ["🥤", "Пластиковое загрязнение", "Отходы накапливаются в океанах и почве.", "Значительная часть пластика не перерабатывается. Он фрагментируется в микропластик, который найден почти повсюду."],
    ["🏜️", "Опустынивание", "Деградация земель в засушливых районах.", "Сочетание засух, неустойчивого землепользования и вырубки приводит к потере плодородия почв. Тема ключевая для FAO и Конвенции ООН по борьбе с опустыниванием."],
    ["⛏️", "Истощение ресурсов", "Потребление растёт быстрее восстановления.", "Вода, почвы, рыбные запасы, минералы используются интенсивнее, чем восстанавливаются. Помогают эффективность и экономика замкнутого цикла."]
  ],
  climate: {
    "Причины": ["Сжигание угля, нефти и газа", "Вырубка лесов", "Метан от животноводства и отходов", "Промышленные процессы"],
    "Последствия": ["Рост средней температуры", "Таяние ледников и льда", "Подъём уровня моря", "Волны жары, засухи, ливни"],
    "Решения": ["Возобновляемая энергетика", "Энергоэффективность", "Защита и восстановление лесов", "Адаптация городов и инфраструктуры"]
  },
  timeline: [["1850–1900", "Базовый период для сравнения температур"], ["1988", "Создана Межправительственная группа экспертов по изменению климата (IPCC)"], ["2015", "Парижское соглашение"], ["Сегодня", "Мониторинг NASA, WMO и других организаций"]],
  pollution: {
    "AIR": { c: "Сжигание топлива, промышленность, транспорт", s: "ТЭС, автомобили, отопление, пожары", e: "Болезни дыхания и сердца, смог", r: "Чистая энергия, электротранспорт, нормы выбросов" },
    "WATER": { c: "Стоки, удобрения, пластик, разливы нефти", s: "Города, заводы, сельское хозяйство", e: "Загрязнение питьевой воды, гибель водных видов", r: "Очистные сооружения, контроль стоков, бережное использование" },
    "SOIL": { c: "Химикаты, отходы, неправильное земледелие", s: "Промышленность, свалки, интенсивное сельское хозяйство", e: "Потеря плодородия, попадание веществ в пищу", r: "Рекультивация, органическое земледелие, переработка" }
  },
  forest: ["Поглощают CO₂ и хранят углерод", "Вырубка снижает поглощение углерода и нарушает водный цикл", "Тысячи видов теряют дом при разрушении лесов", "Миллионы людей зависят от лесов: пища, вода, жильё, работа"],
  bio: [["🦁", "Животные", "Крупные и малые виды поддерживают пищевые цепи. Угрозы: потеря среды, браконьерство."], ["🌿", "Растения", "Основа экосистем и источник кислорода, пищи и лекарств."], ["🐝", "Насекомые", "Опыление и разложение органики. Многие культуры зависят от опылителей."], ["🪸", "Морские экосистемы", "Коралловые рифы и океаны страдают от потепления, закисления и загрязнения."], ["🌳", "Лесные экосистемы", "Дом для большей части наземных видов и регулятор климата."]],
  plastic: [["Производство", "Основа — нефтехимия. Производство растёт десятилетиями."], ["Использование", "Упаковка и одноразовые изделия служат минуты, а живут веками."], ["Отходы", "Часть перерабатывается, остальное — свалки, сжигание, окружающая среда."], ["Природа", "Пластик попадает в реки и океаны, разрушается на микропластик."], ["Экосистема", "Животные запутываются или проглатывают пластик; микропластик попадает в пищевые цепи."]],
  causes: [["Промышленность", "выбросы → воздух, климат, вода"], ["Транспорт", "топливо → воздух, климат"], ["Энергетика", "ископаемое топливо → климат, воздух"], ["Сельское хозяйство", "земля, вода, метан → леса, почва, биоразнообразие"], ["Чрезмерное потребление", "ресурсы, отходы → пластик, истощение"], ["Отходы", "неправильное обращение → вода, почва, пластик"], ["Урбанизация", "рост городов → воздух, ресурсы, земля"], ["Вырубка лесов", "потеря лесов → климат, биоразнообразие, опустынивание"]],
  effects: [["🌍 Для природы", ["Потеря экосистем", "Исчезновение видов", "Деградация почв"]], ["🧑 Для человека", ["Проблемы со здоровьем", "Нехватка воды", "Продовольственные риски", "Экстремальная жара"]], ["💼 Для экономики", ["Ущерб инфраструктуре", "Снижение урожайности", "Рост расходов на адаптацию"]]],
  solutions: [
    ["🌱", "Возобновляемая энергетика", "Ископаемое топливо даёт выбросы", "Солнце, ветер, гидро- и геотермальная энергия", "Электричество вырабатывается без сжигания топлива", "Выбрать зелёный тариф, экономить электричество"],
    ["♻️", "Переработка и повторное использование", "Растущие горы отходов", "Замкнутый цикл материалов", "Сортировка, переработка, ремонт и повторное использование", "Сортировать отходы и ремонтировать вещи"],
    ["🌳", "Восстановление лесов", "Потеря лесов и почв", "Защита существующих лесов и посадка местных видов", "Деревья поглощают CO₂, удерживают воду и почву", "Поддерживать проверенные проекты восстановления"],
    ["🚲", "Устойчивый транспорт", "Транспорт даёт выбросы и смог", "Общественный транспорт, велосипед, электротранспорт", "Меньше топлива на человека и километр", "Ходить, ездить на велосипеде, выбирать общественный транспорт"],
    ["💧", "Экономия воды", "Нехватка чистой воды", "Эффективное использование и защита источников", "Меньше потерь и лучше очистка", "Чинить протечки, сократить расход воды"],
    ["🏭", "Чистые технологии", "Промышленные выбросы", "Эффективные процессы и очистка", "Фильтры, улавливание, электрификация", "Выбирать товары ответственных производителей"],
    ["🌾", "Устойчивое сельское хозяйство", "Деградация почв, выбросы и перерасход воды", "Севооборот, капельный полив, сохранение почв", "Здоровая почва даёт больше при меньших потерях", "Не выбрасывать еду, разнообразить рацион"],
    ["🏙️", "Экологичные города", "Смог, жара и отходы", "Зелёные зоны, эффективные здания, общественный транспорт", "Тень и растения снижают жару, компактность сокращает выбросы", "Участвовать в городских инициативах"]
  ],
  checklist: ["Использовать многоразовые вещи", "Сократить ненужное потребление", "Экономить воду", "Экономить электроэнергию", "Использовать общественный транспорт", "Сортировать отходы там, где есть инфраструктура", "Не выбрасывать мусор в природу", "Поддерживать восстановление экосистем"],
  calc: [
    ["Автомобиль", ["Почти не пользуюсь", "Иногда", "Часто", "Каждый день"]],
    ["Электроэнергия", ["Экономлю", "Средне", "Много", "Очень много"]],
    ["Новые вещи", ["Редко", "Иногда", "Часто", "Постоянно"]],
    ["Мясо", ["Не ем", "Редко", "Несколько раз в неделю", "Ежедневно"]],
    ["Одноразовый пластик", ["Не использую", "Редко", "Часто", "Постоянно"]]
  ],
  regions: [
    ["Северная Америка", "M60 60 L230 50 L280 110 L240 190 L170 210 L120 150 Z", "Лесные пожары, засухи, выбросы от энергетики и транспорта."],
    ["Южная Америка", "M200 230 L270 220 L300 300 L250 380 L215 330 Z", "Вырубка лесов Амазонии, потеря биоразнообразия."],
    ["Европа", "M370 70 L450 60 L470 110 L410 135 L365 115 Z", "Волны жары, загрязнение воздуха в городах, переход на чистую энергию."],
    ["Африка", "M385 150 L470 150 L500 230 L450 330 L400 270 L375 200 Z", "Засухи, опустынивание, нехватка воды."],
    ["Азия", "M480 60 L700 60 L720 160 L630 210 L540 190 L490 130 Z", "Загрязнение воздуха, наводнения, пластик в реках и морях."],
    ["Океания", "M640 280 L740 270 L750 340 L660 350 Z", "Повреждение кораллов, пожары, подъём уровня моря на островах."]
  ],
  future: [
    ["Если ничего существенно не менять", ["Риски могут увеличиваться", "Больше экстремальных явлений и давления на экосистемы", "Растут затраты на адаптацию"]],
    ["Если внедрять эффективные решения", ["Последствия зависят от масштаба изменений", "Сокращение выбросов снижает риски", "Восстановление природы даёт дополнительные выгоды"]]
  ],
  faq: [
    ["Что такое глобальное изменение климата?", "Долгосрочное изменение температур и погодных условий. Сегодня оно в основном связано с выбросами парниковых газов от деятельности человека."],
    ["Почему исчезают виды?", "Главные причины — разрушение среды обитания, перелов и охота, климат, загрязнение и инвазивные виды."],
    ["Можно ли решить проблему пластика?", "Уменьшить можно: меньше одноразового, лучше дизайн, сбор и переработка, политика производителей. Нужны действия на всех уровнях."],
    ["Почему важны леса?", "Хранят углерод, регулируют воду и климат, дают дом видам и ресурсы людям."],
    ["Что может сделать обычный человек?", "Сократить потери и потребление, экономить энергию и воду, выбирать устойчивый транспорт, поддерживать решения в сообществе."],
    ["Как связаны загрязнение и здоровье?", "Загрязнённый воздух и вода повышают риск заболеваний. Подробности — у ВОЗ."],
    ["Может ли один человек изменить ситуацию?", "Один человек не решит всё, но привычки, выбор и участие влияют на окружение и создают спрос на изменения."]
  ],
  sources: [
    ["IPCC", "Оценки изменения климата", "https://www.ipcc.ch/"],
    ["United Nations", "Климат и устойчивое развитие", "https://www.un.org/en/climatechange"],
    ["UNEP", "Программа ООН по окружающей среде", "https://www.unep.org/"],
    ["WHO", "Здоровье и загрязнение воздуха", "https://www.who.int/health-topics/air-pollution"],
    ["NASA", "Признаки изменения климата", "https://climate.nasa.gov/"],
    ["WMO", "Всемирная метеорологическая организация", "https://wmo.int/"],
    ["FAO", "Продовольствие, леса, земли", "https://www.fao.org/"],
    ["IUCN", "Красный список видов", "https://www.iucnredlist.org/"]
  ]
};

/* ========== 2. УТИЛИТЫ ========== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const li = a => a.map(x => `<li>${x}</li>`).join("");

/* ========== 3. РЕНДЕР СЕКЦИЙ ========== */
function renderStats() {
  $("#statGrid").innerHTML = DATA.stats.map(s => `<div class="card stat reveal"><b data-to="${s.v}" data-d="${s.d}" data-pre="${s.pre}" data-suf="${s.suf}">${s.pre}${s.v}${s.suf}</b><span>${s.t}</span><small>Источник: ${s.s}</small></div>`).join("");
}
function renderCards() {
  $("#problemGrid").innerHTML = DATA.problems.map((p, i) => `<button class="card reveal" data-modal="p${i}"><span class="ico">${p[0]}</span><h3>${p[1]}</h3><p>${p[2]}</p><span class="more">Подробнее →</span></button>`).join("");
  $("#solutionGrid").innerHTML = DATA.solutions.map((s, i) => `<button class="card reveal" data-modal="s${i}"><span class="ico">${s[0]}</span><h3>${s[1]}</h3><p>${s[3]}</p><span class="more">Как это работает →</span></button>`).join("");
  $("#bioGrid").innerHTML = DATA.bio.map(b => `<article class="card reveal"><span class="ico">${b[0]}</span><h3>${b[1]}</h3><p>${b[2]}</p></article>`).join("");
  $("#effectGrid").innerHTML = DATA.effects.map(e => `<article class="card reveal"><h3>${e[0]}</h3><ul>${li(e[1])}</ul></article>`).join("");
  $("#futureGrid").innerHTML = DATA.future.map(f => `<article class="glass reveal"><h3>${f[0]}</h3><ul>${li(f[1])}</ul></article>`).join("");
  $("#srcGrid").innerHTML = DATA.sources.map(s => `<article class="card src reveal"><h3>${s[0]}</h3><p>${s[1]}</p><a href="${s[2]}" target="_blank" rel="noopener">Открыть сайт ↗</a></article>`).join("");
  $("#forestList").innerHTML = li(DATA.forest);
  $("#climateTimeline").innerHTML = DATA.timeline.map(t => `<li class="reveal"><b>${t[0]}</b>${t[1]}</li>`).join("");
}

/* Универсальные вкладки: items = [[label, html], ...] */
function makeTabs(root, items) {
  root.innerHTML = `<div class="tab-bar" role="tablist">${items.map((t, i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-i="${i}">${t[0]}</button>`).join("")}</div><div class="tab-panel" role="tabpanel"></div>`;
  const show = i => {
    $$(".tab", root).forEach(b => b.setAttribute("aria-selected", b.dataset.i == i));
    const p = $(".tab-panel", root); p.innerHTML = items[i][1];
    p.style.animation = "none"; void p.offsetWidth; p.style.animation = "";
  };
  root.addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) show(b.dataset.i); });
  show(0);
}
function renderTabs() {
  makeTabs($("#climateTabs"), Object.entries(DATA.climate).map(([k, v]) => [k, `<ul>${li(v)}</ul>`]));
  makeTabs($("#pollTabs"), Object.entries(DATA.pollution).map(([k, v]) => [k,
    `<div class="polls"><div class="card"><h3>Причины</h3><p>${v.c}</p></div><div class="card"><h3>Источники</h3><p>${v.s}</p></div><div class="card"><h3>Последствия</h3><p>${v.e}</p></div><div class="card"><h3>Решения</h3><p>${v.r}</p></div></div>`]));
}

/* ========== 4. ИНТЕРАКТИВ ========== */
function initModal() {
  const m = $("#modal"), body = $("#mBody"); let last;
  const open = html => { last = document.activeElement; body.innerHTML = html; m.hidden = false; $(".m-close").focus(); document.body.style.overflow = "hidden"; };
  const close = () => { m.hidden = true; document.body.style.overflow = ""; last && last.focus(); };
  document.addEventListener("click", e => {
    const c = e.target.closest("[data-modal]");
    if (c) {
      const id = c.dataset.modal, n = +id.slice(1);
      if (id[0] === "p") { const p = DATA.problems[n]; open(`<h3 id="mTitle">${p[0]} ${p[1]}</h3><p>${p[3]}</p>`); }
      else { const s = DATA.solutions[n]; open(`<h3 id="mTitle">${s[0]} ${s[1]}</h3><h4>Проблема</h4><p>${s[2]}</p><h4>Решение</h4><p>${s[3]}</p><h4>Как это работает</h4><p>${s[4]}</p><h4>Что может сделать человек</h4><p>${s[5]}</p>`); }
    } else if (e.target === m || e.target.closest(".m-close")) close();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !m.hidden) close(); });
}
function initPlastic() {
  const box = $("#plasticSteps"), out = $("#plasticText");
  box.innerHTML = DATA.plastic.map((p, i) => `<button data-i="${i}">${i + 1}. ${p[0]}</button>`).join("");
  const show = i => { $$("button", box).forEach((b, j) => b.classList.toggle("on", i === j)); out.innerHTML = `<h3>${DATA.plastic[i][0]}</h3><p>${DATA.plastic[i][1]}</p>`; };
  box.addEventListener("click", e => { const b = e.target.closest("button"); if (b) show(+b.dataset.i); });
  show(0);
}
function initCauses() {
  const box = $("#causeChips"), out = $("#causeText");
  box.innerHTML = DATA.causes.map((c, i) => `<button class="chip" data-i="${i}">${c[0]}</button>`).join("");
  box.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    $$(".chip", box).forEach(x => x.classList.toggle("on", x === b));
    const c = DATA.causes[b.dataset.i]; out.innerHTML = `<h3>${c[0]}</h3><p>Связи: ${c[1]}.</p>`;
  });
}
function initSlider() {
  const r = $("#baRange"), top = $(".ba-top"), line = $(".ba-line");
  const upd = () => { top.style.clipPath = `inset(0 ${100 - r.value}% 0 0)`; line.style.left = r.value + "%"; };
  r.addEventListener("input", upd); upd();
}
function initChecklist() {
  const KEY = "ecoplanet-checks", list = $("#checkList");
  let saved = []; try { saved = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
  list.innerHTML = DATA.checklist.map((t, i) => `<li><label><input type="checkbox" data-i="${i}" ${saved.includes(i) ? "checked" : ""}> ${t}</label></li>`).join("");
  const upd = () => {
    const on = $$("input:checked", list).map(x => +x.dataset.i), pct = Math.round(on.length / DATA.checklist.length * 100);
    $("#checkTitle").textContent = `Твой экологический чек-лист: ${pct}%`; $("#checkBar").style.width = pct + "%";
    try { localStorage.setItem(KEY, JSON.stringify(on)); } catch (e) {}
  };
  list.addEventListener("change", upd); upd();
}
function initCalc() {
  $("#calcFields").innerHTML = DATA.calc.map((c, i) => `<div class="calc-row"><label for="c${i}">${c[0]}</label><select id="c${i}">${c[1].map((o, j) => `<option value="${j}">${o}</option>`).join("")}</select></div>`).join("");
  $("#calcBtn").addEventListener("click", () => {
    const vals = DATA.calc.map((_, i) => +$("#c" + i).value), pct = Math.round(vals.reduce((a, b) => a + b, 0) / (vals.length * 3) * 100);
    const lvl = pct < 34 ? "Невысокое" : pct < 67 ? "Среднее" : "Заметное";
    const rows = DATA.calc.map((c, i) => `<span>${c[0]}</span><div class="bar"><i></i></div>`).join("");
    $("#calcOut").innerHTML = `<h3>${lvl} воздействие (${pct}%)</h3><div class="res">${rows}</div>`;
    $$("#calcOut .bar i").forEach((b, i) => requestAnimationFrame(() => requestAnimationFrame(() => b.style.width = (vals[i] + 1) * 25 + "%")));
  });
}
function initMap() {
  const svg = $("#mapSvg"), info = $("#mapInfo");
  svg.innerHTML = DATA.regions.map((r, i) => `<path d="${r[1]}" tabindex="0" role="button" aria-label="${r[0]}" data-i="${i}"/>`).join("");
  const pick = p => { $$("path", svg).forEach(x => x.classList.toggle("on", x === p)); const r = DATA.regions[p.dataset.i]; info.innerHTML = `<h3>${r[0]}</h3><p>${r[2]}</p>`; };
  svg.addEventListener("click", e => e.target.matches("path") && pick(e.target));
  svg.addEventListener("mouseover", e => e.target.matches("path") && pick(e.target));
  svg.addEventListener("keydown", e => (e.key === "Enter" || e.key === " ") && e.target.matches("path") && (e.preventDefault(), pick(e.target)));
}
function initFaq() {
  const box = $("#faqList");
  box.innerHTML = DATA.faq.map((f, i) => `<div class="faq-i"><button class="faq-q" aria-expanded="false" aria-controls="fa${i}">${f[0]}</button><div class="faq-a" id="fa${i}"><div>${f[1]}</div></div></div>`).join("");
  box.addEventListener("click", e => {
    const q = e.target.closest(".faq-q"); if (!q) return;
    const open = q.getAttribute("aria-expanded") === "true";
    q.setAttribute("aria-expanded", !open); q.nextElementSibling.classList.toggle("open", !open);
  });
}

/* ========== Scroll-эффекты ========== */
function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in"); io.unobserve(e.target);
    const n = $("[data-to]", e.target); if (n) countUp(n);
  }), { threshold: .15 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });
}
function countUp(el) {
  const to = +el.dataset.to, d = +el.dataset.d, t0 = performance.now(), dur = 1400;
  const fmt = n => n.toLocaleString("ru-RU", { minimumFractionDigits: d, maximumFractionDigits: d });
  const step = t => { const k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = el.dataset.pre + fmt(to * e) + el.dataset.suf; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function initScroll() {
  const nav = $(".nav"), bar = $("#progress"), top = $("#toTop"), bg = $(".hero-bg");
  const secs = $$("main section[id]"), links = $$(".links a");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const on = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 40); bar.style.width = (y / h * 100) + "%"; top.classList.toggle("show", y > 700);
    if (!still && y < innerHeight) bg.style.transform = `scale(1.1) translateY(${y * .15}px)`;
    let cur = secs[0].id; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
  };
  addEventListener("scroll", on, { passive: true }); on();
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  const burger = $(".burger"), menu = $(".links");
  burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  links.forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
}

/* ========== 5. INIT ========== */
document.addEventListener("DOMContentLoaded", () => {
  renderStats(); renderCards(); renderTabs();
  initModal(); initPlastic(); initCauses(); initSlider(); initChecklist(); initCalc(); initMap(); initFaq();
  initReveal(); initScroll();
});
