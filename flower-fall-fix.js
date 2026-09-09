(()=>{
'use strict';
if(document.getElementById('ig-flower-fall-fix'))return;
const s=document.createElement('style');
s.id='ig-flower-fall-fix';
s.textContent=`
@keyframes igPetalDropFix{
  0%{transform:translate3d(0,-45px,0) rotate(0deg)}
  22%{transform:translate3d(16px,75px,0) rotate(80deg)}
  48%{transform:translate3d(-10px,175px,0) rotate(165deg)}
  74%{transform:translate3d(20px,285px,0) rotate(255deg)}
  100%{transform:translate3d(-6px,430px,0) rotate(360deg)}
}
@keyframes igPetalDropDetailFix{
  0%{transform:translate3d(0,-50px,0) rotate(0deg)}
  20%{transform:translate3d(18px,115px,0) rotate(75deg)}
  45%{transform:translate3d(-12px,270px,0) rotate(155deg)}
  70%{transform:translate3d(22px,440px,0) rotate(255deg)}
  100%{transform:translate3d(-8px,680px,0) rotate(380deg)}
}
.ig-petal{
  opacity:.92!important;
  visibility:visible!important;
  animation-name:igPetalDropFix!important;
  animation-duration:var(--d,6.3s)!important;
  animation-timing-function:linear!important;
  animation-iteration-count:infinite!important;
  animation-delay:var(--delay,0s)!important;
  will-change:transform!important;
}
.ig-detail-petal{
  opacity:.92!important;
  visibility:visible!important;
  animation-name:igPetalDropDetailFix!important;
  animation-duration:var(--d,8.2s)!important;
  animation-timing-function:linear!important;
  animation-iteration-count:infinite!important;
  animation-delay:var(--delay,0s)!important;
  will-change:transform!important;
}
.grave.ig-flower{overflow:hidden!important}
#detailDialog .detail-grave.ig-detail-flower{overflow:hidden!important}
`;
document.head.appendChild(s);
})();