"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { MenuIcon } from "@/components/icons/MenuIcon"

interface GlobalNavbarProps {
  onMenuClick?: () => void
  onSearch?: (query: string) => void
}

export const Navbar = ({ onMenuClick, onSearch }: GlobalNavbarProps) => {
  const [query, setQuery] = useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

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

      {/* Middle: global search */}
      <form onSubmit={handleSearchSubmit} className="max-w-md flex-1">
        <label className="relative block">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search families, donors, payments..."
            className="w-full rounded-md border border-border bg-card py-2.5 pr-3 pl-10 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
          />
        </label>
      </form>

      {/* Just a placeholder for alignment */}
      <div />
    </header>
  )
}
