'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = pathname === '/'
  const isLight = !isHome || scrolled || menuOpen

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          isLight
            ? 'backdrop-blur-md bg-cream/90 shadow-[0_1px_0_rgba(28,28,28,0.08)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-2xl tracking-[0.3em] font-medium transition-colors duration-300 ${
            isLight ? 'text-charcoal' : 'text-white'
          }`}
        >
          SRINJOY
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm tracking-wide font-medium transition-colors duration-300 group ${
                isLight ? 'text-charcoal' : 'text-white'
              } ${
                pathname === link.href
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-terracotta transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-terracotta text-white text-sm font-medium tracking-wide hover:bg-terracotta/85 transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/20"
          >
            Book a Consultation
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-[210]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <motion.span
            className={`block w-6 h-px transition-colors duration-300 ${isLight ? 'bg-charcoal' : 'bg-white'}`}
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className={`block w-6 h-px transition-colors duration-300 ${isLight ? 'bg-charcoal' : 'bg-white'}`}
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={`block w-6 h-px transition-colors duration-300 ${isLight ? 'bg-charcoal' : 'bg-white'}`}
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[190] bg-offwhite flex flex-col items-center justify-center"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-5xl text-charcoal hover:text-terracotta transition-colors duration-200 ${
                      pathname === link.href ? 'text-terracotta' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3.5 rounded-full bg-terracotta text-white font-medium tracking-wide hover:bg-terracotta/90 transition-colors"
                >
                  Book a Consultation
                </Link>
              </motion.div>
            </nav>

            {/* Decorative number */}
            <p className="absolute bottom-10 left-0 right-0 text-center font-serif text-[10rem] font-bold text-charcoal/[0.04] select-none pointer-events-none leading-none">
              F
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
