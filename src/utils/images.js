/**
 * ============================================================
 * IMAGE VARIANTS
 * ============================================================
 * Every photograph is stored in two crops:
 *
 *   name-erode.webp        4:5  portrait — cards, and tall viewports
 *   name-erode-wide.webp  16:9  landscape — full-bleed heroes
 *
 * One file cannot serve both. A 16:9 master behind a headline on a phone gets
 * cropped to a narrow vertical slice of itself; a 4:5 crop stretched across a
 * desktop hero is both the wrong shape and not enough pixels. So the two are
 * swapped by viewport shape rather than by guesswork.
 * ============================================================
 */

/**
 * The 4:5 companion of a `-wide` master.
 * Returns null when the source is not a wide master, or when no companion
 * exists — callers then render a plain <img> with no art direction.
 */
export function portraitOf(src) {
  if (typeof src !== 'string' || !src.endsWith('-wide.webp')) return null
  return src.replace(/-wide\.webp$/, '.webp')
}

/**
 * Media queries that decide which crop wins.
 *
 * Keyed on the viewport's *shape*, not its width — what matters is whether the
 * box the image fills is taller or wider than the crop it is given. A width
 * breakpoint gets narrow desktop windows wrong.
 *
 * The threshold differs by component because the image box is not the
 * viewport. Cropping cost for a box of ratio B is `1 - min(B,S)/max(B,S)`
 * against source ratio S, so 4:5 (0.8) beats 16:9 (1.78) once B drops below
 * about 1.19. Each constant below is that crossover translated through how
 * tall the component's box actually is relative to the viewport.
 */

/** Shorter heroes whose box is wider than the viewport (PageHero, panels). */
export const PORTRAIT_MEDIA = '(max-aspect-ratio: 1/1)'

/**
 * The homepage hero. Its backdrop is `min-h-[100svh]` plus a 20% parallax
 * overscan, so the box is roughly 1.2x taller than the viewport — which moves
 * the crossover up to a viewport ratio of about 1.4. Without this, a squarish
 * desktop window took a 69% crop off the 16:9 master.
 */
export const PORTRAIT_MEDIA_TALL = '(max-aspect-ratio: 7/5)'
