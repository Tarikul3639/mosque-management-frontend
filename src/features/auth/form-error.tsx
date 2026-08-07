"use client"

import { AlertCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface FormErrorProps {
  message?: string
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {message && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
            height: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            y: -8,
            height: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="overflow-hidden"
        >
          <div
            role="alert"
            aria-live="polite"
            className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />

            <span className="leading-6">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
