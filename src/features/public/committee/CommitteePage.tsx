import { Suspense } from "react"
import { SectionBanner } from "./components/SectionBanner"
import { MissionValues } from "./components/MissionValues"
import { CommitteePreview } from "./components/CommitteePreview"
import { VolunteerCTA } from "./components/VolunteerCTA"
import { CommitteeSkeleton } from "./components/CommitteeSkeleton"

export async function CommitteePage() {
  return (
    <>
      {/* Committee Banner */}
      <SectionBanner
        title="মসজিদ কমিটি"
        description="আমাদের মসজিদের সকল কার্যক্রম পরিচালনার জন্য একটি নিবেদিত ও দায়িত্বশীল কমিটি কাজ করে যাচ্ছে।"
      />

      {/* Mission & Values */}
      <MissionValues />
      <Suspense fallback={<CommitteeSkeleton count={8} />}>
        {/* Committee Preview */}
        <CommitteePreview />
      </Suspense>

      {/* Volunteer CTA */}
      <VolunteerCTA />
    </>
  )
}
