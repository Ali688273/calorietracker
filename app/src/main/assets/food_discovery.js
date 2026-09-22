/* CALORIE YAR - FOOD DISCOVERY PACK */
(function(){
'use strict';
if(window.__CY_FOOD_DISCOVERY)return;window.__CY_FOOD_DISCOVERY=true;

function style(){
 if(document.getElementById('cy-food-discovery-style'))return;
 var s=document.createElement('style');s.id='cy-food-discovery-style';
 s.textContent='.cy-food-tools{background:var(--bg-card,#fff);border:1px solid var(--border,#ddd);border-radius:18px;padding:12px;margin:10px 0}.cy-food-tools-title{font-weight:900;margin-bottom:9px}.cy-food-filters{display:grid;grid-template-columns:1fr 1fr;gap:7px}.cy-food-filters select,.cy-food-filters input{width:100%;box-sizing:border-box;padding:9px;border-radius:10px;border:1px solid var(--border,#ddd);background:var(--bg-main,#fff);color:var(--text-main,#222);font:inherit}.cy-food-chips{display:flex;gap:6px;overflow:auto;margin:9px 0;padding-bottom:2px}.cy-food-chip{white-space:nowrap;border:1px solid var(--border,#ddd);background:var(--bg-main,#fff);color:var(--text-main,#222);border-radius:999px;padding:7px 10px;font:inherit}.cy-food-chip.active{outline:2px solid var(--accent,#10b981)}.cy-food-summary{font-size:.72rem;color:var(--text-sub,#777);margin-top:7px}';
 document.head.appendChild(s);
}
var filter={kind:'all',meal:'all',maxKcal:'',query:''};

function allFoods(){
 try{
  if(typeof window.getAllFoods==='function'){var a=window.getAllFoods();if(Array.isArray(a))return a}
 }catch(e){}
 try{if(Array.isArray(window.generatedFoodsDB))return window.generatedFoodsDB}catch(e){}
 return [];
}
function textFood(f){
 return String(f.name||f.title||f.food||'').toLowerCase()+' '+String(f.category||f.type||'').toLowerCase();
}
function matches(f){
 var name=textFood(f), q=filter.query.trim().toLowerCase();
 if(q && name.indexOf(q)<0)return false;
 if(filter.maxKcal && Number(f.calories||f.kcal||0)>Number(filter.maxKcal))return false;
 if(filter.kind!=='all'){
  var c=String(f.category||f.type||'').toLowerCase();
  if(filter.kind==='iranian' && !/ایران|ایرانی|persian|iranian/.test(c+' '+name))return false;
  if(filter.kind==='protein' && Number(f.protein||0)<15)return false;
  if(filter.kind==='low' && Number(f.calories||f.kcal||0)>150)return false;
 }
 return true;
}
function render(){
 var foods=allFoods().filter(matches);
 var list=document.getElementById('food-list')||document.querySelector('[id*="food-list"]');
 if(typeof window.renderFoodList==='function'){
  try{
   var oldQ=window.cyFoodSearchQuery;
   window.cyFoodSearchQuery=filter.query;
   window.renderFoodList(foods);
   window.cyFoodSearchQuery=oldQ;
  }catch(e){}
 }
 var count=document.getElementById('cy-food-result-count');
 if(count)count.textContent=foods.length+' مورد پیدا شد';
}
function inject(){
 style();
 var page=document.getElementById('tab-foods');
 if(!page||document.getElementById('cy-food-tools'))return;
 var box=document.createElement('div');box.id='cy-food-tools';box.className='cy-food-tools';
 box.innerHTML='<div class="cy-food-tools-title">🔎 جست‌وجوی هوشمند غذا</div>'+
 '<div class="cy-food-chips">'+
 '<button class="cy-food-chip active" data-kind="all">همه</button>'+
 '<button class="cy-food-chip" data-kind="iranian">🇮🇷 ایرانی</button>'+
 '<button class="cy-food-chip" data-kind="protein">🥩 پروتئینی</button>'+
 '<button class="cy-food-chip" data-kind="low">🥗 کم‌کالری</button></div>'+
 '<div class="cy-food-filters">'+
 '<input id="cy-food-query" placeholder="نام غذا را جست‌وجو کن...">'+
 '<input id="cy-food-max" type="number" min="0" placeholder="حداکثر کالری">'+
 '</div>'+
 '<div id="cy-food-result-count" class="cy-food-summary"></div>';
 page.prepend(box);
 box.querySelectorAll('.cy-food-chip').forEach(function(b){b.onclick=function(){
  box.querySelectorAll('.cy-food-chip').forEach(function(x){x.classList.remove('active')});b.classList.add('active');
  filter.kind=b.dataset.kind;render();
 }});
 var q=document.getElementById('cy-food-query'),m=document.getElementById('cy-food-max');
 q.oninput=function(){filter.query=q.value;render()};m.oninput=function(){filter.maxKcal=m.value;render()};
 setTimeout(render,400);
}
document.addEventListener('DOMContentLoaded',function(){setTimeout(inject,800)});
if(document.readyState!=='loading')setTimeout(inject,300);
})();