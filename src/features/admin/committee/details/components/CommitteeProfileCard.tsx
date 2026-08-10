"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { AvatarUpload } from "@/components/common/avatar-upload/avatar-upload"
import { getDesignationLabel } from "@/constants/designation"

import type { CommitteeMember } from "@/types/committee"

interface CommitteeProfileCardProps {
  member: CommitteeMember
  onAvatarChange?: (file: File) => void
}

export function CommitteeProfileCard({
  member,
  onAvatarChange,
}: CommitteeProfileCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-2xl py-0">
      <div className="h-24 bg-linear-to-r from-primary via-primary/60 to-primary" />

      <CardContent className="relative -mt-16 flex flex-col items-center px-6 pb-8">
        <AvatarUpload
          name={member.name}
          image={member.avatar?.url}
          onChange={onAvatarChange}
        />

        <h2 className="mt-4 line-clamp-1 text-center text-2xl font-bold tracking-tight">
          {member.name}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {getDesignationLabel(member.designation)}
        </p>

        {member.phone && (
          <p className="mt-1 text-sm text-muted-foreground">{member.phone}</p>
        )}

        <Badge
          className="mt-4 rounded-full px-4"
          variant={member.isActive ? "default" : "destructive"}
        >
          {member.isActive ? "Active" : "Inactive"}
        </Badge>
      </CardContent>
    </Card>
  )
}
