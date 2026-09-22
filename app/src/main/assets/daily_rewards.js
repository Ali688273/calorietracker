/* CalorieYar — Daily Rewards & 2-Year PRO Path */
(function(){
'use strict';
if(window.__CY_DAILY_REWARDS__)return;
window.__CY_DAILY_REWARDS__=true;

const KEY='calorie_yar_daily_rewards_v1';
const PRO=6000;
const AD_REWARD=50;
const MAX_ADS_PER_MONTH=1;
const DEFAULT={lastClaim:'',streak:0,totalDays:0,lastAdMonth:'',adsThisMonth:0,claimed:{},version:2};
let st=Object.assign({},DEFAULT);
try{st=Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
function save(){localStorage.setItem(KEY,JSON.stringify(st))}
function day(){return new Date().toISOString().slice(0,10)}
function diff(a,b){return Math.round((new Date(b)-new Date(a))/86400000)}
function coin(n,reason){if(window.cyEconomy?.earn)window.cyEconomy.earn(n,reason)}
function claimDaily(){
 const d=day(); if(st.lastClaim===d)return;
 const gap=st.lastClaim?diff(st.lastClaim,d):999;
 st.streak=gap===1?st.streak+1:1; st.totalDays++;
 st.lastClaim=d; st.adsThisMonth=0;
 const base=1;
 coin(base,'ورود روزانه');
 if(st.streak%7===0)coin(3,'پاداش استمرار هفتگی');
 save();
}
function claimYesterdaySuccess(){
 const d=day(), y=new Date(Date.now()-86400000).toISOString().slice(0,10);
 if(st.claimed[y])return;
 let ok=false;
 try{
   const perf=JSON.parse(localStorage.getItem('calorie_yar_performance_v1')||'{}');
   ok=!!(perf.daily?.[y]?.success || perf.history?.[y]?.success || perf[y]?.success);
 }catch(e){}
 if(ok){coin(1,'موفقیت روز قبل');st.claimed[y]=true;save()}
}
function watchAd(){
 const d=day(), month=d.slice(0,7);
 if(st.lastAdMonth!==month){st.lastAdMonth=month;st.adsThisMonth=0;save()}
 if(st.adsThisMonth>=MAX_ADS_PER_MONTH){alert('سقف پاداش تبلیغ این ماه تکمیل شده است.');return false}
 const grant=()=>{st.adsThisMonth++;coin(AD_REWARD,'تماشای تبلیغ جایزه‌ای');save();render()};
 window.addEventListener('calorieyar-rewarded-ad-complete',grant,{once:true});
 if(window.Tapsell || window.Adivery){
   window.dispatchEvent(new CustomEvent('calorieyar-request-rewarded-ad',{detail:{onComplete:'calorieyar-rewarded-ad-complete'}}));
 }else{
   window.removeEventListener('calorieyar-rewarded-ad-complete',grant);
   alert('اتصال واقعی تبلیغ جایزه‌ای در مرحله تبلیغات نهایی انجام می‌شود.');
 }
}
function render(){
 const el=document.getElementById('cy-daily-rewards');
 if(!el)return;
 const coins=window.cyEconomy?.get?.().coins||0;
 el.innerHTML='<b>🎁 پاداش روزانه</b><div style="font-size:.78rem;color:var(--text-sub);margin-top:6px">ورود روزانه: ۱ سکه · استمرار فعلی: '+st.streak+' روز</div>'+
 '<div style="font-size:.78rem;color:var(--text-sub)">تبلیغ جایزه‌ای: '+st.adsThisMonth+'/'+MAX_ADS_PER_MONTH+' در ماه · هر تبلیغ: '+AD_REWARD+' سکه</div>'+
 '<div style="font-size:.78rem;margin-top:6px">🪙 '+coins+' / '+PRO+' سکه تا PRO</div>'+
 '<button class="btn" style="width:100%;margin-top:8px" onclick="cyWatchRewardedAd()">📺 تماشای تبلیغ و دریافت '+AD_REWARD+' سکه</button>';
}
function inject(){
 const d=document.getElementById('tab-settings'); if(!d||document.getElementById('cy-daily-rewards'))return;
 const el=document.createElement('div');el.id='cy-daily-rewards';el.className='card';d.appendChild(el);render();
}
window.cyWatchRewardedAd=watchAd;
claimDaily(); claimYesterdaySuccess();
document.addEventListener('DOMContentLoaded',()=>setTimeout(inject,900));
setInterval(()=>{claimDaily();claimYesterdaySuccess();render()},60000);
})();