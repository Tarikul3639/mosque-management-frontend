"use client"

import { ROUTES } from "@/config/routes"
import { ADMIN_NAVIGATION } from "@/config/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { Logo } from "@/components/icons/Logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutButton } from "@/features/auth/logout-button"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps {
  isOpen?: boolean
  userId?: string
  userName?: string
  userRole?: string
  userAvatarUrl?: string
}

function Collapsible({
  isOpen,
  padding = "pl-3",
  children,
}: {
  isOpen: boolean
  padding?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={[
        "grid min-w-0 transition-[grid-template-columns,opacity] duration-300 ease-in-out",
        isOpen ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0",
      ].join(" ")}
    >
      {/* Shrink wrapper */}
      <div className={`overflow-hidden ${padding}`}>
        {/* Padding wrapper */}
        {children}
      </div>
    </div>
  )
}

export function Sidebar({
  isOpen = false,
  userId,
  userName = "Unknown User",
  userRole = "Super Admin",
  userAvatarUrl,
}: SidebarProps) {
  const pathname = usePathname()

  const profileRoute = ROUTES.ADMIN.USERS.DETAIL(userId ?? "")
  const isYourProfilePage = pathname === profileRoute

  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside
      className={[
        "flex h-screen flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        "font-sans transition-[width] duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 sm:w-18",
      ].join(" ")}
    >
      {/* ================= Brand ================= */}
      <Link
        key="brand"
        href={ROUTES.PUBLIC.HOME}
        className="flex h-20 items-center border-b border-sidebar-border px-2.5 transition-colors hover:bg-sidebar-accent/50"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
          <Logo className="h-8 w-8" color="currentColor" />
        </div>

        <Collapsible isOpen={isOpen}>
          <h1 className="text-base font-bold tracking-tight whitespace-nowrap text-sidebar-foreground">
            MasjidMS
          </h1>
          <p className="text-xs whitespace-nowrap text-sidebar-foreground/70">
            Mosque Management System
          </p>
        </Collapsible>
      </Link>

      {/* ================= Navigation ================= */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <ul className="space-y-1">
          {ADMIN_NAVIGATION.map(({ title, icon: Icon, href }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`)

            return (
              <li key={`admin-${href}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      className={[
                        "flex h-10 items-center rounded-md px-3 transition-colors",
                        isActive
                          ? "bg-primary font-medium text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      ].join(" ")}
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        {Icon && <Icon className="h-5 w-5" />}
                      </div>

                      <Collapsible isOpen={isOpen}>
                        <span className="text-base whitespace-nowrap">
                          {title}
                        </span>
                      </Collapsible>
                    </Link>
                  </TooltipTrigger>

                  {!isOpen && (
                    <TooltipContent side="right" sideOffset={10}>
                      {title}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ================= User Profile ================= */}
      <div className="border-t border-sidebar-border p-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={profileRoute}
              className={`flex w-full items-center rounded-lg p-2 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isYourProfilePage
                ? "bg-primary font-medium text-primary-foreground"
                : "text-sidebar-foreground"
                }`}
            >
              <Avatar className="h-9 w-9 shrink-0 border border-sidebar-border">
                <AvatarImage src={userAvatarUrl} alt={userName} />
                <AvatarFallback className="bg-sidebar-primary/10 text-xs font-semibold text-sidebar-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <Collapsible isOpen={isOpen} padding="pl-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm leading-tight font-medium text-sidebar-foreground">
                      {userName}
                    </p>
                    <p className="truncate text-xs text-sidebar-foreground/70">
                      {userRole}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-sidebar-foreground/50" />
                </div>
              </Collapsible>
            </Link>
          </TooltipTrigger>

          {!isOpen && (
            <TooltipContent side="right" sideOffset={10}>
              {userName}
            </TooltipContent>
          )}
        </Tooltip>

        {/* Logout Button */}
        <LogoutButton isOpen={isOpen} />
      </div>
    </aside>
  )
}

export default Sidebar