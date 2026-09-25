import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { site, navLinks, addressLines, telLink, whatsappLink } from '../../data/site'
import { services } from '../../data/services'

const trainingLinks = ['strength-training', 'personal-training', 'cardio-training', 'hiit', 'functional-training']

const socials = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram, href: site.social.instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook, href: site.social.facebook },
  { key: 'youtube', label: 'YouTube', Icon: Youtube, href: site.social.youtube },
  { key: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, href: whatsappLink() },
].filter((s) => Boolean(s.href))

function ColumnHeading({ children }) {
  return <h3 className="eyebrow mb-6 text-gold">{children}</h3>
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-ivory">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative shell pt-16 pb-10 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Brand ---- */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-7 max-w-xs text-[0.9375rem] leading-relaxed text-ivory/55">
              Premium fitness and training designed around strength, performance and wellbeing.
            </p>

            {socials.length > 0 && (
              <ul className="mt-8 flex items-center gap-2.5">
                {socials.map(({ key, label, Icon, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${label}`}
                      className="flex size-10 items-center justify-center rounded-full border border-ivory/12 text-ivory/60 transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ---- Explore ---- */}
          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/60 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Training ---- */}
          <nav className="lg:col-span-3" aria-label="Training programmes">
            <ColumnHeading>Training</ColumnHeading>
            <ul className="space-y-3.5">
              {trainingLinks.map((slug) => {
                const service = services.find((s) => s.slug === slug)
                return (
                  <li key={slug}>
                    <Link
                      to={`/services#${slug}`}
                      className="text-sm text-ivory/60 transition-colors duration-300 hover:text-gold"
                    >
                      {service.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-3">
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/70" strokeWidth={1.75} aria-hidden="true" />
                <address className="text-ivory/60 not-italic">
                  {addressLines.map((line) => (
                    <span key={line} className="block leading-relaxed">
                      {line}
                    </span>
                  ))}
                </address>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold/70" strokeWidth={1.75} aria-hidden="true" />
                <a href={telLink} className="text-ivory/60 transition-colors hover:text-gold">
                  {site.contact.phoneDisplay}
                </a>
              </li>

              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold/70" strokeWidth={1.75} aria-hidden="true" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 transition-colors hover:text-gold"
                >
                  {site.contact.whatsappDisplay}
                </a>
              </li>

              {site.contact.email && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold/70" strokeWidth={1.75} aria-hidden="true" />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-ivory/60 transition-colors hover:text-gold"
                  >
                    {site.contact.email}
                  </a>
                </li>
              )}

              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold/70" strokeWidth={1.75} aria-hidden="true" />
                <div className="text-ivory/60">
                  {site.hours ? (
                    site.hours.map((h) => (
                      <span key={h.days} className="block leading-relaxed">
                        {h.days} · {h.open}–{h.close}
                      </span>
                    ))
                  ) : (
                    <span className="leading-relaxed">Opening hours announced at launch</span>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-fade mt-16 opacity-15" />

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-[0.75rem] text-ivory/35">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-[0.6875rem] tracking-[0.16em] text-ivory/30 uppercase">
            {site.location.area} · {site.location.city} · {site.location.state}
          </p>
        </div>
      </div>
    </footer>
  )
}
