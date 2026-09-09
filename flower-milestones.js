(()=>{
'use strict';
const levels=[
 {n:10,key:'sprout',zh:'初綻',en:'First Bloom'},
 {n:50,key:'bloom',zh:'花開',en:'In Bloom'},
 {n:100,key:'honored',zh:'百花致意',en:'100 Tributes'},
 {n:500,key:'garden',zh:'永恆花園',en:'Eternal Garden'},
 {n:1000,key:'legend',zh:'千花傳說',en:'Legend of 1,000'}
];
const zh=()=>document.documentElement.lang!=='en';
const num=s=>{const m=String(s||'').match(/[\d,]+/);return m?Number(m[0].replace(/,/g,'')):0};
function cardCount(card){const rc=card.querySelector('.respect-count');if(rc)return num(rc.textContent);const t=card.innerText||card.textContent||'';const m=t.match(/(?:致意|獻花|flowers?|tributes?)\s*[·:：]?\s*([\d,]+)/i);return m?Number(m[1].replace(/,/g,'')):0}
function detailCount(){const btn=document.getElementById('respectBtn');if(btn){const m=(btn.innerText||btn.textContent||'').match(/([\d,]+)\s*$/);if(m)return Number(m[1].replace(/,/g,''))}return 0}
function level(n){let x=null;for(const l of levels)if(n>=l.n)x=l;return x}
function addCss(){if(document.getElementById('ig-flower-css'))return;const s=document.createElement('style');s.id='ig-flower-css';s.textContent=`
.grave.ig-flower{position:relative!important;isolation:isolate}.ig-flower-badge{position:absolute!important;left:50%!important;bottom:12px!important;transform:translateX(-50%)!important;z-index:12!important;padding:5px 10px!important;border:1px solid rgba(224,155,169,.46)!important;border-radius:999px!important;background:rgba(28,12,17,.94)!important;color:#f0c3cb!important;font:800 9px/1 Inter,system-ui,sans-serif!important;white-space:nowrap;pointer-events:none!important}.ig-floral-frame{position:absolute!important;inset:7px!important;z-index:4!important;pointer-events:none!important;border-radius:15px!important;border:1px solid rgba(220,145,159,.34)!important;box-shadow:inset 0 0 0 5px rgba(7,8,7,.72),inset 0 0 0 7px rgba(217,141,155,.16)!important}.ig-floral-frame::before,.ig-floral-frame::after{content:'🌿 🌹 🌿 🌸 🌿 🌹 🌿';position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:16px}.ig-floral-frame::before{top:-10px}.ig-floral-frame::after{bottom:-10px}.ig-side-vine{position:absolute;top:50%;transform:translateY(-50%);writing-mode:vertical-rl;font-size:15px}.ig-side-vine.left{left:-8px}.ig-side-vine.right{right:-8px}.grave.ig-flower-legend .ig-floral-frame{border:2px solid rgba(241,174,188,.66)!important;box-shadow:inset 0 0 0 5px rgba(5,6,5,.84),inset 0 0 0 8px rgba(236,157,173,.24),0 0 30px rgba(227,139,159,.28)!important}.grave.ig-paid-gold .ig-floral-frame{box-shadow:inset 0 0 0 5px rgba(10,8,3,.86),inset 0 0 0 8px rgba(225,137,155,.25),0 0 28px rgba(224,133,153,.3)!important}@media(max-width:760px){.ig-side-vine{display:none}}
`;document.head.appendChild(s)}
function addFrame(card,n){if(n<500)return;const f=document.createElement('div');f.className='ig-floral-frame';f.innerHTML='<span class="ig-side-vine left">🌿🌹🌿🌸🌿</span><span class="ig-side-vine right">🌿🌸🌿🌹🌿</span>';card.appendChild(f)}
function decorateCard(card,n){const l=level(n),stamp=`${n}:${l?.key||'none'}`;if(card.dataset.igFlowerStamp===stamp)return;card.dataset.igFlowerStamp=stamp;card.classList.remove('ig-flower','ig-flower-sprout','ig-flower-bloom','ig-flower-honored','ig-flower-garden','ig-flower-legend');card.querySelectorAll('.ig-flower-badge,.ig-floral-frame').forEach(x=>x.remove());if(!l)return;card.classList.add('ig-flower','ig-flower-'+l.key);const b=document.createElement('span');b.className='ig-flower-badge';b.textContent=`🌹 ${n.toLocaleString()} · ${zh()?l.zh:l.en}`;card.appendChild(b);addFrame(card,n)}
function paintCards(){document.querySelectorAll('#graveyard .grave').forEach(c=>decorateCard(c,cardCount(c)))}
let busy=false,t=0;function run(){if(busy)return;busy=true;try{paintCards()}finally{busy=false}}function schedule(){clearTimeout(t);t=setTimeout(run,100)}
function start(){addCss();run();const gy=document.getElementById('graveyard');if(gy)new MutationObserver(schedule).observe(gy,{childList:true,subtree:true,characterData:true});document.addEventListener('click',e=>{if(e.target.closest?.('.grave,.respect-btn,[data-action="respect"],#respectBtn')){schedule();setTimeout(schedule,450)}},true)}
window.IGFlowerMilestones={levels,detailCount,level};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();