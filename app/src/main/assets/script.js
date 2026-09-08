// تابع نرمال‌سازی و اصلاح حروف فارسی
function fixPersian(str) {
    if (!str) return '';
    return str.toString()
        .replace(/ي/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/آ/g, 'ا')
        .replace(/أ/g, 'ا')
        .replace(/إ/g, 'ا')
        .replace(/ۀ/g, 'ه')
        .replace(/َ|ُ|ِ|ً|ٌ|ٍ|ّ/g, '')
        .toLowerCase()
        .trim();
}

// بررسی اینکه آیا متن شامل حروف فارسی است یا خیر
function isPersianText(str) {
    const persianRegex = /^[\u0600-\u06FF\s0-9\u0660-\u0669\u06F0-\u06F9]+$/;
    return persianRegex.test(str);
}

// وضعیت و داده‌های ذخیره‌شده
let userState = JSON.parse(localStorage.getItem('cal_user_state')) || null;
let customFoods = JSON.parse(localStorage.getItem('cal_custom_foods')) || [];
let customWorkouts = JSON.parse(localStorage.getItem('cal_custom_workouts')) || [];
let weightHistory = JSON.parse(localStorage.getItem('cal_weight_history')) || [];
let historyLogs = JSON.parse(localStorage.getItem('cal_history_logs')) || {};

let selectedItemForAdd = null;
let isWorkoutMode = false;
let searchTimeout = null;

function getTodayString() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
}

let todayData = JSON.parse(localStorage.getItem('cal_today_data')) || null;
const todayStr = getTodayString();

if (!todayData || todayData.date !== todayStr) {
    todayData = { date: todayStr, consumed: 0, burned: 0, water: 0 };
    localStorage.setItem('cal_today_data', JSON.stringify(todayData));
}

// بانک اطلاعاتی خوراکی‌های پایه
const baseFoodsList = [
    { name: "برنج سفید کته / پلو", category: "غلات", cal: 130 },
    { name: "برنج زعفرانی با کره", category: "غلات", cal: 170 },
    { name: "سیب درختی", category: "میوه", cal: 52 },
    { name: "موز", category: "میوه", cal: 89 },
    { name: "شیر کم‌چرب", category: "لبنیات", cal: 42 },
    { name: "شیر پرچرب", category: "لبنیات", cal: 62 },
    { name: "کره حیوانى", category: "چربی و روغن", cal: 717 },
    { name: "نان سنگک", category: "نان", cal: 259 },
    { name: "نان بربری", category: "نان", cal: 265 },
    { name: "نان لواش", category: "نان", cal: 290 },
    { name: "نان تافتون", category: "نان", cal: 280 },
    { name: "چلو کباب کوبیده", category: "غذای سنتی", cal: 240 },
    { name: "چلو جوجه کباب", category: "غذای سنتی", cal: 180 },
    { name: "خورشت قرمه سبزی", category: "خورشت", cal: 175 },
    { name: "خورشت قیمه", category: "خورشت", cal: 185 },
    { name: "زرشک پلو با مرغ", category: "پلو", cal: 195 },
    { name: "تخم مرغ آب‌پز", category: "پروتئین", cal: 155 },
    { name: "تخم مرغ نیمرو", category: "پروتئین", cal: 200 },
    { name: "سینه مرغ گریل شده", category: "پروتئین", cal: 165 },
    { name: "سیب زمینی سرخ‌کرده", category: "فست فود", cal: 312 },
    { name: "پیتزا مخلوط", category: "فست فود", cal: 266 },
    { name: "پنیر سفید", category: "لبنیات", cal: 260 },
    { name: "ماست کم‌چرب", category: "لبنیات", cal: 43 },
    { name: "گردو", category: "آجیل", cal: 654 },
    { name: "پسته", category: "آجیل", cal: 562 },
    { name: "خرما", category: "میوه خشک", cal: 277 },
    { name: "پرتقال", category: "میوه", cal: 47 },
    { name: "خیار", category: "میوه و سبزی", cal: 15 },
    { name: "گوجه فرنگی", category: "میوه و سبزی", cal: 18 }
];

// بانک اطلاعاتی فعالیت‌های ورزشی پایه
const baseWorkoutsList = [
    { name: "پیاده‌روی معمولی", category: "سبک", calPerMin: 4.5 },
    { name: "پیاده‌روی تند", category: "هوازی", calPerMin: 6.5 },
    { name: "دویدن نرم", category: "هوازی", calPerMin: 9.0 },
    { name: "دویدن سریع", category: "هوازی سنگین", calPerMin: 13.5 },
    { name: "دوچرخه‌سواری", category: "هوازی", calPerMin: 6.0 },
    { name: "شنا کرال سینه", category: "آبی", calPerMin: 11.0 },
    { name: "بدنسازی با وزنه", category: "قدرتی", calPerMin: 5.5 },
    { name: "طناب زدن", category: "هوازی سنگین", calPerMin: 14.0 },
    { name: "بوکس / کیسه بوکس", category: "رزمی", calPerMin: 10.5 },
    { name: "فوتبال", category: "توپی", calPerMin: 9.0 },
    { name: "یوگا", category: "ذهن و جسم", calPerMin: 3.5 },
    { name: "پله نوردی", category: "روزمره", calPerMin: 10.0 },
    { name: "کار خانه / خانه‌داری", category: "روزمره", calPerMin: 3.5 }
];

let allFoods = [];
let allWorkouts = [];

function initDatabase() {
    allFoods = [
        ...customFoods.map(c => ({ name: c.name, category: "شخصی/آنلاین", cal: c.cal })),
        ...baseFoodsList
    ];

    allWorkouts = [
        ...customWorkouts.map(w => ({ name: w.name, category: "دستی", calPerMin: w.calPerMin })),
        ...baseWorkoutsList
    ];
}

// ۵. بازنشانی روزانه و بررسی عملکرد روز قبل (تشویق یا تذکر)
function checkAndResetDailyData() {
    const currentToday = getTodayString();
    if (todayData.date !== currentToday) {
        const lastConsumed = todayData.consumed || 0;
        const lastBurned = todayData.burned || 0;
        const lastTarget = (userState && userState.tdee) ? userState.tdee : 2000;
        const netConsumed = lastConsumed - lastBurned;

        historyLogs[todayData.date] = { consumed: lastConsumed, burned: lastBurned };
        localStorage.setItem('cal_history_logs', JSON.stringify(historyLogs));

        // نمایش پیام تشویقی یا تذکر برای روز گذشته
        setTimeout(() => {
            if (lastConsumed > 0) {
                if (netConsumed <= lastTarget) {
                    alert(`🎉 آفرین! شما دیروز عملکرد عالی داشتید و میزان کالری مصرفی شما (${netConsumed} کالری) کمتر از حد مجاز (${lastTarget} کالری) بود.`);
                } else {
                    alert(`⚠️ توجه: دیروز ${netConsumed - lastTarget} کالری بیشتر از حد مجاز مصرف کردید. امروز بیشتر مراقب باشید!`);
                }
            }
        }, 1000);

        todayData = { date: currentToday, consumed: 0, burned: 0, water: 0 };
        localStorage.setItem('cal_today_data', JSON.stringify(todayData));
    }
}

// مدیریت دکمه برگشت گوشی (جلوگیری از خروج ناگهانی از برنامه)
function setupBackButtonHandler() {
    history.pushState({ page: 'dashboard' }, '');
    window.onpopstate = function (event) {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab && activeTab.id !== 'tab-dashboard') {
            switchTab('dashboard', document.querySelectorAll('.nav-item')[0]);
            history.pushState({ page: 'dashboard' }, '');
        } else {
            history.back();
        }
    };
}

function initApp() {
    setupBackButtonHandler();
    checkAndResetDailyData();
    initDatabase();

    if (!userState) {
        document.getElementById('modal-onboarding').style.display = 'flex';
    } else {
        updateProfileInputs();
        calculateTDEE();
        updateDashboard();
    }

    renderFoods(allFoods);
    renderWorkouts(allWorkouts);
    renderWeightHistory();
}

// ۱. تحلیل دقیق BMI و محاسبه میزان اضافه/کمبود وزن
function analyzeWeightStatus(weight, height) {
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    const minIdeal = Math.round(18.5 * heightM * heightM);
    const maxIdeal = Math.round(24.9 * heightM * heightM);

    let status = '';
    let advice = '';

    if (bmi < 18.5) {
        status = 'کمبود وزن (لاغر)';
        const diff = Math.round(minIdeal - weight);
        advice = `شما به حدود **${diff} کیلوگرم** افزایش وزن نیاز دارید تا به وزن نرمال برسید.`;
    } else if (bmi <= 24.9) {
        status = 'وزن نرمال و ایده‌آل';
        advice = `وزن شما کاملاً مناسب است (محدوده ایده‌آل: ${minIdeal} تا ${maxIdeal} کیلوگرم).`;
    } else if (bmi <= 29.9) {
        status = 'اضافه وزن';
        const diff = Math.round(weight - maxIdeal);
        advice = `شما برای رسیدن به وزن ایده‌آل باید حدود **${diff} کیلوگرم** وزن کم کنید.`;
    } else {
        status = 'چاقی';
        const diff = Math.round(weight - maxIdeal);
        advice = `شما در محدوده چاقی هستید و پیشنهاد می‌شود **${diff} کیلوگرم** کاهش وزن داشته باشید.`;
    }

    return { bmi, status, advice };
}

function calculateTDEE() {
    if (!userState) return 2000;
    const gender = userState.gender || 'male';
    const age = parseFloat(userState.age) || 25;
    const weight = parseFloat(userState.weight) || 70;
    const height = parseFloat(userState.height) || 175;
    const activity = parseFloat(userState.activity) || 1.2;

    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
    let tdee = Math.round(bmr * activity);

    userState.tdee = tdee || 2000;
    localStorage.setItem('cal_user_state', JSON.stringify(userState));
    return userState.tdee;
}

// ثبت‌نام و نمایش بلافاصله اطلاعات BMI و اضافه وزن
function submitOnboarding() {
    const weight = parseFloat(document.getElementById('init-weight').value) || 70;
    const height = parseFloat(document.getElementById('init-height').value) || 175;

    userState = {
        gender: document.getElementById('init-gender').value,
        age: parseFloat(document.getElementById('init-age').value) || 25,
        height: height,
        weight: weight,
        activity: document.getElementById('init-activity').value
    };

    calculateTDEE();
    addWeightRecord(weight);
    
    document.getElementById('modal-onboarding').style.display = 'none';
    updateProfileInputs();
    updateDashboard();

    const res = analyzeWeightStatus(weight, height);
    alert(`📊 نتیجه آنالیز بدنی شما:\n\n• شاخص BMI شما: ${res.bmi}\n• وضعیت: ${res.status}\n\n💡 ${res.advice.replace(/\*\*/g, '')}`);
}

function saveProfileFromSettings() {
    const weight = parseFloat(document.getElementById('user-weight').value) || 70;
    const height = parseFloat(document.getElementById('user-height').value) || 175;

    userState = {
        gender: document.getElementById('user-gender').value,
        age: parseFloat(document.getElementById('user-age').value) || 25,
        height: height,
        weight: weight,
        activity: document.getElementById('user-activity').value
    };

    calculateTDEE();
    addWeightRecord(weight);
    updateDashboard();

    const res = analyzeWeightStatus(weight, height);
    alert(`اطلاعات به‌روزرسانی شد!\n\n📊 شاخص BMI: ${res.bmi}\n• وضعیت: ${res.status}\n💡 ${res.advice.replace(/\*\*/g, '')}`);
}

function updateProfileInputs() {
    if (!userState) return;
    document.getElementById('user-gender').value = userState.gender || 'male';
    document.getElementById('user-age').value = userState.age || 25;
    document.getElementById('user-height').value = userState.height || 175;
    document.getElementById('user-weight').value = userState.weight || 70;
    document.getElementById('user-activity').value = userState.activity || '1.2';
}

function updateDashboard() {
    checkAndResetDailyData();
    const target = (userState && userState.tdee) ? userState.tdee : 2000;
    const consumed = parseFloat(todayData.consumed) || 0;
    const burned = parseFloat(todayData.burned) || 0;
    const remaining = target - consumed + burned;

    document.getElementById('consumed-cal').innerText = consumed;
    document.getElementById('burned-cal').innerText = burned;
    document.getElementById('remaining-cal').innerText = remaining;
    document.getElementById('water-count').innerText = `${todayData.water || 0} از 8 لیوان 💧`;

    localStorage.setItem('cal_today_data', JSON.stringify(todayData));
}

function addWater(val) {
    todayData.water = Math.max(0, (todayData.water || 0) + val);
    updateDashboard();
}

// ۲. جستجوی آنلاین بهینه‌شده (فقط نتایج و غذاهای فارسی)
function handleFoodSearch() {
    const rawQuery = document.getElementById('food-search').value;
    const query = fixPersian(rawQuery);

    if (!query) {
        renderFoods(allFoods);
        return;
    }

    let localResults = allFoods.filter(f => fixPersian(f.name).includes(query));
    renderFoods(localResults);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        fetchOnlineFoods(query, localResults);
    }, 400);
}

async function fetchOnlineFoods(query, existingLocalResults) {
    const listEl = document.getElementById('food-list');
    if (!listEl) return;

    let loadingDiv = document.getElementById('search-loading');
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'search-loading';
        loadingDiv.style.cssText = 'text-align:center; padding:10px; color:#4CAF50; font-size:0.9rem;';
        loadingDiv.innerText = '🌐 در حال دریافت نتایج آنلاین...';
        listEl.prepend(loadingDiv);
    }

    try {
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=30`);
        const data = await response.json();

        const onlineResults = [];
        if (data && data.products) {
            data.products.forEach(prod => {
                const name = prod.product_name_fa || (isPersianText(prod.product_name) ? prod.product_name : null);
                const cal = prod.nutriments ? Math.round(prod.nutriments['energy-kcal_100g'] || prod.nutriments['energy-kcal'] || 0) : 0;

                // ثبت فقط غذاهایی که اسم فارسی و کالری معتبر دارند
                if (name && cal > 0 && isPersianText(name)) {
                    const isDuplicate = existingLocalResults.some(l => fixPersian(l.name) === fixPersian(name));
                    if (!isDuplicate) {
                        onlineResults.push({
                            name: name,
                            category: "آنلاین 🌐",
                            cal: cal
                        });
                    }
                }
            });
        }

        const lDiv = document.getElementById('search-loading');
        if (lDiv) lDiv.remove();

        const combined = [...existingLocalResults, ...onlineResults];
        renderFoods(combined);

    } catch (err) {
        const lDiv = document.getElementById('search-loading');
        if (lDiv) lDiv.remove();
    }
}

function renderFoods(list) {
    const listEl = document.getElementById('food-list');
    if (!listEl) return;
    if (!list || list.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">غذایی یافت نشد. می‌توانید آن را دستی اضافه کنید.</p>';
        return;
    }
    listEl.innerHTML = list.map(f => `
        <div class="item-card" onclick='selectFoodItem("${f.name.replace(/'/g, "\\'")}", ${f.cal})'>
            <div class="item-info">
                <div class="name">${f.name}</div>
                <div class="details">دسته: ${f.category} | در ۱۰۰ گرم</div>
            </div>
            <div class="item-value">${f.cal} کالری</div>
        </div>
    `).join('');
}

function selectFoodItem(name, cal) {
    const exists = customFoods.some(f => fixPersian(f.name) === fixPersian(name));
    if (!exists && !baseFoodsList.some(b => fixPersian(b.name) === fixPersian(name))) {
        customFoods.unshift({ name, cal });
        localStorage.setItem('cal_custom_foods', JSON.stringify(customFoods));
        initDatabase();
    }
    openModalWithData(name, cal, false);
}

function handleWorkoutSearch() {
    const query = fixPersian(document.getElementById('workout-search').value);
    if (!query) {
        renderWorkouts(allWorkouts);
        return;
    }
    const filtered = allWorkouts.filter(w => fixPersian(w.name).includes(query));
    renderWorkouts(filtered);
}

function renderWorkouts(list) {
    const listEl = document.getElementById('workout-list');
    if (!listEl) return;
    if (!list || list.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">فعالیتی یافت نشد. می‌توانید آن را دستی اضافه کنید.</p>';
        return;
    }
    listEl.innerHTML = list.map(w => `
        <div class="item-card" onclick='openModalWithData("${w.name}", ${w.calPerMin}, true)'>
            <div class="item-info">
                <div class="name">${w.name}</div>
                <div class="details">دسته: ${w.category}</div>
            </div>
            <div class="item-value burn">${w.calPerMin} کالری/دقیقه</div>
        </div>
    `).join('');
}

// ثبت دستی خوراکی
function openCustomFoodModal() {
    document.getElementById('modal-custom-food').style.display = 'flex';
}

function saveCustomFood() {
    const name = document.getElementById('custom-food-name').value.trim();
    const cal = parseFloat(document.getElementById('custom-food-cal').value);

    if (!name || isNaN(cal) || cal <= 0) {
        alert('لطفاً نام و میزان کالری را صحیح وارد کنید.');
        return;
    }

    customFoods.unshift({ name, cal });
    localStorage.setItem('cal_custom_foods', JSON.stringify(customFoods));
    closeModal('modal-custom-food');
    
    document.getElementById('custom-food-name').value = '';
    document.getElementById('custom-food-cal').value = '';

    initDatabase();
    renderFoods(allFoods);
    alert('خوراکی جدید با موفقیت اضافه شد.');
}

// ۴. ثبت دستی فعالیت ورزشی (فعال‌سازی بخش کالری‌سوزی)
function openCustomWorkoutModal() {
    document.getElementById('modal-custom-workout').style.display = 'flex';
}

function saveCustomWorkout() {
    const name = document.getElementById('custom-workout-name').value.trim();
    const calPerMin = parseFloat(document.getElementById('custom-workout-cal').value);

    if (!name || isNaN(calPerMin) || calPerMin <= 0) {
        alert('لطفاً نام فعالیت و میزان کالری‌سوزی در دقیقه را صحیح وارد کنید.');
        return;
    }

    customWorkouts.unshift({ name, calPerMin });
    localStorage.setItem('cal_custom_workouts', JSON.stringify(customWorkouts));
    closeModal('modal-custom-workout');

    document.getElementById('custom-workout-name').value = '';
    document.getElementById('custom-workout-cal').value = '';

    initDatabase();
    renderWorkouts(allWorkouts);
    alert('فعالیت ورزشی جدید با موفقیت اضافه شد.');
}

function addWeightRecord(weightVal) {
    const w = parseFloat(weightVal);
    if (isNaN(w) || w <= 0) return;

    const today = getTodayString();
    weightHistory = weightHistory.filter(item => item.date !== today);
    weightHistory.push({ date: today, weight: w });
    localStorage.setItem('cal_weight_history', JSON.stringify(weightHistory));
    renderWeightHistory();
}

function submitNewWeight() {
    const w = parseFloat(document.getElementById('new-weight-input').value);
    if (!w || w <= 0) {
        alert('لطفاً وزن معتبری وارد کنید.');
        return;
    }
    if (userState) {
        userState.weight = w;
        calculateTDEE();
    }
    addWeightRecord(w);
    updateDashboard();
    document.getElementById('new-weight-input').value = '';
    alert('وزن جدید با موفقیت ثبت شد.');
}

function renderWeightHistory() {
    const listEl = document.getElementById('weight-history-list');
    if (!listEl) return;

    if (weightHistory.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; color:#888;">سابقه‌ای ثبت نشده است.</p>';
        return;
    }

    const sorted = [...weightHistory].reverse();
    listEl.innerHTML = sorted.map(item => `
        <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #333;">
            <span>تاریخ: ${item.date}</span>
            <strong>${item.weight} کیلوگرم</strong>
        </div>
    `).join('');
}

function openModalWithData(name, val, workout) {
    isWorkoutMode = workout;
    selectedItemForAdd = { name, val };
    if (workout) {
        document.getElementById('modal-item-title').innerText = `ثبت فعالیت: ${name}`;
        document.getElementById('modal-item-unit-label').innerText = 'مدت زمان (دقیقه)';
        document.getElementById('modal-item-amount').value = 30;
    } else {
        document.getElementById('modal-item-title').innerText = `ثبت خوراکی: ${name}`;
        document.getElementById('modal-item-unit-label').innerText = 'مقدار مصرفی (گرم)';
        document.getElementById('modal-item-amount').value = 100;
    }
    document.getElementById('modal-item').style.display = 'flex';
}

function confirmAddItem() {
    const amount = parseFloat(document.getElementById('modal-item-amount').value) || 0;
    if (amount <= 0) return;

    let msg = "";
    if (isWorkoutMode) {
        const burned = Math.round(selectedItemForAdd.val * amount);
        todayData.burned += burned;
        msg = `🔥 عالی! ${burned} کالری سوزانده شد.`;
    } else {
        const consumed = Math.round((selectedItemForAdd.val / 100) * amount);
        todayData.consumed += consumed;
        msg = `✅ ${consumed} کالری دریافت شد.`;
    }

    updateDashboard();
    closeModal('modal-item');
    alert(msg);
    switchTab('dashboard', document.querySelectorAll('.nav-item')[0]);
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function switchTab(tabName, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    if (el) el.classList.add('active');

    history.pushState({ page: tabName }, '');
}

window.onload = initApp;
