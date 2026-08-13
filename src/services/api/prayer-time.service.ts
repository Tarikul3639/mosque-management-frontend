// src/services/api/prayer-time.service.ts

import { api } from "@/lib/axios"
import type { PrayerTimesResponse } from "@/features/public/home/types"

export async function getPrayerTimes() {
  try {
    const { data } = await api.get<PrayerTimesResponse>("/prayer-times", {
      timeout: 10000,
    })

    return data
  } catch (error) {
    console.error("Failed to fetch prayer times:", error)
    return null
  }
}
