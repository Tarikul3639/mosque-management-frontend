import { getDashboardSummary } from "@/services/api/dashboard-summary.service"

import { FinancialSummary } from "./FinancialSummary"
import { Error2 } from "@/components/common/error2"

export async function FinancialSummaryContainer() {
  try {
    const data = await getDashboardSummary()

    if (!data) {
      return <Error2 message="আর্থিক তথ্য পাওয়া যায়নি।" />
    }

    return <FinancialSummary data={data} />
  } catch (error) {
    console.error("[FinancialSummary] fetch failed:", error)
    return (
      <Error2 message="সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।" />
    )
  }
}