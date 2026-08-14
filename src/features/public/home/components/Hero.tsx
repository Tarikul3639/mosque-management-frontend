import Image from "next/image"

import { HERO_TITLE, HERO_DESCRIPTION } from "../constants"
import { Button } from "@/components/ui/button"
import { HeartHandshake } from "lucide-react"
import { ROUTES } from "@/config/routes"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-90 overflow-hidden bg-muted md:min-h-105 lg:min-h-150">
      <Image
        src="/images/mosque-hero.jpg"
        alt="মসজিদ"
        fill
        priority
        className="scale-x-[-1] object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-primary/20" />

      <div className="relative container mx-auto w-full px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <div className="relative max-w-2xl">
            {/* Mobile: text-2xl/3xl -> Tablet: sm:text-4xl/5xl -> Desktop: lg:text-6xl */}
            <h1 className="text-4xl leading-tight font-extrabold text-primary-foreground sm:text-5xl lg:text-6xl">
              {HERO_TITLE.first}
              <span className="ml-12 block text-primary">
                {HERO_TITLE.second}
              </span>
            </h1>

            <p className="mt-6 line-clamp-3 max-w-xl text-lg leading-relaxed font-medium text-primary-foreground/90">
              {HERO_DESCRIPTION}
            </p>

            {/* Mobile: button size adjustments */}
            <div className="mt-6 flex gap-3 sm:mt-8 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="h-10 rounded-full bg-primary px-5 text-sm text-white hover:bg-primary/90 sm:h-12 sm:px-7 sm:text-base"
              >
                <Link href={ROUTES.PUBLIC.CONTACT}>
                  <HeartHandshake className="mr-2 size-4 sm:size-5" />
                  অনুদান করুন
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
