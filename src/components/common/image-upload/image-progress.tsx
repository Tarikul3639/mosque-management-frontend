"use client"

import { cn } from "@/lib/utils"

interface ImageProgressProps {
    progress: number
    size?: number
    strokeWidth?: number
    className?: string
}

export function ImageProgress({
    progress,
    size = 96,
    strokeWidth = 4,
    className,
}: ImageProgressProps) {
    const value = Math.min(Math.max(progress, 0), 100)
    const center = size / 2
    const radius = center - strokeWidth
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={cn(
                "pointer-events-none -rotate-90 transform",
                className
            )}
        >
            {/* Background Track */}
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                className="stroke-muted-foreground/20"
            />

            {/* Animated Progress Value */}
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="stroke-primary transition-all duration-300 ease-linear"
            />
        </svg>
    )
}