"use client"

import Link from "next/link"

import { ArrowLeft, CalendarDays, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"

import { formatMonth } from "@/utils/format-month"

interface MonthlyChargeDetailsHeaderProps {
  id: string
  familyNo: string
  month: number
  year: number
}

export function MonthlyChargeDetailsHeader({
  id,
  familyNo,
  month,
  year,
}: MonthlyChargeDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit px-0 text-muted-foreground hover:bg-transparent"
        >
          <Link href="/monthly-charges">
            <ArrowLeft className="mr-2 size-4" />
            Back to Monthly Charges
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Monthly Charge Details
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{familyNo}</span>

            <span>•</span>

            <CalendarDays className="size-4" />

            <span>
              {formatMonth(month)} {year}
            </span>
          </div>
        </div>
      </div>

      <Button asChild>
        <Link href={`/monthly-charges/${id}/edit`}>
          <Pencil className="mr-2 size-4" />
          Edit Charge
        </Link>
      </Button>
    </div>
  )
}
