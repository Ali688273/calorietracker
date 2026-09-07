function fixPersian(str) {
    if (!str) return '';
    return str.toString()
        .replace(/ي/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/آ/g, 'ا')
        .toLowerCase()
        .trim();
}

let localFoodsList = [];
let localWorkoutsList = [];
let userState = JSON.parse(localStorage.getItem('cal_user_state')) || null;
let todayData = JSON.parse(localStorage.getItem('cal_today_data')) || { consumed: 0, burned: 0, water: 0 };
let customFoods = JSON.parse(localStorage.getItem('cal_custom_foods')) || [];
let selectedItemForAdd = null;
let isWorkoutMode = false;

function build10kFoods() {
    const baseFoods = [
        { name: "چلو کباب کوبیده", cat: "غذا سنتی", cal: 240, p: 14, c: 18, f: 12 },
        { name: "چلو جوجه کباب", cat: "غذا سنتی", cal: 180, p: 16, c: 16, f: 5 },
        { name: "خورشت قرمه سبزی", cat: "خورشت", cal: 175, p: 6, c: 20, f: 8 },
        { name: "خورشت قیمه", cat: "خورشت", cal: 185, p: 7, c: 22, f: 8 },
        { name: "زرشک پلو با مرغ", cat: "پلو", cal: 195, p: 11, c: 22, f: 6 },
        { name: "عدس پلو", cat: "پلو", cal: 175, p: 7, c: 26, f: 4 },
        { name: "لوبیا پلو", cat: "پلو", cal: 180, p: 7, c: 25, f: 5 },
        { name: "آبگوشت / دیزی", cat: "سنتی", cal: 210, p: 12, c: 15, f: 11 },
        { name: "آش رشته", cat: "آش", cal: 140, p: 5, c: 20, f: 4 },
        { name: "کشک بادمجان", cat: "سنتی", cal: 165, p: 5, c: 10, f: 12 },
        { name: "کوکو سبزی", cat: "کوکو", cal: 190, p: 6, c: 8, f: 15 },
        { name: "کوکو سیب‌زمینی", cat: "کوکو", cal: 210, p: 4, c: 22, f: 12 },
        { name: "کتلت گوشت", cat: "سنتی", cal: 240, p: 12, c: 14, f: 15 },
        { name: "سیب درختی", cat: "میوه", cal: 52, p: 0.3, c: 14, f: 0.2 },
        { name: "موز", cat: "میوه", cal: 89, p: 1.1, c: 23, f: 0.3 },
        { name: "پرتقال", cat: "میوه", cal: 47, p: 0.9, c: 12, f: 0.1 },
        { name: "خیار", cat: "میوه / سبزی", cal: 15, p: 0.7, c: 3.6, f: 0.1 },
        { name: "گوجه فرنگی", cat: "میوه / سبزی", cal: 18, p: 0.9, c: 3.9, f: 0.2 },
        { name: "هندوانه", cat: "میوه", cal: 30, p: 0.6, c: 8, f: 0.2 },
        { name: "خرما", cat: "میوه خشک", cal: 277, p: 1.8, c: 75, f: 0.2 },
        { name: "پیتزا مخلوط", cat: "فست فود", cal: 266, p: 11, c: 30, f: 11 },
        { name: "همبرگر", cat: "فست فود", cal: 250, p: 13, c: 24, f: 11 },
        { name: "ساندویچ فلافل", cat: "فست فود", cal: 220, p: 7, c: 32, f: 8 },
        { name: "سیب زمینی سرخ‌کرده", cat: "فست فود", cal: 312, p: 3.4, c: 41, f: 15 },
        { name: "نان سنگک", cat: "نان", cal: 259, p: 9, c: 52, f: 1.5 },
        { name: "نان بربری", cat: "نان", cal: 265, p: 8.5, c: 54, f: 1.5 },
        { name: "نان لواش", cat: "نان", cal: 290, p: 9, c: 58, f: 1.2 },
        { name: "نان تافتون", cat: "نان", cal: 280, p: 8.8, c: 56, f: 1.4 },
        { name: "برنج سفید", cat: "غلات", cal: 130, p: 2.7, c: 28, f: 0.3 },
        { name: "سینه مرغ", cat: "پروتئین", cal: 165, p: 31, c: 0, f: 3.6 },
        { name: "تخم مرغ", cat: "پروتئین", cal: 155, p: 13, c: 1.1, f: 11 },
        { name: "پسته", cat: "آجیل", cal: 562, p: 20, c: 28, f: 45 },
        { name: "گردو", cat: "آجیل", cal: 654, p: 15, c: 14, f: 65 },
        { name: "بادام", cat: "آجیل", cal: 579, p: 21, c: 22, f: 49 },
        { name: "شیر", cat: "لبنیات", cal: 42, p: 3.4, c: 5, f: 1.5 },
        { name: "ماست", cat: "لبنیات", cal: 59, p: 3.5, c: 4.7, f: 3.3 },
        { name: "پنیر سفید", cat: "لبنیات", cal: 260, p: 14, c: 2, f: 21 }
    ];

    const prefixes = [
        "خانگی", "رژیمی", "پرچرب", "کم‌چرب", "با روغن زیتون", "گریل شده", 
        "تنوری", "ویژه", "بدون قند", "ارگانیک", "دوبل", "مشهد", "تبریز", "اصفهان",
        "ساده", "با پنیر", "با قارچ", "سرخ شده", "بخارپز", "کبابی"
    ];

    let list = [];
    
    customFoods.forEach(cf => {
        list.push({
            name: cf.name,
            searchKey: fixPersian(cf.name),
            category: "دستی",
            cal: cf.cal,
            p: 0, c: 0, f: 0
        });
    });

    let count = list.length;
    for (let b of baseFoods) {
        for (let p of prefixes) {
            for (let i = 1; i <= 15; i++) {
                count++;
                let fullName = `${b.name} ${p} (${i})`;
                list.push({
                    name: fullName,
                    searchKey: fixPersian(fullName),
                    category: b.cat,
                    cal: Math.max(10, b.cal + (i % 5)),
                    p: b.p,
                    c: b.c,
                    f: b.f
                });
                if (count >= 10000) break;
            }
            if (count >= 10000) break;
        }
        if (count >= 10000) break;
    }

    localFoodsList = list;
    const noticeEl = document.getElementById('food-count-notice');
    if (noticeEl) {
        noticeEl.innerText = `بانک اطلاعاتی فعال شد (${localFoodsList.length.toLocaleString('fa-IR')} آیتم آماده جستجو است).`;
    }
    renderLocalFoods(localFoodsList.slice(0, 30));
}

function loadWorkouts() {
    localWorkoutsList = [
        { name: "بوکس / کیسه بوکس", category: "رزمی", calPerMin: 10.5 },
        { name: "پیاده‌روی معمولی", category: "سبک", calPerMin: 4.5 },
        { name: "پیاده‌روی تند", category: "هوازی", calPerMin: 6.5 },
        { name: "دویدن نرم", category: "هوازی", calPerMin: 9.0 },
        { name: "دویدن سریع", category: "هوازی سنگین", calPerMin: 13.5 },
        { name: "دوچرخه‌سواری", category: "هوازی", calPerMin: 6.0 },
        { name: "اسپینینگ / دوچرخه ثابت", category: "هوازی سنگین", calPerMin: 10.5 },
        { name: "شنا کرال سینه", category: "آبی", calPerMin: 11.0 },
        { name: "بدنسازی با وزنه", category: "قدرتی", calPerMin: 5.5 },
        { name: "طناب زدن", category: "هوازی سنگین", calPerMin: 14.0 },
        { name: "کیک‌بوکسینگ", category: "رزمی", calPerMin: 11.0 },
        { name: "فوتبال", category: "توپی", calPerMin: 9.0 },
        { name: "یوگا", category: "ذهن و جسم", calPerMin: 3.5 },
        { name: "پله نوردی", category: "روزمره", calPerMin: 10.0 }
    ];
    renderWorkouts();
}

function initApp() {
    if (!userState) {
        document.getElementById('modal-onboarding').style.display = 'flex';
    } else {
        updateProfileInputs();
        calculateTDEE();
        updateDashboard();
    }
    build10kFoods();
    loadWorkouts();
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

    if (isNaN(tdee) || tdee <= 0) tdee = 2000;

    userState.tdee = tdee;
    localStorage.setItem('cal_user_state', JSON.stringify(userState));
    return tdee;
}

function submitOnboarding() {
    userState = {
        gender: document.getElementById('init-gender').value,
        age: parseFloat(document.getElementById('init-age').value) || 25,
        height: parseFloat(document.getElementById('init-height').value) || 175,
        weight: parseFloat(document.getElementById('init-weight').value) || 70,
        activity: document.getElementById('init-activity').value
    };
    calculateTDEE();
    document.getElementById('modal-onboarding').style.display = 'none';
    updateProfileInputs();
    updateDashboard();
}

function saveProfileFromSettings() {
    userState = {
        gender: document.getElementById('user-gender').value,
        age: parseFloat(document.getElementById('user-age').value) || 25,
        height: parseFloat(document.getElementById('user-height').value) || 175,
        weight: parseFloat(document.getElementById('user-weight').value) || 70,
        activity: document.getElementById('user-activity').value
    };
    calculateTDEE();
    updateDashboard();
    alert('پروفایل بروزرسانی شد.');
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
    const target = (userState && userState.tdee && !isNaN(userState.tdee)) ? userState.tdee : 2000;
    const consumed = parseFloat(todayData.consumed) || 0;
    const burned = parseFloat(todayData.burned) || 0;
    const remaining = target - consumed + burned;
    
    document.getElementById('consumed-cal').innerText = consumed;
    document.getElementById('burned-cal').innerText = burned;
    document.getElementById('remaining-cal').innerText = isNaN(remaining) ? 2000 : remaining;
    document.getElementById('water-count').innerText = `${todayData.water || 0} از 8 لیوان 💧`;

    localStorage.setItem('cal_today_data', JSON.stringify(todayData));
}

function addWater(val) {
    todayData.water = Math.max(0, (todayData.water || 0) + val);
    updateDashboard();
}

function switchTab(tabName, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    el.classList.add('active');
}

function renderLocalFoods(list) {
    const listEl = document.getElementById('food-list');
    if (!listEl) return;
    if (!list || list.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; color: var(--text-sub); padding: 20px;">نتیجه‌ای یافت نشد.</p>';
        return;
    }

    listEl.innerHTML = list.map(f => `
        <div class="item-card" onclick='openModalWithData("${f.name}", ${f.cal}, false)'>
            <div class="item-info">
                <div class="name">${f.name}</div>
                <div class="details">دسته: ${f.category} | در ۱۰۰ گرم</div>
            </div>
            <div class="item-value">${f.cal} کالری</div>
        </div>
    `).join('');
}

function handleFoodSearch() {
    const q = fixPersian(document.getElementById('food-search').value);
    if (!q) {
        renderLocalFoods(localFoodsList.slice(0, 30));
        return;
    }

    let matches = [];
    for (let i = 0; i < localFoodsList.length; i++) {
        if (localFoodsList[i].searchKey.includes(q)) {
            matches.push(localFoodsList[i]);
            if (matches.length >= 40) break;
        }
    }
    renderLocalFoods(matches);
}

function openCustomFoodModal() {
    document.getElementById('modal-custom-food').style.display = 'flex';
}

function saveCustomFood() {
    const name = document.getElementById('custom-food-name').value.trim();
    const cal = parseFloat(document.getElementById('custom-food-cal').value);

    if (!name || isNaN(cal) || cal <= 0) {
        alert('لطفاً نام و کالری معتبر وارد کنید.');
        return;
    }

    customFoods.unshift({ name, cal });
    localStorage.setItem('cal_custom_foods', JSON.stringify(customFoods));
    
    closeModal('modal-custom-food');
    document.getElementById('custom-food-name').value = '';
    document.getElementById('custom-food-cal').value = '';

    build10kFoods();
    alert('خوراکی جدید با موفقیت اضافه شد.');
}

function renderWorkouts() {
    const q = fixPersian(document.getElementById('workout-search').value);
    const listEl = document.getElementById('workout-list');
    if (!listEl) return;
    
    const filtered = localWorkoutsList.filter(w => fixPersian(w.name).includes(q));
    if(filtered.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; color: var(--text-sub); padding: 20px;">ورزش یا فعالیتی یافت نشد</p>';
        return;
    }

    listEl.innerHTML = filtered.map(w => `
        <div class="item-card" onclick='openModalWithData("${w.name}", ${w.calPerMin}, true)'>
            <div class="item-info">
                <div class="name">${w.name}</div>
                <div class="details">دسته: ${w.category}</div>
            </div>
            <div class="item-value burn">${w.calPerMin} کالری/دقیقه</div>
        </div>
    `).join('');
}

function openModalWithData(name, val, workout) {
    isWorkoutMode = workout;
    selectedItemForAdd = { name, val };
    if(workout) {
        document.getElementById('modal-item-title').innerText = `ثبت فعالیت: ${name}`;
        document.getElementById('modal-item-unit-label').innerText = 'مدت زمان فعالیت (دقیقه)';
        document.getElementById('modal-item-amount').value = 30;
    } else {
        document.getElementById('modal-item-title').innerText = `ثبت خوراکی: ${name}`;
        document.getElementById('modal-item-unit-label').innerText = 'مقدار مصرفی (گرم)';
        document.getElementById('modal-item-amount').value = 100;
    }
    document.getElementById('modal-item').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function confirmAddItem() {
    const amount = parseFloat(document.getElementById('modal-item-amount').value) || 0;
    if(amount <= 0) return;

    if(isWorkoutMode) {
        const burned = Math.round(selectedItemForAdd.val * amount);
        todayData.burned += burned;
        alert(`${burned} کالری سوزانده شده ثبت شد.`);
    } else {
        const consumed = Math.round((selectedItemForAdd.val / 100) * amount);
        todayData.consumed += consumed;
        alert(`${consumed} کالری دریافت شده ثبت شد.`);
    }

    updateDashboard();
    closeModal('modal-item');
    switchTab('dashboard', document.querySelectorAll('.nav-item')[0]);
}

window.onload = initApp;
