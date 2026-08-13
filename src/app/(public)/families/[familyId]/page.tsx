import type { Metadata } from "next"

import { SITE_CONFIG } from "@/config/metadata"
import { FamilyDetailsPage } from "@/features/public/families/details/FamilyDetailsPage"

interface FamilyDetailsPageProps {
    params: Promise<{
        familyId: string
    }>
}

export const metadata: Metadata = {
    title: "পরিবারের তথ্য",
    description:
        "নিবন্ধিত পরিবারের বিস্তারিত তথ্য, মাসিক চাঁদা, পরিশোধের ইতিহাস এবং বকেয়া তথ্য দেখুন।",
    keywords: [
        ...SITE_CONFIG.keywords,
        "Family Details",
        "Family Ledger",
        "Payment Ledger",
        "Family Information",
        "পরিবারের তথ্য",
        "পরিবারের লেজার",
        "চাঁদা",
        "পেমেন্ট ইতিহাস",
    ],
    alternates: {
        canonical: "/families",
    },
}

export default async function Page({
    params,
}: FamilyDetailsPageProps) {
    const { familyId } = await params

    return (
        <FamilyDetailsPage
            familyId={familyId}
        />
    )
}