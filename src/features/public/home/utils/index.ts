export function formatCurrency(value: number) {
  return new Intl.NumberFormat("bn-BD").format(value)
}

export function formatPercentage(value: number) {
  return `${value}%`
}
