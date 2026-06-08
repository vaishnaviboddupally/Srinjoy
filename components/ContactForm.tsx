'use client'

import { useState, useTransition, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendContactEmail } from '@/app/actions/contact'

function FloatInput({
  label,
  name,
  type = 'text',
  required = false,
  className = '',
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  className?: string
}) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full border-b bg-transparent pt-6 pb-2 text-charcoal focus:outline-none transition-colors duration-200 text-[0.9375rem] ${
          focused ? 'border-terracotta' : 'border-charcoal/25 hover:border-charcoal/50'
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          active
            ? 'top-0 text-xs tracking-wider text-terracotta'
            : 'top-4 text-charcoal/50 text-sm'
        }`}
      >
        {label}
        {required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
    </div>
  )
}

function FloatSelect({
  label,
  name,
  options,
  required = false,
}: {
  label: string
  name: string
  options: string[]
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <select
        name={name}
        id={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full border-b bg-transparent pt-6 pb-2 text-charcoal focus:outline-none transition-colors duration-200 text-[0.9375rem] appearance-none ${
          focused ? 'border-terracotta' : 'border-charcoal/25 hover:border-charcoal/50'
        }`}
        style={{ cursor: 'pointer' }}
      >
        <option value="" disabled />
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          active
            ? 'top-0 text-xs tracking-wider text-terracotta'
            : 'top-4 text-charcoal/50 text-sm'
        }`}
      >
        {label}
        {required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
      <div className="absolute right-0 bottom-3 pointer-events-none text-charcoal/40">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

function FloatTextarea({
  label,
  name,
  required = false,
  rows = 4,
}: {
  label: string
  name: string
  required?: boolean
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        name={name}
        id={name}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full border-b bg-transparent pt-7 pb-2 text-charcoal focus:outline-none transition-colors duration-200 text-[0.9375rem] resize-none ${
          focused ? 'border-terracotta' : 'border-charcoal/25 hover:border-charcoal/50'
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          active
            ? 'top-0 text-xs tracking-wider text-terracotta'
            : 'top-4 text-charcoal/50 text-sm'
        }`}
      >
        {label}
        {required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
    </div>
  )
}

export default function ContactForm() {
  const [budget, setBudget] = useState(50000)
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('budget', String(budget))

    startTransition(async () => {
      const res = await sendContactEmail(formData)
      setResult(res)
      if (res.success) formRef.current?.reset()
    })
  }

  if (result?.success) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 mb-8">
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <circle cx="40" cy="40" r="38" stroke="#C4714A" strokeWidth="1.5" />
            <motion.path
              d="M24 40L35 51L56 29"
              stroke="#C4714A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
        </div>
        <h3 className="font-serif text-3xl text-charcoal mb-3">Thank you.</h3>
        <p className="text-charcoal/60 text-base max-w-sm">
          We&apos;ll be in touch within 24 hours to schedule your initial consultation.
        </p>
        <button
          className="mt-8 text-sm text-terracotta underline underline-offset-4 hover:text-terracotta/70 transition-colors"
          onClick={() => setResult(null)}
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <FloatInput label="Full Name" name="name" required />
        <FloatInput label="Email Address" name="email" type="email" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <FloatInput label="Phone Number" name="phone" type="tel" />
        <FloatSelect
          label="Project Type"
          name="projectType"
          required
          options={['Residential', 'Commercial', 'Hospitality', 'Renovation', 'Other']}
        />
      </div>

      {/* Budget slider */}
      <div className="pt-2">
        <p className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-4">
          Budget Range
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-charcoal/40 shrink-0">$10k</span>
          <input
            type="range"
            name="budget"
            min="10000"
            max="500000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs text-charcoal/40 shrink-0">$500k+</span>
        </div>
        <p className="text-center font-serif text-2xl text-charcoal mt-3">
          {budget >= 500000 ? '$500,000+' : `$${budget.toLocaleString()}`}
        </p>
      </div>

      <FloatTextarea
        label="Tell us about your project"
        name="description"
        required
        rows={5}
      />

      {/* File upload */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-3">
          Inspiration Images (optional)
        </p>
        <label className="flex items-center gap-3 border border-dashed border-charcoal/25 p-4 rounded hover:border-terracotta/50 transition-colors cursor-pointer group">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-charcoal/40 group-hover:text-terracotta transition-colors shrink-0">
            <path d="M10 3v11M5 8l5-5 5 5M3 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm text-charcoal/50 group-hover:text-charcoal/70 transition-colors">
            Upload files — JPG, PNG, PDF up to 10MB each
          </span>
          <input type="file" name="files" multiple accept="image/*,.pdf" className="sr-only" />
        </label>
      </div>

      {/* Error */}
      <AnimatePresence>
        {result?.error && (
          <motion.p
            className="text-red-500 text-sm"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {result.error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-terracotta text-white text-sm font-medium tracking-wide rounded-full hover:bg-terracotta/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/25"
      >
        {isPending ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  )
}
