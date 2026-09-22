/* CALORIE YAR - ECOSYSTEM PLUS PACK
 * Competitor-gap features + future cross-app sync foundation.
 * Works offline and keeps core logging independent.
 */
(function () {
  'use strict';

  const KEY = 'calorie_yar_ecosystem_plus_v1';
  const SYNC_VERSION = 1;

  const DIET_PLANS = [
    {id:'balanced',name:'متعادل',desc:'تقسیم متعادل کالری و درشت‌مغذی‌ها',delta:0},
    {id:'weight_loss',name:'کاهش وزن',desc:'کسری کالری ملایم نسبت به هدف پایه',delta:-300},
    {id:'weight_gain',name:'افزایش وزن',desc:'افزایش کالری کنترل‌شده نسبت به هدف پایه',delta:300},
    {id:'high_protein',name:'پروتئین بالا',desc:'تأکید بیشتر بر منابع پروتئینی',delta:0},
    {id:'low_carb',name:'کربوهیدرات کمتر',desc:'کاهش سهم کربوهیدرات و جایگزینی متعادل',delta:0},
    {id:'keto',name:'کتو',desc:'الگوی کم‌کربوهیدرات؛ مناسب استفاده آگاهانه و قابل تنظیم',delta:0},
    {id:'mediterranean',name:'مدیترانه‌ای',desc:'سبزیجات، حبوبات، غلات، ماهی و چربی‌های مفید',delta:0},
    {id:'iranian',name:'غذای ایرانی',desc:'الگوی پیشنهادی با غذاهای رایج ایرانی',delta:0},
    {id:'sports',name:'ورزشی',desc:'تمرکز روی سوخت‌رسانی و پروتئین برای روزهای فعال',delta:150}
  ];

  const MEAL_TEMPLATES = [
    {id:'iranian',name:'روز ایرانی',meals:['صبحانه ایرانی','ناهار برنج و خورشت','میان‌وعده میوه و مغزها','شام سبک']},
    {id:'high_protein',name:'پروتئین بالا',meals:['تخم‌مرغ و ماست','مرغ/گوشت کم‌چرب','ماست یونانی و مغزها','مرغ/ماهی و سبزیجات']},
    {id:'light',name:'روز سبک',meals:['صبحانه سبک','ناهار متعادل','میوه','شام سبک']},
    {id:'sports',name:'روز ورزشی',meals:['صبحانه انرژی‌زا','وعده قبل ورزش','وعده بعد ورزش','شام پروتئینی']}
  ];

  const state = loadState();

  function loadState() {
    try {
      return Object.assign({
        diet:'balanced',
        mealTemplate:'iranian',
        barcodeFoods:{},
        grocery:[],
        favorites:[],
        substitutions:[],
        syncedSteps:0,
        syncedExerciseCalories:0,
        lastSync:null,
        syncLog:[]
      }, JSON.parse(localStorage.getItem(KEY) || '{}'));
    } catch (_) {
      return {diet:'balanced',mealTemplate:'iranian',barcodeFoods:{},grocery:[],favorites:[],substitutions:[],syncedSteps:0,syncedExerciseCalories:0,lastSync:null,syncLog:[]};
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function readProfile() {
    try { return JSON.parse(localStorage.getItem('fit_user_data_v2') || '{}'); } catch (_) { return {}; }
  }

  function baseCalories() {
    const p = readProfile();
    const n = Number(p.bmr || p.calorieGoal || p.dailyCalories || 2000);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : 2000;
  }

  function render() {
    if (document.getElementById('cy-ecosystem-plus')) return;
    const host = document.getElementById('tab-dashboard') || document.querySelector('.container');
    if (!host) return;

    const box = document.createElement('div');
    box.id = 'cy-ecosystem-plus';
    box.innerHTML = `
      <div class="card cyep-card">
        <div class="card-title">🚀 امکانات پیشرفته کالری‌یار</div>
        <div class="cyep-grid">
          <button onclick="CYEP.openPlans()">🥗 برنامه‌های غذایی</button>
          <button onclick="CYEP.openMeals()">🍽️ برنامه وعده‌ها</button>
          <button onclick="CYEP.openFoodTools()">🔎 ابزار غذا</button>
          <button onclick="CYEP.openSync()">🔗 همگام‌سازی</button>
          <button onclick="CYEP.openGrocery()">🛒 لیست خرید</button>
          <button onclick="CYEP.openGoals()">🎯 اهداف پیشرفته</button>
        </div>
        <div class="cyep-mini">نسخه آماده برای اتصال آینده به «قدمینو» و «آشپزباشی»</div>
      </div>`;
    host.appendChild(box);
  }

  function modal(title, body) {
    let m = document.getElementById('cyep-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'cyep-modal';
      m.className = 'modal';
      document.body.appendChild(m);
    }
    m.innerHTML = `<div class="modal-content cyep-modal-content">
      <div class="cyep-head"><h3>${esc(title)}</h3><button class="btn btn-sub" onclick="CYEP.close()">بستن</button></div>
      <div>${body}</div>
    </div>`;
    m.style.display='flex';
  }

  function close(){ const m=document.getElementById('cyep-modal'); if(m) m.style.display='none'; }

  function openPlans() {
    const html = DIET_PLANS.map(p => `
      <button class="cyep-option ${state.diet===p.id?'selected':''}" onclick="CYEP.setDiet('${p.id}')">
        <b>${esc(p.name)}</b><span>${esc(p.desc)}</span>
      </button>`).join('');
    modal('برنامه غذایی', `<div class="cyep-note">این الگوها ابزار برنامه‌ریزی هستند و جایگزین توصیه پزشکی نیستند.</div><div class="cyep-list">${html}</div>`);
  }

  function setDiet(id) {
    const p=DIET_PLANS.find(x=>x.id===id); if(!p)return;
    state.diet=id; save();
    alert('الگوی «'+p.name+'» انتخاب شد.');
    openPlans();
  }

  function openMeals() {
    const html=MEAL_TEMPLATES.map(p=>`
      <button class="cyep-option ${state.mealTemplate===p.id?'selected':''}" onclick="CYEP.setMealTemplate('${p.id}')">
        <b>${esc(p.name)}</b><span>${p.meals.map(esc).join(' • ')}</span>
      </button>`).join('');
    modal('برنامه وعده‌ها', html);
  }

  function setMealTemplate(id) {
    if(!MEAL_TEMPLATES.some(x=>x.id===id))return;
    state.mealTemplate=id; save(); openMeals();
  }

  function openFoodTools() {
    const list=Object.entries(state.barcodeFoods);
    modal('ابزار غذا', `
      <div class="cyep-section"><b>📷 آماده برای بارکد</b><p>شماره بارکد را وارد کنید تا برای آن غذا رکورد محلی بسازید. اتصال دوربین و دیتابیس آنلاین در بسته اسکنر نهایی اضافه می‌شود.</p>
      <input id="cyep-barcode" class="search-box" placeholder="مثلاً 6261234567890" inputmode="numeric">
      <input id="cyep-barname" class="search-box" placeholder="نام غذا">
      <input id="cyep-barcal" class="search-box" placeholder="کالری در 100 گرم" type="number">
      <button class="btn" style="width:100%" onclick="CYEP.saveBarcode()">ذخیره غذای بارکدی</button></div>
      <div class="cyep-section"><b>⭐ غذاهای ذخیره‌شده</b><div class="cyep-mini">${list.length?list.map(([k,v])=>esc(k)+' → '+esc(v.name)+' ('+esc(v.cal)+' kcal)').join('<br>'):'هنوز موردی ثبت نشده'}</div></div>`);
  }

  function saveBarcode() {
    const code=(document.getElementById('cyep-barcode')||{}).value?.trim();
    const name=(document.getElementById('cyep-barname')||{}).value?.trim();
    const cal=Number((document.getElementById('cyep-barcal')||{}).value);
    if(!/^\d{6,20}$/.test(code)||!name||!Number.isFinite(cal)||cal<=0){alert('بارکد، نام و کالری معتبر وارد کنید.');return;}
    state.barcodeFoods[code]={name,cal,createdAt:new Date().toISOString()};
    if(!state.favorites.includes(name))state.favorites.unshift(name);
    save(); openFoodTools();
  }

  function openGrocery() {
    const items=state.grocery.map((x,i)=>`
      <div class="cyep-grocery"><label><input type="checkbox" ${x.done?'checked':''} onchange="CYEP.toggleGrocery(${i})"> ${esc(x.name)}</label><button class="btn btn-sub" onclick="CYEP.removeGrocery(${i})">حذف</button></div>`).join('');
    modal('لیست خرید',`
      <div class="cyep-row"><input id="cyep-grocery-input" class="search-box" placeholder="مثلاً مرغ، برنج، ماست"><button class="btn" onclick="CYEP.addGrocery()">افزودن</button></div>
      <div class="cyep-list">${items||'<div class="cyep-mini">لیست خرید خالی است.</div>'}</div>
      <button class="btn btn-sub" style="width:100%" onclick="CYEP.clearGrocery()">پاک‌کردن موارد انجام‌شده</button>`);
  }

  function addGrocery() {
    const el=document.getElementById('cyep-grocery-input'); const name=el?.value.trim(); if(!name)return;
    state.grocery.push({name,done:false}); save(); openGrocery();
  }
  function toggleGrocery(i){if(state.grocery[i])state.grocery[i].done=!state.grocery[i].done;save();openGrocery();}
  function removeGrocery(i){state.grocery.splice(i,1);save();openGrocery();}
  function clearGrocery(){state.grocery=state.grocery.filter(x=>!x.done);save();openGrocery();}

  function makeSyncPacket() {
    const p=readProfile();
    return {
      protocol:'calorie-yar-health-ecosystem',
      version:SYNC_VERSION,
      exportedAt:new Date().toISOString(),
      source:'calorieyar',
      profile:{gender:p.gender||null,age:p.age||null,height:p.height||null,weight:p.weight||null,activity:p.activity||null},
      calorie:{goal:p.calorieGoal||p.dailyCalories||null},
      water:{glasses:p.water||0,targetGlasses:8,glassMl:250},
      steps:{count:state.syncedSteps,source:'ghadmino-pending'},
      exercise:{calories:state.syncedExerciseCalories,source:'ghadmino-pending'},
      diet:{selected:state.diet,mealTemplate:state.mealTemplate},
      favorites:state.favorites.slice(0,100),
      barcodeFoods:Object.keys(state.barcodeFoods).slice(0,500),
      recipes:{source:'ashpaz-bashi-pending'},
      metadata:{syncReady:true,conflictPolicy:'latest-valid-record'}
    };
  }

  function openSync() {
    modal('همگام‌سازی بین برنامه‌ها',`
      <div class="cyep-sync">
        <div class="cyep-sync-card"><b>👟 قدمینو</b><span>قدم‌ها، فعالیت روزانه و کالری فعالیت → کالری‌یار</span></div>
        <div class="cyep-sync-card"><b>👨‍🍳 آشپزباشی</b><span>دستور غذا، مواد اولیه و کالری هر وعده → کالری‌یار</span></div>
        <div class="cyep-sync-card"><b>🔄 کالری‌یار</b><span>هدف کالری، آب، وزن، وعده‌ها و پیشرفت → مرکز سلامت مشترک</span></div>
        <button class="btn" style="width:100%;margin-top:10px" onclick="CYEP.exportSync()">خروجی استاندارد همگام‌سازی</button>
        <input id="cyep-sync-file" type="file" accept="application/json" style="margin-top:10px;width:100%" onchange="CYEP.importSync(this)">
        <div class="cyep-mini">فعلاً آفلاین است؛ این قرارداد داده برای اتصال واقعی سه برنامه در بسته Sync نهایی آماده شده است.</div>
      </div>`);
  }

  function exportSync() {
    const blob=new Blob([JSON.stringify(makeSyncPacket(),null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='calorieyar-sync-v1.json'; a.click();
    URL.revokeObjectURL(a.href);
    state.lastSync=new Date().toISOString(); state.syncLog.unshift({type:'export',at:state.lastSync}); save();
  }

  function importSync(input) {
    const file=input?.files?.[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{
      try{
        const data=JSON.parse(reader.result);
        if(data.protocol!=='calorie-yar-health-ecosystem'||data.version!==SYNC_VERSION)throw new Error('version');
        if(data.steps&&Number.isFinite(Number(data.steps.count)))state.syncedSteps=Number(data.steps.count);
        if(data.exercise&&Number.isFinite(Number(data.exercise.calories)))state.syncedExerciseCalories=Number(data.exercise.calories);
        if(Array.isArray(data.favorites))state.favorites=[...new Set([...state.favorites,...data.favorites])].slice(0,100);
        state.lastSync=new Date().toISOString(); state.syncLog.unshift({type:'import',at:state.lastSync,source:data.source||'unknown'}); save();
        alert('داده همگام‌سازی با موفقیت وارد شد.');
        openSync();
      }catch(_){alert('فایل همگام‌سازی معتبر کالری‌یار نیست.');}
    };
    reader.readAsText(file);
  }

  function openGoals() {
    const p=readProfile();
    const c=baseCalories();
    const selected=DIET_PLANS.find(x=>x.id===state.diet)||DIET_PLANS[0];
    modal('اهداف پیشرفته',`
      <div class="cyep-goal"><b>کالری پایه</b><strong>${c}</strong><small>kcal/day</small></div>
      <div class="cyep-goal"><b>الگوی فعال</b><strong>${esc(selected.name)}</strong></div>
      <div class="cyep-goal"><b>آب</b><strong>8 لیوان / 2000 ml</strong></div>
      <div class="cyep-goal"><b>قدمینو</b><strong>${state.syncedSteps.toLocaleString('fa-IR')}</strong><small>قدم همگام‌شده</small></div>
      <div class="cyep-goal"><b>فعالیت</b><strong>${state.syncedExerciseCalories}</strong><small>kcal همگام‌شده</small></div>
      <div class="cyep-note">اهداف تغذیه‌ای قابل تنظیم‌اند؛ مقادیر باید بر اساس مشخصات و نیاز واقعی کاربر تنظیم شوند.</div>`);
  }

  window.CYEP={openPlans,setDiet,openMeals,setMealTemplate,openFoodTools,saveBarcode,openGrocery,addGrocery,toggleGrocery,removeGrocery,clearGrocery,openSync,exportSync,importSync,openGoals,close};

  const style=document.createElement('style');
  style.textContent=`
    .cyep-card{margin-top:14px}.cyep-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.cyep-grid button,.cyep-option{border:1px solid var(--border);background:var(--bg-main);color:var(--text-main);border-radius:12px;padding:11px;font-family:inherit;text-align:center}.cyep-grid button:active,.cyep-option.selected{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}.cyep-mini{color:var(--text-sub);font-size:.72rem;margin-top:8px;line-height:1.6}.cyep-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px}.cyep-head h3{font-size:1rem}.cyep-list{display:grid;gap:8px;max-height:52vh;overflow:auto}.cyep-option{display:flex;flex-direction:column;gap:5px;text-align:right}.cyep-option span{font-size:.74rem;color:var(--text-sub);line-height:1.5}.cyep-note{font-size:.74rem;color:var(--text-sub);line-height:1.6;padding:10px;border:1px dashed var(--border);border-radius:10px;margin-bottom:10px}.cyep-section{margin-bottom:12px}.cyep-section p{font-size:.75rem;color:var(--text-sub);line-height:1.6;margin:6px 0}.cyep-row{display:flex;gap:6px}.cyep-row .search-box{margin:0;flex:1}.cyep-grocery{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;border-bottom:1px solid var(--border)}.cyep-sync{display:grid;gap:8px}.cyep-sync-card{padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--bg-main)}.cyep-sync-card b{display:block;margin-bottom:4px}.cyep-sync-card span{font-size:.74rem;color:var(--text-sub);line-height:1.5}.cyep-goal{display:flex;align-items:center;justify-content:space-between;padding:11px;border-bottom:1px solid var(--border);gap:8px}.cyep-goal strong{color:var(--accent)}.cyep-goal small{color:var(--text-sub)}@media(max-width:380px){.cyep-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  function boot(){render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();