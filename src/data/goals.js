/**
 * The four training intents offered in the hero's goal selector.
 *
 * `image` points at the 16:9 `-wide` master, not the 4:5 card crop. The hero
 * is full-bleed: feeding it a portrait file means the browser scales a
 * 1400px-wide image across a 2560px viewport and then crops away most of it.
 * Portrait crops belong on cards; wide masters belong behind headlines.
 * Each maps onto real programmes from data/services.js — the selector is a
 * genuine routing device, not decoration.
 */
export const goals = [
  {
    id: 'build-muscle',
    label: 'Build Muscle',
    support:
      'Structured strength training designed around progressive performance, controlled volume and measurable load.',
    card: {
      heading: 'Hypertrophy Focus',
      detail: 'Progressive resistance blocks with tracked load and technique coaching on the main lifts.',
      programmes: ['Strength Training', 'Personal Training'],
    },
    image: '/images/premium-gym-erode-wide.webp',
    imageAlt:
      'Squat racks and loaded barbells on the strength floor at Xavion Fitness Studio, Thindal',
    /** object-position — fine-tunes the crop of that goal's photograph. */
    framing: '50% 30%',
    link: '/services#strength-training',
  },
  {
    id: 'get-fit',
    label: 'Get Fit',
    support: 'Build endurance, mobility and everyday fitness with a schedule you can actually keep.',
    card: {
      heading: 'General Fitness',
      detail: 'Mixed conditioning and mobility work that meets your current fitness where it is.',
      programmes: ['Cardio Training', 'Group Fitness', 'Mobility & Recovery'],
    },
    image: '/images/cardio-training-erode-wide.webp',
    imageAlt:
      'Low-lit cardio floor with treadmills and cross trainers at Xavion Fitness Studio, Erode',

    framing: '35% 45%',
    link: '/services#cardio-training',
  },
  {
    id: 'lose-weight',
    label: 'Lose Weight',
    support: 'Combine structured training with sustainable fitness habits, measured over months not days.',
    card: {
      heading: 'Body Composition',
      detail: 'Strength and conditioning combined, with trainer check-ins and progress reviewed regularly.',
      programmes: ['Weight Management', 'HIIT'],
    },
    image: '/images/weight-management-erode-wide.webp',
    imageAlt:
      'Two members training side by side on resistance machines at Xavion Fitness Studio, Erode',

    framing: '65% 40%',
    link: '/services#weight-management',
  },
  {
    id: 'improve-strength',
    label: 'Improve Strength',
    support: 'Develop strength, stability and physical performance that carries over outside the studio.',
    card: {
      heading: 'Performance Focus',
      detail: 'Compound movement, bracing and multi-planar stability work programmed in blocks.',
      programmes: ['Strength Training', 'Functional Training'],
    },
    /*
      Uses the strength-floor frame rather than the battle-ropes shot: the
      hero runs these full-bleed, and a heavily out-of-focus foreground that
      reads fine on a card turns to mush across an entire screen.
    */
    image: '/images/strength-training-erode-wide.webp',
    imageAlt:
      'Squat rack and barbell station on the strength floor at Xavion Fitness Studio, Thindal',

    framing: '50% 55%',
    link: '/services#functional-training',
  },
]

export const defaultGoal = goals[0]
