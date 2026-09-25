import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { portraitOf, PORTRAIT_MEDIA } from '../../utils/images'

/**
 * Editorial image with art direction and a designed fallback.
 *
 * ART DIRECTION — when `src` is a `-wide.webp` master, the 4:5 companion is
 * offered to viewports that are taller than they are wide. Without it, a phone
 * gets a 16:9 photograph cropped down to a narrow vertical sliver of its
 * subject. The browser picks; no JavaScript is involved, so there is no
 * flash of the wrong crop.
 *
 * FALLBACK — the studio is pre-launch and the photography is stock, so a
 * missing file falls back to a warm on-brand panel rather than a broken-image
 * icon. The layout stays intact and the page still reads as deliberate.
 *
 * See public/images/README.md for the filenames and art direction.
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  imgStyle,
  priority = false,
  aspect = 'aspect-[4/5]',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  /**
   * Full-bleed backgrounds set this so the fallback is a plain gradient with
   * no visible caption — a label floating in the middle of a hero reads as a
   * broken page. The alt text still reaches assistive tech via aria-label.
   */
  quiet = false,
  /**
   * Portrait swap on a `-wide` master. `true` uses the default crossover,
   * `false` opts out, or pass a media query string when the component's box
   * is a different shape from the viewport (see utils/images.js).
   */
  artDirect = true,
  children,
}) {
  const [failed, setFailed] = useState(false)
  const portrait = artDirect ? portraitOf(src) : null
  const portraitMedia = typeof artDirect === 'string' ? artDirect : PORTRAIT_MEDIA

  const img = (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      style={imgStyle}
      className={`size-full object-cover ${imgClassName}`}
    />
  )

  return (
    <div className={`relative overflow-hidden bg-charcoal grain ${aspect} ${className}`}>
      {!failed ? (
        portrait ? (
          <picture className="contents">
            <source media={portraitMedia} srcSet={portrait} />
            {img}
          </picture>
        ) : (
          img
        )
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3
                     bg-[radial-gradient(120%_100%_at_30%_0%,#344033_0%,#22231F_55%,#171814_100%)]"
        >
          {!quiet && (
            <>
              <span className="flex size-11 items-center justify-center rounded-full border border-gold/25 bg-gold/5">
                <ImageIcon className="size-4 text-gold/70" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="max-w-[16rem] px-6 text-center text-[0.6875rem] leading-relaxed tracking-[0.14em] text-ivory/35 uppercase">
                {alt}
              </p>
            </>
          )}
        </div>
      )}

      {children}
    </div>
  )
}
