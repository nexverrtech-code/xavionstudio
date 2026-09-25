import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileActionBar from './components/layout/MobileActionBar'
import Preloader from './components/layout/Preloader'

import Home from './pages/Home'
import Services from './pages/Services'
import Membership from './pages/Membership'
import Requirements from './pages/Requirements'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/**
 * Route changes jump to the top; in-page hash links scroll to their target.
 * Without this, navigating from the footer leaves you halfway down the next
 * page with no idea why.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target has been laid out before scrolling to it.
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

/**
 * Page transition. A short crossfade only — a slide or a wipe on every
 * navigation gets tiresome by the third click.
 */
function Page({ children }) {
  const reduce = useReducedMotion()

  return (
    <motion.main
      id="main"
      initial={reduce ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? {} : { opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]
                   focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm
                   focus:font-semibold focus:text-night"
      >
        Skip to content
      </a>

      {/* Overlay only — the page below renders from the first frame. */}
      <Preloader />

      <ScrollManager />
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <Page key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Page>
      </AnimatePresence>

      <Footer />
      <MobileActionBar />

      {/* Clears the sticky mobile action bar so it never covers the footer. */}
      <div className="h-[env(safe-area-inset-bottom)] pb-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
