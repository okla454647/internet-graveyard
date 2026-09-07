# Internet Graveyard — Conversion Flow v1

Goal: stranger → understands concept → creates in ~30 sec → receives numbered artifact → shares → another stranger creates → later upgrades a meaningful grave.

## 1. First screen
- Project headline: 做失敗了？別刪掉。埋了它。🪦
- Explain concrete examples immediately.
- Primary CTA: 免費建立墓碑.
- Trust proof: 不用註冊 · 約 30 秒.
- Secondary browse CTA: 看看別人埋了什麼 ↓.
- Memorial Garden remains quiet/respectful and must not inherit failure jokes.

## 2. Creation
Keep only three required project questions:
1. Name
2. Cause of death
3. Last line / epitaph
Everything else remains optional after creation.

## 3. Completion moment
The reward is not “form submitted”. It is a permanent numbered grave.
Project completion hierarchy:
- ✓ 已正式下葬
- GRAVE #N
- short sentence establishing permanence/meaning
- primary action: 分享我的失敗
- secondary action: 查看墓碑
- tertiary action: 補充故事

Memorial equivalent must use memorial terminology, never project/death jokes.

## 4. Viral loop
Shared visitor detail page:
- consume shared grave first
- show artifact clearly
- visitor can respect/share
- below it: 你也有一個做失敗的東西嗎？
- CTA creates a new grave without registration

## 5. Share card
Next implementation target after first-screen/completion validation.
Generate client-side downloadable image; no server required.
Card should contain:
- Internet Graveyard brand
- grave number
- project name
- epitaph
- cause of death
- canonical grave URL / QR later if useful
Memorial uses a separate respectful card treatment.

## 6. Monetization
Do not sell basic usability. Sell permanence + distinction per grave.
First paid concept after viral loop works:
- Standard Grave — free
- Obsidian Grave — one-time paid
- Gold Grave — higher one-time paid
No subscription, no points system, no forced account for MVP.

## Safety / engineering
- Production branch is never the experimentation branch.
- No self-modifying GitHub Actions.
- Full index.html replacement only after exact full source is reconstructed and diff-validated.
- Memorial and Project terminology stay separate.
