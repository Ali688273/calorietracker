let foodsData = [];
let selectedCategory = 'همه';
let userProfile = { gender: 'male', age: 25, height: 175, weight: 70, goal: 'maintain', targetCal: 2000 };
let todayLogs = [];

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadTodayLogs();

    fetch('foods.json')
        .then(res => res.json())
        .then(data => {
            foodsData = data;
            renderFoods(foodsData);
        })
        .catch(err => console.error("Error loading foods:", err));

    document.getElementById('searchInput').addEventListener('input', handleSearch);
});

function switchTab(tabName, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    btn.classList.add('active');
}

function renderFoods(foods) {
    const container = document.getElementById('foodList');
    container.innerHTML = '';
    const limited = foods.slice(0, 50);

    if (limited.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">غذایی یافت نشد.</p>';
        return;
    }

    limited.forEach(food => {
        const item = document.createElement('div');
        item.className = 'food-item';
        item.innerHTML = `
            <div class="food-info">
                <h4>${food.name}</h4>
                <p>کالری: ${food.calories} | پ: ${food.protein}g | ک: ${food.carbs}g | چ: ${food.fat}g (${food.unit})</p>
            </div>
            <button class="btn" onclick="addFoodToToday(${food.id})">+ ثبت</button>
        `;
        container.appendChild(item);
    });
}

function handleSearch() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const filtered = foodsData.filter(f => {
        const matchCat = (selectedCategory === 'همه' || f.category === selectedCategory);
        const matchSearch = f.name.toLowerCase().includes(q);
        return matchCat && matchSearch;
    });
    renderFoods(filtered);
}

function filterCategory(cat) {
    selectedCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => {
        if (b.innerText.trim() === cat.trim()) b.classList.add('active');
        else b.classList.remove('active');
    });
    handleSearch();
}

function saveProfile() {
    userProfile.gender = document.getElementById('gender').value;
    userProfile.age = parseInt(document.getElementById('age').value) || 25;
    userProfile.height = parseInt(document.getElementById('height').value) || 175;
    userProfile.weight = parseInt(document.getElementById('weight').value) || 70;
    userProfile.goal = document.getElementById('goal').value;

    // فرمول BMR مِفلین-جئور
    let bmr = (10 * userProfile.weight) + (6.25 * userProfile.height) - (5 * userProfile.age);
    bmr += (userProfile.gender === 'male') ? 5 : -161;
    let tdee = bmr * 1.375; // فعالیت متوسط

    if (userProfile.goal === 'lose') tdee -= 400;
    else if (userProfile.goal === 'gain') tdee += 400;

    userProfile.targetCal = Math.round(tdee);
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    updateUI();
    alert('پروفایل و هدف کالری شما با موفقیت محاسبه و ذخیره شد.');
}

function loadProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        userProfile = JSON.parse(saved);
        document.getElementById('gender').value = userProfile.gender;
        document.getElementById('age').value = userProfile.age;
        document.getElementById('height').value = userProfile.height;
        document.getElementById('weight').value = userProfile.weight;
        document.getElementById('goal').value = userProfile.goal;
    }
    updateUI();
}

function addFoodToToday(id) {
    const food = foodsData.find(f => f.id === id);
    if (food) {
        todayLogs.push({ ...food, logId: Date.now() });
        localStorage.setItem('todayLogs', JSON.stringify(todayLogs));
        updateUI();
        alert(`«${food.name}» به لیست امروز اضافه شد.`);
    }
}

function removeLog(logId) {
    todayLogs = todayLogs.filter(l => l.logId !== logId);
    localStorage.setItem('todayLogs', JSON.stringify(todayLogs));
    updateUI();
}

function loadTodayLogs() {
    const saved = localStorage.getItem('todayLogs');
    if (saved) todayLogs = JSON.parse(saved);
    updateUI();
}

function updateUI() {
    document.getElementById('targetCal').innerText = userProfile.targetCal;
    const consumed = todayLogs.reduce((sum, item) => sum + item.calories, 0);
    document.getElementById('consumedCal').innerText = consumed;

    const remain = userProfile.targetCal - consumed;
    document.getElementById('remainCal').innerText = remain >= 0 ? `${remain} کالری باقی‌مانده` : `${Math.abs(remain)} کالری اضافه مصرف شده!`;

    const percent = Math.min(100, Math.round((consumed / userProfile.targetCal) * 100));
    document.getElementById('progressBar').style.width = `${percent}%`;

    const todayContainer = document.getElementById('todayList');
    todayContainer.innerHTML = '';

    if (todayLogs.length === 0) {
        todayContainer.innerHTML = '<p style="text-align:center; color:#888; font-size:12px;">هنوز چیزی ثبت نکرده‌اید.</p>';
        return;
    }

    todayLogs.forEach(item => {
        const div = document.createElement('div');
        div.className = 'food-item';
        div.innerHTML = `
            <div class="food-info">
                <h4>${item.name}</h4>
                <p>${item.calories} کالری | ${item.unit}</p>
            </div>
            <button class="btn btn-danger" onclick="removeLog(${item.logId})">حذف</button>
        `;
        todayContainer.appendChild(div);
    });
}
