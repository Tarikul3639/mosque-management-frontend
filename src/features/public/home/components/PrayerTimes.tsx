import Image from "next/image"

import { PrayerCard } from "./PrayerCard"
import { PrayerClock } from "./PrayerClock"
import { prayerTimesMapper } from "../utils/map-prayer-times"
import type { PrayerTimesResponse } from "../types"

export function PrayerTimes({
  prayerTimes,
}: {
  prayerTimes: PrayerTimesResponse | null
}) {
  const prayerData = prayerTimesMapper(prayerTimes)

  if (!prayerData) return null

  const prayers = [
    prayerData.fajr,
    prayerData.dhuhr,
    prayerData.asr,
    prayerData.maghrib,
    prayerData.isha,
  ]

  return (
    <section className="bg-muted py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl">
            নামাজের সময়সূচি
          </h2>
          <p className="max-w-md text-xs leading-5 text-muted-foreground sm:text-sm">
            প্রতিদিনের নামাজের জামাত ও আযানের সময়সূচি। মসজিদে আসার আগে সময়গুলো
            দেখে নিন, যেন কোনো জামাত মিস না হয়।
          </p>
        </div>

        {/* Main card */}
        <div className="relative mt-6 overflow-hidden rounded-2xl shadow-xl sm:mt-8 sm:rounded-3xl">
          {/* Background image */}
          <Image
            src="/images/mosque-hero.jpg"
            alt="মসজিদ"
            fill
            className="object-cover"
            priority
            unoptimized // avoids a 400 error in dev mode
          />

          {/* Gradient overlay for contrast (Tailwind v4: "linear", not "gradient") */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/10 to-primary/50" />
          <div className="absolute inset-0 bg-foreground/30" />

          <div className="relative p-4 sm:p-6 md:p-10">
            {/* Top row: Jummah | Clock | Sunrise */}
            <div className="grid items-center gap-4 sm:gap-6 md:grid-cols-[auto_1fr_auto]">
              {/* Mobile: clock first (col-span-2), then Jummah & Sunrise side-by-side */}
              <div className="col-span-2 text-center text-primary-foreground md:order-2 md:col-span-1">
                <PrayerClock prayers={prayers} />
              </div>

              {/* Jummah */}
              <div className="mx-auto w-full sm:max-w-48 md:order-1 md:mx-0 md:w-40 lg:w-44">
                <PrayerCard
                  name={prayerData?.jummah?.name ?? "জুমআ"}
                  salatTime={prayerData?.jummah?.salat_time}
                />
              </div>

              {/* Sunrise */}
              <div className="mx-auto w-full sm:max-w-48 md:order-3 md:mx-0 md:w-40 lg:w-44">
                <PrayerCard
                  name={prayerData?.sunrise?.name ?? "সূর্যোদয়"}
                  salatTime={prayerData?.sunrise?.salat_time}
                />
              </div>
            </div>

            {/* Bottom row: 5 daily prayers */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
              {prayers.map((prayer, i) => (
                <PrayerCard
                  key={prayer.name}
                  name={prayer.name}
                  salatTime={prayer.salat_time}
                  isActive={i === prayers.length - 1}
                  className={
                    i === prayers.length - 1 && prayers.length % 2 !== 0
                      ? "col-span-2 sm:col-span-1"
                      : ""
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
