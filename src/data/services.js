/**
 * Training programmes offered at Xavion Fitness Studio.
 *
 * `image` is the 4:5 crop used on cards; `imageWide` is the 16:9 master for
 * full-bleed page heroes. Only programmes that head a page need a wide master.
 *
 * ⚠️ Only list programmes the studio will actually run. Remove any
 * entry that is not offered — an empty promise costs more than a
 * shorter list. `image` paths map to src/assets/images/README.md.
 */

export const services = [
  {
    slug: 'strength-training',
    title: 'Strength Training',
    short: 'Build strength, muscle and physical performance through structured resistance training.',
    headline: 'Strength, built on structure.',
    body: 'Progressive resistance work programmed around compound movement, controlled tempo and measurable load. Sessions are structured so every week builds on the last rather than repeating it.',
    forWhom: ['Beginners learning the lifts', 'Members chasing visible muscle growth', 'Anyone plateaued on their own programme'],
    benefits: ['Progressive overload planning', 'Compound and accessory work', 'Technique coaching on the main lifts', 'Tracked load and volume'],
    approach:
      'Assessment first, then a block of training with a clear target. Form is coached before load is added.',
    image: '/images/strength-training-erode.webp',
    imageWide: '/images/strength-training-erode-wide.webp',
    alt: 'Squat rack and barbell station on the strength floor at Xavion Fitness Studio, Thindal',
    icon: 'Dumbbell',
  },
  {
    slug: 'personal-training',
    title: 'Personal Training',
    short: 'One-to-one coaching tailored to your individual goals and training experience.',
    headline: 'Designed around you.',
    body: 'One-to-one coaching for people who want structured workouts, hands-on guidance and someone accountable for their progress. Your programme is written for your body, your schedule and your goal — not pulled off a shelf.',
    forWhom: ['Complete beginners', 'Intermediate members wanting structure', 'Goal-focused or event-specific training'],
    benefits: ['Individual programme design', 'Session-by-session coaching', 'Technique correction in real time', 'Progress reviewed and adjusted'],
    approach:
      'A conversation about your goal, a movement assessment, then a plan reviewed regularly as you progress.',
    image: '/images/personal-training-erode.webp',
    imageWide: '/images/personal-training-erode-wide.webp',
    alt: 'Personal trainer coaching a member through floor work at Xavion Fitness Studio, Erode',
    icon: 'UserRound',
  },
  {
    slug: 'cardio-training',
    title: 'Cardio Training',
    short: 'Improve cardiovascular fitness, endurance and overall conditioning.',
    headline: 'Endurance that carries over.',
    body: 'Structured cardiovascular work across steady-state and interval formats, programmed to build a genuine aerobic base rather than simply burning through a session.',
    forWhom: ['Members building general fitness', 'Anyone returning to training', 'Endurance-focused goals'],
    benefits: ['Steady-state and interval formats', 'Heart-rate guided effort', 'Programmed progression', 'Recovery built in'],
    approach: 'Start where your current fitness actually is, then extend duration and intensity in steps.',
    image: '/images/cardio-training-erode.webp',
    imageWide: '/images/cardio-training-erode-wide.webp',
    alt: 'Low-lit cardio floor with treadmills and cross trainers at Xavion Fitness Studio, Erode',
    icon: 'HeartPulse',
  },
  {
    slug: 'hiit',
    title: 'HIIT',
    short: 'High-intensity sessions designed to challenge your conditioning and movement capacity.',
    headline: 'Short sessions. Real intensity.',
    body: 'Time-efficient, high-effort training that pairs work and rest deliberately. Intensity is scaled to the individual so the session is demanding without becoming careless.',
    forWhom: ['Members short on time', 'Conditioning-focused goals', 'Those with a base level of fitness'],
    benefits: ['Scalable intensity', 'Efficient 30–45 minute formats', 'Mixed movement patterns', 'Coached work-to-rest ratios'],
    approach: 'Movement quality is established first. Intensity is added once the pattern is sound.',
    image: '/images/hiit-training-erode.webp',
    alt: 'Two members training with kettlebells during a high-intensity session at Xavion Fitness Studio',
    icon: 'Zap',
  },
  {
    slug: 'functional-training',
    title: 'Functional Training',
    short: 'Improve strength, balance, stability and everyday movement.',
    headline: 'Training that shows up outside the gym.',
    body: 'Multi-directional, load-bearing movement that builds stability and control through patterns you actually use — carrying, pushing, hinging, rotating, bracing.',
    forWhom: ['Members with physical jobs', 'Anyone wanting practical strength', 'Injury-aware training, with clearance'],
    benefits: ['Core stability and bracing', 'Balance and coordination', 'Multi-planar movement', 'Carry-over to daily activity'],
    approach: 'Patterns before load. Stability before speed.',
    image: '/images/functional-training-erode.webp',
    imageWide: '/images/functional-training-erode-wide.webp',
    alt: 'Members working with battle ropes on the turf at Xavion Fitness Studio, Thindal',
    icon: 'Activity',
  },
  {
    slug: 'weight-management',
    title: 'Weight Management',
    short: 'Structured fitness support focused on sustainable training habits.',
    headline: 'Sustainable, not drastic.',
    body: 'Training support built around consistency — a schedule you can keep, sessions that suit your starting point, and progress measured over months rather than days.',
    forWhom: ['Members with body-composition goals', 'Anyone restarting after a long gap', 'Habit-first training'],
    benefits: ['Realistic weekly structure', 'Combined strength and conditioning', 'Progress tracking', 'Trainer check-ins'],
    approach:
      'Training guidance only. For nutrition or medical advice we will refer you to an appropriate qualified professional.',
    image: '/images/weight-management-erode.webp',
    imageWide: '/images/weight-management-erode-wide.webp',
    alt: 'Two members training side by side on resistance machines at Xavion Fitness Studio, Erode',
    icon: 'TrendingDown',
  },
  {
    slug: 'group-fitness',
    title: 'Group Fitness',
    short: 'Train together in energetic, supportive group sessions.',
    headline: 'Better with company.',
    body: 'Coached group sessions with a shared plan and individual scaling. The atmosphere does half the work — you turn up because the room expects you.',
    forWhom: ['Members who prefer company', 'Anyone who struggles with consistency', 'All experience levels'],
    benefits: ['Coach-led formats', 'Scaled for every level', 'Fixed weekly schedule', 'Built-in accountability'],
    approach: 'One session plan, scaled per person so nobody is left behind or held back.',
    image: '/images/group-fitness-erode.webp',
    alt: 'Group session silhouetted against the studio windows at Xavion Fitness Studio, Thindal',
    icon: 'Users',
  },
  {
    slug: 'mobility-recovery',
    title: 'Mobility & Recovery',
    short: 'Improve movement quality, flexibility and recovery.',
    headline: 'The part most people skip.',
    body: 'Structured mobility and recovery work that protects the training you have already done — range of motion, tissue quality and controlled stretching between harder sessions.',
    forWhom: ['Members training frequently', 'Desk-bound lifestyles', 'Anyone feeling stiff or restricted'],
    benefits: ['Joint range of motion', 'Guided stretching protocols', 'Recovery between sessions', 'Reduced training stiffness'],
    approach: 'Assess restrictions, then work on them consistently in short, regular blocks.',
    image: '/images/mobility-recovery-erode.webp',
    alt: 'Mat and floor work in the recovery area at Xavion Fitness Studio, Erode',
    icon: 'Waves',
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)

/** The four used in the homepage explorer — the studio's core offer. */
export const featuredServices = ['strength-training', 'personal-training', 'functional-training', 'hiit'].map(getService)
