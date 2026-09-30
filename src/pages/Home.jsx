import SEO from '../components/ui/SEO'
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import LocalIntro from '../components/home/LocalIntro'
import ServicesSection from '../components/home/ServicesSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import EquipmentPreview from '../components/home/EquipmentPreview'
import FoundingMembers from '../components/home/FoundingMembers'
import ContactCTA from '../components/home/ContactCTA'
import FAQ from '../components/ui/FAQ'
import { pageMeta, faqs, localBusinessSchema, websiteSchema, faqSchema } from '../utils/seo'

export default function Home() {
  const meta = pageMeta.home

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.path}
        jsonLd={[localBusinessSchema(), websiteSchema(), faqSchema(faqs)]}
      />

      {/* Who are you, and what is this? */}
      <Hero />

      {/* At a glance */}
      <Stats />

      {/* Where are you, and what is the idea? */}
      <LocalIntro />

      {/* What do you offer? */}
      <ServicesSection />

      {/* Why should I trust you? */}
      <WhyChooseUs />

      {/* What is actually in there? */}
      <EquipmentPreview />

      {/* Can I believe any of this? (replaces invented testimonials) */}
      <FoundingMembers />

      {/* Direct answers, for people and for AI search */}
      <FAQ
        faqs={faqs}
        eyebrow="Common questions"
        title="Straight"
        accent="answers."
        lead="The things people ask most."
        tone="dark"
      />

      {/* How do I contact you? */}
      <ContactCTA />
    </>
  )
}
