"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "@/components/common/data-table";
import { useGetFamilyFeeHistoryQuery } from "@/store/api/family.api";
import { familyFeeHistoryColumns } from "./family-fee-history-columns";

interface FamilyFeeHistoryProps {
  familyId: string;
}

export function FamilyFeeHistory({
  familyId,
}: FamilyFeeHistoryProps) {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetFamilyFeeHistoryQuery({
    familyId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee History</CardTitle>

        <CardDescription>
          Monthly fee changes for this family.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={familyFeeHistoryColumns}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          emptyTitle="No Fee History"
          emptyDescription="This family doesn't have any fee history yet."
        />
      </CardContent>
    </Card>
  );
}