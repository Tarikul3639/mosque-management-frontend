import { getDashboardSummary } from "@/services/api/dashboard-summary.service"

import { FinancialSummary } from "./FinancialSummary"
import { FinancialSummaryError } from "./FinancialSummaryError"

export async function FinancialSummaryContainer() {
  try {
    const data = await getDashboardSummary()

    if (!data) {
      return <FinancialSummaryError message="আর্থিক তথ্য পাওয়া যায়নি।" />
    }

    return <FinancialSummary data={data} />
  } catch (error) {
    console.error("[FinancialSummary] fetch failed:", error)
    return (
      <FinancialSummaryError message="সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।" />
    )
  }
}