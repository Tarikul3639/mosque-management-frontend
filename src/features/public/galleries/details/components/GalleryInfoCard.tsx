import { CalendarDays, FileText, Images, UserRound } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { Gallery } from "@/types/gallery"

import { formatBengaliDate } from "@/utils/format-bengali-date"
import { formatBengaliNumber } from "@/utils/format-bengali-number"

interface GalleryInfoCardProps {
  gallery: Gallery
}

export function GalleryInfoCard({ gallery }: GalleryInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>গ্যালারির তথ্য</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {gallery.description && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="size-4 text-primary" />

              <h3 className="font-medium">বিবরণ</h3>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {gallery.description}
            </p>
          </div>
        )}

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Images className="size-4" />
              <span>মোট ছবি</span>
            </div>

            <span className="font-medium">
              {formatBengaliNumber(gallery.images.length)} টি
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserRound className="size-4" />
              <span>যোগ করেছেন</span>
            </div>

            <span className="font-medium">
              {gallery.createdBy?.name ?? "অজানা"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="size-4" />
              <span>প্রকাশের তারিখ</span>
            </div>

            <span className="font-medium">
              {formatBengaliDate(gallery.createdAt)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="size-4" />
              <span>আপডেট</span>
            </div>

            <span className="font-medium">
              {formatBengaliDate(gallery.updatedAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
