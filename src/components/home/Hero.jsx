import { Fragment, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { MapPin, Sparkles, ArrowDown } from 'lucide-react'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import GoalSelector from './GoalSelector'
import { useMagnetic, useTilt } from '../../hooks/usePointerMotion'
import { useIntroOpen } from '../../hooks/useIntroGate'
import { PORTRAIT_MEDIA_TALL } from '../../utils/images'
import { goals, defaultGoal } from '../../data/goals'
import { heroSlides, SLIDE_MS } from '../../data/heroSlides'
import { site, localeShort } from '../../data/site'

/** Headline, split into lines then words so each word can reveal on its own. */
const headline = [
  { words: ['Build', 'Your'], accent: false },
  { words: ['Stronger'], accent: true },
  { words: ['Self.'], accent: false },
]

const EASE = [0.22, 1, 0.36, 1]

/**
 * ============================================================
 * HERO — one cinematic entrance, then still
 * ============================================================
 * Everything arrives once, in a deliberate order, and then stops. Nothing on
 * this section loops, cycles or advances by itself: no carousel, no Ken Burns,
 * no drifting gradients, no repeating shimmer.
 *
 * After the entrance the only things that move are responses to the visitor —
 * scrolling (parallax), moving the cursor (spotlight, card tilt, magnetic CTA)
 * and choosing a goal (photograph wipe). A hero that keeps moving on its own
 * competes with the copy it exists to sell.
 *
 * The entrance is gated on `useIntroOpen()` so it plays as the branded overlay
 * lifts rather than finishing invisibly behind it.
 * ============================================================
 */
export default function Hero() {
  const [activeId, setActiveId] = useState(defaultGoal.id)
  const [hasChosen, setHasChosen] = useState(false)
  const goal = goals.find((g) => g.id === activeId) ?? defaultGoal

  const reduce = useReducedMotion()
  const started = useIntroOpen()
  const sectionRef = useRef(null)

  /* Timeline offsets, so the choreography reads in one place. */
  const T = {
    image: 0,
    eyebrow: 0.18,
    headline: 0.3,
    support: 0.85,
    actions: 1.0,
    goals: 1.12,
    cards: 1.0,
    cue: 1.5,
  }

  /* ---------------------------------------------------------------
     Background slideshow

     Drives the PHOTOGRAPH ONLY — the headline, copy, pills and card
     never change unprompted. It stops for good once the visitor picks
     a goal, and the image locks to their choice.
     --------------------------------------------------------------- */
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    // Reduced motion gets a single still frame, and a chosen goal ends it.
    if (reduce || hasChosen || !started) return

    /*
      No `document.hidden` guard here on purpose. Browsers already throttle
      timers in background tabs, so it buys nothing — and any context that
      reports itself permanently hidden (embedded panes, some webviews) would
      freeze the slideshow for good.
    */
    const id = setInterval(() => {
      setSlide((i) => (i + 1) % heroSlides.length)
    }, SLIDE_MS)

    return () => clearInterval(id)
  }, [reduce, hasChosen, started])

  /** What is actually on screen: the visitor's choice wins over the slideshow. */
  const frame = hasChosen
    ? { src: goal.image, alt: goal.imageAlt, framing: goal.framing, key: goal.id }
    : { ...heroSlides[slide], key: `slide-${slide}` }

  /* ---- Warm the other photographs once the browser is idle ---- */
  useEffect(() => {
    const warm = () => {
      for (const g of goals) {
        if (g.image === defaultGoal.image) continue
        const img = new Image()
        img.decoding = 'async'
        img.src = g.image
      }
    }

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(warm, { timeout: 4000 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(warm, 2500)
    return () => clearTimeout(id)
  }, [])

  /* ---- Scroll: photograph drifts and scales, copy lifts and fades ---- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  /* ---- Magnetic CTA + tilting glass card ---- */
  const magnet = useMagnetic()
  const tilt = useTilt({ max: 6 })

  /**
   * Shared helper: nothing animates until the intro gate opens.
   * The target is derived from the keys actually present in `from`, so an
   * element that only fades does not also pick up a needless transform.
   */
  const enter = (from, delay, duration = 0.7) => {
    const to = Object.fromEntries(
      Object.keys(from).map((key) => [key, key === 'opacity' || key === 'scale' ? 1 : 0]),
    )

    return {
      initial: reduce ? {} : from,
      animate: started ? to : undefined,
      transition: { duration, delay, ease: EASE },
    }
  }

  const selectGoal = (id) => {
    setActiveId(id)
    setHasChosen(true)
  }

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative isolate min-h-[100svh] overflow-hidden bg-night"
    >
      {/* ================= BACKDROP ================= */}
      <motion.div
        className="absolute inset-0 -top-[10%] h-[120%]"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={frame.key}
            className="absolute inset-0"
            /*
              Three different entrances, because they mean different things:
                • first paint  — a letterbox opening from the centre line
                • slideshow    — a slow drift across, so it reads as one long
                                 camera move rather than a stack of cuts
                • chosen goal  — a decisive horizontal wipe, since the visitor
                                 asked for it and should see it answered
            */
            initial={
              reduce
                ? { opacity: 0 }
                : !started
                  ? { opacity: 0, scale: 1.14, clipPath: 'inset(50% 0 50% 0)' }
                  : hasChosen
                    ? { opacity: 0, scale: 1.08, clipPath: 'inset(0 0 0 100%)' }
                    : /*
                        clipPath is spelled out here even though the slideshow
                        does not clip. `animate` always targets an inset(), and
                        animating from the computed `none` is not interpolatable
                        — Framer drops the whole batch, leaving the new slide
                        stuck at opacity 0 and the old one never unmounting.
                        Every `initial` must define the keys `animate` sets.
                      */
                      { opacity: 0, scale: 1.06, x: '4%', clipPath: 'inset(0% 0 0% 0)' }
            }
            animate={
              started
                ? reduce
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, x: '0%', clipPath: 'inset(0% 0 0% 0)' }
                : undefined
            }
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02, x: '-3%' }}
            transition={{
              clipPath: { duration: hasChosen ? 1 : 1.5, ease: EASE },
              scale: { duration: hasChosen ? 1.4 : 2.4, ease: EASE },
              x: { duration: 2.4, ease: EASE },
              opacity: { duration: hasChosen ? 0.6 : 1.4, ease: 'linear' },
            }}
          >
            <SmartImage
              src={frame.src}
              alt={frame.alt}
              priority
              quiet
              artDirect={PORTRAIT_MEDIA_TALL}
              aspect="h-full"
              sizes="100vw"
              className="size-full"
              /*
                The hero photographs were shot at different exposures, so they
                are graded to one key here. The current set is natively dark,
                so the grade is light-handed — the scrim below does the work of
                protecting headline contrast, and crushing the image as well
                just loses the detail that makes it worth showing.
              */
              imgClassName="brightness-[0.86] contrast-[1.04] saturate-[0.95]"
              imgStyle={{ objectPosition: frame.framing }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gold bar riding the leading edge of a goal-change wipe */}
        {!reduce && hasChosen && (
          <motion.div
            key={`edge-${goal.id}`}
            aria-hidden="true"
            initial={{ left: '0%', opacity: 0.9 }}
            animate={{ left: '100%', opacity: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent
                       shadow-[0_0_24px_6px_rgba(199,167,106,0.45)]"
          />
        )}
      </motion.div>

      {/* ================= STATIC DEPTH =================
          Blurred colour fields for depth. Fixed in place — these used to
          drift on a long loop, which is exactly the kind of unprompted
          movement this hero no longer does. */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-1/4 -left-1/4 size-[70vw] rounded-full opacity-25 blur-[90px]
                       bg-[radial-gradient(circle,rgba(199,167,106,0.18)_0%,transparent_65%)]"
          />
          <div
            className="absolute -right-1/4 -bottom-1/3 size-[65vw] rounded-full opacity-20 blur-[100px]
                       bg-[radial-gradient(circle,rgba(185,198,168,0.14)_0%,transparent_65%)]"
          />
        </div>
      )}

      <div className="scrim absolute inset-0" aria-hidden="true" />
      <div className="scrim-left absolute inset-0 hidden lg:block" aria-hidden="true" />

      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* One gold light bar crossing the hero as it arrives. Plays once. */}
      {started && !reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="light-sweep absolute inset-y-0 -left-[15vw] w-[18vw]
                       bg-gradient-to-r from-transparent via-ivory/14 to-transparent"
            style={{ animationDelay: '0.45s' }}
          />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pt-32 pb-10 sm:px-6 sm:pt-36 sm:pb-14 lg:px-8 lg:pt-44 lg:pb-20"
      >
        <div className="grid items-end gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---- Left: the pitch ---- */}
          <div className="lg:col-span-7">
            <motion.p
              {...enter({ opacity: 0 }, T.eyebrow, 0.6)}
              className="eyebrow flex items-center gap-3 text-gold"
            >
              <motion.span
                initial={reduce ? {} : { scaleX: 0 }}
                animate={started ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.9, delay: T.eyebrow, ease: EASE }}
                className="h-px w-8 origin-left bg-gold/50"
                aria-hidden="true"
              />
              Premium Fitness Studio
            </motion.p>

            {/* Per-word reveal: each word rotates up from behind its own mask */}
            <h1 className="mt-6 text-ivory [perspective:800px]">
              {headline.map((line, li) => (
                <span key={line.words.join('-')} className="block overflow-hidden pb-[0.08em]">
                  {/*
                    Inline layout with a real space between words, not a flex
                    gap: a gap looks identical but leaves the heading's text
                    content as "BuildYourStrongerSelf." for crawlers and
                    screen readers.
                  */}
                  {line.words.map((word, wi) => (
                    <Fragment key={word}>
                      {wi > 0 && ' '}
                      <motion.span
                        initial={reduce ? {} : { y: '110%', rotateX: -60, opacity: 0 }}
                        animate={started ? { y: '0%', rotateX: 0, opacity: 1 } : undefined}
                        transition={{
                          duration: 1.15,
                          delay: T.headline + li * 0.13 + wi * 0.08,
                          ease: EASE,
                        }}
                        className={`inline-block origin-bottom text-display sm:text-display-lg lg:text-display-xl ${
                          line.accent
                            ? `text-gold-gradient ${started && !reduce ? 'text-shimmer-once' : ''}`
                            : ''
                        }`}
                        style={
                          line.accent && started && !reduce
                            ? { animationDelay: `${T.headline + li * 0.13 + 0.2}s` }
                            : undefined
                        }
                      >
                        {word}
                      </motion.span>
                    </Fragment>
                  ))}
                  {/*
                    Trailing space at each line end. Browsers infer a break
                    from the block spans, but a crawler that strips tags
                    without applying CSS would otherwise read the heading as
                    "Build YourStrongerSelf." It collapses visually.
                  */}
                  {li < headline.length - 1 && ' '}
                </span>
              ))}
            </h1>

            {/*
              Supporting copy swaps with the selected goal.

              The two paragraphs overlap and crossfade rather than using
              AnimatePresence's `mode="wait"`: waiting for the old line to
              leave before the new one arrives left roughly 0.4s of empty
              space on every change, which read as a rendering fault.
            */}
            <motion.div
              {...enter({ opacity: 0, y: 14 }, T.support, 0.6)}
              className="relative mt-6 min-h-[5.5rem] max-w-xl sm:min-h-[4.5rem]"
            >
              <AnimatePresence initial={false}>
                <motion.p
                  key={goal.id}
                  initial={reduce ? {} : { opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduce ? {} : { opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-x-0 top-0 text-[1.0625rem] leading-relaxed text-ivory/70 sm:text-lg"
                >
                  {goal.support}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.div
              {...enter({ opacity: 0, y: 18 }, T.actions, 0.65)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <motion.div ref={magnet.ref} style={reduce ? undefined : magnet.style}>
                <Button to="/contact" variant="gold" size="lg" arrow>
                  Book Free Trial
                </Button>
              </motion.div>

              <Button to="/services" variant="ghostLight" size="lg">
                Explore Services
              </Button>
            </motion.div>

            <div className="mt-9 sm:mt-11 lg:mt-12">
              <GoalSelector
                active={activeId}
                onChange={selectGoal}
                started={started}
                baseDelay={T.goals}
              />
            </div>
          </div>

          {/* ---- Right: floating glass information ---- */}
          <div className="lg:col-span-5 lg:justify-self-end">
            <div
              ref={tilt.ref}
              {...tilt.handlers}
              className="flex flex-col gap-3 sm:max-w-sm lg:max-w-xs"
            >
              <motion.div
                {...enter({ opacity: 0, x: 28 }, T.cards, 0.75)}
                className="[transform-style:preserve-3d]"
              >
                <motion.div style={tilt.style} className="[transform-style:preserve-3d]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={goal.id}
                      initial={reduce ? {} : { opacity: 0, y: 14, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduce ? {} : { opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="glass relative overflow-hidden rounded-2xl p-5 sm:p-6"
                    >
                      {/* Sheen that slides as the card tilts */}
                      {tilt.enabled && (
                        <motion.span
                          aria-hidden="true"
                          style={{ left: tilt.sheenX }}
                          className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12
                                     bg-gradient-to-r from-transparent via-ivory/10 to-transparent"
                        />
                      )}

                      <div className="relative flex items-center gap-2.5">
                        <Sparkles className="size-3.5 text-gold" strokeWidth={2} aria-hidden="true" />
                        <p className="eyebrow text-gold">{goal.card.heading}</p>
                      </div>

                      <p className="relative mt-3.5 text-[0.9375rem] leading-relaxed text-ivory/75">
                        {goal.card.detail}
                      </p>

                      <ul className="relative mt-4 space-y-2 border-t border-ivory/10 pt-4">
                        {goal.card.programmes.map((programme) => (
                          <li
                            key={programme}
                            className="flex items-center gap-2.5 text-[0.8125rem] text-ivory/60"
                          >
                            <span className="size-1 rounded-full bg-gold" aria-hidden="true" />
                            {programme}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/*
                Verified facts only — the studio has not opened yet.
                Hidden on phones: the announcement bar already carries exactly
                this information, and a 1.5-screen hero is a tiring way in.
              */}
              <motion.div
                {...enter({ opacity: 0, x: 28 }, T.cards + 0.12, 0.75)}
                className="glass hidden items-center gap-4 rounded-2xl px-6 py-5 sm:flex"
              >
                <MapPin className="size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className="font-display text-sm font-bold tracking-[0.04em] text-ivory uppercase">
                    {site.isPreLaunch ? 'Opening Soon' : 'Now Open'}
                  </p>
                  <p className="mt-1 text-[0.75rem] tracking-[0.1em] text-ivory/50 uppercase">
                    {localeShort} · {site.location.state}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= SCROLL CUE =================
          Arrives with everything else and then holds. It used to bob up and
          down forever, which is movement the visitor never asked for. */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 8 }}
        animate={started ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: T.cue, ease: EASE }}
        style={reduce ? undefined : { opacity: contentOpacity }}
        aria-hidden="true"
        className="pointer-events-none absolute right-8 bottom-8 hidden items-center gap-3 lg:flex"
      >
        <span className="text-[0.625rem] font-semibold tracking-[0.24em] text-ivory/40 uppercase">
          Scroll
        </span>
        <span className="flex size-8 items-center justify-center rounded-full border border-ivory/20">
          <ArrowDown className="size-3.5 text-gold" strokeWidth={2} />
        </span>
      </motion.div>
    </section>
  )
}
