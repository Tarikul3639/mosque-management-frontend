import Link from "next/link"
import { ArrowRight, HeartHandshake } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/config/routes"

import { StarPattern } from "@/components/icons/StarPattern"

/* --------------------------------- CTA --------------------------------- */
export function DonationCTA() {
  return (
    <section className="bg-background px-3 py-12 sm:px-6 md:py-16 lg:px-8">
      <style>{`
        @keyframes float-cta { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-18px) scale(1.05)} }
      `}</style>

      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0f5b47] via-[#0a4a3a] to-[#06382c] shadow-xl md:rounded-3xl">
          {/* Pattern watermark */}
          <StarPattern className="pointer-events-none absolute -top-14 -right-14 h-56 w-56 text-[#e8b64c]/8" />
          <StarPattern className="pointer-events-none absolute -bottom-16 left-10 h-44 w-44 text-[#e8b64c]/8" />

          {/* Soft glows */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#e8b64c]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

          {/* Floating bubbles */}
          <div
            className="pointer-events-none absolute rounded-full blur-2xl"
            style={{
              background: "rgba(232, 182, 76, 0.25)",
              width: 120,
              height: 120,
              top: "18%",
              left: "10%",
              animation: "float-cta 9s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute rounded-full blur-2xl"
            style={{
              background: "rgba(16, 185, 129, 0.2)",
              width: 140,
              height: 140,
              bottom: "12%",
              right: "12%",
              animation: "float-cta 11s ease-in-out infinite 2s",
            }}
          />

          {/* Content — centered text + button */}
          <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8b64c]/30 bg-[#e8b64c]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#e8b64c] uppercase backdrop-blur">
              <HeartHandshake className="size-3" />
              সদকায়ে জারিয়া
            </span>

            {/* Heading */}
            <h2 className="mt-4 max-w-2xl text-2xl leading-tight font-bold text-primary-foreground drop-shadow-lg sm:text-3xl md:text-4xl">
              আজই অংশ নিন{" "}
              <span className="text-[#e8b64c]">আল্লাহর ঘর গড়ার কাজে</span>
            </h2>

            {/* Text */}
            <p className="mt-3 max-w-xl text-sm leading-7 text-primary-foreground/85 sm:text-base sm:leading-8">
              আপনার ছোট একটি অনুদান হতে পারে মসজিদের বড় পরিবর্তনের শুরু। চলমান
              প্রকল্পগুলোতে সহযোগিতা করে সদকায়ে জারিয়ার সাওয়াব অর্জন করুন।
            </p>

            {/* Button */}
            <Button
              asChild
              size="lg"
              className="mt-6 h-12 rounded-xl bg-[#e8b64c] px-8 text-[#06382c] shadow-lg shadow-[#e8b64c]/30 transition-all hover:scale-105 hover:bg-[#d4a93f] hover:shadow-[#e8b64c]/50 sm:mt-8"
            >
              <Link href={ROUTES.PUBLIC.DONATIONS.INDEX}>
                <HeartHandshake className="mr-2 size-5" />
                এখনই অনুদান করুন
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            {/* Small note */}
            <p className="mt-4 text-xs text-primary-foreground/60 sm:text-sm">
              বিকাশ, নগদ, ব্যাংক — যেকোনো মাধ্যমে নিরাপদে অনুদান দিন
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
