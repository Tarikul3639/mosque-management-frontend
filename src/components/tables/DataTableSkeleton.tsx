"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
}

export function DataTableSkeleton({
  columns = 6,
  rows = 8,
}: DataTableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead
                  key={index}
                  className="h-12 border-b px-5"
                >
                  <Skeleton className="h-4 w-20 rounded-md" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: rows }).map((_, row) => (
              <TableRow
                key={row}
                className="h-16 border-b"
              >
                {Array.from({ length: columns }).map(
                  (_, col) => (
                    <TableCell
                      key={col}
                      className="px-5 py-4"
                    >
                      <Skeleton className="h-4 w-full max-w-30" />
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}