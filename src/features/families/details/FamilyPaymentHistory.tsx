"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TK } from "@/components/icons/tk"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { MONTHS } from "@/constants/date"
import { DataTable } from "@/components/common/data-table"
import { familyLedgerColumns } from "./familyLedgerColumns"
import { useGetFamilyLedgerQuery } from "@/store/api/payment.api"

interface FamilyPaymentHistoryProps {
  familyId: string
}

export function FamilyPaymentHistory({ familyId }: FamilyPaymentHistoryProps) {
  const currentYear = new Date().getFullYear()

  const [query, setQuery] = useState({
    familyId,
    year: currentYear,
    month: undefined as number | undefined,
  })

  const { data, isLoading, isFetching } = useGetFamilyLedgerQuery(query)

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div>
            <CardTitle>Payment History</CardTitle>

            <CardDescription>
              Recent payments made by this family.
            </CardDescription>
          </div>

          {data?.summary && (
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                Charge: <TK />
                {data.summary.totalCharge.toLocaleString()}
              </Badge>

              <Badge variant="success">
                Paid: <TK />
                {data.summary.totalPaid.toLocaleString()}
              </Badge>

              <Badge variant="destructive">
                Due: <TK />
                {data.summary.totalDue.toLocaleString()}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Select
            value={query.year.toString()}
            onValueChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                year: Number(value),
              }))
            }
          >
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {Array.from({ length: 5 }, (_, index) => currentYear - index).map(
                (year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Select
            value={query.month?.toString() ?? "all"}
            onValueChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                month: value === "all" ? undefined : Number(value),
              }))
            }
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>

              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() =>
              setQuery({
                familyId,
                year: currentYear,
                month: undefined,
              })
            }
          >
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={familyLedgerColumns}
          data={data?.ledger ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          emptyTitle="No payment history found"
          emptyDescription="This family has not made any payments yet."
        />
      </CardContent>
    </Card>
  )
}
