// src/components/common/global-search.tsx

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    Users,
    HeartHandshake,
    Home,
    UserCog,
    FolderKanban,
    Search,
    Loader2,
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import { useDebounce } from "@/hooks/use-debounce"
import { useLazyGlobalSearchQuery, type SearchResult } from "@/store/api/search.api"


const RESULT_META: Record<
    SearchResult["type"],
    { icon: React.ReactNode; label: string }
> = {
    user: { icon: <UserCog className="size-4" />, label: "Users" },
    donor: { icon: <HeartHandshake className="size-4" />, label: "Donors" },
    family: { icon: <Home className="size-4" />, label: "Families" },
    committee: { icon: <Users className="size-4" />, label: "Committee" },
    project: { icon: <FolderKanban className="size-4" />, label: "Projects" },
}

export function GlobalSearch() {
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, 300)

    const [triggerSearch, { data: results, isFetching }] =
        useLazyGlobalSearchQuery()

    // Cmd+K / Ctrl+K diye open korar jonno global keyboard listener
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    // debounced query change hole search trigger
    useEffect(() => {
        if (debouncedQuery.trim().length < 2) return

        triggerSearch(debouncedQuery)
    }, [debouncedQuery, triggerSearch])

    function handleSelect(result: SearchResult) {
        setOpen(false)
        setQuery("")
        router.push(result.url)
    }

    // result-gula type onujayi group kora
    const groupedResults = results?.reduce<Record<string, SearchResult[]>>(
        (acc, result) => {
            if (!acc[result.type]) acc[result.type] = []
            acc[result.type].push(result)
            return acc
        },
        {}
    )

    return (
        <>
            {/* Trigger button - header/navbar e bosaben */}
            <button
                onClick={() => setOpen(true)}
                className="flex w-full max-w-sm items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
            >
                <Search className="size-4" />
                <span className="flex-1 text-left">Search anything...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Search users, donors, families..."
                    value={query}
                    onValueChange={setQuery}
                />

                <CommandList>
                    {isFetching && (
                        <div className="flex items-center justify-center py-6">
                            <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {!isFetching && query.trim().length >= 2 && (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}

                    {!isFetching &&
                        groupedResults &&
                        Object.entries(groupedResults).map(([type, items]) => (
                            <CommandGroup
                                key={type}
                                heading={RESULT_META[type as SearchResult["type"]].label}
                            >
                                {items.map((result) => (
                                    <CommandItem
                                        key={result.id}
                                        value={result.id}
                                        onSelect={() => handleSelect(result)}
                                        className="flex items-center gap-2"
                                    >
                                        {RESULT_META[result.type].icon}

                                        <div className="flex flex-col">
                                            <span>{result.title}</span>
                                            {result.subtitle && (
                                                <span className="text-xs text-muted-foreground">
                                                    {result.subtitle}
                                                </span>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                </CommandList>
            </CommandDialog>
        </>
    )
}