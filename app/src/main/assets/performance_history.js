/* CALORIE YAR - PERFORMANCE HISTORY + MOTIVATION */
(function(){
  'use strict';
  if(window.__CY_PERFORMANCE_HISTORY)return;
  window.__CY_PERFORMANCE_HISTORY=true;

  var KEY='calorie_yar_performance_v1';
  var cfg={fullHistoryUnlocked:false};
  try{cfg=Object.assign(cfg,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
  function save(){localStorage.setItem(KEY,JSON.stringify(cfg))}
  function num(v){var n=Number(v);return Number.isFinite(n)?n:0}
  function dateKey(d){return d.toISOString().slice(0,10)}
  function today(){return typeof cy410Today==='function'?cy410Today():dateKey(new Date())}
  function entries(){return typeof cy410Entries==='function'?cy410Entries():[]}
  function waterFor(k){
    if(window.cy410&&cy410.waterByDate&&cy410.waterByDate[k])return cy410.waterByDate[k];
    return {glasses:0,ml:0,target:8};
  }
  function dayData(k){
    var arr=entries().filter(function(e){return e.date===k});
    var calories=arr.reduce(function(s,e){return s+num(e.cal);},0);
    var protein=arr.reduce(function(s,e){return s+num(e.protein);},0);
    var w=waterFor(k);
    var ex=(window.cy410&&Array.isArray(cy410.exerciseHistory)?cy410.exerciseHistory:[]).filter(function(e){return e.date===k});
    var exercise=ex.reduce(function(s,e){return s+num(e.cal);},0);
    var goal=num(window.cy410&&cy410.calorieGoal)||num(window.userData&&userData.dailyCalorieGoal)||2000;
    var target=num(w.target)||8;
    var foodOk=calories>0;
    var calorieOk=foodOk && calories>=goal*.8 && calories<=goal*1.15;
    var waterOk=num(w.glasses)>=target*.7;
    var exerciseDone=ex.length>0;
    var score=(foodOk?1:0)+(calorieOk?1:0)+(waterOk?1:0);
    var success=score>=2;
    return {date:k,calories:calories,goal:goal,protein:protein,glasses:num(w.glasses),waterTarget:target,exercise:exercise,foodOk:foodOk,calorieOk:calorieOk,waterOk:waterOk,exerciseDone:exerciseDone,score:score,success:success};
  }
  function history(days){
    var out=[],d=new Date();
    for(var i=0;i<days;i++){
      var x=new Date(d);x.setDate(d.getDate()-i);
      out.push(dayData(dateKey(x)));
    }
    return out;
  }
  function stats(rows){
    var success=rows.filter(function(x){return x.success}).length;
    var bad=rows.length-success;
    var current=0;
    for(var i=0;i<rows.length;i++){if(rows[i].success)current++;else break}
    var best=0,run=0;
    rows.slice().reverse().forEach(function(x){if(x.success){run++;best=Math.max(best,run)}else run=0});
    return {success:success,bad:bad,rate:rows.length?Math.round(success*100/rows.length):0,current:current,best:best};
  }
  function motivation(){
    var y=new Date();y.setDate(y.getDate()-1);
    var d=dayData(dateKey(y));
    if(d.success){
      var msgs=[
        'آفرین! دیروز خیلی خوب پیش رفتی 👏 همین استمرار نتیجه می‌سازه.',
        'عالی بود! دیروز به خودت و هدفت وفادار موندی 💪 امروز هم ادامه بده.',
        'یک روز موفق دیگر ثبت شد 🌱 قدم‌های کوچک، نتیجه‌های بزرگ می‌سازند.'
      ];
      return {ok:true,text:msgs[(new Date()).getDate()%msgs.length]};
    }
    return {ok:false,text:'اشکالی نداره؛ یک روز ضعیف مسیرت رو خراب نمی‌کنه. امروز دوباره شروع کن 💚'};
  }
  function styles(){
    if(document.getElementById('cy-performance-style'))return;
    var s=document.createElement('style');s.id='cy-performance-style';
    s.textContent='.cy-performance{background:var(--bg-card);border:1px solid var(--border);border-radius:17px;padding:14px;margin:10px 0}.cy-performance-title{display:flex;justify-content:space-between;align-items:center;gap:8px;font-weight:900}.cy-performance-muted{color:var(--text-sub);font-size:.68rem}.cy-performance-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:10px}.cy-performance-grid>div{background:rgba(16,185,129,.06);border:1px solid var(--border);border-radius:12px;text-align:center;padding:9px 3px}.cy-performance-grid b{display:block;font-size:1rem}.cy-performance-grid small{color:var(--text-sub);font-size:.62rem}.cy-performance-chart{height:220px;margin-top:10px}.cy-performance-modal{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:900;display:none;align-items:center;justify-content:center;padding:14px}.cy-performance-modal.open{display:flex}.cy-performance-modal>div{width:100%;max-width:460px;max-height:90vh;overflow:auto;background:var(--bg-card);border:1px solid var(--border);border-radius:18px;padding:14px}.cy-performance-row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 4px;border-bottom:1px solid var(--border);font-size:.72rem}.cy-performance-row:last-child{border-bottom:0}.cy-performance-success{color:var(--accent);font-weight:900}.cy-performance-bad{color:#f59e0b;font-weight:900}.cy-performance-btn{width:100%;border:1px solid var(--border);background:var(--bg-main);color:var(--text-main);border-radius:11px;padding:10px;margin-top:8px;font:inherit}.cy-performance-btn.primary{background:var(--accent);color:#fff;border-color:var(--accent)}@media(max-width:380px){.cy-performance-grid{grid-template-columns:repeat(2,1fr)}}';
    document.head.appendChild(s);
  }
  function modal(){
    var m=document.getElementById('cy-performance-modal');
    if(!m){
      m=document.createElement('div');m.id='cy-performance-modal';m.className='cy-performance-modal';
      m.innerHTML='<div id="cy-performance-modal-body"></div>';
      m.onclick=function(e){if(e.target===m)m.classList.remove('open')};
      document.body.appendChild(m);
    }
    return m;
  }
  function renderChart(rows){
    var c=document.getElementById('cy-performance-chart-canvas');
    if(!c||!window.Chart)return;
    var labels=rows.slice().reverse().map(function(x){return x.date.slice(5)});
    var vals=rows.slice().reverse().map(function(x){return x.success?1:0});
    if(window.cyPerformanceChart)window.cyPerformanceChart.destroy();
    window.cyPerformanceChart=new Chart(c,{type:'bar',data:{labels:labels,datasets:[{label:'عملکرد روزانه',data:vals,borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,scales:{y:{min:0,max:1,ticks:{stepSize:1,callback:function(v){return v===1?'موفق':'نیازمند بهبود'}}}},plugins:{legend:{display:false},tooltip:{callbacks:{label:function(ctx){return ctx.raw===1?'روز موفق':'روز نیازمند بهبود'}}}}}});
  }
  function performancePanel(){
    styles();
    var rows=history(7),s=stats(rows),m=motivation();
    var d=rows[0];
    var html='<div class="cy-performance"><div class="cy-performance-title"><span>'+(m.ok?'👏 '+m.text:'🌱 '+m.text)+'</span></div><div class="cy-performance-muted" style="margin-top:7px">عملکرد دیروز بر اساس ثبت غذا، میزان نزدیک بودن کالری به هدف و آب روزانه بررسی می‌شود.</div></div>';
    html+='<div class="cy-performance"><div class="cy-performance-title"><span>📊 عملکرد ۷ روز اخیر</span><span class="cy-performance-muted">'+s.rate+'٪ پایبندی</span></div><div class="cy-performance-grid"><div><b>'+s.success+'</b><small>روز موفق</small></div><div><b>'+s.bad+'</b><small>نیازمند بهبود</small></div><div><b>'+s.current+'</b><small>رکورد فعلی</small></div><div><b>'+s.best+'</b><small>بهترین رکورد</small></div></div><div class="cy-performance-chart"><canvas id="cy-performance-chart-canvas"></canvas></div><button class="cy-performance-btn primary" onclick="cyOpenPerformanceHistory()">📅 مشاهده تاریخچه عملکرد</button></div>';
    return html;
  }
  function injectDashboard(){
    var d=document.getElementById('tab-dashboard');if(!d||document.getElementById('cy-performance-home'))return;
    var box=document.createElement('div');box.id='cy-performance-home';box.innerHTML=performancePanel();d.appendChild(box);
    setTimeout(function(){renderChart(history(7))},100);
  }
  function openHistory(){
    styles();
    var rows=history(cfg.fullHistoryUnlocked?90:7),s=stats(rows);
    var title=cfg.fullHistoryUnlocked?'📅 تاریخچه کامل':'📅 تاریخچه ۷ روز اخیر';
    var list=rows.map(function(x){
      var status=x.success?'<span class="cy-performance-success">🟢 موفق</span>':'<span class="cy-performance-bad">🟠 نیازمند بهبود</span>';
      return '<div class="cy-performance-row"><span><b>'+x.date+'</b><small class="cy-performance-muted"> '+Math.round(x.calories)+' / '+Math.round(x.goal)+' kcal · 💧 '+x.glasses+'/'+x.waterTarget+'</small></span>'+status+'</div>';
    }).join('');
    var extra=cfg.fullHistoryUnlocked
      ? '<button class="cy-performance-btn" onclick="cyClosePerformanceHistory()">بستن</button>'
      : '<div class="cy-performance-muted" style="margin-top:8px">هفت روز اخیر رایگان است. تاریخچه کامل ۹۰ روزه با ۱۰۰ سکه باز می‌شود.</div><button class="cy-performance-btn primary" onclick="cyUnlockFullPerformance()">🔓 باز کردن تاریخچه کامل · ۱۰۰ 🪙</button><button class="cy-performance-btn" onclick="cyClosePerformanceHistory()">بستن</button>';
    var m=modal();document.getElementById('cy-performance-modal-body').innerHTML='<div class="cy-performance-title"><span>'+title+'</span><button class="cy-performance-btn" style="width:auto;margin:0" onclick="cyClosePerformanceHistory()">×</button></div><div class="cy-performance"><div class="cy-performance-grid"><div><b>'+s.success+'</b><small>موفق</small></div><div><b>'+s.bad+'</b><small>نیازمند بهبود</small></div><div><b>'+s.rate+'٪</b><small>پایبندی</small></div><div><b>'+s.best+'</b><small>رکورد</small></div></div></div>'+list+extra;
    m.classList.add('open');
  }
  window.cyOpenPerformanceHistory=openHistory;
  window.cyClosePerformanceHistory=function(){var m=document.getElementById('cy-performance-modal');if(m)m.classList.remove('open')};
  window.cyUnlockFullPerformance=function(){
    var coins=num(window.cy410&&cy410.coins);
    if(coins<100){alert('برای باز کردن تاریخچه کامل حداقل ۱۰۰ سکه لازم است.');return}
    if(typeof cy410AddCoin==='function')cy410AddCoin(-100,'performance_history_unlock');
    else {cy410.coins=Math.max(0,coins-100);if(typeof cy410Save==='function')cy410Save()}
    cfg.fullHistoryUnlocked=true;save();openHistory();
  };
  function boot(){
    styles();
    injectDashboard();
    setTimeout(function(){
      var b=document.getElementById('tab-stats');
      if(b&&!document.getElementById('cy-performance-stats')){
        var box=document.createElement('div');box.id='cy-performance-stats';box.innerHTML=performancePanel();b.prepend(box);
        setTimeout(function(){renderChart(history(7))},120);
      }
    },300);
  }
  window.cyPerformanceRefresh=function(){var h=document.getElementById('cy-performance-home');if(h)h.innerHTML=performancePanel();var s=document.getElementById('cy-performance-stats');if(s)s.innerHTML=performancePanel();setTimeout(function(){renderChart(history(7))},80)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(boot,500)});else setTimeout(boot,250);
})();
