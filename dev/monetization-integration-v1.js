/* Internet Graveyard monetization integration v1
   Development-only module. Does not charge users.
   Intended insertion point: after a grave is created and on owner grave details.
*/
(() => {
  const plans = {
    standard: { id:'standard', zh:'標準墓碑', en:'Standard Grave', price:0 },
    obsidian: { id:'obsidian', zh:'黑曜墓碑', en:'Obsidian Grave', price:2.99 },
    gold: { id:'gold', zh:'黃金墓碑', en:'Gold Grave', price:6.99 }
  };

  function isZh(){ return (document.documentElement.lang || '').toLowerCase().startsWith('zh'); }
  function money(v){ return v === 0 ? (isZh() ? '免費' : 'Free') : `US$${v.toFixed(2)}`; }

  function renderUpgradePanel(grave){
    if(!grave || grave.grave_type === 'memorial') return '';
    const current = grave.monument_style || 'standard';
    const title = isZh() ? '讓這座墓碑更特別' : 'Make this grave stand out';
    const sub = isZh()
      ? '免費墓碑永遠保留完整功能。升級只改變這一座墓碑的外觀，而且永久有效。'
      : 'Free graves keep all core features. An upgrade permanently changes the look of this grave only.';
    return `<section class="ig-upgrade" data-grave-id="${grave.id}">
      <div class="ig-upgrade-kicker">PERMANENT MONUMENT UPGRADE</div>
      <h3>${title}</h3><p>${sub}</p>
      <div class="ig-upgrade-grid">
        ${Object.values(plans).map(p => `<button type="button" class="ig-plan ig-plan-${p.id}${current===p.id?' current':''}" data-style="${p.id}" onclick="window.IGMonuments.preview('${p.id}')">
          <b>${isZh()?p.zh:p.en}</b><span>${money(p.price)}</span>
          <small>${current===p.id ? (isZh()?'目前樣式':'Current style') : p.id==='standard' ? (isZh()?'完整免費功能':'Full free features') : p.id==='obsidian' ? (isZh()?'黑曜質感 · 特殊碑框 · 專屬分享卡':'Obsidian finish · special frame · exclusive share card') : (isZh()?'金色典藏 · 高辨識度 · 專屬分享卡':'Gold archive · highest visibility · exclusive share card')}</small>
        </button>`).join('')}
      </div>
      <div class="ig-upgrade-proof">${isZh()?'一次付款 · 永久保留 · 不訂閱':'One-time payment · Permanent · No subscription'}</div>
    </section>`;
  }

  function preview(style){
    const p=plans[style]; if(!p) return;
    document.documentElement.dataset.monumentPreview=style;
    const msg=isZh()?`正在預覽「${p.zh}」— 尚未付款。`:`Previewing ${p.en} — no payment yet.`;
    if(typeof toast==='function') toast(msg); else console.info(msg);
  }

  window.IGMonuments={plans,renderUpgradePanel,preview};
})();
