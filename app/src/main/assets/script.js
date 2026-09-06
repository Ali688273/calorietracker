let foodsData = [];
let selectedCategory = 'همه';

document.addEventListener("DOMContentLoaded", () => {
    fetch('foods.json')
        .then(response => response.json())
        .then(data => {
            foodsData = data;
            renderFoods(foodsData);
        })
        .catch(error => console.error("خطا در بارگذاری دیتابیس:", error));

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
});

function renderFoods(foods) {
    const foodListContainer = document.getElementById('foodList');
    foodListContainer.innerHTML = '';

    // رندر حداکثر ۵۰ مورد در مرحله اول جهت حفظ سرعت و روانی برنامه
    const limitedFoods = foods.slice(0, 50);

    if (limitedFoods.length === 0) {
        foodListContainer.innerHTML = '<p style="text-align:center; color:#888;">هیچ غذایی یافت نشد.</p>';
        return;
    }

    limitedFoods.forEach(food => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-info">
                <h4>${food.name}</h4>
                <p>کالری: ${food.calories} | پروتئین: ${food.protein}g | کربوهیدرات: ${food.carbs}g (${food.unit})</p>
            </div>
            <button class="add-btn" onclick="selectFood(${food.id})">+ ثبت</button>
        `;
        foodListContainer.appendChild(card);
    });
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    const filtered = foodsData.filter(food => {
        const matchesCategory = (selectedCategory === 'همه' || food.category === selectedCategory);
        const matchesSearch = food.name.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    renderFoods(filtered);
}

function filterCategory(category) {
    selectedCategory = category;
    
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        if (btn.innerText.trim() === category.trim()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    handleSearch();
}

function selectFood(id) {
    const food = foodsData.find(f => f.id === id);
    if (food) {
        alert(`«${food.name}» با موفقیت ثبت شد.`);
    }
}
