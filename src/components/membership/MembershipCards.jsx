import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { tiers, resolvePrice } from '../../data/membership'

/**
 * The three membership tiers. Performance is visually elevated because it is
 * the tier most members land on — not because of a gimmick.
 *
 * Where a price has not been published, the card shows "Contact for pricing".
 * No placeholder number is ever displayed as though it were real.
 */
export default function MembershipCards({ period, onEnquire }) {
  const reduce = useReducedMotion()

  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {tiers.map((tier, i) => {
        const featured = tier.id === 'performance'
        const price = resolvePrice(tier, period)

        return (
          <Reveal
            key={tier.id}
            delay={i * 0.09}
            className={`h-full ${featured ? 'lg:-mt-4 lg:-mb-4' : ''}`}
          >
            <article
              className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-7 transition-shadow duration-500 lg:p-8 ${
                featured
                  ? 'bg-night text-ivory shadow-[var(--shadow-lift)]'
                  : 'border border-line bg-white/60 text-ink hover:shadow-[var(--shadow-soft)]'
              }`}
            >
              {featured && <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />}

              <div className="relative flex-1">
                {/* ---- Header ---- */}
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`font-display text-[0.8125rem] font-bold tracking-[0.2em] uppercase ${
                      featured ? 'text-gold' : 'text-olive'
                    }`}
                  >
                    {tier.name}
                  </h3>

                  {tier.flag && (
                    <span
                      className={`rounded-full px-3 py-1 text-[0.625rem] font-semibold tracking-[0.14em] uppercase ${
                        featured ? 'bg-gold text-night' : 'border border-line text-muted'
                      }`}
                    >
                      {tier.flag}
                    </span>
                  )}
                </div>

                <p className={`mt-5 text-[0.9375rem] ${featured ? 'text-ivory/60' : 'text-muted'}`}>
                  {tier.summary}
                </p>

                {/* ---- Price ---- */}
                <div className="mt-7 min-h-[4.75rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${tier.id}-${period}`}
                      initial={reduce ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? {} : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {price.available ? (
                        <>
                          <div className="flex items-baseline gap-1.5">
                            <span
                              className={`font-display text-[2.5rem] leading-none font-extrabold tracking-[-0.035em] ${
                                featured ? 'text-ivory' : 'text-night'
                              }`}
                            >
                              {price.display}
                            </span>
                            <span className={`text-[0.8125rem] ${featured ? 'text-ivory/50' : 'text-muted'}`}>
                              {price.periodLabel}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {price.perMonth && (
                              <span className={`text-[0.8125rem] ${featured ? 'text-ivory/50' : 'text-muted'}`}>
                                {price.perMonth} per month
                              </span>
                            )}
                            {price.savings && (
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase ${
                                  featured ? 'bg-sage/20 text-sage' : 'bg-sage/25 text-olive'
                                }`}
                              >
                                Save {price.savings}%
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <p
                            className={`font-display text-[1.375rem] leading-tight font-bold tracking-[-0.02em] ${
                              featured ? 'text-ivory' : 'text-night'
                            }`}
                          >
                            Contact for pricing
                          </p>
                          <p className={`mt-2 text-[0.8125rem] ${featured ? 'text-ivory/45' : 'text-muted'}`}>
                            Founding-member rates shared on enquiry.
                          </p>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ---- Inclusions ---- */}
                <div
                  className={`mt-7 border-t pt-7 ${featured ? 'border-ivory/12' : 'border-line'}`}
                >
                  <p className={`eyebrow mb-4 ${featured ? 'text-ivory/40' : 'text-ink/45'}`}>Includes</p>

                  <ul className="space-y-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${featured ? 'text-gold' : 'text-sage'}`}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        <span className={`text-[0.9375rem] ${featured ? 'text-ivory/75' : 'text-ink/80'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ---- CTA ---- */}
              <div className="relative mt-9">
                <Button
                  variant={featured ? 'gold' : 'outline'}
                  size="md"
                  arrow
                  className="w-full"
                  onClick={() => onEnquire?.(tier)}
                >
                  {tier.cta}
                </Button>
              </div>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
