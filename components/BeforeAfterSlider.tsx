'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(Math.max(pct, 2), 98))
  }, [])

  const onMouseDown = () => { isDragging.current = true }
  const onMouseUp = () => { isDragging.current = false }
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden aspect-[16/9] select-none"
      style={{ cursor: 'ew-resize' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After image (full width, background) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover pointer-events-none"
        sizes="100vw"
        draggable={false}
      />

      {/* Before image (clipped to left of slider) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover pointer-events-none"
          sizes="100vw"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 6L2 8l3 2M11 6l3 2-3 2" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
        Before
      </span>
      <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
        After
      </span>
    </div>
  )
}
