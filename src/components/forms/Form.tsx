"use client"

import { cn } from "@/lib/utils"

interface FormProps {
  form: {
    handleSubmit: () => Promise<void> | void
  }
  children: React.ReactNode
  className?: string
}

export function Form({ form, children, className }: FormProps) {
  return (
    <form
      className={cn("space-y-6", className)}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()

        void form.handleSubmit()
      }}
    >
      {children}
    </form>
  )
}
