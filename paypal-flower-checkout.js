(()=>{
'use strict';
const CLIENT_ID='BAAgSDo_0Cmb4ee0TG67mtS6vY9U0rzPU2v433twNrwdKO9d22BPcQB7a9AT6CQlVjE4PJUb2xg-Jgwn3U';
const BASE='https://csbgmzfvwqwhcbvvhgxw.supabase.co/functions/v1';
const KEY='sb_publishable_-Yq8Zt1tR2Kll07EXuKavA_yX4I56H3';
const HEAD={'Content-Type':'application/json',apikey:KEY,Authorization:'Bearer '+KEY};
let current=null,currentId=0,fillHooked=false,openHooked=false,renderSeq=0;
const orderContext=new Map();
const zh=()=>document.documentElement.lang!=='en';
function toast(s){window.showToast?window.showToast(s):alert(s)}
function hookDetail(){
 if(!fillHooked&&typeof window.fillDetail==='function'){const old=window.fillDetail;window.fillDetail=function(g){current=g||null;const id=Number(g?.id);if(id)currentId=id;return old.apply(this,arguments)};fillHooked=true}
 if(!openHooked&&typeof window.openDetail==='function'){const old=window.openDetail;window.openDetail=function(id){const n=Number(id);if(n)currentId=n;return old.apply(this,arguments)};openHooked=true}
 return fillHooked||openHooked;
}
function graveId(){const a=Number(current?.id);if(a)return a;if(currentId)return currentId;const dlg=document.getElementById('detailDialog');const ds=Number(dlg?.dataset?.graveId||dlg?.dataset?.id);if(ds)return ds;return 0}
function loadSdk(){if(window.paypal)return Promise.resolve();return new Promise((ok,bad)=>{const old=document.querySelector('script[data-ig-paypal]');if(old){old.addEventListener('load',ok,{once:true});old.addEventListener('error',bad,{once:true});return}const s=document.createElement('script');s.dataset.igPaypal='1';s.src='https://www.paypal.com/sdk/js?client-id='+encodeURIComponent(CLIENT_ID)+'&currency=USD&intent=capture&components=buttons&enable-funding=card';s.onload=ok;s.onerror=bad;document.head.appendChild(s)})}
function selectedGift(){return document.querySelector('#ig-flower-gift-modal .ig-fg-card.sel')?.dataset.gift||'bouquet'}
function fields(){const d=document.getElementById('ig-flower-gift-modal');const input=d?.querySelector('.ig-fg-field input');const area=d?.querySelector('.ig-fg-field textarea');return {display_name:(input?.value||'').trim().slice(0,40),message:(area?.value||'').trim().slice(0,120)}}
async function post(path,body){const r=await fetch(BASE+'/'+path,{method:'POST',headers:HEAD,body:JSON.stringify(body)});let data={};try{data=await r.json()}catch{}if(!r.ok||data?.success===false)throw new Error(data?.error||data?.message||('HTTP '+r.status));return data}
function ensureHost(){const d=document.getElementById('ig-flower-gift-modal');if(!d?.open)return null;let h=d.querySelector('#ig-paypal-host');if(!h){h=document.createElement('div');h.id='ig-paypal-host';h.style.cssText='margin-top:12px;min-height:45px';const pay=d.querySelector('.ig-fg-pay');pay?.insertAdjacentElement('afterend',h);if(pay)pay.style.display='none'}return h}
async function render(){const host=ensureHost();if(!host)return;const seq=++renderSeq;host.innerHTML='<div style="padding:11px;text-align:center;color:#aaa;font-size:11px">'+(zh()?'正在載入 PayPal 測試付款…':'Loading PayPal sandbox checkout…')+'</div>';try{await loadSdk();if(seq!==renderSeq||!host.isConnected)return;host.innerHTML='';if(!window.paypal?.Buttons)throw new Error('PayPal SDK unavailable');await window.paypal.Buttons({
 style:{layout:'vertical',shape:'rect',label:'paypal',height:42},
 createOrder:async()=>{const id=graveId();if(!id)throw new Error(zh()?'找不到目前墓碑資料，請關閉視窗後重新打開墓碑':'Current grave not found. Reopen the grave and try again.');const giftType=selectedGift(),f=fields();const ctx={grave_id:id,gift_type:giftType,display_name:f.display_name,message:f.message};const data=await post('paypal-create-order',ctx);if(!data.order_id)throw new Error('Missing PayPal order id');orderContext.set(data.order_id,ctx);try{sessionStorage.setItem('ig_paypal_'+data.order_id,JSON.stringify(ctx))}catch{}return data.order_id},
 onApprove:async(data)=>{let ctx=orderContext.get(data.orderID)||null;if(!ctx){try{ctx=JSON.parse(sessionStorage.getItem('ig_paypal_'+data.orderID)||'null')}catch{}}if(!ctx){const id=graveId(),giftType=selectedGift(),f=fields();ctx={grave_id:id,gift_type:giftType,display_name:f.display_name,message:f.message}}if(!ctx.grave_id||!ctx.gift_type)throw new Error(zh()?'付款資料缺少墓碑或花種，請重新打開墓碑再試':'Payment context is missing grave or gift type. Reopen the grave and try again.');toast(zh()?'付款已授權，正在完成紀錄…':'Payment approved. Saving tribute…');try{const out=await post('paypal-capture-order',{order_id:data.orderID,grave_id:ctx.grave_id,gift_type:ctx.gift_type,display_name:ctx.display_name,message:ctx.message});orderContext.delete(data.orderID);try{sessionStorage.removeItem('ig_paypal_'+data.orderID)}catch{}toast(zh()?'✓ 測試付款成功，特別獻花已留下':'✓ Sandbox payment complete. Tribute saved.');document.getElementById('ig-flower-gift-modal')?.close();setTimeout(()=>{if(current&&typeof window.fillDetail==='function')window.fillDetail(current);window.dispatchEvent(new CustomEvent('ig-flower-gift-saved',{detail:{graveId:ctx.grave_id,giftType:ctx.gift_type,fulfillment:out.fulfillment}}))},350)}catch(e){console.error(e);toast((zh()?'付款已授權，但完成紀錄失敗：':'Payment approved but fulfillment failed: ')+e.message)}},
 onCancel:()=>toast(zh()?'已取消付款':'Payment cancelled'),
 onError:e=>{console.error('PayPal',e);toast(zh()?'PayPal 測試付款發生錯誤：':'PayPal sandbox error: ')+(e?.message||String(e)))}
 }).render(host)}catch(e){console.error(e);host.innerHTML='<div style="padding:11px;border:1px solid #633;border-radius:9px;color:#e0aeb8;font-size:11px">'+(zh()?'PayPal 載入失敗：':'PayPal failed to load: ')+(e?.message||String(e))+'</div>'}}
function watch(){const d=document.getElementById('ig-flower-gift-modal');if(!d)return false;new MutationObserver(()=>{if(d.open)setTimeout(render,80)}).observe(d,{attributes:true,attributeFilter:['open']});d.addEventListener('click',e=>{if(e.target.closest('.ig-fg-card'))setTimeout(render,40)});return true}
function start(){hookDetail();let n=0;const iv=setInterval(()=>{hookDetail();if((fillHooked&&openHooked&&watch())||++n>100)clearInterval(iv)},100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();