import { site, siteUrl, localeFull, addressLines } from '../data/site'
import { services } from '../data/services'
import { hasPublishedPricing, tiers } from '../data/membership'

const { city, area, state, pincode, street, geo } = site.location

export const absoluteUrl = (path = '/') => new URL(path, siteUrl).href

/**
 * Per-route metadata. Every page has a unique title, description and H1 —
 * duplicated metadata is one of the fastest ways to lose local rankings.
 */
export const pageMeta = {
  home: {
    path: '/',
    title: `${site.name} | Premium Gym & Fitness Studio in ${city}`,
    description: `${site.name} is a premium fitness studio opening soon in ${area}, ${city}, ${state}, offering personal training, strength training, cardio, HIIT and functional fitness with flexible membership options.`,
    h1: 'Build Your Stronger Self',
  },
  services: {
    path: '/services',
    title: `Fitness Programmes & Personal Training in ${city} | ${site.name}`,
    description: `Explore training at ${site.name} in ${area}, ${city} — strength training, personal training, cardio, HIIT, functional training, group fitness and mobility work.`,
    h1: 'Training Designed Around Your Goals',
  },
  membership: {
    path: '/membership',
    title: `Gym Membership Plans in ${city} | ${site.name}`,
    description: `Membership options at ${site.name}, ${area}, ${city} — Essential, Performance and Signature, with monthly, quarterly and yearly terms. Enquire for current pricing.`,
    h1: 'Choose Your Membership',
  },
  requirements: {
    path: '/requirements',
    title: `Gym Requirements, Equipment & First Visit Guide | ${site.name}`,
    description: `What to bring, the gym machines and equipment on the floor, and how your first visit works at ${site.name} in ${area}, ${city}, ${state}.`,
    h1: 'Everything You Need To Get Started',
  },
  contact: {
    path: '/contact',
    title: `Contact ${site.name} | Gym in ${area}, ${city}, ${state}`,
    description: `Get in touch with ${site.name} in ${area}, ${city}. Call ${site.contact.phoneDisplay}, message us on WhatsApp, or send an enquiry to book your first session.`,
    h1: 'Ready To Start?',
  },
}

/* ============================================================
   STRUCTURED DATA
   Only verified facts. No ratings, reviews, awards, member
   counts or opening hours are emitted until they are supplied.
   ============================================================ */

const postalAddress = {
  '@type': 'PostalAddress',
  ...(street ? { streetAddress: street } : {}),
  addressLocality: area,
  addressRegion: state,
  postalCode: pincode,
  addressCountry: site.location.countryCode,
}

const sameAs = Object.values(site.social).filter(Boolean)

/** Derives "₹min-₹max" from whatever monthly prices are actually set. */
function priceRangeFromTiers() {
  const monthly = tiers.map((t) => t.prices.monthly).filter((v) => typeof v === 'number')
  if (!monthly.length) return undefined
  const min = Math.min(...monthly)
  const max = Math.max(...monthly)
  return min === max ? `₹${min}` : `₹${min}-₹${max}`
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': `${siteUrl}/#studio`,
    name: site.name,
    description: site.description,
    url: siteUrl,
    logo: absoluteUrl('/images/xavion-fitness-studio-logo.png'),
    image: absoluteUrl('/images/premium-gym-erode-wide.webp'),
    telephone: site.contact.phone,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    address: postalAddress,
    ...(geo ? { geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng } } : {}),
    areaServed: [
      { '@type': 'City', name: city },
      { '@type': 'AdministrativeArea', name: `${site.location.district} District` },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    // openingHoursSpecification is omitted until hours are confirmed.
    ...(site.hours
      ? {
          openingHoursSpecification: site.hours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.open,
            closes: h.close,
          })),
        }
      : {}),
    // priceRange appears only once real prices exist in data/membership.js.
    ...(hasPublishedPricing ? { priceRange: priceRangeFromTiers() } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Training Programmes',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.short },
      })),
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    description: site.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${siteUrl}/#studio` },
  }
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * GEO / AI-search answers. Written as direct question-and-answer pairs so
 * an assistant can quote them verbatim without inferring anything.
 * Every answer is grounded in src/data — nothing here is speculative.
 */
export const faqs = [
  {
    q: `Where is ${site.name} located?`,
    a: `${site.name} is located in ${addressLines.join(', ')}, ${site.location.country}.`,
  },
  {
    q: `Is ${site.name} open yet?`,
    a: `${site.name} is in its pre-launch phase and opening soon in ${area}, ${city}. Enquiries about founding memberships are open now on ${site.contact.phoneDisplay}.`,
  },
  {
    q: `Does ${site.name} offer personal training?`,
    a: `Yes. ${site.name} offers one-to-one personal training with individual programme design, session-by-session coaching and regular progress reviews. It is included in the Signature membership and available alongside other tiers.`,
  },
  {
    q: `What services does ${site.name} offer?`,
    a: `${site.name} offers ${services
      .map((s) => s.title.toLowerCase())
      .join(', ')
      .replace(/,([^,]*)$/, ' and$1')}.`,
  },
  {
    q: `What membership plans does ${site.name} offer?`,
    a: `Three tiers: Essential for regular gym training, Performance for training with trainer guidance and progress tracking, and Signature for one-to-one personal training. Monthly, quarterly and yearly terms are available. Contact the studio for current pricing.`,
  },
  {
    q: `What do I need to bring to ${site.name}?`,
    a: `Bring a water bottle, workout clothes, clean indoor training shoes, a personal towel, and any registration or ID details requested when you sign up.`,
  },
  {
    q: `How do I contact ${site.name}?`,
    a: `Call ${site.contact.phoneDisplay} or message ${site.contact.whatsappDisplay} on WhatsApp. You can also send an enquiry through the contact form on the website.`,
  },
]
