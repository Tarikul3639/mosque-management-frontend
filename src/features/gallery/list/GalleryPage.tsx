"use client"

import { DataTable, DataTableToolbar } from "@/components/common/data-table"

import { GalleryHeader } from "./components/GalleryHeader"
import { GallerySummaryCards } from "./components/GallerySummaryCards"
import { galleryColumns } from "./components/gallery-columns"
import { useGallery } from "./useGallery"

export function GalleryPage() {
    const {
        galleries,
        meta,

        page,
        limit,
        search,

        setPage,
        setLimit,
        setSearch,

        isLoading,
        isFetching,
    } = useGallery()

    return (
        <div className="space-y-6 p-6">
            <GalleryHeader />

            <GallerySummaryCards />

            <DataTable
                columns={galleryColumns}
                data={galleries}
                isLoading={isLoading}
                isFetching={isFetching}
                // Pagination props
                currentPage={page}
                pageSize={limit}
                totalItems={meta?.total ?? 0}
                totalPages={meta?.totalPages ?? 0}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
            >
                {(table) => (
                    <DataTableToolbar
                        table={table}
                        search={search}
                        onSearchChange={setSearch}
                        filters={
                            <div className="flex items-center space-x-2">
                                <p className="text-sm text-muted-foreground">
                                    {meta?.total ?? 0} results
                                </p>
                            </div>
                        }
                    />
                )}
            </DataTable>
        </div>
    )
}
