import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Info, Search, X, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import ServiceIcon from '../ui/ServiceIcon'
import Reveal from '../ui/Reveal'
import { useLockBodyScroll } from '../../hooks/useScrollAnimation'
import {
  equipmentZones,
  equipmentImages,
  equipmentConfirmed,
  equipmentCount,
  allEquipment,
} from '../../data/equipment'

const EASE = [0.22, 1, 0.36, 1]

/**
 * ============================================================
 * EQUIPMENT EXPLORER
 * ============================================================
 * The richest interface on the site, and deliberately the only one:
 *
 *  • zone tabs, plus a search that spans every zone at once
 *  • a thumbnail grid — each machine carries its own photograph
 *  • clicking one opens a detail dialog with the full image, what it is,
 *    and what it gets you
 *  • the thumbnail and the dialog image share a `layoutId`, so the picture
 *    physically travels between the two rather than cross-fading
 *  • arrow keys walk between machines while the dialog is open, so you can
 *    read the whole zone without closing it
 *
 * Accessibility is not traded away for the animation: the dialog is a real
 * `role="dialog"`, focus moves into it and is restored on close, Escape
 * closes it, Tab is trapped inside it, and the page behind it cannot scroll.
 * ============================================================
 */
export default function EquipmentExplorer() {
  const [zoneId, setZoneId] = useState(equipmentZones[0].id)
  const [query, setQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(null)
  const reduce = useReducedMotion()
  const searchId = useId()

  /* The portal target only exists in the browser; prerender has no document. */
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const zone = equipmentZones.find((z) => z.id === zoneId) ?? equipmentZones[0]
  const searching = query.trim().length > 0

  /** Searching looks across every zone; otherwise it is the active zone. */
  const list = useMemo(() => {
    if (!searching) return zone.items.map((item) => ({ ...item, zoneTitle: zone.title }))
    const q = query.trim().toLowerCase()
    return allEquipment.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.trains.toLowerCase().includes(q) ||
        item.zoneTitle.toLowerCase().includes(q),
    )
  }, [searching, query, zone])

  const open = openIndex !== null ? list[openIndex] : null
  useLockBodyScroll(Boolean(open))

  /* Close the dialog if the list changes out from under it. */
  useEffect(() => setOpenIndex(null), [zoneId, query])

  /* ---- Dialog: focus, Escape, arrow keys, focus trap ---- */
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const node = dialogRef.current
    node?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpenIndex(null)
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setOpenIndex((i) => {
          const step = e.key === 'ArrowRight' ? 1 : -1
          return (i + step + list.length) % list.length
        })
        return
      }

      // Keep Tab inside the dialog while it is up.
      if (e.key === 'Tab' && node) {
        const focusable = node.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, list.length])

  /* Return focus to the card that opened the dialog. */
  useEffect(() => {
    if (open === null && returnFocusRef.current) {
      returnFocusRef.current.focus()
      returnFocusRef.current = null
    }
  }, [open])

  const openAt = (index, el) => {
    returnFocusRef.current = el
    setOpenIndex(index)
  }

  const imageFor = (item) => equipmentImages[item.img] ?? equipmentImages.machines

  return (
    <section className="relative overflow-hidden bg-night" id="equipment">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative shell section-y">
        <div className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            eyebrow="Equipment"
            title={equipmentConfirmed ? 'On the' : 'Going on the'}
            accent="floor."
            lead={`${equipmentCount} machines across ${equipmentZones.length} zones. Tap any one for detail.`}
            tone="light"
            align="center"
            maxWidth="max-w-2xl"
          />
        </div>

        {/* ---- Zone tabs + search ---- */}
        <div className="section-gap flex flex-col items-center gap-5">
          <div
            role="tablist"
            aria-label="Equipment zones"
            className="scrollbar-none -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {equipmentZones.map((z) => {
              const isActive = !searching && z.id === zoneId

              return (
                <button
                  key={z.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setQuery('')
                    setZoneId(z.id)
                  }}
                  className={`relative flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 text-[0.8125rem] font-semibold transition-colors duration-300 ${
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
                    <ServiceIcon name={z.icon} className="size-4" />
                    {z.title}
                    <span className={isActive ? 'text-night/55' : 'text-ivory/35'}>{z.items.length}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="relative w-full max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ivory/40"
              strokeWidth={2}
              aria-hidden="true"
            />
            <label htmlFor={searchId} className="sr-only">
              Search all equipment
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all equipment…"
              className="w-full rounded-full border border-ivory/15 bg-ivory/5 py-3 pr-4 pl-11 text-[0.875rem] text-ivory
                         placeholder:text-ivory/35 focus:border-gold focus:bg-ivory/10 focus:outline-none"
            />
          </div>

          <p className="text-[0.8125rem] text-ivory/45" role="status">
            {searching
              ? `${list.length} ${list.length === 1 ? 'result' : 'results'} for “${query.trim()}”`
              : zone.lead}
          </p>
        </div>

        {/* ---- Machine grid ---- */}
        <motion.ul
          layout={!reduce}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {list.map((item, i) => {
              const img = imageFor(item)

              return (
                <motion.li
                  key={`${item.zoneTitle}-${item.name}`}
                  layout={!reduce}
                  initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? {} : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={(e) => openAt(i, e.currentTarget)}
                    aria-haspopup="dialog"
                    className="group card-dark relative flex h-full w-full flex-col overflow-hidden text-left
                               transition-colors duration-300 hover:bg-[#2b2c27]
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <motion.div
                      layoutId={reduce ? undefined : `eq-img-${item.zoneTitle}-${item.name}`}
                      className="relative"
                    >
                      <SmartImage
                        src={img.src}
                        alt={img.alt}
                        aspect="aspect-[4/3]"
                        imgClassName="img-zoom"
                        sizes="(min-width: 1280px) 18vw, (min-width: 640px) 30vw, 45vw"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night/70 to-transparent"
                      />
                    </motion.div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-[0.875rem] leading-snug font-semibold text-ivory">{item.name}</h3>
                      <p className="mt-1 text-[0.75rem] leading-relaxed text-ivory/45">{item.trains}</p>
                      {searching && (
                        <p className="mt-2 text-[0.6875rem] tracking-[0.12em] text-gold/70 uppercase">
                          {item.zoneTitle}
                        </p>
                      )}
                    </div>
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>

        {searching && list.length === 0 && (
          <p className="mt-10 text-center text-[0.9375rem] text-ivory/50">
            Nothing matches “{query.trim()}”. Try a muscle group, or a machine name.
          </p>
        )}

        {/* ---- Stated openly rather than quietly omitted ---- */}
        {!equipmentConfirmed && (
          <Reveal delay={0.15}>
            <div className="mt-9 flex gap-4 rounded-[var(--radius-card)] border border-gold/25 bg-gold/8 p-5 sm:p-6">
              <Info className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
              <p className="text-[0.9375rem] leading-relaxed text-ivory/70">
                <span className="font-semibold text-ivory">Fit-out in progress. </span>
                The final machine list is still being confirmed. Message us and we will tell you exactly
                what is going on the floor.
              </p>
            </div>
          </Reveal>
        )}
      </div>

      {/* ================= DETAIL DIALOG =================
          Portalled to <body>: a fixed element inside the animated page
          wrapper stacks against that wrapper, not the viewport, which let
          the sticky mobile bar paint over it. */}
      {mounted &&
        createPortal(
        <AnimatePresence>
          {open && (
          <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
            <motion.div
              initial={reduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? {} : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpenIndex(null)}
              className="absolute inset-0 bg-night/95 backdrop-blur-md"
              aria-hidden="true"
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="eq-dialog-title"
              tabIndex={-1}
              initial={reduce ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[var(--radius-card)]
                         bg-charcoal focus:outline-none sm:rounded-[var(--radius-card)]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full
                           bg-night/70 text-ivory backdrop-blur-sm transition-colors hover:bg-night"
              >
                <X className="size-4" strokeWidth={2} />
              </button>

              <motion.div
                layoutId={reduce ? undefined : `eq-img-${open.zoneTitle}-${open.name}`}
              >
                <SmartImage
                  src={imageFor(open).src}
                  alt={imageFor(open).alt}
                  aspect="aspect-[16/9]"
                  sizes="(min-width: 768px) 48rem, 100vw"
                />
              </motion.div>

              <div className="p-6 sm:p-8">
                <p className="eyebrow text-gold">{open.zoneTitle}</p>

                <h3
                  id="eq-dialog-title"
                  className="mt-3 font-display text-[1.5rem] leading-tight font-bold tracking-[-0.025em] text-ivory sm:text-[1.75rem]"
                >
                  {open.name}
                </h3>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/70">{open.desc}</p>

                <div className="mt-7 border-t border-ivory/10 pt-6">
                  <p className="eyebrow mb-4 text-ivory/40">What it gets you</p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {open.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-[0.9375rem] text-ivory/75">
                        <Check className="mt-0.5 size-4 shrink-0 text-sage" strokeWidth={2.5} aria-hidden="true" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-ivory/10 pt-5">
                  <p className="text-[0.75rem] text-ivory/40">
                    Trains <span className="text-ivory/70">{open.trains}</span>
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenIndex((i) => (i - 1 + list.length) % list.length)}
                      aria-label="Previous machine"
                      className="flex size-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                    >
                      <ArrowLeft className="size-4" strokeWidth={2} />
                    </button>
                    <span className="text-[0.75rem] tabular-nums text-ivory/40">
                      {openIndex + 1} / {list.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenIndex((i) => (i + 1) % list.length)}
                      aria-label="Next machine"
                      className="flex size-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                    >
                      <ArrowRight className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          )}
        </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
