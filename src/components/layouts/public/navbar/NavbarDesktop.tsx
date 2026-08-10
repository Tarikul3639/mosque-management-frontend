// src/components/public/navbar/NavbarDesktop.tsx

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { PUBLIC_NAVIGATION } from "@/config/navigation"

export function NavbarDesktop() {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-7">
        {PUBLIC_NAVIGATION.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <li key={`public-${item.href}`}>
              <Link
                href={item.href}
                className={cn(
                  "group relative inline-flex items-center rounded-sm py-2 text-[15px] font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  isActive
                    ? "font-semibold text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.title}

                {/* Animated Bottom Line */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary transition-all duration-300 ease-in-out",
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  )}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
