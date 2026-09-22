/* CalorieYar — Free / PRO / Coins Economy Foundation */
(function(){
'use strict';
if(window.__CY_ECONOMY__)return;window.__CY_ECONOMY__=true;
const KEY='calorie_yar_economy_v1';let st={tier:'free',proPriceToman:200000,coins:0,spent:0,purchases:[],features:{}};
try{st=Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
function tx(amount,reason){st.coins=Math.max(0,st.coins+amount);st.purchases.push({type:amount>=0?'earn':'spend',amount:Math.abs(amount),reason,date:new Date().toISOString()});save()}
window.cyEconomy={get:()=>({...st}),earn:(x,r)=>tx(Math.max(0,Number(x)||0),r||'reward'),spend:(x,r)=>{x=Math.max(0,Number(x)||0);if(st.coins<x)return false;tx(-x,r||'purchase');return true},isPro:()=>st.tier==='pro'};
function open(){
 let m=document.getElementById('cy-economy-modal');if(!m){m=document.createElement('div');m.id='cy-economy-modal';m.className='modal';m.innerHTML='<div class="modal-content" style="max-height:88vh;overflow:auto"><h3>💎 امکانات و اقتصاد کالری‌یار</h3><div class="card"><b>نسخه فعلی: '+(st.tier==='pro'?'PRO 💎':'رایگان 🆓')+'</b><div style="font-size:1.6rem;color:var(--accent);margin:8px 0">'+st.coins+' 🪙</div><small style="color:var(--text-sub)">تقریباً تمام امکانات اصلی در نسخه رایگان فعال هستند.</small></div><div class="card"><b>PRO — '+st.proPriceToman.toLocaleString('fa-IR')+' تومان</b><p style="font-size:.75rem;color:var(--text-sub);margin-top:7px">تحلیل‌های پیشرفته، گزارش‌های عمیق، برنامه‌های شخصی‌سازی‌شده، امکانات حرفه‌ای آینده و حذف تبلیغات.</p></div><div class="card"><b>سکه‌ها</b><p style="font-size:.75rem;color:var(--text-sub);margin-top:7px">ماموریت، استمرار، دستاورد، تبلیغ جایزه‌ای و دعوت معتبر می‌توانند سکه ایجاد کنند.</p><div id="cy-econ-log" style="margin-top:8px"></div></div><div class="modal-actions"><button class="btn btn-sub" onclick="document.getElementById(\'cy-economy-modal\').style.display=\'none\'">بستن</button><button class="btn" onclick="cyEconomyDemoReward()">+ پاداش آزمایشی</button></div></div>';document.body.appendChild(m)}
 const log=(st.purchases||[]).slice(-8).reverse().map(x=>'<div style="padding:5px 0;border-bottom:1px solid var(--border);font-size:.7rem">'+(x.type==='earn'?'+':'-')+x.amount+' 🪙 · '+x.reason+'</div>').join('');document.getElementById('cy-econ-log').innerHTML=log||'هنوز تراکنشی ثبت نشده.';m.style.display='flex'
}
window.cyOpenEconomy=open;window.cyEconomyDemoReward=function(){tx(5,'پاداش آزمایشی');open()};
function inject(){const d=document.getElementById('tab-settings');if(!d||document.getElementById('cy-economy-card'))return;const b=document.createElement('div');b.id='cy-economy-card';b.className='card';b.innerHTML='<div class="card-title">💎 نسخه رایگان، PRO و سکه‌ها</div><div style="font-size:.8rem;color:var(--text-sub)">هسته اصلی رایگان؛ امکانات حرفه‌ای و شخصی‌سازی در لایه‌های اختیاری</div><button class="btn" style="width:100%;margin-top:10px" onclick="cyOpenEconomy()">مشاهده امکانات و سکه‌ها</button>';d.appendChild(b)}
document.addEventListener('DOMContentLoaded',()=>setTimeout(inject,600));if(document.readyState!=='loading')setTimeout(inject,150);
})();