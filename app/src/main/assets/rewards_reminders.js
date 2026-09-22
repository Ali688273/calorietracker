(function(){
'use strict';
if(window.__CY_REWARD_THEME_PACK)return;
window.__CY_REWARD_THEME_PACK=true;
var KEY='calorie_yar_rewards_v2';
var state={theme:'default',owned:['default'],reminders:{food:{enabled:true,time:'09:00'},water:{enabled:true,time:'11:00'},weight:{enabled:false,time:'08:00'},exercise:{enabled:false,time:'18:00'},mission:{enabled:true,time:'20:00'}}};
try{state=Object.assign(state,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){}
state.owned=Array.isArray(state.owned)?state.owned:['default'];
var themes=[
{id:'default',name:'سبز کلاسیک',icon:'🌿',cost:0,accent:'#10b981',bg:'#0f172a',card:'#1e293b',sub:'#94a3b8'},
{id:'ocean',name:'اقیانوس',icon:'🌊',cost:100,accent:'#0ea5e9',bg:'#071923',card:'#102a3a',sub:'#8fb8c9'},
{id:'sunset',name:'غروب',icon:'🌅',cost:250,accent:'#f97316',bg:'#24120c',card:'#3a1f14',sub:'#d7a890'},
{id:'purple',name:'کهکشانی',icon:'🌌',cost:500,accent:'#8b5cf6',bg:'#171126',card:'#251a3d',sub:'#b9a9d8'},
{id:'gold',name:'طلایی',icon:'👑',cost:900,accent:'#eab308',bg:'#1f1a08',card:'#332b0d',sub:'#d5c58a'},
{id:'diamond',name:'الماس',icon:'💎',cost:1500,accent:'#22d3ee',bg:'#07151c',card:'#102b35',sub:'#9ed3dd'}];
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function coins(){try{if(window.cy410&&Number.isFinite(Number(cy410.coins)))return Number(cy410.coins)}catch(e){}return Number(localStorage.getItem('cy_coins')||0)}
function spend(v){if(coins()<v)return false;try{if(window.cy410){cy410.coins=Number(cy410.coins||0)-v;if(typeof cy410Save==='function')cy410Save();return true}}catch(e){}localStorage.setItem('cy_coins',String(coins()-v));return true}
function apply(){var t=themes.find(function(x){return x.id===state.theme})||themes[0];document.documentElement.style.setProperty('--accent',t.accent);document.documentElement.style.setProperty('--bg-main',t.bg);document.documentElement.style.setProperty('--bg-card',t.card);document.documentElement.style.setProperty('--text-sub',t.sub)}
function modal(title,body){var m=document.createElement('div');m.className='cy-fp-modal open';m.innerHTML='<div><div class="cy-fp-row" style="font-weight:900;border:0"><span>'+title+'</span><button>×</button></div>'+body+'</div>';m.querySelector('button').onclick=function(){m.remove()};m.onclick=function(e){if(e.target===m)m.remove()};document.body.appendChild(m)}
window.cyThemeShop=function(){var c=coins(),cards=themes.map(function(t){var owned=state.owned.indexOf(t.id)>=0;return '<div style="border:1px solid var(--border);border-radius:14px;padding:11px;background:var(--bg-main);margin:5px 0"><b>'+t.icon+' '+t.name+'</b><div style="font-size:.7rem;color:var(--text-sub);margin-top:4px">'+(t.cost?'هزینه '+t.cost+' سکه':'رایگان')+'</div><button style="width:100%;margin-top:7px" onclick="'+(owned?'cyUseTheme(\''+t.id+'\')':'cyBuyTheme(\''+t.id+'\')')+'">'+(owned?(state.theme===t.id?'✓ فعال':'استفاده'):(c>=t.cost?'🪙 خرید':'🔒 سکه کافی نیست'))+'</button></div>'}).join('');modal('🎨 فروشگاه تم‌ها','<div style="padding:8px"><b>🪙 '+c+' سکه</b><p style="font-size:.72rem;color:var(--text-sub)">امکانات اصلی برنامه رایگان هستند؛ سکه فقط برای تم‌های ویژه و شخصی‌سازی است.</p>'+cards+'</div>')}
window.cyBuyTheme=function(id){var t=themes.find(function(x){return x.id===id});if(!t||state.owned.indexOf(id)>=0)return;if(!spend(t.cost)){alert('سکه کافی نیست؛ مأموریت‌ها و دستاوردها را کامل کن.');return}state.owned.push(id);state.theme=id;save();apply();cyThemeShop()}
window.cyUseTheme=function(id){if(state.owned.indexOf(id)<0)return;state.theme=id;save();apply();cyThemeShop()}
function sync(k){var r=state.reminders[k],p=String(r.time||'09:00').split(':');try{if(window.CalorieYarAndroid)window.CalorieYarAndroid.scheduleReminder(k,parseInt(p[0],10)||0,parseInt(p[1],10)||0,!!r.enabled)}catch(e){}}
window.cyReminderSettings=function(){var n={food:'🍽️ غذا',water:'💧 آب',weight:'⚖️ وزن',exercise:'🏃 ورزش',mission:'🏆 مأموریت'},h=Object.keys(state.reminders).map(function(k){var r=state.reminders[k];return '<div style="display:grid;grid-template-columns:1fr 82px 68px;gap:6px;padding:7px 0;border-bottom:1px solid var(--border)"><span>'+n[k]+'</span><input id="cy-time-'+k+'" type="time" value="'+r.time+'"><button onclick="cySaveReminder(\''+k+'\')">'+(r.enabled?'فعال':'خاموش')+'</button></div>'}).join('');modal('🔔 یادآوری‌های روزانه','<div style="font-size:.72rem;color:var(--text-sub);padding:8px">زمان اعلان را انتخاب کن؛ اعلان‌ها روزانه تکرار می‌شوند.</div>'+h)}
window.cySaveReminder=function(k){var e=document.getElementById('cy-time-'+k);if(!e)return;state.reminders[k].time=e.value||'09:00';state.reminders[k].enabled=!state.reminders[k].enabled;save();sync(k);cyReminderSettings()}
function inject(){apply();var d=document.getElementById('tab-settings');if(!d||document.getElementById('cy-reward-hub'))return;var b=document.createElement('div');b.id='cy-reward-hub';b.className='card';b.innerHTML='<div class="card-title">🎁 پاداش و شخصی‌سازی</div><div style="font-size:.75rem;color:var(--text-sub);margin-bottom:9px">سکه جمع کن و تم‌های ویژه‌تر را باز کن؛ امکانات اصلی همیشه رایگان‌اند.</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:7px"><button class="btn" onclick="cyThemeShop()">🎨 فروشگاه تم</button><button class="btn btn-sub" onclick="cyReminderSettings()">🔔 یادآوری‌ها</button></div>';d.prepend(b);Object.keys(state.reminders).forEach(sync)}
document.addEventListener('DOMContentLoaded',function(){setTimeout(inject,600)});if(document.readyState!=='loading')setTimeout(inject,150)
})();