// src/features/families/details/components/CurrentFeeCard.tsx

"use client"

import { CalendarDays, Pencil, Wallet } from "lucide-react"
import { format } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { TK } from "@/components/icons/tk"

import { useGetCurrentFamilyFeeQuery } from "@/store/api/monthly-fees.api"

interface CurrentFeeCardProps {
    familyId: string
    onChangeFee?: (feeId?: string) => () => void
}

export function CurrentFeeCard({ familyId, onChangeFee }: CurrentFeeCardProps) {
    const {
        data: fee,
        isLoading,
        isFetching,
    } = useGetCurrentFamilyFeeQuery({
        familyId,
    })

    const loading = isLoading || isFetching

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Current Monthly Fee</CardTitle>

                <Button size="sm" onClick={onChangeFee?.(fee?.id)}>
                    <Pencil className="mr-2 size-4" />
                    Change Fee
                </Button>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div className="space-y-5">
                        <Skeleton className="h-9 w-40" />
                        <Skeleton className="h-5 w-52" />
                        <Skeleton className="h-5 w-52" />
                    </div>
                ) : !fee ? (
                    <div className="rounded-lg border border-dashed py-10 text-center">
                        <Wallet className="mx-auto mb-3 size-10 text-muted-foreground" />

                        <h3 className="font-medium">No Monthly Fee</h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            This family doesn't have an active monthly fee.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-1">
                                <TK className="size-7" />

                                <span className="text-4xl font-bold tracking-tight">
                                    {fee.monthlyFee.toLocaleString()}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Current monthly contribution for this family.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                    <CalendarDays className="size-4" />
                                    <span className="text-sm">Start Date</span>
                                </div>

                                <p className="font-medium">
                                    {format(new Date(fee.startDate), "dd MMM yyyy")}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                    <CalendarDays className="size-4" />
                                    <span className="text-sm">End Date</span>
                                </div>

                                <p className="font-medium">
                                    {fee.endDate
                                        ? format(new Date(fee.endDate), "dd MMM yyyy")
                                        : "Current"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
