import { Geist_Mono } from "next/font/google"

import ProviderWrapper from "./provider"
import { geist, bangla } from "./fonts"

import { cn } from "@/lib/utils"

import "./globals.css"

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geist.variable,
        bangla.variable,
        fontMono.variable
      )}
    >
      <body className={cn("font-sans", bangla.className)}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  )
}