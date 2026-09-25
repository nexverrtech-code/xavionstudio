import { MapPin } from 'lucide-react'
import { site, localeFull, localeShort } from '../../data/site'

/**
 * A single quiet line of local context above the header. Deliberately not
 * keyword-stuffed — it states where the studio is and what stage it is at.
 */
export default function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-night text-ivory/70">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-4 py-2.5 sm:px-6">
        <MapPin className="size-3 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
        {/*
          On a phone there is only room for two facts, so the middle clause is
          dropped rather than truncated — a sentence cut off mid-word reads as
          a bug, not as a design decision.
        */}
        <p className="text-[0.6875rem] font-medium tracking-[0.13em] uppercase">
          {site.isPreLaunch && (
            <>
              <span className="text-gold">Opening Soon</span>
              <span className="mx-2 text-ivory/25" aria-hidden="true">
                ·
              </span>
            </>
          )}

          <span className="hidden sm:inline">
            Premium Fitness &amp; Personal Training
            <span className="mx-2 text-ivory/25" aria-hidden="true">
              ·
            </span>
          </span>

          <span className="hidden sm:inline">{localeFull}</span>
          <span className="sm:hidden">{localeShort}</span>
        </p>
      </div>
    </div>
  )
}
