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
        "w-72 rounded-xl border border-border/60 bg-card/90 p-5 shadow-lg backdrop-blur-sm",
        className
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon ?? <Quote className="size-4" />}
      </div>

      <blockquote className="space-y-2">
        <p className="text-sm leading-6 font-medium text-card-foreground">
          {title}
        </p>

        {subtitle && (
          <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>
        )}

        {author && (
          <footer className="pt-2 text-xs font-semibold text-primary">
            {author}
          </footer>
        )}
      </blockquote>
    </div>
  )
}
