"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";

import type { FamilyLedgerResponse } from "@/store/api/payment.api";

type LedgerItem = FamilyLedgerResponse["ledger"][number];

export const familyLedgerColumns: ColumnDef<LedgerItem>[] = [
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "month",
        header: "Month",
        cell: ({ row }) =>
            format(
                new Date(
                    row.original.year,
                    row.original.month - 1,
                    1,
                ),
                "MMMM",
            ),
    },
    {
        accessorKey: "chargeAmount",
        header: "Charge",
        cell: ({ row }) => (
            <span className="font-medium">
                ৳{row.original.chargeAmount.toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: "paidAmount",
        header: "Paid",
        cell: ({ row }) => (
            <span className="text-success">
                ৳{row.original.paidAmount.toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: "dueAmount",
        header: "Due",
        cell: ({ row }) => (
            <span className="text-destructive">
                ৳{row.original.dueAmount.toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;

            return (
                <Badge
                    variant={
                        status === "PAID"
                            ? "success"
                            : status === "PARTIAL"
                                ? "warning"
                                : "destructive"
                    }
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: "paymentCount",
        header: "Payments",
        cell: ({ row }) => row.original.payments.length,
    },
    {
        id: "lastPaidAt",
        header: "Last Paid",
        cell: ({ row }) => {
            const payments = row.original.payments;

            if (!payments.length) {
                return "-";
            }

            const lastPayment = payments.reduce((latest, current) =>
                new Date(current.paidAt) > new Date(latest.paidAt)
                    ? current
                    : latest,
            );

            return format(
                new Date(lastPayment.paidAt),
                "dd MMM yyyy",
            );
        },
    },
];