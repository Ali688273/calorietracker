/* CalorieYar — Free / PRO / Coins Economy */
(function(){
'use strict';
if(window.__CY_ECONOMY__)return;
window.__CY_ECONOMY__=true;

const KEY='calorie_yar_economy_v2';
const PRO_PRICE_TOMAN=200000;
const PRO_COIN_COST=6000;
const COIN_PACKS=[
  {id:'coins_500',coins:500,price:25000,label:'۵۰۰ سکه'},
  {id:'coins_1200',coins:1200,price:50000,label:'۱۲۰۰ سکه'},
  {id:'coins_3000',coins:3000,price:100000,label:'۳۰۰۰ سکه'}
];

let st={
  tier:'free',
  coins:0,
  spent:0,
  purchases:[],
  features:{}
};
try{st=Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>localStorage.setItem(KEY,JSON.stringify(st));

// رسیدن به سقف سکه، PRO را به‌صورت دائمی و بدون پرداخت فعال می‌کند.
// بعد از فعال‌شدن، خرج‌کردن سکه‌ها PRO را غیرفعال نمی‌کند.
function checkCoinProUnlock(){
  if(st.tier==='pro')return false;
  if(Number(st.coins||0)>=PRO_COIN_COST){
    st.tier='pro';
    st.proUnlockedByCoins=true;
    st.proUnlockedAt=new Date().toISOString();
    save();
    return true;
  }
  return false;
}
checkCoinProUnlock();

function tx(amount,reason){
  st.coins=Math.max(0,st.coins+amount);
  checkCoinProUnlock();
  st.purchases.push({
    type:amount>=0?'earn':'spend',
    amount:Math.abs(amount),
    reason,
    date:new Date().toISOString()
  });
  if(st.purchases.length>100)st.purchases=st.purchases.slice(-100);
  save();
}

function purchaseRequest(type,id){
  const event=new CustomEvent('calorieyar-purchase-request',{
    detail:{type,id,proPriceToman:PRO_PRICE_TOMAN,coinPacks:COIN_PACKS}
  });
  window.dispatchEvent(event);
  alert('درخواست خرید ثبت شد. در مرحله انتشار، این نقطه به درگاه پرداخت معتبر بازار هدف متصل می‌شود.');
}

window.cyEconomy={
  get:()=>({...st,proPriceToman:PRO_PRICE_TOMAN,proCoinCost:PRO_COIN_COST,coinPacks:COIN_PACKS}),
  earn:(x,r)=>tx(Math.max(0,Number(x)||0),r||'reward'),
  spend:(x,r)=>{
    x=Math.max(0,Number(x)||0);
    if(st.coins<x)return false;
    tx(-x,r||'purchase');
    return true;
  },
  isPro:()=>st.tier==='pro',
  purchasePro:()=>purchaseRequest('pro','pro'),
  purchaseCoins:(id)=>purchaseRequest('coins',id),
  unlockProWithCoins:()=>{
    checkCoinProUnlock();
    if(st.tier==='pro'){ open(); return true; }
    alert('برای فعال‌سازی دائمی PRO باید '+PRO_COIN_COST.toLocaleString('fa-IR')+' سکه جمع کرده باشید.');
    return false;
  },
  setPro:(enabled)=>{
    st.tier=enabled?'pro':'free';
    save();
    open();
  }
};

function open(){
  let m=document.getElementById('cy-economy-modal');
  if(!m){
    m=document.createElement('div');
    m.id='cy-economy-modal';
    m.className='modal';
    m.innerHTML=
      '<div class="modal-content" style="max-height:88vh;overflow:auto">'+
      '<h3>💎 نسخه رایگان، PRO و سکه‌ها</h3>'+
      '<div class="card"><b>نسخه فعلی: '+(st.tier==='pro'?'PRO 💎':'رایگان 🆓')+'</b>'+
      '<div style="font-size:1.6rem;color:var(--accent);margin:8px 0">'+st.coins+' 🪙</div>'+
      '<small style="color:var(--text-sub)">هسته اصلی برنامه رایگان است. با جمع‌کردن '+PRO_COIN_COST.toLocaleString('fa-IR')+' سکه، PRO به‌صورت دائمی و رایگان فعال می‌شود.</small></div>'+
      '<div class="card"><b>PRO 💎</b>'+
      '<p style="font-size:.78rem;color:var(--text-sub);margin:7px 0">تحلیل‌های پیشرفته، گزارش‌های عمیق، شخصی‌سازی بیشتر، امکانات حرفه‌ای آینده و حذف تبلیغات.</p>'+
      '<b>'+PRO_PRICE_TOMAN.toLocaleString('fa-IR')+' تومان</b>'+\n      '<p style="font-size:.75rem;color:var(--text-sub);margin:6px 0">یا '+PRO_COIN_COST.toLocaleString('fa-IR')+' سکه برای فعال‌سازی دائمی PRO</p>'+
      '<button class="btn" style="width:100%;margin-top:8px" onclick="cyEconomy.purchasePro()">خرید PRO</button>'+\n      '<button class="btn btn-sub" style="width:100%;margin-top:7px" onclick="cyEconomy.unlockProWithCoins()">فعال‌سازی PRO با سکه</button></div>'+
      '<div class="card"><b>🪙 بسته‌های سکه</b><div id="cy-coin-packs" style="margin-top:8px"></div></div>'+
      '<div class="card"><b>روش‌های دریافت رایگان</b><p style="font-size:.75rem;color:var(--text-sub);margin-top:7px">ماموریت‌ها، استمرار، دستاوردها و در آینده تبلیغ جایزه‌ای می‌توانند سکه ایجاد کنند. سکه‌ها سقف زمانی ندارند و با ادامه استفاده جمع می‌شوند؛ پس کاربری که ماه‌ها یا حتی یک سال فعال بماند، می‌تواند با رسیدن به ۶۰۰۰ سکه PRO را دائمی باز کند.</p></div>'+
      '<div class="card"><b>تاریخچه تراکنش‌ها</b><div id="cy-econ-log" style="margin-top:8px"></div></div>'+
      '<div class="modal-actions"><button class="btn btn-sub" onclick="document.getElementById(\'cy-economy-modal\').style.display=\'none\'">بستن</button></div>'+
      '</div>';
    document.body.appendChild(m);
  }
  const packs=document.getElementById('cy-coin-packs');
  if(packs)packs.innerHTML=COIN_PACKS.map(p=>
    '<div style="display:flex;gap:7px;align-items:center;margin-bottom:7px">'+
    '<span style="flex:1;font-size:.8rem">'+p.label+' — '+p.price.toLocaleString('fa-IR')+' تومان</span>'+
    '<button class="btn" onclick="cyEconomy.purchaseCoins(\''+p.id+'\')">خرید</button></div>'
  ).join('');
  const log=(st.purchases||[]).slice(-8).reverse().map(x=>
    '<div style="padding:5px 0;border-bottom:1px solid var(--border);font-size:.7rem">'+
    (x.type==='earn'?'+':'-')+x.amount+' 🪙 · '+x.reason+'</div>'
  ).join('');
  const logEl=document.getElementById('cy-econ-log');
  if(logEl)logEl.innerHTML=log||'هنوز تراکنشی ثبت نشده.';
  m.style.display='flex';
}

/* === Coin Feature Unlocks === */
const FEATURE_UNLOCKS=[
  {id:'theme_ocean',cost:100,title:'تم اقیانوس',desc:'رنگ‌بندی آبی برای شخصی‌سازی برنامه.'},
  {id:'advanced_reports',cost:250,title:'گزارش‌های پیشرفته',desc:'گزارش‌های عمیق‌تر از روند کالری و عملکرد.'},
  {id:'extended_stats',cost:500,title:'آمار گسترده',desc:'دسترسی به تحلیل‌ها و بازه‌های آماری بیشتر.'},
  {id:'meal_planner_plus',cost:750,title:'برنامه غذایی پیشرفته',desc:'قابلیت‌های پیشرفته‌تر برنامه‌ریزی وعده‌ها.'},
  {id:'nutrition_plus',cost:1000,title:'تحلیل تغذیه پیشرفته',desc:'تحلیل‌های تکمیلی مواد مغذی و پیشنهادها.'},
  {id:'goal_plus',cost:1500,title:'اهداف حرفه‌ای',desc:'تنظیمات پیشرفته هدف، کالری و درشت‌مغذی‌ها.'},
  {id:'planning_plus',cost:2000,title:'بسته برنامه‌ریزی حرفه‌ای',desc:'قابلیت‌های حرفه‌ای برنامه‌ریزی و پیگیری.'},
  {id:'analytics_plus',cost:3000,title:'تحلیل و گزارش کامل',desc:'بسته کامل تحلیل و گزارش‌های پیشرفته.'},
  {id:'pro_plus',cost:4000,title:'بسته ویژه PRO',desc:'مجموعه‌ای از چند قابلیت ویژه.'}
];

function featureUnlocked(id){return st.tier==='pro'||!!(st.features&&st.features[id]);}
function unlockFeature(id){
  const f=FEATURE_UNLOCKS.find(x=>x.id===id);
  if(!f||featureUnlocked(id))return true;
  if(Number(st.coins||0)<f.cost){alert('برای باز کردن «'+f.title+'» به '+f.cost.toLocaleString('fa-IR')+' سکه نیاز دارید.');return false;}
  st.coins-=f.cost;
  st.spent=(Number(st.spent)||0)+f.cost;
  st.features=st.features||{};
  st.features[id]={title:f.title,cost:f.cost,unlockedAt:new Date().toISOString()};
  st.purchases=st.purchases||[];
  st.purchases.push({type:'spend',amount:f.cost,reason:'باز کردن '+f.title,date:new Date().toISOString()});
  if(st.purchases.length>100)st.purchases=st.purchases.slice(-100);
  syncLegacyCoins();
  save();
  renderFeatureShop();
  return true;
}
function syncLegacyCoins(){
  try{
    if(window.cy410){
      window.cy410.coins=Number(st.coins)||0;
      if(typeof window.cy410Save==='function')window.cy410Save();
    }
  }catch(e){}
}
function syncFromLegacyCoins(){
  try{
    const legacy=Number(window.cy410&&window.cy410.coins);
    if(Number.isFinite(legacy)&&legacy>Number(st.coins||0)){
      st.coins=legacy;
      save();
    }else if(Number.isFinite(legacy)&&legacy<Number(st.coins||0)){
      syncLegacyCoins();
    }
  }catch(e){}
}
function renderFeatureShop(){
  const el=document.getElementById('cy-feature-shop');
  if(!el)return;
  el.innerHTML=FEATURE_UNLOCKS.map(f=>{
    const ok=featureUnlocked(f.id);
    return '<div class="card" style="margin:0 0 8px;padding:12px">'+
      '<div style="display:flex;gap:8px;align-items:center">'+
      '<div style="flex:1"><b>'+f.title+'</b><div style="font-size:.72rem;color:var(--text-sub);margin-top:4px">'+f.desc+'</div></div>'+
      '<button class="btn '+(ok?'btn-sub':'')+'" '+(ok?'disabled':'onclick="cyEconomy.unlockFeature(\''+f.id+'\')"')+'>'+
      (ok?'✓ باز شده':f.cost.toLocaleString('fa-IR')+' 🪙')+'</button></div></div>';
  }).join('');
}
window.cyEconomy.unlockFeature=unlockFeature;
window.cyEconomy.featureUnlocked=featureUnlocked;
window.cyEconomy.features=()=>FEATURE_UNLOCKS.map(f=>({...f,unlocked:featureUnlocked(f.id)}));

function ensureFeatureShop(){
  const host=document.getElementById('cy-economy-modal');
  if(!host)return;
  if(document.getElementById('cy-feature-shop'))return;
  const box=document.createElement('div');
  box.className='card';
  box.innerHTML='<b>🔓 باز کردن امکانات با سکه</b><p style="font-size:.74rem;color:var(--text-sub);margin:6px 0 10px">لازم نیست برای استفاده از امکانات ویژه تا ۶۰۰۰ سکه صبر کنید؛ هر قابلیت با هزینه خودش دائمی باز می‌شود.</p><div id="cy-feature-shop"></div>';
  const packs=document.getElementById('cy-coin-packs');
  if(packs&&packs.parentElement)packs.parentElement.parentElement.insertBefore(box,packs.parentElement);
  renderFeatureShop();
}


  const oldOpen=open;
  open=function(){ oldOpen(); setTimeout(()=>{ensureFeatureShop();syncFromLegacyCoins();renderFeatureShop();},0); };
  window.cyOpenEconomy=open;
  setTimeout(()=>{
    syncFromLegacyCoins();
    if(typeof window.cy410AddCoin==='function'&&!window.__CY_COIN_BRIDGE__){
      window.__CY_COIN_BRIDGE__=true;
      const original=window.cy410AddCoin;
      window.cy410AddCoin=function(amount,reason){
        const before=Number(st.coins)||0;
        const result=original.apply(this,arguments);
        const afterLegacy=Number(window.cy410&&window.cy410.coins);
        if(Number.isFinite(afterLegacy)){
          st.coins=Math.max(0,afterLegacy);
          if(st.coins!==before)save();
          checkCoinProUnlock();
        }
        return result;
      };
    }
  },500);


function inject(){
  const d=document.getElementById('tab-settings');
  if(!d||document.getElementById('cy-economy-card'))return;
  const b=document.createElement('div');
  b.id='cy-economy-card';
  b.className='card';
  b.innerHTML=
    '<div class="card-title">💎 درآمدزایی اختیاری</div>'+
    '<div style="font-size:.8rem;color:var(--text-sub)">نسخه رایگان کامل، PRO پولی و سکه‌های اختیاری</div>'+
    '<button class="btn" style="width:100%;margin-top:10px" onclick="cyOpenEconomy()">مشاهده PRO و سکه‌ها</button>';
  d.appendChild(b);
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(inject,600));
if(document.readyState!=='loading')setTimeout(inject,150);
})();