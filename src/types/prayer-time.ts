export interface PrayerTime {
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

export type UpdatePrayerTimeDto = Omit<PrayerTime, "createdAt" | "updatedAt">
