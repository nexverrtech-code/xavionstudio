import { Check, Minus } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { comparison, tiers } from '../../data/membership'

function Mark({ included, label }) {
  return included ? (
    <>
      <Check className="mx-auto size-4 text-sage" strokeWidth={2.5} aria-hidden="true" />
      <span className="sr-only">{label} — included</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto size-4 text-muted/35" strokeWidth={2} aria-hidden="true" />
      <span className="sr-only">{label} — not included</span>
    </>
  )
}

/**
 * Comparison matrix. Rendered as a real <table> with scoped headers so the
 * relationship between a feature and a tier survives a screen reader, then
 * restyled as stacked cards below `sm` where a six-column table would not fit.
 */
export default function MembershipComparison() {
  return (
    <>
      {/* ---- Table (sm and up) ---- */}
      <Reveal className="hidden sm:block">
        <div className="overflow-hidden rounded-2xl border border-line bg-white/60">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Membership features compared across the Essential, Performance and Signature tiers
            </caption>

            <thead>
              <tr className="border-b border-line bg-cream/60">
                <th scope="col" className="px-6 py-5 text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">
                  Feature
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    scope="col"
                    className={`px-4 py-5 text-center text-[0.75rem] font-semibold tracking-[0.14em] uppercase ${
                      tier.id === 'performance' ? 'text-gold' : 'text-olive'
                    }`}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparison.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-line/60 last:border-0 transition-colors duration-200 hover:bg-cream/40 ${
                    i % 2 ? 'bg-transparent' : 'bg-ivory/40'
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-[0.9375rem] font-medium text-ink/85"
                  >
                    {row.feature}
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-4 py-4 text-center">
                      <Mark included={row[tier.id]} label={`${tier.name}: ${row.feature}`} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* ---- Stacked cards (below sm) ---- */}
      <div className="space-y-4 sm:hidden">
        {tiers.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 0.08}>
            <div className="rounded-2xl border border-line bg-white/60 p-6">
              <h3
                className={`font-display text-[0.8125rem] font-bold tracking-[0.2em] uppercase ${
                  tier.id === 'performance' ? 'text-gold' : 'text-olive'
                }`}
              >
                {tier.name}
              </h3>

              <ul className="mt-5 space-y-3">
                {comparison.map((row) => (
                  <li key={row.feature} className="flex items-center justify-between gap-4">
                    <span
                      className={`text-[0.9375rem] ${row[tier.id] ? 'text-ink/85' : 'text-muted/60 line-through decoration-muted/30'}`}
                    >
                      {row.feature}
                    </span>
                    <Mark included={row[tier.id]} label={`${tier.name}: ${row.feature}`} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  )
}
