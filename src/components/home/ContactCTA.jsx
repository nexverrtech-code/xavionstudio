import { Phone, MessageCircle, MapPin } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'
import { site, telLink, whatsappLink, localeShort } from '../../data/site'

/**
 * Closing call to action. Gives three ways to make contact because different
 * people reach for different ones — and on a phone, tapping to call is almost
 * always faster than filling in a form.
 */
export default function ContactCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <div className="absolute inset-0 opacity-40">
        <SmartImage
          src="/images/premium-gym-erode-wide.webp"
          alt=""
          aspect="h-full"
          sizes="100vw"
          className="size-full"
          quiet
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/92 to-night/70" aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative shell section-y">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
              Get started
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-6 text-display-sm text-ivory sm:text-display">
              Your next level starts with one conversation.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/65">
              Tell us what you are training for and we will talk you through the programmes, the memberships
              and a free trial session — no obligation either way.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" variant="gold" size="lg" arrow>
                Book Free Trial
              </Button>
              <Button href={whatsappLink()} variant="ghostLight" size="lg">
                Message on WhatsApp
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="section-gap grid gap-8 border-t border-ivory/12 pt-10 sm:grid-cols-3">
              <div>
                <dt className="eyebrow flex items-center gap-2 text-ivory/40">
                  <Phone className="size-3 text-gold" strokeWidth={2} aria-hidden="true" />
                  Call
                </dt>
                <dd className="mt-3">
                  <a
                    href={telLink}
                    className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-ivory transition-colors hover:text-gold"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow flex items-center gap-2 text-ivory/40">
                  <MessageCircle className="size-3 text-gold" strokeWidth={2} aria-hidden="true" />
                  WhatsApp
                </dt>
                <dd className="mt-3">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-ivory transition-colors hover:text-gold"
                  >
                    {site.contact.whatsappDisplay}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow flex items-center gap-2 text-ivory/40">
                  <MapPin className="size-3 text-gold" strokeWidth={2} aria-hidden="true" />
                  Find us
                </dt>
                <dd className="mt-3 font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-ivory">
                  {localeShort}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
