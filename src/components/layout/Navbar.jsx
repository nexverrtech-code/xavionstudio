import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import AnnouncementBar from './AnnouncementBar'
import { navLinks, site, telLink, whatsappLink } from '../../data/site'
import { useScrolled, useLockBodyScroll } from '../../hooks/useScrollAnimation'

export default function Navbar() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useLockBodyScroll(open)

  // Close the menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const onLight = scrolled && !open

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        {/* The local-context bar retracts once the visitor starts reading. */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
          }`}
        >
          <AnnouncementBar />
        </div>

        <header
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            onLight
              ? 'border-b border-line/70 bg-ivory/85 backdrop-blur-xl backdrop-saturate-150'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            aria-label="Primary"
            className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
              scrolled ? 'h-[4.25rem]' : 'h-20 lg:h-24'
            }`}
          >
            <Logo tone={onLight ? 'dark' : 'light'} compact={scrolled} />

            {/* ---- Desktop navigation ---- */}
            <ul className="hidden items-center gap-9 lg:flex">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-300 ${
                        onLight
                          ? isActive
                            ? 'text-night'
                            : 'text-ink/70 hover:text-night'
                          : isActive
                            ? 'text-ivory'
                            : 'text-ivory/70 hover:text-ivory'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <span data-active={isActive} className="link-underline">
                        {link.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={telLink}
                className={`text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-300 ${
                  onLight ? 'text-ink/70 hover:text-gold' : 'text-ivory/70 hover:text-gold'
                }`}
              >
                {site.contact.phoneDisplay}
              </a>
              <span className={`h-4 w-px ${onLight ? 'bg-line' : 'bg-ivory/20'}`} aria-hidden="true" />
              <Button to="/contact" variant="gold" size="sm" arrow>
                Book Free Trial
              </Button>
            </div>

            {/* ---- Mobile trigger ---- */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={open ? 'mobile-menu' : undefined}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`-mr-2 flex size-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
                open ? 'text-ivory' : onLight ? 'text-night' : 'text-ivory'
              }`}
            >
              {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
            </button>
          </nav>
        </header>
      </div>

      {/* ---- Mobile menu ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-night lg:hidden"
          >
            <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

            <div className="relative flex flex-1 flex-col justify-center px-6 pt-24 pb-10">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.06 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 border-b border-ivory/8 py-4 font-display text-3xl font-bold tracking-[-0.02em] transition-colors duration-300 ${
                          isActive ? 'text-gold' : 'text-ivory hover:text-gold'
                        }`
                      }
                    >
                      <span className="text-[0.625rem] font-semibold tracking-[0.2em] text-ivory/30">
                        0{i + 1}
                      </span>
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 space-y-3"
              >
                <Button to="/contact" variant="gold" size="lg" arrow className="w-full">
                  Book Free Trial
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={telLink}
                    className="flex items-center justify-center gap-2 rounded-full border border-ivory/15 py-3.5 text-[0.8125rem] font-medium text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-ivory/15 py-3.5 text-[0.8125rem] font-medium text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                  >
                    <MessageCircle className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>

                <p className="pt-3 text-center text-[0.6875rem] tracking-[0.16em] text-ivory/30 uppercase">
                  {site.location.area}, {site.location.city} · {site.location.state}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
