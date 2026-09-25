/**
 * Frosted card for use over cinematic photography (`tone="dark"`) or over
 * ivory surfaces (`tone="light"`). Kept intentionally plain — the glass
 * effect itself is the decoration, so nothing else needs to be.
 */
export default function GlassCard({ children, tone = 'dark', className = '', ...props }) {
  const surface = tone === 'light' ? 'glass-light text-ink' : 'glass text-ivory'

  return (
    <div className={`rounded-2xl ${surface} ${className}`} {...props}>
      {children}
    </div>
  )
}
