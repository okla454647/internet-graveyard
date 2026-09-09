(()=>{
'use strict';
const URL='https://csbgmzfvwqwhcbvvhgxw.supabase.co';
const KEY='sb_publishable_-Yq8Zt1tR2Kll07EXuKavA_yX4I56H3';
const H={apikey:KEY,Authorization:'Bearer '+KEY};
let tierMap=new Map(),busy=false;
function addCss(){if(document.getElementById('ig-v12-css'))return;const s=document.createElement('style');s.id='ig-v12-css';s.textContent=`
body:not(.memorial-mode) #graveyard .grave.ig12-obsidian{position:relative!important;overflow:hidden!important;border:3px solid #d8e0e4!important;background:linear-gradient(135deg,#24282b 0%,#090b0c 52%,#010202 100%)!important;box-shadow:inset 0 0 0 1px #5c656a,0 0 0 1px #0c0e0f,0 0 28px rgba(220,230,235,.34)!important}
body:not(.memorial-mode) #graveyard .grave.ig12-obsidian::before{content:'◆ BLACK OBSIDIAN';position:absolute;left:16px;top:14px;z-index:5;padding:6px 10px;border:1px solid #c9d2d7;border-radius:999px;background:#030404;color:#f0f4f6;font:900 9px/1 Inter,system-ui,sans-serif;letter-spacing:.11em}
body:not(.memorial-mode) #graveyard .grave.ig12-obsidian::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;background:linear-gradient(115deg,transparent 0 39%,rgba(255,255,255,.11) 48%,transparent 57%)}
body:not(.memorial-mode) #graveyard .grave.ig12-obsidian .stone{filter:grayscale(1) brightness(1.4);text-shadow:0 0 16px rgba(225,235,240,.38)}
body:not(.memorial-mode) #graveyard .grave.ig12-obsidian h3{color:#f2f5f6!important}
body:not(.memorial-mode) #graveyard .grave.ig12-gold{position:relative!important;overflow:hidden!important;border:3px solid #edc75f!important;background:linear-gradient(135deg,#3a2e10 0%,#151005 52%,#040301 100%)!important;box-shadow:inset 0 0 0 1px #826725,0 0 0 1px #1e1605,0 0 30px rgba(237,199,95,.36)!important}
body:not(.memorial-mode) #graveyard .grave.ig12-gold::before{content:'✦ GOLD MONUMENT';position:absolute;left:16px;top:14px;z-index:5;padding:6px 10px;border:1px solid #edc75f;border-radius:999px;background:#211907;color:#ffe39a;font:900 9px/1 Inter,system-ui,sans-serif;letter-spacing:.11em}
body:not(.memorial-mode) #graveyard .grave.ig12-gold::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;background:linear-gradient(115deg,transparent 0 39%,rgba(255,230,153,.13) 48%,transparent 57%)}
body:not(.memorial-mode) #graveyard .grave.ig12-gold h3{color:#ffe39a!important}
body:not(.memorial-mode) #graveyard .grave.recently-resurrected.ig12-obsidian{border-color:#d8e0e4!important;box-shadow:inset 0 0 0 1px #5c656a,0 0 0 1px #0c0e0f,0 0 28px rgba(220,230,235,.34)!important}
body:not(.memorial-mode) #graveyard .grave.recently-resurrected.ig12-gold{border-color:#edc75f!important;box-shadow:inset 0 0 0 1px #826725,0 0 0 1px #1e1605,0 0 30px rgba(237,199,95,.36)!important}
`;document.head.appendChild(s)}
async function refreshTiers(){if(busy)return;busy=true;try{const r=await fetch(`${URL}/rest/v1/graves?select=id,monument_tier&monument_tier=in.(obsidian,gold)`,{headers:H});if(r.ok){const rows=await r.json();tierMap=new Map(rows.map(x=>[Number(x.id),x.monument_tier]));}}catch(e){console.warn('tier refresh failed',e)}finally{busy=false}}
function paint(){if(document.body.classList.contains('memorial-mode'))return;let gs;try{gs=graves}catch(e){return}if(!Array.isArray(gs))return;const cards=[...document.querySelectorAll('#graveyard .grave')];cards.forEach((card,i)=>{card.classList.remove('ig12-obsidian','ig12-gold');card.querySelectorAll('.ig10-tag,.ig-v9-card-tag,.ig-v8-card-tag,.ig-v7-card-tag').forEach(x=>x.remove());const g=gs[i];if(!g)return;const tier=tierMap.get(Number(g.id));if(tier==='obsidian'||tier==='gold')card.classList.add('ig12-'+tier)});}
async function run(){await refreshTiers();paint()}
function start(){addCss();run();setInterval(()=>{paint()},350);setInterval(()=>{refreshTiers().then(paint)},5000);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();