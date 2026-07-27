"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { TK } from "@/components/icons/TK";

import { cn } from "@/lib/utils";

import { formatDate } from "@/utils/date";
import { getAvatarColor, getAvatarInitials } from "@/utils/avatar";

export interface RecentDonation {
  id: string;
  donorName: string;
  amount: number;
  receiptNo: string;
  paymentMethod: string;
  donatedAt: string;
}

interface DonationItemProps {
  donation: RecentDonation;
}

function formatAmount(amount: number) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function DonationItem({
  donation,
}: DonationItemProps) {
  const avatarColor = getAvatarColor(donation.donorName);

  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-3 transition-colors duration-200 hover:bg-muted/50">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-11">
          <AvatarFallback
            className={cn(
              "font-medium",
              avatarColor.bg,
              avatarColor.text
            )}
          >
            {getAvatarInitials(donation.donorName)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h4
            className="truncate text-sm font-semibold text-foreground"
            title={donation.donorName}
          >
            {donation.donorName}
          </h4>

          <p className="truncate text-xs text-muted-foreground">
            {donation.paymentMethod} • {donation.receiptNo}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div
          className="inline-flex items-center gap-1 font-semibold leading-none"
          style={{
            color: "var(--color-chart-1)",
          }}
        >
          <TK className="size-3 shrink-0" />

          <span>{formatAmount(donation.amount)}</span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatDate(donation.donatedAt)}
        </p>
      </div>
    </div>
  );
}