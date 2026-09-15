(()=>{
'use strict';
const levels=[{n:10,key:'sprout',zh:'初綻',en:'First Bloom'},{n:50,key:'bloom',zh:'花開',en:'In Bloom'},{n:100,key:'honored',zh:'百花致意',en:'100 Tributes'},{n:200,key:'embraced',zh:'花擁',en:'Floral Embrace'},{n:500,key:'garden',zh:'永恆花園',en:'Eternal Garden'},{n:1000,key:'legend',zh:'千花傳說',en:'Legend of 1,000'}];
const petals=['🌸','🌹','🌺','🌸','🌹'];
const URL='https://csbgmzfvwqwhcbvvhgxw.supabase.co';
const KEY='sb_publishable_-Yq8Zt1tR2Kll07EXuKavA_yX4I56H3';
const H={apikey:KEY,Authorization:'Bearer '+KEY};
const paidByName=new Map();
const zh=()=>document.documentElement.lang!=='en';
const norm=s=>String(s||'').trim().replace(/\s+/g,' ');
function num(s){const all=String(s||'').match(/[\d,]+/g);return all?.length?Number(all[all.length-1].replace(/,/g,'')):0}
function title(c){return norm(c.querySelector('h3')?.textContent)}
function respectEl(c){return c.querySelector('.respect-count')}
function baseCount(c){const r=respectEl(c);if(!r)return 0;if(c.dataset.igBaseRespect==null)c.dataset.igBaseRespect=String(num(r.textContent));return Number(c.dataset.igBaseRespect)||0}
function total(c){return baseCount(c)+(Number(paidByName.get(title(c)))||0)}
function level(n){let out=null;for(const x of levels)if(n>=x.n)out=x;return out}
function installCss(){document.getElementById('ig-flower-css')?.remove();const s=document.createElement('style');s.id='ig-flower-css';s.textContent=`
@keyframes igCF{0%{transform:translateY(-28px) rotate(0);opacity:0}10%{opacity:.95}100%{transform:translateY(430px) rotate(390deg);opacity:0}}
@keyframes igCG{0%,100%{filter:none}50%{filter:drop-shadow(0 0 9px rgba(225,143,162,.32))}}
.grave.ig-flower{position:relative!important;isolation:isolate!important;overflow:hidden!important}
.ig-flower-badge{position:absolute!important;left:50%!important;bottom:10px!important;transform:translateX(-50%)!important;z-index:30!important;padding:5px 9px!important;border:1px solid #704b55!important;border-radius:999px!important;background:#211217!important;color:#f0c3cb!important;font-size:9px!important;font-weight:800!important;white-space:nowrap!important;pointer-events:none!important}
.ig-sprout-layer{position:absolute!important;inset:0!important;z-index:20!important;pointer-events:none!important}
.ig-sprout-left,.ig-sprout-right{position:absolute!important;bottom:4px!important;font-size:14px!important;line-height:1!important;white-space:nowrap!important}.ig-sprout-left{left:7px!important}.ig-sprout-right{right:7px!important;transform:scaleX(-1)!important}
.grave.ig-flower-honored .ig-sprout-layer,.grave.ig-flower-embraced .ig-sprout-layer{animation:igCG 4s ease-in-out infinite!important}
.ig-floral-frame{position:absolute!important;inset:7px!important;z-index:18!important;pointer-events:none!important;border-radius:15px!important;border:1px solid rgba(220,145,159,.45)!important;box-shadow:inset 0 0 0 5px rgba(7,8,7,.72),inset 0 0 0 7px rgba(217,141,155,.16)!important}
.ig-floral-top,.ig-floral-bottom{position:absolute!important;left:50%!important;transform:translateX(-50%)!important;white-space:nowrap!important;font-size:16px!important}.ig-floral-top{top:-10px!important}.ig-floral-bottom{bottom:-10px!important}.ig-side-vine{position:absolute!important;top:50%!important;transform:translateY(-50%)!important;writing-mode:vertical-rl!important;font-size:15px!important}.ig-side-vine.left{left:-8px!important}.ig-side-vine.right{right:-8px!important}
.grave.ig-flower-legend .ig-floral-frame{border:2px solid rgba(244,193,146,.72)!important;box-shadow:inset 0 0 0 5px rgba(5,6,5,.84),inset 0 0 0 8px rgba(236,157,173,.24),0 0 30px rgba(227,170,120,.28)!important}
.ig-card-fall-layer{position:absolute!important;inset:0!important;z-index:25!important;pointer-events:none!important;overflow:hidden!important}.ig-card-fall-petal{position:absolute!important;top:-28px!important;font-size:15px!important;opacity:0;animation:igCF var(--dur,6.2s) linear var(--delay,0s) infinite!important}
@media(max-width:760px){.ig-side-vine{display:none!important}}
`;document.head.appendChild(s)}
function clear(c){c.classList.remove('ig-flower',...levels.map(x=>'ig-flower-'+x.key));c.querySelectorAll(':scope > .ig-flower-badge,:scope > .ig-sprout-layer,:scope > .ig-floral-frame,:scope > .ig-card-fall-layer').forEach(x=>x.remove())}
function decorate(c,n){const l=level(n);clear(c);if(!l)return;c.classList.add('ig-flower');for(const x of levels)if(n>=x.n)c.classList.add('ig-flower-'+x.key);
 const spr=document.createElement('div');spr.className='ig-sprout-layer';let vine=n>=200?'🌿 🌹 🌸 🌿 🌺':n>=50?'🌿 🌹 🌱 🌸':'🌱 🌹 🌿';spr.innerHTML=`<span class="ig-sprout-left">${vine}</span><span class="ig-sprout-right">${vine}</span>`;c.appendChild(spr);
 const badge=document.createElement('span');badge.className='ig-flower-badge';badge.textContent=`🌹 ${n.toLocaleString()} · ${zh()?l.zh:l.en}`;c.appendChild(badge);
 if(n>=500){const f=document.createElement('div');f.className='ig-floral-frame';const crown=n>=1000?'🌹 🌺 🌸 👑 🌸 🌺 🌹':'🌿 🌹 🌿 🌸 🌿 🌺 🌿 🌹 🌿';f.innerHTML=`<span class="ig-floral-top">${crown}</span><span class="ig-floral-bottom">🌿 🌹 🌿 🌸 🌿 🌺 🌿 🌹 🌿</span><span class="ig-side-vine left">🌿🌹🌿🌸🌿🌺🌿</span><span class="ig-side-vine right">🌿🌺🌿🌸🌿🌹🌿</span>`;c.appendChild(f)}
 if(n>=50){const amount=n>=1000?12:n>=500?8:n>=200?7:n>=100?5:3,fall=document.createElement('div');fall.className='ig-card-fall-layer';for(let i=0;i<amount;i++){const p=document.createElement('span');p.className='ig-card-fall-petal';p.textContent=petals[i%petals.length];p.style.left=(4+((i*73)%92))+'%';p.style.setProperty('--dur',(5.7+(i%5)*.72)+'s');p.style.setProperty('--delay',(-i*.53)+'s');fall.appendChild(p)}c.appendChild(fall)}}
function paint(){document.querySelectorAll('#graveyard .grave').forEach(c=>{const n=total(c),r=respectEl(c),paid=Number(paidByName.get(title(c)))||0;if(r&&paid){const want=baseCount(c)+paid;if(num(r.textContent)!==want)r.textContent=(r.textContent||'').replace(/[\d,]+\s*$/,String(want))}decorate(c,n)})}
async function loadData(){try{const gr=await fetch(`${URL}/rest/v1/graves?select=id,name&limit=5000`,{headers:H});const fr=await fetch(`${URL}/rest/v1/flower_gifts_public?select=grave_id,flower_value&limit=5000`,{headers:H});if(!gr.ok||!fr.ok)throw new Error(`data ${gr.status}/${fr.status}`);const graves=await gr.json(),gifts=await fr.json(),names=new Map(),paidById=new Map();for(const g of graves||[])if(g?.id&&g?.name)names.set(Number(g.id),norm(g.name));for(const x of gifts||[]){const id=Number(x.grave_id);if(id>0)paidById.set(id,(paidById.get(id)||0)+Math.max(0,Number(x.flower_value)||0))}paidByName.clear();for(const [id,v] of paidById){const name=names.get(id);if(name)paidByName.set(name,(paidByName.get(name)||0)+v)}paint()}catch(e){console.warn('homepage flower totals',e);paint()}}
let timer=0,painting=false;function schedule(ms=80){clearTimeout(timer);timer=setTimeout(()=>{if(painting)return;painting=true;try{paint()}finally{painting=false}},ms)}
function start(){installCss();paint();loadData();setTimeout(loadData,900);const root=document.getElementById('graveyard')||document.body;new MutationObserver(()=>schedule(120)).observe(root,{childList:true,subtree:true,characterData:true});document.addEventListener('click',()=>{schedule(80);setTimeout(()=>schedule(0),500)},true);window.addEventListener('ig-flower-gift-saved',()=>setTimeout(loadData,250));window.addEventListener('ig-paid-flower-total',()=>setTimeout(loadData,120))}
window.IGFlowerMilestones={levels,level};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();