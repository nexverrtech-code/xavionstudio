import SEO from '../components/ui/SEO'
import PageHero from '../components/ui/PageHero'
import EquipmentExplorer from '../components/requirements/EquipmentExplorer'
import FitnessGuidelines from '../components/requirements/FitnessGuidelines'
import ContactCTA from '../components/home/ContactCTA'
import FAQ from '../components/ui/FAQ'
import { pageMeta, breadcrumbSchema, localBusinessSchema, faqSchema } from '../utils/seo'
import { equipmentCount, equipmentZones } from '../data/equipment'
import { site, localeShort } from '../data/site'

const equipmentFaqs = [
  {
    q: `What equipment does ${site.name} have?`,
    a: `${equipmentCount} machines and training tools across ${equipmentZones.length} zones: guided-path strength machines, free weights with power racks and Olympic barbells, cardio including treadmills, bikes, rowers, a ski erg and a stair climber, and a functional area with kettlebells, sleds, rings and recovery tools.`,
  },
  {
    q: `Does ${site.name} have free weights and squat racks?`,
    a: 'Yes. The free-weight zone includes power racks with safety bars, Olympic barbells and bumper plates, hex dumbbells from 2.5 to 50 kg, flat, incline, decline and adjustable benches, a preacher curl bench, a trap bar, a Smith machine and a deadlift platform.',
  },
  {
    q: 'What cardio machines are available?',
    a: 'Motorised treadmills, a curved manual treadmill, upright and recumbent bikes, spin bikes, a cross trainer, a rowing machine, a ski erg, a stair climber and an air bike.',
  },
  {
    q: 'Should I speak to a doctor before starting at a gym?',
    a: 'If you have a medical condition, an injury or a specific health concern, consult an appropriate healthcare professional before beginning a new exercise programme. Our trainers provide fitness guidance and are not a substitute for medical advice.',
  },
]

export default function Equipment() {
  const meta = pageMeta.equipment

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
            { name: 'Equipment', path: '/equipment' },
          ]),
          faqSchema(equipmentFaqs),
        ]}
      />

      <PageHero
        eyebrow="The floor"
        title="Machines and"
        accent="equipment."
        lead={`${equipmentCount} machines across ${equipmentZones.length} zones.`}
        image="/images/functional-training-erode-wide.webp"
        imageAlt={`Functional training floor at ${site.name}, ${localeShort}`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Equipment', path: '/equipment' },
        ]}
      />

      <EquipmentExplorer />

      {/* Kept: general training guidance and the medical disclaimer. */}
      <FitnessGuidelines />

      <FAQ faqs={equipmentFaqs} eyebrow="Equipment" title="Common" accent="questions." tone="dark" />

      <ContactCTA />
    </>
  )
}
