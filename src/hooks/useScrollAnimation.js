import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `threshold`. Drives the header's
 * transition from transparent-over-hero to frosted ivory.
 *
 * Reads are passive and the state only flips on a boundary crossing, so
 * this does not re-render on every scroll event.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > threshold
      setScrolled((prev) => (prev === past ? prev : past))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** Locks background scrolling while an overlay (mobile menu) is open. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return

    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/**
 * Tracks whether the visitor has scrolled far enough for the sticky mobile
 * action bar to be useful — it stays out of the way of the hero CTAs.
 */
export function usePastHero(offset = 420) {
  return useScrolled(offset)
}
