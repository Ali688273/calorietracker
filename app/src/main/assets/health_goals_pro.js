/* CalorieYar — Professional Health Goals Pack */
(function(){
'use strict';
if(window.__CY_HEALTH_GOALS__)return;window.__CY_HEALTH_GOALS__=true;
const KEY='calorie_yar_health_goals_v1';
let st={goal:'lose',targetWeight:0,weeklyRate:.5,proteinPct:30,carbPct:40,fatPct:30,medicalNote:'',updatedAt:''};
try{st=Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
const n=x=>{x=Number(x);return Number.isFinite(x)?x:0};
function profile(){return window.cy410?.profile||window.cy410||window.userData||{}}
function calc(){
 const p=profile(),w=n(p.weight||p.currentWeight),h=n(p.height),a=n(p.age),g=p.gender||'male',activity=n(p.activity||1.2)||1.2;
 const bmr=w&&h&&a?(10*w+6.25*h-5*a+(g==='female'?-161:5)):0;
 const tdee=bmr*activity, adj=st.goal==='lose'?-Math.min(500,st.weeklyRate*1100):st.goal==='gain'?Math.min(400,st.weeklyRate*800):0;
 const target=Math.max(1200,Math.round(tdee+adj));
 return {bmr,tdee,target,w,h,a}
}
function bmi(w,h){return w&&h?w/((h/100)**2):0}
function open(){
 let m=document.getElementById('cy-health-goals');if(!m){
  m=document.createElement('div');m.id='cy-health-goals';m.className='modal';
  m.innerHTML='<div class="modal-content" style="max-width:440px;max-height:90vh;overflow:auto"><h3>🎯 پروفایل سلامت و اهداف</h3><div id="cy-hg-summary" class="card"></div>'+
  '<div class="form-group"><label>هدف</label><select id="cy-hg-goal"><option value="lose">کاهش وزن</option><option value="maintain">حفظ وزن</option><option value="gain">افزایش وزن</option></select></div>'+
  '<div class="form-group"><label>وزن هدف (کیلوگرم)</label><input id="cy-hg-target" type="number" step=".1"></div>'+
  '<div class="form-group"><label>سرعت هدف هفتگی (کیلوگرم)</label><input id="cy-hg-rate" type="number" step=".1" min=".1" max="1.5"></div>'+
  '<div class="form-group"><label>درصد پروتئین</label><input id="cy-hg-p" type="number" min="10" max="60"></div>'+
  '<div class="form-group"><label>درصد کربوهیدرات</label><input id="cy-hg-c" type="number" min="10" max="70"></div>'+
  '<div class="form-group"><label>درصد چربی</label><input id="cy-hg-f" type="number" min="10" max="60"></div>'+
  '<div class="modal-actions"><button class="btn btn-sub" onclick="document.getElementById(\'cy-health-goals\').style.display=\'none\'">انصراف</button><button class="btn" onclick="cySaveHealthGoals()">ذخیره</button></div></div>';
  document.body.appendChild(m)
 }
 document.getElementById('cy-hg-goal').value=st.goal;document.getElementById('cy-hg-target').value=st.targetWeight||'';document.getElementById('cy-hg-rate').value=st.weeklyRate;
 document.getElementById('cy-hg-p').value=st.proteinPct;document.getElementById('cy-hg-c').value=st.carbPct;document.getElementById('cy-hg-f').value=st.fatPct;
 const x=calc(),p=profile(),b=bmi(n(p.weight),n(p.height));
 document.getElementById('cy-hg-summary').innerHTML='<b>محاسبه فعلی</b><div style="margin-top:8px">BMI: <b>'+ (b?b.toFixed(1):'—')+'</b></div><div>BMR: <b>'+Math.round(x.bmr||0)+' kcal</b></div><div>TDEE: <b>'+Math.round(x.tdee||0)+' kcal</b></div><div>هدف پیشنهادی: <b>'+Math.round(x.target)+' kcal</b></div><small style="color:var(--text-sub)">محاسبه تخمینی است و برای تشخیص یا درمان پزشکی نیست.</small>';
 m.style.display='flex'
}
window.cyOpenHealthGoals=open;
window.cySaveHealthGoals=function(){
 const p=n(document.getElementById('cy-hg-p').value),c=n(document.getElementById('cy-hg-c').value),f=n(document.getElementById('cy-hg-f').value);
 if(Math.abs(p+c+f-100)>1){alert('جمع درصدهای درشت‌مغذی‌ها باید ۱۰۰ باشد.');return}
 st.goal=document.getElementById('cy-hg-goal').value;st.targetWeight=n(document.getElementById('cy-hg-target').value);st.weeklyRate=Math.min(1.5,Math.max(.1,n(document.getElementById('cy-hg-rate').value)||.5));st.proteinPct=p;st.carbPct=c;st.fatPct=f;st.updatedAt=new Date().toISOString();save();
 try{if(window.cy410){cy410.goal=st.goal;cy410.targetWeight=st.targetWeight;cy410.calorieGoal=calc().target;cy410Save?.()}}catch(e){}
 document.getElementById('cy-health-goals').style.display='none';location.reload()
};
function inject(){const d=document.getElementById('tab-settings');if(!d||document.getElementById('cy-health-goals-card'))return;const x=calc(),b=document.createElement('div');b.id='cy-health-goals-card';b.className='card';b.innerHTML='<div class="card-title">🎯 اهداف حرفه‌ای سلامت</div><div style="text-align:center;color:var(--text-sub);font-size:.8rem">هدف: '+({lose:'کاهش وزن',maintain:'حفظ وزن',gain:'افزایش وزن'}[st.goal]||'کاهش وزن')+' · حدود '+Math.round(x.target)+' kcal/day</div><button class="btn" style="width:100%;margin-top:10px" onclick="cyOpenHealthGoals()">ویرایش پروفایل و اهداف</button>';d.prepend(b)}
document.addEventListener('DOMContentLoaded',()=>setTimeout(inject,500));if(document.readyState!=='loading')setTimeout(inject,100);
})();