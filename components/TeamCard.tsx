import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flip-card h-[440px]">
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <p className="font-serif text-xl text-white">{member.name}</p>
              <p className="text-cream/60 text-sm mt-1 tracking-wide">{member.role}</p>
            </div>
            {/* Hover hint */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back bg-terracotta p-8 flex flex-col justify-center">
          <span className="font-serif text-5xl text-white/10 font-bold leading-none mb-4">
            {member.name.charAt(0)}
          </span>
          <p className="font-serif text-xl text-white mb-1">{member.name}</p>
          <p className="text-white/70 text-sm mb-6 tracking-wide uppercase text-xs">
            {member.role}
          </p>
          <p className="text-white/85 text-sm leading-relaxed">{member.bio}</p>
        </div>
      </div>
    </div>
  )
}
