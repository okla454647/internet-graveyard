(()=>{
'use strict';
/* V11 is a visual layer on top of V10. V10 owns tier/data logic; this makes paid tiers unmistakable in the graveyard grid and detail view. */
function addCss(){if(document.getElementById('ig-v11-css'))return;const s=document.createElement('style');s.id='ig-v11-css';s.textContent=`
/* Standard project graves stay neutral. */
body:not(.memorial-mode) #graveyard .grave:not(.ig10-obsidian):not(.ig10-gold){background:#151814!important;border:1px solid #383a32!important;box-shadow:none!important}
/* OBSIDIAN: obvious premium card, not just a thin outline. */
body:not(.memorial-mode) #graveyard .grave.ig10-obsidian{position:relative!important;overflow:hidden!important;border:3px solid #d7dde0!important;background:linear-gradient(135deg,#222629 0%,#0a0c0d 48%,#020303 100%)!important;box-shadow:inset 0 0 0 1px #555d61,0 0 0 1px #111,0 0 24px rgba(218,226,230,.30)!important}
body:not(.memorial-mode) #graveyard .grave.ig10-obsidian::before{content:'BLACK OBSIDIAN';position:absolute;left:18px;top:16px;padding:5px 9px;border:1px solid #aeb8bd;border-radius:999px;background:rgba(0,0,0,.82);color:#eef2f4;font:900 9px/1 Inter,system-ui,sans-serif;letter-spacing:.13em;z-index:2}
body:not(.memorial-mode) #graveyard .grave.ig10-obsidian::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 0 38%,rgba(255,255,255,.10) 48%,transparent 58%);z-index:1}
body:not(.memorial-mode) #graveyard .grave.ig10-obsidian .stone{filter:grayscale(1) brightness(1.35);text-shadow:0 0 14px rgba(230,238,242,.30)}
body:not(.memorial-mode) #graveyard .grave.ig10-obsidian h3{color:#f1f4f5!important;text-shadow:0 1px 8px #000}
body:not(.memorial-mode) #graveyard .grave.ig10-obsidian .ig10-tag{right:14px!important;bottom:13px!important;padding:6px 10px!important;border:1px solid #d7dde0!important;background:#020303!important;color:#f1f4f5!important}
/* GOLD: equally obvious premium card. */
body:not(.memorial-mode) #graveyard .grave.ig10-gold{position:relative!important;overflow:hidden!important;border:3px solid #edc45b!important;background:linear-gradient(135deg,#392d10 0%,#151005 48%,#050301 100%)!important;box-shadow:inset 0 0 0 1px #806425,0 0 0 1px #211806,0 0 28px rgba(237,196,91,.34)!important}
body:not(.memorial-mode) #graveyard .grave.ig10-gold::before{content:'GOLD MONUMENT';position:absolute;left:18px;top:16px;padding:5px 9px;border:1px solid #edc45b;border-radius:999px;background:rgba(31,23,5,.90);color:#ffe29a;font:900 9px/1 Inter,system-ui,sans-serif;letter-spacing:.13em;z-index:2}
body:not(.memorial-mode) #graveyard .grave.ig10-gold::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 0 38%,rgba(255,229,153,.12) 48%,transparent 58%);z-index:1}
body:not(.memorial-mode) #graveyard .grave.ig10-gold .stone{filter:sepia(1) saturate(1.5) brightness(1.15);text-shadow:0 0 16px rgba(237,196,91,.40)}
body:not(.memorial-mode) #graveyard .grave.ig10-gold h3{color:#ffe29a!important;text-shadow:0 1px 8px #000}
/* Paid tier always wins over resurrection green. */
body:not(.memorial-mode) #graveyard .grave.recently-resurrected.ig10-obsidian{border-color:#d7dde0!important;box-shadow:inset 0 0 0 1px #555d61,0 0 0 1px #111,0 0 24px rgba(218,226,230,.30)!important}
body:not(.memorial-mode) #graveyard .grave.recently-resurrected.ig10-gold{border-color:#edc45b!important;box-shadow:inset 0 0 0 1px #806425,0 0 0 1px #211806,0 0 28px rgba(237,196,91,.34)!important}
/* Detail view: premium frame surrounds the visible grave itself. */
#detailDialog .detail-grave.ig10-detail-obsidian{border:4px double #d7dde0!important;outline:1px solid #555d61!important;outline-offset:-8px!important;background:linear-gradient(145deg,#202427,#070909 60%,#010202)!important;box-shadow:0 0 34px rgba(218,226,230,.24)!important}
#detailDialog .detail-grave.ig10-detail-gold{border:4px double #edc45b!important;outline:1px solid #806425!important;outline-offset:-8px!important;background:linear-gradient(145deg,#392d10,#100c04 60%,#030201)!important;box-shadow:0 0 38px rgba(237,196,91,.30)!important}
`;document.head.appendChild(s)}
function start(){addCss();/* V10 repaints asynchronously; CSS targets its final classes, so no duplicate database matching is needed. */}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();