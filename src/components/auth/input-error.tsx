"use client"

import { AlertCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface InputErrorProps {
    message?: string
}

export default function InputError({ message }: InputErrorProps) {
    return (
        <AnimatePresence initial={false}>
            {message && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -6,
                        height: 0,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        height: "auto",
                    }}
                    exit={{
                        opacity: 0,
                        y: -6,
                        height: 0,
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut",
                    }}
                    className="overflow-hidden"
                >
                    <div
                        className="flex items-center gap-1.5 pt-1 text-xs text-destructive"
                        role="alert"
                    >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
