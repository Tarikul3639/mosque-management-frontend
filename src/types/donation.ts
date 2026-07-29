// src/modules/donations/types/donation.ts

import type { PaymentMethod } from "@/types/payment"

export interface DonationDonor {
    id: string
    name: string
    phone: string
    email: string | null
    address: string | null
}

export interface DonationUser {
    id: string
    name: string
}

export interface Donation {
    id: string
    amount: number
    purpose: string | null
    isAnonymous: boolean
    receiptNo: string
    paymentMethod: PaymentMethod
    transactionReference: string | null
    note: string | null
    donatedAt: string

    donor: DonationDonor

    createdBy: DonationUser
    updatedBy: DonationUser

    createdAt: string
    updatedAt: string
}

export interface DonationSummary {
    totalDonations: number
    totalAmount: number
    averageAmount: number
}

export interface DonorDonationHistoryItem {
    id: string
    receiptNo: string
    amount: number
    purpose: string | null
    paymentMethod: PaymentMethod
    donatedAt: string
}

export interface DonorDonationHistory {
    donor: DonationDonor
    totalDonations: number
    totalAmount: number
    donations: DonorDonationHistoryItem[]
}

export interface DonationQuery {
    page?: number
    limit?: number
    search?: string
    paymentMethod?: PaymentMethod
    fromDate?: string
    toDate?: string
}

export interface DonationSummaryQuery {
    fromDate?: string
    toDate?: string
    paymentMethod?: PaymentMethod
}

export interface DonorDonationHistoryQuery {
    donorId: string
    page?: number
    limit?: number
}

export interface CreateDonationRequest {
    donorId: string
    amount: number
    purpose?: string
    isAnonymous: boolean
    paymentMethod: PaymentMethod
    transactionReference?: string
    note?: string
    donatedAt: string
}

export interface UpdateDonationRequest {
    donorId?: string
    amount?: number
    purpose?: string
    isAnonymous?: boolean
    paymentMethod?: PaymentMethod
    transactionReference?: string
    note?: string
    donatedAt?: string
}

export interface DonationListResponse {
    data: Donation[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export type DonationResponse = Donation

export type DonationReceiptResponse = Donation

export type DonationSummaryResponse = DonationSummary

export type DonorDonationHistoryResponse = DonorDonationHistory

export interface DeleteDonationResponse {
    message: string
}
