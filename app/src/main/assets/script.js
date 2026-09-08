// ==========================================
// 1. دیتابیس آفلاین خوراکی‌ها (نمونه پایه آفلاین)
// ==========================================
const OFFLINE_FOODS_DB = [
    // نان و غلات
    { name: "نان سنگک", cal: 259, unit: "100 گرم" },
    { name: "نان بربری", cal: 265, unit: "100 گرم" },
    { name: "نان لواش", cal: 285, unit: "100 گرم" },
    { name: "نان تافتون", cal: 270, unit: "100 گرم" },
    { name: "نان تست سفید", cal: 265, unit: "100 گرم" },
    { name: "نان تست جو", cal: 240, unit: "100 گرم" },
    { name: "برنج سفید پخته", cal: 130, unit: "100 گرم" },
    { name: "برنج زعفرانی / باقالی پلو", cal: 165, unit: "100 گرم" },
    { name: "ماکارونی پخته", cal: 155, unit: "100 گرم" },
    { name: "جو پرک", cal: 389, unit: "100 گرم" },
    
    // غذاهای ایرانی
    { name: "چلو کباب کوبیده", cal: 240, unit: "100 گرم" },
    { name: "جوجه کباب (سینه)", cal: 185, unit: "100 گرم" },
    { name: "کباب برگ", cal: 200, unit: "100 گرم" },
    { name: "خورشت قرمه سبزی", cal: 175, unit: "100 گرم" },
    { name: "خورشت قیمه", cal: 185, unit: "100 گرم" },
    { name: "خورشت فسنجان", cal: 260, unit: "100 گرم" },
    { name: "خورشت بادمجان", cal: 190, unit: "100 گرم" },
    { name: "زرشک پلو با مرغ", cal: 195, unit: "100 گرم" },
    { name: "ته‌چین مرغ", cal: 210, unit: "100 گرم" },
    { name: "آبگوشت / دیزی", cal: 220, unit: "100 گرم" },
    { name: "کوفته تبریزی", cal: 160, unit: "100 گرم" },
    { name: "دلمه برگ مو", cal: 145, unit: "100 گرم" },
    { name: "میرزا قاسمی", cal: 130, unit: "100 گرم" },
    { name: "کشک بادمجان", cal: 210, unit: "100 گرم" },
    { name: "عدسی", cal: 110, unit: "100 گرم" },
    { name: "خوراک لوبیا چیتی", cal: 120, unit: "100 گرم" },
    { name: "حلیم گندم با گوشت", cal: 180, unit: "100 گرم" },
    { name: "آش رشته", cal: 140, unit: "100 گرم" },
    { name: "آش دوغ", cal: 95, unit: "100 گرم" },

    // پروتئین و لبنیات
    { name: "سینه مرغ آب‌پز", cal: 165, unit: "100 گرم" },
    { name: "ران مرغ بدون پوست", cal: 190, unit: "100 گرم" },
    { name: "گوشت گوساله کم‌چرب", cal: 200, unit: "100 گرم" },
    { name: "گوشت گوسفندی", cal: 280, unit: "100 گرم" },
    { name: "ماهی قزل‌آلا", cal: 145, unit: "100 گرم" },
    { name: "تن ماهی (کنسرو)", cal: 180, unit: "100 گرم" },
    { name: "تخم مرغ آب‌پز", cal: 155, unit: "100 گرم" },
    { name: "تخم مرغ نیمرو", cal: 210, unit: "100 گرم" },
    { name: "شیر کم‌چرب", cal: 42, unit: "100 گرم" },
    { name: "ماست کم‌چرب", cal: 55, unit: "100 گرم" },
    { name: "پنیر سفید", cal: 210, unit: "100 گرم" },

    // میوه‌ها و صیفی‌جات
    { name: "سیب", cal: 52, unit: "100 گرم" },
    { name: "موز", cal: 89, unit: "100 گرم" },
    { name: "پرتقال", cal: 47, unit: "100 گرم" },
    { name: "هندوانه", cal: 30, unit: "100 گرم" },
    { name: "خیار", cal: 15, unit: "100 گرم" },
    { name: "گوجه فرنگی", cal: 18, unit: "100 گرم" },
    { name: "خرما", cal: 282, unit: "100 گرم" },
    { name: "گردو", cal: 654, unit: "100 گرم" },
    { name: "بادام", cal: 579, unit: "100 گرم" },
    { name: "پسته", cal: 560, unit: "100 گرم" }
];

// ==========================================
// 2. دیتابیس گسترده فعالیت‌های کالری‌سوزی
// ==========================================
const WORKOUTS_DB = [
    // کاردیو و هوازی
    { name: "پیاده‌روی معمولی (4 کیلومتر بر ساعت)", calPerMin: 4 },
    { name: "پیاده‌روی سریع (6 کیلومتر بر ساعت)", calPerMin: 6 },
    { name: "پیاده‌روی روی تردمیل با شیب", calPerMin: 7.5 },
    { name: "دویدن آرام (8 کیلومتر بر ساعت)", calPerMin: 8.5 },
    { name: "دویدن سریع (12 کیلومتر بر ساعت)", calPerMin: 12 },
    { name: "طناب زدن (سرعت متوسط)", calPerMin: 10 },
    { name: "طناب زدن سریع", calPerMin: 13 },
    { name: "دوچرخه‌سواری (سرعت معمولی)", calPerMin: 7 },
    { name: "دوچرخه‌سواری ثابت (شدت متوسط)", calPerMin: 8 },
    { name: "دوچرخه‌سواری ثابت (شدت بالا/اسپینینگ)", calPerMin: 11.5 },
    { name: "پله‌نوردی / دستگاه استپر", calPerMin: 9 },

    // ورزش‌های آبی
    { name: "شنا (کرال سینه)", calPerMin: 9 },
    { name: "شنا (قورباغه)", calPerMin: 8 },
    { name: "شنا (پروانه)", calPerMin: 11 },
    { name: "آیروبیک در آب", calPerMin: 5.5 },

    // ورزش‌های توپی و گروهی
    { name: "فوتبال (مسابقه)", calPerMin: 10 },
    { name: "فوتسال", calPerMin: 9 },
    { name: "بسکتبال", calPerMin: 8.5 },
    { name: "والیبال سالنی", calPerMin: 4.5 },
    { name: "والیبال ساحلی", calPerMin: 8 },
    { name: "تنس روی میز (پینگ پنگ)", calPerMin: 4 },
    { name: "تنیس خاکی", calPerMin: 7.5 },
    { name: "بدمینتون", calPerMin: 5.5 },
    { name: "پادلبورد / قایقرانی", calPerMin: 6 },

    // بدنسازی و تمرینات قدرتی
    { name: "بدنسازی با وزنه (سبک/متوسط)", calPerMin: 5 },
    { name: "بدنسازی سنگین (پاورلیفتینگ/پرورشی)", calPerMin: 7.5 },
    { name: "تمرینات وزن بدن (شنا، بارفیکس، اسکات)", calPerMin: 6.5 },
    { name: "کراس‌فیت (CrossFit)", calPerMin: 12 },
    { name: "تمرینات تاباتا / HIIT", calPerMin: 11 },
    { name: "تمرین با کتلبل (Kettlebell)", calPerMin: 10 },

    // رزمی و آمادگی جسمانی
    { name: "بوکس (مبارزه/کیسه زدن)", calPerMin: 10.5 },
    { name: "هنرهای رزمی (کاراته/تکواندو/جودو)", calPerMin: 9 },
    { name: "کیک بوکسینگ", calPerMin: 10 },
    { name: "یوگا (قدرتی/وینیاسا)", calPerMin: 4.5 },
    { name: "یوگا (آرامش‌بخش)", calPerMin: 2.5 },
    { name: "پیلاتس", calPerMin: 5 },
    { name: "رقص آیروبیک / زومبا", calPerMin: 7.5 },

    // فعالیت‌های روزمره و کارهای خانه
    { name: "تمیز کردن خانه / جاروبرقی کشیدن", calPerMin: 3.5 },
    { name: "تی کشیدن / گردگیری سنگین", calPerMin: 4 },
    { name: "شستن ماشین با دست", calPerMin: 4.5 },
    { name: "باغبانی / بیل زدن", calPerMin: 5 },
    { name: "جابجایی اثاثیه و وسایل سنگین", calPerMin: 7.5 },
    { name: "بالا رفتن از پله‌ها (پیاده)", calPerMin: 8 }
];

// ==========================================
// 3. متغیرها و وضعیت برنامه
// ==========================================
let allFoods = [...OFFLINE_FOODS_DB];
let allWorkouts = [...WORKOUTS_DB];
let selectedItem = null;
let weightChartInstance = null;
let currentChartFilter = 'weekly';

let userData = {
    gender: 'male',
    age: 25,
    height: 175,
    weight: 70,
    activity: 1.2,
    bmr: 2000,
    consumed: 0,
    burned: 0,
    water: 0,
    weightsHistory: []
};

// ==========================================
// 4. راه‌اندازی و مدیریت برنامه
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    renderFoodList(allFoods);
    renderWorkoutList(allWorkouts);
    updateDashboard();
});

// --- جستجوی غذا (ترکیب آنلاین و آفلاین) ---
async function handleFoodSearch() {
    const query = document.getElementById('food-search').value.trim();
    if (!query) return renderFoodList(allFoods);

    // ابتدا در لیست آفلاین جستجو می‌شود
    const localResults = allFoods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
    renderFoodList(localResults);

    // در صورت وجود اینترنت، به صورت آنلاین از API نیز استعلام گرفته می‌شود
    if (navigator.onLine && query.length >= 3) {
        try {
            const apiResults = await fetchOnlineFoodData(query);
            if (apiResults && apiResults.length > 0) {
                // ادغام نتایج آنلاین بدون تکراری
                const combined = [...localResults, ...apiResults];
                renderFoodList(combined);
            }
        } catch (err) {
            console.log("خطا در دریافت اطلاعات آنلاین خوراکی‌ها:", err);
        }
    }
}

// تابع فرضی جهت فراخوانی API غذاهای آنلاین (مانند OpenFoodFacts یا FatSecret)
async function fetchOnlineFoodData(query) {
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10`);
    const data = await response.json();
    if (!data.products) return [];

    return data.products.map(p => ({
        name: p.product_name_fa || p.product_name || "خوراکی آنلاین",
        cal: Math.round(p.nutriments?.["energy-kcal_100g"] || 100),
        unit: "100 گرم (آنلاین)"
    })).filter(item => item.name && item.cal > 0);
}

// --- رندر لیست غذاها ---
function renderFoodList(list) {
    const container = document.getElementById('food-list');
    if (!container) return;
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<div style="color:var(--text-sub); text-align:center; padding:20px;">هیچ غذایی یافت نشد.</div>';
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.onclick = () => openItemModal(item, 'food');
        div.innerHTML = `
            <div class="item-info">
                <div class="name">${item.name}</div>
                <div class="details">${item.unit || '100 گرم'}</div>
            </div>
            <div class="item-value">${item.cal} کالری</div>
        `;
        container.appendChild(div);
    });
}

// --- رندر و جستجوی فعالیت‌های کالری‌سوزی ---
function renderWorkoutList(list) {
    const container = document.getElementById('workout-list');
    if (!container) return;
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<div style="color:var(--text-sub); text-align:center; padding:20px;">هیچ فعالیتی یافت نشد.</div>';
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.onclick = () => openItemModal(item, 'workout');
        div.innerHTML = `
            <div class="item-info">
                <div class="name">${item.name}</div>
                <div class="details">هر دقیقه</div>
            </div>
            <div class="item-value burn">${item.calPerMin} کالری</div>
        `;
        container.appendChild(div);
    });
}

function handleWorkoutSearch() {
    const query = document.getElementById('workout-search').value.trim().toLowerCase();
    if (!query) return renderWorkoutList(allWorkouts);
    renderWorkoutList(allWorkouts.filter(w => w.name.toLowerCase().includes(query)));
}

// --- مدیریت تب‌ها و بخش آمار ---
function switchTab(tabName, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) targetTab.classList.add('active');
    if (el) el.classList.add('active');

    if (tabName === 'stats') {
        renderCalorieStatsSummary();
        calculateAndRenderBMI();
        renderWeightChart();
        renderWeightHistory();
    }
}

function renderCalorieStatsSummary() {
    const tabStats = document.getElementById("tab-stats");
    if (!tabStats) return;

    let calSummaryCard = document.getElementById("cal-summary-card");
    if (!calSummaryCard) {
        calSummaryCard = document.createElement("div");
        calSummaryCard.id = "cal-summary-card";
        calSummaryCard.className = "card";
        tabStats.insertBefore(calSummaryCard, tabStats.firstChild);
    }

    const netCalories = userData.consumed - userData.burned;

    calSummaryCard.innerHTML = `
        <div class="card-title">خلاصه آمار کالری امروز</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 12px;">
            <div style="background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 8px; text-align: center; border: 1px solid rgba(16, 185, 129, 0.2);">
                <div style="font-size: 0.75rem; color: var(--text-sub);">کالری دریافتی (غذا)</div>
                <div style="font-size: 1.3rem; font-weight: bold; color: var(--accent); margin-top: 4px;">${userData.consumed}</div>
            </div>
            <div style="background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 8px; text-align: center; border: 1px solid rgba(239, 68, 68, 0.2);">
                <div style="font-size: 0.75rem; color: var(--text-sub);">کالری‌سوزی (ورزش)</div>
                <div style="font-size: 1.3rem; font-weight: bold; color: var(--accent-burn); margin-top: 4px;">${userData.burned}</div>
            </div>
        </div>
        <div style="text-align: center; font-size: 0.85rem; color: var(--text-sub); background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px;">
            خالص کالری دریافتی امروز: <strong style="color: var(--text-main);">${netCalories} کالری</strong>
        </div>
    `;
}

// --- توابع عمومی و سیستم ثبت داده ---
function openItemModal(item, type) {
    selectedItem = { ...item, type };
    document.getElementById('modal-item-title').innerText = item.name;
    const label = document.getElementById('modal-item-unit-label');
    const input = document.getElementById('modal-item-amount');
    
    if (type === 'food') {
        label.innerText = "مقدار مصرفی (گرم):";
        input.value = 100;
    } else {
        label.innerText = "مدت زمان (دقیقه):";
        input.value = 30;
    }
    openModal('modal-item');
}

function confirmAddItem() {
    const amount = parseFloat(document.getElementById('modal-item-amount').value) || 0;
    if (amount <= 0) return;

    if (selectedItem.type === 'food') {
        userData.consumed += Math.round((selectedItem.cal / 100) * amount);
    } else if (selectedItem.type === 'workout') {
        userData.burned += Math.round(selectedItem.calPerMin * amount);
    }

    saveUserData();
    closeModal('modal-item');
}

function updateDashboard() {
    document.getElementById('consumed-cal').innerText = userData.consumed;
    document.getElementById('burned-cal').innerText = userData.burned;
    document.getElementById('remaining-cal').innerText = userData.bmr - userData.consumed + userData.burned;
    document.getElementById('water-count').innerText = `${userData.water} از 8 لیوان 💧`;
}

function calculateBMR() {
    let bmr = 0;
    if (userData.gender === 'male') {
        bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
    } else {
        bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
    }
    userData.bmr = Math.round(bmr * parseFloat(userData.activity));
}

function loadUserData() {
    const saved = localStorage.getItem('user_health_data');
    if (saved) {
        userData = JSON.parse(saved);
    }
    updateDashboard();
}

function saveUserData() {
    calculateBMR();
    localStorage.setItem('user_health_data', JSON.stringify(userData));
    updateDashboard();
}

function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.style.display = 'flex';
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.style.display = 'none';
}
