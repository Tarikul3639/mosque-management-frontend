import type { Metadata } from "next"

import { SITE_CONFIG } from "@/config/metadata"
import { FamilyPage } from "@/features/public/families/list/FamilyPage"

export const metadata: Metadata = {
    title: "পরিবারসমূহ",
    description:
        "নামা রাথুরা বাইতুল আমান জামে মসজিদের কমিউনিটির নিবন্ধিত পরিবারগুলোকে খুঁজে নিন। একসাথে যুক্ত হন, সহযোগিতা করুন এবং এগিয়ে যান।",
    keywords: [
        ...SITE_CONFIG.keywords,
        "Community Families",
        "Family List",
        "Registered Families",
        "Family Directory",
        "Family Search",
        "Bangladesh Families",
        "পরিবারসমূহ",
        "পরিবার তালিকা",
        "নিবন্ধিত পরিবার",
    ],
    alternates: {
        canonical: "/families",
    },
    openGraph: {
        title: "পরিবারসমূহ",
        description:
            "নামা রাথুরা বাইতুল আমান জামে মসজিদের কমিউনিটির নিবন্ধিত পরিবারগুলোকে খুঁজে নিন। একসাথে যুক্ত হন, সহযোগিতা করুন এবং এগিয়ে যান।",
        url: `${SITE_CONFIG.url}/families`,
        images: [
            {
                url: "/images/families/og-image.png",
                width: 1200,
                height: 630,
                alt: "Community Families",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "পরিবারসমূহ",
        description:
            "নামা রাথুরা বাইতুল আমান জামে মসজিদের কমিউনিটির নিবন্ধিত পরিবারগুলোকে খুঁজে নিন। একসাথে যুক্ত হন, সহযোগিতা করুন এবং এগিয়ে যান।",
        images: ["/images/families/og-image.png"],
    },
}

interface FamiliesPageProps {
    searchParams: Promise<{
        page?: string
        limit?: string
        search?: string
    }>
}

export default async function Families({
    searchParams,
}: FamiliesPageProps) {
    return (
        <FamilyPage searchParams={searchParams} />
    )
}