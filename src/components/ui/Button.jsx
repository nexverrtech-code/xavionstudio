import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-medium whitespace-nowrap ' +
  'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  /** Champagne gold — the single most important action on a screen. */
  gold: 'bg-gold text-night hover:bg-gold-soft shadow-[0_1px_2px_rgb(23_24_20/0.08)] hover:shadow-[0_8px_24px_-8px_rgb(199_167_106/0.55)]',
  /** Dark, for use on ivory backgrounds. */
  ink: 'bg-night text-ivory hover:bg-charcoal',
  /** Outlined for secondary actions on light surfaces. */
  outline: 'border border-line text-ink hover:border-gold hover:text-night bg-transparent',
  /** Outlined for secondary actions over photography. */
  ghostLight:
    'border border-ivory/30 text-ivory hover:border-gold hover:text-gold backdrop-blur-sm bg-ivory/5',
  /** Text-only, for tertiary links that still need an arrow. */
  quiet: 'text-ink hover:text-gold px-0',
}

const sizes = {
  sm: 'text-[0.8125rem] px-5 py-2.5 rounded-full tracking-[0.01em]',
  md: 'text-sm px-7 py-3.5 rounded-full tracking-[0.01em]',
  lg: 'text-[0.9375rem] px-9 py-4 rounded-full tracking-[0.01em]',
}

/**
 * One button, three shapes of use: router link, anchor, or real button.
 * Renders the right element rather than faking it, so keyboard and
 * screen-reader behaviour comes for free.
 */
export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  to,
  href,
  arrow = false,
  className = '',
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${variant === 'quiet' ? sizes[size].replace(/px-\d+/, 'px-0') : sizes[size]} ${className}`

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="btn-arrow size-4 shrink-0" strokeWidth={2} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
