import Image from "next/image"

export const FamilyBanner = () => {
  return (
    <section className="relative h-96 md:h-105 overflow-hidden">
      {/* Generated banner image */}
      <Image
        src="/images/family-banner.jpg"
        alt="Community families banner"
        fill
        priority={false}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-emerald-950/85 via-emerald-900/50 to-transparent" />

      {/* Banner text */}
      <div className="relative mx-auto flex items-center h-full max-w-6xl flex-col justify-center px-4">
        <span className="w-fit rounded-full border border-emerald-300/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-100 uppercase">
          পরিবারসমূহ
        </span>
        <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">
          আমাদের পরিবারসমূহ
        </h1>
        <p className="mt-2 max-w-xl text-sm text-emerald-50/90 md:text-base">
          আমাদের কমিউনিটির নিবন্ধিত পরিবারগুলোকে খুঁজে নিন — একসাথে যুক্ত হন,
          সহযোগিতা করুন এবং এগিয়ে যান।
        </p>
      </div>
    </section>
  )
}
