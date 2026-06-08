'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const outerX = useMotionValue(-100)
  const outerY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.4 }
  const springX = useSpring(outerX, springConfig)
  const springY = useSpring(outerY, springConfig)

  const dotSpringConfig = { damping: 30, stiffness: 400, mass: 0.1 }
  const dotSpringX = useSpring(dotX, dotSpringConfig)
  const dotSpringY = useSpring(dotY, dotSpringConfig)

  const isTouch = useRef(false)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }
    isTouch.current = false

    const move = (e: MouseEvent) => {
      outerX.set(e.clientX)
      outerY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const checkPointer = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setIsPointer(
        !!(el.closest('a') ||
          el.closest('button') ||
          el.closest('[data-cursor]') ||
          window.getComputedStyle(el).cursor === 'pointer')
      )
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', checkPointer)
    document.addEventListener('mouseleave', () => setIsVisible(false))
    document.addEventListener('mouseenter', () => setIsVisible(true))

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', checkPointer)
    }
  }, [outerX, outerY, dotX, dotY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-terracotta"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  )
}
