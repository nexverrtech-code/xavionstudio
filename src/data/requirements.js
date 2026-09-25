/**
 * Everything a new member needs before their first session.
 * Factual and practical only — no medical claims anywhere in this file.
 */

export const checklists = [
  {
    id: 'what-to-bring',
    title: 'What To Bring',
    lead: 'Pack these and your first session runs without a hitch.',
    icon: 'Backpack',
    items: [
      { label: 'Water bottle', note: 'Refill points are available on the floor.' },
      { label: 'Workout clothes', note: 'Comfortable, breathable and easy to move in.' },
      { label: 'Training shoes', note: 'Clean indoor shoes with a supportive sole.' },
      { label: 'Personal towel', note: 'For your own use and for wiping down equipment.' },
      { label: 'Registration details', note: 'Any ID or membership details we have asked you for.' },
    ],
  },
  {
    id: 'before-your-first-workout',
    title: 'Before Your First Workout',
    lead: 'Five steps that take a few minutes and save you a wasted session.',
    icon: 'ClipboardCheck',
    items: [
      { label: 'Complete registration', note: 'In person at the studio or ahead of your visit.' },
      { label: 'Choose your membership', note: 'Our team will talk you through the options.' },
      { label: 'Complete your fitness assessment', note: 'Where your membership includes one.' },
      { label: 'Speak with a trainer', note: 'Especially important if you are new to training.' },
      { label: 'Read the studio rules', note: 'A short list, shared at registration.' },
    ],
  },
  {
    id: 'gym-etiquette',
    title: 'Studio Etiquette',
    lead: 'The floor works well when everyone follows the same few rules.',
    icon: 'Handshake',
    items: [
      { label: 'Wipe equipment after use', note: 'Sanitiser and cloths are provided throughout.' },
      { label: 'Return weights to the rack', note: 'Re-rack plates and dumbbells where you found them.' },
      { label: 'Respect other members', note: 'Share equipment during busy periods.' },
      { label: 'Follow trainer instructions', note: 'Particularly around equipment and safety.' },
      { label: 'Keep belongings secure', note: 'Use the storage provided rather than the floor.' },
      { label: 'Use equipment responsibly', note: 'Ask if you are unsure how something works.' },
    ],
  },
]

/**
 * General guidance only. Deliberately contains no medical claims and
 * defers to qualified healthcare professionals.
 */
export const guidelines = {
  title: 'Fitness Guidelines',
  lead: 'Sensible general guidance for anyone starting a new training programme.',
  points: [
    {
      title: 'Start at your current level',
      body: 'Begin with a load and volume you can complete with good form, then build from there. Progress made steadily holds; progress rushed rarely does.',
    },
    {
      title: 'Warm up and cool down',
      body: 'Give yourself a few minutes at either end of a session. It prepares you for the work and helps you recover for the next one.',
    },
    {
      title: 'Ask before you load',
      body: 'If you are unsure how a machine works or whether your form is right, ask a trainer. That is what they are on the floor for.',
    },
    {
      title: 'Rest is part of training',
      body: 'Recovery days are when adaptation happens. A programme without them is not a harder programme, just a less effective one.',
    },
  ],
  disclaimer:
    'If you have a medical condition, an injury or a specific health concern, consult an appropriate healthcare professional before beginning a new exercise programme. Our trainers provide fitness guidance and are not a substitute for medical advice.',
}

/** First-visit journey, revealed step by step on scroll. */
export const firstVisit = [
  {
    step: '01',
    title: 'Arrive',
    body: 'Come in a few minutes early. Someone from the team will meet you at reception.',
  },
  {
    step: '02',
    title: 'Register',
    body: 'We take your details, talk through the membership options and answer your questions.',
  },
  {
    step: '03',
    title: 'Meet Your Trainer',
    body: 'A short walkthrough of the floor, the equipment and how the studio runs.',
  },
  {
    step: '04',
    title: 'Understand Your Goal',
    body: 'A conversation about what you want from training, and what a realistic path there looks like.',
  },
  {
    step: '05',
    title: 'Start Training',
    body: 'Your first session, with a coach nearby while you find your footing.',
  },
]
