"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TK } from "@/components/icons/tk";

import type { FamilyFeeHistoryResponse } from "@/store/api/family.api";

export const familyFeeHistoryColumns: ColumnDef<FamilyFeeHistoryResponse>[] = [
    {
        accessorKey: "monthlyFee",
        header: "Monthly Fee",
        cell: ({ row }) => (
            <span className="flex items-center font-medium">
                <TK className="size-4 inline-block mr-0.5" />
                {row.original.monthlyFee.toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) =>
            format(
                new Date(row.original.startDate),
                "dd MMM yyyy",
            ),
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) =>
            row.original.endDate ? (
                format(
                    new Date(row.original.endDate),
                    "dd MMM yyyy",
                )
            ) : (
                <Badge variant="secondary">
                    Current
                </Badge>
            ),
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) =>
            format(
                new Date(row.original.createdAt),
                "dd MMM yyyy",
            ),
    },
];