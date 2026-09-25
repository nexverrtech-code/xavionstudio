/**
 * ============================================================
 * XAVION FITNESS STUDIO — SINGLE SOURCE OF TRUTH
 * ============================================================
 * Every business fact on the website reads from this file.
 * Nothing here is invented. Fields that have not been verified
 * are `null` and the UI degrades gracefully around them.
 *
 * ⚠️  STILL TO CONFIRM (search this file for "CONFIRM"):
 *   1. siteUrl        — the live domain
 *   2. street         — full street address for Google Maps + JSON-LD
 *   3. geo            — latitude / longitude
 *   4. email          — enquiry email address
 *   5. hours          — opening hours (announced at launch)
 *   6. social.instagram — full profile URL
 *   7. launchDate     — public opening date, if fixed
 * ============================================================
 */

// CONFIRM — replace with the live domain once registered.
export const siteUrl = 'https://xavionfitnessstudio.com'

export const site = {
  name: 'Xavion Fitness Studio',
  shortName: 'Xavion',
  legalName: 'Xavion Fitness Studio',

  /** Pre-launch. Drives "Opening Soon" language site-wide. */
  isPreLaunch: true,
  /** CONFIRM — set e.g. 'November 2026' to show a specific date. */
  launchDate: null,

  tagline: 'Build Your Stronger Self',
  description:
    'Xavion Fitness Studio is a premium fitness and personal training studio opening soon in Thindal, Erode, Tamil Nadu.',

  location: {
    area: 'Thindal',
    city: 'Erode',
    district: 'Erode',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'IN',
    pincode: '638012',
    /** CONFIRM — full street address. Kept null so no address is invented. */
    street: null,
    /** CONFIRM — verified coordinates. Kept null so no pin is guessed. */
    geo: null, // { lat: 0, lng: 0 }
  },

  contact: {
    /** Primary enquiry line. */
    phone: '+916383214545',
    phoneDisplay: '+91 63832 14545',
    /** WhatsApp enquiries. */
    whatsapp: '918870065354',
    whatsappDisplay: '+91 88700 65354',
    /** CONFIRM — enquiry email. Null hides the email row entirely. */
    email: null,
  },

  /** CONFIRM — announced at launch. Null renders a graceful placeholder. */
  hours: null,
  // Example shape once confirmed:
  // hours: [
  //   { days: 'Monday – Saturday', open: '05:30', close: '22:30' },
  //   { days: 'Sunday', open: '06:00', close: '12:00' },
  // ],

  social: {
    /** CONFIRM — paste the full Instagram profile URL. */
    instagram: null,
    facebook: null,
    youtube: null,
  },
}

/** Pre-filled WhatsApp enquiry link. */
export const whatsappLink = (message = "Hi Xavion Fitness Studio, I'd like to know more about memberships.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`

export const telLink = `tel:${site.contact.phone}`

/** "Thindal, Erode" — used in copy where the short form reads better. */
export const localeShort = `${site.location.area}, ${site.location.city}`

/** "Thindal, Erode, Tamil Nadu" — used in metadata and formal copy. */
export const localeFull = `${site.location.area}, ${site.location.city}, ${site.location.state}`

/**
 * Human-readable address lines. Only renders what is verified —
 * the street line simply does not appear until it is supplied.
 */
export const addressLines = [
  site.location.street,
  `${site.location.area}, ${site.location.city}`,
  `${site.location.state} ${site.location.pincode}`,
].filter(Boolean)

/**
 * Google Maps directions URL. Without a verified street address this
 * points at the area rather than dropping a pin on a guessed building.
 */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  [site.name, site.location.street, localeFull, site.location.pincode].filter(Boolean).join(', '),
)}`

/** Nav — deliberately free of SEO keywords. Reads like a luxury brand. */
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Membership', to: '/membership' },
  { label: 'Requirements', to: '/requirements' },
  { label: 'Contact', to: '/contact' },
]
