import { goals } from './goals'

/**
 * ============================================================
 * HERO SLIDESHOW
 * ============================================================
 * The background photography cycles slowly on its own. It is kept separate
 * from the goal selector on purpose:
 *
 *   • The slideshow drives the IMAGE ONLY. Headline, supporting copy, the
 *     goal pills and the glass card never change unprompted — a hero that
 *     rewrites its own text is a hero nobody finishes reading.
 *   • The moment a visitor picks a goal, the slideshow stops for good and the
 *     photograph locks to that goal's image. They have stated what they came
 *     for; the studio should stop talking over them.
 *
 * Slides reuse the goal photography so there is no second set of files to
 * keep in sync — add an entry here to show a picture that no goal uses.
 * ============================================================
 */
export const heroSlides = goals.map((goal) => ({
  src: goal.image,
  alt: goal.imageAlt,
  framing: goal.framing,
}))

/** How long each slide holds before the next one moves in. */
export const SLIDE_MS = 6000
