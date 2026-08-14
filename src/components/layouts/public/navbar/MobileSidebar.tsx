// src/components/public/navbar/MobileSidebar.tsx

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { PUBLIC_NAVIGATION } from "@/config/navigation"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Logo } from "@/components/icons/Logo"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex w-72! flex-col p-0">
        {/* Header / Brand */}
        <SheetHeader className="border-b px-6 py-5 text-left">
          <SheetTitle asChild>
            <Link
              href="/"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Logo className="size-10 shrink-0" color="var(--primary)" />

              <div className="min-w-0">
                <h2 className="truncate leading-tight font-bold text-foreground">
                  বাইতুল আমান
                </h2>

                <p className="text-xs font-normal text-muted-foreground">
                  জামে মসজিদ
                </p>
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-1.5">
            {PUBLIC_NAVIGATION.map((item) => {
              // Fix for root route active check logic
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "flex h-11 items-center rounded-lg px-3.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      isActive
                        ? "bg-primary font-semibold text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(
                          "mr-3 size-4 shrink-0 transition-colors",
                          isActive
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                        )}
                      />
                    )}

                    <span className="truncate">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
