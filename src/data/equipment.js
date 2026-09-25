/**
 * ============================================================
 * ⚠️  ESSENTIAL GYM MACHINE REQUIREMENTS — AWAITING CONFIRMATION
 * ============================================================
 * This is a STANDARD equipment list for a premium strength-and-conditioning
 * studio. It is NOT yet the confirmed Xavion floor plan.
 *
 * Because of that, `equipmentConfirmed` below is `false`, and the page says
 * plainly that the final specification is being finalised. Nothing is
 * presented to the public as installed equipment that has not been verified.
 *
 * TO PUBLISH THIS AS FACT:
 *   1. Go through every `items` entry with the studio owner.
 *   2. Delete anything that will not be on the floor. An equipment list is
 *      one of the few things prospective members genuinely check, and being
 *      wrong about it is the kind of thing people mention in reviews.
 *   3. Set `equipmentConfirmed = true`. The "being finalised" notice
 *      disappears and the heading switches to the present tense.
 * ============================================================
 */

export const equipmentConfirmed = false

export const equipmentZones = [
  {
    id: 'strength-machines',
    title: 'Strength Machines',
    icon: 'Dumbbell',
    lead: 'Guided-path resistance machines — the safest place for a beginner to build a base, and useful for isolation work at any level.',
    items: [
      { name: 'Chest press', trains: 'Chest, shoulders, triceps' },
      { name: 'Lat pulldown', trains: 'Back, biceps' },
      { name: 'Seated row', trains: 'Mid-back, rear shoulders' },
      { name: 'Shoulder press', trains: 'Shoulders, triceps' },
      { name: 'Leg press', trains: 'Quads, glutes, hamstrings' },
      { name: 'Leg extension', trains: 'Quads' },
      { name: 'Leg curl', trains: 'Hamstrings' },
      { name: 'Pec deck / rear delt', trains: 'Chest, rear shoulders' },
      { name: 'Cable crossover station', trains: 'Full upper body, adjustable angles' },
      { name: 'Abdominal crunch machine', trains: 'Core' },
    ],
  },
  {
    id: 'free-weights',
    title: 'Free Weights & Racks',
    icon: 'Activity',
    lead: 'Where progressive strength work actually happens. Barbell training is the backbone of every Xavion strength programme.',
    items: [
      { name: 'Power rack with safety bars', trains: 'Squat, press, rack pulls' },
      { name: 'Olympic barbells and bumper plates', trains: 'All compound lifts' },
      { name: 'Flat, incline and decline benches', trains: 'Pressing variations' },
      { name: 'Dumbbell set with rack', trains: 'Full body, unilateral work' },
      { name: 'EZ-curl and fixed barbells', trains: 'Arms, accessory work' },
      { name: 'Smith machine', trains: 'Guided compound work' },
      { name: 'Deadlift platform', trains: 'Hinge patterns, heavy pulls' },
      { name: 'Weight tree and collars', trains: 'Floor organisation and safety' },
    ],
  },
  {
    id: 'cardio-machines',
    title: 'Cardio Machines',
    icon: 'HeartPulse',
    lead: 'Conditioning equipment covering low-impact through to high-intensity interval work.',
    items: [
      { name: 'Motorised treadmills', trains: 'Walking, running, incline work' },
      { name: 'Upright and recumbent bikes', trains: 'Low-impact conditioning' },
      { name: 'Cross trainer / elliptical', trains: 'Full-body low-impact cardio' },
      { name: 'Rowing machine', trains: 'Full-body conditioning' },
      { name: 'Stair climber', trains: 'Legs, cardiovascular endurance' },
      { name: 'Air / assault bike', trains: 'High-intensity intervals' },
    ],
  },
  {
    id: 'functional-zone',
    title: 'Functional & Recovery',
    icon: 'Waves',
    lead: 'Open floor space and the tools for movement quality, conditioning circuits and recovery between harder sessions.',
    items: [
      { name: 'Kettlebell set', trains: 'Swings, carries, full-body work' },
      { name: 'Medicine and slam balls', trains: 'Power, rotational strength' },
      { name: 'Battle ropes', trains: 'Conditioning, grip' },
      { name: 'Plyometric boxes', trains: 'Jumps, step-ups' },
      { name: 'Suspension trainer', trains: 'Bodyweight strength, core' },
      { name: 'Resistance bands', trains: 'Warm-up, assistance, rehab-style work' },
      { name: 'Foam rollers and mats', trains: 'Mobility and recovery' },
      { name: 'Stretching area', trains: 'Range of motion, cool-down' },
    ],
  },
]

/** Total machine/equipment lines — shown as a count, derived not claimed. */
export const equipmentCount = equipmentZones.reduce((total, zone) => total + zone.items.length, 0)
