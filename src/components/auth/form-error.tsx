"use client";

import { AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FormErrorProps {
    message?: string;
}

export default function FormError({
    message,
}: FormErrorProps) {
    return (
        <AnimatePresence initial={false}>
            {message && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -10,
                        height: 0,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        height: "auto",
                    }}
                    exit={{
                        opacity: 0,
                        y: -10,
                        height: 0,
                    }}
                    transition={{
                        duration: 0.25,
                        ease: "easeOut",
                    }}
                    className="overflow-hidden"
                >
                    <div
                        className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
                        role="alert"
                    >
                        <AlertCircle className="mt-0.5 size-4 shrink-0" />
                        <span>{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}