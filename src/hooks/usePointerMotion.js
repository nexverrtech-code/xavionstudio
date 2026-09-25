import { useEffect, useRef } from 'react'
import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/** True only for a real mouse — never a touch screen, never reduced-motion. */
function useFinePointer(reduce) {
  const ref = useRef(false)

  useEffect(() => {
    ref.current = !reduce && window.matchMedia('(pointer: fine)').matches
  }, [reduce])

  return ref
}

/**
 * Magnetic pull: the element drifts a few pixels toward the cursor as it
 * approaches, then springs home. Applied to the primary CTA only — the effect
 * reads as craft on one important button and as a gimmick on ten.
 *
 * `radius` is how far away (px) the pull starts; `strength` is the fraction of
 * the distance actually travelled, kept low so the button never runs away from
 * the pointer that is trying to click it.
 */
export function useMagnetic({ radius = 90, strength = 0.28 } = {}) {
  const reduce = useReducedMotion()
  const fine = useFinePointer(reduce)
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      if (!fine.current) return

      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)

      if (Math.hypot(dx, dy) > radius + Math.max(rect.width, rect.height) / 2) {
        x.set(0)
        y.set(0)
        return
      }

      x.set(dx * strength)
      y.set(dy * strength)
    }

    const reset = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', reset)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', reset)
    }
  }, [fine, radius, strength, x, y])

  return { ref, style: { x: springX, y: springY } }
}

/**
 * Pointer-driven 3D tilt. Returns the props for a perspective wrapper and the
 * motion style for the card inside it.
 *
 * Tilt is deliberately shallow (≤7°). Anything steeper starts to look like a
 * trading-card effect rather than a premium interface.
 */
export function useTilt({ max = 7 } = {}) {
  const reduce = useReducedMotion()
  const fine = useFinePointer(reduce)
  const ref = useRef(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const config = { stiffness: 150, damping: 20, mass: 0.5 }
  const sx = useSpring(px, config)
  const sy = useSpring(py, config)

  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])

  // A faint sheen that slides across the surface as the card tilts.
  const sheenX = useTransform(sx, [0, 1], ['110%', '-10%'])

  const onPointerMove = (e) => {
    if (!fine.current || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onPointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return {
    ref,
    handlers: { onPointerMove, onPointerLeave },
    style: reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 },
    sheenX,
    enabled: !reduce,
  }
}
