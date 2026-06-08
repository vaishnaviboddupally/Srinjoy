'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'
import Link from 'next/link'

// Confirmed working Pexels interior design videos (1920×1080)
const VIDEO_SOURCES = [
  // Elegant luxury dining room — TR Studio
  'https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4',
  // Elegant luxury bedroom — TR Studio
  'https://videos.pexels.com/video-files/29466038/12684293_1920_1080_60fps.mp4',
]

// Shown while video buffers or if all sources fail
const POSTER =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=85'

export default function Hero() {
  const [srcIndex, setSrcIndex] = useState(0)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  const handleError = () => {
    if (srcIndex < VIDEO_SOURCES.length - 1) {
      setSrcIndex((i) => i + 1)
    } else {
      setVideoFailed(true)
    }
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

      {/* Poster — always visible, video crossfades over it */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${POSTER}')` }}
        aria-hidden
      />

      {/* Video */}
      {!videoFailed && (
        <video
          key={VIDEO_SOURCES[srcIndex]}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
          src={VIDEO_SOURCES[srcIndex]}
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setVideoReady(true)}
          onError={handleError}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/50" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6 font-medium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Interior Design Studio
        </motion.p>

        <AnimatedText
          text="Design That Feels Like Home"
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.08] justify-center text-center"
          delay={0.3}
        />

        <motion.p
          className="text-white/75 mt-6 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Award-winning interiors crafted for the way you live.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Link
            href="/work"
            className="inline-block px-8 py-3.5 border border-white text-white text-sm font-medium tracking-wide rounded-full hover:bg-terracotta hover:border-terracotta transition-all duration-300"
          >
            Explore Our Work
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="text-white/50 text-xs tracking-[0.25em] uppercase">Scroll</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white/50"
          style={{ animation: 'arrowBounce 1.6s ease-in-out infinite' }}
        >
          <path
            d="M10 3v14M4 11l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Side label */}
      <motion.p
        className="absolute right-8 top-1/2 -translate-y-1/2 writing-vertical text-white/30 text-xs tracking-[0.3em] uppercase hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        Est. 2012 — Milan & New York
      </motion.p>
    </section>
  )
}
