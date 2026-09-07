function fixPersian(str) {
    if (!str) return '';
    return str.toString()
        .replace(/ي/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/آ/g, 'ا')
        .replace(/أ/g, 'ا')
        .replace(/إ/g, 'ا')
        .replace(/ۀ/g, 'ه')
        .toLowerCase()
        .trim();
}

let localFoodsList = [];
let localWorkoutsList = [];
let userState = JSON.parse(localStorage.getItem('cal_user_state')) || null;
let customFoods = JSON.parse(localStorage.getItem('cal_custom_foods')) || [];
let selectedItemForAdd = null;
let isWorkoutMode = false;

// تاریخ امروز به فرمت YYYY-MM-DD
function getTodayString() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// بارگیری داده‌های امروز با قابلیت تشخیص روز جدید
let todayData = JSON.parse(localStorage.getItem('cal_today_data')) || null;
const todayStr = getTodayString();

if (!todayData || todayData.date !== todayStr) {
    // اگر روز جدید است یا اطلاعاتی ذخیره نشده، صفر می‌شود
    todayData = {
        date: todayStr,
        consumed: 0,
        burned: 0,
        water: 0
    };
    localStorage.setItem('cal_today_data', JSON.stringify(todayData));
}

function build10kFoods() {
    const baseFoods = [
        { name: "چلو کباب کوبیده", cat: "غذا سنتی", cal: 240, p: 14, c: 18, f: 12 },
        { name: "چلو کباب برگ", cat: "غذا سنتی", cal: 200, p: 18, c: 18, f: 8 },
        { name: "چلو جوجه کباب", cat: "غذا سنتی", cal: 180, p: 16, c: 16, f: 5 },
        { name: "خورشت قرمه سبزی", cat: "خورشت", cal: 175, p: 6, c: 20, f: 8 },
        { name: "خورشت قیمه", cat: "خورشت", cal: 185, p: 7, c: 22, f: 8 },
        { name: "خورشت فسنجان", cat: "خورشت", cal: 270, p: 8, c: 18, f: 19 },
        { name: "خورشت بادمجان", cat: "خورشت", cal: 160, p: 4, c: 15, f: 10 },
        { name: "زرشک پلو با مرغ", cat: "پلو", cal: 195, p: 11, c: 22, f: 6 },
        { name: "عدس پلو", cat: "پلو", cal: 175, p: 7, c: 26, f: 4 },
        { name: "لوبیا پلو", cat: "پلو", cal: 180, p: 7, c: 25, f: 5 },
        { name: "باقالی پلو با گوشت", cat: "پلو", cal: 215, p: 12, c: 24, f: 8 },
        { name: "آبگوشت / دیزی", cat: "سنتی", cal: 210, p: 12, c: 15, f: 11 },
        { name: "آش رشته", cat: "آش", cal: 140, p: 5, c: 20, f: 4 },
        { name: "کشک بادمجان", cat: "سنتی", cal: 165, p: 5, c: 10, f: 12 },
        { name: "کوکو سبزی", cat: "کوکو", cal: 190, p: 6, c: 8, f: 15 },
        { name: "کوکو سیب‌زمینی", cat: "کوکو", cal: 210, p: 4, c: 22, f: 12 },
        { name: "کتلت گوشت", cat: "سنتی", cal: 240, p: 12, c: 14, f: 15 },
        { name: "کتلت مرغ", cat: "سنتی", cal: 210, p: 15, c: 10, f: 11 },
        { name: "سیب درختی", cat: "میوه", cal: 52, p: 0.3, c: 14, f: 0.2 },
        { name: "سیب سرخ", cat: "میوه", cal: 54, p: 0.3, c: 14, f: 0.2 },
        { name: "سیب سبز", cat: "میوه", cal: 50, p: 0.3, c: 13, f: 0.2 },
        { name: "موز", cat: "میوه", cal: 89, p: 1.1, c: 23, f: 0.3 },
        { name: "پرتقال", cat: "میوه", cal: 47, p: 0.9, c: 12, f: 0.1 },
        { name: "خیار", cat: "میوه / سبزی", cal: 15, p: 0.7, c: 3.6, f: 0.1 },
        { name: "گوجه فرنگی", cat: "میوه / سبزی", cal: 18, p: 0.9, c: 3.9, f: 0.2 },
        { name: "هندوانه", cat: "میوه", cal: 30, p: 0.6, c: 8, f: 0.2 },
        { name: "خرما", cat: "میوه خشک", cal: 277, p: 1.8, c: 75, f: 0.2 },
        { name: "ماهی قزل‌آلا", cat: "ماهی", cal: 148, p: 20, c: 0, f: 7 },
        { name: "ماهی سالمون", cat: "ماهی", cal: 208, p: 20, c: 0, f: 13 },
        { name: "ماهی شیر", cat: "ماهی", cal: 125, p: 19, c: 0, f: 5 },
        { name: "ماهی تیلاپیا", cat: "ماهی", cal: 128, p: 26, c: 0, f: 2.6 },
        { name: "تن ماهی در روغن", cat: "کنسرو", cal: 198, p: 24, c: 0, f: 11 },
        { name: "گوشت گوسفندی", cat: "گوشت", cal: 225, p: 18, c: 0, f: 16 },
        { name: "گوشت گوساله", cat: "گوشت", cal: 170, p: 24, c: 0, f: 8 },
        { name: "سینه مرغ", cat: "پروتئین", cal: 165, p: 31, c: 0, f: 3.6 },
        { name: "ران مرغ", cat: "پروتئین", cal: 209, p: 24, c: 0, f: 12 },
        { name: "پیتزا مخلوط", cat: "فست فود", cal: 266, p: 11, c: 30, f: 11 },
        { name: "همبرگر", cat: "فست فود", cal: 250, p: 13, c: 24, f: 11 },
        { name: "ساندویچ فلافل", cat: "فست فود", cal: 220, p: 7, c: 32, f: 8 },
        { name: "سیب زمینی سرخ‌کرده", cat: "فست فود", cal: 312, p: 3.4, c: 41, f: 15 },
        { name: "نان سنگک", cat: "نان", cal: 259, p: 9, c: 52, f: 1.5 },
        { name: "نان بربری", cat: "نان", cal: 265, p: 8.5, c: 54, f: 1.5 },
        { name: "نان لواش", cat: "نان", cal: 290, p: 9, c: 58, f: 1.2 },
        { name: "نان تافتون", cat: "نان", cal: 280, p: 8.8, c: 56, f: 1.4 },
        { name: "برنج سفید", cat: "غلات", cal: 130, p: 2.7, c: 28, f: 0.3 },
        { name: "تخم مرغ", cat: "پروتئین", cal: 155, p: 13, c: 1.1, f: 11 },
        { name: "پسته", cat: "آجیل", cal: 562, p: 20, c: 28, f: 45 },
        { name: "گردو", cat: "آجیل", cal: 654, p: 15, c: 14, f: 65 },
        { name: "بادام", cat: "آجیل", cal: 579, p: 21, c: 22, f: 49 },
        { name: "شیر", cat: "لبنیات", cal: 42, p: 3.4, c: 5, f: 1.5 },
        { name: "ماست", cat: "لبنیات", cal: 59, p: 3.5, c: 4.7, f: 3.3 },
        { name: "پنیر سفید", cat: "لبنیات", cal: 260, p: 14, c: 2, f: 21 }
    ];

    const qualities = [
        "خانگی", "رژیمی", "پرچرب", "کم‌چرب", "با روغن زیتون", "گریل شده", 
        "تنوری", "ویژه", "بدون قند", "ارگانیک", "دوبل", "ساده", "با پنیر", 
        "با قارچ", "سرخ شده", "بخارپز", "کبابی", "زعفرانی", "تند", "آب‌پز"
    ];

    const portions = [
        "یک سهم", "یک بشقاب", "یک پرس", "یک عدد", "یک لیوان", "۱۰۰ گرم",
        "کوچک", "متوسط", "بزرگ", "دست‌ساز", "شرکتی", "رستورانی"
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
        count++;
        list.push({
            name: b.name,
            searchKey: fixPersian(b.name),
            category: b.cat,
            cal: b.cal,
            p: b.p, c: b.c, f: b.f
        });

        for (let q of qualities) {
            for (let p of portions) {
                count++;
                let fullName = `${b.name} ${q} (${p})`;
                list.push({
                    name: fullName,
                    searchKey: fixPersian(fullName),
                    category: b.cat,
                    cal: Math.max(10, Math.round(b.cal + (count % 15) - 7)),
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

function checkAndResetDailyData() {
    const currentToday = getTodayString();
    if (todayData.date !== currentToday) {
        todayData = {
            date: currentToday,
            consumed: 0,
            burned: 0,
            water: 0
        };
        localStorage.setItem('cal_today_data', JSON.stringify(todayData));
    }
}

function initApp() {
    checkAndResetDailyData();

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

function analyzeWeightStatus(weight, height) {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    const minIdealWeight = Math.round(18.5 * heightInMeters * heightInMeters);
    const maxIdealWeight = Math.round(24.9 * heightInMeters * heightInMeters);

    let status = '';
    let advice = '';

    if (bmi < 18.5) {
        status = 'کمبود وزن (لاغر)';
        const diff = minIdealWeight - weight;
        advice = `شما حدوداً به **${diff} کیلوگرم** افزایش وزن نیاز دارید تا به وزن نرمال (${minIdealWeight} کیلوگرم) برسید.`;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = 'وزن نرمال و ایده‌آل';
        advice = `وزن شما کاملاً ایده‌آل است! (محدوده مناسب برای قد شما: ${minIdealWeight} تا ${maxIdealWeight} کیلوگرم).`;
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = 'اضافه وزن';
        const diff = weight - maxIdealWeight;
        advice = `شما حدوداً باید **${diff} کیلوگرم** کاهش وزن داشته باشید تا به حد بالای وزن نرمال (${maxIdealWeight} کیلوگرم) برسید.`;
    } else {
        status = 'چاقی';
        const diff = weight - maxIdealWeight;
        advice = `شما در محدوده چاقی هستید و بهتر است **${diff} کیلوگرم** وزن کم کنید تا به وزن ایده‌آل (${maxIdealWeight} کیلوگرم) برسید.`;
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

    if (isNaN(tdee) || tdee <= 0) tdee = 2000;

    userState.tdee = tdee;
    localStorage.setItem('cal_user_state', JSON.stringify(userState));
    return tdee;
}

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
    document.getElementById('modal-onboarding').style.display = 'none';
    updateProfileInputs();
    updateDashboard();

    const analysis = analyzeWeightStatus(weight, height);
    alert(`📊 تحلیل وضعیت بدنی شما:\n\nشاخص BMI شما: ${analysis.bmi}\nوضعیت: ${analysis.status}\n\n💡 ${analysis.advice.replace(/\*\*/g, '')}`);
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
    updateDashboard();

    const analysis = analyzeWeightStatus(weight, height);
    alert(`بروزرسانی شد!\n\n📊 شاخص BMI: ${analysis.bmi} (${analysis.status})\n💡 ${analysis.advice.replace(/\*\*/g, '')}`);
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
    const rawVal = document.getElementById('food-search').value;
    const q = fixPersian(rawVal);
    
    if (!q) {
        renderLocalFoods(localFoodsList.slice(0, 30));
        return;
    }

    let matches = [];
    for (let i = 0; i < localFoodsList.length; i++) {
        if (localFoodsList[i].searchKey.includes(q)) {
            matches.push(localFoodsList[i]);
            if (matches.length >= 50) break;
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
    const rawVal = document.getElementById('workout-search').value;
    const q = fixPersian(rawVal);
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

// ثبت آیتم با افزودن منطق تشویق و انگیزشی
function confirmAddItem() {
    const amount = parseFloat(document.getElementById('modal-item-amount').value) || 0;
    if(amount <= 0) return;

    let msg = "";

    if(isWorkoutMode) {
        const burned = Math.round(selectedItemForAdd.val * amount);
        todayData.burned += burned;

        // پیام تشویقی ورزشی
        msg = `🔥 عالی بود! ${burned} کالری سوزانده شد.\nآفرین به اراده شما برای تمرین امروز! 💪`;

        if (todayData.burned > todayData.consumed && todayData.consumed > 0) {
            msg += `\n\n🌟 فوق‌العاده‌ای! امروز میزان کالری‌سوزی شما حتی از کالری دریافتی بیشتر شده است! بابت این اراده تحسین‌برانگیز متشکریم.`;
        }
    } else {
        const consumed = Math.round((selectedItemForAdd.val / 100) * amount);
        todayData.consumed += consumed;

        msg = `✅ ${consumed} کالری دریافت شده ثبت شد.`;

        // پیام تشویقی تغذیه‌ای
        const target = userState ? userState.tdee : 2000;
        if (todayData.consumed <= target && (target - todayData.consumed) > 300) {
            msg += `\n\n🎯 عالی داری پیش می‌ری! همچنان مدیریت کالری خوبی داری و از سقف مجاز روزانه‌ات فاصله‌ی سالمی داری.`;
        }
    }

    updateDashboard();
    closeModal('modal-item');
    alert(msg);
    switchTab('dashboard', document.querySelectorAll('.nav-item')[0]);
}

window.onload = initApp;
