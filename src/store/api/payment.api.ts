// src/store/api/payment.api.ts

import { baseApi } from "./base.api"

import type { FamilyLedgerResponse, FamilyLedgerQuery } from "@/types/payment"

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFamilyLedger: builder.query<FamilyLedgerResponse, FamilyLedgerQuery>({
            query: ({ familyId, year, month }) => ({
                url: `/payments/family/${familyId}/ledger`,
                params: {
                    year,
                    month,
                },
            }),

            providesTags: (_result, _error, { familyId }) => [
                {
                    type: "Payment",
                    id: familyId,
                },
            ],
        }),
    }),
})

export const { useGetFamilyLedgerQuery } = paymentApi
