/* CalorieYar — Account & Referral Foundation
 * First registration is intentionally local/offline-ready; real server authentication
 * must be connected before release for cross-device referral validation.
 */
(function(){
'use strict';
if(window.__CY_REFERRAL__)return;window.__CY_REFERRAL__=true;
const KEY='calorie_yar_account_v1';let st={registered:false,userId:'',referralCode:'',referredBy:'',activated:false,referrals:[],coinsEarned:0};
try{st=Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
function id(){return 'CY'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).slice(2,7).toUpperCase()}
function code(){return 'CY-'+Math.random().toString(36).slice(2,8).toUpperCase()}
function ensure(){if(!st.userId)st.userId=id();if(!st.referralCode)st.referralCode=code();save()}
function activate(){ensure();if(st.registered&&!st.activated){const food=typeof cy410Entries==='function'?cy410Entries().length:0;if(food>0){st.activated=true;save()}}}
function open(){
 ensure();let m=document.getElementById('cy-account-modal');if(!m){m=document.createElement('div');m.id='cy-account-modal';m.className='modal';m.innerHTML='<div class="modal-content"><h3>👤 حساب و دعوت دوستان</h3><p style="font-size:.78rem;color:var(--text-sub);margin:8px 0">کد دعوت هر کاربر یکتا است. پاداش فقط پس از فعال‌سازی واقعی حساب ثبت می‌شود.</p><div class="form-group"><label>کد دعوت (فقط هنگام ثبت اولیه)</label><input id="cy-ref-input" placeholder="مثلاً CY-ABC123"></div><div class="card"><b>کد دعوت شما</b><div style="font-size:1.5rem;color:var(--accent);text-align:center;margin:8px">'+st.referralCode+'</div><div>دعوت‌های معتبر: <b>'+st.referrals.length+'</b></div><div>پاداش دریافت‌شده: <b>'+st.coinsEarned+'</b> سکه</div></div><div class="modal-actions"><button class="btn btn-sub" onclick="document.getElementById(\'cy-account-modal\').style.display=\'none\'">بستن</button><button class="btn" onclick="cyRegisterAccount()">ثبت/فعال‌سازی</button></div></div>';document.body.appendChild(m)}
 document.getElementById('cy-ref-input').value=st.referredBy||'';m.style.display='flex'
}
window.cyOpenAccountReferral=open;
window.cyRegisterAccount=function(){
 ensure();if(!st.registered){const r=document.getElementById('cy-ref-input').value.trim().toUpperCase();if(r&&r===st.referralCode){alert('کد دعوت خودتان قابل استفاده نیست.');return}st.referredBy=r||'';st.registered=true}
activate();save();alert(st.activated?'حساب فعال شد.':'حساب ثبت شد؛ پس از ثبت اولین غذای واقعی، فعال‌سازی تکمیل می‌شود.');location.reload()
};
function inject(){const d=document.getElementById('tab-settings');if(!d||document.getElementById('cy-account-card'))return;const b=document.createElement('div');b.id='cy-account-card';b.className='card';b.innerHTML='<div class="card-title">👤 حساب و دعوت دوستان</div><div style="font-size:.8rem;color:var(--text-sub)">دعوت نامحدود + پاداش پس از فعال‌سازی</div><button class="btn" style="width:100%;margin-top:10px" onclick="cyOpenAccountReferral()">مدیریت حساب و دعوت</button>';d.appendChild(b)}
ensure();activate();document.addEventListener('DOMContentLoaded',()=>setTimeout(inject,550));if(document.readyState!=='loading')setTimeout(inject,120);
})();