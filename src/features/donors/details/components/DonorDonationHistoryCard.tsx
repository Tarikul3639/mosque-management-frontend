"use client";

import Link from "next/link";
import { Receipt, Wallet } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ErrorComponent } from "@/components/common/error";
import { NotFound } from "@/components/common/not-found";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getErrorMessage } from "@/utils/get-error-message";

import { useGetDonorDonationHistoryQuery } from "@/store/api/donation.api";

interface DonorDonationHistoryCardProps {
    donorId: string;
}

export function DonorDonationHistoryCard({
    donorId,
}: DonorDonationHistoryCardProps) {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetDonorDonationHistoryQuery({
        donorId,
        page: 1,
        limit: 1000,
    });

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="mt-2 h-4 w-72" />
                </CardHeader>

                <CardContent className="space-y-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-14 w-full"
                        />
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <ErrorComponent
                title="Failed to load donation history."
                error={getErrorMessage(error)}
                onRetry={refetch}
            />
        );
    }

    if (!data) {
        return null;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle>Donation History</CardTitle>

                    <CardDescription>
                        {data.totalDonations} Donations •{" "}
                        {formatCurrency(data.totalAmount)}
                    </CardDescription>
                </div>

                <Wallet className="text-muted-foreground h-5 w-5" />
            </CardHeader>

            <CardContent>
                {data.donations.length === 0 ? (
                    <NotFound
                        className="border-0"
                        icon={<Wallet className="text-muted-foreground h-8 w-8" />}
                        title="No Donations"
                        description="This donor has not made any donations yet."
                    />
                ) : (
                    <div className="space-y-3">
                        {data.donations.map((donation) => (
                            <div
                                key={donation.id}
                                className="hover:bg-muted/40 flex items-center justify-between rounded-lg border p-4 transition-colors"
                            >
                                <div className="space-y-1">
                                    <p className="font-semibold">
                                        {formatCurrency(
                                            donation.amount,
                                        )}
                                    </p>

                                    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                                        <span>
                                            {formatDate(
                                                donation.donatedAt,
                                            )}
                                        </span>

                                        <span>•</span>

                                        <Badge variant="outline">
                                            {
                                                donation.paymentMethod
                                            }
                                        </Badge>
                                    </div>

                                    {donation.purpose && (
                                        <p className="text-muted-foreground text-sm">
                                            {donation.purpose}
                                        </p>
                                    )}

                                    <p className="text-muted-foreground text-xs">
                                        Receipt No:{" "}
                                        <span className="font-medium">
                                            {donation.receiptNo}
                                        </span>
                                    </p>
                                </div>

                                <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                >
                                    <Link
                                        href={`/donations/${donation.id}`}
                                    >
                                        <Receipt className="mr-2 h-4 w-4" />
                                        View
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}