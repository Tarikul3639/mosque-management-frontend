"use client"

import { ErrorComponent } from "@/components/common/error"

import { getErrorMessage } from "@/utils/get-error-message"

import { useGetDonorDetailsQuery } from "@/store/api/donor.api"

import { DonorHeader } from "./components/DonorHeader"
import { DonorProfileCard } from "./components/DonorProfileCard"
import { DonorOverviewCard } from "./components/DonorOverviewCard"
import { DonorDonationHistoryCard } from "./components/DonorDonationHistoryCard"
import { DonorDetailsSkeleton } from "./components/DonorDetailsSkeleton"

interface DonorDetailsPageProps {
    id: string
}

export function DonorDetailsPage({ id }: DonorDetailsPageProps) {
    const {
        data: donor,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetDonorDetailsQuery(id)

    if (isLoading) {
        return <DonorDetailsSkeleton />
    }

    if (isError) {
        return (
            <ErrorComponent
                title="Failed to load donor."
                error={getErrorMessage(error)}
                onRetry={refetch}
            />
        )
    }

    if (!donor) {
        return null
    }

    return (
        <div className="space-y-6 p-6">
            <DonorHeader donor={donor} />

            <div className="grid gap-6 xl:grid-cols-12">
                <div className="xl:col-span-4 2xl:col-span-3">
                    <DonorProfileCard donor={donor} />
                </div>

                <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
                    <DonorOverviewCard donor={donor} />
                </div>
            </div>
            <DonorDonationHistoryCard donorId={donor.id} />
        </div>
    )
}
