'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
  triggerOnView?: boolean
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  once = true,
  triggerOnView = false,
}: AnimatedTextProps) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 48, skewY: 2 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        type: 'spring' as const,
        damping: 14,
        stiffness: 100,
      },
    },
  }

  if (triggerOnView) {
    return (
      <motion.div
        className={`overflow-hidden flex flex-wrap ${className}`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block overflow-hidden mr-[0.3em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block overflow-hidden mr-[0.3em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
