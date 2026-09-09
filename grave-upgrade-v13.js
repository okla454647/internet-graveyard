(()=>{
'use strict';
const URL='https://csbgmzfvwqwhcbvvhgxw.supabase.co';
const KEY='sb_publishable_-Yq8Zt1tR2Kll07EXuKavA_yX4I56H3';
const H={apikey:KEY,Authorization:'Bearer '+KEY};
let map=new Map(),busy=false,painting=false;
function css(){if(document.getElementById('ig-v13-css'))return;const s=document.createElement('style');s.id='ig-v13-css';s.textContent=`
body:not(.memorial-mode) #graveyard .grave.ig13-obsidian{position:relative!important;overflow:hidden!important;border:3px solid #d8e0e4!important;background:linear-gradient(135deg,#24282b 0%,#090b0c 52%,#010202 100%)!important;box-shadow:inset 0 0 0 1px #5c656a,0 0 0 1px #0c0e0f,0 0 28px rgba(220,230,235,.34)!important}
body:not(.memorial-mode) #graveyard .grave.ig13-obsidian::before{content:'◆ BLACK OBSIDIAN';position:absolute;left:16px;top:14px;z-index:5;padding:6px 10px;border:1px solid #c9d2d7;border-radius:999px;background:#030404;color:#f0f4f6;font:900 9px/1 Inter,system-ui,sans-serif;letter-spacing:.11em}
body:not(.memorial-mode) #graveyard .grave.ig13-obsidian::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;background:linear-gradient(115deg,transparent 0 39%,rgba(255,255,255,.11) 48%,transparent 57%)}
body:not(.memorial-mode) #graveyard .grave.ig13-obsidian .stone{filter:grayscale(1) brightness(1.45);text-shadow:0 0 16px rgba(225,235,240,.38)}
body:not(.memorial-mode) #graveyard .grave.ig13-obsidian h3{color:#f2f5f6!important}
body:not(.memorial-mode) #graveyard .grave.ig13-gold{position:relative!important;overflow:hidden!important;border:3px solid #edc75f!important;background:linear-gradient(135deg,#3a2e10 0%,#151005 52%,#040301 100%)!important;box-shadow:inset 0 0 0 1px #826725,0 0 0 1px #1e1605,0 0 30px rgba(237,199,95,.36)!important}
body:not(.memorial-mode) #graveyard .grave.ig13-gold::before{content:'✦ GOLD MONUMENT';position:absolute;left:16px;top:14px;z-index:5;padding:6px 10px;border:1px solid #edc75f;border-radius:999px;background:#211907;color:#ffe39a;font:900 9px/1 Inter,system-ui,sans-serif;letter-spacing:.11em}
body:not(.memorial-mode) #graveyard .grave.ig13-gold::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;background:linear-gradient(115deg,transparent 0 39%,rgba(255,230,153,.13) 48%,transparent 57%)}
body:not(.memorial-mode) #graveyard .grave.ig13-gold h3{color:#ffe39a!important}
body:not(.memorial-mode) #graveyard .grave.recently-resurrected.ig13-obsidian{border-color:#d8e0e4!important;box-shadow:inset 0 0 0 1px #5c656a,0 0 0 1px #0c0e0f,0 0 28px rgba(220,230,235,.34)!important}
body:not(.memorial-mode) #graveyard .grave.recently-resurrected.ig13-gold{border-color:#edc75f!important;box-shadow:inset 0 0 0 1px #826725,0 0 0 1px #1e1605,0 0 30px rgba(237,199,95,.36)!important}
`;document.head.appendChild(s)}
async function refresh(){if(busy)return;busy=true;try{const r=await fetch(`${URL}/rest/v1/graves?grave_type=eq.project&select=type_number,monument_tier&monument_tier=in.(obsidian,gold)`,{headers:H});if(r.ok){const a=await r.json();map=new Map(a.map(x=>[Number(x.type_number),x.monument_tier]));}}catch(e){console.warn('v13 tier fetch',e)}finally{busy=false}}
function numberFromDetail(){const el=document.getElementById('graveNumber');const m=(el?.textContent||'').match(/#\s*(\d+)/);return m?Number(m[1]):null}
function discoverCardNumber(card){if(card.dataset.igTypeNumber)return Number(card.dataset.igTypeNumber);const btn=card.querySelector('.cover');const dlg=document.getElementById('detailDialog');if(!btn||!dlg)return null;const wasOpen=dlg.open;const originalShow=dlg.showModal;try{dlg.showModal=()=>{};btn.click();const n=numberFromDetail();if(n){card.dataset.igTypeNumber=String(n);return n}}catch(e){console.warn('v13 discover',e)}finally{dlg.showModal=originalShow;if(!wasOpen&&dlg.open){try{dlg.close()}catch(e){}}}return null}
function paint(){if(painting||document.body.classList.contains('memorial-mode'))return;painting=true;try{document.querySelectorAll('#graveyard .grave').forEach(card=>{card.classList.remove('ig13-obsidian','ig13-gold');const n=discoverCardNumber(card);if(!n)return;const tier=map.get(n);if(tier==='obsidian'||tier==='gold')card.classList.add('ig13-'+tier)})}finally{painting=false}}
async function run(){await refresh();paint()}
function start(){css();run();const obs=new MutationObserver(()=>setTimeout(paint,0));const gy=document.getElementById('graveyard');if(gy)obs.observe(gy,{childList:true});setInterval(paint,900);setInterval(()=>refresh().then(paint),6000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();