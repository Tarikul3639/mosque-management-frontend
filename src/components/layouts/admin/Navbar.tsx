"use client"

// src/components/layout/Navbar.tsx
import { MenuIcon } from "@/components/icons/MenuIcon"
import { SearchDialog } from "@/features/admin/search/SearchDialog"

interface NavbarProps {
  onMenuClick?: () => void
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="flex w-full items-center justify-between gap-4 border-b border-border bg-background py-3 pr-4 pl-6">
      {/* Left: sidebar toggle */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-secondary"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Middle: global search (Cmd+K command palette) */}
      <div className="max-w-2xl min-w-0 flex-1">
        <SearchDialog />
      </div>

      {/* Right: placeholder for alignment (put user menu / notifications here) */}
      <div />
    </header>
  )
}
