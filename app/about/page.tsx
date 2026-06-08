'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedText from '@/components/AnimatedText'
import { useCountUp } from '@/hooks/useCountUp'
import { useState, useRef } from 'react'

const FOUNDER = {
  name: 'Rudhvi',
  role: 'Founder & Principal Designer',
  bio: 'Rudhvi is the creative force behind Srinjoy Interiors — a designer who believes every space tells a story, and his job is to make sure it is the right one. With a deep understanding of spatial planning, materials, and the human experience of a room, he approaches each project as a unique conversation between client, context, and craft. His work spans residential transformations, boutique commercial spaces, and hospitality interiors, all unified by a commitment to thoughtful detail and enduring beauty.',
  photo: '/rudhvi.jpg',
  instagram: 'interiors_by_srinjoy',
}

const VALUES = [
  {
    number: '01',
    title: 'Material Honesty',
    body: 'We never hide the nature of a material or fake a finish. Stone is stone. Wood is wood. The richness comes from understanding what each material is and using it with complete confidence.',
  },
  {
    number: '02',
    title: 'Spatial Generosity',
    body: 'We resist the urge to fill. The most intelligent rooms have room to breathe — for light to move, for eyes to rest, for life to happen without navigating around furniture.',
  },
  {
    number: '03',
    title: 'Enduring Over Trending',
    body: 'We design for the long arc. A Srinjoy Interiors space should feel as right in twenty years as it does the day you move in. We invest in quality over novelty, permanence over fashion.',
  },
]

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-5xl md:text-6xl text-cream font-medium">
        {count}{suffix}
      </p>
      <p className="text-cream/50 text-sm mt-2 capitalize">{label}</p>
    </div>
  )
}

function StudioReel() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggle = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="relative aspect-video bg-charcoal overflow-hidden group">
      <video
        ref={videoRef}
        src="https://videos.pexels.com/video-files/13002564/13002564-hd_1920_1080_24fps.mp4"
        loop
        playsInline
        muted={false}
        className="w-full h-full object-cover opacity-80"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
        style={{ background: playing ? 'rgba(28,28,28,0.3)' : 'rgba(28,28,28,0.55)' }}
      >
        <button
          onClick={toggle}
          className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center hover:border-terracotta hover:bg-terracotta/20 transition-all duration-300"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
              <rect x="4" y="3" width="5" height="16" rx="1" />
              <rect x="13" y="3" width="5" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
              <path d="M5 3.5l14 7.5-14 7.5V3.5z" />
            </svg>
          )}
        </button>
      </div>
      {!playing && (
        <p className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-sm tracking-wider">
          Studio Reel — 2024
        </p>
      )}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85"
          alt="Srinjoy Interiors"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 max-w-3xl">
          <AnimatedText
            text="The Story of Srinjoy Interiors"
            className="font-serif text-5xl md:text-7xl text-white leading-tight"
            delay={0.3}
          />
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-charcoal/70 text-lg leading-[1.85] mb-8">
              Srinjoy Interiors was founded by Rudhvi with a single conviction: that the spaces we inhabit are not neutral. They shape how we think, how we relate to one another, how we feel at the beginning and end of every day.
            </p>
            <p className="text-charcoal/70 text-lg leading-[1.85]">
              Across hundreds of projects — private residences, boutique hotels, creative studios, and retail spaces — we have refined a process that places the client&apos;s story at the centre of every decision. We are not in the business of imposing a signature style. We are in the business of discovering and amplifying what is already latent in a place, a brief, a life.
            </p>
          </motion.div>

          <div>
            {/* Pull quote */}
            <motion.blockquote
              className="border-l-4 border-terracotta pl-8 py-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="font-serif italic text-2xl md:text-3xl text-charcoal leading-snug">
                &ldquo;A room is not finished when there is nothing left to add. It is finished when there is nothing left to remove.&rdquo;
              </p>
              <footer className="mt-6 text-charcoal/50 text-sm font-medium">
                — Rudhvi, Founder
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatBlock value={12} suffix=" Years" label="of practice" />
          <StatBlock value={340} suffix="+" label="projects" />
          <StatBlock value={8} suffix="" label="countries" />
          <StatBlock value={24} suffix="" label="awards" />
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-cream">
        <div className="mb-14">
          <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-3 font-medium">The People</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Who We Are</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <motion.div
            className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src={FOUNDER.photo}
              alt={FOUNDER.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Terracotta accent strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta" />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="font-serif text-4xl md:text-5xl text-charcoal mb-2">{FOUNDER.name}</h3>
            <p className="text-terracotta text-sm tracking-[0.2em] uppercase font-medium mb-8">
              {FOUNDER.role}
            </p>
            <p className="text-charcoal/65 text-base leading-[1.85] mb-6">
              {FOUNDER.bio}
            </p>
            <a
              href={`https://www.instagram.com/${FOUNDER.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/50 hover:text-terracotta transition-colors duration-200 group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @{FOUNDER.instagram}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Studio reel */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-offwhite">
        <div className="max-w-5xl mx-auto">
          <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-4 font-medium">Studio Reel</p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-10">
            Watch Our Work
          </h2>
          <StudioReel />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-cream">
        <div className="mb-14">
          <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-3 font-medium">Principles</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            What We Believe
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <span className="font-serif text-7xl font-bold text-charcoal/8 leading-none block mb-4">
                {value.number}
              </span>
              <h3 className="font-serif text-2xl text-charcoal mb-4">{value.title}</h3>
              <p className="text-charcoal/60 text-[0.9375rem] leading-relaxed">{value.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
