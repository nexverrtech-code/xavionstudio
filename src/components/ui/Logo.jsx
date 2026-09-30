import { Link } from 'react-router-dom'
import { site } from '../../data/site'

/**
 * The studio's supplied logo.
 *
 * The file is white artwork on transparency, so a single asset serves both
 * surfaces: it sits as-is on the dark header and is inverted to near-black on
 * the ivory one. Keeping one file means the mark can never drift between the
 * two states.
 *
 * The wordmark is baked into the artwork, so the accessible name comes from
 * `alt` rather than live text beside it.
 */
export default function Logo({ tone = 'light', compact = false, className = '' }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <img
        src="/images/xavion-logo.png"
        alt={site.name}
        width={640}
        height={486}
        /* The header logo is above the fold on every route. */
        loading="eager"
        decoding="sync"
        className={`w-auto transition-all duration-500 ${
          compact ? 'h-11 sm:h-12' : 'h-14 sm:h-16'
        } ${tone === 'light' ? '' : 'brightness-0'}`}
      />
    </Link>
  )
}

/** The mark alone, for the intro overlay. */
export function LogoMark({ className = 'h-16 w-auto' }) {
  return (
    <img
      src="/images/xavion-logo.png"
      alt=""
      aria-hidden="true"
      width={640}
      height={486}
      className={className}
    />
  )
}
