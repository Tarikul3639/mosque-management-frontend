"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { AvatarUpload } from "@/components/common/avatar-upload/avatar-upload"
import type { User } from "@/types/user"

interface UserAvatarCardProps {
  user: User
  onAvatarChange?: (file: File) => void
}

export function UserAvatarCard({ user, onAvatarChange }: UserAvatarCardProps) {
  const isActive = user.status === "ACTIVE"

  return (
    <Card className="relative overflow-hidden rounded-2xl py-0">
      {/* Cover */}
      <div className="h-24 bg-linear-to-r from-primary via-primary/70 to-primary" />

      <CardContent className="relative -mt-16 flex flex-col items-center px-6 pb-8">
        <AvatarUpload
          name={user.name}
          image={user.avatar?.url}
          onChange={onAvatarChange}
        />

        <h2 className="mt-4 line-clamp-1 text-center text-2xl font-bold tracking-tight">
          {user.name}
        </h2>

        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {user.email}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">{user.phone}</p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Badge
            variant={user.role === "SUPER_ADMIN" ? "default" : "secondary"}
          >
            {user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
          </Badge>

          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
