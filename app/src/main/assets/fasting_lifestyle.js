/* CalorieYar — Fasting & Lifestyle Pack
 * Offline-first fasting timer, schedules, history, mood and notes.
 */
(function(){
  'use strict';
  if(window.__CY_FASTING_LIFESTYLE__) return;
  window.__CY_FASTING_LIFESTYLE__ = true;

  const KEY='calorie_yar_fasting_v1';
  const MODAL='cy-fasting-modal';
  const plans=[
    {id:'12:12',label:'12:12',fast:12,eat:12},
    {id:'14:10',label:'14:10',fast:14,eat:10},
    {id:'16:8',label:'16:8',fast:16,eat:8},
    {id:'18:6',label:'18:6',fast:18,eat:6},
    {id:'20:4',label:'20:4',fast:20,eat:4}
  ];

  function load(){
    try{
      const x=JSON.parse(localStorage.getItem(KEY)||'{}');
      return Object.assign({plan:'16:8',sessions:[],active:null,reminders:true},x);
    }catch(e){return {plan:'16:8',sessions:[],active:null,reminders:true};}
  }
  let st=load();
  function save(){localStorage.setItem(KEY,JSON.stringify(st));}
  function esc(v){return String(v??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
  function pad(n){return String(n).padStart(2,'0');}
  function fmt(ms){
    ms=Math.max(0,ms);
    const s=Math.floor(ms/1000), d=Math.floor(s/86400), h=Math.floor(s%86400/3600), m=Math.floor(s%3600/60), sec=s%60;
    return (d?d+'d ':'')+pad(h)+':'+pad(m)+':'+pad(sec);
  }
  function plan(){return plans.find(p=>p.id===st.plan)||plans[2];}
  function activePhase(){
    if(!st.active) return null;
    const p=plan(), start=st.active.start, elapsed=Math.max(0,Date.now()-start);
    const fastMs=p.fast*3600000, cycle=(p.fast+p.eat)*3600000, pos=elapsed%cycle;
    return {fasting:pos<fastMs,elapsed,remaining:(pos<fastMs?fastMs-pos:cycle-pos),cycle};
  }
  function ensureModal(){
    if(document.getElementById(MODAL)) return;
    const el=document.createElement('div');
    el.id=MODAL; el.className='modal';
    el.innerHTML='<div class="modal-content" style="max-width:460px;max-height:90vh;overflow:auto">'+
      '<h3 style="margin-bottom:8px">⏱️ روزه‌داری و سبک زندگی</h3>'+
      '<div id="cy-fast-status" class="card" style="margin:10px 0;text-align:center"></div>'+
      '<div class="filter-btn-group" id="cy-fast-plans"></div>'+
      '<div class="form-group"><label>حال امروز</label><select id="cy-fast-mood"><option value="">انتخاب نشده</option><option>عالی</option><option>خوب</option><option>معمولی</option><option>خسته</option><option>ضعیف</option></select></div>'+
      '<div class="form-group"><label>یادداشت روزه‌داری</label><textarea id="cy-fast-note" style="width:100%;min-height:70px;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-main);color:var(--text-main)" placeholder="مثلاً امروز انرژی خوبی داشتم..."></textarea></div>'+
      '<div class="modal-actions"><button class="btn btn-sub" onclick="cyCloseFasting()">بستن</button><button class="btn" onclick="cySaveFastingNote()">ذخیره یادداشت</button></div>'+
      '<div id="cy-fast-history" style="margin-top:14px"></div>'+
      '</div>';
    document.body.appendChild(el);
    el.addEventListener('click',e=>{if(e.target===el)cyCloseFasting();});
  }
  function render(){
    ensureModal();
    const box=document.getElementById('cy-fast-status'), phase=activePhase(), p=plan();
    let html='<div style="font-size:.8rem;color:var(--text-sub)">برنامه فعلی</div><div style="font-size:1.7rem;font-weight:800;color:var(--accent);margin:4px">'+p.label+'</div>';
    if(st.active){
      html+=(phase.fasting
        ? '<div style="font-weight:700">در حال روزه‌داری 🔥</div><div style="font-size:1.8rem;font-weight:800;margin:5px 0">'+fmt(phase.remaining)+'</div><div style="font-size:.75rem;color:var(--text-sub)">زمان باقی‌مانده</div>'
        : '<div style="font-weight:700">پنجره غذایی 🍽️</div><div style="font-size:1.8rem;font-weight:800;margin:5px 0">'+fmt(phase.remaining)+'</div><div style="font-size:.75rem;color:var(--text-sub)">تا پایان پنجره غذایی</div>');
      html+='<button class="btn btn-burn" style="margin-top:10px;width:100%" onclick="cyFinishFasting()">پایان این دوره</button>';
    }else{
      html+='<div style="color:var(--text-sub);margin:8px">دوره‌ای فعال نیست</div><button class="btn" style="width:100%" onclick="cyStartFasting()">شروع روزه‌داری</button>';
    }
    box.innerHTML=html;
    const plansBox=document.getElementById('cy-fast-plans');
    plansBox.innerHTML=plans.map(x=>'<button class="filter-btn '+(x.id===st.plan?'active':'')+'" onclick="cySetFastingPlan(\''+x.id+'\')">'+x.label+'</button>').join('');
    const today=new Date().toISOString().slice(0,10);
    const last=(st.sessions||[]).find(x=>x.date===today);
    document.getElementById('cy-fast-mood').value=last?.mood||'';
    document.getElementById('cy-fast-note').value=last?.note||'';
    const hist=(st.sessions||[]).slice(0,10);
    document.getElementById('cy-fast-history').innerHTML='<div class="card-title">تاریخچه اخیر</div>'+
      (hist.length?hist.map(x=>'<div class="log-row"><div><b>'+esc(x.plan)+'</b><small>'+esc(x.date)+' · '+esc(x.mood||'بدون حال ثبت‌شده')+'</small></div><div style="color:var(--accent)">'+(x.duration?fmt(x.duration):'ثبت شد')+'</div></div>').join(''):'<div class="empty-log">هنوز سابقه‌ای ثبت نشده است.</div>');
  }
  function open(){ensureModal();document.getElementById(MODAL).style.display='flex';render();}
  function close(){const e=document.getElementById(MODAL);if(e)e.style.display='none';}
  window.cyOpenFasting=open; window.cyCloseFasting=close;
  window.cySetFastingPlan=function(id){if(plans.some(x=>x.id===id)){st.plan=id;save();render();}};
  window.cyStartFasting=function(){
    if(st.active) return;
    st.active={start:Date.now(),plan:st.plan};
    save(); render();
  };
  window.cyFinishFasting=function(){
    if(!st.active)return;
    const elapsed=Date.now()-st.active.start;
    const date=new Date(st.active.start).toISOString().slice(0,10);
    st.sessions=st.sessions||[];
    const old=st.sessions.find(x=>x.date===date);
    const rec={date,plan:st.active.plan,duration:elapsed,mood:old?.mood||'',note:old?.note||''};
    st.sessions=[rec,...st.sessions.filter(x=>x.date!==date)].slice(0,180);
    st.active=null; save(); render();
    if(typeof window.cy410Save==='function') try{window.cy410Save();}catch(e){}
  };
  window.cySaveFastingNote=function(){
    const date=new Date().toISOString().slice(0,10);
    st.sessions=st.sessions||[];
    const old=st.sessions.find(x=>x.date===date)||{date,plan:st.plan,duration:0};
    old.plan=st.active?.plan||old.plan||st.plan;
    old.mood=document.getElementById('cy-fast-mood').value;
    old.note=document.getElementById('cy-fast-note').value.trim();
    st.sessions=[old,...st.sessions.filter(x=>x.date!==date)].slice(0,180);
    save(); render();
  };
  setInterval(()=>{if(document.getElementById(MODAL)?.style.display==='flex'&&st.active)render();},1000);

  function inject(){
    const host=document.getElementById('tab-dashboard')||document.getElementById('tab-settings');
    if(!host||document.getElementById('cy-fasting-card'))return;
    const card=document.createElement('div'); card.id='cy-fasting-card'; card.className='card';
    card.innerHTML='<div class="card-title">⏱️ روزه‌داری و سبک زندگی</div><div id="cy-fast-mini" style="text-align:center;color:var(--text-sub);margin-bottom:10px">برنامه 16:8 آماده است</div><button class="btn" style="width:100%" onclick="cyOpenFasting()">باز کردن تایمر روزه‌داری</button>';
    host.appendChild(card);
  }
  function mini(){
    const e=document.getElementById('cy-fast-mini'); if(!e)return;
    if(!st.active){e.textContent='برنامه '+st.plan+' آماده است';return;}
    const p=activePhase();e.textContent=(p.fasting?'🔥 روزه‌داری فعال · ':'🍽️ پنجره غذایی · ')+fmt(p.remaining);
  }
  const oldRender=window.cy410Render;
  if(typeof oldRender==='function')window.cy410Render=function(){oldRender.apply(this,arguments);inject();mini();};
  document.addEventListener('DOMContentLoaded',()=>{inject();mini();});
  setInterval(mini,1000);
})();