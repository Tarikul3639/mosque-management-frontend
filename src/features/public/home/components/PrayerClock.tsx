"use client"

import { useEffect, useMemo, useState } from "react"

import type { PrayerTime } from "../types"

const BN_DIGITS = "০১২৩৪৫৬৭৮৯"

const toBn = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => BN_DIGITS[Number(digit)])

const pad = (n: number) => String(n).padStart(2, "0")

function useNow() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return now
}

interface PrayerClockProps {
  prayers: PrayerTime[]
}

export function PrayerClock({ prayers }: PrayerClockProps) {
  const now = useNow()

  const hours24 = now?.getHours() ?? 0
  const hours12 = hours24 % 12 || 12
  const meridiem = hours24 < 12 ? "AM" : "PM"

  const clock = now
    ? `${toBn(pad(hours12))}:${toBn(pad(now.getMinutes()))}:${toBn(
        pad(now.getSeconds())
      )}`
    : "--:--:--"

  const date = now
    ? new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now)
    : "—"

  const currentPrayer = useMemo(() => {
    if (!now) return ""

    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    const prayerMinutes = prayers.map((prayer) => {
      if (!prayer.salat_time) return 0

      const [time, period] = prayer.salat_time.split(" ")
      const [h, m] = time.split(":").map(Number)

      let hour = h

      if (period === "PM" && hour !== 12) hour += 12
      if (period === "AM" && hour === 12) hour = 0

      return hour * 60 + m
    })

    let idx = prayerMinutes.findLastIndex((m) => currentMinutes >= m)

    if (idx === -1) idx = prayers.length - 1

    return prayers[idx]?.name
  }, [now, prayers])

  return (
    <>
      <p className="text-base font-medium sm:text-lg md:text-xl lg:text-2xl">
        বায়তুল আমান জামে মসজিদ
      </p>

      <p className="mt-2 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl md:text-6xl lg:text-7xl">
        {clock}
        <span className="ml-2 align-middle text-base font-semibold text-primary-foreground/80 sm:text-lg md:text-xl">
          {meridiem}
        </span>
      </p>

      <p className="mt-2 text-sm text-primary-foreground/90 sm:mt-3 sm:text-base md:text-lg">
        {date}
      </p>

      <p className="mt-3 text-xs text-primary-foreground/80 sm:text-sm">
        চলতি নামাজ: <span className="font-semibold">{currentPrayer}</span>
      </p>
    </>
  )
}
