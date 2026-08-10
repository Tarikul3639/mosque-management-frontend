"use client"

import { ROUTES } from "@/config/routes"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

import { SearchTrigger } from "./SearchTrigger"

import { SearchLoading } from "./components/SearchLoading"
import { SearchEmpty } from "./components/SearchEmpty"
import { SearchError } from "./components/SearchError"
import { SearchGroup } from "./components/SearchGroup"
import { SearchFooter } from "./components/SearchFooter"

import { SEARCH_ICONS } from "./constants/search-icons"
import { useSearch } from "./hooks/useSearch"

const QUICK_ACCESS_ITEMS = [
  {
    id: "dashboard",
    type: "PROJECT" as const,
    title: "Dashboard",
    subtitle: "Overview and reports",
    url: ROUTES.ADMIN.DASHBOARD,
  },
  {
    id: "families",
    type: "FAMILY" as const,
    title: "Families",
    subtitle: "Manage family records",
    url: ROUTES.ADMIN.FAMILIES.INDEX,
  },
  {
    id: "payments",
    type: "PAYMENT" as const,
    title: "Payments",
    subtitle: "View and record payments",
    url: ROUTES.ADMIN.PAYMENTS.INDEX,
  },
  {
    id: "donations",
    type: "DONATION" as const,
    title: "Donations",
    subtitle: "Track donation records",
    url: ROUTES.ADMIN.DONATIONS.INDEX,
  },
  {
    id: "users",
    type: "USER" as const,
    title: "Users",
    subtitle: "Manage user accounts",
    url: ROUTES.ADMIN.USERS.INDEX,
  },
  {
    id: "prayer-times",
    type: "PRAYER_TIME" as const,
    title: "Prayer Times",
    subtitle: "View and manage prayer times",
    url: ROUTES.PUBLIC.PRAYER_TIMES,
  },
]

export function SearchDialog() {
  const {
    open,
    setOpen,

    query,
    setQuery,

    groupedResults,

    isLoading,
    isError,

    refetch,

    handleSelect,
  } = useSearch()

  return (
    <>
      <SearchTrigger onOpen={() => setOpen(true)} />

      <CommandDialog open={open} onOpenChange={setOpen} className="top-16 p-1">
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search users, families, donors..."
          />

          <CommandList>
            {isLoading && <SearchLoading />}

            {!isLoading && !query.trim() && (
              <SearchGroup
                title="Quick access"
                items={QUICK_ACCESS_ITEMS.map((item) => ({
                  ...item,
                  icon: SEARCH_ICONS[item.type],
                }))}
                onSelect={handleSelect}
              />
            )}

            {!isLoading && isError && <SearchError onRetry={refetch} />}

            {!isLoading &&
              !isError &&
              query.trim().length >= 2 &&
              Object.keys(groupedResults).length === 0 && (
                <SearchEmpty query={query} />
              )}

            {!isLoading &&
              Object.entries(groupedResults).map(([type, items]) => (
                <SearchGroup
                  key={type}
                  title={type}
                  items={items.map((item) => ({
                    ...item,
                    icon: SEARCH_ICONS[item.type],
                  }))}
                  onSelect={handleSelect}
                />
              ))}
          </CommandList>

          <SearchFooter />
        </Command>
      </CommandDialog>
    </>
  )
}
