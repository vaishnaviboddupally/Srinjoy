'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Replace with Rudhvi's actual WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '919999999999'
const WHATSAPP_MESSAGE = 'Hi Rudhvi! I came across Srinjoy Interiors and would love to discuss a project.'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[300] flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.span
                className="bg-charcoal text-cream text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Chat on WhatsApp
              </motion.span>
            )}
          </AnimatePresence>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-black/20 hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
              <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.65 6.35L3 29l6.83-1.63A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.05.97.99-3.94-.25-.4A10.56 10.56 0 0 1 5.4 16C5.4 9.63 10.63 4.4 16 4.4S26.6 9.63 26.6 16 21.37 26.6 16 26.6zm5.8-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.56-1.57-.95-.84-1.58-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.6-.37z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
