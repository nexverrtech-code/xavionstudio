import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import { site, localeShort } from '../../data/site'

/**
 * Facility visuals. Each frame is a different scene and carries its own alt
 * text — repeating one image or one alt string across a gallery is both lazy
 * design and bad image SEO.
 */
const frames = [
  {
    src: '/images/strength-training-erode.webp',
    alt: `Squat racks and loaded barbells in the strength area at ${site.name}, ${localeShort}`,
    label: 'Strength floor',
    aspect: 'aspect-[4/5]',
    span: 'sm:col-span-3',
  },
  {
    src: '/images/cardio-training-erode.webp',
    alt: `Treadmills and cross trainers on the low-lit cardio floor at ${site.name}, ${localeShort}`,
    label: 'Cardio zone',
    aspect: 'aspect-[4/5]',
    span: 'sm:col-span-2',
  },
  {
    src: '/images/functional-training-erode.webp',
    alt: `Members working with battle ropes on the turf at ${site.name}`,
    label: 'Functional space',
    aspect: 'aspect-[4/5]',
    span: 'sm:col-span-2',
  },
  {
    src: '/images/mobility-recovery-erode.webp',
    alt: `Mat and floor work in the quiet recovery corner at ${site.name}, ${localeShort}`,
    label: 'Recovery corner',
    aspect: 'aspect-[4/5]',
    span: 'sm:col-span-3',
  },
]

export default function FacilityShowcase() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="shell section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The studio"
            title="Space designed for the work."
            lead="Zones laid out so strength, conditioning, functional work and recovery each have somewhere proper to happen."
            maxWidth="max-w-xl"
          />
        </div>

        <div className="section-gap grid grid-cols-1 gap-4 sm:grid-cols-5">
          {frames.map((frame, i) => (
            <Reveal key={frame.src} delay={i * 0.08} className={frame.span}>
              <figure className="group relative overflow-hidden rounded-2xl">
                <SmartImage
                  src={frame.src}
                  alt={frame.alt}
                  aspect={frame.aspect}
                  imgClassName="img-zoom"
                  sizes="(min-width: 640px) 45vw, 100vw"
                />

                <figcaption
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent
                             p-5 text-[0.6875rem] font-semibold tracking-[0.16em] text-ivory uppercase"
                >
                  {frame.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
