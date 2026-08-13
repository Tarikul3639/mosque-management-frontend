import { useId } from "react"

export function Lantern() {
  const id = useId()

  return (
    /* Lantern size reduced: h-44 w-32 -> h-28 w-20 */
    <div className="relative h-28 w-20">
      {/* glow */}
      <div className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/25 blur-2xl" />

      <svg
        viewBox="0 0 120 170"
        className="relative h-full w-full drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]"
      >
        <defs>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8a5a19" />
            <stop offset="30%" stopColor="#e9b949" />
            <stop offset="50%" stopColor="#f8e08e" />
            <stop offset="70%" stopColor="#e9b949" />
            <stop offset="100%" stopColor="#8a5a19" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#fff3c4" />
            <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* hanging ring + neck */}
        <circle
          cx="60"
          cy="10"
          r="6"
          fill="none"
          stroke={`url(#${id}-gold)`}
          strokeWidth="3"
        />
        <rect
          x="56"
          y="16"
          width="8"
          height="8"
          rx="2"
          fill={`url(#${id}-gold)`}
        />

        {/* dome */}
        <path
          d="M60 24c-16 0-26 10-28 22h56c-2-12-12-22-28-22z"
          fill={`url(#${id}-gold)`}
        />
        <rect
          x="28"
          y="46"
          width="64"
          height="8"
          rx="3"
          fill={`url(#${id}-gold)`}
        />

        {/* body */}
        <path d="M32 54h56l-6 78H38z" fill={`url(#${id}-gold)`} />
        {/* glass */}
        <path d="M40 60h40l-5 66H45z" fill={`url(#${id}-glow)`} />
        {/* frame bars */}
        <path
          d="M52 60l-2 66M68 60l2 66"
          stroke="#8a5a19"
          strokeWidth="2"
          opacity=".5"
        />
        {/* flame */}
        <ellipse cx="60" cy="100" rx="7" ry="12" fill="#fffbeb" opacity=".95" />

        {/* base */}
        <rect
          x="34"
          y="132"
          width="52"
          height="8"
          rx="3"
          fill={`url(#${id}-gold)`}
        />
        <path d="M42 140h36l-6 14H48z" fill={`url(#${id}-gold)`} />
        <circle cx="60" cy="160" r="4" fill={`url(#${id}-gold)`} />
      </svg>
    </div>
  )
}
