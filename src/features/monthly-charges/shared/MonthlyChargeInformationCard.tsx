"use client";

import Link from "next/link";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Home,
  User,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { formatMonth } from "@/utils/format-month";

import type { MonthlyCharge } from "@/types/monthly-charge";
import { PaymentStatus } from "@/types/payment";

interface MonthlyChargeInformationCardProps {
  monthlyCharge: MonthlyCharge;
}

export function MonthlyChargeInformationCard({
  monthlyCharge,
}: MonthlyChargeInformationCardProps) {
  const dueAmount =
    Number(monthlyCharge.amount) -
    Number(monthlyCharge.paidAmount);

  return (
    <Card>
      <CardHeader className="bg-muted/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary">
              {getStatusLabel(monthlyCharge.status)}
            </Badge>

            <CardTitle className="text-2xl">
              {monthlyCharge.familyNo}
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              {monthlyCharge.headName}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Total Charge
            </p>

            <p className="text-3xl font-bold text-primary">
              {formatCurrency(monthlyCharge.amount)}
            </p>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4 pt-6">
        <InfoRow
          icon={<Home className="size-4" />}
          label="Family"
          value={
            <Link
              href={`/families/${monthlyCharge.familyId}`}
              className="font-medium text-primary hover:underline"
            >
              {monthlyCharge.familyNo}
            </Link>
          }
        />

        <InfoRow
          icon={<User className="size-4" />}
          label="Head Name"
          value={monthlyCharge.headName}
        />

        <InfoRow
          icon={<CalendarDays className="size-4" />}
          label="Billing Period"
          value={`${formatMonth(
            monthlyCharge.month
          )} ${monthlyCharge.year}`}
        />

        <InfoRow
          icon={<Wallet className="size-4" />}
          label="Total Amount"
          value={formatCurrency(
            monthlyCharge.amount
          )}
        />

        <InfoRow
          icon={<CreditCard className="size-4" />}
          label="Paid Amount"
          value={formatCurrency(
            monthlyCharge.paidAmount
          )}
        />

        <InfoRow
          icon={<Wallet className="size-4" />}
          label="Due Amount"
          value={
            <span
              className={
                dueAmount > 0
                  ? "font-semibold text-destructive"
                  : "font-semibold text-green-600"
              }
            >
              {formatCurrency(dueAmount)}
            </span>
          }
        />

        <InfoRow
          icon={<CheckCircle2 className="size-4" />}
          label="Status"
          value={
            <StatusBadge
              status={monthlyCharge.status}
            />
          }
        />

        <InfoRow
          icon={<Clock3 className="size-4" />}
          label="Due Date"
          value={formatDate(
            monthlyCharge.dueDate
          )}
        />

        {monthlyCharge.paidAt && (
          <InfoRow
            icon={<CalendarDays className="size-4" />}
            label="Paid At"
            value={formatDate(
              monthlyCharge.paidAt
            )}
          />
        )}

        <Separator />

        <InfoRow
          icon={<CalendarDays className="size-4" />}
          label="Created At"
          value={formatDate(
            monthlyCharge.createdAt
          )}
        />

        <InfoRow
          icon={<CalendarDays className="size-4" />}
          label="Updated At"
          value={formatDate(
            monthlyCharge.updatedAt
          )}
        />
      </CardContent>
    </Card>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="flex size-8 items-center justify-center rounded-md bg-muted">
          {icon}
        </div>

        <span className="text-sm">
          {label}
        </span>
      </div>

      <div className="text-right text-sm font-medium">
        {value}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  switch (status) {
    case PaymentStatus.PAID:
      return (
        <Badge className="bg-green-500 hover:bg-green-500">
          Paid
        </Badge>
      );

    case PaymentStatus.PARTIAL:
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-500">
          Partial
        </Badge>
      );

    default:
      return (
        <Badge variant="destructive">
          Due
        </Badge>
      );
  }
}

function getStatusLabel(
  status: PaymentStatus
) {
  switch (status) {
    case PaymentStatus.PAID:
      return "Paid";

    case PaymentStatus.PARTIAL:
      return "Partial";

    default:
      return "Due";
  }
}