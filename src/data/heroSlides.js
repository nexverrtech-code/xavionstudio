/**
 * ============================================================
 * HERO SLIDESHOW
 * ============================================================
 * The background photography cycles slowly on its own. It is the only
 * moving thing left in the hero — headline, copy and buttons hold still.
 *
 * Each entry points at a `-wide` master; SmartImage swaps in the 4:5
 * companion on tall viewports (see src/utils/images.js).
 * ============================================================
 */
export const heroSlides = [
  {
    src: '/images/premium-gym-erode-wide.webp',
    alt: 'Squat racks and loaded barbells on the strength floor at Xavion Fitness Studio, Thindal',
    framing: '50% 40%',
  },
  {
    src: '/images/cardio-training-erode-wide.webp',
    alt: 'Low-lit cardio floor with treadmills and cross trainers at Xavion Fitness Studio, Erode',
    framing: '45% 45%',
  },
  {
    src: '/images/weight-management-erode-wide.webp',
    alt: 'Two members training on resistance machines at Xavion Fitness Studio, Erode',
    framing: '55% 40%',
  },
  {
    src: '/images/strength-training-erode-wide.webp',
    alt: 'Squat rack and barbell station on the strength floor at Xavion Fitness Studio, Thindal',
    framing: '50% 50%',
  },
]

/** How long each slide holds before the next one moves in. */
export const SLIDE_MS = 6000
