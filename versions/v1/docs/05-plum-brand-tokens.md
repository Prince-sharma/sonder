# Plum's real brand tokens

Read on 14 Sept 2026 directly from the CSS custom properties on plumhq.com's live
stylesheet — not from a brand guide or a third-party scraper. Kept here because a
Plum-themed build of this prototype existed and was replaced with the neutral
monochrome system; these are the values to restore it.

## Palette, as Plum names it

```css
--plum:                 #ff4052   /* primary brand red */
--plum-light:           #ffe4e5
--light-pink:           #ffb7bb
--light-coral:          #ff6a75
--crimson:              #cc3342
--brown:                #992630

--plum-vision:          #570e40   /* deep aubergine */
--plum-vision-dark:     #460932
--darkest-plum:         #340926
--dark-2:               #3a0e2b   /* heading colour on the live site */
--vision-7:             #733c61
--vision-2:             #c7b1c0
--thistle:              #d8c5d1

--plum-promise-light-bg:#fffaf2   /* the page background — replaces white */
--plum-promise-3:       #fff8f1
--plum-promise-mid:     #ffecd6
--plum-promise-02:      #ffebdb
--plum-promise-dark:    #ffe1bf   /* also --bisque, --plum-promise-4 */

--plum-growth:          #92bd33   /* green */
--sunshine-yellow:      #ffbf21
--clear-sky:            #429cd8
--light-sky-blue:       #91c5e7
--dodger-blue:          #1d9bf0

--grey-0:#2d2d2d  --grey-1:#41495e  --grey-3:#a0a5ab  --grey-4:#ced5dd
--gray--500:#55657d  --gray--800:#182639
```

Observed in use: `body` background `#FFFAF2`. Primary CTA `#FF4052` fill with `#FFF1E5`
text. Headings `#3A0E2B`.

## Two corrections to what's published elsewhere

**1. `#FFFFFF` is not a Plum brand colour.** Brandfetch lists it. Plum's own rebrand post
says they *replaced* white with Plum Promise as the base background. The white entry is a
scraping artifact.

**2. The site has moved off the 2022 rebrand fonts.** Published sources still name NaN
Jaune Midi (NaN, nan.xyz) for display and Chromatica (Polytype) for body. The live site
now serves:

- **Passenger Sans** — the workhorse, ~1,140 elements (Regular / Medium / Semibold / Light)
- **GT Alpina Standard** — serif, ~48 elements, editorial accents
- NaN Jaune Midi Bold — still loaded, barely used; the wordmark

Both current faces are commercial. Google Fonts substitutes: **Figtree** for Passenger
Sans (geometric-humanist, low contrast, same warmth), **Bricolage Grotesque** for the
NaN Jaune display weight (the only Google face built on the same quirky-grotesque
premise, with real optical-size axes).

Identity is by **Irregulars Alliance** (2022), still current — no rebrand 2024–2026.

## If you restore the Plum theme

One rule made it work in a dense operations tool, and it is not optional:

> **Red is identity and only ever appears as a fill** — primary buttons, the brand mark,
> the active-nav pill, a solid chip. Status never uses it.

Without that, `#FF4052` collides with "critical" on every severity stripe. Criticality
goes to `--brown` `#992630`; positives to `--plum-growth`; charts to `--plum-vision`
(calm behind dense numbers). Buttons need `#E0293F` rather than `#FF4052` so white text
clears 4.5:1 — `#FF4052` is only 3.4:1 on cream and fails as a text or button background.

Dark mode builds its ground from `#460932` / `#340926`, which is genuinely good.

## Why it was replaced

Cream ground plus a hot red plus dense tabular data fought each other — the prototype
became harder to read than it was informative. The neutral monochrome system in
`src/00-head.html` puts every hue on the bench except status. Restoring Plum is a
one-block swap of the three `:root` token blocks.
