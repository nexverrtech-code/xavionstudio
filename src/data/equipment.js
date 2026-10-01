/**
 * ============================================================
 * EQUIPMENT — what is going on the gym floor
 * ============================================================
 *
 * Xavion is pre-launch, so this list describes the planned fit-out, not a
 * floor anyone has walked yet. The page says so out loud rather than quietly
 * implying the machines are already installed.
 *
 * ── BEFORE LAUNCH ──
 *   1. Walk the floor and correct this list against what was actually bought.
 *   2. Replace the renders with photographs of the real machines — equipment is
 *      one of the few things prospective members genuinely check.
 *   3. Set `equipmentConfirmed = true`.
 *
 * ── IMAGES ──
 * `img` is a slug. Each machine has its own render in /images/eq/ in two
 * crops — `<slug>.webp` (4:3, card) and `<slug>-wide.webp` (16:9, dialog).
 *
 * Exactly one machine has no render of its own — the stair climber, which
 * was not in the supplied set. It carries an explicit { src, alt } instead
 * of a slug; `machineImage` handles both.
 * ============================================================
 */

export const equipmentConfirmed = false

const m = (name, trains, img, desc, outcomes) => ({ name, trains, img, desc, outcomes })

export const equipmentZones = [
  {
    id: 'strength-machines',
    title: 'Strength Machines',
    icon: 'Dumbbell',
    images: [
      { src: '/images/eq/chest-press-wide.webp', alt: 'Equipment on the strength machines at Xavion Fitness Studio' },
      { src: '/images/eq/lat-pulldown-wide.webp', alt: 'Equipment on the strength machines at Xavion Fitness Studio' },
    ],
    lead: 'Guided-path resistance machines — the safest place for a beginner to build a base, and useful for isolation work at any level.',
    items: [
      m('Chest press', 'Chest, shoulders, triceps', 'chest-press',
        'A seated pressing path that keeps the bar tracking for you, so you can push close to failure without a spotter.',
        ['Builds pressing strength safely', 'Load and de-load fast', 'A good first pressing movement']),
      m('Lat pulldown', 'Back, biceps', 'lat-pulldown',
        'Vertical pulling with adjustable load — the bridge most people use on the way to a full pull-up.',
        ['Builds back width', 'Scales below bodyweight', 'Teaches the pull-up pattern']),
      m('Seated row', 'Mid-back, rear shoulders', 'seated-row',
        'Horizontal pulling against a chest pad, which takes the lower back out of the movement.',
        ['Balances out pressing work', 'Improves posture', 'Low spinal load']),
      m('Shoulder press', 'Shoulders, triceps', 'shoulder-press',
        'Overhead pressing on a fixed path, with back support so the effort stays in the shoulders.',
        ['Builds overhead strength', 'Supported lower back', 'Safe to train near failure']),
      m('Leg press', 'Quads, glutes, hamstrings', 'leg-press',
        'Heavy leg work with your back supported — the highest load most people can handle safely.',
        ['Heavy loading without a bar', 'Adjustable foot position', 'Low technical barrier']),
      m('Leg extension', 'Quads', 'leg-extension',
        'Isolates the quadriceps through a full knee extension.',
        ['Targeted quad work', 'Knee-friendly volume', 'A good finisher']),
      m('Leg curl', 'Hamstrings', 'leg-curl',
        'Isolates the hamstrings — the group most lifters under-train relative to quads.',
        ['Balances quad-dominant training', 'Supports knee health', 'Simple to progress']),
      m('Pec deck / rear delt', 'Chest, rear shoulders', 'pec-deck',
        'One frame, two jobs: chest flyes facing in, rear delts facing out.',
        ['Isolates chest without triceps', 'Rear delt work for posture', 'Fast to switch between']),
      m('Chest fly machine', 'Chest, front shoulders', 'chest-fly',
        'A wide arc that loads the chest at full stretch, where free weights give the least resistance.',
        ['Loads the stretched position', 'Minimal triceps involvement', 'Controlled range']),
      m('Cable crossover station', 'Full upper body, adjustable angles', 'cable-crossover',
        'Two adjustable pulleys, which makes it the most versatile frame on the floor.',
        ['Any angle of pull', 'Constant tension', 'Dozens of movements from one station']),
      m('Triceps pushdown station', 'Triceps', 'triceps-pushdown',
        'Cable pushdowns with a rope or bar attachment.',
        ['Isolates triceps', 'Easy to drop-set', 'Elbow-friendly']),
      m('Biceps curl machine', 'Biceps', 'biceps-curl',
        'Curling with the upper arm braced, so momentum cannot help.',
        ['Strict curling', 'No lower-back swing', 'Consistent tension']),
      m('Lateral raise machine', 'Side shoulders', 'lateral-raise',
        'Loads the side delts through the range where dumbbells go light.',
        ['Builds shoulder width', 'Resistance where it matters', 'Easy to train to failure']),
      m('Hip abductor / adductor', 'Glutes, inner thigh', 'hip-abductor',
        'Seated work for the muscles that move the leg in and out.',
        ['Hip stability', 'Supports squat mechanics', 'Often-skipped work']),
      m('Calf raise machine', 'Calves', 'calf-raise',
        'Loaded calf raises through a full stretch and contraction.',
        ['Builds lower-leg strength', 'Ankle resilience', 'High-rep friendly']),
      m('Back extension bench', 'Lower back, glutes', 'back-extension',
        'Hip hinge against bodyweight, and against a plate once that is easy.',
        ['Strengthens the posterior chain', 'Supports deadlift work', 'Simple to progress']),
      m('Abdominal crunch machine', 'Core', 'ab-crunch',
        'Loaded trunk flexion, so core work can progress like everything else.',
        ['Progressive core loading', 'Supported neck and back', 'Measurable progression']),
      m('Assisted pull-up machine', 'Back, biceps', 'assisted-pullup',
        'Counterweights part of your bodyweight, so you can train real pull-ups before you can do one.',
        ['A path to the first pull-up', 'Reduce assistance over time', 'Also useful for dips']),
    ],
  },
  {
    id: 'free-weights',
    title: 'Free Weights & Racks',
    icon: 'Activity',
    images: [
      { src: '/images/eq/power-rack-wide.webp', alt: 'Equipment on the free weights at Xavion Fitness Studio' },
      { src: '/images/eq/dumbbells-wide.webp', alt: 'Equipment on the free weights at Xavion Fitness Studio' },
    ],
    lead: 'Where progressive strength work actually happens. Barbell training is the backbone of every Xavion strength programme.',
    items: [
      m('Power rack with safety bars', 'Squat, press, rack pulls', 'power-rack',
        'A cage with adjustable safety pins, so you can fail a squat on your own without getting hurt.',
        ['Train heavy without a spotter', 'Squat, press and pull in one frame', 'Set the exact depth you want']),
      m('Olympic barbells and bumper plates', 'All compound lifts', 'olympic-barbells',
        'Standard 20 kg bars and rubber plates that can be dropped without damaging the floor.',
        ['The base of every strength block', 'Load in small increments', 'Drop-safe']),
      m('Flat, incline and decline benches', 'Pressing variations', 'benches',
        'Three angles, three slightly different emphases across the chest and shoulders.',
        ['Varies the pressing angle', 'Pairs with the rack', 'Supports dumbbell work']),
      m('Adjustable bench', 'Pressing at any angle', 'adjustable-bench',
        'One bench covering everything between flat and upright.',
        ['Fine-tune the angle', 'Saves floor space', 'Works with every dumbbell movement']),
      m('Hex dumbbells, 2.5–50 kg', 'Full body, unilateral work', 'dumbbells',
        'A full run of dumbbells, so each side of the body has to do its own work.',
        ['Finds and fixes imbalances', 'Huge movement range', 'Small jumps between weights']),
      m('EZ-curl and fixed barbells', 'Arms, accessory work', 'ez-curl',
        'Pre-loaded bars for arm work without stripping plates each set.',
        ['Fast between sets', 'Wrist-friendly grip', 'Ideal for high-rep work']),
      m('Preacher curl bench', 'Biceps', 'preacher-curl',
        'Braces the upper arm at an angle that removes every bit of cheating.',
        ['Strict biceps work', 'Loads the stretch', 'Pairs with the EZ bar']),
      m('Smith machine', 'Guided compound work', 'smith-machine',
        'A barbell fixed to a vertical track, with hooks you can catch at any height.',
        ['Safe to push near failure', 'Useful when training alone', 'Good for controlled tempo work']),
      m('Deadlift platform', 'Hinge patterns, heavy pulls', 'deadlift-platform',
        'A dedicated surface built to take dropped weight without wrecking the floor.',
        ['Pull heavy safely', 'Protects the floor and bars', 'Space to set up properly']),
      m('Trap / hex bar', 'Deadlifts, carries, shrugs', 'trap-bar',
        'You stand inside this bar rather than behind it, which is far kinder to the lower back.',
        ['Easier to learn than a straight bar', 'Less spinal shear', 'Great for carries']),
      m('Landmine attachment', 'Rotational and pressing work', 'landmine',
        'One end of a barbell pinned into a pivot, creating an arc instead of a straight line.',
        ['Shoulder-friendly pressing', 'Rotational core work', 'Easy to scale']),
      m('Weight tree and collars', 'Floor organisation and safety', 'weight-tree',
        'Somewhere for every plate to live, and collars so nothing slides mid-set.',
        ['Keeps the floor clear', 'Faster plate changes', 'Safer loaded bars']),
      m('Weight belts and straps', 'Heavy pulls and carries', 'belts-straps',
        'Belts for bracing under a heavy bar, straps for when grip gives out before the target muscle does.',
        ['Train the intended muscle', 'Supports heavy bracing', 'Available to borrow']),
      m('Chalk station', 'Grip on heavy pulls', 'chalk-station',
        'Chalk and a bowl, kept in one place so it stays off the rest of the floor.',
        ['Reliable grip', 'Contained mess', 'Standard on any serious floor']),
    ],
  },
  {
    id: 'cardio-machines',
    title: 'Cardio Machines',
    icon: 'HeartPulse',
    images: [
      { src: '/images/eq/treadmill-wide.webp', alt: 'Equipment on the cardio machines at Xavion Fitness Studio' },
      { src: '/images/eq/rower-wide.webp', alt: 'Equipment on the cardio machines at Xavion Fitness Studio' },
    ],
    lead: 'Conditioning equipment covering low-impact through to high-intensity interval work.',
    items: [
      m('Motorised treadmills', 'Walking, running, incline work', 'treadmill',
        'Adjustable speed and incline, with cushioning that is easier on the knees than road running.',
        ['Precise pace control', 'Incline for low-impact intensity', 'Works for walking and sprinting']),
      m('Curved manual treadmill', 'Sprint intervals', 'curved-treadmill',
        'No motor — the belt moves because you do, so it stops the moment you do.',
        ['Self-paced sprinting', 'Higher effort per minute', 'Very safe to bail out of']),
      m('Upright and recumbent bikes', 'Low-impact conditioning', 'upright-recumbent-bikes',
        'Two seating positions; the recumbent takes all load off the lower back.',
        ['Joint-friendly cardio', 'Good returning from injury', 'Easy to sustain long efforts']),
      m('Spin bikes', 'Class-style interval work', 'spin-bike',
        'Weighted flywheel bikes built for standing climbs and hard intervals.',
        ['High-intensity intervals', 'Standing and seated work', 'Used in group sessions']),
      m('Cross trainer / elliptical', 'Full-body low-impact cardio', 'cross-trainer',
        'Arms and legs together with no impact through the joints at all.',
        ['Zero-impact conditioning', 'Full-body effort', 'Gentle on knees and hips']),
      m('Rowing machine', 'Full-body conditioning', 'rower',
        'The most complete cardio machine on any floor — legs, back and arms in one stroke.',
        ['Trains most of the body at once', 'Measurable split times', 'Low impact, high effort']),
      m('Ski erg', 'Full-body pulling conditioning', 'ski-erg',
        'A standing double-pole action that loads the lats and core hard.',
        ['Upper-body conditioning', 'Pairs well with the rower', 'Standing position']),
      // No dedicated render supplied; falls back to the cardio zone photo.
      m('Stair climber', 'Legs, cardiovascular endurance', { src: '/images/cardio-training-erode.webp', alt: 'Cardio floor at Xavion Fitness Studio' },
        'A moving staircase — as honest a conditioning tool as exists.',
        ['Serious leg endurance', 'High calorie burn', 'Low impact']),
      m('Air / assault bike', 'High-intensity intervals', 'air-bike',
        'A fan bike where resistance rises with effort, so it is exactly as hard as you make it.',
        ['Self-limiting intensity', 'Arms and legs together', 'Built for short intervals']),
      m('Jump ropes', 'Warm-up, footwork, conditioning', 'jump-ropes',
        'The cheapest conditioning tool there is, and one of the best for coordination.',
        ['Fast warm-ups', 'Improves footwork', 'Takes almost no space']),
    ],
  },
  {
    id: 'functional-zone',
    title: 'Functional & Recovery',
    icon: 'Waves',
    images: [
      { src: '/images/eq/kettlebells-wide.webp', alt: 'Equipment on the functional zone at Xavion Fitness Studio' },
      { src: '/images/eq/battle-ropes-wide.webp', alt: 'Equipment on the functional zone at Xavion Fitness Studio' },
    ],
    lead: 'Open floor space and the tools for movement quality, conditioning circuits and recovery between harder sessions.',
    items: [
      m('Kettlebell set', 'Swings, carries, full-body work', 'kettlebells',
        'An offset handle that makes swinging and carrying natural in a way dumbbells never are.',
        ['Explosive hip work', 'Grip and core demand', 'One tool, many movements']),
      m('Medicine and slam balls', 'Power, rotational strength', 'med-balls',
        'Weighted balls you can throw and slam without worrying about the landing.',
        ['Trains power output', 'Rotational core work', 'Safe to release at speed']),
      m('Battle ropes', 'Conditioning, grip', 'battle-ropes',
        'Heavy ropes with no eccentric loading, which means all effort and almost no soreness.',
        ['Hard conditioning, low soreness', 'Big grip demand', 'Easy to scale by tempo']),
      m('Plyometric boxes', 'Jumps, step-ups', 'plyo-boxes',
        'Stacked heights for jumping onto and stepping up from.',
        ['Builds lower-body power', 'Scales by height', 'Doubles as a bench']),
      m('Suspension trainer', 'Bodyweight strength, core', 'suspension-trainer',
        'Straps anchored overhead — change the angle of your body and you change the difficulty.',
        ['Infinitely scalable', 'Constant core demand', 'Works for every level']),
      m('Gymnastic rings', 'Bodyweight pulling and pressing', 'rings',
        'The least stable pulling surface there is, which is exactly the point.',
        ['Huge stability demand', 'Shoulder-friendly rotation', 'Rows through to dips']),
      m('Parallette bars', 'Bodyweight strength, dips', 'parallettes',
        'Low parallel bars for dips, L-sits and push-up variations.',
        ['Wrist-friendly pressing', 'Core strength work', 'Compact']),
      m('Resistance bands', 'Warm-up, assistance, rehab-style work', 'resistance-bands',
        'Light to heavy loops for warming up, assisting pull-ups or adding tension to a bar.',
        ['Excellent warm-up tool', 'Assists bodyweight work', 'Travels anywhere']),
      m('Turf sled track', 'Pushes, pulls, sprints', 'sled-track',
        'A strip of turf long enough to actually push a sled down.',
        ['Conditioning with no eccentric', 'Very easy on joints', 'Scales by load']),
      m('Weighted sled', 'Leg drive, conditioning', 'sled',
        'Push it, pull it or drag it — brutally effective and almost impossible to do with bad form.',
        ['Leg power and conditioning', 'Minimal soreness', 'Hard to do wrong']),
      m('Bulgarian bags', 'Rotational strength', 'bulgarian-bags',
        'A crescent-shaped weighted bag built for swinging and spinning.',
        ['Rotational power', 'Grip and shoulder demand', 'Full-body circuits']),
      m('Sandbags', 'Carries, cleans, odd-object lifting', 'sandbags',
        'Shifting, awkward load — much closer to lifting something in real life than a barbell is.',
        ['Real-world carrying strength', 'Huge core demand', 'Forgiving on joints']),
      m('Balance and wobble boards', 'Ankle stability, proprioception', 'balance-boards',
        'Unstable platforms that train the small stabilising muscles around the ankle.',
        ['Ankle resilience', 'Better balance', 'Useful returning from injury']),
      m('Foam rollers and mats', 'Mobility and recovery', 'foam-rollers',
        'Floor space and rollers for working on tissue quality between harder sessions.',
        ['Eases training stiffness', 'Supports recovery days', 'Somewhere to stretch properly']),
      m('Massage guns', 'Recovery between sessions', 'massage-guns',
        'Percussive devices for working on a specific tight area quickly.',
        ['Targeted relief', 'Fast to use', 'Good post-session']),
      m('Stretching area', 'Range of motion, cool-down', 'stretching-area',
        'Quiet floor space away from the machines, so stretching is not done in a walkway.',
        ['Room to move properly', 'A calmer corner of the floor', 'Space for mobility work']),
    ],
  },
]

/** Resolves a machine to its two crops. */
export function machineImage(item) {
  if (typeof item.img === 'object')
    return { card: item.img.src, wide: item.img.src, alt: item.img.alt }
  return {
    card: `/images/eq/${item.img}.webp`,
    wide: `/images/eq/${item.img}-wide.webp`,
    alt: `${item.name} at Xavion Fitness Studio, Thindal, Erode`,
  }
}

/** Total machine/equipment lines — shown as a count, derived not claimed. */
export const equipmentCount = equipmentZones.reduce((total, zone) => total + zone.items.length, 0)

/** Flat list, for search across every zone. */
export const allEquipment = equipmentZones.flatMap((zone) =>
  zone.items.map((item) => ({ ...item, zoneId: zone.id, zoneTitle: zone.title })),
)
