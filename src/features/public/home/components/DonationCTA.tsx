import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DonationCTA() {
  return (
    <section className="bg-muted px-3 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl md:rounded-3xl">
          {/* Background Image */}
          <Image
            src="/images/donation-bg.jpg"
            alt="Mosque background"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Dark Overlay Gradient for High Contrast */}
          <div className="absolute inset-0 bg-linear-to-r from-[#04241c]/65 via-[#084234]/55 to-[#0f5b47]/20" />

          {/* Glowing Mesh Gradients */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#e8b64c]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[#10b981]/20 blur-3xl" />

          {/* Floating Bubbles Element */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute top-1/4 left-10 h-16 w-16 animate-pulse rounded-full bg-white/10 blur-md" />
            <span className="absolute bottom-1/3 left-1/4 h-8 w-8 rounded-full bg-[#e8b64c]/20 blur-sm" />
            <span className="absolute top-12 right-1/3 h-20 w-20 rounded-full bg-white/5 blur-lg" />
            <span className="absolute right-12 bottom-10 h-12 w-12 rounded-full bg-[#e8b64c]/15 blur-sm" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 py-18 text-center lg:px-24 lg:py-28">
            <h2 className="max-w-2xl text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              আপনার অনুদানে <br />
              <span className="text-[#e8b64c] drop-shadow-sm">
                আল্লাহর ঘর সমৃদ্ধ হোক
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              মসজিদের উন্নয়ন, রক্ষণাবেক্ষণ এবং ইসলামী কার্যক্রমে অংশ নিন।
              প্রতিটি অনুদান সদকায়ে জারিয়া।
            </p>

            <Button
              asChild
              size="lg"
              className="mt-6 h-12 rounded-xl bg-[#e8b64c] px-8 text-[#06382c] shadow-lg shadow-[#e8b64c]/20 transition-all hover:scale-105 hover:bg-[#d4a93f] active:scale-95 sm:mt-8"
            >
              <Link
                href="https://www.bkash.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Heart className="mr-2 size-5" />
                অনুদান দিন
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
