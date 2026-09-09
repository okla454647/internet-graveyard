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
.ig-fall-layer{position:absolute!important;inset:0!important;z-index:9!important;pointer-events:none!important;overflow:hidden!important;border-radius:inherit!important}
.ig-fall-petal{position:absolute!important;top:-34px!important;display:block!important;opacity:0;font-size:16px!important;line-height:1!important;filter:drop-shadow(0 2px 3px rgba(0,0,0,.55));animation:igIndependentPetalFall var(--dur,6.5s) linear var(--delay,0s) infinite!important;will-change:transform,opacity!important}
.ig-fall-layer.detail .ig-fall-petal{font-size:18px!important;animation-name:igIndependentPetalFallDetail!important}
.grave.ig-flower{overflow:hidden!important}
#detailDialog .detail-grave.ig-detail-flower{overflow:hidden!important}
`;
  document.head.appendChild(s);

  const petals=['🌸','🌹','🌺','🌸','🌹'];
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
  function paint(){
    document.querySelectorAll('#graveyard .grave').forEach(g=>ensureLayer(g,false));
    const d=document.querySelector('#detailDialog .detail-grave');
    if(d)ensureLayer(d,true);
  }
  paint();
  new MutationObserver(()=>setTimeout(paint,30)).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','open']});
  setInterval(paint,1200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,180),{once:true});
else setTimeout(install,180);
})();