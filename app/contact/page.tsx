import type { Metadata } from 'next'
import AnimatedText from '@/components/AnimatedText'
import ContactForm from '@/components/ContactForm'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Begin your project with Srinjoy Interiors. Tell us about your space and let\'s start a conversation.',
}

export default function ContactPage() {
  return (
    <main className="pt-28 pb-24 bg-cream">
      {/* Header */}
      <section className="px-6 md:px-12 lg:px-20 pb-16 border-b border-charcoal/8">
        <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-5 font-medium">
          Get in Touch
        </p>
        <AnimatedText
          text="Let's Create Something Remarkable"
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-3xl leading-tight"
          delay={0.2}
        />
      </section>

      {/* Two-column layout */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 xl:gap-24">
          {/* Left: Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right: Info */}
          <div className="space-y-10">
            {/* Studio hours */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-5 font-medium">
                Studio Hours
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Monday — Friday</span>
                  <span className="text-charcoal font-medium">9:00 — 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Saturday</span>
                  <span className="text-charcoal font-medium">By appointment</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Sunday</span>
                  <span className="text-charcoal/40">Closed</span>
                </div>
              </div>
            </div>

            {/* Milan office */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-4 font-medium">
                Milan Studio
              </p>
              <address className="not-italic text-sm text-charcoal/70 space-y-1.5 leading-relaxed">
                <p>Via Tortona 35</p>
                <p>Milan, MI 20144</p>
                <p>Italy</p>
                <a href="tel:+390223456789" className="block mt-2 text-charcoal hover:text-terracotta transition-colors">
                  +39 02 2345 6789
                </a>
              </address>
            </div>

            {/* New York office */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-4 font-medium">
                New York Studio
              </p>
              <address className="not-italic text-sm text-charcoal/70 space-y-1.5 leading-relaxed">
                <p>27 West 24th Street</p>
                <p>New York, NY 10010</p>
                <p>United States</p>
                <a href="tel:+12125550100" className="block mt-2 text-charcoal hover:text-terracotta transition-colors">
                  +1 (212) 555-0100
                </a>
              </address>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-3 font-medium">
                Email
              </p>
              <a
                href="mailto:hello@forma-studio.com"
                className="text-sm text-charcoal hover:text-terracotta transition-colors"
              >
                hello@forma-studio.com
              </a>
            </div>

            {/* Map placeholder */}
            <div className="relative bg-sage/20 aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-charcoal/30">
                  <path d="M16 3C11 3 7 7 7 12c0 7.5 9 17 9 17s9-9.5 9-17c0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <p className="text-charcoal/30 text-xs tracking-wider uppercase">
                  Via Tortona 35, Milan
                </p>
              </div>
              {/* Styled grid lines to suggest a map */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid slice"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="#1C1C1C" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="300" stroke="#1C1C1C" strokeWidth="0.5" />
                ))}
                <circle cx="200" cy="150" r="6" fill="#C4714A" />
                <circle cx="200" cy="150" r="14" fill="#C4714A" fillOpacity="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 lg:px-20 pt-8 pb-16">
        <div className="max-w-3xl">
          <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            FAQ
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-12">
            Common Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>
    </main>
  )
}
