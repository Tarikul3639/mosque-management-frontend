import { api } from "@/lib/axios"

export interface CommitteeQueryParams {
    page?: number
    limit?: number
    search?: string
}

interface FamilyAvatar {
    id: string
    url: string
}

interface Family {
    id: string
    familyNo: string
    headName: string
    phone: string | null
    email: string | null
    address: string
    avatar: FamilyAvatar | null
    isActive: boolean
}

export interface GetFamiliesResponse {
    data: Family[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export async function getFamilies(
    params: CommitteeQueryParams = {}
) {
    try {
        const { data } = await api.get<GetFamiliesResponse>("/families", {
            params,
        })

        return data
    } catch (error) {
        console.error("Error fetching families:", error)
        throw error
    }
}