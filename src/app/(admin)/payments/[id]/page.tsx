// src/app/(admin)/payments/[id]/page.tsx

import type { Metadata } from "next";

import { PaymentDetailsPage } from "@/features/payments/details/PaymentDetailsPage";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata: Metadata = {
    title: "Payment Details",
    description: "View payment details and transaction history.",
};

export default async function Page({
    params,
}: PageProps) {
    const { id } = await params;

    return (
        <PaymentDetailsPage
            id={id}
        />
    );
}