import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import MembershipToggle from '../components/membership/MembershipToggle'
import MembershipCards from '../components/membership/MembershipCards'
import MembershipComparison from '../components/membership/MembershipComparison'
import ContactCTA from '../components/home/ContactCTA'
import Reveal from '../components/ui/Reveal'
import FAQ from '../components/ui/FAQ'
import { pageMeta, breadcrumbSchema, localBusinessSchema, faqSchema } from '../utils/seo'
import { hasPublishedPricing } from '../data/membership'
import { site, localeShort } from '../data/site'

/** Membership-specific questions, kept separate from the site-wide FAQ set. */
const membershipFaqs = [
  {
    q: `What membership plans does ${site.name} offer?`,
    a: 'Three: Essential for regular gym training, Performance for training with trainer guidance and progress tracking, and Signature for one-to-one personal training. Each is available on monthly, quarterly or yearly terms.',
  },
  {
    q: 'Which membership includes personal training?',
    a: 'Signature includes one-to-one personal training. Personal training can also be arranged alongside the Essential and Performance tiers — ask the team when you enquire.',
  },
  {
    q: 'Can I change my membership later?',
    a: 'Yes. Speak to the team about moving between tiers — the aim is that your membership matches how you are actually training, not the other way round.',
  },
  {
    q: 'Is there a free trial before I join?',
    a: `Yes. ${site.name} offers a free trial session so you can see the studio and train with a coach before committing to a membership.`,
  },
]

export default function Membership() {
  const meta = pageMeta.membership
  const [period, setPeriod] = useState('monthly')
  const navigate = useNavigate()

  /** A tier CTA is an enquiry, not a checkout — carry the choice across. */
  const handleEnquire = (tier) => navigate('/contact', { state: { plan: tier.name } })

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.path}
        image="/images/personal-training-erode-wide.webp"
        jsonLd={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Membership', path: '/membership' },
          ]),
          faqSchema(membershipFaqs),
        ]}
      />

      <PageHero
        eyebrow="Membership"
        title="Choose Your Membership."
        lead="Flexible options designed to fit your training goals — and explained in full before you commit to anything."
        image="/images/personal-training-erode-wide.webp"
        imageAlt={`Trainer coaching a member through floor work at ${site.name}, ${localeShort}`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Membership', path: '/membership' },
        ]}
      />

      {/* ---- Tiers + billing toggle ---- */}
      <section className="bg-ivory">
        <div className="shell section-y">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Plans"
              title="Choose your level."
              lead="Pick the amount of structure and coaching you want. You can move between tiers as your training changes."
              maxWidth="max-w-xl"
            />

            <Reveal delay={0.1}>
              <MembershipToggle active={period} onChange={setPeriod} />
            </Reveal>
          </div>

          <div className="section-gap">
            <MembershipCards period={period} onEnquire={handleEnquire} />
          </div>

          {!hasPublishedPricing && (
            <Reveal delay={0.2}>
              {/* Stated openly rather than hidden behind a "contact us" button. */}
              <p className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-cream/70 px-6 py-5 text-center text-[0.9375rem] leading-relaxed text-ink/75">
                {site.name} is {site.isPreLaunch ? 'opening soon' : 'now open'} in {localeShort}, and
                membership rates are being finalised. Get in touch and we will share current pricing and
                founding-member terms directly — we would rather quote you properly than publish a figure we
                might have to change.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---- Comparison ---- */}
      <section className="bg-cream">
        <div className="shell section-y">
          <SectionHeading
            eyebrow="Compare"
            title="What's included, side by side."
            lead="The same information as above, laid out so you can see exactly where the tiers differ."
            maxWidth="max-w-xl"
          />

          <div className="section-gap">
            <MembershipComparison />
          </div>
        </div>
      </section>

      <FAQ
        faqs={membershipFaqs}
        eyebrow="Membership questions"
        title="Before you decide."
        tone="dark"
      />

      <ContactCTA />
    </>
  )
}
