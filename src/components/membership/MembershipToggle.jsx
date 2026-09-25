import { motion } from 'framer-motion'
import { billingPeriods } from '../../data/membership'

/**
 * Billing-term switch. A radio group again rather than styled divs, so arrow
 * keys work and the current term is announced.
 */
export default function MembershipToggle({ active, onChange }) {
  const handleKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!step) return

    e.preventDefault()
    const index = billingPeriods.findIndex((p) => p.id === active)
    onChange(billingPeriods[(index + step + billingPeriods.length) % billingPeriods.length].id)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Billing term"
      onKeyDown={handleKey}
      className="inline-flex rounded-full border border-line bg-white/70 p-1"
    >
      {billingPeriods.map((period) => {
        const isActive = period.id === active

        return (
          <button
            key={period.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(period.id)}
            className={`relative rounded-full px-5 py-2 text-[0.75rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 sm:px-7 ${
              isActive ? 'text-night' : 'text-muted hover:text-ink'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-full bg-cream"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                aria-hidden="true"
              />
            )}
            <span className="relative">{period.label}</span>
          </button>
        )
      })}
    </div>
  )
}
