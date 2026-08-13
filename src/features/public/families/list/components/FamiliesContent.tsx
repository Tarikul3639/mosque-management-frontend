import { SearchX } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { Error2 } from "@/components/common/error2"
import { Pagination } from "@/components/common/pagination"
import { getFamilies } from "@/services/api/families.service"

import { FamilyCard } from "./FamilyCard"
import { FamilySectionHeader } from "./FamilySectionHeader"

interface FamilyContentProps {
  page: number
  limit: number
  search: string
}

export async function FamilyContent({
  page,
  limit,
  search,
}: FamilyContentProps) {
  let families

  try {
    families = await getFamilies({
      page,
      limit,
      search: search || undefined,
    })
  } catch {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Error2
          title="পরিবারের তথ্য লোড করা যায়নি"
          message="কিছুক্ষণ পরে আবার চেষ্টা করুন।"
        />
      </section>
    )
  }

  const hasFamilies = families.data.length > 0
  const hasSearch = Boolean(search)

  return (
    <section className="container mx-auto px-4 pb-16">
      <FamilySectionHeader total={families.total} />

      {hasFamilies ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {families.data.map((family) => (
              <FamilyCard key={family.id} family={family} />
            ))}
          </div>

          {families.totalPages > 1 && (
            <Pagination
              currentPage={families.page}
              totalPages={families.totalPages}
            />
          )}
        </>
      ) : (
        <EmptyState
          title={
            hasSearch
              ? "কোনো পরিবার পাওয়া যায়নি"
              : "কোনো পরিবার তালিকাভুক্ত নেই"
          }
          description={
            hasSearch
              ? `"${search}" দিয়ে কোনো ফলাফল পাওয়া যায়নি। অন্য কিওয়ার্ড দিয়ে চেষ্টা করুন।`
              : "বর্তমানে সিস্টেমে কোনো পরিবার যোগ করা হয়নি।"
          }
          icon={<SearchX className="size-5" />}
        />
      )}
    </section>
  )
}
