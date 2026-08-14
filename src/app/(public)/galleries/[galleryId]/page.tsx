import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SITE_CONFIG } from "@/config/metadata"

import { GalleryDetailsPage } from "@/features/public/galleries/details/GalleryDetailsPage"
import { getGalleryDetails } from "@/services/api/galleries.service"

interface PageProps {
  params: Promise<{
    galleryId: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { galleryId } = await params

    const gallery = await getGalleryDetails(galleryId)

    return {
      title: gallery.title ?? "গ্যালারি",
      description:
        gallery.description ?? "মসজিদের গ্যালারির বিস্তারিত ছবি ও তথ্য দেখুন।",
      keywords: [
        ...SITE_CONFIG.keywords,
        "Gallery",
        "Mosque Gallery",
        "Gallery Details",
        "গ্যালারি",
        "ছবি",
      ],
      alternates: {
        canonical: `/galleries/${galleryId}`,
      },
    }
  } catch {
    return {
      title: "গ্যালারি পাওয়া যায়নি",
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { galleryId } = await params

  if (!galleryId) {
    notFound()
  }

  return <GalleryDetailsPage galleryId={galleryId} />
}
