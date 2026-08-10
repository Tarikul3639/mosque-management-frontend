import type {
  PrayerTimesMap,
  PrayerTimesResponse,
} from "../types"

import { formatTo12Hour } from "@/utils/format-time"

export function prayerTimesMapper(
  prayerTimes: PrayerTimesResponse | null,
): PrayerTimesMap | null {
  if (!prayerTimes) {
    return null
  }

  return {
    fajr: {
      name: "ফজর",
      salat_time: formatTo12Hour(prayerTimes.fajr),
    },

    sunrise: {
      name: "সূর্যোদয়",
      salat_time: formatTo12Hour(prayerTimes.sunrise),
    },

    dhuhr: {
      name: "যোহর",
      salat_time: formatTo12Hour(prayerTimes.dhuhr),
    },

    asr: {
      name: "আসর",
      salat_time: formatTo12Hour(prayerTimes.asr),
    },

    maghrib: {
      name: "মাগরিব",
      salat_time: formatTo12Hour(prayerTimes.maghrib),
    },

    isha: {
      name: "এশা",
      salat_time: formatTo12Hour(prayerTimes.isha),
    },

    jummah: {
      name: "জুমআ",
      salat_time: formatTo12Hour(prayerTimes.jummah),
    },
  }
}