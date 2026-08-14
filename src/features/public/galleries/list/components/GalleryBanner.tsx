// src/features/public/galleries/list/components/GalleryBanner.tsx

import Image from "next/image"

import { Camera, Images } from "lucide-react"

export function GalleryBanner() {
  return (
    <section className="relative isolate overflow-hidden h-96 md:h-105">
      {/* Background */}
      <Image
        src="/images/gallery-banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-top"
      />

      {/* Gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary to-primary/10" />

      {/* Decorative Blur */}
      <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -right-20 -bottom-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      {/* Content */}
      <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
        {/* Icon */}
        <div className="mb-2 flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl md:mb-3 md:size-14">
          <Images className="size-5 text-white md:size-6" />
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-white md:text-5xl">
          মসজিদের গ্যালারি
        </h1>

        {/* Description */}
        <p className="mt-2 max-w-2xl text-xs leading-5 text-white/85 md:mt-3 md:text-base md:leading-7">
          মসজিদের বিভিন্ন ধর্মীয় অনুষ্ঠান, উন্নয়ন কার্যক্রম,
          সামাজিক উদ্যোগ এবং স্মরণীয় মুহূর্তের ছবিগুলো একত্রে
          সংরক্ষণ করা হয়েছে।
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:mt-6 md:gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-xl md:px-4 md:py-2">
            <Camera className="size-3.5 text-white md:size-4" />

            <span className="text-[11px] font-medium text-white md:text-xs">
              স্মরণীয় মুহূর্তের সংগ্রহ
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-xl md:px-4 md:py-2">
            <Images className="size-3.5 text-white md:size-4" />

            <span className="text-[11px] font-medium text-white md:text-xs">
              ধর্মীয় ও সামাজিক কার্যক্রম
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent md:h-24" />
    </section>
  )
}