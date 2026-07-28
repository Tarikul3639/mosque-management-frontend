// src/components/common/data-table/types.ts

import type {
  ColumnDef,
  Table,
  VisibilityState,
  SortingState,
  PaginationState,
  RowSelectionState,
  ColumnFiltersState,
} from "@tanstack/react-table";

export interface DataTableMeta {
  title?: string;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> extends DataTableMeta {}
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  rowKey?: (row: TData) => string;

  emptyMessage?: string;

  className?: string;
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export interface DataTableState {
  sorting: SortingState;
  pagination: PaginationState;
  columnVisibility: VisibilityState;
  rowSelection: RowSelectionState;
  columnFilters: ColumnFiltersState;
}