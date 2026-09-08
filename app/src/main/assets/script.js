// ==========================================
// ۱. دیتابیس آفلاین خوراکی‌ها (جامع و کامل)
// ==========================================
const OFFLINE_FOODS_DB = [
    // نان و غلات
    { id: "f1", name: "نان سنگک", cal: 259, unit: "100 گرم" },
    { id: "f2", name: "نان بربری", cal: 265, unit: "100 گرم" },
    { id: "f3", name: "نان لواش", cal: 285, unit: "100 گرم" },
    { id: "f4", name: "نان تافتون", cal: 270, unit: "100 گرم" },
    { id: "f5", name: "نان تست سفید", cal: 265, unit: "100 گرم" },
    { id: "f6", name: "نان تست جو", cal: 240, unit: "100 گرم" },
    { id: "f7", name: "برنج سفید پخته", cal: 130, unit: "100 گرم" },
    { id: "f8", name: "برنج زعفرانی / باقالی پلو", cal: 165, unit: "100 گرم" },
    { id: "f9", name: "ماکارونی پخته", cal: 155, unit: "100 گرم" },
    { id: "f10", name: "جو پرک", cal: 389, unit: "100 گرم" },
    
    // غذاهای ایرانی
    { id: "f11", name: "چلو کباب کوبیده", cal: 240, unit: "100 گرم" },
    { id: "f12", name: "جوجه کباب (سینه)", cal: 185, unit: "100 گرم" },
    { id: "f13", name: "کباب برگ", cal: 200, unit: "100 گرم" },
    { id: "f14", name: "خورشت قرمه سبزی", cal: 175, unit: "100 گرم" },
    { id: "f15", name: "خورشت قیمه", cal: 185, unit: "100 گرم" },
    { id: "f16", name: "خورشت فسنجان", cal: 260, unit: "100 گرم" },
    { id: "f17", name: "خورشت بادمجان", cal: 190, unit: "100 گرم" },
    { id: "f18", name: "زرشک پلو با مرغ", cal: 195, unit: "100 گرم" },
    { id: "f19", name: "ته‌چین مرغ", cal: 210, unit: "100 گرم" },
    { id: "f20", name: "آبگوشت / دیزی", cal: 220, unit: "100 گرم" },
    { id: "f21", name: "کوفته تبریزی", cal: 160, unit: "100 گرم" },
    { id: "f22", name: "دلمه برگ مو", cal: 145, unit: "100 گرم" },
    { id: "f23", name: "میرزا قاسمی", cal: 130, unit: "100 گرم" },
    { id: "f24", name: "کشک بادمجان", cal: 210, unit: "100 گرم" },
    { id: "f25", name: "عدسی", cal: 110, unit: "100 گرم" },
    { id: "f26", name: "خوراک لوبیا چیتی", cal: 120, unit: "100 گرم" },
    { id: "f27", name: "حلیم گندم با گوشت", cal: 180, unit: "100 گرم" },
    { id: "f28", name: "آش رشته", cal: 140, unit: "100 گرم" },
    { id: "f29", name: "آش دوغ", cal: 95, unit: "100 گرم" },

    // پروتئین و لبنیات
    { id: "f30", name: "سینه مرغ آب‌پز", cal: 165, unit: "100 گرم" },
    { id: "f31", name: "ران مرغ بدون پوست", cal: 190, unit: "100 گرم" },
    { id: "f32", name: "گوشت گوساله کم‌چرب", cal: 200, unit: "100 گرم" },
    { id: "f33", name: "گوشت گوسفندی", cal: 280, unit: "100 گرم" },
    { id: "f34", name: "ماهی قزل‌آلا", cal: 145, unit: "100 گرم" },
    { id: "f35", name: "تن ماهی (کنسرو)", cal: 180, unit: "100 گرم" },
    { id: "f36", name: "تخم مرغ آب‌پز", cal: 155, unit: "100 گرم" },
    { id: "f37", name: "تخم مرغ نیمرو", cal: 210, unit: "100 گرم" },
    { id: "f38", name: "شیر کم‌چرب", cal: 42, unit: "100 گرم" },
    { id: "f39", name: "ماست کم‌چرب", cal: 55, unit: "100 گرم" },
    { id: "f40", name: "پنیر سفید", cal: 210, unit: "100 گرم" },

    // میوه‌ها و صیفی‌جات
    { id: "f41", name: "سیب", cal: 52, unit: "100 گرم" },
    { id: "f42", name: "موز", cal: 89, unit: "100 گرم" },
    { id: "f43", name: "پرتقال", cal: 47, unit: "100 گرم" },
    { id: "f44", name: "هندوانه", cal: 30, unit: "100 گرم" },
    { id: "f45", name: "خیار", cal: 15, unit: "100 گرم" },
    { id: "f46", name: "گوجه فرنگی", cal: 18, unit: "100 گرم" },
    { id: "f47", name: "خرما", cal: 282, unit: "100 گرم" },
    { id: "f48", name: "گردو", cal: 654, unit: "100 گرم" },
    { id: "f49", name: "بادام", cal: 579, unit: "100 گرم" },
    { id: "f50", name: "پسته", cal: 560, unit: "100 گرم" }
];

// ==========================================
// ۲. دیتابیس گسترده فعالیت‌های کالری‌سوزی
// ==========================================
const WORKOUTS_DB = [
    // کاردیو و هوازی
    { id: "w1", name: "پیاده‌روی معمولی (4 کیلومتر بر ساعت)", calPerMin: 4 },
    { id: "w2", name: "پیاده‌روی سریع (6 کیلومتر بر ساعت)", calPerMin: 6 },
    { id: "w3", name: "پیاده‌روی روی تردمیل با شیب", calPerMin: 7.5 },
    { id: "w4", name: "دویدن آرام (8 کیلومتر بر ساعت)", calPerMin: 8.5 },
    { id: "w5", name: "دویدن سریع (12 کیلومتر بر ساعت)", calPerMin: 12 },
    { id: "w6", name: "طناب زدن (سرعت متوسط)", calPerMin: 10 },
    { id: "w7", name: "طناب زدن سریع", calPerMin: 13 },
    { id: "w8", name: "دوچرخه‌سواری (سرعت معمولی)", calPerMin: 7 },
    { id: "w9", name: "دوچرخه‌سواری ثابت (شدت متوسط)", calPerMin: 8 },
    { id: "w10", name: "دوچرخه‌سواری ثابت (شدت بالا/اسپینینگ)", calPerMin: 11.5 },
    { id: "w11", name: "پله‌نوردی / دستگاه استپر", calPerMin: 9 },

    // ورزش‌های آبی
    { id: "w12", name: "شنا (کرال سینه)", calPerMin: 9 },
    { id: "w13", name: "شنا (قورباغه)", calPerMin: 8 },
    { id: "w14", name: "شنا (پروانه)", calPerMin: 11 },
    { id: "w15", name: "آیروبیک در آب", calPerMin: 5.5 },

    // ورزش‌های توپی و گروهی
    { id: "w16", name: "فوتبال (مسابقه)", calPerMin: 10 },
    { id: "w17", name: "فوتسال", calPerMin: 9 },
    { id: "w18", name: "بسکتبال", calPerMin: 8.5 },
    { id: "w19", name: "والیبال سالنی", calPerMin: 4.5 },
    { id: "w20", name: "والیبال ساحلی", calPerMin: 8 },
    { id: "w21", name: "تنس روی میز (پینگ پنگ)", calPerMin: 4 },
    { id: "w22", name: "تنیس خاکی", calPerMin: 7.5 },
    { id: "w23", name: "بدمینتون", calPerMin: 5.5 },
    { id: "w24", name: "پادلبورد / قایقرانی", calPerMin: 6 },

    // بدنسازی و تمرینات قدرتی
    { id: "w25", name: "بدنسازی با وزنه (سبک/متوسط)", calPerMin: 5 },
    { id: "w26", name: "بدنسازی سنگین (پاورلیفتینگ/پرورشی)", calPerMin: 7.5 },
    { id: "w27", name: "تمرینات وزن بدن (شنا، بارفیکس، اسکات)", calPerMin: 6.5 },
    { id: "w28", name: "کراس‌فیت (CrossFit)", calPerMin: 12 },
    { id: "w29", name: "تمرینات تاباتا / HIIT", calPerMin: 11 },
    { id: "w30", name: "تمرین با کتلبل (Kettlebell)", calPerMin: 10 },

    // رزمی و آمادگی جسمانی
    { id: "w31", name: "بوکس (مبارزه/کیسه زدن)", calPerMin: 10.5 },
    { id: "w32", name: "هنرهای رزمی (کاراته/تکواندو/جودو)", calPerMin: 9 },
    { id: "w33", name: "کیک بوکسینگ", calPerMin: 10 },
    { id: "w34", name: "یوگا (قدرتی/وینیاسا)", calPerMin: 4.5 },
    { id: "w35", name: "یوگا (آرامش‌بخش)", calPerMin: 2.5 },
    { id: "w36", name: "پیلاتس", calPerMin: 5 },
    { id: "w37", name: "رقص آیروبیک / زومبا", calPerMin: 7.5 },

    // فعالیت‌های روزمره و کارهای خانه
    { id: "w38", name: "تمیز کردن خانه / جاروبرقی کشیدن", calPerMin: 3.5 },
    { id: "w39", name: "تی کشیدن / گردگیری سنگین", calPerMin: 4 },
    { id: "w40", name: "شستن ماشین با دست", calPerMin: 4.5 },
    { id: "w41", name: "باغبانی / بیل زدن", calPerMin: 5 },
    { id: "w42", name: "جابجایی اثاثیه و وسایل سنگین", calPerMin: 7.5 },
    { id: "w43", name: "بالا رفتن از پله‌ها (پیاده)", calPerMin: 8 }
];

// ==========================================
// ۳. متغیرها و وضعیت برنامه
// ==========================================
let allFoods = [...OFFLINE_FOODS_DB];
let allWorkouts = [...WORKOUTS_DB];
let selectedItem = null;
let weightChartInstance = null;
let searchDebounceTimeout = null;
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
    lastDate: new Date().toLocaleDateString('fa-IR'),
    weightsHistory: []
};

// ==========================================
// ۴. راه‌اندازی و مدیریت برنامه
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    checkDailyReset();
    renderFoodList(allFoods);
    renderWorkoutList(allWorkouts);
    updateDashboard();
    syncSettingsInputs();
});

function checkDailyReset() {
    const today = new Date().toLocaleDateString('fa-IR');
    if (userData.lastDate !== today) {
        userData.consumed = 0;
        userData.burned = 0;
        userData.water = 0;
        userData.lastDate = today;
        saveUserData();
    }
}

// --- جستجوی هوشمند غذا (آنلاین + آفلاین با کنترل Debounce) ---
function handleFoodSearch() {
    const query = document.getElementById('food-search').value.trim();
    if (!query) {
        renderFoodList(allFoods);
        return;
    }

    // ۱. نتایج محلی (آفلاین)
    const localResults = allFoods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
    renderFoodList(localResults);

    // ۲. نتایج آنلاین (با تایمر نیم ثانیه‌ای)
    clearTimeout(searchDebounceTimeout);
    if (navigator.onLine && query.length >= 3) {
        searchDebounceTimeout = setTimeout(async () => {
            try {
                const apiResults = await fetchOnlineFoodData(query);
                if (apiResults && apiResults.length > 0) {
                    const combined = [...localResults];
                    apiResults.forEach(item => {
                        if (!combined.some(c => c.name.toLowerCase() === item.name.toLowerCase())) {
                            combined.push(item);
                        }
                    });
                    renderFoodList(combined);
                }
            } catch (err) {
                console.log("خطا در اتصال آنلاین:", err);
            }
        }, 500);
    }
}

async function fetchOnlineFoodData(query) {
    try {
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8`);
        const data = await response.json();
        if (!data.products) return [];

        return data.products
            .filter(p => p.product_name && p.nutriments && p.nutriments['energy-kcal_100g'])
            .map((p, idx) => ({
                id: `online_${Date.now()}_${idx}`,
                name: p.product_name_fa || p.product_name,
                cal: Math.round(p.nutriments['energy-kcal_100g']),
                unit: "100 گرم (آنلاین)"
            }));
    } catch (err) {
        return [];
    }
}

function handleWorkoutSearch() {
    const query = document.getElementById('workout-search').value.trim().toLowerCase();
    if (!query) return renderWorkoutList(allWorkouts);
    renderWorkoutList(allWorkouts.filter(w => w.name.toLowerCase().includes(query)));
}

// ==========================================
// ۵. رندر عناصر UI
// ==========================================
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
            <div class="item-value">+ ${item.cal} کالری</div>
        `;
        container.appendChild(div);
    });
}

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
                <div class="details">در هر دقیقه</div>
            </div>
            <div class="item-value burn">- ${item.calPerMin} کالری</div>
        `;
        container.appendChild(div);
    });
}

// ==========================================
// ۶. مدیریت ناوبری و تب‌ها
// ==========================================
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

function calculateAndRenderBMI() {
    const bmiContainer = document.getElementById("bmi-container");
    if (!bmiContainer) return;

    const heightM = userData.height / 100;
    const bmi = (userData.weight / (heightM * heightM)).toFixed(1);

    let status = "", color = "";
    if (bmi < 18.5) { status = "کمبود وزن"; color = "#3b82f6"; }
    else if (bmi < 25) { status = "وزن نرمال (ایده‌آل)"; color = "#10b981"; }
    else if (bmi < 30) { status = "اضافه وزن"; color = "#f59e0b"; }
    else { status = "چاقی"; color = "#ef4444"; }

    bmiContainer.innerHTML = `
        <div class="card" style="text-align: center;">
            <div class="card-title">شاخص توده بدنی (BMI)</div>
            <div style="font-size: 2.2rem; font-weight: bold; color: ${color};">${bmi}</div>
            <div style="font-size: 0.9rem; color: ${color}; margin-top: 4px; font-weight: bold;">${status}</div>
        </div>
    `;
}

// ==========================================
// ۷. ثبت وزن و رسم نمودار
// ==========================================
function submitNewWeight() {
    const input = document.getElementById("new-weight-input");
    const newW = parseFloat(input.value);

    if (newW && newW > 0) {
        userData.weight = newW;
        if (!userData.weightsHistory) userData.weightsHistory = [];
        
        userData.weightsHistory.push({
            id: Date.now(),
            weight: newW,
            date: new Date().toLocaleDateString('fa-IR')
        });

        saveUserData();
        input.value = "";
        
        calculateAndRenderBMI();
        renderWeightChart();
        renderWeightHistory();
        updateDashboard();
        syncSettingsInputs();
    }
}

function removeWeightRecord(id) {
    userData.weightsHistory = userData.weightsHistory.filter(item => item.id !== id);
    if (userData.weightsHistory.length > 0) {
        userData.weight = userData.weightsHistory[userData.weightsHistory.length - 1].weight;
    }
    saveUserData();
    calculateAndRenderBMI();
    renderWeightChart();
    renderWeightHistory();
    updateDashboard();
}

function renderWeightHistory() {
    const container = document.getElementById("weight-history-list");
    if (!container) return;
    container.innerHTML = "";

    if (!userData.weightsHistory || userData.weightsHistory.length === 0) {
        container.innerHTML = '<div style="color:var(--text-sub); text-align:center; padding:10px;">تاریخچه وزنی وجود ندارد.</div>';
        return;
    }

    [...userData.weightsHistory].reverse().forEach(w => {
        container.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 0.85rem;">
                <span>${w.date}</span>
                <div>
                    <span style="font-weight: bold; color: var(--accent); margin-left: 10px;">${w.weight} kg</span>
                    <button onclick="removeWeightRecord(${w.id})" style="background:none; border:none; color:var(--accent-burn); cursor:pointer;">✕</button>
                </div>
            </div>
        `;
    });
}

function setChartFilter(filter) {
    currentChartFilter = filter;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`btn-filter-${filter}`);
    if (activeBtn) activeBtn.classList.add("active");
    renderWeightChart();
}

function renderWeightChart() {
    const canvas = document.getElementById('weightChart');
    if (!canvas || !window.Chart) return;
    const ctx = canvas.getContext('2d');

    if (weightChartInstance) {
        weightChartInstance.destroy();
    }

    let history = userData.weightsHistory || [];
    if (currentChartFilter === 'weekly') history = history.slice(-7);
    else if (currentChartFilter === 'monthly') history = history.slice(-30);

    const labels = history.map(w => w.date);
    const dataPoints = history.map(w => w.weight);

    weightChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'وزن (کیلوگرم)',
                data: dataPoints,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                fill: true,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
                y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
            }
        }
    });
}

// ==========================================
// ۸. مودال‌ها و عملیات افزودن
// ==========================================
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
    if (amount <= 0 || !selectedItem) return;

    if (selectedItem.type === 'food') {
        const addedCal = Math.round((selectedItem.cal / 100) * amount);
        userData.consumed += addedCal;
    } else if (selectedItem.type === 'workout') {
        const burnedCal = Math.round(selectedItem.calPerMin * amount);
        userData.burned += burnedCal;
    }

    saveUserData();
    closeModal('modal-item');
}

function openCustomFoodModal() { openModal("modal-custom-food"); }
function saveCustomFood() {
    const name = document.getElementById("custom-food-name").value.trim();
    const cal = parseFloat(document.getElementById("custom-food-cal").value);
    if (name && cal) {
        const newFood = { id: `custom_${Date.now()}`, name, cal, unit: "100 گرم" };
        allFoods.unshift(newFood);
        renderFoodList(allFoods);
        closeModal("modal-custom-food");
        document.getElementById("custom-food-name").value = "";
        document.getElementById("custom-food-cal").value = "";
    }
}

function openCustomWorkoutModal() { openModal("modal-custom-workout"); }
function saveCustomWorkout() {
    const name = document.getElementById("custom-workout-name").value.trim();
    const calPerMin = parseFloat(document.getElementById("custom-workout-cal").value);
    if (name && calPerMin) {
        const newWorkout = { id: `custom_w_${Date.now()}`, name, calPerMin };
        allWorkouts.unshift(newWorkout);
        renderWorkoutList(allWorkouts);
        closeModal("modal-custom-workout");
        document.getElementById("custom-workout-name").value = "";
        document.getElementById("custom-workout-cal").value = "";
    }
}

function addWater(amount) {
    userData.water = Math.max(0, userData.water + amount);
    saveUserData();
}

// ==========================================
// ۹. توابع ذخیره و برنامه‌ریزی داده‌ها
// ==========================================
function updateDashboard() {
    document.getElementById('consumed-cal').innerText = userData.consumed;
    document.getElementById('burned-cal').innerText = userData.burned;
    
    const remaining = userData.bmr - userData.consumed + userData.burned;
    document.getElementById('remaining-cal').innerText = remaining;
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
        userData = { ...userData, ...JSON.parse(saved) };
    }
    calculateBMR();
}

function saveUserData() {
    calculateBMR();
    localStorage.setItem('user_health_data', JSON.stringify(userData));
    updateDashboard();
}

function syncSettingsInputs() {
    if (document.getElementById("user-gender")) document.getElementById("user-gender").value = userData.gender;
    if (document.getElementById("user-age")) document.getElementById("user-age").value = userData.age;
    if (document.getElementById("user-height")) document.getElementById("user-height").value = userData.height;
    if (document.getElementById("user-weight")) document.getElementById("user-weight").value = userData.weight;
    if (document.getElementById("user-activity")) document.getElementById("user-activity").value = userData.activity;
}

function saveProfileFromSettings() {
    userData.gender = document.getElementById("user-gender").value;
    userData.age = parseFloat(document.getElementById("user-age").value) || 25;
    userData.height = parseFloat(document.getElementById("user-height").value) || 175;
    userData.weight = parseFloat(document.getElementById("user-weight").value) || 70;
    userData.activity = parseFloat(document.getElementById("user-activity").value) || 1.2;

    saveUserData();
    alert("تنظیمات با موفقیت به‌روزرسانی شد.");
}

function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.style.display = 'flex';
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.style.display = 'none';
}
