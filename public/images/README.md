# Photography — Xavion Fitness Studio

## ⚠️ These are stock photos, not Xavion

Every `.webp` in this folder is a **free-licence stock photo from Unsplash**,
placed so the site can be shown to the client as a finished piece. The
[Unsplash licence](https://unsplash.com/license) permits commercial use without
attribution, so they are safe to demo and even to launch with — but **none of
them show the actual studio**.

One honesty note: the contact page's location panel no longer claims its
photograph shows the premises, because it does not. Keep that wording accurate
if you swap the image.

**Replace them before the studio opens.** Prospective members in Thindal will
work out quickly that the photos are not the gym they are about to walk into,
and Google Business Profile specifically wants genuine interior shots of the
real premises. Keep the filenames exactly as they are and the site picks the
new photos up with no code changes.

Missing a file is safe: `SmartImage` falls back to a designed dark panel rather
than a broken-image icon, so the layout never collapses mid-swap.

---

## What's here

| Filename | Scene | Used on |
|---|---|---|
| `premium-gym-erode.webp` | Wide dark gym interior — carries the whole first impression | Home hero, contact CTA |
| `gym-facilities-erode.webp` | Equipment and floor layout | Home intro, contact hero |
| `fitness-trainer-erode.webp` | Trainer coaching a member | Home intro |
| `strength-training-erode.webp` | Barbell on the platform | Services hero, facility grid |
| `personal-training-erode.webp` | One-to-one coaching session | Membership hero |
| `cardio-training-erode.webp` | Treadmills and bikes | Facility grid, services |
| `hiit-training-erode.webp` | Group mid-interval | Services explorer |
| `functional-training-erode.webp` | Battle ropes on turf | Requirements hero, facility grid |
| `weight-management-erode.webp` | Two members on resistance machines | Services explorer |
| `group-fitness-erode.webp` | Group silhouetted against the windows | Services explorer |
| `mobility-recovery-erode.webp` | Mat and floor work | Facility grid |
| `gym-exterior-thindal-erode.webp` | Dark interior, used behind the location card | Contact location panel |
| `xavion-fitness-studio-logo.png` | 512×512 mark on the night background | JSON-LD `logo`, OG image |

Specs: WebP, two crops each (see below), ~4.5 MB total on disk, every file under 300 KB. All
lazy-load except the hero, which is `priority` (eager + `fetchpriority="high"`).

### Art direction these were picked against

The set was re-curated once, and the second pass applied rules the first one
did not. Apply the same rules to any replacement:

- **No other gym's branding.** The first weight-management shot had a trainer
  in a "SWEAT DAILY / e3-fitness.com" shirt — a competitor's logo, on Xavion's
  own site.
- **Dark and warm.** The palette is night/charcoal with champagne gold.
  Fluorescent white ceilings and cool blue casts fight it.
- **No dated processing.** One shot had selective-colour orange over
  desaturated grey. It ages a site instantly.
- **No foreign-language signage**, which places the photo somewhere that is
  obviously not Erode.
- **Full-bleed frames need depth of field.** A heavily blurred foreground
  reads fine on a small card and turns to mush across a whole hero — which is
  why the `improve-strength` goal uses the strength-floor frame rather than
  the battle-ropes one.
- **Look at every candidate before committing.** The first pass chose from
  Unsplash's caption text alone, which is how the competitor logo and the
  rural wooden "GYM ENTRANCE" sign got through.

The logo PNG and `/apple-touch-icon.png` were generated from the same vector as
`public/favicon.svg`, so the mark is identical across favicon, touch icon,
header and structured data.

---

## Two crops per photograph — keep both

Each photograph ships in two files, and the code picks between them by
viewport shape:

| File | Ratio | Size | Used by |
|---|---|---|---|
| `name-erode.webp` | 4:5 | 1400x1750 | Cards, grids, and any viewport taller than the crossover |
| `name-erode-wide.webp` | 16:9 | 2400x1350 | Full-bleed heroes on landscape viewports |

One file cannot serve both. A 16:9 master behind a headline on a phone crops
down to a narrow vertical sliver of its subject; a 4:5 crop stretched across a
desktop hero is the wrong shape *and* short of pixels.

`SmartImage` emits a `<picture>` whenever `src` ends in `-wide.webp`, offering
the 4:5 companion through a `media` query. The browser chooses — no JavaScript,
so there is no flash of the wrong crop, and it works in the prerendered HTML.

**If you add or replace a photograph, produce both crops.** A `-wide` master
with no companion silently loses its art direction; a base file with no `-wide`
cannot head a page.

The crossover thresholds live in `src/utils/images.js` and differ per component
because the image box is not the viewport — the homepage hero carries a 20%
parallax overscan, so its box is taller than the window and it swaps earlier.
Measured crop waste after this change: homepage hero 69% to 30% on a squarish
window, and the exact-ratio slots (3:4, 1:1, 4:5) sit at 0%.

Naming matters: the base name is always the portrait crop. `premium-gym-erode`
was briefly a 16:9 file under the base name, which is how four full-bleed slots
ended up loading portrait crops and stretching them.

---

## Shooting or generating replacements

**Every file needs a different scene.** Reusing one image across the facility
grid is the single most obvious tell of a template site.

If generating with AI, keep the look identical across all twelve and vary only
the subject:

> Ultra-realistic premium fitness photography, luxury modern gym interior,
> authentic athletic adults training naturally, realistic skin texture,
> realistic anatomy, professional full-frame camera, 35mm lens, natural depth
> of field, cinematic but believable lighting, subtle warm highlights, premium
> editorial fitness campaign, realistic equipment, authentic expressions,
> sophisticated composition, no exaggerated muscles, no artificial skin, no
> surreal elements, no visible AI artifacts.

**Colour direction:** warm neutrals, charcoal equipment, soft ivory light.
Nothing should fight the champagne-gold accent in the UI.

**Reject a generation if it has:** distorted hands, extra fingers, impossible
equipment geometry, plastic skin, melted faces, floating weight plates,
unreadable signage text, or the same face repeated across images.

The hero specifically wants a **wide, dark, mid-tone-heavy** frame. The scrim
in `src/index.css` is built to keep the headline readable over any photo, but a
blown-out image will still fight the type.

---

## Alt text

Written per image in `src/data/services.js`,
`src/components/home/FacilityShowcase.jsx` and the page files. Each one
describes its actual scene — don't collapse them into one repeated string.
