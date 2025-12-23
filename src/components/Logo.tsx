export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Casa */}
      <path 
        d="M24 4L4 20V44H18V32H30V44H44V20L24 4Z" 
        fill="url(#gradient)" 
        stroke="white" 
        strokeWidth="2"
      />
      {/* Telhado highlight */}
      <path 
        d="M24 4L4 20H44L24 4Z" 
        fill="url(#gradient-dark)"
      />
      {/* Checkmark circle */}
      <circle 
        cx="36" 
        cy="12" 
        r="10" 
        fill="#22c55e" 
        stroke="white" 
        strokeWidth="2"
      />
      {/* Checkmark */}
      <path 
        d="M31 12L34 15L41 8" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient id="gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e"/>
          <stop offset="1" stopColor="#16a34a"/>
        </linearGradient>
        <linearGradient id="gradient-dark" x1="4" y1="4" x2="44" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16a34a"/>
          <stop offset="1" stopColor="#15803d"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="font-display font-bold text-xl leading-tight text-gray-900">
          Imóvel
        </span>
        <span className="font-display font-bold text-xl leading-tight text-brand-600">
          Limpo
        </span>
      </div>
    </div>
  )
}

export function LogoHorizontal({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo className="w-8 h-8" />
      <span className="font-display font-bold text-xl">
        <span className="text-gray-900">Imóvel</span>
        {' '}
        <span className="text-brand-600">Limpo</span>
      </span>
    </div>
  )
}

