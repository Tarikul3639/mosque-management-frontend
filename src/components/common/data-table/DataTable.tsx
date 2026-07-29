"use client"

import { useState } from "react"

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type ColumnDef,
    type SortingState,
    type Table as TanStackTable,
    type VisibilityState,
    useReactTable,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTableEmpty } from "./DataTableEmpty"
import { DataTableLoading } from "./DataTableLoading"
import { DataTableSkeleton } from "./DataTableSkeleton"

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    children?: (table: TanStackTable<TData>) => React.ReactNode
    rowKey?: (row: TData) => string
    emptyTitle?: string
    emptyDescription?: string
    className?: string
    isLoading?: boolean
    isFetching?: boolean
    initialColumnVisibility?: VisibilityState
}

export function DataTable<TData>({
    columns,
    data,
    children,
    rowKey,
    emptyTitle = "No data found.",
    emptyDescription = "There are no records to display.",
    className,
    isLoading = false,
    isFetching = false,
    initialColumnVisibility = {},
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        () => initialColumnVisibility
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    // Initial Loading State
    if (isLoading) {
        return <DataTableSkeleton rows={10} columns={columns.length} />
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col space-y-5">
            {children?.(table)}

            <div
                className={cn(
                    "relative overflow-hidden rounded-xl border bg-card",
                    className
                )}
            >
                {/* Background Refetch Loading Overlay */}
                {isFetching && <DataTableLoading />}

                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted/30">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="h-12 border-b px-5 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <TableRow
                                        key={
                                            rowKey
                                                ? rowKey(row.original)
                                                : (row.id ?? index.toString())
                                        }
                                        className={cn(
                                            "h-16 border-b transition-colors hover:bg-muted/30",
                                            isFetching && "pointer-events-none opacity-60"
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="px-5 py-4 align-middle text-sm"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <DataTableEmpty
                                    colSpan={table.getVisibleLeafColumns().length}
                                    title={emptyTitle}
                                    description={emptyDescription}
                                />
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
