import SEO from '../components/ui/SEO'
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import LocalIntro from '../components/home/LocalIntro'
import ServicesSection from '../components/home/ServicesSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import MembershipPreview from '../components/home/MembershipPreview'
import RequirementsPreview from '../components/home/RequirementsPreview'
import FirstVisitSteps from '../components/home/FirstVisitSteps'
import FoundingMembers from '../components/home/FoundingMembers'
import FacilityShowcase from '../components/home/FacilityShowcase'
import ContactCTA from '../components/home/ContactCTA'
import FAQ from '../components/ui/FAQ'
import { pageMeta, faqs, localBusinessSchema, websiteSchema, faqSchema } from '../utils/seo'
import { site } from '../data/site'

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

      {/* 1 — Who are you, and what is this? */}
      <Hero />

      {/* 2 — At a glance */}
      <Stats />

      {/* 3 — Where are you, and what is the idea? */}
      <LocalIntro />

      {/* 4 — What do you offer? */}
      <ServicesSection />

      {/* 5 — Why should I trust you? */}
      <WhyChooseUs />

      {/* 6 — How much does it cost? */}
      <MembershipPreview />

      {/* 7 — What do I need? */}
      <RequirementsPreview />

      {/* 8 — What actually happens when I turn up? */}
      <FirstVisitSteps />

      {/* 9 — Can I believe any of this? (replaces invented testimonials) */}
      <FoundingMembers />

      {/* 10 — What does it look like? */}
      <FacilityShowcase />

      {/* 11 — Direct answers, for people and for AI search */}
      <FAQ
        faqs={faqs}
        eyebrow="Common questions"
        title="Straight answers."
        lead={`The things people ask most about ${site.name}.`}
        tone="dark"
      />

      {/* 12 — How do I contact you? */}
      <ContactCTA />
    </>
  )
}
