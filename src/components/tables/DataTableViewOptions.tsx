"use client";

import { type Table } from "@tanstack/react-table";
import { Eye, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        column.getCanHide() &&
        typeof column.accessorFn !== "undefined"
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 gap-2 rounded-lg border-border shadow-xs transition-all duration-200"
        >
          <Settings2 className="size-4" />
          <span>View</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 rounded-lg border-border p-2 shadow-lg"
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2 text-sm">
          <Eye className="size-4 text-muted-foreground" />
          <span className="font-medium">
            Visible Columns
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {columns.length > 0 ? (
          <div className="max-h-72 space-y-1 overflow-y-auto py-1">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  column.toggleVisibility(!!value)
                }
                className="cursor-pointer rounded-md capitalize transition-colors duration-200 focus:bg-accent"
              >
                {String(
                  column.columnDef.meta?.title ??
                  column.id
                )}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Eye className="mb-2 size-8 text-muted-foreground/40" />

            <p className="text-sm font-medium">
              No configurable columns
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              All columns are fixed.
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}