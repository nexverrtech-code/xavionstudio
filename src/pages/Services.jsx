import SEO from '../components/ui/SEO'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/services/ServiceCard'
import ServiceExplorer from '../components/services/ServiceExplorer'
import ContactCTA from '../components/home/ContactCTA'
import Reveal from '../components/ui/Reveal'
import { services } from '../data/services'
import { pageMeta, breadcrumbSchema, localBusinessSchema } from '../utils/seo'
import { site, localeShort } from '../data/site'

export default function Services() {
  const meta = pageMeta.services

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.path}
        image="/images/strength-training-erode-wide.webp"
        jsonLd={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Programmes"
        title="Training designed around your"
        accent="goals."
        lead="Built around where you are now."
        image="/images/strength-training-erode-wide.webp"
        imageAlt={`Squat racks and barbells on the strength floor at ${site.name}, ${localeShort}`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <section className="bg-ivory">
        <div className="shell section-y">
          <SectionHeading
            eyebrow="What we offer"
            title="Train with"
            accent="purpose."
            lead="Know what every session is for."
            align="center"
            maxWidth="max-w-2xl"
          />

          <div className="section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min(i, 4) * 0.06} className="h-full">
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Deep dive ---- */}
      <section className="bg-cream">
        <div className="shell section-y">
          <SectionHeading
            eyebrow="In detail"
            title="In" accent="detail."
            lead="Who it suits."
            maxWidth="max-w-xl"
          />

          <div className="section-gap">
            <ServiceExplorer items={services} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
