import type { Metadata } from "next"
import { Suspense } from "react"

import {
  Hero,
  MosqueStats,
  FinancialSummaryContainer,
  MosqueActivities,
  DonationCTA,
  ContactCTA,
  HadithBanner,
  PrayerTimes,
  SurahFatihaSection,
  MainFeatures,
} from "@/features/public/home"

import { getPrayerTimes } from "@/services/api/prayer-time.service"
import { PrayerTimesSkeleton } from "@/features/public/home/components/PrayerTimesSkeleton"

export const metadata: Metadata = {
  title: "হোম",
  description:
    "নামা রাথুরা বাইতুল আমান জামে মসজিদের অফিসিয়াল ওয়েবসাইট। নামাজের সময়সূচী, আর্থিক তথ্য, কমিটি, প্রকল্প, গ্যালারি ও অনুদানের তথ্য দেখুন।",
}

export default async function HomePage() {
  const prayerTimes = await getPrayerTimes()

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Hadith Banner */}
      <HadithBanner />

      {/* Main Features */}
      <MainFeatures />

      {/* Prayer Times */}
      <Suspense fallback={<PrayerTimesSkeleton />}>
        <PrayerTimes prayerTimes={prayerTimes} />
      </Suspense>

      {/* Mosque Statistics */}
      <MosqueStats />

      {/* Surah Fatiha Section */}
      <SurahFatihaSection />

      {/* Financial Summary — Suspense + Skeleton */}
      <FinancialSummaryContainer />

      {/* Donation CTA */}
      <DonationCTA />

      {/* Mosque Activities */}
      <MosqueActivities />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  )
}
