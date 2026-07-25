"use client"

import type { ReactNode } from "react"
import { Provider } from "react-redux"

import { store } from "@/store"

import { FeatureDialog } from "@/components/common/feature-dialog"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

interface ProviderProps {
    children: ReactNode
}

export default function ProviderWrapper({
    children,
}: ProviderProps) {
    return (
        <TooltipProvider>
            <Provider store={store}>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        classNames: {
                            description: "text-muted-foreground",
                        },
                    }}
                />

                {children}

                <FeatureDialog />
            </Provider>
        </TooltipProvider>
    )
}