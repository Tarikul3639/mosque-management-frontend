import { Suspense } from "react"

import { FamilyDetailsHeader } from "./components/FamilyDetailsHeader"
import { FamilyContent } from "./components/FamilyContent"
import { FamilyDetailsSkeleton } from "./components/FamilyDetailsSkeleton"

interface FamilyDetailsPageProps {
    familyId: string
}

export function FamilyDetailsPage({
    familyId,
}: FamilyDetailsPageProps) {
    return (
        <main>
            <FamilyDetailsHeader />

            <Suspense fallback={<FamilyDetailsSkeleton />}>
                <FamilyContent familyId={familyId} />
            </Suspense>
        </main>
    )
}