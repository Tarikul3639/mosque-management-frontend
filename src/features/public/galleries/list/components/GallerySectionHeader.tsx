import { Images } from "lucide-react"
import { formatBengaliNumber } from "@/utils/format-bengali-number"

interface GallerySectionHeaderProps {
  total: number
}

export function GallerySectionHeader({ total }: GallerySectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Images className="size-5 text-primary" />

          <h2 className="text-2xl font-bold tracking-tight">সকল গ্যালারি</h2>
        </div>

        <p className="mt-2 text-muted-foreground">
          মসজিদের বিভিন্ন কার্যক্রম, অনুষ্ঠান ও উন্নয়ন কাজের স্মৃতিচারণমূলক
          ছবি।
        </p>
      </div>

      <div className="rounded-lg border bg-card px-4 py-2 text-sm shadow-sm">
        মোট{" "}
        <span className="font-semibold text-primary">
          {formatBengaliNumber(total)}
        </span>{" "}
        টি গ্যালারি
      </div>
    </div>
  )
}
