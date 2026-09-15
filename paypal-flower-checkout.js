(()=>{
'use strict';
const CLIENT_ID='BAAgSDo_0Cmb4ee0TG67mtS6vY9U0rzPU2v433twNrwdKO9d22BPcQB7a9AT6CQlVjE4PJUb2xg-Jgwn3U';
const BASE='https://csbgmzfvwqwhcbvvhgxw.supabase.co/functions/v1';
const KEY='sb_publishable_-Yq8Zt1tR2Kll07EXuKavA_yX4I56H3';
const HEAD={'Content-Type':'application/json',apikey:KEY,Authorization:'Bearer '+KEY};
let current=null,hooked=false,renderSeq=0;
const zh=()=>document.documentElement.lang!=='en';
function toast(s){window.showToast?window.showToast(s):alert(s)}
function hookDetail(){if(hooked||typeof window.fillDetail!=='function')return false;const old=window.fillDetail;window.fillDetail=function(g){current=g||null;return old.apply(this,arguments)};hooked=true;return true}
function loadSdk(){if(window.paypal)return Promise.resolve();return new Promise((ok,bad)=>{const old=document.querySelector('script[data-ig-paypal]');if(old){old.addEventListener('load',ok,{once:true});old.addEventListener('error',bad,{once:true});return}const s=document.createElement('script');s.dataset.igPaypal='1';s.src='https://www.paypal.com/sdk/js?client-id='+encodeURIComponent(CLIENT_ID)+'&currency=USD&intent=capture&components=buttons&enable-funding=card';s.onload=ok;s.onerror=bad;document.head.appendChild(s)})}
function selectedGift(){return document.querySelector('#ig-flower-gift-modal .ig-fg-card.sel')?.dataset.gift||'bouquet'}
function fields(){const d=document.getElementById('ig-flower-gift-modal');const input=d?.querySelector('.ig-fg-field input');const area=d?.querySelector('.ig-fg-field textarea');return {display_name:(input?.value||'').trim().slice(0,40),message:(area?.value||'').trim().slice(0,120)}}
async function post(path,body){const r=await fetch(BASE+'/'+path,{method:'POST',headers:HEAD,body:JSON.stringify(body)});let data={};try{data=await r.json()}catch{}if(!r.ok||data?.success===false)throw new Error(data?.error||data?.message||('HTTP '+r.status));return data}
function ensureHost(){const d=document.getElementById('ig-flower-gift-modal');if(!d?.open)return null;let h=d.querySelector('#ig-paypal-host');if(!h){h=document.createElement('div');h.id='ig-paypal-host';h.style.cssText='margin-top:12px;min-height:45px';const pay=d.querySelector('.ig-fg-pay');pay?.insertAdjacentElement('afterend',h);if(pay)pay.style.display='none'}return h}
async function render(){const host=ensureHost();if(!host)return;const seq=++renderSeq;host.innerHTML='<div style="padding:11px;text-align:center;color:#aaa;font-size:11px">'+(zh()?'正在載入 PayPal 測試付款…':'Loading PayPal sandbox checkout…')+'</div>';try{await loadSdk();if(seq!==renderSeq||!host.isConnected)return;host.innerHTML='';if(!window.paypal?.Buttons)throw new Error('PayPal SDK unavailable');await window.paypal.Buttons({
 style:{layout:'vertical',shape:'rect',label:'paypal',height:42},
 createOrder:async()=>{const graveId=Number(current?.id);if(!graveId)throw new Error(zh()?'找不到目前墓碑資料':'Current grave not found');const g=selectedGift(),f=fields();const data=await post('paypal-create-order',{grave_id:graveId,gift_type:g,display_name:f.display_name,message:f.message});if(!data.order_id)throw new Error('Missing PayPal order id');return data.order_id},
 onApprove:async(data)=>{const f=fields();toast(zh()?'付款已授權，正在完成紀錄…':'Payment approved. Saving tribute…');try{const out=await post('paypal-capture-order',{order_id:data.orderID,display_name:f.display_name,message:f.message});if(out.success===false)throw new Error(out.error||'Capture failed');toast(zh()?'✓ 測試付款成功，特別獻花已留下':'✓ Sandbox payment complete. Tribute saved.');document.getElementById('ig-flower-gift-modal')?.close();setTimeout(()=>{if(current&&typeof window.fillDetail==='function')window.fillDetail(current)},250)}catch(e){console.error(e);toast((zh()?'付款已授權，但完成紀錄失敗：':'Payment approved but fulfillment failed: ')+e.message)}},
 onCancel:()=>toast(zh()?'已取消付款':'Payment cancelled'),
 onError:e=>{console.error('PayPal',e);toast(zh()?'PayPal 測試付款發生錯誤，請截圖給我。':'PayPal sandbox error. Please send a screenshot.')}
 }).render(host)}catch(e){console.error(e);host.innerHTML='<div style="padding:11px;border:1px solid #633;border-radius:9px;color:#e0aeb8;font-size:11px">'+(zh()?'PayPal 載入失敗，請重新整理後再試。':'PayPal failed to load. Refresh and try again.')+'</div>'}}
function watch(){const d=document.getElementById('ig-flower-gift-modal');if(!d)return false;new MutationObserver(()=>{if(d.open)setTimeout(render,80)}).observe(d,{attributes:true,attributeFilter:['open']});d.addEventListener('click',e=>{if(e.target.closest('.ig-fg-card'))setTimeout(render,40)});return true}
function start(){hookDetail();let n=0;const iv=setInterval(()=>{hookDetail();if(watch()||++n>60)clearInterval(iv)},100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();