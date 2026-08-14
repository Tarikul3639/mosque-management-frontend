import { api as apiClient } from "@/lib/axios"
import type { CommitteeListResponse, CommitteeQuery } from "@/types/committee"
import type { Designation } from "@/constants/designation"

/* ------------------------------ API call ------------------------------ */
export async function getCommitteeMembers(
  params?: CommitteeQuery
): Promise<CommitteeListResponse | null> {
  try {
    const { data } = await apiClient.get<CommitteeListResponse>("/committee", {
      params,
    })
    return data
  } catch (error) {
    console.error("Committee fetch failed:", error)
    return null
  }
}
