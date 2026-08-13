interface FamilySectionHeaderProps {
  total: number
}

export const FamilySectionHeader = ({ total }: FamilySectionHeaderProps) => {
  return (
    <div className="mt-5 mb-4 flex items-center justify-between px-1">
      <div className="flex items-center gap-2.5">
        <div className="h-4 w-1 rounded-full bg-primary" />

        <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
          পরিবারের তালিকা
        </h2>

        <span className="inline-flex min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
          {total}
        </span>
      </div>

      <span className="hidden text-xs text-muted-foreground sm:block sm:text-sm">
        মোট {total} পরিবার
      </span>
    </div>
  )
}
