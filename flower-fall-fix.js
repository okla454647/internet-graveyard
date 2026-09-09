(()=>{
'use strict';
function install(){
  document.getElementById('ig-flower-fall-fix')?.remove();
  const s=document.createElement('style');
  s.id='ig-flower-fall-fix';
  s.textContent=`
@keyframes igPetalDropFix{
  0%{transform:translate3d(0,-38px,0) rotate(0deg);opacity:0}
  8%{opacity:.95}
  25%{transform:translate3d(18px,85px,0) rotate(85deg);opacity:.95}
  50%{transform:translate3d(-12px,185px,0) rotate(175deg);opacity:.9}
  75%{transform:translate3d(22px,290px,0) rotate(265deg);opacity:.82}
  100%{transform:translate3d(-8px,430px,0) rotate(370deg);opacity:0}
}
@keyframes igPetalDropDetailFix{
  0%{transform:translate3d(0,-42px,0) rotate(0deg);opacity:0}
  7%{opacity:.95}
  23%{transform:translate3d(20px,130px,0) rotate(80deg);opacity:.95}
  48%{transform:translate3d(-14px,300px,0) rotate(170deg);opacity:.9}
  72%{transform:translate3d(24px,485px,0) rotate(270deg);opacity:.82}
  100%{transform:translate3d(-10px,720px,0) rotate(390deg);opacity:0}
}
.ig-petal{
  visibility:visible!important;
  animation:igPetalDropFix var(--d,6.3s) linear var(--delay,0s) infinite!important;
  will-change:transform,opacity!important;
}
.ig-detail-petal{
  visibility:visible!important;
  animation:igPetalDropDetailFix var(--d,8.2s) linear var(--delay,0s) infinite!important;
  will-change:transform,opacity!important;
}
.grave.ig-flower{overflow:hidden!important}
#detailDialog .detail-grave.ig-detail-flower{overflow:hidden!important}
`;
  document.head.appendChild(s);

  function force(el){
    if(el.classList?.contains('ig-petal')){
      el.style.setProperty('visibility','visible','important');
      el.style.setProperty('animation-name','igPetalDropFix','important');
      el.style.setProperty('animation-timing-function','linear','important');
      el.style.setProperty('animation-iteration-count','infinite','important');
      el.style.setProperty('will-change','transform, opacity','important');
    }
    if(el.classList?.contains('ig-detail-petal')){
      el.style.setProperty('visibility','visible','important');
      el.style.setProperty('animation-name','igPetalDropDetailFix','important');
      el.style.setProperty('animation-timing-function','linear','important');
      el.style.setProperty('animation-iteration-count','infinite','important');
      el.style.setProperty('will-change','transform, opacity','important');
    }
  }
  document.querySelectorAll('.ig-petal,.ig-detail-petal').forEach(force);
  new MutationObserver(ms=>{
    for(const m of ms)for(const n of m.addedNodes){
      if(n.nodeType!==1)continue;
      force(n);
      n.querySelectorAll?.('.ig-petal,.ig-detail-petal').forEach(force);
    }
  }).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,80),{once:true});
else setTimeout(install,80);
})();