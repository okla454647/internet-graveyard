# Implementation Checklist v1

## Release A — Conversion copy
- [ ] Replace Project hero Chinese title/subtitle/kicker/proof.
- [ ] Replace Project hero English equivalents.
- [ ] Add secondary browse action without competing with primary CTA.
- [ ] Verify Memorial Garden hero remains respectful.
- [ ] Verify language switching restores correct mode copy.

## Release B — Completion hierarchy
- [ ] Project: ✓ 已正式下葬 + GRAVE #N emphasized.
- [ ] Primary completion CTA = share.
- [ ] Secondary = view grave.
- [ ] Tertiary = add details.
- [ ] Memorial copy separately verified.

## Release C — Share card
- [ ] Canvas generator.
- [ ] Project 1080x1350 card.
- [ ] Memorial 1080x1350 card.
- [ ] Download button in detail.
- [ ] Download/share-card CTA after creation.
- [ ] No external image service.

## Regression checks before production
- [ ] Project create works.
- [ ] Memorial create works.
- [ ] Memorial photo works.
- [ ] Project/Memorial numbering stays separate.
- [ ] Owner edit works.
- [ ] Respect works.
- [ ] Resurrection works for projects only.
- [ ] Shared URL opens correct grave even before list is loaded.
- [ ] LINE/Facebook/X/Threads/Reddit/LinkedIn share remains available.
- [ ] Copy copies URL only.
- [ ] Shared visitor CTA appears only for non-owner shared landing.
- [ ] Admin mode still works.
- [ ] Mobile layout checked.
- [ ] Chinese/English checked.
- [ ] Only intended files differ from production.

## Production rule
Never move production until the diff is reviewed against stable commit 27d65ad5c2b9290fe4c27d00bddcd6f843571fb1.
