import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

/**
 * Question-and-answer block.
 *
 * Written so an AI assistant can lift an answer verbatim: each question is
 * phrased the way somebody would actually ask it, and each answer is a
 * complete, self-contained statement that does not depend on the one above it.
 * The same pairs feed the FAQPage structured data on the page that renders this.
 *
 * Answers stay in the DOM whether the panel is open or not, so crawlers that
 * do not click anything still read the full text.
 */
export default function FAQ({
  faqs,
  eyebrow = 'Questions',
  title = 'Straight answers.',
  lead,
  tone = 'dark',
  className = '',
}) {
  const [openIndex, setOpenIndex] = useState(0)
  const reduce = useReducedMotion()
  const light = tone === 'light'

  return (
    <section className={`${light ? 'bg-night' : 'bg-ivory'} ${className}`}>
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={eyebrow} title={title} lead={lead} tone={light ? 'light' : 'dark'} />
          </div>

          <div className="lg:col-span-8">
            <dl className={`border-t ${light ? 'border-ivory/12' : 'border-line'}`}>
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i
                const panelId = `faq-panel-${i}`

                return (
                  <Reveal key={faq.q} delay={Math.min(i, 5) * 0.05}>
                    <div className={`border-b ${light ? 'border-ivory/12' : 'border-line'}`}>
                      <dt>
                        <button
                          type="button"
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          // Only referenced while the panel exists — a dangling
                          // aria-controls is worse than none at all.
                          aria-controls={isOpen ? panelId : undefined}
                          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                        >
                          <span
                            className={`font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.015em] transition-colors duration-300 sm:text-[1.125rem] ${
                              light
                                ? isOpen
                                  ? 'text-gold'
                                  : 'text-ivory group-hover:text-gold'
                                : isOpen
                                  ? 'text-night'
                                  : 'text-ink/85 group-hover:text-night'
                            }`}
                          >
                            {faq.q}
                          </span>

                          <Plus
                            className={`mt-1 size-4 shrink-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isOpen ? 'rotate-45 text-gold' : light ? 'text-ivory/40' : 'text-muted'
                            }`}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </button>
                      </dt>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.dd
                            id={panelId}
                            initial={reduce ? {} : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduce ? {} : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p
                              className={`max-w-2xl pb-7 text-[0.9375rem] leading-relaxed ${
                                light ? 'text-ivory/60' : 'text-muted'
                              }`}
                            >
                              {faq.a}
                            </p>
                          </motion.dd>
                        )}
                      </AnimatePresence>

                      {/*
                        Kept in the DOM so crawlers read every answer without
                        clicking. aria-hidden because a screen reader should not
                        announce the text of a panel the button reports as
                        collapsed — the expandable panel above is the a11y path.
                      */}
                      {!isOpen && (
                        <dd className="sr-only" aria-hidden="true">
                          {faq.a}
                        </dd>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
