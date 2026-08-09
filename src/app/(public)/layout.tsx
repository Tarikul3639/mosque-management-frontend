// src/app/(public)/layout.tsx

import type { Metadata } from "next"
import type { ReactNode } from "react"

import { Navbar } from "@/components/layouts/public/navbar"
import { Footer } from "@/components/layouts/public/footer"

export const metadata: Metadata = {
  title: {
    default: "নামা রাথুরা বাইতুল আমান জামে মসজিদ",
    template: "%s | নামা রাথুরা বাইতুল আমান জামে মসজিদ",
  },

  description:
    "নামা রাথুরা বাইতুল আমান জামে মসজিদের অফিসিয়াল ওয়েবসাইট। নামাজের সময়সূচী, অনুদান, কমিটি, পরিবার, প্রকল্প এবং মসজিদের সকল তথ্য একসাথে।",

  openGraph: {
    title: "নামা রাথুরা বাইতুল আমান জামে মসজিদ",
    description:
      "মসজিদের অফিসিয়াল ওয়েবসাইট। নামাজের সময়সূচী, অনুদান, কমিটি, পরিবার এবং প্রকল্প সম্পর্কিত সকল তথ্য।",
    type: "website",
    locale: "bn_BD",
  },
}

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background mx-auto">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
