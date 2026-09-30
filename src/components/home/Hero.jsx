import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MapPin, ArrowDown } from 'lucide-react'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import { useIntroOpen } from '../../hooks/useIntroGate'
import { PORTRAIT_MEDIA_TALL } from '../../utils/images'
import { heroSlides, SLIDE_MS } from '../../data/heroSlides'
import { site, localeShort, whatsappLink } from '../../data/site'

/** Headline, split into lines then words so each word can reveal on its own. */
const headline = [
  { words: ['Build', 'Your'], accent: false },
  { words: ['Stronger'], accent: true },
  { words: ['Self.'], accent: false },
]

const EASE = [0.22, 1, 0.36, 1]

/**
 * ============================================================
 * HERO — fixed height, one entrance, one moving thing
 * ============================================================
 * The section is exactly one viewport tall (`h-[100svh]`, not `min-h-`), so
 * it never grows with its content and never reflows as the slideshow changes.
 *
 * After the entrance the only thing that moves is the photograph. The copy,
 * the buttons and the location card hold still — nothing floats toward the
 * cursor, and nothing rearranges under it.
 *
 * The entrance is gated on `useIntroOpen()` so it plays as the branded
 * overlay lifts rather than finishing invisibly behind it.
 * ============================================================
 */
export default function Hero() {
  const reduce = useReducedMotion()
  const started = useIntroOpen()
  const sectionRef = useRef(null)

  /* Timeline offsets, so the choreography reads in one place. */
  const T = { eyebrow: 0.18, headline: 0.3, support: 0.85, actions: 1.0, card: 1.05, cue: 1.4 }

  /* ---- Background slideshow: the one thing that moves by itself ---- */
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (reduce || !started) return

    /*
      No `document.hidden` guard: browsers already throttle background
      timers, and any context reporting itself permanently hidden (embedded
      panes, some webviews) would freeze the slideshow for good.
    */
    const id = setInterval(() => setSlide((i) => (i + 1) % heroSlides.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [reduce, started])

  const frame = heroSlides[slide]

  /* ---- Warm the other photographs once the browser is idle ---- */
  useEffect(() => {
    const warm = () => {
      for (const s of heroSlides.slice(1)) {
        const img = new Image()
        img.decoding = 'async'
        img.src = s.src
      }
    }

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(warm, { timeout: 4000 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(warm, 2500)
    return () => clearTimeout(id)
  }, [])

  /* ---- Scroll: photograph drifts, copy lifts and fades ---- */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  /** Nothing animates until the intro gate opens. */
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

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative isolate h-[100svh] min-h-[34rem] overflow-hidden bg-night"
    >
      {/* ================= BACKDROP ================= */}
      <motion.div
        className="absolute inset-0 -top-[10%] h-[120%]"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={frame.src}
            className="absolute inset-0"
            /*
              First paint opens like a letterbox from the centre line; every
              later slide drifts across. Both `initial`s declare clipPath
              because `animate` always sets one — animating from the computed
              `none` is not interpolatable and Framer drops the whole batch.
            */
            initial={
              reduce
                ? { opacity: 0 }
                : !started
                  ? { opacity: 0, scale: 1.14, clipPath: 'inset(50% 0 50% 0)' }
                  : { opacity: 0, scale: 1.06, x: '4%', clipPath: 'inset(0% 0 0% 0)' }
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
              clipPath: { duration: 1.5, ease: EASE },
              scale: { duration: 2.4, ease: EASE },
              x: { duration: 2.4, ease: EASE },
              opacity: { duration: 1.4, ease: 'linear' },
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
                The photographs were shot at different exposures, so they are
                graded to one key. Light-handed: the scrim below protects
                headline contrast, and crushing the image as well just loses
                the detail worth showing.
              */
              imgClassName="brightness-[0.86] contrast-[1.04] saturate-[0.95]"
              imgStyle={{ objectPosition: frame.framing }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Static blurred fields for depth. Fixed in place. */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-1/4 -left-1/4 size-[70vw] rounded-full opacity-25 blur-[90px] bg-[radial-gradient(circle,rgba(199,167,106,0.18)_0%,transparent_65%)]" />
          <div className="absolute -right-1/4 -bottom-1/3 size-[65vw] rounded-full opacity-20 blur-[100px] bg-[radial-gradient(circle,rgba(185,198,168,0.14)_0%,transparent_65%)]" />
        </div>
      )}

      <div className="scrim absolute inset-0" aria-hidden="true" />
      <div className="scrim-left absolute inset-0 hidden lg:block" aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* One gold light bar crossing the hero as it arrives. Plays once. */}
      {started && !reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="light-sweep absolute inset-y-0 -left-[15vw] w-[18vw] bg-gradient-to-r from-transparent via-ivory/14 to-transparent"
            style={{ animationDelay: '0.45s' }}
          />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pt-28 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
      >
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-8">
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
            <h1 className="mt-5 text-ivory [perspective:800px]">
              {headline.map((line, li) => (
                <span key={line.words.join('-')} className="block overflow-hidden pb-[0.08em]">
                  {/*
                    Inline layout with a real space between words, not a flex
                    gap: a gap looks identical but leaves the heading's text
                    content as "BuildYourStrongerSelf." for crawlers.
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
                          line.accent ? 'accent' : ''
                        }`}
                      >
                        {word}
                      </motion.span>
                    </Fragment>
                  ))}
                  {/* Trailing space so tag-stripping crawlers read the line break. */}
                  {li < headline.length - 1 && ' '}
                </span>
              ))}
            </h1>

            <motion.p
              {...enter({ opacity: 0, y: 14 }, T.support, 0.6)}
              className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/70 sm:text-lg"
            >
              A refined training floor in {localeShort} — coached, structured, and built around
              how you actually train.
            </motion.p>

            {/* Buttons sit where they are put. Nothing drifts toward the cursor. */}
            <motion.div
              {...enter({ opacity: 0, y: 18 }, T.actions, 0.65)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href={whatsappLink()} variant="gold" size="lg" arrow>
                Message on WhatsApp
              </Button>

              <Button to="/services" variant="ghostLight" size="lg">
                Explore Services
              </Button>
            </motion.div>
          </div>

          {/* ---- Verified facts only — the studio has not opened yet ---- */}
          <div className="lg:col-span-5 lg:justify-self-end">
            <motion.div
              {...enter({ opacity: 0, x: 28 }, T.card, 0.75)}
              className="glass hidden items-center gap-4 rounded-[var(--radius-card)] px-6 py-5 sm:flex"
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
      </motion.div>

      {/* ================= SCROLL CUE ================= */}
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
