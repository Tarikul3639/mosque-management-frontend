"use client";

import Link from "next/link";
import {
  CalendarPlus,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface MonthlyChargesHeaderProps {
  onGenerate?: () => void;
  generating?: boolean;
}

export function MonthlyChargesHeader({
  onGenerate,
  generating = false,
}: MonthlyChargesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Monthly Charges
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage monthly family charges, payment status and due balances.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onGenerate}
          disabled={generating}
        >
          <CalendarPlus className="mr-2 size-4" />
          {generating
            ? "Generating..."
            : "Generate Charges"}
        </Button>

        <Button asChild>
          <Link href="/payments/create">
            <Plus className="mr-2 size-4" />
            Record Payment
          </Link>
        </Button>
      </div>
    </div>
  );
}