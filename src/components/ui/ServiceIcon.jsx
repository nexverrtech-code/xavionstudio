import { Dumbbell, UserRound, HeartPulse, Zap, Activity, TrendingDown, Users, Waves } from 'lucide-react'

/**
 * Explicit icon registry.
 *
 * Deliberately NOT `import * as Icons from 'lucide-react'` — the namespace
 * import defeats tree-shaking and drags the entire icon set into the bundle.
 * Add a line here when a new programme needs a new icon.
 */
const registry = { Dumbbell, UserRound, HeartPulse, Zap, Activity, TrendingDown, Users, Waves }

export default function ServiceIcon({ name, className = 'size-5', strokeWidth = 1.75 }) {
  const Icon = registry[name] ?? Dumbbell
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
