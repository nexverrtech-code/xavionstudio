import { motion, useReducedMotion } from 'framer-motion'
import { goals } from '../../data/goals'

/**
 * "Focus your goal" selector.
 *
 * Implemented as a real radio group so it is keyboard-operable with arrow keys
 * and announced correctly by screen readers — a row of divs would have looked
 * the same and worked for nobody.
 *
 * Nothing here moves on its own. The pills arrive once with the rest of the
 * hero and then hold; the photograph only changes when somebody chooses.
 */
export default function GoalSelector({ active, onChange, started = true, baseDelay = 0 }) {
  const reduce = useReducedMotion()

  const handleKey = (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    const step = keys[e.key]
    if (!step) return

    e.preventDefault()
    const index = goals.findIndex((g) => g.id === active)
    const next = goals[(index + step + goals.length) % goals.length]
    onChange(next.id)
  }

  const enter = (i) => ({
    initial: reduce ? {} : { opacity: 0, y: 12 },
    animate: started ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.5, delay: baseDelay + i * 0.06, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <div>
      <motion.p
        initial={reduce ? {} : { opacity: 0 }}
        animate={started ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: baseDelay }}
        className="eyebrow mb-4 text-ivory/45"
        id="goal-selector-label"
      >
        What are you training for?
      </motion.p>

      <div
        role="radiogroup"
        aria-labelledby="goal-selector-label"
        onKeyDown={handleKey}
        className="flex flex-wrap gap-2.5"
      >
        {goals.map((goal, i) => {
          const isActive = goal.id === active

          return (
            <motion.button
              key={goal.id}
              {...enter(i)}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(goal.id)}
              className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-[0.75rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
                isActive
                  ? 'text-night'
                  : 'border border-ivory/20 text-ivory/65 hover:border-ivory/45 hover:text-ivory'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="goal-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              )}

              {/*
                Highlight sweeping across an inactive pill on hover. Parked at
                105%, not 100%: at exactly 100% sub-pixel rounding left a 1px
                sliver showing at the pill's left edge.
              */}
              {!isActive && !reduce && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-[105%] bg-gradient-to-r
                             from-transparent via-ivory/12 to-transparent transition-transform
                             duration-700 ease-out group-hover:translate-x-[105%]"
                />
              )}

              <span className="relative">{goal.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
