"use client"

import { Search, X } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { PAYMENT_METHOD_FILTER_OPTIONS } from "@/constants/payment-methods"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DataTableColumnVisibility } from "@/components/common/data-table"
import { PaymentMethod } from "@/types/payment"

interface DonationFiltersProps<TData> {
  table: Table<TData>

  search: string
  paymentMethod: "ALL" | PaymentMethod

  onSearchChange: (value: string) => void
  onPaymentMethodChange: (value: "ALL" | PaymentMethod) => void

  onReset: () => void
  isFiltered?: boolean
}

export function DonationFilters<TData>({
  table,
  search,
  paymentMethod,
  onSearchChange,
  onPaymentMethodChange,
  onReset,
  isFiltered = false,
}: DonationFiltersProps<TData>) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          placeholder="Search donor, receipt or phone..."
          className="rounded-lg py-6 pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
        <SelectTrigger className="w-full lg:w-52">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>

        <SelectContent>
          {PAYMENT_METHOD_FILTER_OPTIONS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isFiltered && (
        <Button variant="ghost" onClick={onReset}>
          <X className="mr-2 size-4" />
          Reset
        </Button>
      )}
      <DataTableColumnVisibility table={table} />
    </div>
  )
}
