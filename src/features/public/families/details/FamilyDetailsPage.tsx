import { Suspense } from "react"

import { FamilyContent } from "./components/FamilyContent"
import { FamilyDetailsHeader } from "./components/FamilyDetailsHeader"
import { FamilyDetailsSkeleton } from "./components/FamilyDetailsSkeleton"

interface FamilyDetailsPageProps {
    familyId: string
    year?: number
    month?: number
}

export function FamilyDetailsPage({
    familyId,
    year,
    month,
}: FamilyDetailsPageProps) {
    return (
        <main>
            <FamilyDetailsHeader />

            <Suspense fallback={<FamilyDetailsSkeleton />}>
                <FamilyContent
                    familyId={familyId}
                    year={year}
                    month={month}
                />
            </Suspense>
        </main>
    )
}