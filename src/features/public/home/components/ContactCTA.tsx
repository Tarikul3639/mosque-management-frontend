// src/components/common/ContactCTA.tsx

import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/config/routes"

/* -------------------------------------------------------------------------- */
/*                                Contact CTA                                 */
/* -------------------------------------------------------------------------- */

export function ContactCTA() {
  return (
    <section className="bg-muted px-4 py-8 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-background via-primary/95 to-primary shadow-2xl sm:rounded-4xl">
          {/* Glows */}
          <div className="pointer-events-none absolute -top-20 -left-32 h-60 w-60 rounded-full bg-primary/30 blur-3xl sm:h-80 sm:w-80" />
          <div className="pointer-events-none absolute -right-24 -bottom-20 h-56 w-56 rounded-full bg-chart-3/20 blur-3xl sm:h-72 sm:w-72" />

          {/* Background Illustration */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 flex items-center justify-center overflow-hidden sm:right-10 sm:bottom-10">
            <MessageCircle className="h-48 w-48 text-primary-foreground/5 sm:h-72 sm:w-72 sm:text-primary-foreground/10 md:h-80 md:w-80" />
          </div>

          {/* Bottom Wave */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-none">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block h-12 w-full text-primary-foreground/5 sm:h-20"
            >
              <path
                d="M0,0 C180,110 340,-30 520,45 C720,125 930,10 1200,60 L1200,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-16 lg:px-20 lg:py-24">
            <div className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3.5 py-1.5 backdrop-blur sm:px-5 sm:py-2">
              <span className="text-xs font-medium text-primary-foreground/90 sm:text-sm">
                আমরা আপনার পাশে আছি
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl text-balance text-2xl font-bold leading-tight text-primary-foreground sm:mt-8 sm:text-3xl md:text-5xl">
              কোনো প্রশ্ন বা <span className="text-chart-3">পরামর্শ আছে?</span>
            </h2>

            <p className="mt-4 max-w-2xl text-balance text-sm leading-relaxed text-primary-foreground/85 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              যেকোনো তথ্য, মতামত কিংবা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।
              মসজিদ পরিচালনা কমিটি সর্বদা আপনাদের সেবায় নিয়োজিত।
            </p>

            <Button
              asChild
              size="lg"
              className="mt-8 h-11 rounded-xl bg-chart-3 px-6 text-sm font-semibold text-foreground shadow-xl shadow-chart-3/20 transition-all duration-300 hover:scale-105 hover:bg-chart-3/90 sm:mt-10 sm:h-12 sm:px-8 sm:text-base"
            >
              <Link href={ROUTES.PUBLIC.CONTACT}>
                <Mail className="mr-2 size-4 sm:size-5" />
                যোগাযোগ করুন
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}