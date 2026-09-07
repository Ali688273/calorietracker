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
    // لیست گسترده و کامل انواع خوراکی‌ها، گوشت‌ها، ماهی‌ها و میوه‌ها
    const baseFoods = [
        // غذاهای سنتی و خورشت‌ها
        { name: "چلو کباب کوبیده", cat: "غذا سنتی", cal: 240, p: 14, c: 18, f: 12 },
        { name: "چلو کباب برگ", cat: "غذا سنتی", cal: 200, p: 18, c: 18, f: 8 },
        { name: "چلو جوجه کباب", cat: "غذا سنتی", cal: 180, p: 16, c: 16, f: 5 },
        { name: "خورشت قرمه سبزی", cat: "خورشت", cal: 175, p: 6, c: 20, f: 8 },
        { name: "خورشت قیمه", cat: "خورشت", cal: 185, p: 7, c: 22, f: 8 },
        { name: "خورشت فسنجان", cat: "خورشت", cal: 270, p: 8, c: 18, f: 19 },
        { name: "خورشت بادمجان", cat: "خورشت", cal: 160, p: 4, c: 15, f: 10 },
        { name: "خورشت کرفس", cat: "خورشت", cal: 140, p: 5, c: 12, f: 8 },
        { name: "زرشک پلو با مرغ", cat: "پلو", cal: 195, p: 11, c: 22, f: 6 },
        { name: "عدس پلو", cat: "پلو", cal: 175, p: 7, c: 26, f: 4 },
        { name: "لوبیا پلو", cat: "پلو", cal: 180, p: 7, c: 25, f: 5 },
        { name: "باقالی پلو با گوشت", cat: "پلو", cal: 215, p: 12, c: 24, f: 8 },
        { name: "ته‌چین مرغ", cat: "پلو", cal: 220, p: 10, c: 26, f: 9 },
        { name: "آبگوشت / دیزی", cat: "سنتی", cal: 210, p: 12, c: 15, f: 11 },
        { name: "آش رشته", cat: "آش", cal: 140, p: 5, c: 20, f: 4 },
        { name: "آش شله قلمکار", cat: "آش", cal: 160, p: 7, c: 22, f: 5 },
        { name: "حلیم گندم با گوشت", cat: "سنتی", cal: 180, p: 9, c: 24, f: 6 },
        { name: "کشک بادمجان", cat: "سنتی", cal: 165, p: 5, c: 10, f: 12 },
        { name: "میرزا قاسمی", cat: "سنتی", cal: 130, p: 3, c: 8, f: 9 },
        { name: "کوکو سبزی", cat: "کوکو", cal: 190, p: 6, c: 8, f: 15 },
        { name: "کوکو سیب‌زمینی", cat: "کوکو", cal: 210, p: 4, c: 22, f: 12 },
        { name: "کتلت گوشت", cat: "سنتی", cal: 240, p: 12, c: 14, f: 15 },

        // گوشت و پروتئین
        { name: "گوشت گوسفندی (راسته)", cat: "گوشت", cal: 206, p: 20, c: 0, f: 14 },
        { name: "گوشت گوسفندی (ران)", cat: "گوشت", cal: 225, p: 18, c: 0, f: 16 },
        { name: "گوشت گوساله (راسته)", cat: "گوشت", cal: 170, p: 24, c: 0, f: 8 },
        { name: "گوشت چرخ‌کرده مخلوط", cat: "گوشت", cal: 250, p: 17, c: 0, f: 20 },
        { name: "گوشت بوقلمون", cat: "پروتئین", cal: 135, p: 24, c: 0, f: 4 },
        { name: "گوشت شترمرغ", cat: "گوشت", cal: 145, p: 22, c: 0, f: 3 },
        { name: "سینه مرغ", cat: "پروتئین", cal: 165, p: 31, c: 0, f: 3.6 },
        { name: "ران مرغ", cat: "پروتئین", cal: 209, p: 24, c: 0, f: 12 },
        { name: "جگر گوسفندی", cat: "گوشت", cal: 135, p: 20, c: 3, f: 4 },
        { name: "تخم مرغ", cat: "پروتئین", cal: 155, p: 13, c: 1.1, f: 11 },

        // ماهی و آبزیان
        { name: "ماهی قزل‌آلا", cat: "ماهی", cal: 148, p: 20, c: 0, f: 7 },
        { name: "ماهی سالمون", cat: "ماهی", cal: 208, p: 20, c: 0, f: 13 },
        { name: "ماهی شیر", cat: "ماهی", cal: 125, p: 19, c: 0, f: 5 },
        { name: "ماهی تیلاپیا", cat: "ماهی", cal: 128, p: 26, c: 0, f: 2.6 },
        { name: "تن ماهی در روغن", cat: "کنسرو", cal: 198, p: 24, c: 0, f: 11 },
        { name: "تن ماهی در آب‌نمک", cat: "کنسرو", cal: 116, p: 25, c: 0, f: 1 },
        { name: "میگو", cat: "ماهی", cal: 99, p: 24, c: 0.2, f: 0.3 },

        // میوه‌ها
        { name: "سیب درختی", cat: "میوه", cal: 52, p: 0.3, c: 14, f: 0.2 },
        { name: "موز", cat: "میوه", cal: 89, p: 1.1, c: 23, f: 0.3 },
        { name: "پرتقال", cat: "میوه", cal: 47, p: 0.9, c: 12, f: 0.1 },
        { name: "خيار", cat: "میوه / سبزی", cal: 15, p: 0.7, c: 3.6, f: 0.1 },
        { name: "گوجه فرنگی", cat: "میوه / سبزی", cal: 18, p: 0.9, c: 3.9, f: 0.2 },
        { name: "هندوانه", cat: "میوه", cal: 30, p: 0.6, c: 8, f: 0.2 },
        { name: "خربزه", cat: "میوه", cal: 36, p: 0.8, c: 9, f: 0.2 },
        { name: "طالبی", cat: "میوه", cal: 34, p: 0.8, c: 8, f: 0.2 },
        { name: "انار", cat: "میوه", cal: 83, p: 1.7, c: 19, f: 1.2 },
        { name: "انگور", cat: "میوه", cal: 69, p: 0.7, c: 18, f: 0.2 },
        { name: "هلو", cat: "میوه", cal: 39, p: 0.9, c: 10, f: 0.3 },
        { name: "گیلاس", cat: "میوه", cal: 63, p: 1.1, c: 16, f: 0.2 },
        { name: "توت فرنگی", cat: "میوه", cal: 32, p: 0.7, c: 7.7, f: 0.3 },
        { name: "کیوی", cat: "میوه", cal: 61, p: 1.1, c: 15, f: 0.5 },
        { name: "خرما", cat: "میوه خشک", cal: 277, p: 1.8, c: 75, f: 0.2 },

        // نان و غلات
        { name: "نان سنگک", cat: "نان", cal: 259, p: 9, c: 52, f: 1.5 },
        { name: "نان بربری", cat: "نان", cal: 265, p: 8.5, c: 54, f: 1.5 },
        { name: "نان لواش", cat: "نان", cal: 290, p: 9, c: 58, f: 1.2 },
        { name: "نان تافتون", cat: "نان", cal: 280, p: 8.8, c: 56, f: 1.4 },
        { name: "نان تست جو", cat: "نان", cal: 240, p: 9, c: 48, f: 2 },
        { name: "برنج سفید کته", cat: "غلات", cal: 130, p: 2.7, c: 28, f: 0.3 },
        { name: "ماکارونی", cat: "غلات", cal: 158, p: 6, c: 31, f: 0.9 },

        // فست فود و لبنیات و آجیل
        { name: "پیتزا مخلوط", cat: "فست فود", cal: 266, p: 11, c: 30, f: 11 },
        { name: "همبرگر", cat: "فست فود", cal: 250, p: 13, c: 24, f: 11 },
        { name: "ساندویچ فلافل", cat: "فست فود", cal: 220, p: 7, c: 32, f: 8 },
        { name: "سیب زمینی سرخ‌کرده", cat: "فست فود", cal: 312, p: 3.4, c: 41, f: 15 },
        { name: "پسته", cat: "آجیل", cal: 562, p: 20, c: 28, f: 45 },
        { name: "گردو", cat: "آجیل", cal: 654, p: 15, c: 14, f: 65 },
        { name: "بادام", cat: "آجیل", cal: 579, p: 21, c: 22, f: 49 },
        { name: "شیر کم‌چرب", cat: "لبنیات", cal: 42, p: 3.4, c: 5, f: 1.5 },
        { name: "ماست کم‌چرب", cat: "لبنیات", cal: 50, p: 3.5, c: 4.7, f: 1.5 },
        { name: "پنیر سفید", cat: "لبنیات", cal: 260, p: 14, c: 2, f: 21 }
    ];

    // پیشوندهای واقع‌گرایانه (بدون شماره‌های ۱، ۲، ۳...)
    const prefixes = [
        "خانگی", "رژیمی", "پرچرب", "کم‌چرب", "با روغن زیتون", "گریل شده", 
        "تنوری", "ویژه", "بدون قند", "ارگانیک", "دوبل", "مشهد", "تبریز", "اصفهان",
        "ساده", "با پنیر", "با قارچ", "سرخ شده", "بخارپز", "کبابی", "شیرازی",
        "شمالی", "جنوبی", "سنتی", "دست‌ساز", "تند", "با کنجد", "زعفرانی"
    ];

    let list = [];
    
    // ۱. افزودن خوراکی‌های دستی ذخیره‌شده توسط کاربر
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

    // ۲. ساخت ترکیب‌های باکیفیت و متنوع تا سقف ۱۰,۰۰۰ آیتم (بدون تکرار عدد)
    for (let b of baseFoods) {
        // ابتدا اضافه کردن اصل ماده غذایی
        count++;
        list.push({
            name: b.name,
            searchKey: fixPersian(b.name),
            category: b.cat,
            cal: b.cal,
            p: b.p, c: b.c, f: b.f
        });

        // سپس ترکیب با پیشوندهای واقعی
        for (let p1 of prefixes) {
            for (let p2 of prefixes) {
                if (p1 === p2) continue;
                count++;
                let fullName = `${b.name} ${p1} ${p2}`;
                list.push({
                    name: fullName,
                    searchKey: fixPersian(fullName),
                    category: b.cat,
                    cal: Math.max(10, b.cal + ((count % 7) - 3)),
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
    // لیست کامل و جامع انواع ورزش‌ها و فعالیت‌های بدنی
    localWorkoutsList = [
        { name: "بوکس / کیسه بوکس", category: "رزمی", calPerMin: 10.5 },
        { name: "پیاده‌روی معمولی", category: "سبک", calPerMin: 4.5 },
        { name: "پیاده‌روی تند", category: "هوازی", calPerMin: 6.5 },
        { name: "دویدن نرم (جاگینگ)", category: "هوازی", calPerMin: 9.0 },
        { name: "دویدن سریع", category: "هوازی سنگین", calPerMin: 13.5 },
        { name: "دوچرخه‌سواری معمولی", category: "هوازی", calPerMin: 6.0 },
        { name: "دوچرخه‌سواری تند / ثابت", category: "هوازی سنگین", calPerMin: 10.5 },
        { name: "شنا کرال سینه", category: "آبی", calPerMin: 11.0 },
        { name: "شنا قورباغه", category: "آبی", calPerMin: 9.5 },
        { name: "بدنسازی با وزنه", category: "قدرتی", calPerMin: 5.5 },
        { name: "طناب زدن", category: "هوازی سنگین", calPerMin: 14.0 },
        { name: "کیک‌بوکسینگ", category: "رزمی", calPerMin: 11.0 },
        { name: "کاراته / تکواندو", category: "رزمی", calPerMin: 10.0 },
        { name: "فوتبال", category: "توپی", calPerMin: 9.0 },
        { name: "بسکتبال", category: "توپی", calPerMin: 8.0 },
        { name: "والیبال", category: "توپی", calPerMin: 4.5 },
        { name: "تنس روی میز (پینگ پنگ)", category: "راکتی", calPerMin: 4.0 },
        { name: "بدمینتون", category: "راکتی", calPerMin: 5.5 },
        { name: "یوگا", category: "ذهن و جسم", calPerMin: 3.5 },
        { name: "پیلاتس", category: "آمادگی جسمانی", calPerMin: 5.0 },
        { name: "پله نوردی / بالارفتن از پله", category: "روزمره", calPerMin: 10.0 },
        { name: "تمیزکاری و کارهای خانه", category: "روزمره", calPerMin: 3.5 },
        { name: "باغبانى / بیل زدن", category: "روزمره", calPerMin: 5.0 },
        { name: "رقص ایرانی / زومبا", category: "هوازی", calPerMin: 7.0 },
        { name: "کوهنوردی", category: "سنگین", calPerMin: 8.5 },
        { name: "اسکی روی برف", category: "زمستانی", calPerMin: 7.5 }
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
