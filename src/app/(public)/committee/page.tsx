// src/app/(public)/committee/page.tsx

import type { Metadata } from "next"
import { SITE_CONFIG } from "@/config/metadata"

import { CommitteePage } from "@/features/public/committee/CommitteePage"

export const metadata: Metadata = {
    title: "মসজিদ কমিটি",

    description:
        "নামা রাথুরা বাইতুল আমান জামে মসজিদের সম্মানিত কমিটির সদস্যবৃন্দ, দায়িত্ব, লক্ষ্য ও কার্যক্রম সম্পর্কে বিস্তারিত জানুন।",

    keywords: [
        ...SITE_CONFIG.keywords,
        "Mosque Committee",
        "Committee Members",
        "Mosjid Committee",
        "Mosque Management",
        "Islamic Committee",
        "Mosque Administration",
        "Bangladesh Mosque",
        "মসজিদ কমিটি",
        "কমিটির সদস্য",
        "সভাপতি",
        "সাধারণ সম্পাদক",
        "ইমাম",
        "মুয়াজ্জিন",
    ],

    alternates: {
        canonical: "/committee",
    },

    openGraph: {
        title: "মসজিদ কমিটি",
        description:
            "নামা রাথুরা বাইতুল আমান জামে মসজিদের কমিটির সদস্যবৃন্দ ও তাদের দায়িত্ব সম্পর্কে জানুন।",

        url: `${SITE_CONFIG.url}/committee`,

        images: [
            {
                url: "/images/committee/og-image.png",
                width: 1200,
                height: 630,
                alt: "Mosque Committee",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "মসজিদ কমিটি",
        description:
            "মসজিদ পরিচালনা কমিটির সদস্যবৃন্দ ও তাদের দায়িত্ব সম্পর্কে জানুন।",

        images: ["/images/committee/og-image.png"],
    },
}

export default function CommitteePageRoute() {
    return <CommitteePage />
}
