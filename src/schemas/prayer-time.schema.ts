import { z } from "zod"

// HH:mm format, 24-hour (00:00 theke 23:59)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

const timeField = (message: string) => z.string().regex(timeRegex, message)

const optionalTimeField = z
  .string()
  .regex(timeRegex, "Invalid time format.")
  .optional()
  .or(z.literal(""))

export const prayerTimeSchema = z.object({
  id: z.string().uuid(),
  fajr: timeField("Fajr time is required."),
  sunrise: optionalTimeField,
  dhuhr: timeField("Dhuhr time is required."),
  asr: timeField("Asr time is required."),
  maghrib: timeField("Maghrib time is required."),
  isha: timeField("Isha time is required."),
  jummah: optionalTimeField,
})

export type PrayerTimeFormValues = z.infer<typeof prayerTimeSchema>
