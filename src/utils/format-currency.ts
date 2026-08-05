export function formatCurrency(
  amount: number | null | undefined,
  showFraction = true,
  locale = "en-BD"
): string {
  if (amount == null) {
    return showFraction ? "0.00" : "0"
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: showFraction ? 2 : 0,
    maximumFractionDigits: showFraction ? 2 : 0,
  }).format(amount)
}