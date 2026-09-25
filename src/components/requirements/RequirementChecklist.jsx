import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Backpack, ClipboardCheck, Handshake, Plus, Check } from 'lucide-react'
import Reveal from '../ui/Reveal'

const icons = { Backpack, ClipboardCheck, Handshake }

const STORAGE_KEY = 'xavion:checked-requirements'

/**
 * Reads the visitor's ticked items. Storage can be unavailable (private
 * windows, blocked site data), so every access is guarded — the checklist
 * must work identically when this returns nothing.
 */
function loadTicked() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function ChecklistItems({ list, ticked, onToggle }) {
  return (
    <ul className="space-y-1">
      {list.items.map((item) => {
        const key = `${list.id}:${item.label}`
        const isTicked = ticked.has(key)

        return (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => onToggle(key)}
              aria-pressed={isTicked}
              className="group flex w-full items-start gap-4 rounded-xl px-3 py-3.5 text-left transition-colors duration-300 hover:bg-cream/70"
            >
              <span
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${
                  isTicked
                    ? 'border-olive bg-olive text-ivory'
                    : 'border-line bg-white/80 text-transparent group-hover:border-gold'
                }`}
              >
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>

              <span className="flex-1">
                <span
                  className={`block text-[0.9375rem] font-medium transition-colors duration-300 ${
                    isTicked ? 'text-muted line-through decoration-muted/40' : 'text-night'
                  }`}
                >
                  {item.label}
                </span>
                {item.note && (
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted">{item.note}</span>
                )}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Requirement checklists. Items can be ticked off — genuinely useful when
 * you are packing a bag — and the state is remembered per browser.
 *
 * Below `lg` the sections collapse into an accordion so the page stays short
 * on a phone; from `lg` up all three sit open side by side.
 */
export default function RequirementChecklist({ lists }) {
  const [ticked, setTicked] = useState(() => new Set())
  const [openId, setOpenId] = useState(lists[0].id)
  const reduce = useReducedMotion()

  // Hydration-safe: read storage after mount, never during render.
  useEffect(() => setTicked(loadTicked()), [])

  const toggle = (key) => {
    setTicked((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // Storage unavailable — the tick still works for this session.
      }
      return next
    })
  }

  return (
    <>
      {/* ================= DESKTOP: three open columns ================= */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {lists.map((list, i) => {
          const Icon = icons[list.icon] ?? ClipboardCheck

          return (
            <Reveal key={list.id} delay={i * 0.1} className="h-full">
              <section
                aria-labelledby={`${list.id}-heading`}
                className="flex h-full flex-col rounded-2xl border border-line bg-white/60 p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-cream text-olive">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>

                <h3
                  id={`${list.id}-heading`}
                  className="mt-6 font-display text-[1.1875rem] font-bold tracking-[-0.02em] text-night"
                >
                  {list.title}
                </h3>

                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-muted">{list.lead}</p>

                <div className="mt-5 border-t border-line pt-3">
                  <ChecklistItems list={list} ticked={ticked} onToggle={toggle} />
                </div>
              </section>
            </Reveal>
          )
        })}
      </div>

      {/* ================= MOBILE: accordion ================= */}
      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white/60 lg:hidden">
        {lists.map((list) => {
          const Icon = icons[list.icon] ?? ClipboardCheck
          const isOpen = openId === list.id

          return (
            <section key={list.id}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : list.id)}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? `${list.id}-panel` : undefined}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cream text-olive">
                    <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>

                  <span className="flex-1 font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-night">
                    {list.title}
                  </span>

                  <Plus
                    className={`size-4 shrink-0 text-muted transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'rotate-45 text-gold' : ''
                    }`}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${list.id}-panel`}
                    initial={reduce ? {} : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? {} : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="mb-3 text-[0.875rem] leading-relaxed text-muted">{list.lead}</p>
                      <ChecklistItems list={list} ticked={ticked} onToggle={toggle} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )
        })}
      </div>
    </>
  )
}
