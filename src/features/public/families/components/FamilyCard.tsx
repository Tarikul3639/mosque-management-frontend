"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, ArrowUpRight, Mail } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarClass, getAvatarInitials } from "@/utils/avatar.utils"

interface FamilyAvatar {
    id: string
    url: string
}

interface Family {
    id: string
    familyNo: string
    headName: string
    phone: string | null
    email: string | null
    address: string
    avatar: FamilyAvatar | null
    isActive: boolean
}

interface FamilyCardProps {
    family: Family
}

export const FamilyCard = ({ family }: FamilyCardProps) => {
    const avatarClass = getAvatarClass(family.headName)
    const initials = getAvatarInitials(family.headName)

    return (
        <article className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md">
            {/* Header */}
            <div className="flex items-center gap-3.5">
                <Avatar className="size-12 shrink-0 ring-1 ring-border">
                    {family.avatar && (
                        <AvatarImage src={family.avatar.url} alt={family.headName} />
                    )}

                    <AvatarFallback className={avatarClass}>{initials}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-foreground">
                            {family.headName}
                        </h3>

                        <Badge
                            variant={family.isActive ? "default" : "outline"}
                            className="text-[10px] font-medium pt-0.75"
                        >
                            {family.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>

                    <span className="mt-1 inline-flex rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] font-medium text-secondary-foreground">
                        {family.familyNo}
                    </span>
                </div>
            </div>

            {/* Information */}
            <div className="mt-4 space-y-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                    <MapPin className="size-3.5 shrink-0 text-primary/70" />

                    <span className="truncate text-xs text-muted-foreground">
                        {family.address}
                    </span>
                </div>

                <div className="flex items-center gap-2.5">
                    <Phone className="size-3.5 shrink-0 text-primary/70" />

                    <span className="font-mono text-xs text-muted-foreground">
                        {family.phone || "Phone not available"}
                    </span>
                </div>

                <div className="flex items-center gap-2.5">
                    <Mail className="size-3.5 shrink-0 text-primary/70" />

                    <span className="font-mono text-xs text-muted-foreground">
                        {family.email || "Email not available"}
                    </span>
                </div>
            </div>

            {/* Action */}
            <Link
                href={`/families/${family.familyNo}`}
                className="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
            >
                View Details
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
        </article>
    )
}
