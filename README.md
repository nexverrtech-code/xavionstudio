# Xavion Fitness Studio

Premium fitness studio website — Thindal, Erode, Tamil Nadu.
React 19 · Vite 6 · Tailwind 4 · Framer Motion · React Router 7.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client + SSR + prerender → dist/
npm run preview  # serve the built site
```

---

## ⚠️ Before this goes live

Everything below is a real business fact the site needs. Nothing has been
invented in its place — fields that are unknown are `null`, and the UI degrades
around them. Search the codebase for `CONFIRM` to find them all.

**All of it lives in one file: [`src/data/site.js`](src/data/site.js).**

| # | What | Where | What happens until it's filled |
|---|---|---|---|
| 1 | **Live domain** | `siteUrl` in `src/data/site.js`, plus `public/robots.txt` and the fallback `<link rel="canonical">` in `index.html` | Canonicals and the sitemap point at `xavionfitnessstudio.com`, which may not be yours |
| 2 | **Street address** | `location.street` | Address shows area only; the map panel shows a location card instead of an embed |
| 3 | **Coordinates** | `location.geo` | No `geo` in structured data; no map pin |
| 4 | **Email** | `contact.email` | Email rows are hidden entirely — no dead `mailto:` |
| 5 | **Opening hours** | `hours` | Shows "Opening hours announced at launch"; no `openingHoursSpecification` emitted |
| 6 | **Instagram URL** | `social.instagram` | Social icons are hidden rather than linking nowhere |
| 7 | **Membership prices** | `prices` in [`src/data/membership.js`](src/data/membership.js) | Cards show "Contact for pricing" |
| 8 | **Photography** | `public/images/` | **Stock photos are in place** so the site demos as finished — they are not the real studio. See [`public/images/README.md`](public/images/README.md) |
| 9 | **Equipment list** | `src/data/equipment.js` | A standard list is shown with a visible "being confirmed" notice. Set `equipmentConfirmed = true` once it is real |

### Adding prices

Fill in plain rupee numbers — nothing else:

```js
prices: { monthly: 1500, quarterly: 4000, yearly: 14000 }
```

The per-month equivalent, the "Save 22%" badge and `priceRange` in the
structured data are **all derived from those numbers**. Don't hand-write them;
they'd only drift.

### When the studio opens

Set `isPreLaunch: false` in `src/data/site.js`. That flips "Opening Soon" to
"Now Open" everywhere it appears.

---

## Decisions you should know about

These are places where the brief and reality disagreed. Each one was resolved
toward *not publishing something untrue*, because a new local business gets
exactly one chance at trust — and fabricated reviews, ratings and member counts
are the fastest way to lose it (they also breach Google's policies).

**Testimonials were replaced.** The brief asked for "REAL MEMBER TESTIMONIALS".
The studio is pre-launch and has no members, so there are none. Instead of
inventing them, `src/components/home/FoundingMembers.jsx` says so plainly and
converts it into a reason to visit: see the floor, talk to a trainer, take a
free session. Swap it for real quotes — with real names and permission — once
there are some.

**Stats are counted, not claimed.** The brief specified "500+ Members · 15+
Expert Trainers · 10K+ Sq. Ft.". None of that is knowable yet.
`src/components/home/Stats.jsx` counts programmes and membership tiers straight
from the data files, and the count-up animation is preserved. The file carries
the exact shape to paste the real figures into later.

**The contact form doesn't pretend to send.** There's no backend, so claiming
"your message has been sent" would be a lie. Submitting composes a structured
enquiry and opens it in the visitor's WhatsApp to the studio's number — the
visitor presses send, and the enquiry genuinely arrives. The form says this
before you submit, not after. To switch to a real backend later, replace the
body of `submit()` in `src/components/contact/ContactForm.jsx` and set
`DELIVERY = 'server'`; the success panel already handles both paths.

**The equipment list is marked as provisional.** `/requirements` now carries an
Essential Gym Machines section — 32 items across four zones. It is a standard
premium-studio specification, not a confirmed Xavion floor plan, so the section
says so in a visible notice and `equipmentConfirmed` in `src/data/equipment.js`
is `false`. Go through the list with the owner, delete anything that will not be
on the floor, then flip that flag: the notice disappears and the heading moves
to the present tense.

**No map pin is guessed.** Google Maps embeds only once a verified street
address or coordinates exist. Until then `LocationMap` shows the confirmed area
and a working directions link, and states that the exact address follows on
enquiry.

**The Services H1 follows the SEO spec, not the hero spec.** The brief gave the
page two different headings (§12 "Train With Purpose", §24 "Training Designed
Around Your Goals"). The H1 is the SEO one; "Train with purpose" became the
section heading below it, so both survive without duplicating.

**`GymEtiquette.jsx` is called `FitnessGuidelines.jsx`.** Etiquette is one of
the three checklists in `src/data/requirements.js` and renders through
`RequirementChecklist`. The separate component holds the fitness guidelines and
the medical disclaimer, so it's named for what it does.

---

## Intro overlay & hero effects

`src/components/layout/Preloader.jsx` shows the mark, the name and the location
for **1.5s on the first page view of a session**, then lifts away. Three rules
it obeys, because splash screens are easy to get wrong:

- **It never gates content.** The page renders underneath from the first frame —
  this is an overlay, not a loading gate. It is absent from the prerendered HTML
  entirely, so crawlers and anyone with JS disabled are unaffected.
- **Once per session**, tracked in `sessionStorage`. A logo animation on every
  navigation is an irritation, not branding.
- **Skipped under `prefers-reduced-motion`**, and dismissible with any click or
  keypress.

One honest trade-off: an opaque overlay during first paint can make Lighthouse
attribute LCP to the overlay. If a Core Web Vitals score matters more than the
intro, drop `<Preloader />` from `src/App.jsx` — nothing else depends on it.

The hero (`src/components/home/Hero.jsx`) follows one rule: **one cinematic
entrance, then stillness.** Nothing loops, cycles or advances by itself. After
the reveal settles, the only things that move are responses to the visitor.

**The entrance**, choreographed in the `T` timeline object at the top of the file:

| | |
|---|---|
| 0.0s | Photograph opens from the centre line like a letterbox (`clip-path` + scale 1.14→1) |
| 0.18s | Gold rule draws, eyebrow fades in |
| 0.3s | Headline words rotate up from behind their masks in 3D, staggered per line and per word |
| 0.45s | A single gold light bar crosses the whole hero — the seam tying it together |
| 0.5s | One shimmer pass over "Stronger", which then holds its gold gradient |
| 0.85s→1.5s | Supporting copy, buttons, goal pills and glass cards cascade in; scroll cue last |

**After the entrance, one thing moves on its own: the photograph.** A slow
slideshow drifts through the four hero images every 6s (`src/data/heroSlides.js`).
It drives the IMAGE ONLY — headline, supporting copy, goal pills and glass card
never change unprompted, because a hero that rewrites its own text is one
nobody finishes reading.

**Choosing a goal ends the slideshow for good** and locks the photograph to
that goal's image. The visitor has said what they came for; the studio should
stop talking over them.

Everything else is a response to the visitor: scroll parallax, the 3D tilt on
the glass card, the magnetic "Book Free Trial", and the wipe when a goal is
picked.

**Removed deliberately:** the cursor-following gold spotlight, the goal
carousel and its countdown ring, the Ken Burns oscillation, the drifting aurora
fields, the repeating headline shimmer and the bobbing scroll arrow.

> **Gotcha worth keeping.** Every `initial` on the backdrop must define the same
> keys that `animate` sets. The slideshow's `initial` originally omitted
> `clipPath`; animating from the computed `none` to an `inset()` is not
> interpolatable, so Framer dropped the whole batch — new slides sat at
> `opacity: 0`, old ones never unmounted, and four images silently stacked up.

### The intro gate

`src/hooks/useIntroGate.js` holds the hero's entrance until the branded overlay
starts lifting. Without it the hero animated on mount — *behind* the preloader —
so by the time the overlay cleared the reveal had already finished and the
visitor saw a static page.

Two things this has to get right:

- **Every Preloader exit opens the gate**, including the paths where it never
  shows (reduced motion, second visit in a session, blocked `sessionStorage`).
  Miss one and the hero waits forever for a reveal that is not coming.
- **There is a 2.6s fallback timer** in the hook, and a `<noscript>` block in
  `index.html` that forces `[data-hero]` content visible. The hero's elements
  start at `opacity: 0`, so content must never depend on the animation firing.

Headline contrast does **not** depend on the photo: `.scrim` and `.scrim-left`
in `src/index.css` are weighted so any replacement image keeps the type legible.

---

## SEO

**The site prerenders to static HTML.** `npm run build` renders every route
through `src/entry-server.jsx` and writes real HTML files — each with its own
title, description, canonical and JSON-LD already in the markup.

This matters more than usual here. Googlebot runs JavaScript, but most of the
crawlers feeding AI answers and social previews do not — to them a
client-rendered SPA looks like an empty page. Since local search and AI
visibility are both goals, the HTML has to be there on arrival.

| Piece | Where |
|---|---|
| Per-page title / description / H1 | `pageMeta` in `src/utils/seo.js` |
| Structured data (`ExerciseGym`, `WebSite`, `BreadcrumbList`, `FAQPage`) | `src/utils/seo.js` |
| Q&A content for AI search | `faqs` in `src/utils/seo.js`, rendered by `src/components/ui/FAQ.jsx` |
| `<head>` management (no react-helmet) | `src/utils/head.jsx` + `src/components/ui/SEO.jsx` |
| `sitemap.xml` | Generated at build time by `scripts/prerender.mjs`, so it can't drift |
| `robots.txt` | `public/robots.txt` |

Structured data emits **only verified facts**. No ratings, reviews, awards,
certifications or member counts. Opening hours and `priceRange` appear
automatically once those fields are filled in.

FAQ answers stay in the DOM when a panel is collapsed, so crawlers read all of
them without clicking (hidden from screen readers to avoid announcing content
the button reports as collapsed).

### Hosting note

Routes are real directories (`dist/services/index.html`), so most static hosts
serve them correctly with no config. Set the 404 fallback to `/404.html` —
**not** `/index.html`, or wrong URLs would return HTTP 200 with the homepage,
which search engines treat as a soft 404.

---

## Structure

```
src/
├── components/
│   ├── layout/     Navbar · AnnouncementBar · Footer · MobileActionBar · Preloader
│   ├── home/       Hero · GoalSelector · Stats · LocalIntro · WhyChooseUs
│   │               MembershipPreview · RequirementsPreview · FirstVisitSteps
│   │               FoundingMembers · FacilityShowcase · ContactCTA · ServicesSection
│   ├── services/   ServiceExplorer · ServiceCard
│   ├── membership/ MembershipCards · MembershipToggle · MembershipComparison
│   ├── requirements/ RequirementChecklist · EquipmentRequirements
│   │               FitnessGuidelines · FirstVisitTimeline
│   ├── contact/    ContactForm · LocationMap
│   └── ui/         Button · SectionHeading · GlassCard · AnimatedNumber
│                   Reveal · SmartImage · PageHero · FAQ · Logo · SEO · ServiceIcon
├── data/           site.js ← all business facts · services · membership
│                   requirements · equipment · goals
├── hooks/          useScrollAnimation.js
├── utils/          seo.js · head.jsx
├── pages/          Home · Services · Membership · Requirements · Contact · NotFound
├── App.jsx · entry-client.jsx · entry-server.jsx · index.css
scripts/prerender.mjs
```

Design tokens (colour, type scale, easing, shadows) are defined once in
`src/index.css` under `@theme` — Tailwind 4 keeps them in CSS, so there's no
`tailwind.config.js`.

Vertical rhythm is centralised too: `.shell`, `.section-y` and `.section-gap`
in the same file set every section's width and padding, so page spacing is
tuned in one place rather than across forty components.

---

## Performance & accessibility

- **~163 KB gzipped JS, 11.8 KB CSS**, split into `react` / `motion` / `router` / app chunks.
- Route-level `React.lazy` was deliberately **not** used: it's incompatible with
  synchronous `renderToString`, and splitting five small marketing pages would
  cost more in prerender complexity than it saves. The vendor split is where the
  actual win is.
- Icons are imported individually via `src/components/ui/ServiceIcon.jsx`.
  `import * as Icons from 'lucide-react'` would pull the whole icon set.
- Images lazy-load with `decoding="async"`; the hero is `priority` (eager +
  `fetchpriority="high"`).
- Every page: one `<h1>`, no skipped heading levels, no duplicate IDs, no
  unnamed controls, and no horizontal overflow at 375px — all verified.
- `prefers-reduced-motion` is honoured globally in CSS *and* per-component via
  Framer's `useReducedMotion`, so reveal and transition animations resolve
  instantly rather than merely running faster.
- Selector controls are real radio groups with arrow-key support; accordions
  use `aria-expanded` and only reference `aria-controls` while the panel exists.
- Skip-to-content link, visible gold focus rings, semantic `<table>` for the
  membership comparison.

Checklist ticks persist via `localStorage`, wrapped in `try/catch` — the feature
works identically when storage is blocked.
