'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CLIPS = [
  {
    src: 'https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4',
    label: 'Dining',
    title: 'The Art of Gathering',
  },
  {
    src: 'https://videos.pexels.com/video-files/29466038/12684293_1920_1080_60fps.mp4',
    label: 'Bedroom',
    title: 'Rest, Reinvented',
  },
  {
    src: 'https://videos.pexels.com/video-files/13002564/13002564-hd_1920_1080_24fps.mp4',
    label: 'Living',
    title: 'Spaces for Living',
  },
  {
    src: 'https://videos.pexels.com/video-files/8403602/8403602-hd_1920_1080_30fps.mp4',
    label: 'Bath',
    title: 'Quiet Luxury',
  },
  {
    src: 'https://videos.pexels.com/video-files/17224760/17224760-hd_1920_1080_30fps.mp4',
    label: 'Exterior',
    title: 'Architecture & Light',
  },
]

const CLIP_DURATION = 8000 // ms each clip plays before advancing

export default function VideoShowcase() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef<number>(0)
  const accumulatedRef = useRef<number>(0)

  const goTo = useCallback((index: number) => {
    setActive(index)
    setProgress(0)
    accumulatedRef.current = 0
    startRef.current = Date.now()
  }, [])

  const goNext = useCallback(() => {
    goTo((active + 1) % CLIPS.length)
  }, [active, goTo])

  // Progress ticker
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      accumulatedRef.current += Date.now() - startRef.current
      return
    }

    startRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = accumulatedRef.current + (Date.now() - startRef.current)
      const pct = Math.min((elapsed / CLIP_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) goNext()
    }, 50)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [active, paused, goNext])

  // Play the video when clip changes
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    if (!paused) v.play().catch(() => {})
  }, [active, paused])

  return (
    <section className="relative bg-charcoal overflow-hidden" style={{ height: '85vh', minHeight: 520 }}>
      {/* Videos */}
      <AnimatePresence initial={false}>
        <motion.video
          key={active}
          ref={videoRef}
          src={CLIPS[active].src}
          autoPlay={!paused}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        />
      </AnimatePresence>

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/30" />

      {/* Centre title */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.h2
            key={active}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white text-center px-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
          >
            {CLIPS[active].title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Top label */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-20">
        <p className="text-white/50 text-xs tracking-[0.35em] uppercase">
          Interior Design Showcase
        </p>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 pb-10">
        {/* Clip tabs */}
        <div className="flex items-end gap-4 md:gap-6 mb-6">
          {CLIPS.map((clip, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`group flex flex-col gap-2 transition-opacity duration-200 ${
                i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
              aria-label={`Play ${clip.label} clip`}
            >
              {/* Progress bar */}
              <div className="w-12 md:w-20 h-px bg-white/30 rounded-full overflow-hidden">
                {i === active && (
                  <motion.div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {i < active && (
                  <div className="h-full w-full bg-white/60 rounded-full" />
                )}
              </div>
              <span className="text-white text-xs tracking-wider uppercase">
                {clip.label}
              </span>
            </button>
          ))}

          {/* Spacer + pause button */}
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setPaused((p) => !p)}
              className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 transition-colors"
              aria-label={paused ? 'Play' : 'Pause'}
            >
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                  <path d="M3 2l7 4-7 4V2z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                  <rect x="2" y="2" width="3" height="8" rx="0.5" />
                  <rect x="7" y="2" width="3" height="8" rx="0.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
