// متغيرها و حالت برنامه
let foodDatabase = [];
let activeCategory = 'همه';

// تاریخ امروز به فرمت YYYY-MM-DD
const getTodayDate = () => new Date().toISOString().split('T')[0];

// ساختار داده اولیه در حافظه گوشی
let userData = JSON.parse(localStorage.getItem('cal_userData')) || {
  gender: 'female',
  age: 25,
  height: 165,
  weight: 65,
  activity: 1.375,
  goal: -500,
  targetCalories: 1800
};

let logs = JSON.parse(localStorage.getItem('cal_logs')) || {};

// شروع برنامه
document.addEventListener('DOMContentLoaded', () => {
  loadProfileInputs();
  calculateTargetCalories();
  loadFoodDatabase();
  renderTodayLogs();
  updateSummaryUI();
  initChart();

  // افزودن رویداد جستجو
  document.getElementById('food-search').addEventListener('input', (e) => {
    filterFoods(e.target.value);
  });
});

// تغییر زبانه (Tab)
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById(`tab-${tabId}`).classList.add('active');
  btn.classList.add('active');

  if(tabId === 'stats') {
    updateChart();
  }
}

// بارگذاری پروفایل کاربر در فرم
function loadProfileInputs() {
  document.getElementById('user-gender').value = userData.gender;
  document.getElementById('user-age').value = userData.age;
  document.getElementById('user-height').value = userData.height;
  document.getElementById('user-weight').value = userData.weight;
  document.getElementById('user-activity').value = userData.activity;
  document.getElementById('user-goal').value = userData.goal;
}

// ذخیره پروفایل و محاسبه دقیق BMR و TDEE (فرمول Mifflin-St Jeor)
function saveProfile() {
  userData.gender = document.getElementById('user-gender').value;
  userData.age = parseFloat(document.getElementById('user-age').value) || 25;
  userData.height = parseFloat(document.getElementById('user-height').value) || 170;
  userData.weight = parseFloat(document.getElementById('user-weight').value) || 70;
  userData.activity = parseFloat(document.getElementById('user-activity').value) || 1.2;
  userData.goal = parseFloat(document.getElementById('user-goal').value) || 0;

  calculateTargetCalories();
  localStorage.setItem('cal_userData', JSON.stringify(userData));
  alert('اطلاعات شما با موفقیت به روز شد.');
  updateSummaryUI();
}

function calculateTargetCalories() {
  let bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age);
  if (userData.gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  let tdee = bmr * userData.activity;
  userData.targetCalories = Math.round(tdee + userData.goal);
}

// بارگذاری پایگاه داده غذاها
async function loadFoodDatabase() {
  try {
    const res = await fetch('foods.json');
    foodDatabase = await res.json();
    renderCategories();
    renderFoodList();
  } catch (err) {
    console.error('خطا در بارگذاری غذاها:', err);
  }
}

// رندر دکمه‌های دسته‌بندی
function renderCategories() {
  const container = document.getElementById('category-container');
  container.innerHTML = `<button class="category-btn active" onclick="setCategory('همه', this)">همه</button>`;
  
  foodDatabase.forEach(cat => {
    container.innerHTML += `<button class="category-btn" onclick="setCategory('${cat.category}', this)">${cat.category}</button>`;
  });
}

function setCategory(catName, btn) {
  document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCategory = catName;
  renderFoodList();
}

// نمایش لیست غذاها
function renderFoodList(filteredItems = null) {
  const listEl = document.getElementById('food-list');
  listEl.innerHTML = '';

  let itemsToRender = [];

  if (filteredItems) {
    itemsToRender = filteredItems;
  } else {
    foodDatabase.forEach(cat => {
      if (activeCategory === 'همه' || activeCategory === cat.category) {
        cat.items.forEach(item => itemsToRender.push(item));
      }
    });
  }

  itemsToRender.forEach(item => {
    listEl.innerHTML += `
      <li class="food-item">
        <div class="food-info">
          <h4>${item.name}</h4>
          <p>${item.unit} | ${item.calories} کالری</p>
        </div>
        <button class="add-btn" onclick="addFoodLog('${item.name}', ${item.calories})">+ ثبت</button>
      </li>
    `;
  });
}

// جستجوی غذاها
function filterFoods(query) {
  if (!query.trim()) {
    renderFoodList();
    return;
  }
  let results = [];
  foodDatabase.forEach(cat => {
    cat.items.forEach(item => {
      if (item.name.includes(query)) {
        results.push(item);
      }
    });
  });
  renderFoodList(results);
}

// ثبت غذا و ورزش در روز جاری
function addFoodLog(name, calories) {
  const today = getTodayDate();
  if (!logs[today]) logs[today] = { foods: [], exercises: [] };

  logs[today].foods.push({ name, calories });
  saveLogs();
  renderTodayLogs();
  updateSummaryUI();
}

function addExerciseLog() {
  const select = document.getElementById('exercise-type');
  const name = select.options[select.selectedIndex].text;
  const met = parseFloat(select.value);
  const duration = parseFloat(document.getElementById('exercise-duration').value);

  if (!duration || duration <= 0) {
    alert('لطفا زمان ورزش را وارد کنید.');
    return;
  }

  // محاسبه کالری سوخته شده بر اساس وزن
  const burned = Math.round((met * 3.5 * userData.weight / 200) * duration);

  const today = getTodayDate();
  if (!logs[today]) logs[today] = { foods: [], exercises: [] };

  logs[today].exercises.push({ name, calories: burned, duration });
  saveLogs();
  renderTodayLogs();
  updateSummaryUI();
  document.getElementById('exercise-duration').value = '';
  alert(`${burned} کالری سوخته‌شده ثبت شد.`);
}

function deleteLog(type, index) {
  const today = getTodayDate();
  if (logs[today] && logs[today][type]) {
    logs[today][type].splice(index, 1);
    saveLogs();
    renderTodayLogs();
    updateSummaryUI();
  }
}

function saveLogs() {
  localStorage.setItem('cal_logs', JSON.stringify(logs));
}

// به‌روزرسانی خلاصه کالری در داشبورد
function updateSummaryUI() {
  const today = getTodayDate();
  const todayLog = logs[today] || { foods: [], exercises: [] };

  const consumed = todayLog.foods.reduce((sum, item) => sum + item.calories, 0);
  const burned = todayLog.exercises.reduce((sum, item) => sum + item.calories, 0);
  const remaining = userData.targetCalories - consumed + burned;

  document.getElementById('target-cal').textContent = userData.targetCalories;
  document.getElementById('consumed-cal').textContent = consumed;
  document.getElementById('burned-cal').textContent = burned;
  document.getElementById('remaining-cal').textContent = remaining;
}

// نمایش لیست ثبت‌شده‌های امروز
function renderTodayLogs() {
  const today = getTodayDate();
  const todayLog = logs[today] || { foods: [], exercises: [] };
  const listEl = document.getElementById('today-logs');
  listEl.innerHTML = '';

  if (todayLog.foods.length === 0 && todayLog.exercises.length === 0) {
    listEl.innerHTML = '<p style="font-size: 0.85rem; color: #888; text-align: center;">هنوز چیزی برای امروز ثبت نشده است.</p>';
    return;
  }

  todayLog.foods.forEach((item, index) => {
    listEl.innerHTML += `
      <li class="log-item">
        <div class="food-info">
          <h4>${item.name}</h4>
          <p>غذا / خوراکی</p>
        </div>
        <div>
          <span style="font-weight: bold; font-size: 0.9rem; margin-left: 8px;">+${item.calories}</span>
          <button class="delete-btn" onclick="deleteLog('foods', ${index})">✕</button>
        </div>
      </li>
    `;
  });

  todayLog.exercises.forEach((item, index) => {
    listEl.innerHTML += `
      <li class="log-item">
        <div class="food-info">
          <h4>${item.name} (${item.duration} دقیقه)</h4>
          <p>فعالیت ورزشی</p>
        </div>
        <div>
          <span style="font-weight: bold; font-size: 0.9rem; color: var(--danger); margin-left: 8px;">-${item.calories}</span>
          <button class="delete-btn" onclick="deleteLog('exercises', ${index})">✕</button>
        </div>
      </li>
    `;
  });
}

// نمودار آمار ۷ روز گذشته (Chart.js)
let chartInstance = null;

function initChart() {
  const ctx = document.getElementById('weeklyChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'کالری دریافتی',
        data: [],
        backgroundColor: '#2e7d32'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
  updateChart();
}

function updateChart() {
  if (!chartInstance) return;

  const labels = [];
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    labels.push(dateStr.slice(5)); // فقط ماه و روز
    const dayLog = logs[dateStr] || { foods: [] };
    const totalCal = dayLog.foods.reduce((sum, item) => sum + item.calories, 0);
    data.push(totalCal);
  }

  chartInstance.data.labels = labels;
  chartInstance.data.datasets[0].data = data;
  chartInstance.update();
}
