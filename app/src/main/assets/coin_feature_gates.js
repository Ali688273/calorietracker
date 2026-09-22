/* CalorieYar — Coin Feature Gates
 * Essential daily logging stays free. Optional advanced tools unlock permanently with coins.
 */
(function(){
'use strict';
if(window.__CY_FEATURE_GATES__)return;
window.__CY_FEATURE_GATES__=true;

function eco(){return window.cyEconomy||null}
function need(id){
  const e=eco();
  if(!e||typeof e.featureUnlocked!=='function')return true;
  if(e.featureUnlocked(id))return true;
  const list=typeof e.features==='function'?e.features():[];
  const f=list.find(x=>x.id===id);
  alert('این قابلیت با '+(f?f.cost.toLocaleString('fa-IR'):'سکه')+' 🪙 باز می‌شود.\nاز بخش «PRO و سکه‌ها» می‌توانی آن را دائمی فعال کنی.');
  if(typeof window.cyOpenEconomy==='function')window.cyOpenEconomy();
  return false;
}

function wrap(name,feature,check){
  const fn=window[name];
  if(typeof fn!=='function'||fn.__cyGate)return;
  const w=function(){
    if(check?check.apply(this,arguments):need(feature))return fn.apply(this,arguments);
  };
  w.__cyGate=true;
  window[name]=w;
}

wrap('cyOpenMealPlanner','meal_planner_plus');
wrap('cyOpenHealthGoals','goal_plus');
wrap('cyNutritionOpen','nutrition_plus');
wrap('cyNutritionAdaptive','nutrition_plus');

if(typeof window.cyFullReport==='function'&&!window.cyFullReport.__cyGate){
  const original=window.cyFullReport;
  const w=function(days){
    days=Number(days)||30;
    if(days>=90&&!need('extended_stats'))return;
    if(days>=30&&!need('advanced_reports'))return;
    return original.apply(this,arguments);
  };
  w.__cyGate=true;
  window.cyFullReport=w;
}

if(typeof window.cyShowPage==='function'&&!window.cyShowPage.__cyGate){
  const originalPage=window.cyShowPage;
  const w=function(page){
    if(page==='weight'&&typeof window.cyEconomy?.featureUnlocked==='function'&&!window.cyEconomy.featureUnlocked('extended_stats')){
      /* Weight entry remains free; only extended historical chart is gated. */
    }
    return originalPage.apply(this,arguments);
  };
  w.__cyGate=true;
  window.cyShowPage=w;
}

/* Re-apply after late-loading feature packs, without polling forever. */
let tries=0;
const timer=setInterval(function(){
  tries++;
  wrap('cyOpenMealPlanner','meal_planner_plus');
  wrap('cyOpenHealthGoals','goal_plus');
  wrap('cyNutritionOpen','nutrition_plus');
  wrap('cyNutritionAdaptive','nutrition_plus');
  if(typeof window.cyFullReport==='function'&&!window.cyFullReport.__cyGate){
    const original=window.cyFullReport;
    const w=function(days){
      days=Number(days)||30;
      if(days>=90&&!need('extended_stats'))return;
      if(days>=30&&!need('advanced_reports'))return;
      return original.apply(this,arguments);
    };
    w.__cyGate=true;window.cyFullReport=w;
  }
  if(tries>=20)clearInterval(timer);
},250);

window.cyFeatureGate=need;
})();