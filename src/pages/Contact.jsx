import { Phone, MessageCircle, Mail, Clock, MapPin, Instagram } from 'lucide-react'
import SEO from '../components/ui/SEO'
import PageHero from '../components/ui/PageHero'
import LocationMap from '../components/contact/LocationMap'
import FAQ from '../components/ui/FAQ'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { pageMeta, faqs, breadcrumbSchema, localBusinessSchema, faqSchema } from '../utils/seo'
import { site, addressLines, telLink, whatsappLink, localeShort } from '../data/site'

/**
 * Contact is read-only: the studio's details, and two ways to reach it.
 *
 * There is no enquiry form. Without a backend a form can only pretend to send,
 * and a pre-launch studio is better served by a tap-to-call and a WhatsApp
 * thread than by a field a visitor fills in and never hears back about.
 */
function Detail({ Icon, label, children, note }) {
  return (
    <div className="flex gap-4 border-t border-line pt-5">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-cream text-olive">
        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div>
        <h3 className="eyebrow text-ink/45">{label}</h3>
        <div className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/85">{children}</div>
        {note && <p className="mt-1 text-[0.8125rem] text-muted">{note}</p>}
      </div>
    </div>
  )
}

export default function Contact() {
  const meta = pageMeta.contact

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.path}
        image="/images/gym-facilities-erode-wide.webp"
        jsonLd={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        eyebrow="Get in touch"
        title="Talk to"
        accent="us."
        lead="Call or message — we answer both."
        image="/images/gym-facilities-erode-wide.webp"
        imageAlt={`Resistance machines on the training floor at ${site.name}, ${localeShort}`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <section className="bg-ivory">
        <div className="shell section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ---- Studio details ---- */}
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-gold">
                  <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
                  The studio
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mt-5 text-display-sm text-night">
                  {localeShort} <span className="accent">{site.location.state}</span>
                </h2>
              </Reveal>

              <div className="mt-9 space-y-5">
                <Reveal delay={0.12}>
                  <Detail
                    Icon={MapPin}
                    label="Address"
                    note={!site.location.street ? 'Exact street address shared on enquiry.' : undefined}
                  >
                    <address className="not-italic">
                      {addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </Detail>
                </Reveal>

                <Reveal delay={0.16}>
                  <Detail Icon={Phone} label="Call">
                    <a href={telLink} className="font-medium transition-colors hover:text-gold">
                      {site.contact.phoneDisplay}
                    </a>
                  </Detail>
                </Reveal>

                <Reveal delay={0.2}>
                  <Detail Icon={MessageCircle} label="WhatsApp">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium transition-colors hover:text-gold"
                    >
                      {site.contact.whatsappDisplay}
                    </a>
                  </Detail>
                </Reveal>

                {site.contact.email && (
                  <Reveal delay={0.24}>
                    <Detail Icon={Mail} label="Email">
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="font-medium transition-colors hover:text-gold"
                      >
                        {site.contact.email}
                      </a>
                    </Detail>
                  </Reveal>
                )}

                {site.social.instagram && (
                  <Reveal delay={0.28}>
                    <Detail Icon={Instagram} label="Instagram">
                      <a
                        href={site.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium transition-colors hover:text-gold"
                      >
                        @xavionfitness
                      </a>
                    </Detail>
                  </Reveal>
                )}

                <Reveal delay={0.32}>
                  <Detail Icon={Clock} label="Opening hours">
                    {site.hours ? (
                      site.hours.map((h) => (
                        <span key={h.days} className="block">
                          {h.days} · {h.open} – {h.close}
                        </span>
                      ))
                    ) : (
                      <span>Announced at launch. Call and we will confirm timings.</span>
                    )}
                  </Detail>
                </Reveal>
              </div>

              <Reveal delay={0.36}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href={whatsappLink()} variant="gold" size="lg" arrow>
                    Message on WhatsApp
                  </Button>
                  <Button href={telLink} variant="outline" size="lg">
                    Call {site.contact.phoneDisplay}
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* ---- Where we are ---- */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <LocationMap />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} eyebrow="Questions" title="Anything" accent="else?" tone="light" />
    </>
  )
}
