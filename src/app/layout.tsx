import { Geist_Mono, Inter } from "next/font/google"
import ProviderWrapper from "./provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        inter.variable,
        fontMono.variable
      )}
    >
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  )
}
