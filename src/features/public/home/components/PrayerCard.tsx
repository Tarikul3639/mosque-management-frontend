// src/features/public/home/components/PrayerCard.tsx

interface PrayerCardProps {
    name: string
    salatTime?: string | null
    isActive?: boolean
    className?: string
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯"

const toBn = (value: string | number) =>
    String(value).replace(/\d/g, (digit) => BN_DIGITS[Number(digit)])

export function PrayerCard({
    name,
    salatTime,
    isActive = false,
    className = "",
}: PrayerCardProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl text-center shadow-lg transition-transform duration-200 ${isActive
                    ? "bg-card text-card-foreground ring-2 ring-primary shadow-xl scale-105"
                    : "bg-primary/95 text-primary-foreground hover:bg-primary hover:scale-[1.02]"
                } ${className}`}
        >
            <h3
                className={`border-b px-3 py-2.5 text-base font-bold sm:px-4 sm:py-3 sm:text-lg ${isActive
                        ? "border-border"
                        : "border-primary-foreground/15"
                    }`}
            >
                {name}
            </h3>

            <div className="space-y-1 px-3 py-2.5 sm:px-4 sm:py-3">
                <p
                    className={`text-xs ${isActive
                            ? "text-muted-foreground"
                            : "text-primary-foreground/70"
                        }`}
                >
                    নামাজের সময়
                </p>

                <p
                    className={`text-sm font-semibold sm:text-base ${isActive ? "text-foreground" : ""
                        }`}
                >
                    {salatTime ? toBn(salatTime) : "—"}
                </p>
            </div>
        </div>
    )
}