"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  prayerTimeSchema,
  type PrayerTimeFormValues,
} from "@/schemas/prayer-time.schema"
import { getErrorMessage } from "@/utils/get-error-message"
import {
  useGetPrayerTimeQuery,
  useUpdatePrayerTimeMutation,
} from "@/store/api/prayer-time.api"

export function usePrayerTime() {
  const { data: prayerTime, isLoading } = useGetPrayerTimeQuery()

  const form = useForm<PrayerTimeFormValues>({
    resolver: zodResolver(prayerTimeSchema),
    defaultValues: {
      id: "",
      fajr: "",
      sunrise: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
      jummah: "",
    },
  })

  useEffect(() => {
    if (!prayerTime) {
      return
    }

    form.reset({
      id: prayerTime.id,
      fajr: prayerTime.fajr,
      sunrise: prayerTime.sunrise ?? "",
      dhuhr: prayerTime.dhuhr,
      asr: prayerTime.asr,
      maghrib: prayerTime.maghrib,
      isha: prayerTime.isha,
      jummah: prayerTime.jummah ?? "",
    })
  }, [prayerTime, form])

  const [updatePrayerTime, updateState] = useUpdatePrayerTimeMutation()

  async function handleSubmit(values: PrayerTimeFormValues) {
    try {
      await updatePrayerTime({
        ...values,
        sunrise: values.sunrise || null,
        jummah: values.jummah || null,
      }).unwrap()

      toast.success("Prayer times updated successfully.")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return {
    prayerTime,
    form,
    handleSubmit,
    isLoading,
    isSubmitting: updateState.isLoading,
  }
}
