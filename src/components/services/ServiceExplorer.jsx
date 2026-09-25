import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

const fade = (reduce) => ({
  initial: reduce ? {} : { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: reduce ? {} : { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
})

/**
 * The service explorer: a list on the left, a large panel on the right that
 * crossfades as you move between programmes.
 *
 * Below `lg` this becomes a horizontal swipe deck instead of a list + panel —
 * a two-pane layout squeezed onto a phone serves nobody.
 */
export default function ServiceExplorer({ items }) {
  const [activeSlug, setActiveSlug] = useState(items[0].slug)
  const active = items.find((s) => s.slug === activeSlug) ?? items[0]
  const reduce = useReducedMotion()

  return (
    <>
      {/* ================= DESKTOP: list + panel ================= */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12">
        {/* ---- Programme list ---- */}
        <div className="lg:col-span-4">
          <ul className="border-t border-line">
            {items.map((service) => {
              const isActive = service.slug === activeSlug

              return (
                <li key={service.slug} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActiveSlug(service.slug)}
                    aria-current={isActive}
                    className="group relative flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="explorer-marker"
                        className="absolute top-0 -left-px h-full w-px bg-gold"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        aria-hidden="true"
                      />
                    )}

                    <span
                      className={`font-display text-lg font-bold tracking-[-0.02em] transition-colors duration-300 ${
                        isActive ? 'text-night' : 'text-muted group-hover:text-night'
                      }`}
                    >
                      {service.title}
                    </span>

                    <ArrowRight
                      className={`size-4 shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'translate-x-0 text-gold opacity-100'
                          : '-translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                      }`}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ---- Detail panel ---- */}
        <div className="lg:col-span-8">
          <div className="grid gap-8 xl:grid-cols-11">
            <div className="xl:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div key={active.slug} {...fade(reduce)}>
                  <SmartImage
                    src={active.image}
                    alt={active.alt}
                    aspect="aspect-[4/5]"
                    className="rounded-2xl"
                    sizes="(min-width: 1280px) 34vw, 45vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="xl:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div key={active.slug} {...fade(reduce)}>
                  <p className="eyebrow text-gold">{active.title}</p>

                  <h3 className="mt-4 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.025em] text-night">
                    {active.headline}
                  </h3>

                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{active.body}</p>

                  <div className="mt-7">
                    <p className="eyebrow mb-3.5 text-ink/50">Suitable for</p>
                    <ul className="space-y-2">
                      {active.forWhom.map((who) => (
                        <li key={who} className="flex items-start gap-2.5 text-[0.9375rem] text-ink/75">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                          {who}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 border-t border-line pt-7">
                    <p className="eyebrow mb-3.5 text-ink/50">What's included</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {active.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5 text-[0.875rem] text-ink/75">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-sage" strokeWidth={2.5} aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-7 rounded-xl bg-cream px-5 py-4 text-[0.875rem] leading-relaxed text-ink/70">
                    <span className="font-semibold text-night">How it works — </span>
                    {active.approach}
                  </p>

                  <Button to="/contact" variant="ink" size="md" arrow className="mt-7">
                    Talk To A Trainer
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE: horizontal swipe deck ================= */}
      <div className="lg:hidden">
        <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
          {items.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={Math.min(i, 3) * 0.06}
              className="w-[78vw] shrink-0 snap-center sm:w-[60vw]"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/50">
                <SmartImage
                  src={service.image}
                  alt={service.alt}
                  /* 4:5 matches the source crop exactly - no re-cropping, and
                     the photograph gets to lead the card. */
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 640px) 60vw, 78vw"
                />

                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-gold">{service.title}</p>

                  <h3 className="mt-3 font-display text-xl leading-tight font-bold tracking-[-0.02em] text-night">
                    {service.headline}
                  </h3>

                  <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{service.short}</p>

                  <ul className="mt-5 space-y-1.5">
                    {service.benefits.slice(0, 3).map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-[0.8125rem] text-ink/70">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-sage" strokeWidth={2.5} aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Button to="/contact" variant="outline" size="sm" arrow className="w-full">
                      Talk To A Trainer
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-4 text-center text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
          Swipe to explore
        </p>
      </div>
    </>
  )
}
