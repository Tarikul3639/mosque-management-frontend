export function getBalanceStyle(amount: number) {
  if (amount > 0) {
    return {
      text: "text-success",
      foreground: "text-success-foreground",
      bg: "bg-success-bg",
    }
  }

  if (amount < 0) {
    return {
      text: "text-danger",
      foreground: "text-danger-foreground",
      bg: "bg-danger-bg",
    }
  }

  return {
    text: "text-muted-foreground",
    foreground: "text-muted-foreground",
    bg: "bg-muted",
  }
}
