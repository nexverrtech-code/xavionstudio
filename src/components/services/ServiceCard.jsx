import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ServiceIcon from '../ui/ServiceIcon'
import SmartImage from '../ui/SmartImage'

/**
 * Programme card for the /services grid.
 *
 * The card leads with the photograph. It used to be an icon and two lines of
 * text, which made a page about training look like a settings menu — eight
 * grey boxes in a row, and the photography buried further down the page.
 *
 * The thumbnail is `aspect-square`: the source crops are 4:5, so a square only
 * trims the top and bottom slightly. Asking for a landscape ratio here would
 * throw away a third of every frame.
 *
 * Hover lifts it a couple of pixels and warms the border — restrained on
 * purpose, because eight of these animating hard at once would look cheap.
 */
export default function ServiceCard({ service, index }) {
  return (
    <article
      id={service.slug}
      className="group relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-2xl
                 border border-line bg-white/60 transition-all duration-500
                 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/45
                 hover:bg-white hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative overflow-hidden">
        <SmartImage
          src={service.image}
          alt={service.alt}
          aspect="aspect-square"
          imgClassName="img-zoom"
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
        />

        {/*
          Scrims top and bottom. Without them the index and the icon badge
          disappear whenever a photograph happens to be bright in that corner —
          which, across eight different frames, it reliably will be.
        */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-night/55 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night/55 to-transparent"
        />

        {/* Index sits on the image so the card header stays uncluttered. */}
        <span
          className="pointer-events-none absolute top-4 right-4 font-display text-[0.6875rem]
                     font-semibold tracking-[0.18em] text-ivory/85"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-xl
                     border border-ivory/20 bg-night/55 text-gold backdrop-blur-sm
                     transition-colors duration-500 group-hover:border-gold/50"
        >
          <ServiceIcon name={service.icon} className="size-4.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.1875rem] leading-snug font-bold tracking-[-0.02em] text-night">
          {service.title}
        </h3>

        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.short}</p>

        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/60
                     transition-colors duration-300 group-hover:text-gold"
        >
          Enquire
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="sr-only"> about {service.title}</span>
        </Link>
      </div>
    </article>
  )
}
