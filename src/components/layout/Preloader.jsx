import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LogoMark } from '../ui/Logo'
import { openIntroGate } from '../../hooks/useIntroGate'
import { site, localeShort } from '../../data/site'

const SESSION_KEY = 'xavion:intro-seen'

/**
 * ============================================================
 * BRANDED INTRO
 * ============================================================
 * Shows the mark, the name and the location while the page settles, then
 * lifts away. Three rules it has to obey, because splash screens are very
 * easy to get wrong:
 *
 *  1. It NEVER blocks content. The page renders underneath from the first
 *     frame — this is an overlay, not a gate. Crawlers, and anyone whose
 *     JavaScript fails, see the full page regardless.
 *  2. Once per session only. Seeing a logo animation on every navigation is
 *     an irritation, not branding.
 *  3. Skipped entirely under prefers-reduced-motion, and dismissible with a
 *     click or any key for anyone who does not want to wait.
 *
 * Total duration is ~1.6s — long enough to register, short enough that nobody
 * resents it.
 * ============================================================
 */
export default function Preloader() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Every early return below has to open the gate, or the hero would sit
    // invisible waiting for a reveal that is never coming.
    if (reduce) {
      openIntroGate()
      return
    }

    // sessionStorage can throw in private windows — the intro is optional,
    // so a failure here simply means it does not run.
    let seen = false
    try {
      seen = Boolean(window.sessionStorage.getItem(SESSION_KEY))
    } catch {
      openIntroGate()
      return
    }
    if (seen) {
      openIntroGate()
      return
    }

    // The "seen" flag is written when the intro FINISHES, never here. Writing
    // it up front breaks under StrictMode's double-invoked effects: the second
    // run would see its own flag, bail out before starting the timer, and
    // leave the overlay up forever.
    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
      // Opened as the overlay *starts* lifting, not after — so the hero's
      // reveal runs underneath the fade and the two read as one movement.
      openIntroGate()
    }, 1500)

    return () => clearTimeout(timer)
  }, [reduce])

  // Lock scrolling while the overlay is up, and always restore it after.
  useEffect(() => {
    if (!visible) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // Nothing to do — the intro simply plays again next navigation.
      }
    }
  }, [visible])

  // Let anyone skip it — clicking or typing means they are ready to read.
  useEffect(() => {
    if (!visible) return

    const dismiss = () => {

      setVisible(false)

      openIntroGate()

    }
    window.addEventListener('keydown', dismiss)
    window.addEventListener('pointerdown', dismiss)
    return () => {
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('pointerdown', dismiss)
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // aria-hidden: the real page is already behind this and is what
          // assistive tech should be reading.
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night"
        >
          <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

          {/* Gold wash that breathes once behind the mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.5, 0.2], scale: [0.7, 1.15, 1] }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute size-[34rem] rounded-full
                       bg-[radial-gradient(circle,rgba(199,167,106,0.22)_0%,transparent_65%)] blur-2xl"
          />

          <div className="relative flex flex-col items-center">
            {/* Mark draws itself in */}
            <motion.div
              initial={{ opacity: 0, scale: 0.86, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-gold"
            >
              <LogoMark className="size-[4.5rem]" />
            </motion.div>

            {/* Name — letters rise from behind a mask */}
            <div className="mt-7 overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[1.75rem] leading-none font-extrabold tracking-[0.22em] text-ivory uppercase sm:text-[2.25rem]"
              >
                Xavion
              </motion.p>
            </div>

            <div className="mt-3 overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="text-[0.625rem] font-semibold tracking-[0.42em] text-gold uppercase sm:text-[0.6875rem]"
              >
                Fitness Studio
              </motion.p>
            </div>

            {/* Hairline that draws left-to-right as the timer runs out */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.25, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="mt-8 h-px w-28 origin-left bg-gradient-to-r from-gold/80 to-gold/10"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-5 text-[0.625rem] tracking-[0.24em] text-ivory/35 uppercase"
            >
              {site.isPreLaunch ? 'Opening Soon' : 'Now Open'} · {localeShort}
            </motion.p>
          </div>

          <span className="sr-only">Loading {site.name}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
