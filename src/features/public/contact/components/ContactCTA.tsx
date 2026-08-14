// src/features/public/contact/components/ContactCTA.tsx

import Link from "next/link"

import { ArrowRight, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ContactCTA() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-primary px-5 py-8 text-primary-foreground sm:px-6 sm:py-10 md:px-10 md:py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
            যোগাযোগ
          </span>

          <h2 className="mt-4 text-2xl font-bold md:text-4xl">
            আপনার কোনো প্রশ্ন আছে?
          </h2>

          <p className="mt-4 text-sm leading-7 text-primary-foreground/90 md:text-base">
            মসজিদের কার্যক্রম, মাসিক চাঁদা, দান, পরিবার নিবন্ধন
            অথবা যেকোনো বিষয়ে জানতে আমাদের সাথে যোগাযোগ করুন।
            আমরা সর্বোচ্চ দ্রুত আপনার প্রশ্নের উত্তর দেওয়ার
            চেষ্টা করব।
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full gap-2 sm:w-auto"
          >
            <Link href="tel:+8801700000000">
              <Phone className="size-5" />
              এখনই কল করুন
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
          >
            <Link
              href="https://maps.google.com"
              target="_blank"
            >
              মসজিদে আসুন
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}