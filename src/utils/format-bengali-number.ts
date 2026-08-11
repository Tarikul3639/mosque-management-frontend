const BN_DIGITS = "০১২৩৪৫৬৭৮৯"

export function formatBengaliNumber(
    value: string | number | null | undefined,
): string {
    if (!value) return ""
    
    return String(value).replace(
        /\d/g,
        (digit) => BN_DIGITS[Number(digit)],
    )
}