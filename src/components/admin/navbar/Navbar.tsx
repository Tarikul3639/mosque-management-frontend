// src/components/layout/Navbar.tsx

"use client"

import { MenuIcon } from "@/components/icons/MenuIcon"
import { GlobalSearch } from "@/components/common/global-search"

interface NavbarProps {
    onMenuClick?: () => void
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
    return (
        <header className="flex w-full items-center justify-between gap-4 border-b border-border bg-background px-6 py-3">
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
            <div className="max-w-md flex-1">
                <GlobalSearch />
            </div>

            {/* Right: placeholder for alignment (put user menu / notifications here) */}
            <div className="w-10" />
        </header>
    )
}