import { TK } from "@/components/icons/tk"
import { formatCurrency } from "@/utils/format-currency"

interface CurrencyProps {
    amount: number | null | undefined
    className?: string
    iconClassName?: string
    showFraction?: boolean
}

export function Currency({
    amount,
    className = "",
    iconClassName = "size-3.5",
    showFraction = true,
}: CurrencyProps) {
    return (
        <span className={`inline-flex items-center gap-0.5 ${className}`}>
            <TK className={iconClassName} />
            <span>{formatCurrency(amount, showFraction)}</span>
        </span>
    )
}