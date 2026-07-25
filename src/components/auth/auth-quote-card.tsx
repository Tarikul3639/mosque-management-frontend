import { ReactNode } from "react"
import { Quote } from "lucide-react"

import { cn } from "@/lib/utils"

interface AuthQuoteCardProps {
  icon?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  author?: ReactNode
  className?: string
}

export default function AuthQuoteCard({
  icon,
  title,
  subtitle,
  author,
  className,
}: AuthQuoteCardProps) {
  return (
    <div
      className={cn(
        "w-72 rounded-lg border border-white/30 bg-white/85 p-5 shadow-lg backdrop-blur-md",
        className
      )}
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
        {icon ?? <Quote className="size-4 text-primary" />}
      </div>

      <blockquote className="space-y-1.5">
        <p className="text-sm leading-6 font-medium text-foreground">{title}</p>

        {subtitle && (
          <p className="text-sm leading-6 font-semibold text-foreground">
            {subtitle}
          </p>
        )}

        {author && (
          <footer className="pt-1 text-xs font-semibold text-primary">
            {author}
          </footer>
        )}
      </blockquote>
    </div>
  )
}
