import type { Metadata } from "next";

import { MonthlyChargeEditPage } from "@/features/monthly-charges/edit/MonthlyChargeEditPage";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata: Metadata = {
    title: "Edit Monthly Charge",
    description: "Update monthly charge information.",
};

export default async function Page({
    params,
}: PageProps) {
    const { id } = await params;

    return (
        <MonthlyChargeEditPage
            id={id}
        />
    );
}