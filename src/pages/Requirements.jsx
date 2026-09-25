import SEO from '../components/ui/SEO'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import RequirementChecklist from '../components/requirements/RequirementChecklist'
import FitnessGuidelines from '../components/requirements/FitnessGuidelines'
import EquipmentRequirements from '../components/requirements/EquipmentRequirements'
import FirstVisitSteps from '../components/home/FirstVisitSteps'
import ContactCTA from '../components/home/ContactCTA'
import FAQ from '../components/ui/FAQ'
import { checklists } from '../data/requirements'
import { pageMeta, breadcrumbSchema, localBusinessSchema, faqSchema } from '../utils/seo'
import { site, localeShort } from '../data/site'

const requirementFaqs = [
  {
    q: `What do I need to bring to ${site.name}?`,
    a: 'Bring a water bottle, comfortable workout clothes, clean indoor training shoes, a personal towel, and any registration or ID details requested when you sign up.',
  },
  {
    q: 'Do I need to be fit before I join a gym?',
    a: 'No. Programmes start from your current fitness level, and a trainer will walk you through the equipment and your first sessions. Beginners are expected, not the exception.',
  },
  {
    q: 'What happens on my first visit?',
    a: 'You arrive, complete registration, choose a membership, get a walkthrough of the floor from a trainer, talk through your goal, and then start your first session with a coach nearby.',
  },
  {
    q: `What gym equipment and machines will ${site.name} have?`,
    a: `The floor is planned across four zones: strength machines (chest press, lat pulldown, seated row, leg press and more), free weights with power racks and Olympic barbells, cardio machines including treadmills, bikes, rowers and a stair climber, and a functional area with kettlebells, battle ropes, plyo boxes and a stretching space. The final equipment specification is being confirmed ahead of opening — call ${site.contact.phoneDisplay} for the current list.`,
  },
  {
    q: 'Should I speak to a doctor before starting at a gym?',
    a: 'If you have a medical condition, an injury or a specific health concern, consult an appropriate healthcare professional before beginning a new exercise programme. Our trainers provide fitness guidance and are not a substitute for medical advice.',
  },
]

export default function Requirements() {
  const meta = pageMeta.requirements

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.path}
        image="/images/functional-training-erode-wide.webp"
        jsonLd={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Requirements', path: '/requirements' },
          ]),
          faqSchema(requirementFaqs),
        ]}
      />

      <PageHero
        eyebrow="First visit"
        title="Everything You Need To Get Started."
        lead="Simple information for a smooth and comfortable first visit — no guesswork, no surprises."
        image="/images/functional-training-erode-wide.webp"
        imageAlt={`Members training with battle ropes on the turf at ${site.name}, ${localeShort}`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Requirements', path: '/requirements' },
        ]}
      />

      {/* ---- Checklists ---- */}
      <section className="bg-cream">
        <div className="shell section-y">
          <SectionHeading
            eyebrow="Checklists"
            title="Come prepared."
            lead="Three short lists that cover the practical side. Tick items off as you go — your progress is saved in this browser."
            maxWidth="max-w-xl"
          />

          <div className="section-gap scroll-mt-32" id="checklists">
            <RequirementChecklist lists={checklists} />
          </div>
        </div>
      </section>

      {/* ---- Essential gym machine requirements ---- */}
      <EquipmentRequirements />

      {/* ---- Guidelines + disclaimer ---- */}
      <FitnessGuidelines />

      {/* ---- First visit timeline (dark) ---- */}
      <FirstVisitSteps />

      <FAQ
        faqs={requirementFaqs}
        eyebrow="Getting started"
        title="Common first-timer questions."
        tone="dark"
      />

      <ContactCTA />
    </>
  )
}
