/**
 * Membership tiers for Xavion Fitness Studio.
 *
 * ⚠️  PRICING — every `price` below is intentionally `null`, which renders
 * "Contact for pricing" in the UI. No figure on this website is invented.
 *
 * To publish real prices, fill the numbers in as plain rupees:
 *
 *   prices: { monthly: 1500, quarterly: 4000, yearly: 14000 }
 *
 * The per-month equivalent and the "save X%" badge are calculated
 * automatically from those numbers — do not hand-write them.
 */

export const billingPeriods = [
  { id: 'monthly', label: 'Monthly', months: 1 },
  { id: 'quarterly', label: 'Quarterly', months: 3 },
  { id: 'yearly', label: 'Yearly', months: 12 },
]

export const tiers = [
  {
    id: 'essential',
    name: 'Essential',
    flag: null,
    summary: 'For regular gym training.',
    blurb: 'Full access to the floor and the equipment, with guidance on hand when you need it.',
    prices: { monthly: null, quarterly: null, yearly: null },
    includes: ['Gym access', 'Standard equipment', 'General guidance'],
    cta: 'Choose Essential',
  },
  {
    id: 'performance',
    name: 'Performance',
    flag: 'Most Popular',
    summary: 'For training with structure and support.',
    blurb: 'Everything in Essential, plus trainer guidance, tracked progress and selected group sessions.',
    prices: { monthly: null, quarterly: null, yearly: null },
    includes: ['Full gym access', 'Trainer guidance', 'Progress tracking', 'Selected group sessions'],
    cta: 'Choose Performance',
  },
  {
    id: 'signature',
    name: 'Signature',
    flag: 'Premium',
    summary: 'For one-to-one coaching.',
    blurb: 'Personal training, a full fitness assessment and priority support from the team.',
    prices: { monthly: null, quarterly: null, yearly: null },
    includes: ['Personal training', 'Fitness assessment', 'Progress tracking', 'Premium support'],
    cta: 'Choose Signature',
  },
]

/** Comparison matrix. `true` → included, `false` → not included. */
export const comparison = [
  { feature: 'Gym Access', essential: true, performance: true, signature: true },
  { feature: 'Trainer Guidance', essential: true, performance: true, signature: true },
  { feature: 'Progress Tracking', essential: false, performance: true, signature: true },
  { feature: 'Group Classes', essential: false, performance: true, signature: true },
  { feature: 'Fitness Assessment', essential: false, performance: true, signature: true },
  { feature: 'Personal Training', essential: false, performance: false, signature: true },
]

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/**
 * Resolves what to display for a tier at a billing period.
 * Returns `{ available: false }` whenever a price is not set, so the UI
 * can show "Contact for pricing" rather than a placeholder number.
 */
export function resolvePrice(tier, periodId) {
  const period = billingPeriods.find((p) => p.id === periodId)
  const amount = tier.prices?.[periodId]

  if (typeof amount !== 'number' || !period) return { available: false }

  const perMonth = amount / period.months
  const monthly = tier.prices.monthly

  // Savings are derived, never asserted by hand.
  const savings =
    typeof monthly === 'number' && period.months > 1
      ? Math.round((1 - perMonth / monthly) * 100)
      : 0

  return {
    available: true,
    display: inr.format(amount),
    perMonth: period.months > 1 ? inr.format(Math.round(perMonth)) : null,
    periodLabel: period.months === 1 ? '/month' : `/${period.months} months`,
    savings: savings > 0 ? savings : null,
  }
}

/** True once at least one real price exists — gates priceRange in JSON-LD. */
export const hasPublishedPricing = tiers.some((t) =>
  Object.values(t.prices).some((v) => typeof v === 'number'),
)
