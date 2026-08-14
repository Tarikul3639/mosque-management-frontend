// src/components/public/navbar/NavbarBrand.tsx

import Link from "next/link"

import { ROUTES } from "@/config/routes"
import { Logo } from "@/components/icons/Logo"

export function NavbarBrand() {
  return (
    <Link
      href={ROUTES.PUBLIC.HOME}
      className="flex min-w-0 items-center gap-3 overflow-hidden"
    >
      <Logo className="size-11 shrink-0 sm:block" color="var(--primary)" />

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-bold text-foreground sm:text-lg">
          বাইতুল আমান <span className="hidden sm:inline">জামে মসজিদ</span>
        </h1>

        <p className="hidden truncate text-xs text-muted-foreground sm:block sm:text-sm">
          মসজিদ পরিচালনা কমিটি
        </p>

        <p className="truncate text-xs text-muted-foreground sm:hidden sm:text-sm">
          জামে মসজিদ
        </p>
      </div>
    </Link>
  )
}
