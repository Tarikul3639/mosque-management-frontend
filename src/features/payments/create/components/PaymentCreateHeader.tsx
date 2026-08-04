// src/features/payments/create/components/PaymentCreateHeader.tsx

"use client";

import Link from "next/link";

import {
    ArrowLeft,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function PaymentCreateHeader() {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-fit"
                >
                    <Link href="/payments">
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Payments
                    </Link>
                </Button>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create Payment
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Record a new payment for a family's monthly charge.
                    </p>
                </div>
            </div>

            <Button
                type="submit"
                form="payment-form"
            >
                <Plus className="mr-2 size-4" />
                Save Payment
            </Button>
        </div>
    );
}