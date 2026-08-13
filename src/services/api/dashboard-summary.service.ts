import { api } from "@/lib/axios"

export interface DashboardSummaryResponse {
  totalDonation: number
  totalExpense: number
  balance: number
  monthlyDonation: number
  monthlyExpense: number
  monthlyBalance: number
}

export async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
  try {
    const { data } =
      await api.get<DashboardSummaryResponse>("/dashboard/summary")
    return data
  } catch (error) {
    console.error("[getDashboardSummary] API call failed:", error)
    throw error
  }
}
