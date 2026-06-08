import Link from 'next/link'

const QUICK_LINKS = ['Work', 'Services', 'About', 'Contact', 'Journal']
const SERVICES_LIST = [
  'Full Interior Design',
  'Space Planning',
  'Furniture Curation',
  'Renovation Consulting',
  'Lighting Design',
  'Virtual Staging',
]

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.87 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.78 1.26-5.34 1.26-5.34s-.32-.64-.32-1.59c0-1.49.87-2.6 1.94-2.6.92 0 1.36.69 1.36 1.52 0 .92-.59 2.31-.9 3.59-.25 1.07.53 1.94 1.58 1.94 1.9 0 3.18-2.43 3.18-5.3 0-2.19-1.48-3.72-3.6-3.72-2.45 0-3.89 1.84-3.89 3.74 0 .74.28 1.53.64 1.96.07.08.08.16.06.24l-.24.98c-.04.15-.13.18-.3.11-1.11-.52-1.81-2.14-1.81-3.44 0-2.8 2.03-5.37 5.86-5.37 3.08 0 5.47 2.19 5.47 5.12 0 3.05-1.92 5.51-4.59 5.51-.9 0-1.74-.47-2.03-1.02l-.55 2.07c-.2.77-.74 1.73-1.1 2.32.83.26 1.7.4 2.61.4 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function HouzzIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 8.5V22h8v-6h4v6h8V8.5L12 2zm0 2.5l8 5V20h-4v-6H8v6H4V9.5l8-5z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream relative overflow-hidden">
      {/* Watermark */}
      <p
        className="absolute bottom-0 left-0 right-0 text-center font-serif font-bold text-cream/[0.03] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(6rem, 24vw, 20rem)' }}
        aria-hidden
      >
        SRINJOY
      </p>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-cream/10">
          {/* Col 1 — logo + tagline */}
          <div>
            <Link href="/" className="font-serif text-2xl tracking-[0.3em] text-cream font-medium block mb-4">
              SRINJOY
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed max-w-[220px]">
              Designing interiors that resonate — built from intention, shaped by story.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-8">
              {[
                { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
                { icon: <PinterestIcon />, label: 'Pinterest', href: '#' },
                { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
                { icon: <HouzzIcon />, label: 'Houzz', href: '#' },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-cream/40 hover:text-terracotta transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-cream/40 mb-6 font-medium">
              Navigation
            </p>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-cream/65 text-sm hover:text-cream transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-cream/40 mb-6 font-medium">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES_LIST.map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-cream/65 text-sm hover:text-cream transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-cream/40 mb-6 font-medium">
              Contact
            </p>
            <address className="not-italic space-y-3">
              <p className="text-cream/65 text-sm">
                Via Tortona 35<br />
                Milan, MI 20144<br />
                Italy
              </p>
              <p className="text-cream/65 text-sm">
                27 West 24th Street<br />
                New York, NY 10010<br />
                USA
              </p>
              <a href="mailto:hello@srinjoyinteriors.com" className="block text-cream/65 text-sm hover:text-terracotta transition-colors">
                hello@srinjoyinteriors.com
              </a>
              <a href="tel:+12125550100" className="block text-cream/65 text-sm hover:text-terracotta transition-colors">
                +1 (212) 555-0100
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">
            © 2025 Srinjoy Interiors. All rights reserved.
          </p>
          <p className="text-cream/30 text-xs tracking-wide">
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  )
}
