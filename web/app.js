const STORAGE_KEY = "cal-note-v1";

const foodCatalog = [
  { key: "egg", names: ["egg", "eggs", "anda", "ande", "andaa"], calories: 78, unit: "piece" },
  { key: "banana", names: ["banana", "kela", "kelaa"], calories: 105, unit: "piece" },
  { key: "apple", names: ["apple", "seb", "safarchand"], calories: 95, unit: "piece" },
  { key: "roti", names: ["roti", "chapati", "phulka"], calories: 110, unit: "piece" },
  { key: "paratha", names: ["paratha", "parantha"], calories: 220, unit: "piece" },
  { key: "rice", names: ["rice", "chawal"], calories: 205, unit: "cup" },
  { key: "dal", names: ["dal", "daal"], calories: 180, unit: "bowl" },
  { key: "sabzi", names: ["sabzi", "sabji", "vegetable curry", "veg curry"], calories: 140, unit: "bowl" },
  { key: "dahi", names: ["dahi", "curd", "yogurt"], calories: 75, unit: "half-cup" },
  { key: "milk", names: ["milk", "doodh"], calories: 122, unit: "cup" },
  { key: "tea", names: ["chai", "tea"], calories: 90, unit: "cup" },
  { key: "coffee", names: ["coffee", "kafi"], calories: 80, unit: "cup" },
  { key: "poha", names: ["poha"], calories: 250, unit: "plate" },
  { key: "upma", names: ["upma"], calories: 220, unit: "plate" },
  { key: "idli", names: ["idli"], calories: 60, unit: "piece" },
  { key: "dosa", names: ["dosa"], calories: 170, unit: "piece" },
  { key: "paneer", names: ["paneer"], calories: 265, unit: "100g" },
  { key: "chicken", names: ["chicken", "murga"], calories: 240, unit: "serving" },
  { key: "salad", names: ["salad"], calories: 80, unit: "bowl" },
  { key: "samosa", names: ["samosa"], calories: 250, unit: "piece" },
  { key: "biscuit", names: ["biscuit", "cookie"], calories: 35, unit: "piece" },
  { key: "bread", names: ["bread", "slice bread"], calories: 75, unit: "slice" },
  { key: "oats", names: ["oats", "oatmeal"], calories: 150, unit: "bowl" },
  { key: "maggi", names: ["maggi", "noodles"], calories: 350, unit: "packet" },
  { key: "burger", names: ["burger"], calories: 295, unit: "piece" },
  { key: "pizza", names: ["pizza"], calories: 285, unit: "slice" }
];

const quantityWords = new Map([
  ["a", 1], ["an", 1], ["one", 1], ["two", 2], ["three", 3], ["four", 4],
  ["five", 5], ["six", 6], ["half", 0.5], ["quarter", 0.25],
  ["ek", 1], ["do", 2], ["teen", 3], ["char", 4], ["chaar", 4], ["paanch", 5],
  ["cheh", 6], ["aadha", 0.5], ["adha", 0.5], ["pauna", 0.75], ["sawa", 1.25]
]);

const unitHints = {
  cup: 1,
  cups: 1,
  bowl: 1,
  bowls: 1,
  plate: 1,
  plates: 1,
  piece: 1,
  pieces: 1,
  slice: 1,
  slices: 1,
  glass: 1,
  glasses: 1
};

const sampleText = `2 eggs
1 cup chai
2 roti
1 bowl dal
ek kela
half cup dahi`;

const state = {
  selectedDate: todayISO(),
  selectedRange: "day",
  data: loadData()
};

const datePicker = document.querySelector("#datePicker");
const foodInput = document.querySelector("#foodInput");
const parsedList = document.querySelector("#parsedList");
const dailyTotal = document.querySelector("#dailyTotal");
const periodLabel = document.querySelector("#periodLabel");
const periodTotal = document.querySelector("#periodTotal");
const periodMeta = document.querySelector("#periodMeta");
const streakValue = document.querySelector("#streakValue");
const bestDayValue = document.querySelector("#bestDayValue");
const trendValue = document.querySelector("#trendValue");
const historyBars = document.querySelector("#historyBars");
const historyList = document.querySelector("#historyList");
const tabs = [...document.querySelectorAll(".tab")];
const sampleBtn = document.querySelector("#sampleBtn");
const chips = [...document.querySelectorAll(".chip")];

init();

function init() {
  datePicker.value = state.selectedDate;
  renderDay();
  renderPeriod();
  renderOverview();
  renderHistory();

  datePicker.addEventListener("input", () => {
    state.selectedDate = datePicker.value;
    renderDay();
    renderPeriod();
    renderOverview();
    renderHistory();
  });

  foodInput.addEventListener("input", debounce(() => {
    state.data[state.selectedDate] = foodInput.value;
    saveData(state.data);
    renderDay();
    renderPeriod();
    renderOverview();
    renderHistory();
  }, 120));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.selectedRange = tab.dataset.range;
      tabs.forEach((item) => item.classList.toggle("active", item === tab));
      renderPeriod();
      renderOverview();
    });
  });

  sampleBtn.addEventListener("click", () => {
    foodInput.value = sampleText;
    state.data[state.selectedDate] = sampleText;
    saveData(state.data);
    renderDay();
    renderPeriod();
    renderOverview();
    renderHistory();
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const next = foodInput.value.trim();
      foodInput.value = next ? `${next}\n${chip.textContent}` : chip.textContent;
      state.data[state.selectedDate] = foodInput.value;
      saveData(state.data);
      renderDay();
      renderPeriod();
      renderOverview();
      renderHistory();
    });
  });
}

function renderDay() {
  const noteText = state.data[state.selectedDate] || "";
  foodInput.value = noteText;

  const entries = parseDailyText(noteText);
  const total = entries.reduce((sum, item) => sum + item.calories, 0);
  dailyTotal.textContent = `${Math.round(total)} kcal`;

  if (!entries.length) {
    parsedList.innerHTML = `<div class="entry"><div class="entry-note">Your parsed food items will appear here.</div></div>`;
    return;
  }

  parsedList.innerHTML = entries.map(renderEntry).join("");
}

function renderPeriod() {
  const metrics = calculatePeriodMetrics();
  periodLabel.textContent = metrics.label;
  periodTotal.textContent = `${Math.round(metrics.total)} kcal`;
  periodMeta.textContent = `${metrics.daysWithEntries} active day${metrics.daysWithEntries === 1 ? "" : "s"} | Avg ${Math.round(metrics.average || 0)} kcal/day`;
}

function renderOverview() {
  const streak = calculateStreak();
  const metrics = calculatePeriodMetrics();
  const comparison = calculateTrend();

  streakValue.textContent = `${streak} day${streak === 1 ? "" : "s"}`;
  bestDayValue.textContent = `${Math.round(metrics.bestDayCalories)} kcal`;
  trendValue.textContent = comparison;
}

function renderHistory() {
  const history = getRecentHistory();
  const max = Math.max(...history.map((item) => item.total), 1);

  historyBars.innerHTML = history.map((item) => `
    <div class="bar-wrap">
      <div class="bar" style="height:${Math.max(10, (item.total / max) * 100)}%"></div>
      <span class="bar-label">${item.label}</span>
    </div>
  `).join("");

  historyList.innerHTML = history.length
    ? history.map((item) => `
      <article class="history-item">
        <span>${item.fullLabel}</span>
        <strong>${Math.round(item.total)} kcal</strong>
      </article>
    `).join("")
    : `<div class="entry"><div class="entry-note">Your recent logged days will show up here.</div></div>`;
}

function calculatePeriodMetrics() {
  const entries = Object.entries(state.data);
  const selected = new Date(`${state.selectedDate}T00:00:00`);
  let label = "Today";
  let filtered = [];

  if (state.selectedRange === "day") {
    filtered = entries.filter(([day]) => day === state.selectedDate);
    label = "Today";
  }

  if (state.selectedRange === "week") {
    const start = new Date(selected);
    start.setDate(selected.getDate() - selected.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    filtered = entries.filter(([day]) => inRange(day, start, end));
    label = "This Week";
  }

  if (state.selectedRange === "month") {
    filtered = entries.filter(([day]) => day.startsWith(state.selectedDate.slice(0, 7)));
    label = "This Month";
  }

  if (state.selectedRange === "year") {
    filtered = entries.filter(([day]) => day.startsWith(state.selectedDate.slice(0, 4)));
    label = "This Year";
  }

  const dailyTotals = filtered.map(([, text]) => parseDailyText(text).reduce((sum, item) => sum + item.calories, 0));
  const total = dailyTotals.reduce((sum, value) => sum + value, 0);

  return {
    label,
    total,
    daysWithEntries: dailyTotals.length,
    average: dailyTotals.length ? total / dailyTotals.length : 0,
    bestDayCalories: dailyTotals.length ? Math.max(...dailyTotals) : 0
  };
}

function parseDailyText(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => parseFoodLine(line));
}

function parseFoodLine(line) {
  const explicitCalories = extractExplicitCalories(line);
  if (explicitCalories) {
    return [{
      food: line.replace(/\b\d+\s*(kcal|cal|calories)\b/i, "").trim() || "Custom entry",
      calories: explicitCalories,
      note: `${line} | Manual calories`,
      matched: true
    }];
  }

  const segments = splitLine(line);
  const parsedSegments = segments.map(parseSegment).filter(Boolean);

  if (parsedSegments.length) {
    return parsedSegments;
  }

  return [{
    food: line,
    calories: 0,
    note: "Not recognized yet. Try adding a food name like roti, dal, chai, egg, poha.",
    matched: false
  }];
}

function parseSegment(segment) {
  const normalized = normalizeLine(segment);
  const quantity = extractQuantity(normalized);
  const matchedFood = findFood(normalized);

  if (!matchedFood) {
    return null;
  }

  const multiplier = applyUnitAdjustment(quantity, normalized, matchedFood);
  return {
    food: titleCase(matchedFood.key),
    calories: matchedFood.calories * multiplier,
    note: `${segment.trim()} | Qty ${trimNumber(multiplier)} | Approx per ${matchedFood.unit}`,
    matched: true
  };
}

function extractQuantity(line) {
  const fractionMatch = line.match(/(\d+)\s*\/\s*(\d+)/);
  if (fractionMatch) {
    return Number(fractionMatch[1]) / Number(fractionMatch[2]);
  }

  const directNumber = line.match(/(\d+(\.\d+)?)/);
  if (directNumber) {
    return Number(directNumber[1]);
  }

  const tokens = line.split(" ");
  for (const token of tokens) {
    if (quantityWords.has(token)) {
      return quantityWords.get(token);
    }
  }

  const hintedUnit = tokens.find((token) => unitHints[token]);
  if (hintedUnit) {
    return 1;
  }

  return 1;
}

function extractExplicitCalories(line) {
  const matched = line.match(/(\d+)\s*(kcal|cal|calories)\b/i);
  return matched ? Number(matched[1]) : 0;
}

function splitLine(line) {
  return line
    .split(/\s*(?:,|\+|\band\b|\baur\b|\bwith\b)\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);
}

function findFood(line) {
  return foodCatalog.find((food) => food.names.some((name) => line.includes(name)));
}

function applyUnitAdjustment(quantity, line, food) {
  let multiplier = quantity || 1;
  if (/\bhalf\s+cup\b|\baadha\s+cup\b|\badha\s+cup\b/i.test(line) && food.unit === "half-cup") {
    multiplier = 1;
  }
  if (/\b100g\b/i.test(line) && food.unit === "100g") {
    multiplier = 1;
  }
  return multiplier;
}

function calculateStreak() {
  const loggedDays = Object.keys(state.data)
    .filter((day) => (state.data[day] || "").trim())
    .sort()
    .reverse();

  if (!loggedDays.length) {
    return 0;
  }

  let streak = 0;
  let cursor = new Date(`${todayISO()}T00:00:00`);

  for (const day of loggedDays) {
    const current = new Date(`${day}T00:00:00`);
    if (current.getTime() === cursor.getTime()) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (current.getTime() < cursor.getTime()) {
      break;
    }
  }

  return streak;
}

function calculateTrend() {
  const current = calculatePeriodMetrics();
  const previousTotal = calculatePreviousPeriodTotal();
  if (!current.total && !previousTotal) {
    return "Steady";
  }
  if (current.total > previousTotal) {
    return "Higher";
  }
  if (current.total < previousTotal) {
    return "Lower";
  }
  return "Steady";
}

function calculatePreviousPeriodTotal() {
  const selected = new Date(`${state.selectedDate}T00:00:00`);
  const entries = Object.entries(state.data);
  let start;
  let end;

  if (state.selectedRange === "day") {
    start = new Date(selected);
    end = new Date(selected);
    start.setDate(start.getDate() - 1);
    end.setDate(end.getDate() - 1);
  } else if (state.selectedRange === "week") {
    end = new Date(selected);
    end.setDate(end.getDate() - end.getDay() - 1);
    start = new Date(end);
    start.setDate(start.getDate() - 6);
  } else if (state.selectedRange === "month") {
    start = new Date(selected.getFullYear(), selected.getMonth() - 1, 1);
    end = new Date(selected.getFullYear(), selected.getMonth(), 0);
  } else {
    start = new Date(selected.getFullYear() - 1, 0, 1);
    end = new Date(selected.getFullYear() - 1, 11, 31);
  }

  return entries
    .filter(([day]) => inRange(day, start, end))
    .reduce((sum, [, text]) => sum + parseDailyText(text).reduce((inner, item) => inner + item.calories, 0), 0);
}

function getRecentHistory() {
  return Object.entries(state.data)
    .filter(([, text]) => (text || "").trim())
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7)
    .map(([date, text]) => {
      const total = parseDailyText(text).reduce((sum, item) => sum + item.calories, 0);
      const parsedDate = new Date(`${date}T00:00:00`);
      return {
        total,
        label: parsedDate.toLocaleDateString(undefined, { day: "numeric", month: "short" }),
        fullLabel: parsedDate.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" })
      };
    })
    .reverse();
}

function renderEntry(entry) {
  const classes = entry.matched ? "entry" : "entry unmatched";
  return `
    <article class="${classes}">
      <div class="entry-top">
        <span class="entry-food">${escapeHtml(entry.food)}</span>
        <strong class="entry-cal">${Math.round(entry.calories)} kcal</strong>
      </div>
      <p class="entry-note">${escapeHtml(entry.note)}</p>
    </article>
  `;
}

function normalizeLine(line) {
  return line
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s.]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function todayISO() {
  return new Date().toLocaleDateString("en-CA");
}

function inRange(day, start, end) {
  const current = new Date(`${day}T00:00:00`);
  return current >= start && current <= end;
}

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function trimNumber(value) {
  return Number.isInteger(value) ? value : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
