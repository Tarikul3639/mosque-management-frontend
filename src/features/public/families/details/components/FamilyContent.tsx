import { Error2 } from "@/components/common/error2"

import { getFamilyDetails } from "@/services/api/families.service"

import { FamilyInfoCard } from "./FamilyInfoCard"
import { FamilyLedger } from "./FamilyLedger"
import { FamilyPaymentSummary } from "./FamilyPaymentSummary"
import { FamilyProfileCard } from "./FamilyProfileCard"

interface FamilyContentProps {
    familyId: string
}

export async function FamilyContent({
    familyId,
}: FamilyContentProps) {
    try {
        const family = await getFamilyDetails(familyId)

        return (
            <section className="mx-auto container space-y-6 px-4 pb-16">
                <FamilyProfileCard family={family} />

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-1">
                        <FamilyInfoCard family={family} />

                        <FamilyPaymentSummary
                            summary={family.paymentSummary}
                            currentFee={family.currentFee}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <FamilyLedger familyId={family.id} />
                    </div>
                </div>
            </section>
        )
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
}