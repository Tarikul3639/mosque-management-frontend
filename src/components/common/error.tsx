"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/icons/Logo"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex max-w-md flex-col items-center space-y-6 px-6 text-center">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-destructive/20 bg-destructive/5">
            <Logo className="h-12 w-auto opacity-40" />
          </div>

          <div className="text-destructive-foreground absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-destructive shadow">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </h1>

          <p className="text-sm text-muted-foreground">
            An unexpected error occurred while processing your request. Please
            try again.
          </p>
        </div>

        <Button onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  )
}
