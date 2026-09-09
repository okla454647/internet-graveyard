(()=>{
'use strict';
/* Premium visual enhancement: visual-only overlays must never block grave clicks. */
function install(){if(document.getElementById('ig-premium-fx'))return;const s=document.createElement('style');s.id='ig-premium-fx';s.textContent=`
@keyframes igObsidianSweep{0%{transform:translateX(-190%) skewX(-18deg);opacity:0}10%{opacity:.12}34%{opacity:.48}54%{opacity:.10}68%,100%{transform:translateX(390%) skewX(-18deg);opacity:0}}
@keyframes igGoldSweep{0%{transform:translateX(-190%) skewX(-18deg);opacity:0}10%{opacity:.14}34%{opacity:.56}54%{opacity:.12}68%,100%{transform:translateX(390%) skewX(-18deg);opacity:0}}
@keyframes igMetalPulse{0%,100%{filter:brightness(.96)}50%{filter:brightness(1.22)}}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold{isolation:isolate;cursor:pointer!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian::before,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold::before,body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian::after,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold::after{pointer-events:none!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian::after{content:''!important;position:absolute!important;top:-35%!important;bottom:-35%!important;left:-32%!important;width:22%!important;z-index:2!important;background:linear-gradient(90deg,transparent,rgba(235,245,250,.06),rgba(255,255,255,.42),rgba(235,245,250,.08),transparent)!important;animation:igObsidianSweep 3.8s ease-in-out infinite!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-gold::after{content:''!important;position:absolute!important;top:-35%!important;bottom:-35%!important;left:-32%!important;width:22%!important;z-index:2!important;background:linear-gradient(90deg,transparent,rgba(255,224,128,.07),rgba(255,239,180,.54),rgba(255,211,82,.10),transparent)!important;animation:igGoldSweep 3.3s ease-in-out infinite!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian{background:radial-gradient(circle at 22% 8%,rgba(190,205,214,.12),transparent 32%),linear-gradient(135deg,#24282b 0%,#080a0b 54%,#010202 100%)!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-gold{background:radial-gradient(circle at 22% 8%,rgba(255,210,91,.15),transparent 32%),linear-gradient(135deg,#3c2e0e 0%,#130e03 55%,#040301 100%)!important}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian .stone,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold .stone{position:relative;z-index:3;pointer-events:none!important;animation:igMetalPulse 2.8s ease-in-out infinite}
body:not(.memorial-mode) #graveyard .grave.ig-paid-obsidian>* ,body:not(.memorial-mode) #graveyard .grave.ig-paid-gold>*{position:relative;z-index:3;pointer-events:none!important}
#detailDialog .detail-grave.ig-detail-obsidian,#detailDialog .detail-grave.ig-detail-gold{position:relative!important;overflow:hidden!important;isolation:isolate!important}
#detailDialog .detail-grave.ig-detail-obsidian::before,#detailDialog .detail-grave.ig-detail-gold::before,#detailDialog .detail-grave.ig-detail-obsidian::after,#detailDialog .detail-grave.ig-detail-gold::after{pointer-events:none!important}
#detailDialog .detail-grave.ig-detail-obsidian::after,#detailDialog .detail-grave.ig-detail-gold::after{content:'';position:absolute;top:-25%;bottom:-25%;left:-35%;width:20%;z-index:0;transform:skewX(-18deg)}
#detailDialog .detail-grave.ig-detail-obsidian::after{background:linear-gradient(90deg,transparent,rgba(255,255,255,.05),rgba(226,238,244,.28),rgba(255,255,255,.05),transparent);animation:igObsidianSweep 4.3s ease-in-out infinite}
#detailDialog .detail-grave.ig-detail-gold::after{background:linear-gradient(90deg,transparent,rgba(255,220,100,.05),rgba(255,235,166,.34),rgba(255,205,69,.07),transparent);animation:igGoldSweep 3.8s ease-in-out infinite}
#detailDialog .detail-grave.ig-detail-obsidian>* ,#detailDialog .detail-grave.ig-detail-gold>*{position:relative;z-index:1}
#detailDialog .detail-grave.ig-detail-obsidian{background:radial-gradient(circle at 50% 0,rgba(203,218,226,.11),transparent 29%),linear-gradient(180deg,#111517 0%,#070909 48%,#020303 100%)!important}
#detailDialog .detail-grave.ig-detail-gold{background:radial-gradient(circle at 50% 0,rgba(255,209,83,.15),transparent 30%),linear-gradient(180deg,#241b06 0%,#100c03 48%,#050301 100%)!important}
#detailDialog .detail-grave.ig-detail-gold .record-plaque{background:linear-gradient(145deg,#181309,#090a08)!important;border-color:#9a7a29!important;box-shadow:inset 0 0 28px rgba(221,179,65,.07)!important}
#detailDialog .detail-grave.ig-detail-gold .record-plaque h3,#detailDialog .detail-grave.ig-detail-gold .record-plaque strong{color:#efd17b!important}
#detailDialog .detail-grave.ig-detail-obsidian .record-plaque{background:linear-gradient(145deg,#151a1d,#080a0b)!important;border-color:#69767d!important;box-shadow:inset 0 0 28px rgba(210,222,228,.06)!important}
#detailDialog .detail-grave.ig-detail-obsidian .record-plaque h3,#detailDialog .detail-grave.ig-detail-obsidian .record-plaque strong{color:#dbe3e7!important}
#detailDialog .detail-grave.ig-detail-gold #ig-entry{background:linear-gradient(145deg,#211908,#0b0904)!important;border-color:#9a7a29!important;box-shadow:inset 0 0 22px rgba(237,199,95,.07)!important}
#detailDialog .detail-grave.ig-detail-gold #ig-entry b{color:#f0d27a!important}
#detailDialog .detail-grave.ig-detail-obsidian #ig-entry{background:linear-gradient(145deg,#181d20,#080a0b)!important;border-color:#69767d!important;box-shadow:inset 0 0 20px rgba(218,226,230,.05)!important}
#detailDialog .detail-grave.ig-detail-obsidian #ig-entry b{color:#dbe3e7!important}
`;document.head.appendChild(s)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();