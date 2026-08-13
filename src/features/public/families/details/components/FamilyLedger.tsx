import { Receipt, SearchX } from "lucide-react"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { EmptyState } from "@/components/common/empty-state"
import { Error2 } from "@/components/common/error2"

import { MONTHS } from "@/constants/date"
import { getFamilyLedger } from "@/services/api/families.service"
import { LedgerFilters } from "./LedgerFilters"

interface FamilyLedgerProps {
    familyId: string
    year?: number
    month?: number
}

export async function FamilyLedger({
    familyId,
    year,
    month,
}: FamilyLedgerProps) {
    try {
        const ledger = await getFamilyLedger(familyId, {
            year,
            month,
        })

        return (
            <Card className="px-0 sm:px-2">
                <LedgerHeader />

                <CardContent className="px-0 sm:px-6">
                    {ledger.ledger.length === 0 ? (
                        <div className="px-4 sm:px-0">
                            <EmptyState
                                title="কোনো লেজার পাওয়া যায়নি"
                                description="নির্বাচিত সময়ের জন্য কোনো চাঁদার তথ্য পাওয়া যায়নি।"
                                icon={<SearchX className="size-5" />}
                            />
                        </div>
                    ) : (
                        <>
                            {/* Column labels — desktop only */}
                            <div className="hidden grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.9fr] gap-3 px-1 pb-2 text-xs text-muted-foreground sm:grid">
                                <span>মাস</span>
                                <span className="text-right">চাঁদা</span>
                                <span className="text-right">পরিশোধ</span>
                                <span className="text-right">বকেয়া</span>
                                <span className="text-right">অবস্থা</span>
                            </div>

                            <ul className="divide-y">
                                {ledger.ledger.map((item) => (
                                    <li key={item.monthlyChargeId} className="px-4 py-3 sm:px-1">
                                        {/* Row — desktop */}
                                        <div className="hidden items-center gap-3 sm:grid sm:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.9fr]">
                                            <span className="text-sm font-medium">
                                                {MONTHS[item.month - 1].label} {item.year}
                                            </span>

                                            <span className="text-right text-sm">
                                                ৳{item.chargeAmount.toLocaleString()}
                                            </span>
                                            <span className="text-right text-sm">
                                                ৳{item.paidAmount.toLocaleString()}
                                            </span>
                                            <span
                                                className={cn(
                                                    "text-right text-sm",
                                                    item.dueAmount > 0 && "font-medium text-destructive"
                                                )}
                                            >
                                                ৳{item.dueAmount.toLocaleString()}
                                            </span>
                                            <span className="text-right">
                                                <StatusBadge status={item.status} />
                                            </span>
                                        </div>

                                        {/* Row — mobile */}
                                        <div className="sm:hidden">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-sm font-medium">
                                                    {MONTHS[item.month - 1].label} {item.year}
                                                </span>

                                                <StatusBadge status={item.status} />
                                            </div>

                                            <div className="mt-2.5 grid grid-cols-3 gap-2">
                                                <MobileStat
                                                    label="চাঁদা"
                                                    value={item.chargeAmount}
                                                />
                                                <MobileStat
                                                    label="পরিশোধ"
                                                    value={item.paidAmount}
                                                />
                                                <MobileStat
                                                    label="বকেয়া"
                                                    value={item.dueAmount}
                                                    danger={item.dueAmount > 0}
                                                />
                                            </div>
                                        </div>

                                        {/* Payments */}
                                        {item.payments.length > 0 && (
                                            <ul className="mt-3 space-y-1.5 border-t border-dashed pt-2.5">
                                                {item.payments.map((payment) => (
                                                    <li
                                                        key={payment.id}
                                                        className="flex flex-col gap-0.5 text-xs text-muted-foreground sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
                                                    >
                                                        <span className="wrap-break-word">
                                                            ৳{payment.amount.toLocaleString()} —{" "}
                                                            {payment.method}
                                                            {payment.reference &&
                                                                ` (Ref: ${payment.reference})`}
                                                            {payment.note && ` · ${payment.note}`}
                                                        </span>

                                                        <span className="shrink-0">
                                                            {new Date(payment.paidAt).toLocaleDateString(
                                                                "bn-BD"
                                                            )}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </CardContent>
            </Card>
        )
    } catch {
        return (
            <Card>
                <LedgerHeader />

                <CardContent>
                    <Error2
                        title="লেজার লোড করা যায়নি"
                        message="কিছুক্ষণ পরে আবার চেষ্টা করুন।"
                    />
                </CardContent>
            </Card>
        )
    }
}

function LedgerHeader() {
    return (
        <CardHeader className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Receipt className="size-4.5" />
                </span>

                <div>
                    <h3 className="text-base leading-none font-semibold">
                        মাসিক চাঁদা লেজার
                    </h3>

                    <p className="mt-1.5 text-xs text-muted-foreground">
                        মাস অনুযায়ী চাঁদা ও পেমেন্টের হিসাব
                    </p>
                </div>
            </div>

            <LedgerFilters />
        </CardHeader>
    )
}

interface MobileStatProps {
    label: string
    value: number
    danger?: boolean
}

function MobileStat({ label, value, danger = false }: MobileStatProps) {
    return (
        <div>
            <p className="text-[10px] text-muted-foreground">{label}</p>
            <p
                className={cn(
                    "mt-0.5 text-xs font-semibold",
                    danger && "text-destructive"
                )}
            >
                ৳{value.toLocaleString()}
            </p>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "PAID":
            return (
                <Badge className="rounded-full bg-emerald-600 hover:bg-emerald-600">
                    পরিশোধিত
                </Badge>
            )

        case "PARTIAL":
            return (
                <Badge variant="secondary" className="rounded-full">
                    আংশিক পরিশোধ
                </Badge>
            )

        case "DUE":
            return (
                <Badge variant="destructive" className="rounded-full">
                    বকেয়া
                </Badge>
            )

        default:
            return (
                <Badge variant="outline" className="rounded-full">
                    {status}
                </Badge>
            )
    }
}