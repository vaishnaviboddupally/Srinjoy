export default function Marquee() {
  const text =
    '  Residential  ·  Commercial  ·  Hospitality  ·  Renovation  ·  Furniture Curation  ·  Lighting Design  ·  '

  return (
    <div className="bg-sage overflow-hidden py-4 select-none border-y border-sage/50">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marqueeScroll 32s linear infinite' }}
        aria-hidden="true"
      >
        {/* Two identical copies so -50% translateX creates a seamless loop */}
        <span className="font-serif italic text-charcoal/90 text-base md:text-lg shrink-0">
          {text}
        </span>
        <span className="font-serif italic text-charcoal/90 text-base md:text-lg shrink-0">
          {text}
        </span>
      </div>
    </div>
  )
}
