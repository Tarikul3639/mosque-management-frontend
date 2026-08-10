import { useId } from "react"

/* ---------- Islamic geometric pattern (khatam star + girih tessellation) ---------- */
export function StarPattern(props: React.SVGProps<SVGSVGElement>) {
  const id = useId()

  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <defs>
        <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
          <g stroke="currentColor" strokeWidth="1.2" fill="none">
            {/* ✨ Main 8-pointed star (Khatam / Rub el Hizb ۞) */}
            <rect x="24" y="24" width="32" height="32" />
            <rect x="24" y="24" width="32" height="32" transform="rotate(45 40 40)" />

            {/* Inner rosette circle + center dot */}
            <circle cx="40" cy="40" r="9" />
            <circle cx="40" cy="40" r="2.5" fill="currentColor" stroke="none" />

            {/* Girih connecting lines (star theke corner porjonto) */}
            <path d="M24 24 L14 14 M56 24 L66 14 M56 56 L66 66 M24 56 L14 66" />

            {/* Corner stars (tile join e full star toiri hoy) */}
            <g>
              <rect x="-7" y="-7" width="14" height="14" />
              <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
            </g>
            <g transform="translate(80 0)">
              <rect x="-7" y="-7" width="14" height="14" />
              <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
            </g>
            <g transform="translate(0 80)">
              <rect x="-7" y="-7" width="14" height="14" />
              <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
            </g>
            <g transform="translate(80 80)">
              <rect x="-7" y="-7" width="14" height="14" />
              <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
            </g>

            {/* Edge diamonds (interlocking feel) */}
            <path d="M40 -6 L46 0 L40 6 L34 0 Z" />
            <path d="M40 74 L46 80 L40 86 L34 80 Z" />
            <path d="M-6 40 L0 46 L6 40 L0 34 Z" />
            <path d="M74 40 L80 46 L86 40 L80 34 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  )
}