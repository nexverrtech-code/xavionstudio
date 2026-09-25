import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-reveal wrapper. Short, quiet, once-only — nobody should ever
 * wait on an animation to read the page.
 *
 * With prefers-reduced-motion the content renders immediately in place.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  duration = 0.6,
  className = '',
  once = true,
  amount = 0.25,
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
