import { useEffect, useState } from 'react'

/**
 * ============================================================
 * INTRO GATE
 * ============================================================
 * Holds the hero's entrance until the branded overlay has started lifting.
 *
 * Without this the hero animates on mount — behind the preloader — so by the
 * time the overlay clears, the entrance has already finished and the visitor
 * sees a static page. The whole point of the reveal is lost.
 *
 * A module-level flag rather than context: exactly one producer, and consumers
 * that mount after the signal has already fired still need to read it as
 * "open" immediately (a late-mounting hero must not wait forever).
 * ============================================================
 */

let opened = false
const listeners = new Set()

/** Called by the Preloader — on every path, including the ones where it never shows. */
export function openIntroGate() {
  if (opened) return
  opened = true
  for (const listener of listeners) listener()
  listeners.clear()
}

export function useIntroOpen() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (opened) {
      setOpen(true)
      return
    }

    const listener = () => setOpen(true)
    listeners.add(listener)

    /*
      Safety net. If the Preloader ever fails to signal — an exception, a
      future refactor, a path nobody thought of — the hero must still appear.
      Content that depends on an animation firing is content that can vanish.
    */
    const fallback = setTimeout(openIntroGate, 2600)

    return () => {
      listeners.delete(listener)
      clearTimeout(fallback)
    }
  }, [])

  return open
}
