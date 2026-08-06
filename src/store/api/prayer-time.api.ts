import { baseApi } from "./base.api"
import { PrayerTime, UpdatePrayerTimeDto } from "@/types/prayer-time"

export const prayerTimeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPrayerTime: builder.query<PrayerTime, void>({
            query: () => "/prayer-times",
            providesTags: ["PrayerTime"],
        }),

        updatePrayerTime: builder.mutation<PrayerTime, UpdatePrayerTimeDto>({
            query: (body) => ({
                url: "/prayer-times",
                method: "PUT",
                body,
            }),

            invalidatesTags: ["PrayerTime"],
        }),
    }),
})

export const { useGetPrayerTimeQuery, useUpdatePrayerTimeMutation } =
    prayerTimeApi
