import type { Metadata } from "next"

import { SITE_CONFIG } from "@/config/metadata"

import { GalleryPage } from "@/features/public/galleries/list/GalleryPage"

interface GalleriesPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
  }>
}

export const metadata: Metadata = {
  title: "ছবির গ্যালারি",
  description:
    "মসজিদের বিভিন্ন অনুষ্ঠান, উন্নয়ন কার্যক্রম এবং গুরুত্বপূর্ণ মুহূর্তের ছবির গ্যালারি দেখুন।",
  keywords: [
    ...SITE_CONFIG.keywords,
    "Gallery",
    "Mosque Gallery",
    "Mosque Photos",
    "Gallery Images",
    "ছবির গ্যালারি",
    "মসজিদের ছবি",
    "অনুষ্ঠানের ছবি",
  ],
  alternates: {
    canonical: "/galleries",
  },
}

export default async function Page({ searchParams }: GalleriesPageProps) {
  const params = await searchParams

  return (
    <GalleryPage
      page={Number(params.page) || 1}
      limit={Number(params.limit) || 5}
      search={params.search?.trim()}
    />
  )
}
