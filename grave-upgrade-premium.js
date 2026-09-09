(()=>{
'use strict';
/* Premium visual enhancement. Loaded after grave-upgrade.js until consolidated into the main bundle. */
function install(){if(document.getElementById('ig-premium-fx'))return;const s=document.createElement('style');s.id='ig-premium-fx';s.textContent=`
@keyframes igObsidianSweep{0%{transform:translateX(-180%) skewX(-18deg);opacity:0}12%{opacity:.08}32%{opacity:.34}48%{opacity:.08}58%,100%{transform:translateX(360%) skewX(-18deg);opacity:0}}
@keyframes igGoldSweep{0%{transform:translateX(-180%) skewX(-18deg);opacity:0}12%{opacity:.10}32%{opacity:.42}48%{opacity:.10}58%,100%{transform:translateX(360%) skewX(-18deg);opacity:0}}
@keyframes igMetalPulse{0%,100%{filter:brightness(.92)}50%{filter:brightness(1.18)}}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold{isolation:isolate}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian::after{content:''!important;position:absolute!important;top:-35%!important;bottom:-35%!important;left:-32%!important;width:20%!important;z-index:2!important;pointer-events:none!important;background:linear-gradient(90deg,transparent,rgba(235,245,250,.05),rgba(255,255,255,.34),rgba(235,245,250,.06),transparent)!important;animation:igObsidianSweep 6.8s ease-in-out infinite!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-gold::after{content:''!important;position:absolute!important;top:-35%!important;bottom:-35%!important;left:-32%!important;width:20%!important;z-index:2!important;pointer-events:none!important;background:linear-gradient(90deg,transparent,rgba(255,224,128,.05),rgba(255,239,180,.44),rgba(255,211,82,.08),transparent)!important;animation:igGoldSweep 5.8s ease-in-out infinite!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian{background:radial-gradient(circle at 22% 8%,rgba(190,205,214,.10),transparent 32%),linear-gradient(135deg,#24282b 0%,#080a0b 54%,#010202 100%)!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-gold{background:radial-gradient(circle at 22% 8%,rgba(255,210,91,.13),transparent 32%),linear-gradient(135deg,#3c2e0e 0%,#130e03 55%,#040301 100%)!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian .stone,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold .stone{position:relative;z-index:3;animation:igMetalPulse 4s ease-in-out infinite}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian>*:not(.stone),body:not(.memorial-mode) #graveyard .grave.ig-paid-gold>*:not(.stone){position:relative;z-index:3}
#detailDialog .detail-grave.ig-detail-obsidian,#detailDialog .detail-grave.ig-detail-gold{position:relative!important;overflow:hidden!important;isolation:isolate!important}
#detailDialog .detail-grave.ig-detail-obsidian::after,#detailDialog .detail-grave.ig-detail-gold::after{content:'';position:absolute;top:-25%;bottom:-25%;left:-35%;width:18%;pointer-events:none;z-index:0;transform:skewX(-18deg)}
#detailDialog .detail-grave.ig-detail-obsidian::after{background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),rgba(226,238,244,.22),rgba(255,255,255,.04),transparent);animation:igObsidianSweep 7.6s ease-in-out infinite}
#detailDialog .detail-grave.ig-detail-gold::after{background:linear-gradient(90deg,transparent,rgba(255,220,100,.04),rgba(255,235,166,.27),rgba(255,205,69,.05),transparent);animation:igGoldSweep 6.6s ease-in-out infinite}
#detailDialog .detail-grave.ig-detail-obsidian>* ,#detailDialog .detail-grave.ig-detail-gold>*{position:relative;z-index:1}
#detailDialog .detail-grave.ig-detail-obsidian{background:radial-gradient(circle at 50% 0,rgba(203,218,226,.09),transparent 29%),linear-gradient(180deg,#111517 0%,#070909 48%,#020303 100%)!important}
#detailDialog .detail-grave.ig-detail-gold{background:radial-gradient(circle at 50% 0,rgba(255,209,83,.12),transparent 30%),linear-gradient(180deg,#241b06 0%,#100c03 48%,#050301 100%)!important}
#detailDialog .detail-grave.ig-detail-gold .record-plaque{background:linear-gradient(145deg,#141108,#090a08)!important;border-color:#806825!important;box-shadow:inset 0 0 22px rgba(221,179,65,.035)!important}
#detailDialog .detail-grave.ig-detail-gold .record-plaque h3,#detailDialog .detail-grave.ig-detail-gold .record-plaque strong{color:#efd17b!important}
#detailDialog .detail-grave.ig-detail-obsidian .record-plaque{background:linear-gradient(145deg,#121619,#080a0b)!important;border-color:#58636a!important;box-shadow:inset 0 0 22px rgba(210,222,228,.035)!important}
#detailDialog .detail-grave.ig-detail-obsidian .record-plaque h3,#detailDialog .detail-grave.ig-detail-obsidian .record-plaque strong{color:#dbe3e7!important}
#detailDialog .detail-grave.ig-detail-gold #ig-entry{background:linear-gradient(145deg,#1c1608,#0b0904)!important;border-color:#806825!important;box-shadow:inset 0 0 18px rgba(237,199,95,.04)!important}
#detailDialog .detail-grave.ig-detail-gold #ig-entry b{color:#f0d27a!important}
#detailDialog .detail-grave.ig-detail-obsidian #ig-entry{background:linear-gradient(145deg,#15191b,#080a0b)!important;border-color:#59646a!important}
#detailDialog .detail-grave.ig-detail-obsidian #ig-entry b{color:#dbe3e7!important}
@media(prefers-reduced-motion:reduce){body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian::after,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold::after,#detailDialog .detail-grave.ig-detail-obsidian::after,#detailDialog .detail-grave.ig-detail-gold::after,.stone{animation:none!important}}
`;document.head.appendChild(s)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();