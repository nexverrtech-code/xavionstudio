import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Info } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import ServiceIcon from '../ui/ServiceIcon'
import { equipmentZones, equipmentConfirmed, equipmentCount } from '../../data/equipment'

/**
 * Essential gym machine requirements, grouped by floor zone.
 *
 * Tabbed rather than four stacked lists: 32 equipment lines shown at once is a
 * wall of text nobody reads, while one zone at a time is scannable and lets
 * people jump to the part they care about.
 *
 * Until `equipmentConfirmed` is true the section says openly that the
 * specification is being finalised — see the banner in data/equipment.js.
 */
export default function EquipmentRequirements() {
  const [activeId, setActiveId] = useState(equipmentZones[0].id)
  const active = equipmentZones.find((z) => z.id === activeId) ?? equipmentZones[0]
  const reduce = useReducedMotion()

  const handleKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!step) return

    e.preventDefault()
    const i = equipmentZones.findIndex((z) => z.id === activeId)
    const next = equipmentZones[(i + step + equipmentZones.length) % equipmentZones.length]
    setActiveId(next.id)
    document.getElementById(`zone-tab-${next.id}`)?.focus()
  }

  return (
    <section className="relative overflow-hidden bg-night" id="equipment">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative shell section-y">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Equipment"
            title={
              equipmentConfirmed ? 'Essential gym machines.' : 'Essential gym machines, planned.'
            }
            lead={
              equipmentConfirmed
                ? `${equipmentCount} machines and training tools across four zones, so every programme has the equipment it needs.`
                : `${equipmentCount} machines and training tools across four zones. The final floor specification is being confirmed ahead of opening.`
            }
            tone="light"
            maxWidth="max-w-xl"
          />

          <Reveal delay={0.1}>
            <p className="font-display text-[0.8125rem] font-bold tracking-[0.18em] text-gold uppercase">
              {equipmentZones.length} zones · {equipmentCount} items
            </p>
          </Reveal>
        </div>

        {/* ---- Zone tabs ---- */}
        <div className="mt-10 lg:mt-12">
          <div
            role="tablist"
            aria-label="Equipment zones"
            onKeyDown={handleKey}
            className="scrollbar-none -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {equipmentZones.map((zone) => {
              const isActive = zone.id === activeId

              return (
                <button
                  key={zone.id}
                  id={`zone-tab-${zone.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={isActive ? `zone-panel-${zone.id}` : undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(zone.id)}
                  className={`relative flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 text-[0.8125rem] font-semibold tracking-[0.02em] transition-colors duration-300 ${
                    isActive
                      ? 'text-night'
                      : 'border border-ivory/18 text-ivory/65 hover:border-ivory/40 hover:text-ivory'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="equipment-tab"
                      className="absolute inset-0 rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative flex items-center gap-2.5">
                    <ServiceIcon name={zone.icon} className="size-4" />
                    {zone.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ---- Active zone ---- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`zone-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`zone-tab-${active.id}`}
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ivory/55">{active.lead}</p>

              <ul className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
                {active.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={reduce ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 9) * 0.03 }}
                    className="group flex items-baseline justify-between gap-4 bg-night px-5 py-4 transition-colors duration-300 hover:bg-charcoal"
                  >
                    <span className="text-[0.9375rem] font-medium text-ivory">{item.name}</span>
                    <span className="shrink-0 text-right text-[0.75rem] text-ivory/40">{item.trains}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---- Stated openly rather than quietly omitted ---- */}
        {!equipmentConfirmed && (
          <Reveal delay={0.2}>
            <div className="mt-10 flex gap-4 rounded-2xl border border-gold/25 bg-gold/8 p-5 sm:p-6">
              <Info className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
              <p className="text-[0.9375rem] leading-relaxed text-ivory/70">
                <span className="font-semibold text-ivory">Equipment list in progress. </span>
                The studio is being fitted out and the final machine list is still being confirmed. Call us
                and we will tell you exactly what is going on the floor — we would rather do that than
                publish a specification that changes.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
