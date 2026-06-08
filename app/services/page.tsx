import type { Metadata } from 'next'
import AnimatedText from '@/components/AnimatedText'
import ServiceBlock from '@/components/ServiceBlock'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Srinjoy Interiors\' full range of interior design services — from complete transformations to strategic consultations.',
}

const SERVICE_BLOCKS = [
  {
    title: 'Full Interior Design',
    description:
      'Our signature offering takes a space from blank canvas to fully realised interior. We handle every decision — from structural configuration to the cushion on the daybed — guided at every step by your vision and our experience.',
    deliverables: [
      'Initial site survey and brief',
      'Concept development and mood boards',
      'Space planning and furniture layouts',
      'Material, finish, and palette specifications',
      'Contractor tender and management',
      'Final styling and handover',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=85',
    imageAlt: 'Full interior design project',
  },
  {
    title: 'Space Planning',
    description:
      'Great interiors begin with the right plan. Our space planning service optimises flow, natural light, and proportion — transforming awkward floor plans into spaces that feel inevitable. This service works as a standalone or as the foundation of a full design engagement.',
    deliverables: [
      'Existing floor plan analysis',
      'Flow and adjacency mapping',
      'Two or three layout options',
      'Furniture arrangement schematics',
      'Light and circulation studies',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=85',
    imageAlt: 'Space planning',
  },
  {
    title: 'Furniture Curation',
    description:
      'The objects in a room tell a story. Our furniture curation service builds a coherent, layered narrative using heritage pieces, emerging makers, and custom commissions. We source globally, think locally, and never repeat a scheme.',
    deliverables: [
      'Existing piece audit and edit',
      'Custom furniture design and commissioning',
      'Procurement and logistics management',
      'Artisan and maker introductions',
      'Placement and installation supervision',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85',
    imageAlt: 'Furniture curation',
  },
  {
    title: 'Renovation Consulting',
    description:
      'Navigating a renovation is complex. Our consulting service puts an experienced advocate on your side — interpreting architect drawings, managing contractor relationships, tracking budgets, and ensuring the design intent survives contact with the build process.',
    deliverables: [
      'Pre-renovation design audit',
      'Contractor briefing and tender support',
      'Weekly site inspections and reports',
      'Material and finish sign-off',
      'Snagging and final handover',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1000&q=85',
    imageAlt: 'Renovation consulting',
  },
  {
    title: 'Lighting Design',
    description:
      'Light is the medium through which all other design decisions are experienced. Our lighting design service creates layered schemes — ambient, task, accent, and architectural — that shift the mood of a space through the day and across different uses.',
    deliverables: [
      'Lighting concept and rationale',
      'Fixture specification (decorative and architectural)',
      'Circuit and control scheme',
      'Coordination with electrical contractor',
      'Commissioning and scene setting',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1000&q=85',
    imageAlt: 'Lighting design',
  },
  {
    title: 'Virtual Staging',
    description:
      'Before a single decision is locked in, see your space in photorealistic detail. Our virtual staging service produces CGI renders and immersive walkthroughs that let you experience, adjust, and approve the design with total confidence.',
    deliverables: [
      'Photorealistic still renders (up to 10 views)',
      'Virtual walkthrough video',
      'Two rounds of revisions',
      'Print-ready and digital files',
      'Presentation deck for approvals',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=85',
    imageAlt: 'Virtual staging',
  },
]

const PRICING = [
  {
    tier: 'Consultation',
    price: '$1,500',
    description: 'A focused two-hour session with a senior designer. Perfect for a second opinion or a clear starting point.',
    features: [
      '2-hour in-person or video session',
      'Written summary of recommendations',
      'Resource and supplier list',
      'Priority booking for full service',
    ],
    cta: 'Book a Session',
    highlight: false,
  },
  {
    tier: 'Full Service',
    price: 'From $25,000',
    description: 'Our complete design offering — concept through to completion — for a single room or a full floor.',
    features: [
      'Everything in Consultation',
      'Concept and space planning',
      'Material and furniture specification',
      'Contractor coordination',
      'Final styling',
    ],
    cta: 'Start a Project',
    highlight: true,
  },
  {
    tier: 'Turnkey',
    price: 'From $75,000',
    description: 'We handle everything — including procurement, contractor management, and installation — so you arrive to a finished home.',
    features: [
      'Everything in Full Service',
      'Full procurement and logistics',
      'Project management throughout',
      'Photoshoot on completion',
      'One-year aftercare',
    ],
    cta: 'Enquire Now',
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-cream">
        <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-5 font-medium">
          What We Offer
        </p>
        <AnimatedText
          text="Craft at Every Scale"
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal max-w-3xl leading-tight"
          delay={0.2}
        />
        <p className="mt-8 text-charcoal/60 text-lg max-w-2xl leading-relaxed">
          From a single room reoriented around natural light to a hotel lobby reimagined from the ground up — every Srinjoy Interiors project begins with careful listening and ends with spaces that outlast their moment.
        </p>
      </section>

      {/* Service blocks */}
      <section className="bg-offwhite">
        {SERVICE_BLOCKS.map((service, i) => (
          <div key={service.title} className="border-t border-charcoal/8 first:border-t-0">
            <ServiceBlock
              {...service}
              reverse={i % 2 !== 0}
              index={i}
            />
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-cream">
        <div className="text-center mb-16">
          <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-4 font-medium">Investment</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Transparent Pricing
          </h2>
          <p className="text-charcoal/55 mt-4 max-w-lg mx-auto text-[0.9375rem]">
            Every project is unique. The tiers below are starting points — we&apos;ll give you a precise quote after your initial consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING.map((plan) => (
            <div
              key={plan.tier}
              className={`p-10 ${
                plan.highlight
                  ? 'bg-charcoal text-cream'
                  : 'bg-offwhite border border-charcoal/10'
              }`}
            >
              <p className={`text-xs tracking-[0.25em] uppercase mb-4 font-medium ${plan.highlight ? 'text-terracotta' : 'text-charcoal/50'}`}>
                {plan.tier}
              </p>
              <p className={`font-serif text-3xl mb-4 ${plan.highlight ? 'text-cream' : 'text-charcoal'}`}>
                {plan.price}
              </p>
              <p className={`text-sm leading-relaxed mb-8 ${plan.highlight ? 'text-cream/70' : 'text-charcoal/60'}`}>
                {plan.description}
              </p>
              <ul className="space-y-3 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className={`text-sm flex items-start gap-2.5 ${plan.highlight ? 'text-cream/80' : 'text-charcoal/70'}`}>
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-terracotta shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`block w-full text-center py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-terracotta text-white hover:bg-terracotta/85'
                    : 'border border-charcoal/30 text-charcoal hover:border-terracotta hover:text-terracotta'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
