// --- DATABASE & STATE MANAGEMENT ---
const STORAGE_KEY = 'expense-tracker-data';
const BUDGET_KEY = 'expense-tracker-budget';

// State variables for year and month
let currentYear = 2026;
let currentMonth = 6; // Default to June

// Auto-detect month if the current calendar year is 2026
const todayObj = new Date();
if (todayObj.getFullYear() === 2026) {
  currentMonth = todayObj.getMonth() + 1; // 1-12
}

const getActiveMonthStr = () => `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

function getDefaultFormDate() {
  const today = new Date();
  if (today.getFullYear() === currentYear && (today.getMonth() + 1) === currentMonth) {
    return `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }
  return `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
}

const SAMPLE_DATA = [
  { date: '2026-05-12', dayName: 'Selasa', category: 'Lainnya', description: 'Parkir UIN', amount: 1000 },
  { date: '2026-05-12', dayName: 'Selasa', category: 'Makanan', description: 'Nasi Ayam', amount: 13000 },
  { date: '2026-05-12', dayName: 'Selasa', category: 'Makanan', description: 'Telor Gulung', amount: 5000 },
  { date: '2026-05-12', dayName: 'Selasa', category: 'Transportasi', description: 'Bensin Migi', amount: 22000 },
  { date: '2026-05-13', dayName: 'Rabu', category: 'Makanan', description: 'Nasi Kuning + Nasi Ayam + Warteg', amount: 41000 },
  { date: '2026-05-13', dayName: 'Rabu', category: 'Makanan', description: 'Kopi + Pulpy Orange', amount: 18000 },
  { date: '2026-05-13', dayName: 'Rabu', category: 'Makanan', description: 'C1000', amount: 8000 },
  { date: '2026-05-13', dayName: 'Rabu', category: 'Lainnya', description: 'Parkir UIN + PONRAN', amount: 7000 },
  { date: '2026-05-13', dayName: 'Rabu', category: 'Transportasi', description: 'Bensin', amount: 22000 },
  { date: '2026-05-14', dayName: 'Kamis', category: 'Makanan', description: 'Nasi Kuning', amount: 12000 },
  { date: '2026-05-14', dayName: 'Kamis', category: 'Transportasi', description: 'Bensin', amount: 15000 },
  { date: '2026-05-14', dayName: 'Kamis', category: 'Lainnya', description: 'Parkir Blok M', amount: 6000 },
  { date: '2026-05-17', dayName: 'Minggu', category: 'Makanan', description: 'Gacoan', amount: 27000 },
  { date: '2026-05-18', dayName: 'Senin', category: 'Makanan', description: 'Bubur Ayam', amount: 12000 },
  { date: '2026-05-19', dayName: 'Selasa', category: 'Transportasi', description: 'Bensin', amount: 20000 },
  { date: '2026-05-19', dayName: 'Selasa', category: 'Hiburan', description: 'Kue', amount: 32500 },
  { date: '2026-05-19', dayName: 'Selasa', category: 'Hiburan', description: 'Lukis-Lukis', amount: 6000 },
  { date: '2026-05-19', dayName: 'Selasa', category: 'Makanan', description: 'Nasi Ayam + VIT + Susu', amount: 50000 },
  { date: '2026-05-19', dayName: 'Selasa', category: 'Lainnya', description: 'Parkir', amount: 6000 },
  { date: '2026-05-20', dayName: 'Rabu', category: 'Makanan', description: 'Nasi Ayam', amount: 15000 },
  { date: '2026-05-20', dayName: 'Rabu', category: 'Transportasi', description: 'Bensin', amount: 20000 },
  { date: '2026-05-20', dayName: 'Rabu', category: 'Lainnya', description: 'Uin Kelawai', amount: 4000 },
  { date: '2026-05-20', dayName: 'Rabu', category: 'Makanan', description: 'Nasi Ayam Popcorn', amount: 20000 },
  { date: '2026-05-20', dayName: 'Rabu', category: 'Belanja', description: 'Gunting Kuku', amount: 9000 },
  { date: '2026-05-22', dayName: 'Jumat', category: 'Transportasi', description: 'Bensin', amount: 10000 },
  { date: '2026-05-22', dayName: 'Jumat', category: 'Makanan', description: 'Nasi Ayam', amount: 15000 },
  { date: '2026-05-22', dayName: 'Jumat', category: 'Lainnya', description: 'Parkir', amount: 2000 },
  { date: '2026-05-23', dayName: 'Sabtu', category: 'Makanan', description: 'Good Day', amount: 4000 },
  { date: '2026-05-24', dayName: 'Minggu', category: 'Transportasi', description: 'Bensin', amount: 20000 },
  { date: '2026-05-24', dayName: 'Minggu', category: 'Makanan', description: 'kopi dan susu, nasi ayam', amount: 27000 },
  { date: '2026-05-24', dayName: 'Minggu', category: 'Lainnya', description: 'parkir', amount: 4000 },
  { date: '2026-05-24', dayName: 'Minggu', category: 'Makanan', description: 'silverqueen', amount: 20000 },
  { date: '2026-05-25', dayName: 'Senin', category: 'Makanan', description: 'Nasi Ayam', amount: 35000 },
  { date: '2026-05-25', dayName: 'Senin', category: 'Transportasi', description: 'Bensin', amount: 10000 },
  { date: '2026-05-25', dayName: 'Senin', category: 'Lainnya', description: 'parkir', amount: 4000 },
  { date: '2026-05-26', dayName: 'Selasa', category: 'Makanan', description: 'Nasi Ayam', amount: 15000 },
  { date: '2026-05-26', dayName: 'Selasa', category: 'Transportasi', description: 'Bensin', amount: 10000 },
  { date: '2026-05-26', dayName: 'Selasa', category: 'Lainnya', description: 'Mila', amount: 50000 },
  { date: '2026-05-26', dayName: 'Selasa', category: 'Makanan', description: 'es teh', amount: 10000 },
  { date: '2026-05-31', dayName: 'Minggu', category: 'Transportasi', description: 'Bensin', amount: 20000 },
];

const DEFAULT_BUDGET = {
  month: '2026-05',
  categories: {
    Makanan: 300000,
    Transportasi: 300000,
    Belanja: 0,
    Hiburan: 100000,
    Tagihan: 0,
    Lainnya: 20000,
  },
  totalBudget: 720000,
};

const CategoryColors = {
  Makanan: '#C4705A',
  Transportasi: '#5A8FA8',
  Belanja: '#8A9B6E',
  Hiburan: '#B89B5E',
  Tagihan: '#7A6B8A',
  Lainnya: '#A8978A',
};

const CategoryLabels = ['Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Tagihan', 'Lainnya'];
const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function loadExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error(e);
  }
  const entries = SAMPLE_DATA.map(item => ({ ...item, id: generateId() }));
  saveExpenses(entries);
  return entries;
}

function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function addExpense(entry) {
  const newEntry = { ...entry, id: generateId() };
  const expenses = loadExpenses();
  expenses.push(newEntry);
  saveExpenses(expenses);
  return newEntry;
}

function updateExpense(id, updates) {
  const expenses = loadExpenses();
  const index = expenses.findIndex(e => e.id === id);
  if (index === -1) return null;
  expenses[index] = { ...expenses[index], ...updates };
  saveExpenses(expenses);
  return expenses[index];
}

function deleteExpense(id) {
  const expenses = loadExpenses();
  const filtered = expenses.filter(e => e.id !== id);
  if (filtered.length === expenses.length) return false;
  saveExpenses(filtered);
  return true;
}

function loadBudgets() {
  try {
    const stored = localStorage.getItem(BUDGET_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.categories && !parsed['2026-05']) {
        const migrated = {};
        migrated[parsed.month || '2026-05'] = parsed;
        localStorage.setItem(BUDGET_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  const initial = {
    '2026-05': { ...DEFAULT_BUDGET }
  };
  localStorage.setItem(BUDGET_KEY, JSON.stringify(initial));
  return initial;
}

function loadBudget(monthStr) {
  if (!monthStr) monthStr = getActiveMonthStr();
  const budgets = loadBudgets();
  if (!budgets[monthStr]) {
    budgets[monthStr] = {
      month: monthStr,
      categories: { ...DEFAULT_BUDGET.categories },
      totalBudget: DEFAULT_BUDGET.totalBudget,
    };
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
  }
  return budgets[monthStr];
}

function saveBudget(budget) {
  const budgets = loadBudgets();
  budgets[budget.month] = budget;
  localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
}

function updateBudget(month, category, amount) {
  const budget = loadBudget(month);
  budget.categories[category] = amount;
  budget.totalBudget = Object.values(budget.categories).reduce((sum, v) => sum + v, 0);
  saveBudget(budget);
  return budget;
}

function getDailySummaries(year, month) {
  const expenses = loadExpenses();
  const daysInMonth = new Date(year, month, 0).getDate();
  const summaries = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateObj = new Date(year, month - 1, day);
    const dayName = DAY_NAMES[dateObj.getDay()];
    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

    const dayExpenses = expenses.filter(e => e.date === dateStr);
    const categories = {
      Makanan: 0, Transportasi: 0, Belanja: 0, Hiburan: 0, Tagihan: 0, Lainnya: 0,
    };

    dayExpenses.forEach(e => {
      if (categories[e.category] !== undefined) {
        categories[e.category] += e.amount;
      }
    });

    const total = Object.values(categories).reduce((sum, v) => sum + v, 0);

    summaries.push({
      date: dateStr,
      dayName,
      isWeekend,
      categories,
      total,
    });
  }

  return summaries;
}

function getCategoryAnalysis(year, month) {
  const expenses = loadExpenses();
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  const monthExpenses = expenses.filter(e => e.date.startsWith(monthStr));
  const budget = loadBudget(monthStr);

  const totalSpent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  return CategoryLabels.map(cat => {
    const catExpenses = monthExpenses.filter(e => e.category === cat);
    const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
    const transactionCount = catExpenses.length;
    const percentage = totalSpent > 0 ? (total / totalSpent) * 100 : 0;
    const averagePerDay = transactionCount > 0 ? total / transactionCount : 0;
    const catBudget = budget.categories[cat] || 0;
    const variance = catBudget - total;
    const percentAchieved = catBudget > 0 ? (total / catBudget) * 100 : 0;

    return {
      category: cat,
      total,
      percentage,
      averagePerDay,
      transactionCount,
      budget: catBudget,
      actual: total,
      variance,
      percentAchieved,
    };
  });
}

function formatRupiah(amount) {
  if (amount === 0) return '-';
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

function getExpensesByDate(date) {
  const expenses = loadExpenses();
  return expenses.filter(e => e.date === date);
}

function getMonthTotal(year, month) {
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  const expenses = loadExpenses();
  return expenses
    .filter(e => e.date.startsWith(monthStr))
    .reduce((sum, e) => sum + e.amount, 0);
}

function getActiveDaysCount(year, month) {
  const summaries = getDailySummaries(year, month);
  return summaries.filter(s => s.total > 0).length;
}

function getHighestSpendingDay(year, month) {
  const summaries = getDailySummaries(year, month);
  const withExpenses = summaries.filter(s => s.total > 0);
  if (withExpenses.length === 0) return null;
  return withExpenses.reduce((max, s) => (s.total > max.total ? s : max), withExpenses[0]);
}

function getDayNameFromDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return DAY_NAMES[date.getDay()];
}

// --- ACTIVE CHARTS REGISTER ---
let activeCharts = {};
function destroyChart(id) {
  if (activeCharts[id]) {
    activeCharts[id].destroy();
    delete activeCharts[id];
  }
}

// Get Theme-Specific Chart Colors
function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    text: isDark ? '#A39890' : '#6B6056',
    grid: isDark ? '#2D2724' : '#E8E4E1',
    tooltipBg: '#3D352E',
    tooltipText: '#F7F5F3',
  };
}

// --- DYNAMIC VIEW RENDERING ---
const viewContainer = document.getElementById('app-view');
const pageTitleEl = document.getElementById('page-title');

function setView(viewName) {
  // Clear charts
  Object.keys(activeCharts).forEach(destroyChart);
  
  // Set tab active state
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-tab') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Render view
  let html = '';
  switch (viewName) {
    case 'dashboard':
      pageTitleEl.textContent = 'Dashboard';
      html = viewDashboard();
      break;
    case 'input':
      pageTitleEl.textContent = 'Input Harian';
      html = viewInputHarian();
      break;
    case 'rekap':
      pageTitleEl.textContent = 'Rekap Harian';
      html = viewRekapHarian();
      break;
    case 'analisis':
      pageTitleEl.textContent = 'Analisis Kategori';
      html = viewAnalisisKategori();
      break;
    case 'visualisasi':
      pageTitleEl.textContent = 'Visualisasi';
      html = viewVisualisasi();
      break;
    case 'pengaturan':
      pageTitleEl.textContent = 'Pengaturan';
      html = viewPengaturan();
      break;
    default:
      pageTitleEl.textContent = 'Dashboard';
      html = viewDashboard();
  }

  viewContainer.innerHTML = `<div class="view-container">${html}</div>`;
  lucide.createIcons();

  // Trigger post-render callbacks
  if (viewName === 'dashboard') postRenderDashboard();
  else if (viewName === 'input') postRenderInputHarian();
  else if (viewName === 'rekap') postRenderRekapHarian();
  else if (viewName === 'visualisasi') postRenderVisualisasi();
  else if (viewName === 'pengaturan') postRenderPengaturan();
}

// 1. DASHBOARD VIEW
function viewDashboard() {
  const expenses = loadExpenses();
  const monthTotal = getMonthTotal(currentYear, currentMonth);
  const activeDays = getActiveDaysCount(currentYear, currentMonth);
  const avgPerDay = activeDays > 0 ? Math.round(monthTotal / activeDays) : 0;
  const highestDay = getHighestSpendingDay(currentYear, currentMonth);

  const dailyData = getDailySummaries(currentYear, currentMonth);
  const recentTransactions = [];
  dailyData.forEach(d => {
    if (d.total > 0) {
      CategoryLabels.forEach(cat => {
        if (d.categories[cat] > 0) {
          recentTransactions.push({
            date: d.date,
            dayName: d.dayName,
            category: cat,
            description: `${cat} - ${parseInt(d.date.split('-')[2])} ${MONTH_NAMES[currentMonth - 1]}`,
            amount: d.categories[cat]
          });
        }
      });
    }
  });
  recentTransactions.reverse();
  const slicedRecent = recentTransactions.slice(0, 5);

  let recentHtml = '';
  if (slicedRecent.length === 0) {
    recentHtml = `<p class="tx-meta" style="text-align: center; padding: 24px 0;">Belum ada transaksi</p>`;
  } else {
    recentHtml = slicedRecent.map(tx => `
      <div class="tx-row" style="padding: 10px 12px; border-radius: var(--radius-sm);">
        <div class="tx-info">
          <div class="category-dot dot-${tx.category}"></div>
          <div class="tx-details">
            <p class="tx-desc" style="font-size: 13px;">${tx.category}</p>
            <p class="tx-meta">${tx.dayName}, ${parseInt(tx.date.split('-')[2])} ${MONTH_NAMES[currentMonth - 1]}</p>
          </div>
        </div>
        <span class="tx-amount" style="font-size: 13px;">${formatRupiah(tx.amount)}</span>
      </div>
    `).join('');
  }

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  return `
    <div class="view-header">
      <h2 class="card-title" style="font-size: 20px;">Dashboard</h2>
      <p class="view-subtitle">Ringkasan pengeluaran bulan ${MONTH_NAMES[currentMonth - 1]} ${currentYear}</p>
    </div>

    <div class="grid-2">
      <!-- KPI: Total Pengeluaran -->
      <div class="card hover-effect">
        <div class="kpi-container">
          <div>
            <p class="kpi-title">Total Pengeluaran Bulanan</p>
            <p class="kpi-value expense">${formatRupiah(monthTotal)}</p>
            <p class="kpi-meta">${MONTH_NAMES[currentMonth - 1]} ${currentYear}</p>
          </div>
          <div class="kpi-icon-box primary">
            <i data-lucide="wallet"></i>
          </div>
        </div>
        <div class="kpi-sparkline">
          <canvas id="sparkline-chart"></canvas>
        </div>
      </div>

      <!-- KPI: Rata-rata Harian -->
      <div class="card hover-effect">
        <div class="kpi-container">
          <div>
            <p class="kpi-title">Rata-rata per Hari</p>
            <p class="kpi-value average">${formatRupiah(avgPerDay)}</p>
            <p class="kpi-meta success">
              <i data-lucide="calendar" style="width: 14px; height: 14px;"></i>
              <span>${activeDays} hari aktif dari ${daysInMonth} hari</span>
            </p>
            ${highestDay ? `
              <p class="view-subtitle" style="font-size: 11px; margin-top: 6px;">
                Tertinggi: ${highestDay.dayName}, ${parseInt(highestDay.date.split('-')[2])} ${MONTH_NAMES[currentMonth - 1]} (${formatRupiah(highestDay.total)})
              </p>
            ` : ''}
          </div>
          <div class="kpi-icon-box success">
            <i data-lucide="trending-up"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Trend Chart -->
    <div class="card">
      <div class="card-header-flex">
        <div>
          <h3 class="card-title">Tren Pengeluaran Harian</h3>
          <p class="card-subtitle">1 - ${daysInMonth} ${MONTH_NAMES[currentMonth - 1]} ${currentYear}</p>
        </div>
      </div>
      <div class="chart-container" style="height: 260px;">
        <canvas id="dashboard-trend-chart"></canvas>
      </div>
    </div>

    <div class="grid-2">
      <!-- Donut Chart -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 20px;">Pengeluaran per Kategori</h3>
        <div class="donut-chart-container">
          <div style="position: relative; width: 180px; height: 180px;">
            <canvas id="dashboard-donut-chart"></canvas>
            <div class="donut-inner-label">
              <p class="donut-label-title">Total</p>
              <p class="donut-label-value">${formatRupiah(monthTotal)}</p>
            </div>
          </div>
          <div class="chart-legend" id="dashboard-donut-legend">
            <!-- Populated in post render -->
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 20px;">Transaksi Terbaru</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${recentHtml}
        </div>
      </div>
    </div>
  `;
}

function postRenderDashboard() {
  const themeColors = getChartColors();
  const dailyData = getDailySummaries(currentYear, currentMonth);
  const chartData = dailyData.filter(d => d.total > 0);
  const last7Days = chartData.slice(-7);
  const sparklineVals = last7Days.map(d => d.total);

  // 1. Sparkline chart
  const sparkCtx = document.getElementById('sparkline-chart')?.getContext('2d');
  if (sparkCtx) {
    destroyChart('sparkline');
    activeCharts['sparkline'] = new Chart(sparkCtx, {
      type: 'bar',
      data: {
        labels: last7Days.map(d => parseInt(d.date.split('-')[2])),
        datasets: [{
          data: sparklineVals,
          backgroundColor: '#C4705A',
          borderRadius: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }

  // 2. Trend Bar chart
  const trendCtx = document.getElementById('dashboard-trend-chart')?.getContext('2d');
  if (trendCtx) {
    destroyChart('trend');
    
    const labels = chartData.map(d => parseInt(d.date.split('-')[2]));
    const values = chartData.map(d => d.total);
    const bgColors = chartData.map(d => d.isWeekend ? '#A85D4A' : '#C4705A');

    activeCharts['trend'] = new Chart(trendCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: bgColors,
          borderRadius: 4,
          maxBarThickness: 16
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: themeColors.tooltipBg,
            titleColor: themeColors.tooltipText,
            bodyColor: themeColors.tooltipText,
            titleFont: { family: 'Inter', size: 12 },
            bodyFont: { family: 'Inter', size: 12 },
            padding: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return 'Total: ' + formatRupiah(context.parsed.y);
              },
              title: function(context) {
                const dayIndex = chartData[context[0].dataIndex];
                return `Tanggal ${parseInt(dayIndex.date.split('-')[2])} (${dayIndex.dayName})`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: themeColors.text, font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: themeColors.grid },
            ticks: {
              color: themeColors.text,
              font: { family: 'Inter', size: 10 },
              callback: function(value) { return 'Rp ' + (value / 1000) + 'k'; }
            }
          }
        }
      }
    });
  }

  // 3. Donut chart
  const donutCtx = document.getElementById('dashboard-donut-chart')?.getContext('2d');
  if (donutCtx) {
    destroyChart('donut');
    const categoryData = getCategoryAnalysis(currentYear, currentMonth).filter(c => c.total > 0);
    const labels = categoryData.map(c => c.category);
    const values = categoryData.map(c => c.total);
    const colors = categoryData.map(c => CategoryColors[c.category]);

    activeCharts['donut'] = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 0,
          cutout: '72%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: themeColors.tooltipBg,
            bodyColor: themeColors.tooltipText,
            bodyFont: { family: 'Inter', size: 12 },
            padding: 8,
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${formatRupiah(context.parsed)}`;
              }
            }
          }
        }
      }
    });

    // Populate legend
    const legendEl = document.getElementById('dashboard-donut-legend');
    if (legendEl) {
      const monthTotal = getMonthTotal(currentYear, currentMonth);
      legendEl.innerHTML = categoryData.map(c => {
        const pct = monthTotal > 0 ? ((c.total / monthTotal) * 100).toFixed(1) : 0;
        return `
          <div class="legend-item">
            <span class="category-dot dot-${c.category}"></span>
            <span>${c.category}</span>
            <span style="font-weight: 500; opacity: 0.8;">${pct}%</span>
          </div>
        `;
      }).join('');
    }
  }
}

// 2. INPUT HARIAN VIEW
let deleteTargetId = null;

function viewInputHarian() {
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const minDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
  const maxDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

  return `
    <div class="view-header">
      <h2 class="card-title" style="font-size: 20px;">Input Pengeluaran Harian</h2>
      <p class="view-subtitle">Tambah dan kelola pengeluaran harian Anda</p>
    </div>

    <div class="grid-5">
      <!-- Input Form -->
      <div>
        <div class="card" style="position: sticky; top: 80px;">
          <form id="expense-form" class="space-y-4">
            
            <div class="form-group">
              <label class="form-label">Tanggal</label>
              <div class="input-container">
                <i data-lucide="calendar" class="input-icon"></i>
                <input type="date" id="form-date" class="form-input has-icon" min="${minDate}" max="${maxDate}" value="${getDefaultFormDate()}">
              </div>
              <p class="form-error" id="error-date"></p>
            </div>

            <div class="form-group">
              <label class="form-label">Hari</label>
              <input type="text" id="form-day" class="form-input" readonly value="Minggu">
            </div>

            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select id="form-category" class="form-select">
                ${CategoryLabels.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
              </select>
              <p class="form-error" id="error-category"></p>
            </div>

            <div class="form-group">
              <label class="form-label">Keterangan</label>
              <input type="text" id="form-desc" class="form-input" placeholder="Contoh: Nasi Ayam, Bensin, dll" maxlength="100">
            </div>

            <div class="form-group">
              <label class="form-label">Jumlah (Rp)</label>
              <div class="input-container">
                <span class="input-icon" style="font-size: 13px; font-weight: 500; font-family: monospace;">Rp</span>
                <input type="text" id="form-amount" class="form-input has-icon text-right" placeholder="0" inputmode="numeric">
              </div>
              <p class="form-error" id="error-amount"></p>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">
              <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
              Tambah Pengeluaran
            </button>
          </form>
        </div>
      </div>

      <!-- Transaction List -->
      <div>
        <div class="card" style="padding: 0; overflow: hidden;" id="transaction-list-card">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>
  `;
}

function postRenderInputHarian() {
  const dateInput = document.getElementById('form-date');
  const dayInput = document.getElementById('form-day');
  const amountInput = document.getElementById('form-amount');
  const form = document.getElementById('expense-form');

  // Sync initial day name from date input value
  if (dateInput && dayInput && dateInput.value) {
    dayInput.value = getDayNameFromDate(dateInput.value);
  }

  // Sync day name from date input
  dateInput?.addEventListener('change', (e) => {
    if (e.target.value) {
      dayInput.value = getDayNameFromDate(e.target.value);
    }
  });

  // Numeric input formatting (only numbers)
  amountInput?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });

  // Render expenses list
  renderExpensesList();

  // Form submit handler
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validation
    const dateVal = dateInput.value;
    const catVal = document.getElementById('form-category').value;
    const descVal = document.getElementById('form-desc').value.trim() || '-';
    const amountValStr = amountInput.value.replace(/\D/g, '');
    const amountVal = parseInt(amountValStr);

    let hasErrors = false;

    // Reset errors
    document.getElementById('error-date').textContent = '';
    document.getElementById('error-amount').textContent = '';
    dateInput.classList.remove('error');
    amountInput.classList.remove('error');

    if (!dateVal) {
      document.getElementById('error-date').textContent = 'Tanggal wajib diisi';
      dateInput.classList.add('error');
      hasErrors = true;
    }
    if (!amountValStr || amountVal <= 0) {
      document.getElementById('error-amount').textContent = 'Jumlah wajib diisi dan lebih dari 0';
      amountInput.classList.add('error');
      hasErrors = true;
    } else if (amountVal > 99999999) {
      document.getElementById('error-amount').textContent = 'Jumlah terlalu besar';
      amountInput.classList.add('error');
      hasErrors = true;
    }

    if (hasErrors) return;

    // Add expense
    addExpense({
      date: dateVal,
      dayName: dayInput.value,
      category: catVal,
      description: descVal,
      amount: amountVal
    });

    // Reset inputs
    document.getElementById('form-desc').value = '';
    amountInput.value = '';
    
    renderExpensesList();
  });
}

// Inline edit state
let inlineEditingId = null;
let inlineEditData = { category: '', description: '', amount: '' };

function renderExpensesList() {
  const expenses = loadExpenses();
  const container = document.getElementById('transaction-list-card');
  if (!container) return;

  const activeMonthStr = getActiveMonthStr();
  const monthExpenses = expenses.filter(e => e.date.startsWith(activeMonthStr));

  if (monthExpenses.length === 0) {
    container.innerHTML = `
      <div style="padding: 48px; text-align: center;">
        <div style="width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 50%; background-color: var(--bg-base); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
          <i data-lucide="calendar" style="width: 24px; height: 24px;"></i>
        </div>
        <p style="font-weight: 500; margin-bottom: 2px;">Belum ada pengeluaran</p>
        <p class="view-subtitle" style="font-size: 13px;">Tambahkan pengeluaran harian Anda</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Group by date
  const dailyData = getDailySummaries(currentYear, currentMonth);
  const groups = [];
  const datesWithExpenses = new Set(monthExpenses.map(e => e.date));

  dailyData.forEach(summary => {
    if (datesWithExpenses.has(summary.date)) {
      const dayExpenses = monthExpenses
        .filter(e => e.date === summary.date)
        .sort((a, b) => b.id.localeCompare(a.id)); // sort newest first in UI

      groups.push({
        date: summary.date,
        dayName: summary.dayName,
        isWeekend: summary.isWeekend,
        entries: dayExpenses,
        total: summary.total
      });
    }
  });

  // Sort dates descending
  groups.sort((a, b) => b.date.localeCompare(a.date));

  let groupsHtml = groups.map(group => {
    let headerStyle = group.isWeekend ? 'background-color: rgba(196, 112, 90, 0.08); border-left: 3px solid var(--primary);' : '';
    let dayNum = parseInt(group.date.split('-')[2]);

    let entriesHtml = group.entries.map(entry => {
      // If this entry is being edited inline
      if (inlineEditingId === entry.id) {
        return `
          <div class="tx-row" style="padding: 12px; background-color: var(--bg-hover);">
            <div class="tx-edit-form">
              <select id="edit-cat-${entry.id}" class="form-select" style="height: 32px; padding: 0 8px; font-size: 12px;">
                ${CategoryLabels.map(cat => `<option value="${cat}" ${inlineEditData.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
              </select>
              <input type="text" id="edit-desc-${entry.id}" class="form-input" style="height: 32px; font-size: 12px;" value="${inlineEditData.description}">
              <input type="text" id="edit-amount-${entry.id}" class="form-input text-right" style="height: 32px; font-size: 12px; font-family: monospace;" value="${inlineEditData.amount}">
              
              <div style="display: flex; gap: 4px; justify-content: flex-end;">
                <button class="action-icon-btn success" onclick="saveInlineEdit('${entry.id}')" title="Save">
                  <i data-lucide="check" style="width: 14px; height: 14px;"></i>
                </button>
                <button class="action-icon-btn danger" onclick="cancelInlineEdit()" title="Cancel">
                  <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // Normal row
      return `
        <div class="tx-row">
          <div class="tx-info">
            <div class="category-dot dot-${entry.category}"></div>
            <div class="tx-details">
              <p class="tx-desc">${entry.description}</p>
              <p class="tx-meta">${entry.category}</p>
            </div>
          </div>
          <div class="tx-actions">
            <span class="tx-amount">${formatRupiah(entry.amount)}</span>
            <button class="action-icon-btn" onclick="startInlineEdit('${entry.id}', '${entry.category}', '${entry.description.replace(/'/g, "\\'")}', ${entry.amount})" title="Edit">
              <i data-lucide="pencil" style="width: 13px; height: 13px;"></i>
            </button>
            <button class="action-icon-btn danger" onclick="triggerDelete('${entry.id}')" title="Hapus">
              <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div style="border-bottom: 1px solid var(--border);">
        <div class="date-group-header" style="${headerStyle}">
          <div class="date-group-title">
            <span class="table-date-badge" style="background-color: var(--border);">${dayNum}</span>
            <span style="font-weight: 600; color: ${group.isWeekend ? 'var(--primary)' : 'var(--text-main)'};">${group.dayName}</span>
          </div>
          <span class="date-group-total">${formatRupiah(group.total)}</span>
        </div>
        <div>
          ${entriesHtml}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `<div style="display: flex; flex-direction: column;">${groupsHtml}</div>`;
  lucide.createIcons();

  // Add formatting handler to inline edit amount if active
  if (inlineEditingId) {
    const editAmountInput = document.getElementById(`edit-amount-${inlineEditingId}`);
    editAmountInput?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
}

// Inline edit actions
window.startInlineEdit = function(id, category, description, amount) {
  inlineEditingId = id;
  inlineEditData = { category, description, amount: amount.toString() };
  renderExpensesList();
};

window.cancelInlineEdit = function() {
  inlineEditingId = null;
  renderExpensesList();
};

window.saveInlineEdit = function(id) {
  const cat = document.getElementById(`edit-cat-${id}`).value;
  const desc = document.getElementById(`edit-desc-${id}`).value.trim() || '-';
  const amtStr = document.getElementById(`edit-amount-${id}`).value.replace(/\D/g, '');
  const amt = parseInt(amtStr) || 0;

  if (amt <= 0) return;

  updateExpense(id, {
    category: cat,
    description: desc,
    amount: amt
  });

  inlineEditingId = null;
  renderExpensesList();
};

// Delete actions
const deleteModal = document.getElementById('delete-modal');
const deleteConfirmBtn = document.getElementById('delete-confirm-btn');
const deleteCancelBtn = document.getElementById('delete-cancel-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');

window.triggerDelete = function(id) {
  deleteTargetId = id;
  deleteModal.classList.add('active');
};

deleteCancelBtn?.addEventListener('click', () => {
  deleteModal.classList.remove('active');
  deleteTargetId = null;
});

deleteConfirmBtn?.addEventListener('click', () => {
  if (deleteTargetId) {
    deleteExpense(deleteTargetId);
    deleteModal.classList.remove('active');
    deleteTargetId = null;
    
    // Refresh page
    const currentActiveTab = document.querySelector('.nav-item.active')?.getAttribute('data-tab');
    if (currentActiveTab === 'input') {
      renderExpensesList();
    } else {
      setView(currentActiveTab || 'dashboard');
    }
  }
});

// 3. REKAP HARIAN VIEW
function viewRekapHarian() {
  const dailyData = getDailySummaries(currentYear, currentMonth);

  // Calculate totals
  const catTotals = { Makanan: 0, Transportasi: 0, Belanja: 0, Hiburan: 0, Tagihan: 0, Lainnya: 0 };
  let grandTotal = 0;

  dailyData.forEach(d => {
    CategoryLabels.forEach(cat => {
      catTotals[cat] += d.categories[cat] || 0;
    });
    grandTotal += d.total;
  });

  const activeDays = dailyData.filter(d => d.total > 0).length || 1;
  const averages = {};
  CategoryLabels.forEach(cat => {
    averages[cat] = Math.round(catTotals[cat] / activeDays);
  });
  const avgTotal = Math.round(grandTotal / activeDays);

  const tableRows = dailyData.map(row => {
    const dayNum = parseInt(row.date.split('-')[2]);
    const isWeekendClass = row.isWeekend ? 'weekend' : 'hoverable';
    const dayNameStyle = row.dayName === 'Minggu' ? 'font-weight: 600; color: var(--primary);' : '';

    const categoryCols = CategoryLabels.map(cat => {
      const val = row.categories[cat] || 0;
      return `<td style="text-align: right; font-family: monospace;">${val > 0 ? val.toLocaleString('id-ID') : '-'}</td>`;
    }).join('');

    return `
      <tr class="${isWeekendClass}">
        <td>
          <span class="table-date-badge">${dayNum}</span>
        </td>
        <td style="${dayNameStyle}">${row.dayName}</td>
        ${categoryCols}
        <td style="text-align: right; font-family: monospace; font-weight: 500;">
          ${row.total > 0 ? row.total.toLocaleString('id-ID') : '-'}
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="view-header" style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 class="card-title" style="font-size: 20px;">Rekap Pengeluaran Harian</h2>
          <p class="view-subtitle">Ringkasan total pengeluaran per hari dan kategori (${MONTH_NAMES[currentMonth - 1]} ${currentYear})</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline" id="export-csv-btn">
            <i data-lucide="download" style="width: 14px; height: 14px;"></i>
            Export CSV
          </button>
          <button class="btn btn-success" id="export-xlsx-btn">
            <i data-lucide="file-spreadsheet" style="width: 14px; height: 14px;"></i>
            Download Excel (.xlsx)
          </button>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table" style="min-width: 760px;">
        <thead>
          <tr>
            <th style="width: 60px;">Tgl</th>
            <th style="width: 80px;">Hari</th>
            ${CategoryLabels.map(cat => `
              <th style="text-align: right; width: 100px;">
                <div style="display: inline-flex; align-items: center; gap: 4px;">
                  <span class="category-dot dot-${cat}" style="width: 6px; height: 6px;"></span>
                  <span>${cat}</span>
                </div>
              </th>
            `).join('')}
            <th style="text-align: right; width: 110px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
        <tfoot>
          <!-- Total Row -->
          <tr class="total-row">
            <td colspan="2">TOTAL</td>
            ${CategoryLabels.map(cat => {
              const val = catTotals[cat];
              return `<td style="text-align: right; font-family: monospace;">${val > 0 ? val.toLocaleString('id-ID') : '-'}</td>`;
            }).join('')}
            <td style="text-align: right; font-family: monospace; font-size: 15px; font-weight: 700;">
              ${grandTotal.toLocaleString('id-ID')}
            </td>
          </tr>
          <!-- Average Row -->
          <tr class="avg-row">
            <td colspan="2">RATA-RATA</td>
            ${CategoryLabels.map(cat => {
              const val = averages[cat];
              return `<td style="text-align: right; font-family: monospace; font-style: italic;">${val > 0 ? val.toLocaleString('id-ID') : '-'}</td>`;
            }).join('')}
            <td style="text-align: right; font-family: monospace; font-weight: 600; font-style: italic;">
              ${avgTotal.toLocaleString('id-ID')}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

function postRenderRekapHarian() {
  const exportBtn = document.getElementById('export-csv-btn');
  exportBtn?.addEventListener('click', () => {
    exportBtn.disabled = true;
    exportBtn.innerHTML = 'Mengekspor...';

    const dailyData = getDailySummaries(currentYear, currentMonth);

    const catTotals = { Makanan: 0, Transportasi: 0, Belanja: 0, Hiburan: 0, Tagihan: 0, Lainnya: 0 };
    let grandTotal = 0;

    dailyData.forEach(d => {
      CategoryLabels.forEach(cat => {
        catTotals[cat] += d.categories[cat] || 0;
      });
      grandTotal += d.total;
    });

    const activeDays = dailyData.filter(d => d.total > 0).length || 1;
    const averages = {};
    CategoryLabels.forEach(cat => {
      averages[cat] = Math.round(catTotals[cat] / activeDays);
    });
    const avgTotal = Math.round(grandTotal / activeDays);

    const headers = ['Tanggal', 'Hari', ...CategoryLabels, 'Total Harian'];
    const rows = dailyData.map(d => [
      parseInt(d.date.split('-')[2]),
      d.dayName,
      ...CategoryLabels.map(cat => d.categories[cat] || ''),
      d.total || ''
    ]);

    const totalRow = [
      'TOTAL', '',
      ...CategoryLabels.map(cat => catTotals[cat]),
      grandTotal
    ];

    const avgRow = [
      'RATA-RATA', '',
      ...CategoryLabels.map(cat => averages[cat]),
      avgTotal
    ];

    const csvContent = [headers, ...rows, totalRow, avgRow]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const monthNameLower = MONTH_NAMES[currentMonth - 1].toLowerCase();
    link.download = `rekap-harian-${monthNameLower}-${currentYear}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      exportBtn.disabled = false;
      exportBtn.innerHTML = '<i data-lucide="download" style="width: 14px; height: 14px;"></i> Export CSV';
      lucide.createIcons();
    }, 800);
  });

  const exportXlsxBtn = document.getElementById('export-xlsx-btn');
  exportXlsxBtn?.addEventListener('click', () => {
    exportXlsxBtn.disabled = true;
    exportXlsxBtn.innerHTML = 'Mengekspor...';

    setTimeout(() => {
      try {
        exportToExcel(currentYear, currentMonth);
      } catch (err) {
        console.error(err);
        alert('Gagal mendownload file Excel');
      }
      exportXlsxBtn.disabled = false;
      exportXlsxBtn.innerHTML = '<i data-lucide="file-spreadsheet" style="width: 14px; height: 14px;"></i> Download Excel (.xlsx)';
      lucide.createIcons();
    }, 100);
  });
}

// 4. ANALISIS KATEGORI VIEW
function viewAnalisisKategori() {
  const analysis = getCategoryAnalysis(currentYear, currentMonth);
  const monthTotal = getMonthTotal(currentYear, currentMonth);

  const totalBudget = analysis.reduce((sum, a) => sum + a.budget, 0);
  const totalActual = monthTotal;
  const totalVariance = totalBudget - totalActual;
  const totalPercentAchieved = totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0;

  // Breakdown Rows
  const breakdownRows = analysis.map(item => {
    const totalHtml = item.total > 0 ? item.total.toLocaleString('id-ID') : '-';
    const averageHtml = item.averagePerDay > 0 ? Math.round(item.averagePerDay).toLocaleString('id-ID') : '-';
    const countHtml = item.transactionCount > 0 ? item.transactionCount : '-';
    const percentBar = item.total > 0 ? `
      <div class="progress-container">
        <div class="progress-track">
          <div class="progress-bar" style="width: ${item.percentage}%; background-color: var(--cat-${item.category});"></div>
        </div>
        <span class="progress-label">${item.percentage.toFixed(1)}%</span>
      </div>
    ` : '<span class="view-subtitle">-</span>';

    return `
      <tr class="hoverable">
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="category-dot dot-${item.category}"></span>
            <span style="font-weight: 500;">${item.category}</span>
          </div>
        </td>
        <td style="text-align: right; font-family: monospace; font-weight: 600;">${totalHtml}</td>
        <td>${percentBar}</td>
        <td style="text-align: right; font-family: monospace;">${averageHtml}</td>
        <td style="text-align: right; font-family: monospace;">${countHtml}</td>
      </tr>
    `;
  }).join('');

  // Budget Rows
  const budgetData = analysis.filter(item => item.budget > 0 || item.actual > 0);
  const budgetRows = budgetData.map(item => {
    const budgetVal = item.budget > 0 ? item.budget.toLocaleString('id-ID') : '-';
    const actualVal = item.actual > 0 ? item.actual.toLocaleString('id-ID') : '-';
    
    let varianceHtml = '';
    if (item.budget > 0) {
      const isPositive = item.variance >= 0;
      const color = isPositive ? 'var(--success)' : 'var(--primary)';
      const prefix = isPositive ? '+' : '';
      varianceHtml = `<span style="font-family: monospace; font-weight: 500; color: ${color};">${prefix}${item.variance.toLocaleString('id-ID')}</span>`;
    } else {
      varianceHtml = `<span style="font-family: monospace; color: var(--primary);">-${item.actual.toLocaleString('id-ID')}</span>`;
    }

    let progressHtml = '';
    if (item.budget > 0) {
      const isOver = item.percentAchieved > 100;
      const barColor = isOver ? 'var(--primary)' : `var(--cat-${item.category})`;
      progressHtml = `
        <div class="progress-container">
          <div class="progress-track" style="height: 10px;">
            <div class="progress-bar" style="width: ${Math.min(item.percentAchieved, 100)}%; background-color: ${barColor};"></div>
          </div>
          <span class="progress-label" style="font-weight: 600; color: ${isOver ? 'var(--primary)' : 'var(--text-light)'};">${item.percentAchieved.toFixed(1)}%</span>
          ${isOver ? `<i data-lucide="alert-circle" style="width: 14px; height: 14px; color: var(--primary); flex-shrink: 0;"></i>` : ''}
        </div>
      `;
    } else {
      progressHtml = '<span class="view-subtitle">-</span>';
    }

    return `
      <tr class="hoverable">
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="category-dot dot-${item.category}"></span>
            <span style="font-weight: 500;">${item.category}</span>
          </div>
        </td>
        <td style="text-align: right; font-family: monospace; opacity: 0.8;">${budgetVal}</td>
        <td style="text-align: right; font-family: monospace; font-weight: 500;">${actualVal}</td>
        <td style="text-align: right;">${varianceHtml}</td>
        <td>${progressHtml}</td>
      </tr>
    `;
  }).join('');

  return `
    <div class="view-header">
      <h2 class="card-title" style="font-size: 20px;">Analisis Pengeluaran per Kategori</h2>
      <p class="view-subtitle">Breakdown pengeluaran dan perbandingan dengan budget bulan ${MONTH_NAMES[currentMonth - 1]} ${currentYear}</p>
    </div>

    <!-- Breakdown Table -->
    <div class="card" style="padding: 0; overflow: hidden; margin-bottom: 24px;">
      <div style="padding: 16px 20px; border-bottom: 1px solid var(--border);">
        <h3 class="card-title">Breakdown per Kategori</h3>
      </div>
      <div class="table-wrapper" style="border: none; border-radius: 0;">
        <table class="data-table" style="min-width: 600px;">
          <thead>
            <tr>
              <th>Kategori</th>
              <th style="text-align: right;">Total (Rp)</th>
              <th style="width: 220px;">% Dari Total</th>
              <th style="text-align: right;">Rata-rata/Trx</th>
              <th style="text-align: right;">Transaksi</th>
            </tr>
          </thead>
          <tbody>
            ${breakdownRows}
          </tbody>
          <tfoot>
            <tr style="background-color: var(--bg-base); font-weight: 600;">
              <td>TOTAL</td>
              <td style="text-align: right; font-family: monospace; font-weight: 700;">${monthTotal.toLocaleString('id-ID')}</td>
              <td style="font-size: 12px;">100%</td>
              <td style="text-align: right; font-family: monospace;">
                ${Math.round(analysis.reduce((sum, a) => sum + a.averagePerDay, 0)).toLocaleString('id-ID')}
              </td>
              <td style="text-align: right; font-family: monospace;">
                ${analysis.reduce((sum, a) => sum + a.transactionCount, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Budget vs Actual Table -->
    <div class="card" style="padding: 0; overflow: hidden;">
      <div style="padding: 16px 20px; border-bottom: 1px solid var(--border);">
        <h3 class="card-title">Budget vs. Aktual</h3>
      </div>
      <div class="table-wrapper" style="border: none; border-radius: 0;">
        <table class="data-table" style="min-width: 620px;">
          <thead>
            <tr>
              <th>Kategori</th>
              <th style="text-align: right;">Budget (Rp)</th>
              <th style="text-align: right;">Aktual (Rp)</th>
              <th style="text-align: right;">Selisih (Rp)</th>
              <th style="width: 240px;">% Tercapai</th>
            </tr>
          </thead>
          <tbody>
            ${budgetRows}
          </tbody>
          <tfoot>
            <tr style="background-color: var(--bg-base); font-weight: 600;">
              <td>TOTAL</td>
              <td style="text-align: right; font-family: monospace; opacity: 0.8;">${totalBudget.toLocaleString('id-ID')}</td>
              <td style="text-align: right; font-family: monospace; font-weight: 700;">${totalActual.toLocaleString('id-ID')}</td>
              <td style="text-align: right; color: ${totalVariance >= 0 ? 'var(--success)' : 'var(--primary)'}; font-family: monospace; font-weight: 700;">
                ${totalVariance >= 0 ? '+' : ''}${totalVariance.toLocaleString('id-ID')}
              </td>
              <td>
                <div class="progress-container">
                  <div class="progress-track" style="height: 10px;">
                    <div class="progress-bar" style="width: ${Math.min(totalPercentAchieved, 100)}%; background-color: var(--success);"></div>
                  </div>
                  <span class="progress-label" style="font-weight: 700;">${totalPercentAchieved.toFixed(1)}%</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `;
}

// 5. VISUALISASI VIEW
function viewVisualisasi() {
  const dailyData = getDailySummaries(currentYear, currentMonth);
  const categoryData = getCategoryAnalysis(currentYear, currentMonth);
  const monthTotal = getMonthTotal(currentYear, currentMonth);

  // Build calendar heatmap dynamically
  const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const calendarWeeks = [];

  let currentWeek = [];
  // Empty blocks before the first day of the month
  for (let i = 0; i < firstDayIndex; i++) {
    currentWeek.push({ day: null, amount: 0, isWeekend: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const summary = dailyData.find(d => d.date === dateStr);
    const dow = (firstDayIndex + day - 1) % 7;
    currentWeek.push({
      day,
      amount: summary ? summary.total : 0,
      isWeekend: dow === 0 || dow === 6
    });

    if (currentWeek.length === 7) {
      calendarWeeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ day: null, amount: 0, isWeekend: false });
    }
    calendarWeeks.push(currentWeek);
  }

  const getHeatClass = (amount) => {
    if (amount === 0) return 'heat-0';
    if (amount <= 30000) return 'heat-1';
    if (amount <= 70000) return 'heat-2';
    if (amount <= 100000) return 'heat-3';
    return 'heat-4';
  };

  const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const today = new Date();

  const heatmapRows = calendarWeeks.map(week => {
    const cells = week.map(cell => {
      if (cell.day === null) {
        return `<div class="heatmap-cell empty"></div>`;
      }
      
      const heatClass = getHeatClass(cell.amount);
      const isWeekendClass = cell.isWeekend ? 'weekend' : '';
      
      const isToday = today.getFullYear() === currentYear && (today.getMonth() + 1) === currentMonth && today.getDate() === cell.day;
      const isTodayClass = isToday ? 'today-highlight' : '';

      return `
        <div class="heatmap-cell ${heatClass} ${isWeekendClass} ${isTodayClass}">
          <span class="heatmap-day-num">${cell.day}</span>
          ${cell.amount > 0 ? `<span class="heatmap-day-amount">Rp${(cell.amount / 1000).toFixed(0)}k</span>` : ''}
        </div>
      `;
    }).join('');

    return `<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">${cells}</div>`;
  }).join('');

  return `
    <div class="view-header">
      <h2 class="card-title" style="font-size: 20px;">Visualisasi</h2>
      <p class="view-subtitle">Grafik dan visualisasi data pengeluaran</p>
    </div>

    <div class="grid-2">
      <!-- Tren Harian -->
      <div class="card">
        <h3 class="card-title">Tren Pengeluaran Harian</h3>
        <p class="card-subtitle" style="margin-bottom: 20px;">1 - ${daysInMonth} ${MONTH_NAMES[currentMonth - 1]} ${currentYear}</p>
        <div class="chart-container">
          <canvas id="vis-trend-chart"></canvas>
        </div>
      </div>

      <!-- Breakdown Kategori -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 20px;">Breakdown per Kategori</h3>
        <div class="donut-chart-container">
          <div style="position: relative; width: 180px; height: 180px;">
            <canvas id="vis-donut-chart"></canvas>
            <div class="donut-inner-label">
              <p class="donut-label-title">Total</p>
              <p class="donut-label-value">${formatRupiah(monthTotal)}</p>
            </div>
          </div>
          <div class="chart-legend" id="vis-donut-legend"></div>
        </div>
      </div>

      <!-- Budget vs Aktual -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 20px;">Budget vs. Aktual</h3>
        <div class="chart-container">
          <canvas id="vis-budget-chart"></canvas>
        </div>
      </div>

      <!-- Kalender Pengeluaran Heatmap -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 20px;">Kalender Pengeluaran</h3>
        <div style="display: flex; flex-direction: column; align-items: center;">
          
          <div class="heatmap-days-header">
            ${dayLabels.map(lbl => `<div>${lbl}</div>`).join('')}
          </div>

          <div class="heatmap-grid" style="display: flex; flex-direction: column; gap: 4px;">
            ${heatmapRows}
          </div>

          <!-- Heatmap Legend -->
          <div class="heatmap-legend">
            <span>Rendah</span>
            <div class="legend-scale">
              <div class="legend-box heat-0"></div>
              <div class="legend-box heat-1"></div>
              <div class="legend-box heat-2"></div>
              <div class="legend-box heat-3"></div>
              <div class="legend-box heat-4"></div>
            </div>
            <span>Tinggi</span>
          </div>

        </div>
      </div>
    </div>
  `;
}

function postRenderVisualisasi() {
  const themeColors = getChartColors();
  const dailyData = getDailySummaries(currentYear, currentMonth);
  const chartData = dailyData.filter(d => d.total > 0);
  const categoryData = getCategoryAnalysis(currentYear, currentMonth);
  const monthTotal = getMonthTotal(currentYear, currentMonth);

  // 1. Trend Bar chart
  const trendCtx = document.getElementById('vis-trend-chart')?.getContext('2d');
  if (trendCtx) {
    destroyChart('visTrend');
    
    const labels = chartData.map(d => parseInt(d.date.split('-')[2]));
    const values = chartData.map(d => d.total);
    const bgColors = chartData.map(d => d.isWeekend ? '#A85D4A' : '#C4705A');

    activeCharts['visTrend'] = new Chart(trendCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: bgColors,
          borderRadius: 4,
          maxBarThickness: 16
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: themeColors.tooltipBg,
            titleColor: themeColors.tooltipText,
            bodyColor: themeColors.tooltipText,
            titleFont: { family: 'Inter', size: 12 },
            bodyFont: { family: 'Inter', size: 12 },
            padding: 8,
            displayColors: false,
            callbacks: {
              label: function(context) { return 'Total: ' + formatRupiah(context.parsed.y); },
              title: function(context) {
                const day = chartData[context[0].dataIndex];
                return `Tanggal ${parseInt(day.date.split('-')[2])} (${day.dayName})`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: themeColors.text, font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: themeColors.grid },
            ticks: {
              color: themeColors.text,
              font: { family: 'Inter', size: 10 },
              callback: function(value) { return 'Rp ' + (value / 1000) + 'k'; }
            }
          }
        }
      }
    });
  }

  // 2. Donut chart
  const donutCtx = document.getElementById('vis-donut-chart')?.getContext('2d');
  if (donutCtx) {
    destroyChart('visDonut');
    const filteredCategories = categoryData.filter(c => c.total > 0);
    const labels = filteredCategories.map(c => c.category);
    const values = filteredCategories.map(c => c.total);
    const colors = filteredCategories.map(c => CategoryColors[c.category]);

    activeCharts['visDonut'] = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 0,
          cutout: '72%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: themeColors.tooltipBg,
            bodyColor: themeColors.tooltipText,
            bodyFont: { family: 'Inter', size: 12 },
            padding: 8,
            callbacks: {
              label: function(context) { return ` ${context.label}: ${formatRupiah(context.parsed)}`; }
            }
          }
        }
      }
    });

    // Populate legend
    const legendEl = document.getElementById('vis-donut-legend');
    if (legendEl) {
      legendEl.innerHTML = filteredCategories.map(c => {
        const pct = monthTotal > 0 ? ((c.total / monthTotal) * 100).toFixed(1) : 0;
        return `
          <div class="legend-item">
            <span class="category-dot dot-${c.category}"></span>
            <span>${c.category}</span>
            <span style="font-weight: 500; opacity: 0.8;">${pct}%</span>
          </div>
        `;
      }).join('');
    }
  }

  // 3. Budget vs Actual Horizontal Bar Chart
  const budgetCtx = document.getElementById('vis-budget-chart')?.getContext('2d');
  if (budgetCtx) {
    destroyChart('visBudget');
    const budgetData = categoryData.filter(c => c.budget > 0 || c.actual > 0);

    const labels = budgetData.map(c => c.category);
    const budgetVals = budgetData.map(c => c.budget);
    const actualVals = budgetData.map(c => c.actual);
    const colors = budgetData.map(c => CategoryColors[c.category]);

    activeCharts['visBudget'] = new Chart(budgetCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Budget',
            data: budgetVals,
            backgroundColor: '#EDE9E6',
            borderRadius: 4,
            barThickness: 10
          },
          {
            label: 'Aktual',
            data: actualVals,
            backgroundColor: colors,
            borderRadius: 4,
            barThickness: 10
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: themeColors.tooltipBg,
            titleColor: themeColors.tooltipText,
            bodyColor: themeColors.tooltipText,
            titleFont: { family: 'Inter', size: 12 },
            bodyFont: { family: 'Inter', size: 12 },
            padding: 8,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${formatRupiah(context.parsed.x)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: themeColors.grid },
            ticks: {
              color: themeColors.text,
              font: { family: 'Inter', size: 10 },
              callback: function(value) { return 'Rp ' + (value / 1000) + 'k'; }
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: themeColors.text, font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }
}

// 6. PENGATURAN VIEW
function viewPengaturan() {
  const budget = loadBudget(getActiveMonthStr());
  const values = {};
  CategoryLabels.forEach(cat => {
    values[cat] = budget.categories[cat] || 0;
  });

  const inputsHtml = CategoryLabels.map(cat => `
    <div class="form-group" style="margin-bottom: 12px;">
      <label class="form-label" style="display: flex; align-items: center; gap: 8px;">
        <span class="category-dot dot-${cat}"></span>
        <span>${cat}</span>
      </label>
      <div class="input-container">
        <span class="input-icon" style="font-size: 13px; font-weight: 500; font-family: monospace;">Rp</span>
        <input type="text" id="budget-input-${cat}" class="form-input has-icon text-right budget-field" value="${values[cat]}" inputmode="numeric">
      </div>
    </div>
  `).join('');

  return `
    <div class="view-header">
      <h2 class="card-title" style="font-size: 20px;">Pengaturan</h2>
      <p class="view-subtitle">Atur budget bulanan dan preferensi aplikasi</p>
    </div>

    <div style="max-width: 520px; display: flex; flex-direction: column; gap: 20px;">
      <!-- Budget Settings -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 20px;">Budget Bulanan (${MONTH_NAMES[currentMonth - 1]} ${currentYear})</h3>
        
        <div>
          ${inputsHtml}

          <div style="padding: 16px 0; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-weight: 600; font-size: 14px;">Total Budget</span>
            <span id="budget-total-label" style="font-weight: 700; font-size: 18px; font-family: monospace;">Rp 0</span>
          </div>

          <button class="btn btn-primary" id="save-budget-btn" style="width: 100%; height: 42px;">
            <i data-lucide="save" style="width: 16px; height: 16px;"></i>
            Simpan Budget
          </button>
        </div>
      </div>

      <!-- Data Reset -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 12px;">Manajemen Data</h3>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px;">
          <div>
            <p style="font-size: 14px; font-weight: 500;">Reset Data</p>
            <p class="view-subtitle" style="font-size: 12px;">Hapus semua data pengeluaran dan mulai dari awal</p>
          </div>
          <button class="btn btn-danger-outline" id="reset-data-btn">
            <i data-lucide="rotate-ccw" style="width: 14px; height: 14px;"></i>
            Reset
          </button>
        </div>
      </div>
    </div>
  `;
}

function postRenderPengaturan() {
  const saveBtn = document.getElementById('save-budget-btn');
  const resetBtn = document.getElementById('reset-data-btn');
  const totalLabel = document.getElementById('budget-total-label');
  const fields = document.querySelectorAll('.budget-field');

  const calcTotal = () => {
    let sum = 0;
    fields.forEach(f => {
      const val = parseInt(f.value.replace(/\D/g, '')) || 0;
      sum += val;
    });
    totalLabel.textContent = formatRupiah(sum);
  };

  // Setup inputs
  fields.forEach(f => {
    f.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
      calcTotal();
    });
  });

  calcTotal();

  // Save budget handler
  saveBtn?.addEventListener('click', () => {
    const budget = loadBudget(getActiveMonthStr());
    fields.forEach(f => {
      const cat = f.id.replace('budget-input-', '');
      const amt = parseInt(f.value.replace(/\D/g, '')) || 0;
      updateBudget(budget.month, cat, amt);
    });

    saveBtn.innerHTML = '<i data-lucide="check" style="width: 16px; height: 16px;"></i> Tersimpan!';
    saveBtn.style.backgroundColor = 'var(--success)';
    lucide.createIcons();

    setTimeout(() => {
      saveBtn.innerHTML = '<i data-lucide="save" style="width: 16px; height: 16px;"></i> Simpan Budget';
      saveBtn.style.backgroundColor = '';
      lucide.createIcons();
    }, 2000);
  });

  // Reset database handler
  resetBtn?.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mereset semua data pengeluaran? Tindakan ini tidak dapat dibatalkan.')) {
      saveExpenses([]);
      localStorage.removeItem(BUDGET_KEY);
      
      // Reload database
      loadExpenses();
      loadBudget(getActiveMonthStr());
      
      // Notify and redirect to dashboard
      setView('dashboard');
    }
  });
}

// --- CORE SHELL ACTIONS & NAVIGATION ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Data check
  loadExpenses();
  loadBudget();

  // 2. Theme management
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Re-render current page to refresh chart styles
    const activeTab = document.querySelector('.nav-item.active')?.getAttribute('data-tab') || 'dashboard';
    setView(activeTab);
  });

  function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      lucide.createIcons();
    }
  }

  // 3. Navigation
  const navItems = document.querySelectorAll('[data-tab]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      setView(tab);
      
      // Close mobile sidebar if open
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('active');
    });
  });

  // 4. Sidebar Toggle Collapsible (Desktop)
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('sidebar-collapse-btn');
  const collapseIcon = document.getElementById('collapse-icon');
  
  let sidebarCollapsed = false;

  collapseBtn?.addEventListener('click', () => {
    sidebarCollapsed = !sidebarCollapsed;
    if (sidebarCollapsed) {
      sidebar.classList.add('collapsed');
      collapseIcon.setAttribute('data-lucide', 'chevron-right');
      collapseBtn.querySelector('.nav-text').textContent = 'Expand';
    } else {
      sidebar.classList.remove('collapsed');
      collapseIcon.setAttribute('data-lucide', 'chevron-left');
      collapseBtn.querySelector('.nav-text').textContent = 'Collapse';
    }
    lucide.createIcons();

    // Trigger window resize event to let charts resize smoothly
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 310);
  });

  // 5. Mobile Sidebar Toggler
  const hamburgerBtn = document.getElementById('hamburger-btn');
  
  hamburgerBtn?.addEventListener('click', () => {
    sidebar.classList.add('mobile-open');
    sidebarOverlay.classList.add('active');
  });

  sidebarOverlay?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
  });

  // 6. Header sticky scrolling class
  window.addEventListener('scroll', () => {
    const header = document.getElementById('top-header');
    if (window.scrollY > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 7. Month dropdown selector change event
  const monthSelector = document.getElementById('month-selector');
  if (monthSelector) {
    monthSelector.value = currentMonth;
    monthSelector.addEventListener('change', (e) => {
      currentMonth = parseInt(e.target.value);
      const activeTab = document.querySelector('.nav-item.active')?.getAttribute('data-tab') || 'dashboard';
      setView(activeTab);
    });
  }

  // 8. Initial Page load
  setView('dashboard');
});

// --- EXCEL (.XLSX) EXPORT FUNCTION ---
function exportToExcel(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = MONTH_NAMES[month - 1];
  const activeMonthStr = `${year}-${String(month).padStart(2, '0')}`;
  const categories = ["Makanan", "Transportasi", "Belanja", "Hiburan", "Tagihan", "Lainnya"];

  // 1. CREATE WORKBOOK
  const wb = XLSX.utils.book_new();

  // 2. SHEET 1: COVER
  const aoa_cover = Array.from({ length: 35 }, () => Array(10).fill(""));
  aoa_cover[1][1] = "DAILY EXPENSE TRACKER"; // B2
  aoa_cover[2][1] = `Pencatatan Pengeluaran Harian - ${monthName} 2026`; // B3
  aoa_cover[4][1] = "Catat setiap pengeluaran harian Anda untuk memantau keuangan dengan lebih detail. Setiap transaksi tercatat dengan tanggal, kategori, dan jumlah."; // B5

  aoa_cover[8][1] = "Fitur Utama:"; // B9
  aoa_cover[9][1] = "✓ Input pengeluaran harian per tanggal"; // B10
  aoa_cover[10][1] = "✓ Kategorisasi otomatis (Makanan, Transportasi, dll)"; // B11
  aoa_cover[11][1] = "✓ Total harian & bulanan otomatis"; // B12
  aoa_cover[12][1] = "✓ Analisis pengeluaran per kategori"; // B13
  aoa_cover[13][1] = "✓ Grafik trend harian dan breakdown kategori"; // B14
  aoa_cover[14][1] = "✓ Highlight akhir pekan untuk perencanaan"; // B15

  aoa_cover[17][1] = "Daftar Sheet:"; // B18
  aoa_cover[17][2] = "Deskripsi"; // C18
  aoa_cover[18][1] = "Cover"; aoa_cover[18][2] = "Halaman utama dan informasi"; // B19, C19
  aoa_cover[19][1] = "Input Harian"; aoa_cover[19][2] = "Input pengeluaran harian per tanggal & kategori"; // B20, C20
  aoa_cover[20][1] = "Rekap Harian"; aoa_cover[20][2] = "Ringkasan total pengeluaran per hari"; // B21, C21
  aoa_cover[21][1] = "Analisis Kategori"; aoa_cover[21][2] = "Breakdown pengeluaran per kategori"; // B22, C22
  aoa_cover[22][1] = "Grafik"; aoa_cover[22][2] = "Visualisasi data pengeluaran"; // B23, C23

  aoa_cover[24][1] = "Tips Penggunaan:"; // B25
  aoa_cover[25][1] = "1. Buka sheet 'Input Harian' dan masukkan setiap pengeluaran"; // B26
  aoa_cover[26][1] = "2. Pilih kategori dari dropdown yang tersedia"; // B27
  aoa_cover[27][1] = "3. Cek 'Rekap Harian' untuk total per hari"; // B28
  aoa_cover[28][1] = "4. Lihat 'Analisis Kategori' untuk breakdown"; // B29
  aoa_cover[29][1] = "5. Pantau grafik untuk trend pengeluaran"; // B30

  const ws_cover = XLSX.utils.aoa_to_sheet(aoa_cover);
  ws_cover['!cols'] = [{ wch: 4 }, { wch: 65 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, ws_cover, "Cover");

  // 3. SHEET 2: INPUT HARIAN
  const aoa_input = [];
  const totalInputRows = 5 + daysInMonth * 5 + 2;
  for (let r = 0; r < totalInputRows; r++) {
    aoa_input.push(Array(8).fill(""));
  }

  aoa_input[1][1] = `INPUT PENGELUARAN HARIAN - ${monthName.toUpperCase()} ${year}`; // B2
  aoa_input[3][1] = "Tanggal"; // B4
  aoa_input[3][2] = "Hari"; // C4
  aoa_input[3][3] = "Kategori"; // D4
  aoa_input[3][4] = "Keterangan"; // E4
  aoa_input[3][5] = "Jumlah (Rp)"; // F4
  aoa_input[3][6] = "Total Harian"; // G4

  const expenses = loadExpenses();
  const monthExpenses = expenses.filter(e => e.date.startsWith(activeMonthStr));

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dateObj = new Date(year, month - 1, d);
    const dayName = DAY_NAMES[dateObj.getDay()];
    
    const dayExpenses = monthExpenses.filter(e => e.date === dateStr);
    const startRow = 5 + (d - 1) * 5; // 1-based Row number in Excel
    
    aoa_input[startRow - 1][1] = d; // Column B (Tanggal)
    aoa_input[startRow - 1][2] = dayName; // Column C (Hari)
    aoa_input[startRow - 1][6] = { f: `SUM(F${startRow}:F${startRow + 4})` }; // Column G (Total Harian)

    for (let i = 0; i < 5; i++) {
      const txRowIndex = startRow - 1 + i;
      if (i < dayExpenses.length) {
        const tx = dayExpenses[i];
        const mappedCat = tx.category === "Tagihan" ? "Tagihan (Listrik/Air/Internet)" : tx.category;
        aoa_input[txRowIndex][3] = mappedCat; // Column D (Kategori)
        aoa_input[txRowIndex][4] = tx.description; // Column E (Keterangan)
        aoa_input[txRowIndex][5] = tx.amount; // Column F (Jumlah)
      }
    }
  }

  // Total Bulanan row
  const totalRowIdx = 4 + daysInMonth * 5;
  aoa_input[totalRowIdx][1] = "TOTAL BULANAN";
  aoa_input[totalRowIdx][5] = { f: `SUM(F5:F${totalRowIdx})` };

  const ws_input = XLSX.utils.aoa_to_sheet(aoa_input);
  ws_input['!cols'] = [
    { wch: 3 },  // A
    { wch: 10 }, // B: Tanggal
    { wch: 10 }, // C: Hari
    { wch: 25 }, // D: Kategori
    { wch: 35 }, // E: Keterangan
    { wch: 15 }, // F: Jumlah
    { wch: 15 }  // G: Total Harian
  ];
  XLSX.utils.book_append_sheet(wb, ws_input, "Input Harian");

  // 4. SHEET 3: REKAP HARIAN
  const aoa_rekap = [];
  const totalRekapRows = 5 + daysInMonth + 3;
  for (let r = 0; r < totalRekapRows; r++) {
    aoa_rekap.push(Array(11).fill(""));
  }

  aoa_rekap[1][1] = `REKAP PENGELUARAN HARIAN - ${monthName} ${year}`; // B2
  aoa_rekap[3][1] = "Tanggal"; // B4
  aoa_rekap[3][2] = "Hari"; // C4
  aoa_rekap[3][3] = "Makanan"; // D4
  aoa_rekap[3][4] = "Transportasi"; // E4
  aoa_rekap[3][5] = "Belanja"; // F4
  aoa_rekap[3][6] = "Hiburan"; // G4
  aoa_rekap[3][7] = "Tagihan"; // H4
  aoa_rekap[3][8] = "Lainnya"; // I4
  aoa_rekap[3][9] = "Total Harian"; // J4

  const inputEndRow = 4 + daysInMonth * 5;

  for (let d = 1; d <= daysInMonth; d++) {
    const dayRowIdx = 4 + d; // Excel Row = 5 + (d - 1)
    const dateObj = new Date(year, month - 1, d);
    const dayName = DAY_NAMES[dateObj.getDay()];

    aoa_rekap[dayRowIdx - 1][1] = d; // Column B (Tanggal)
    aoa_rekap[dayRowIdx - 1][2] = dayName; // Column C (Hari)

    categories.forEach((cat, idx) => {
      const mappedCat = cat === "Tagihan" ? "Tagihan (Listrik/Air/Internet)" : cat;
      const formula = `SUMIFS('Input Harian'!$F$5:$F$${inputEndRow},'Input Harian'!$B$5:$B$${inputEndRow},B${dayRowIdx},'Input Harian'!$D$5:$D$${inputEndRow},"${mappedCat}")`;
      aoa_rekap[dayRowIdx - 1][3 + idx] = { f: formula };
    });

    // Total Row formula: =SUM(D5:I5)
    aoa_rekap[dayRowIdx - 1][9] = { f: `SUM(D${dayRowIdx}:I${dayRowIdx})` };
  }

  // Bottom rows: TOTAL and RATA-RATA/HARI
  const totalRekapRowIdx = 4 + daysInMonth; // 0-based index
  const avgRekapRowIdx = 5 + daysInMonth;

  aoa_rekap[totalRekapRowIdx][1] = "TOTAL"; // Column B
  aoa_rekap[avgRekapRowIdx][1] = "RATA-RATA/HARI"; // Column B

  for (let idx = 0; idx < 7; idx++) {
    const colLetter = String.fromCharCode(68 + idx); // D, E, F, G, H, I, J
    aoa_rekap[totalRekapRowIdx][3 + idx] = { f: `SUM(${colLetter}5:${colLetter}${totalRekapRowIdx})` };
    aoa_rekap[avgRekapRowIdx][3 + idx] = { f: `${colLetter}${totalRekapRowIdx + 1}/${daysInMonth}` };
  }

  const ws_rekap = XLSX.utils.aoa_to_sheet(aoa_rekap);
  ws_rekap['!cols'] = [
    { wch: 3 },  // A
    { wch: 10 }, // B: Tanggal
    { wch: 10 }, // C: Hari
    { wch: 15 }, // D: Makanan
    { wch: 15 }, // E: Transportasi
    { wch: 15 }, // F: Belanja
    { wch: 15 }, // G: Hiburan
    { wch: 15 }, // H: Tagihan
    { wch: 15 }, // I: Lainnya
    { wch: 15 }  // J: Total Harian
  ];
  XLSX.utils.book_append_sheet(wb, ws_rekap, "Rekap Harian");

  // 5. SHEET 4: ANALISIS KATEGORI
  const aoa_analysis = [];
  for (let r = 0; r < 25; r++) {
    aoa_analysis.push(Array(7).fill(""));
  }

  aoa_analysis[1][1] = `ANALISIS PENGELUARAN PER KATEGORI - ${monthName.toUpperCase()} ${year}`; // B2
  aoa_analysis[3][1] = "Kategori"; // B4
  aoa_analysis[3][2] = "Total (Rp)"; // C4
  aoa_analysis[3][3] = "% dari Total"; // D4
  aoa_analysis[3][4] = "Rata-rata/Hari"; // E4
  aoa_analysis[3][5] = "Transaksi"; // F4

  const rekapTotalRow = 5 + daysInMonth; // Excel Row number of the TOTAL row in Rekap Harian sheet

  categories.forEach((cat, idx) => {
    const excelRowIdx = 5 + idx; // Excel row 5 to 10
    const mappedCatName = cat === "Tagihan" ? "Tagihan (Listrik/Air/Internet)" : cat;
    
    const rekapColLetter = String.fromCharCode(68 + idx); // D, E, F, G, H, I
    aoa_analysis[excelRowIdx - 1][1] = mappedCatName; // Column B (Kategori)
    aoa_analysis[excelRowIdx - 1][2] = { f: `'Rekap Harian'!${rekapColLetter}${rekapTotalRow}` }; // Column C (Total)
    aoa_analysis[excelRowIdx - 1][3] = { f: `IF($C$11=0,0,C${excelRowIdx}/$C$11)` }; // Column D (% dari Total)
    aoa_analysis[excelRowIdx - 1][4] = { f: `C${excelRowIdx}/${daysInMonth}` }; // Column E (Rata-rata/Hari)
    aoa_analysis[excelRowIdx - 1][5] = { f: `COUNTIFS('Input Harian'!$D$5:$D$${inputEndRow},"${mappedCatName}",'Input Harian'!$F$5:$F$${inputEndRow},">0")` }; // Column F (Transaksi)
  });

  // TOTAL row for category analysis
  aoa_analysis[10][1] = "TOTAL"; // Column B row 11
  aoa_analysis[10][2] = { f: "SUM(C5:C10)" }; // Column C
  aoa_analysis[10][3] = "100.0%"; // Column D
  aoa_analysis[10][4] = { f: "SUM(E5:E10)" }; // Column E
  aoa_analysis[10][5] = { f: "SUM(F5:F10)" }; // Column F

  // BUDGET vs AKTUAL table
  aoa_analysis[13][1] = "BUDGET vs AKTUAL"; // B14
  aoa_analysis[14][1] = "Kategori"; // B15
  aoa_analysis[14][2] = "Budget (Rp)"; // C15
  aoa_analysis[14][3] = "Aktual (Rp)"; // D15
  aoa_analysis[14][4] = "Selisih (Rp)"; // E15
  aoa_analysis[14][5] = "% Tercapai"; // F15

  const activeBudget = loadBudget(activeMonthStr);

  categories.forEach((cat, idx) => {
    const excelRowIdx = 16 + idx; // Excel row 16 to 21
    const mappedCatName = cat === "Tagihan" ? "Tagihan (Listrik/Air/Internet)" : cat;
    const budgetAmount = activeBudget.categories[cat] || 0;
    
    aoa_analysis[excelRowIdx - 1][1] = mappedCatName; // Column B (Kategori)
    aoa_analysis[excelRowIdx - 1][2] = budgetAmount; // Column C (Budget)
    aoa_analysis[excelRowIdx - 1][3] = { f: `C${5 + idx}` }; // Column D (Aktual, links to C5-C10 above)
    aoa_analysis[excelRowIdx - 1][4] = { f: `C${excelRowIdx}-D${excelRowIdx}` }; // Column E (Selisih)
    aoa_analysis[excelRowIdx - 1][5] = { f: `IF(C${excelRowIdx}=0,0,D${excelRowIdx}/C${excelRowIdx})` }; // Column F (% Tercapai)
  });

  // TOTAL row for BUDGET vs AKTUAL
  aoa_analysis[21][1] = "TOTAL"; // B22
  aoa_analysis[21][2] = { f: "SUM(C16:C21)" }; // Column C
  aoa_analysis[21][3] = { f: "SUM(D16:D21)" }; // Column D
  aoa_analysis[21][4] = { f: "SUM(E16:E21)" }; // Column E
  aoa_analysis[21][5] = { f: "IF(C22=0,0,D22/C22)" }; // Column F

  const ws_analysis = XLSX.utils.aoa_to_sheet(aoa_analysis);
  ws_analysis['!cols'] = [
    { wch: 3 },  // A
    { wch: 25 }, // B: Kategori
    { wch: 15 }, // C: Total/Budget
    { wch: 15 }, // D: %/Aktual
    { wch: 15 }, // E: Rata-rata/Selisih
    { wch: 15 }  // F: Transaksi/% Tercapai
  ];
  XLSX.utils.book_append_sheet(wb, ws_analysis, "Analisis Kategori");

  // 6. SHEET 5: GRAFIK (DATA TABLE FOR CHARTS)
  const aoa_grafik = [];
  for (let r = 0; r < 35; r++) {
    aoa_grafik.push(Array(20).fill(""));
  }

  aoa_grafik[1][1] = `VISUALISASI PENGELUARAN - ${monthName.toUpperCase()} ${year}`; // B2

  // Daily trend data table
  aoa_grafik[3][1] = "Tanggal"; // B4
  aoa_grafik[3][2] = "Total Harian"; // C4
  for (let d = 1; d <= daysInMonth; d++) {
    const dayRowIdx = 4 + d; // Excel Row = 5 + (d - 1)
    aoa_grafik[dayRowIdx - 1][1] = d; // Column B
    aoa_grafik[dayRowIdx - 1][2] = { f: `'Rekap Harian'!J${4 + d}` }; // Column C (links to Rekap Harian Total Harian)
  }

  // Category breakdown table
  aoa_grafik[3][4] = "Kategori"; // E4
  aoa_grafik[3][5] = "Total"; // F4
  categories.forEach((cat, idx) => {
    const excelRowIdx = 5 + idx;
    const mappedCatName = cat === "Tagihan" ? "Tagihan (Listrik/Air/Internet)" : cat;
    aoa_grafik[excelRowIdx - 1][4] = mappedCatName; // Column E
    aoa_grafik[excelRowIdx - 1][5] = { f: `'Analisis Kategori'!C${5 + idx}` }; // Column F (links to Analisis Kategori C5-C10)
  });

  const ws_grafik = XLSX.utils.aoa_to_sheet(aoa_grafik);
  ws_grafik['!cols'] = [
    { wch: 3 },  // A
    { wch: 12 }, // B: Tanggal
    { wch: 15 }, // C: Total Harian
    { wch: 5 },  // D: spacer
    { wch: 25 }, // E: Kategori
    { wch: 15 }  // F: Total
  ];
  XLSX.utils.book_append_sheet(wb, ws_grafik, "Grafik");

  // 7. WRITE FILE & DOWNLOAD
  XLSX.writeFile(wb, `${monthName} Tracker Managemen.xlsx`);
}
