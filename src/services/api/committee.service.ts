import { api as apiClient } from "@/lib/axios"

/* ------------------------------- Types ------------------------------- */
export type CommitteeDesignation =
    | "PRESIDENT"
    | "VICE_PRESIDENT"
    | "SECRETARY"
    | "ASSISTANT_SECRETARY"
    | "TREASURER"
    | "MEMBER"
    | "IMAM"
    | "MUAZZIN"

export interface CommitteeAvatar {
    id: string
    url: string
}

export interface CommitteeMember {
    id: string
    name: string
    designation: CommitteeDesignation
    phone?: string
    email?: string
    avatar?: CommitteeAvatar | null
    address?: string
    joiningDate?: string
    endDate?: string
    isActive: boolean
}

export interface CommitteeSummary {
    totalMembers: number
    activeMembers: number
    inactiveMembers: number
    presidents: number
    vicePresidents: number
    secretaries: number
    assistantSecretaries: number
    treasurers: number
    imams: number
    muazzins: number
    members: number
}

export interface CommitteeMeta {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface CommitteeResponse {
    data: CommitteeMember[]
    summary: CommitteeSummary
    meta: CommitteeMeta
}

export interface CommitteeQueryParams {
    page?: number
    limit?: number
    search?: string
    designation?: CommitteeDesignation
    isActive?: boolean
}

/* ------------------------------ API call ------------------------------ */
export async function getCommitteeMembers(
    params?: CommitteeQueryParams
): Promise<CommitteeResponse | null> {
    try {
        const { data } = await apiClient.get<CommitteeResponse>("/committee", {
            params,
        })
        return data
    } catch (error) {
        console.error("Committee fetch failed:", error)
        return null
    }
}