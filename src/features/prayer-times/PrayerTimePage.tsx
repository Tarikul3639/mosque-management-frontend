"use client"

import { useState } from "react"

import { PrayerTimeHeader } from "./components/PrayerTimeHeader"
import { PrayerTimeSkeleton } from "./components/PrayerTimeSkeleton"
import { PrayerTimeEditDialog } from "./components/PrayerTimeEditDialog"
import { PrayerTimeInformationCard } from "./components/PrayerTimeInformationCard"

import { usePrayerTime } from "./usePrayerTime"

export function PrayerTimePage() {
  const [open, setOpen] = useState(false)

  const {
    prayerTime,

    form,
    handleSubmit,

    isLoading,
    isSubmitting,
  } = usePrayerTime()

  if (isLoading || !prayerTime) {
    return <PrayerTimeSkeleton />
  }

  return (
    <>
      <div className="space-y-6 px-2 py-4 sm:p-6">
        <PrayerTimeHeader onEdit={() => setOpen(true)} />

        <PrayerTimeInformationCard prayerTime={prayerTime} />
      </div>

      <PrayerTimeEditDialog
        open={open}
        onOpenChange={setOpen}
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onReset={() => form.reset()}
      />
    </>
  )
}
