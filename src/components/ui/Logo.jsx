import { Link } from 'react-router-dom'
import { site } from '../../data/site'

/**
 * Wordmark. The mark is an inline SVG "X" built from two tapered strokes
 * inside a thin gold frame; the name itself stays live text so it is
 * selectable, searchable and readable by assistive tech.
 */
export function LogoMark({ className = 'size-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="11"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />
      <path
        d="M13 12.5 L27 27.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M27 12.5 L13 27.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2.4" fill="var(--color-night)" />
      <circle cx="20" cy="20" r="1.15" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ tone = 'light', compact = false, className = '' }) {
  const wordColor = tone === 'light' ? 'text-ivory' : 'text-night'
  const subColor = tone === 'light' ? 'text-ivory/45' : 'text-muted'

  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={`group/logo flex items-center gap-3 transition-opacity duration-300 hover:opacity-85 ${className}`}
    >
      <span className="text-gold">
        <LogoMark className={compact ? 'size-8' : 'size-9 sm:size-10'} />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[0.13em] uppercase ${wordColor} ${
            compact ? 'text-[0.9375rem]' : 'text-base sm:text-[1.0625rem]'
          }`}
        >
          Xavion
        </span>
        <span
          className={`mt-1 text-[0.5625rem] font-semibold tracking-[0.3em] uppercase ${subColor}`}
        >
          Fitness Studio
        </span>
      </span>
    </Link>
  )
}
