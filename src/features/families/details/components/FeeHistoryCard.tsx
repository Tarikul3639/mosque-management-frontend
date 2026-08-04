// src/features/families/details/components/FeeHistoryCard.tsx

"use client";

import { Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/common/data-table";

import { useGetFamilyFeeHistoryQuery } from "@/store/api/monthly-fees.api";

import { familyFeeHistoryColumns } from "./family-fee-history-columns";

interface FeeHistoryCardProps {
  familyId: string;
  onCreateFee?: () => void;
  onEditFee?: (feeId: string) => void;
}

export function FeeHistoryCard({
  familyId,
  onCreateFee,
  onEditFee,
}: FeeHistoryCardProps) {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetFamilyFeeHistoryQuery({
    familyId,
  });

  const columns = familyFeeHistoryColumns({
    onEdit: onEditFee,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Fee History</CardTitle>

          <CardDescription>
            View all monthly fee changes for this family.
          </CardDescription>
        </div>

        <Button onClick={onCreateFee}>
          <Plus className="mr-2 size-4" />
          Add Fee
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          emptyTitle="No Fee History"
          emptyDescription="No monthly fee records found for this family."
        />
      </CardContent>
    </Card>
  );
}