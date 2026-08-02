// components/common/avatar-upload/avatar-progress.tsx

"use client"

import { cn } from "@/lib/utils"

interface AvatarProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function AvatarProgress({
  progress,
  size = 144,
  strokeWidth = 4,
  className,
}: AvatarProgressProps) {
  const radius = (size - strokeWidth) / 2

  const circumference = 2 * Math.PI * radius

  const offset =
    circumference - (Math.min(Math.max(progress, 0), 100) / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      className={cn(
        "pointer-events-none absolute inset-0 -rotate-90",
        className
      )}
    >
      {/* Background Ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-border"
      />

      {/* Progress Ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-primary transition-all duration-300 ease-linear"
      />
    </svg>
  )
}
