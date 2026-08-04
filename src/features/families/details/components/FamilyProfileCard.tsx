"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { AvatarUpload } from "@/components/common/avatar-upload/avatar-upload"

import type { FamilyDetails } from "@/types/family"

interface FamilyProfileCardProps {
  family: FamilyDetails
  onAvatarChange?: (file: File) => void
}

export function FamilyProfileCard({
  family,
  onAvatarChange,
}: FamilyProfileCardProps) {
  return (
    <Card className="relative h-full overflow-hidden rounded-2xl py-0">
      {/* Cover */}
      <div className="h-24 bg-linear-to-r from-primary via-primary/50 to-primary" />

      <CardContent className="relative -mt-16 flex flex-col items-center px-6 pb-8">
        <AvatarUpload
          name={family.headName}
          image={family.avatar?.url}
          onChange={onAvatarChange}
        />

        <h2 className="mt-4 line-clamp-1 text-center text-2xl font-bold tracking-tight">
          {family.headName}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Family #{family.familyNo}
        </p>

        <Badge
          className="mt-4 rounded-full px-4"
          variant={family.isActive ? "default" : "destructive"}
        >
          {family.isActive ? "Active" : "Inactive"}
        </Badge>
      </CardContent>
    </Card>
  )
}
