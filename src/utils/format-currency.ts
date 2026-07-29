export function formatCurrency(
    amount: number,
    locale = "en-BD",
    currency = "BDT",
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}