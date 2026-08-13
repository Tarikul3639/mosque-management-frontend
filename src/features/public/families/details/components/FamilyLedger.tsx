import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
    getFamilyLedger,
} from "@/services/api/families.service"

interface FamilyLedgerProps {
    familyId: string
}

export async function FamilyLedger({
    familyId,
}: FamilyLedgerProps) {
    const ledger = await getFamilyLedger(familyId)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    মাসিক লেজার
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {ledger.ledger.map((item) => (
                    <div
                        key={item.monthlyChargeId}
                        className="rounded-lg border p-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">
                                {item.month}/{item.year}
                            </h3>

                            <Badge>
                                {item.status}
                            </Badge>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            <LedgerValue
                                title="মাসিক চাঁদা"
                                value={item.chargeAmount}
                            />

                            <LedgerValue
                                title="পরিশোধ"
                                value={item.paidAmount}
                            />

                            <LedgerValue
                                title="বকেয়া"
                                value={item.dueAmount}
                            />
                        </div>

                        {item.payments.length > 0 && (
                            <div className="mt-5 space-y-2 border-t pt-4">
                                {item.payments.map((payment) => (
                                    <div
                                        key={payment.id}
                                        className="flex items-center justify-between rounded-md bg-muted/40 p-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                ৳{payment.amount}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    payment.method
                                                }
                                            </p>
                                        </div>

                                        <div className="text-right text-xs text-muted-foreground">
                                            {new Date(
                                                payment.paidAt,
                                            ).toLocaleDateString(
                                                "bn-BD",
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

interface LedgerValueProps {
    title: string
    value: number
}

function LedgerValue({
    title,
    value,
}: LedgerValueProps) {
    return (
        <div className="rounded-md border p-3">
            <p className="text-xs text-muted-foreground">
                {title}
            </p>

            <p className="mt-1 text-lg font-semibold">
                ৳{value}
            </p>
        </div>
    )
}