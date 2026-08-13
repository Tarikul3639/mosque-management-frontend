import { Wallet } from "lucide-react"

import { formatBengaliNumber } from "@/utils/format-bengali-number"

interface ExpenseSectionHeaderProps {
  total: number
}

export function ExpenseSectionHeader({ total }: ExpenseSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          সকল ব্যয়ের তালিকা
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          মসজিদের সকল ব্যয়ের তথ্য, খরচের ধরন ও তারিখ এখানে প্রদর্শিত হয়েছে।
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-4 py-2">
        <Wallet className="size-5 text-primary" />

        <div>
          <p className="text-xs text-muted-foreground">মোট ব্যয়</p>

          <p className="font-semibold">{formatBengaliNumber(total)} টি</p>
        </div>
      </div>
    </div>
  )
}
