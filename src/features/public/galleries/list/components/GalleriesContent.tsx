import { Error2 } from "@/components/common/error2"
import { Pagination } from "@/components/common/pagination"

import { getGalleries } from "@/services/api/galleries.service"

import { GalleryCard } from "./GalleryCard"
import { GallerySectionHeader } from "./GallerySectionHeader"

import type { GalleryQuery } from "@/types/gallery"

export async function GalleriesContent({
  page = 1,
  limit = 5,
  search = "",
}: GalleryQuery) {
  try {
    const { data, meta } = await getGalleries({
      page,
      limit,
      search,
    })

    if (data.length === 0) {
      return (
        <Error2
          title="কোন গ্যালারি পাওয়া যায়নি"
          message="আপনার অনুসন্ধানের সাথে মিলে এমন কোনো গ্যালারি পাওয়া যায়নি।"
        />
      )
    }

    return (
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
        <GallerySectionHeader total={meta.total} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((gallery) => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))}
        </div>

        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          showLimitSelector
          limit={meta.limit}
          limitOptions={[5, 9, 18, 27]}
        />
      </div>
    )
  } catch {
    return (
      <Error2
        title="গ্যালারিগুলো লোড করা যায়নি"
        message="কিছুক্ষণ পরে আবার চেষ্টা করুন।"
      />
    )
  }
}
