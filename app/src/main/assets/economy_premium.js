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
window.cyOpenEconomy=open;

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