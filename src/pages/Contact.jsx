import { useLocation } from 'react-router-dom'
import { Phone, MessageCircle, Mail, Clock, MapPin } from 'lucide-react'
import SEO from '../components/ui/SEO'
import PageHero from '../components/ui/PageHero'
import ContactForm from '../components/contact/ContactForm'
import LocationMap from '../components/contact/LocationMap'
import FAQ from '../components/ui/FAQ'
import Reveal from '../components/ui/Reveal'
import { pageMeta, faqs, breadcrumbSchema, localBusinessSchema, faqSchema } from '../utils/seo'
import { site, addressLines, telLink, whatsappLink, localeShort } from '../data/site'

function DetailRow({ Icon, label, children }) {
  return (
    <div className="flex gap-4 border-t border-line pt-6">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-cream text-olive">
        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </span>

      <div>
        <h3 className="eyebrow text-ink/45">{label}</h3>
        <div className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const meta = pageMeta.contact
  const location = useLocation()

  /** A membership CTA can arrive here carrying the tier the visitor picked. */
  const preselectedPlan = location.state?.plan ?? ''

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
        title="Ready To Start?"
        lead="Visit us, speak with our team or book your first session — whichever suits you."
        image="/images/gym-facilities-erode-wide.webp"
        imageAlt={`Resistance machines on the training floor at ${site.name}, ${localeShort}`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      {/* ---- Details + form ---- */}
      <section className="bg-ivory">
        <div className="shell section-y">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---- Left: how to reach us ---- */}
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-gold">
                  <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
                  Visit us
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mt-6 text-display-sm text-night">
                  {localeShort}{' '}
                  <span className="block text-muted">{site.location.state}</span>
                </h2>
              </Reveal>

              <div className="mt-12 space-y-6">
                <Reveal delay={0.12}>
                  <DetailRow Icon={MapPin} label="Address">
                    <address className="not-italic">
                      {addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    {!site.location.street && (
                      <p className="mt-2 text-[0.8125rem] text-muted">
                        Exact street address shared on enquiry.
                      </p>
                    )}
                  </DetailRow>
                </Reveal>

                <Reveal delay={0.18}>
                  <DetailRow Icon={Phone} label="Call">
                    <a href={telLink} className="font-medium transition-colors hover:text-gold">
                      {site.contact.phoneDisplay}
                    </a>
                  </DetailRow>
                </Reveal>

                <Reveal delay={0.24}>
                  <DetailRow Icon={MessageCircle} label="WhatsApp">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium transition-colors hover:text-gold"
                    >
                      {site.contact.whatsappDisplay}
                    </a>
                  </DetailRow>
                </Reveal>

                {site.contact.email && (
                  <Reveal delay={0.3}>
                    <DetailRow Icon={Mail} label="Email">
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="font-medium transition-colors hover:text-gold"
                      >
                        {site.contact.email}
                      </a>
                    </DetailRow>
                  </Reveal>
                )}

                <Reveal delay={0.36}>
                  <DetailRow Icon={Clock} label="Opening hours">
                    {site.hours ? (
                      site.hours.map((h) => (
                        <span key={h.days} className="block">
                          {h.days} · {h.open} – {h.close}
                        </span>
                      ))
                    ) : (
                      <span>
                        Announced at launch — call or message us and we will confirm session timings.
                      </span>
                    )}
                  </DetailRow>
                </Reveal>
              </div>
            </div>

            {/* ---- Right: the form ---- */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <ContactForm initialPlan={preselectedPlan} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Location ---- */}
      <section className="bg-cream">
        <div className="shell section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-gold">
                  <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
                  Location
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mt-6 text-display-sm text-night">Find the studio.</h2>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
                  {site.name} is {site.isPreLaunch ? 'opening soon in' : 'located in'} {site.location.area},{' '}
                  {site.location.city} — {site.location.district} district, {site.location.state}.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <LocationMap />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} eyebrow="Questions" title="Anything else?" tone="light" />
    </>
  )
}
