import Image from "next/image"

import { Camera, Images } from "lucide-react"

export function GalleryBanner() {
  return (
    <section className="relative isolate overflow-hidden">
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

      <div className="container mx-auto flex min-h-105 flex-col items-center justify-center px-4 py-20 text-center md:px-6">
        {/* Icon */}
        <div className="mb-6 flex size-18 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
          <Images className="size-8 text-white" />
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          মসজিদের গ্যালারি
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 md:text-lg">
          মসজিদের বিভিন্ন ধর্মীয় অনুষ্ঠান, উন্নয়ন কার্যক্রম, সামাজিক উদ্যোগ
          এবং স্মরণীয় মুহূর্তের ছবিগুলো একত্রে সংরক্ষণ করা হয়েছে।
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl">
            <Camera className="size-4 text-white" />

            <span className="text-sm font-medium text-white">
              স্মরণীয় মুহূর্তের সংগ্রহ
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl">
            <Images className="size-4 text-white" />

            <span className="text-sm font-medium text-white">
              ধর্মীয় ও সামাজিক কার্যক্রম
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  )
}
