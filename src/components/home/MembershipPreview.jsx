import { Link } from 'react-router-dom'
import { Check, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { tiers } from '../../data/membership'

/**
 * Membership preview. Deliberately lighter than the /membership page — it
 * answers "what are my options and roughly what do they include", then hands
 * off. Repeating the full pricing table here would just delay the decision.
 */
export default function MembershipPreview() {
  return (
    <section className="bg-ivory">
      <div className="shell section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Membership"
            title="Choose your level."
            lead="Three memberships, built around how much guidance and structure you want alongside your training."
            maxWidth="max-w-xl"
          />

          <Reveal delay={0.1}>
            <Button to="/membership" variant="outline" size="md" arrow>
              Compare memberships
            </Button>
          </Reveal>
        </div>

        <div className="section-gap grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const featured = tier.id === 'performance'

            return (
              <Reveal key={tier.id} delay={i * 0.09} className="h-full">
                <Link
                  to="/membership"
                  className={`group flex h-full flex-col rounded-2xl p-7 transition-all duration-500
                              ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
                                featured
                                  ? 'bg-olive text-ivory hover:shadow-[var(--shadow-lift)]'
                                  : 'border border-line bg-white/60 hover:border-gold/40 hover:bg-white hover:shadow-[var(--shadow-soft)]'
                              }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className={`font-display text-[0.8125rem] font-bold tracking-[0.2em] uppercase ${
                        featured ? 'text-gold-soft' : 'text-olive'
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

                  <p
                    className={`mt-6 font-display text-xl leading-snug font-bold tracking-[-0.02em] ${
                      featured ? 'text-ivory' : 'text-night'
                    }`}
                  >
                    {tier.summary}
                  </p>

                  <p className={`mt-3 text-[0.9375rem] leading-relaxed ${featured ? 'text-ivory/60' : 'text-muted'}`}>
                    {tier.blurb}
                  </p>

                  <ul className={`mt-7 space-y-2.5 border-t pt-6 ${featured ? 'border-ivory/15' : 'border-line'}`}>
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className={`mt-0.5 size-3.5 shrink-0 ${featured ? 'text-gold-soft' : 'text-sage'}`}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        <span className={`text-[0.875rem] ${featured ? 'text-ivory/75' : 'text-ink/75'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <span
                    className={`mt-auto flex items-center gap-1.5 pt-8 text-[0.8125rem] font-medium transition-colors duration-300 ${
                      featured ? 'text-gold-soft' : 'text-ink/60 group-hover:text-gold'
                    }`}
                  >
                    View details
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
