(()=>{
'use strict';
function addNeutralTheme(){
  if(document.getElementById('ig-neutral-project-theme'))return;
  const s=document.createElement('style');
  s.id='ig-neutral-project-theme';
  s.textContent=`
body:not(.memorial-mode){
  --bg:#0b0c0d;
  --panel:#121314;
  --panel2:#171819;
  --line:#353638;
  --text:#f3f0e7;
  --muted:#a9aaac;
  --soft:#d7d7d8;
  background:radial-gradient(circle at top,#171819 0,#0b0c0d 44%)!important;
}
body:not(.memorial-mode) header,
body:not(.memorial-mode) .grave-tools,
body:not(.memorial-mode) input,
body:not(.memorial-mode) textarea,
body:not(.memorial-mode) select,
body:not(.memorial-mode) .garden-switch button,
body:not(.memorial-mode) .tag,
body:not(.memorial-mode) .stat,
body:not(.memorial-mode) .hall-card,
body:not(.memorial-mode) .causes,
body:not(.memorial-mode) .detail-item,
body:not(.memorial-mode) .record-plaque,
body:not(.memorial-mode) .story,
body:not(.memorial-mode) dialog{
  border-color:#353638!important;
}
body:not(.memorial-mode) #graveyard .grave:not(.recently-resurrected):not(.ig-v7-card-obsidian):not(.ig-v7-card-gold){
  border-color:#353638!important;
  background:linear-gradient(180deg,#171819,#111213)!important;
  box-shadow:none!important;
}
body:not(.memorial-mode) #graveyard .grave:not(.recently-resurrected):not(.ig-v7-card-obsidian):not(.ig-v7-card-gold):hover{
  border-color:#56585b!important;
}
body:not(.memorial-mode) .grave.recently-resurrected:not(.ig-v7-card-obsidian):not(.ig-v7-card-gold){
  border-color:#4f8a5d!important;
  box-shadow:0 0 0 1px rgba(104,190,124,.12),0 0 22px rgba(78,160,98,.13)!important;
}
`;
  document.head.appendChild(s);
}
function loadV7(){
  if(document.querySelector('script[data-ig-v7-loader]'))return;
  const s=document.createElement('script');
  s.src='./grave-upgrade-v7.js?v=20260910-2';
  s.async=false;
  s.dataset.igV7Loader='1';
  document.head.appendChild(s);
}
addNeutralTheme();
loadV7();
const obs=new MutationObserver(()=>addNeutralTheme());
obs.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
})();