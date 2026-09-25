import { motion, useReducedMotion } from 'framer-motion'
import { firstVisit } from '../../data/requirements'

/**
 * First-visit journey. Each step reveals as it scrolls into view, and the
 * connecting line draws itself alongside them.
 *
 * Rendered as an ordered list, because it is one — the sequence carries
 * meaning and should survive being read out or viewed without CSS.
 */
export default function FirstVisitTimeline() {
  const reduce = useReducedMotion()

  return (
    <ol className="relative">
      {/* Connecting rail — vertical on mobile, horizontal from lg up. */}
      <span
        className="absolute top-5 left-[1.4375rem] hidden h-[calc(100%-2.5rem)] w-px bg-ivory/12 sm:block lg:top-[1.4375rem] lg:left-0 lg:h-px lg:w-full"
        aria-hidden="true"
      />

      <div className="grid gap-10 sm:gap-0 lg:grid-cols-5 lg:gap-6">
        {firstVisit.map((item, i) => (
          <motion.li
            key={item.step}
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-6 sm:pb-10 lg:block lg:pb-0"
          >
            <span
              className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full
                         border border-gold/35 bg-night font-display text-[0.8125rem] font-bold tracking-[0.06em] text-gold"
            >
              {item.step}
            </span>

            <div className="lg:mt-7">
              <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-ivory">
                {item.title}
              </h3>
              <p className="mt-2.5 max-w-xs text-[0.9375rem] leading-relaxed text-ivory/55">{item.body}</p>
            </div>
          </motion.li>
        ))}
      </div>
    </ol>
  )
}
