import type { ComponentType } from "react"

export interface PrayerCardItem {
  key: string
  name: string
  time: string
  icon: ComponentType<{ className?: string }>
  isCurrent: boolean
}

export interface PrayerCardData {
  location: string
  nextPrayer: string
  countdown: string
  items: PrayerCardItem[]
}

export interface PrayerTimesResponse {
  id: string

  fajr: string
  sunrise: string | null

  dhuhr: string
  asr: string

  maghrib: string
  isha: string

  jummah: string | null

  createdAt: string
  updatedAt: string
}

export interface PrayerTime {
  name: string
  salat_time: string
}

export interface PrayerTimesMap {
  fajr: PrayerTime
  sunrise: PrayerTime
  dhuhr: PrayerTime
  asr: PrayerTime
  maghrib: PrayerTime
  isha: PrayerTime
  jummah: {
    name: string
    salat_time: string | null
  }
}
