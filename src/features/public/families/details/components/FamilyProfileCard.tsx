import { BadgeCheck, MapPin, Phone } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import type { FamilyDetails } from "@/services/api/families.service"
import { getAvatarClass, getAvatarInitials } from "@/utils/avatar.utils"

interface FamilyProfileCardProps {
    family: FamilyDetails
}

export function FamilyProfileCard({ family }: FamilyProfileCardProps) {
    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-center">
                <Avatar className="size-24 border border-border shrink-0">
                    <AvatarImage src={family.avatar?.url} alt={family.headName} />

                    <AvatarFallback className={`${getAvatarClass(family.headName)} text-3xl`}>
                        {getAvatarInitials(family.headName)}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center justify-center md:flex-1 md:items-start text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                            {family.headName}
                        </h1>

                        {family.isActive && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                <BadgeCheck className="size-3.5" />
                                সক্রিয়
                            </span>
                        )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        পরিবার নম্বর{" "}
                        <span className="font-medium text-foreground">
                            {family.familyNo}
                        </span>
                    </p>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:flex-wrap md:gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="size-4 shrink-0 text-muted-foreground/80" />
                            <span>{family.phone ?? "প্রযোজ্য নয়"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="size-4 shrink-0 text-muted-foreground/80" />
                            <span>{family.address}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}