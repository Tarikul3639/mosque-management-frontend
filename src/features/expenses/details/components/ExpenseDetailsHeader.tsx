// src/features/expenses/details/components/ExpenseDetailsHeader.tsx

"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Pencil,
    Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExpenseDetailsHeaderProps {
    expenseId: string;
    title: string;
}

export function ExpenseDetailsHeader({
    expenseId,
    title,
}: ExpenseDetailsHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
                <div className="space-y-2">
                    <Button
                        asChild
                        variant="ghost"
                        className="w-fit px-0 hover:bg-transparent"
                    >
                        <Link href={`/expenses`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Expense
                        </Link>
                    </Button>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Wallet className="size-6 text-primary" />

                            <h1 className="text-3xl font-bold tracking-tight">
                                Expense Details
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">
                                {title}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <Button asChild>
                <Link href={`/expenses/${expenseId}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Edit Expense
                </Link>
            </Button>
        </div>
    );
}