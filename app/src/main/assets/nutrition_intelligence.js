/* CALORIE YAR — Nutrition Intelligence Pack v1
 * Offline-first nutrition analysis. Values are estimates unless a verified food record supplies them.
 */
(function(){
'use strict';
if(window.__CY_NUTRITION_INTELLIGENCE__)return;
window.__CY_NUTRITION_INTELLIGENCE__=true;
const KEY='calorie_yar_nutrition_intelligence_v1';
let cfg={adaptiveEnabled:true,lastAdjustment:0};
try{cfg=Object.assign(cfg,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const num=x=>Number.isFinite(Number(x))?Number(x):0;
const entries=()=>typeof cy410Entries==='function'?cy410Entries():[];
const today=()=>typeof cy410Today==='function'?cy410Today():new Date().toISOString().slice(0,10);
const goal=()=>num(window.cy410&&cy410.calorieGoal)||2000;
const water=()=>typeof cy410Water==='function'?cy410Water():{glasses:0,target:8};
function style(){
 if(document.getElementById('cy-ni-style'))return;
 const s=document.createElement('style');s.id='cy-ni-style';
 s.textContent='.cy-ni{background:var(--bg-card);border:1px solid var(--border);border-radius:18px;padding:14px;margin:10px 0}.cy-ni-title{display:flex;justify-content:space-between;align-items:center;font-weight:900;margin-bottom:10px}.cy-ni-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.cy-ni-stat{background:var(--bg-main);border:1px solid var(--border);border-radius:13px;padding:11px;text-align:center}.cy-ni-stat b{display:block;font-size:1.05rem;color:var(--accent)}.cy-ni-stat small{color:var(--text-sub);font-size:.67rem}.cy-ni-row{display:flex;justify-content:space-between;gap:8px;padding:9px 0;border-bottom:1px solid var(--border);font-size:.75rem}.cy-ni-row:last-child{border-bottom:0}.cy-ni-muted{color:var(--text-sub);font-size:.67rem;line-height:1.7}.cy-ni-bar{height:8px;background:var(--border);border-radius:9px;overflow:hidden;margin-top:5px}.cy-ni-bar span{display:block;height:100%;background:var(--accent);border-radius:9px}.cy-ni-btn{width:100%;border:1px solid var(--border);background:var(--bg-main);color:var(--text-main);border-radius:11px;padding:10px;margin-top:7px;font:inherit;font-size:.73rem}.cy-ni-modal{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:1000;display:none;align-items:center;justify-content:center;padding:15px}.cy-ni-modal.open{display:flex}.cy-ni-modal>div{width:100%;max-width:450px;max-height:90vh;overflow:auto;background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:15px}.cy-ni-chip{display:inline-block;padding:5px 8px;border-radius:9px;background:rgba(16,185,129,.1);margin:3px;font-size:.65rem}@media(max-width:380px){.cy-ni-grid{grid-template-columns:1fr}}';
 document.head.appendChild(s);
}
function modal(title,body){
 style();let m=document.getElementById('cy-ni-modal');
 if(!m){m=document.createElement('div');m.id='cy-ni-modal';m.className='cy-ni-modal';document.body.appendChild(m);m.onclick=e=>{if(e.target===m)m.classList.remove('open')}}
 m.innerHTML='<div><div class="cy-ni-title"><span>'+title+'</span><button onclick="this.closest(\'.cy-ni-modal\').classList.remove(\'open\')" style="border:0;background:transparent;color:var(--text-sub);font-size:1.3rem">×</button></div>'+body+'</div>';
 m.classList.add('open');
}
function profile(){
 const p=window.cy410||window.userData||{};
 const weight=num(p.weight)||70,height=num(p.height)||175,age=num(p.age)||25,gender=p.gender||'male',activity=num(p.activity)||1.2;
 const bmr=gender==='female'?10*weight+6.25*height-5*age-161:10*weight+6.25*height-5*age+5;
 return {weight,height,age,activity,bmr,tdee:bmr*activity};
}
function foodBase(name){
 const n=String(name||'').toLowerCase();
 let x={protein:5,carbs:18,fat:5,fiber:2,sugar:4,sodium:180,calcium:50,iron:1.2,potassium:180,vitC:8};
 const set=(v)=>Object.assign(x,v);
 if(/مرغ|جوجه|سینه مرغ|chicken/.test(n))set({protein:30,carbs:0,fat:4,fiber:0,sugar:0,sodium:80,calcium:15,iron:1,potassium:250,vitC:0});
 else if(/گوشت|کباب|کوفته|کتلت|beef|meat/.test(n))set({protein:25,carbs:5,fat:15,fiber:1,sugar:1,sodium:300,calcium:20,iron:2.5,potassium:300,vitC:2});
 else if(/ماهی|سالمون|قزل|تن ماهی|میگو|fish|shrimp/.test(n))set({protein:23,carbs:0,fat:8,fiber:0,sugar:0,sodium:180,calcium:20,iron:0.8,potassium:300,vitC:0});
 else if(/تخم مرغ|egg/.test(n))set({protein:13,carbs:1,fat:11,fiber:0,sugar:1,sodium:125,calcium:50,iron:1.8,potassium:125,vitC:0});
 else if(/عدس|لوبیا|نخود|حبوبات|lentil|bean|chickpea/.test(n))set({protein:9,carbs:20,fat:1,fiber:8,sugar:2,sodium:5,calcium:45,iron:3.3,potassium:370,vitC:2});
 else if(/برنج|نان|ماکارونی|جو|سیب.?زمینی|ذرت|rice|bread|pasta|oat/.test(n))set({protein:4,carbs:27,fat:1.5,fiber:2,sugar:1,sodium:120,calcium:20,iron:1.2,potassium:100,vitC:2});
 else if(/شیر|ماست|پنیر|لبنی|milk|yogurt|cheese/.test(n))set({protein:8,carbs:7,fat:5,fiber:0,sugar:5,sodium:100,calcium:180,iron:0.1,potassium:140,vitC:1});
 else if(/سیب|موز|پرتقال|هندوانه|خیار|گوجه|انار|کیوی|میوه|apple|banana|orange|fruit/.test(n))set({protein:1,carbs:15,fat:.3,fiber:3,sugar:10,sodium:5,calcium:25,iron:.3,potassium:220,vitC:25});
 else if(/سبزی|اسفناج|بروکلی|کاهو|هویج|کرفس|فلفل|کلم|vegetable|spinach|broccoli/.test(n))set({protein:2,carbs:7,fat:.3,fiber:3,sugar:3,sodium:60,calcium:60,iron:1.2,potassium:300,vitC:35});
 else if(/بادام|گردو|پسته|فندق|تخمه|آجیل|nuts|almond|walnut/.test(n))set({protein:20,carbs:20,fat:50,fiber:8,sugar:4,sodium:10,calcium:100,iron:3,potassium:500,vitC:1});
 else if(/شکلات|بیسکویت|شیرینی|کیک|بامیه|زولبیا|سوهان|حلوا|شکر|عسل|شیرین/.test(n))set({protein:5,carbs:60,fat:20,fiber:2,sugar:40,sodium:220,calcium:45,iron:1.2,potassium:180,vitC:1});
 else if(/چیپس|پفک|نوشابه|سس|فست|پیتزا|همبرگر|کالباس|ژامبون/.test(n))set({protein:7,carbs:30,fat:20,fiber:2,sugar:8,sodium:650,calcium:60,iron:1.5,potassium:180,vitC:4});
 return x;
}
function totals(){
 const out={cal:0,protein:0,carbs:0,fat:0,fiber:0,sugar:0,sodium:0,calcium:0,iron:0,potassium:0,vitC:0};
 entries().filter(e=>e.date===today()).forEach(e=>{
  const grams=Math.max(0,num(e.grams)||100)/100,b=foodBase(e.name);
  out.cal+=num(e.cal);out.protein+=num(e.protein)||b.protein*grams;out.carbs+=num(e.carbs||e.carbohydrates)||b.carbs*grams;out.fat+=num(e.fat||e.fats)||b.fat*grams;
  out.fiber+=b.fiber*grams;out.sugar+=b.sugar*grams;out.sodium+=b.sodium*grams;out.calcium+=b.calcium*grams;out.iron+=b.iron*grams;out.potassium+=b.potassium*grams;out.vitC+=b.vitC*grams;
 });return out;
}
const targets={fiber:30,sugar:50,sodium:2300,calcium:1000,iron:10,potassium:3500,vitC:75};
function score(t){
 let s=0;
 s+=Math.min(25,t.protein>=Math.max(60,goal()*.03)?25:t.protein/Math.max(60,goal()*.03)*25);
 s+=Math.min(20,t.fiber/targets.fiber*20);
 s+=Math.min(15,t.vitC/targets.vitC*15);
 s+=Math.min(15,t.calcium/targets.calcium*15);
 s+=Math.min(10,t.iron/targets.iron*10);
 s+=Math.min(15,water().glasses/Math.max(1,water().target||8)*15);
 s-=Math.max(0,(t.sodium-targets.sodium)/targets.sodium*10);
 s-=Math.max(0,(t.sugar-targets.sugar)/targets.sugar*8);
 return Math.max(0,Math.min(100,Math.round(s)));
}
function recommendations(t){
 const a=[];
 if(t.protein<Math.max(60,goal()*.03))a.push('پروتئین امروز پایین است؛ مرغ، ماهی، تخم‌مرغ، ماست یونانی یا حبوبات را در وعده بعدی بررسی کن.');
 if(t.fiber<targets.fiber*.5)a.push('فیبر پایین است؛ سبزیجات، حبوبات، میوه و غلات کامل اضافه کن.');
 if(t.sodium>targets.sodium*.8)a.push('سدیم امروز بالاست؛ غذاهای شور، سس‌ها و تنقلات نمکی را کمتر کن.');
 if(t.sugar>targets.sugar*.8)a.push('قند آزاد برآوردی بالاست؛ نوشیدنی شیرین و شیرینی را محدود کن.');
 if(water().glasses<Math.ceil((water().target||8)*.5))a.push('آب مصرفی هنوز کم است؛ چند لیوان آب در فاصله مناسب ثبت کن.');
 if(!a.length)a.push('وضعیت امروز متعادل‌تر است؛ همین الگو را با تنوع غذایی ادامه بده.');
 return a;
}
function render(){
 style();const d=document.getElementById('tab-dashboard');if(!d||document.getElementById('cy-ni-dashboard'))return;
 const box=document.createElement('div');box.id='cy-ni-dashboard';box.className='cy-ni';
 box.innerHTML='<div class="cy-ni-title"><span>🧠 هوش تغذیه‌ای</span><span id="cy-ni-score" class="cy-ni-chip">--/100</span></div><div class="cy-ni-grid"><div class="cy-ni-stat"><b id="cy-ni-pro">0g</b><small>پروتئین</small></div><div class="cy-ni-stat"><b id="cy-ni-fiber">0g</b><small>فیبر</small></div><div class="cy-ni-stat"><b id="cy-ni-sugar">0g</b><small>قند</small></div><div class="cy-ni-stat"><b id="cy-ni-sodium">0mg</b><small>سدیم</small></div></div><button class="cy-ni-btn" onclick="cyNutritionOpen()">📊 تحلیل کامل تغذیه</button><button class="cy-ni-btn" onclick="cyNutritionSmart()">💡 پیشنهادهای هوشمند</button>';
 d.prepend(box);update();
}
function update(){
 const t=totals();['pro','fiber','sugar','sodium'].forEach((k,i)=>{const el=document.getElementById('cy-ni-'+k);if(el)el.textContent=i===3?Math.round(t.sodium)+'mg':Math.round(t[k])+'g'});
 const sc=document.getElementById('cy-ni-score');if(sc)sc.textContent=score(t)+'/100';
}
window.cyNutritionOpen=function(){
 const t=totals(),sc=score(t),rows=[['پروتئین',t.protein,'g',Math.max(60,goal()*.03)],['فیبر',t.fiber,'g',targets.fiber],['قند',t.sugar,'g',targets.sugar],['سدیم',t.sodium,'mg',targets.sodium],['کلسیم',t.calcium,'mg',targets.calcium],['آهن',t.iron,'mg',targets.iron],['پتاسیم',t.potassium,'mg',targets.potassium],['ویتامین C',t.vitC,'mg',targets.vitC]];
 const body='<div class="cy-ni"><div class="cy-ni-stat"><b>'+sc+'/100</b><small>امتیاز کیفیت تغذیه امروز</small></div>'+rows.map(r=>'<div class="cy-ni-row"><span>'+r[0]+'<div class="cy-ni-bar"><span style="width:'+Math.min(100,r[1]/r[3]*100)+'%"></span></div></span><b>'+Math.round(r[1]*10)/10+' '+r[2]+'</b></div>').join('')+'<div class="cy-ni-muted">مقادیر ریزمغذی برای غذاهایی که داده آزمایشگاهی اختصاصی ندارند، برآورد دسته غذایی هستند و برای تشخیص یا درمان پزشکی استفاده نمی‌شوند.</div></div>';
 modal('📊 تحلیل کامل تغذیه',body);
};
window.cyNutritionSmart=function(){const t=totals();modal('💡 پیشنهادهای هوشمند',recommendations(t).map(x=>'<div class="cy-ni-row"><span>• '+esc(x)+'</span></div>').join('')+'<div class="cy-ni-muted">پیشنهادها صرفاً برای کمک به انتخاب غذایی هستند و جایگزین توصیه پزشک یا متخصص تغذیه نیستند.</div>')};
window.cyNutritionAdaptive=function(){
 const p=profile(),t=totals(),recent=entries().filter(e=>e.date).reduce((a,e)=>a,0);
 const current=goal(),safe=Math.max(1200,Math.round(p.tdee)),suggested=Math.max(1200,Math.round(safe*.9));
 modal('🎯 هدف کالری تطبیقی','<div class="cy-ni"><div class="cy-ni-row"><span>TDEE تقریبی</span><b>'+Math.round(p.tdee)+' kcal</b></div><div class="cy-ni-row"><span>هدف فعلی</span><b>'+Math.round(current)+' kcal</b></div><div class="cy-ni-row"><span>پیشنهاد محاسباتی</span><b>'+suggested+' kcal</b></div><div class="cy-ni-muted">هدف تطبیقی برای نسخه اولیه بر اساس مشخصات و فعالیت فعلی پیشنهاد می‌شود؛ تغییر خودکار هدف بدون سابقه کافی وزن انجام نمی‌شود.</div></div>');
};
function hub(){
 style();const d=document.getElementById('tab-settings');if(!d||document.getElementById('cy-ni-hub'))return;
 const b=document.createElement('div');b.id='cy-ni-hub';b.className='cy-ni';
 b.innerHTML='<div class="cy-ni-title"><span>🧠 Nutrition Intelligence</span><span class="cy-ni-chip">پیشرفته</span></div><button class="cy-ni-btn" onclick="cyNutritionOpen()">📊 تحلیل کامل تغذیه</button><button class="cy-ni-btn" onclick="cyNutritionSmart()">💡 پیشنهادهای هوشمند</button><button class="cy-ni-btn" onclick="cyNutritionAdaptive()">🎯 هدف کالری تطبیقی</button>';
 d.prepend(b);
}
function init(){setTimeout(render,300);setTimeout(hub,500);setInterval(update,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
