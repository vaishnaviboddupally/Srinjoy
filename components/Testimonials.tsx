'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Srinjoy Interiors transformed our apartment into something we genuinely didn't think was possible. Every detail — the way light falls across the stone countertop, the proportions of the living room — feels considered and inevitable.",
    client: 'Isabelle Fontaine',
    location: 'Paris, France',
    rating: 5,
  },
  {
    id: 2,
    quote:
      "We hired Srinjoy Interiors for our boutique hotel in Lisbon and they exceeded every expectation. The guests consistently name the interiors as a reason they return. That's the highest compliment I can imagine.",
    client: 'Marco da Silva',
    location: 'Lisbon, Portugal',
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Working with Rudhvi felt like a genuine creative collaboration. He listened deeply, challenged our assumptions in the best way, and delivered a home that is both beautiful and completely us.",
    client: 'Rachel & Tom Ashworth',
    location: 'London, UK',
    rating: 5,
  },
  {
    id: 4,
    quote:
      "The Verdant Retreat project pushed the boundaries of what a spa interior can be. Srinjoy Interiors brought a level of material intelligence and spatial storytelling that has set a new benchmark for our brand.",
    client: 'Akira Tanaka',
    location: 'Tokyo, Japan',
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#C4714A">
          <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStart.current = {
      x: e.pageX - (scrollRef.current?.offsetLeft ?? 0),
      scrollLeft: scrollRef.current?.scrollLeft ?? 0,
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0)
    const walk = (x - dragStart.current.x) * 1.6
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - walk
  }

  const onDragEnd = () => setIsDragging(false)

  const onTouchStart = (e: React.TouchEvent) => {
    dragStart.current = {
      x: e.touches[0].pageX - (scrollRef.current?.offsetLeft ?? 0),
      scrollLeft: scrollRef.current?.scrollLeft ?? 0,
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    const x = e.touches[0].pageX - (scrollRef.current.offsetLeft ?? 0)
    const walk = (x - dragStart.current.x) * 1.2
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - walk
  }

  return (
    <section className="bg-charcoal py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-14">
        <div className="flex items-end justify-between">
          <div>
            <motion.p
              className="text-terracotta text-sm tracking-[0.25em] uppercase mb-3 font-medium"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Client Voices
            </motion.p>
            <motion.h2
              className="font-serif text-4xl md:text-5xl text-cream leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              What Our Clients Say
            </motion.h2>
          </div>
          <p className="hidden md:block text-cream/30 text-sm">
            Drag to explore →
          </p>
        </div>
      </div>

      {/* Drag scroll carousel */}
      <div
        ref={scrollRef}
        className={`flex gap-6 overflow-x-scroll hide-scrollbar pl-6 md:pl-12 lg:pl-20 pr-6 md:pr-12 pb-2 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            className="flex-shrink-0 w-[min(480px,85vw)] bg-charcoal border border-cream/10 p-10"
            style={{ scrollSnapAlign: 'start' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Stars count={t.rating} />
            <p className="font-serif italic text-cream/90 text-lg leading-relaxed mb-8">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center">
                <span className="font-serif text-terracotta text-sm font-bold">
                  {t.client.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-cream text-sm font-medium">{t.client}</p>
                <p className="text-cream/40 text-xs mt-0.5">{t.location}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-6 md:w-12" aria-hidden />
      </div>
    </section>
  )
}
