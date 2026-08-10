"use client"

import { format } from "date-fns"

import { CalendarClock, ImageIcon } from "lucide-react"
import {
  StatsCard,
  StatsCardsSkeletonMap,
} from "@/components/common/stats-card"
import { useGetGallerySummaryQuery } from "@/store/api/gallery.api"

export function GallerySummaryCards() {
  const { data, isLoading } = useGetGallerySummaryQuery()

  if (isLoading) {
    return <StatsCardsSkeletonMap count={2} />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatsCard
        title="Total Images"
        value={isLoading ? "—" : (data?.totalImages ?? 0).toLocaleString()}
        icon={<ImageIcon className="size-5" />}
        iconBg="bg-chart-2/10"
        iconColor="text-chart-2"
        subtitle="Images uploaded across all galleries"
      />

      <StatsCard
        title="Last Upload"
        value={
          isLoading
            ? "—"
            : data?.lastUploadedAt
              ? format(new Date(data.lastUploadedAt), "dd MMM yyyy")
              : "No uploads"
        }
        icon={<CalendarClock className="size-5" />}
        iconBg="bg-chart-3/10"
        iconColor="text-chart-3"
        subtitle="Latest gallery upload date"
      />
    </div>
  )
}
