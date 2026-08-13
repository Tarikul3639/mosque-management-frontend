import {
  getCommitteeMembers,
  type CommitteeMember,
  type CommitteeSummary,
} from "@/services/api/committee.service"

import { formatBengaliNumber as formatNum } from "@/utils/format-bengali-number"

import { DESIGNATION_MAP } from "../constants"
import { MemberCard } from "./MemberCard"
import { Error2 } from "@/components/common/error2"

/* -------------------------------- Component ------------------------------- */
export async function CommitteePreview() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    const res = await getCommitteeMembers({ isActive: true, limit: 50 })

    if (!res || !res.data) {
      return <CommitteeErrorSection />
    }

    /* Sort by designation order */
    const members: CommitteeMember[] = [...res.data].sort(
      (a, b) =>
        (DESIGNATION_MAP[a.designation]?.order ?? 99) -
        (DESIGNATION_MAP[b.designation]?.order ?? 99)
    )
    const summary: CommitteeSummary = res.summary

    return (
      <section className="bg-muted py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              আমাদের কমিটির সদস্যবৃন্দ
            </h2>

            {/* Gold divider */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-chart-3/70" />
              <span className="size-1.5 rotate-45 bg-chart-3" />
              <span className="h-px w-8 bg-chart-3/70" />
            </div>

            {/* Summary line */}
            {summary && (
              <p className="mt-3 text-sm text-muted-foreground">
                মোট {formatNum(summary.totalMembers)} জনের মধ্যে{" "}
                <span className="font-bold text-primary">
                  {formatNum(summary.activeMembers)} জন
                </span>{" "}
                সক্রিয় সদস্য
              </p>
            )}
          </div>

          {/* Content */}
          <div className="mt-10 md:mt-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  } catch {
    return <CommitteeErrorSection />
  }
}

/* ----------------------------- Error Fallback ----------------------------- */
function CommitteeErrorSection() {
  return (
    <section className="bg-muted py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Error2
          title="কমিটি সদস্যদের তথ্য লোড করা যায়নি"
          message="কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
        />
      </div>
    </section>
  )
}
