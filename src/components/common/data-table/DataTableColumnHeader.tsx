"use client";

import { type Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className="flex items-center font-medium text-foreground">
        {title}
      </div>
    );
  }

  const sorted = column.getIsSorted();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group -ml-2 h-8 gap-1 px-2 font-medium text-foreground transition-colors duration-200 hover:bg-transparent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring"
        >
          <span>{title}</span>

          {sorted === "asc" ? (
            <ArrowUp className="size-4 text-muted-foreground" />
          ) : sorted === "desc" ? (
            <ArrowDown className="size-4 text-muted-foreground" />
          ) : (
            <ArrowUpDown className="size-4 text-muted-foreground sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-44"
      >
        <DropdownMenuItem
          onClick={() => column.toggleSorting(false)}
        >
          <ArrowUp className="mr-2 size-4" />
          Ascending
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => column.toggleSorting(true)}
        >
          <ArrowDown className="mr-2 size-4" />
          Descending
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => column.clearSorting()}
        >
          <ArrowUpDown className="mr-2 size-4" />
          Clear Sorting
        </DropdownMenuItem>

        {column.getCanHide() && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                column.toggleVisibility(false)
              }
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <EyeOff className="mr-2 size-4" />
              Hide Column
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}