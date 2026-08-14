import { Error2 } from "@/components/common/error2"

import { getGalleryDetails } from "@/services/api/galleries.service"

import { GalleryHero } from "./GalleryHero"
import { GalleryInfoCard } from "./GalleryInfoCard"

interface GalleryContentProps {
  galleryId: string
}

export async function GalleryContent({ galleryId }: GalleryContentProps) {
  try {
    const gallery = await getGalleryDetails(galleryId)

    return (
      <>
        {/* Hero Image Slider */}
        <GalleryHero
          title={gallery.title}
          description={gallery.description}
          images={gallery.images}
        />

        {/* Content */}
        <section className="container mx-auto px-4 py-8 md:px-6 md:py-10">
          <div className="space-y-6">
            <GalleryInfoCard gallery={gallery} />
          </div>
        </section>
      </>
    )
  } catch {
    return (
      <section className="container mx-auto px-4 py-16 md:px-6">
        <Error2
          title="গ্যালারি লোড করা যায়নি"
          message="গ্যালারির তথ্য আনতে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।"
        />
      </section>
    )
  }
}
