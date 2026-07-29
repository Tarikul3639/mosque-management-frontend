"use client";

import { format, parseISO } from "date-fns";
import {
  AlertCircle,
  CalendarClock,
  CircleDollarSign,
  CreditCard,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { StatsCard } from "@/components/common/stats-card";

interface FamilyPaymentSummaryCardProps {
  currentFee: {
    monthlyFee: number;
  } | null;

  summary: {
    totalPaid: number;
    totalDue: number;
    lastPaymentAt: Date | string | null;
  };
}

export function FamilyPaymentSummaryCard({
  currentFee,
  summary,
}: FamilyPaymentSummaryCardProps) {
  return (
    <Card className="gap-0 border-border/60 shadow-xs">
      <CardHeader className="border-b border-border/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold tracking-tight">
            Payment Summary
          </CardTitle>

          {summary.totalDue > 0 ? (
            <Badge
              variant="outline"
              className="gap-1.5 border-destructive/30 bg-destructive/10 px-2.5 py-0.5 text-xs text-destructive"
            >
              <AlertCircle className="size-3.5" />
              Due Pending
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1.5 border-success/30 bg-success/10 px-2.5 py-0.5 text-xs text-success"
            >
              <TrendingUp className="size-3.5" />
              All Clear
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Monthly Fee"
            value={`৳${(currentFee?.monthlyFee ?? 0).toLocaleString()}`}
            subtitle="Current assigned fee"
            icon={<Wallet className="size-5" />}
            iconBg="bg-primary/10 border border-primary/20"
            iconColor="text-primary"
          />

          <StatsCard
            title="Total Paid"
            value={`৳${summary.totalPaid.toLocaleString()}`}
            subtitle="All successful payments"
            icon={<CircleDollarSign className="size-5" />}
            iconBg="bg-success/10 border border-success/20"
            iconColor="text-success"
          />

          <StatsCard
            title="Current Due"
            value={`৳${summary.totalDue.toLocaleString()}`}
            subtitle={
              summary.totalDue > 0
                ? "Outstanding balance"
                : "No outstanding balance"
            }
            valueColor={
              summary.totalDue > 0 ? "text-destructive" : undefined
            }
            icon={<CreditCard className="size-5" />}
            iconBg={
              summary.totalDue > 0
                ? "bg-destructive/10 border border-destructive/20"
                : "bg-success/10 border border-success/20"
            }
            iconColor={
              summary.totalDue > 0
                ? "text-destructive"
                : "text-success"
            }
          />

          <StatsCard
            title="Last Payment"
            value={
              summary.lastPaymentAt
                ? format(
                  typeof summary.lastPaymentAt === "string"
                    ? parseISO(summary.lastPaymentAt)
                    : summary.lastPaymentAt,
                  "dd MMM yyyy",
                )
                : "Never"
            }
            subtitle="Latest payment received"
            icon={<CalendarClock className="size-5" />}
            iconBg="bg-secondary border border-border"
            iconColor="text-secondary-foreground"
          />
        </div>
      </CardContent>
    </Card>
  );
}