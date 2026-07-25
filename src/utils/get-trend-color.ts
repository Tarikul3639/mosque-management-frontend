export type Trend = "increase" | "decrease" | "neutral"

export interface TrendStyle {
  text: string
  foreground: string
  bg: string
}

const TREND_STYLES: Record<Trend, TrendStyle> = {
  increase: {
    text: "text-success",
    foreground: "text-success-foreground",
    bg: "bg-success-bg",
  },

  decrease: {
    text: "text-danger",
    foreground: "text-danger-foreground",
    bg: "bg-danger-bg",
  },

  neutral: {
    text: "text-muted-foreground",
    foreground: "text-muted-foreground",
    bg: "bg-muted",
  },
}

export function getTrendStyle(trend: Trend): TrendStyle {
  return TREND_STYLES[trend]
}
