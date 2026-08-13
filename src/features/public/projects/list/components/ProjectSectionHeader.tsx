interface ProjectSectionHeaderProps {
  total: number
}

export function ProjectSectionHeader({ total }: ProjectSectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-row items-center justify-between gap-3 border-b pb-4">
      <div className="line-clamp-2">
        <h2 className="text-2xl font-bold tracking-tight">
          উন্নয়ন প্রকল্পসমূহ
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          মসজিদের সকল উন্নয়নমূলক কার্যক্রমের তালিকা।
        </p>
      </div>

      <div className="min-w-30 rounded-full bg-muted px-4 py-2 text-sm font-medium">
        মোট {total} টি প্রকল্প
      </div>
    </div>
  )
}
