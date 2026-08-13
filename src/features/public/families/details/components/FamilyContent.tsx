import { Error2 } from "@/components/common/error2"

import { getFamilyDetails } from "@/services/api/families.service"

import { FamilyInfoCard } from "./FamilyInfoCard"
import { FamilyLedger } from "./FamilyLedger"
import { FamilyPaymentSummary } from "./FamilyPaymentSummary"
import { FamilyProfileCard } from "./FamilyProfileCard"

interface FamilyContentProps {
  familyId: string
  year?: number
  month?: number
}

export async function FamilyContent({
  familyId,
  year,
  month,
}: FamilyContentProps) {
  try {
    const family = await getFamilyDetails(familyId)

    return (
      <section className="container mx-auto space-y-6 px-4 pb-16">
        <FamilyProfileCard family={family} />

        <div className="grid gap-6 lg:grid-cols-3">
          <aside className="space-y-6 lg:col-span-1">
            <FamilyInfoCard family={family} />

            <FamilyPaymentSummary
              currentFee={family.currentFee}
              summary={family.paymentSummary}
            />
          </aside>

          <div className="lg:col-span-2">
            <FamilyLedger familyId={family.id} year={year} month={month} />
          </div>
        </div>
      </section>
    )
  } catch {
    return (
      <section className="container mx-auto px-4 pb-16">
        <Error2
          title="পরিবারের তথ্য লোড করা যায়নি"
          message="কিছুক্ষণ পরে আবার চেষ্টা করুন।"
        />
      </section>
    )
  }
}
