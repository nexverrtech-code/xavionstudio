import { MapPin, Navigation, Compass } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import { site, addressLines, directionsUrl, localeFull } from '../../data/site'

/**
 * Location panel.
 *
 * A Google Maps iframe is embedded only once a verified street address (or
 * coordinates) exists in data/site.js. Until then, dropping a pin would mean
 * guessing at a building — so the panel shows the confirmed area, a working
 * directions link, and says plainly that the exact address follows on enquiry.
 */
export default function LocationMap() {
  const { street, geo } = site.location
  const canEmbed = Boolean(street || geo)

  const embedQuery = geo
    ? `${geo.lat},${geo.lng}`
    : [site.name, street, localeFull, site.location.pincode].filter(Boolean).join(', ')

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white/50">
      {canEmbed ? (
        <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
          <iframe
            title={`Map showing the location of ${site.name} in ${localeFull}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(embedQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        </div>
      ) : (
        <div className="relative">
          <SmartImage
            src="/images/gym-exterior-thindal-erode.webp"
            alt={`Training floor photography representing the ${site.name} studio environment`}
            aspect="aspect-[16/10] sm:aspect-[16/9]"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />

          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-night/90 via-night/40 to-transparent p-6 sm:p-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night/60 px-3.5 py-1.5 backdrop-blur-sm">
                <Compass className="size-3 text-gold" strokeWidth={2} aria-hidden="true" />
                <span className="text-[0.625rem] font-semibold tracking-[0.16em] text-gold uppercase">
                  Opening soon
                </span>
              </span>

              <p className="mt-4 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-ivory sm:text-2xl">
                {site.location.area}, {site.location.city}
              </p>
              <p className="mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-ivory/60">
                The exact street address is shared with members on enquiry and will be published here at
                launch.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---- Address + directions ---- */}
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex gap-3.5">
          <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
          <address className="text-[0.9375rem] leading-relaxed text-ink/80 not-italic">
            <span className="block font-medium text-night">{site.name}</span>
            {addressLines.map((line) => (
              <span key={line} className="block text-muted">
                {line}
              </span>
            ))}
          </address>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-line px-6 py-3
                     text-[0.875rem] font-medium text-ink transition-all duration-300 hover:border-gold hover:text-night"
        >
          <Navigation className="size-3.5 text-gold" strokeWidth={2} aria-hidden="true" />
          Get Directions
        </a>
      </div>
    </div>
  )
}
