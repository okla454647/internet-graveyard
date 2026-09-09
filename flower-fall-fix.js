(()=>{
'use strict';
function install(){
  document.getElementById('ig-flower-fall-fix')?.remove();
  const s=document.createElement('style');
  s.id='ig-flower-fall-fix';
  s.textContent=`
@keyframes igIndependentPetalFall{
  0%{transform:translate3d(0,-35px,0) rotate(0deg);opacity:0}
  8%{opacity:.98}
  28%{transform:translate3d(18px,95px,0) rotate(95deg);opacity:.96}
  52%{transform:translate3d(-14px,205px,0) rotate(185deg);opacity:.92}
  76%{transform:translate3d(20px,315px,0) rotate(285deg);opacity:.86}
  100%{transform:translate3d(-8px,455px,0) rotate(390deg);opacity:0}
}
@keyframes igIndependentPetalFallDetail{
  0%{transform:translate3d(0,-42px,0) rotate(0deg);opacity:0}
  8%{opacity:.98}
  25%{transform:translate3d(22px,150px,0) rotate(90deg);opacity:.96}
  50%{transform:translate3d(-18px,330px,0) rotate(190deg);opacity:.92}
  75%{transform:translate3d(25px,520px,0) rotate(290deg);opacity:.84}
  100%{transform:translate3d(-10px,760px,0) rotate(400deg);opacity:0}
}
@keyframes igPreviewPetal{0%{transform:translateY(-8px) rotate(0);opacity:0}15%{opacity:.9}100%{transform:translateY(46px) rotate(180deg);opacity:0}}
.ig-fall-layer{position:absolute!important;inset:0!important;z-index:9!important;pointer-events:none!important;overflow:hidden!important;border-radius:inherit!important}
.ig-fall-petal{position:absolute!important;top:-34px!important;display:block!important;opacity:0;font-size:16px!important;line-height:1!important;filter:drop-shadow(0 2px 3px rgba(0,0,0,.55));animation:igIndependentPetalFall var(--dur,6.5s) linear var(--delay,0s) infinite!important;will-change:transform,opacity!important}
.ig-fall-layer.detail .ig-fall-petal{font-size:18px!important;animation-name:igIndependentPetalFallDetail!important}
.grave.ig-flower{overflow:hidden!important}
#detailDialog .detail-grave.ig-detail-flower{overflow:hidden!important}
.ig-next-milestone{margin:10px 0 0;padding:12px;border:1px solid #4e3d41;border-radius:12px;background:linear-gradient(145deg,#141112,#0d0f0e);display:grid;grid-template-columns:92px 1fr;gap:12px;align-items:center}
.ig-next-visual{height:64px;border-radius:10px;position:relative;overflow:hidden;background:linear-gradient(160deg,#181414,#0d0f0d);border:1px solid #3d3034;box-shadow:inset 0 0 18px rgba(183,108,126,.08)}
.ig-next-visual::before,.ig-next-visual::after{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:12px;letter-spacing:1px;opacity:.92}.ig-next-visual::before{content:'🌿 🌹 🌿 🌸 🌿';top:3px}.ig-next-visual::after{content:'🌿 🌸 🌿 🌹 🌿';bottom:3px}.ig-next-visual[data-tier="10"]::before,.ig-next-visual[data-tier="10"]::after{content:'🌱';font-size:16px}.ig-next-visual[data-tier="50"]::before{content:'🌿 🌸 🌿'}.ig-next-visual[data-tier="50"]::after{content:'🌿 🌹 🌿'}.ig-next-visual[data-tier="100"]{box-shadow:inset 0 0 22px rgba(211,137,153,.16),0 0 12px rgba(211,137,153,.12)}.ig-next-visual[data-tier="500"]{border-color:#8c5d67;box-shadow:inset 0 0 0 4px #0b0d0b,inset 0 0 0 6px rgba(205,128,146,.2)}.ig-next-visual[data-tier="1000"]{border:2px solid #d692a1;box-shadow:inset 0 0 0 4px #0b0d0b,inset 0 0 0 7px rgba(224,143,160,.25),0 0 18px rgba(216,123,145,.16)}
.ig-next-mini-petal{position:absolute;top:-8px;font-size:10px;animation:igPreviewPetal 2.8s linear infinite;opacity:0}.ig-next-copy b{display:block;color:#ead4d8;font-size:12px;margin-bottom:4px}.ig-next-copy span{display:block;color:#aa9a9d;font-size:11px;line-height:1.45}.ig-next-copy em{display:inline-block;margin-top:6px;font-style:normal;font-size:10px;font-weight:800;color:#df9aaa;border:1px solid #694a51;border-radius:999px;padding:3px 7px;background:#24171a}
.ig-next-milestone.done{grid-template-columns:1fr;text-align:center}.ig-next-milestone.done .ig-next-copy b{color:#efc1ca}
@media(max-width:520px){.ig-next-milestone{grid-template-columns:78px 1fr}.ig-next-visual{height:58px}}
`;
  document.head.appendChild(s);

  const petals=['🌸','🌹','🌺','🌸','🌹'];
  const milestones=[
    {n:10,zh:'初綻',en:'First Bloom',descZh:'解鎖第一層花意裝飾',descEn:'Unlock the first floral accent'},
    {n:50,zh:'花開',en:'In Bloom',descZh:'開始出現飄落花瓣',descEn:'Falling petals begin'},
    {n:100,zh:'百花致意',en:'100 Tributes',descZh:'解鎖呼吸光暈與更明顯花意',descEn:'Unlock a soft glow and richer florals'},
    {n:500,zh:'永恆花園',en:'Eternal Garden',descZh:'解鎖完整花冠外框',descEn:'Unlock the full floral frame'},
    {n:1000,zh:'千花傳說',en:'Legend of 1,000',descZh:'解鎖傳奇花冠＋高密度飄花',descEn:'Unlock legendary wreath + dense falling petals'}
  ];
  const isZh=()=>document.documentElement.lang!=='en';
  function readCount(root){const txt=root?.innerText||root?.textContent||'';let m=txt.match(/(?:致意|獻花|flowers?|tributes?)\s*[·:：]?\s*([\d,]+)/i);if(!m)m=txt.match(/🌹\s*(?:致意\s*)?([\d,]+)/i);return m?Number(m[1].replace(/,/g,'')):0}
  function ensureLayer(root,detail=false){
    if(!root)return;
    const qualifies=detail ? root.classList.contains('ig-detail-flower') : root.classList.contains('ig-flower-bloom')||root.classList.contains('ig-flower-honored')||root.classList.contains('ig-flower-garden')||root.classList.contains('ig-flower-legend');
    if(!qualifies){root.querySelector(':scope > .ig-fall-layer')?.remove();return;}
    let layer=root.querySelector(':scope > .ig-fall-layer');
    const rich=root.classList.contains('ig-flower-legend')||root.classList.contains('legend');
    const wanted=detail?(rich?20:14):(rich?12:8);
    if(layer && Number(layer.dataset.count)===wanted)return;
    layer?.remove();
    layer=document.createElement('div');
    layer.className='ig-fall-layer'+(detail?' detail':'');
    layer.dataset.count=String(wanted);
    layer.setAttribute('aria-hidden','true');
    for(let i=0;i<wanted;i++){
      const p=document.createElement('span');
      p.className='ig-fall-petal';
      p.textContent=petals[i%petals.length];
      p.style.left=(4+((i*73)%92))+'%';
      p.style.setProperty('--dur',((detail?7.8:5.8)+(i%5)*.7)+'s');
      p.style.setProperty('--delay',(-i*(detail?.63:.47))+'s');
      p.style.fontSize=(detail?(16+(i%3)*2):(13+(i%3)*2))+'px';
      layer.appendChild(p);
    }
    root.appendChild(layer);
  }
  function ensurePreview(){
    const d=document.querySelector('#detailDialog .detail-grave');
    if(!d)return;
    const progress=d.querySelector('.ig-flower-progress');
    const old=d.querySelector('.ig-next-milestone');
    if(!progress){old?.remove();return;}
    const n=readCount(d),nx=milestones.find(m=>n<m.n);
    const stamp=nx?`${n}:${nx.n}`:`${n}:done`;
    if(old?.dataset.stamp===stamp)return;
    old?.remove();
    const box=document.createElement('div');
    box.className='ig-next-milestone'+(nx?'':' done');
    box.dataset.stamp=stamp;
    if(!nx){box.innerHTML=`<div class="ig-next-copy"><b>🌹 ${isZh()?'目前最高獻花里程碑已解鎖':'Highest flower milestone unlocked'}</b><span>${isZh()?'這座墓碑已達到目前最高的花冠狀態。':'This grave has reached the current highest floral state.'}</span></div>`;progress.appendChild(box);return;}
    const visual=document.createElement('div');
    visual.className='ig-next-visual';
    visual.dataset.tier=String(nx.n);
    if(nx.n>=50){for(let i=0;i<(nx.n>=1000?5:3);i++){const p=document.createElement('span');p.className='ig-next-mini-petal';p.textContent=petals[i%petals.length];p.style.left=(18+i*17)+'%';p.style.animationDelay=(-i*.55)+'s';visual.appendChild(p)}}
    const copy=document.createElement('div');copy.className='ig-next-copy';
    copy.innerHTML=`<b>${isZh()?'下一個里程碑':'Next milestone'}：${nx.n.toLocaleString()} 🌹 · ${isZh()?nx.zh:nx.en}</b><span>${isZh()?nx.descZh:nx.descEn}</span><em>${isZh()?`再 ${Math.max(0,nx.n-n).toLocaleString()} 朵解鎖`:`${Math.max(0,nx.n-n).toLocaleString()} more to unlock`}</em>`;
    box.append(visual,copy);progress.appendChild(box);
  }
  function paint(){
    document.querySelectorAll('#graveyard .grave').forEach(g=>ensureLayer(g,false));
    const d=document.querySelector('#detailDialog .detail-grave');
    if(d)ensureLayer(d,true);
    ensurePreview();
  }
  paint();
  new MutationObserver(()=>setTimeout(paint,40)).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','open']});
  setInterval(paint,1200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,180),{once:true});
else setTimeout(install,180);
})();