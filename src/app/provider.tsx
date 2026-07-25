"use client"

import type { ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "@/store"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

interface ProviderProps {
    children: ReactNode
}

export default function ProviderWrapper({ children }: ProviderProps) {
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
            </Provider>
        </TooltipProvider>
    )
}
