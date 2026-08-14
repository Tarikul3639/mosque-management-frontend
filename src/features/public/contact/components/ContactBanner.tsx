// src/features/public/contact/components/ContactBanner.tsx

import Image from "next/image"
import { Mail, PhoneCall } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ContactBanner() {
  return (
    <section className="relative isolate overflow-hidden h-96 md:h-105">
      {/* Background */}
      <Image
        src="/images/contact-banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-bottom-right sm:object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-linear-to-l from-transparent to-primary" />

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-primary/25 blur-3xl md:h-80 md:w-80" />

      <div className="container flex items-center h-full mx-auto px-4 py-16 sm:py-20 md:px-6 md:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur sm:px-4 sm:py-1.5 sm:text-sm">
            যোগাযোগ
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            আমাদের সাথে যোগাযোগ করুন
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8 md:text-lg">
            মসজিদ সম্পর্কিত যেকোনো তথ্য, পরামর্শ, অভিযোগ বা সহযোগিতার জন্য
            আমাদের সাথে যোগাযোগ করতে পারেন। আমরা যত দ্রুত সম্ভব আপনার বার্তার
            উত্তর দেওয়ার চেষ্টা করব।
          </p>

          <div className="mt-8 flex flex-row gap-3 sm:flex-wrap">
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="h-11 rounded-full px-5 sm:h-12"
            >
              <a href="mailto:mosque@example.com">
                <Mail className="mr-2 size-5" />
                ইমেইল <span className="hidden sm:block">করুন</span>
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="h-11 rounded-full px-5 sm:h-12"
            >
              <a href="tel:+8801700000000">
                <PhoneCall className="mr-2 size-5" />
                কল করুন
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
