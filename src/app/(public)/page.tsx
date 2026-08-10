import type { Metadata } from "next"

import {
  Hero,
  // MosqueStats,
  // FinanceProgress,
  // CommitteePreview,
  // ProjectsPreview,
  // GalleryPreview,
  MosqueActivities,
  DonationCTA,
  ContactCTA,
  HadithBanner,
  PrayerTimes,
  SurahFatihaSection,
} from "@/features/public/home"

import { getPrayerTimes } from "@/services/api/prayer-time.service"
import { PrayerTimesSkeleton } from "@/features/public/home/components/PrayerTimesSkeleton"
import { Suspense } from "react"

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
      {/* Prayer Times */}
      <Suspense fallback={<PrayerTimesSkeleton />}>
        <PrayerTimes prayerTimes={prayerTimes} />
      </Suspense>
      {/* Surah Fatiha Section */}
      <SurahFatihaSection />

      {/* Mosque Activities */}
      <MosqueActivities />

      {/* Mosque Statistics */}
      {/* <MosqueStats /> */}

      {/* Finance Progress */}
      {/* <FinanceProgress /> */}

      {/* Committee */}
      {/* <CommitteePreview /> */}

      {/* Projects */}
      {/* <ProjectsPreview /> */}

      {/* Gallery */}
      {/* <GalleryPreview /> */}

      {/* Donation CTA */}
      <DonationCTA />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  )
}