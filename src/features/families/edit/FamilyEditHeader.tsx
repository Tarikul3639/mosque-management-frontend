"use client"

import Link from "next/link"
import { ArrowLeft, PencilLine } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"

import type { FamilyDetails } from "@/types/family"

interface FamilyEditHeaderProps {
    family: FamilyDetails
}

export function FamilyEditHeader({ family }: FamilyEditHeaderProps) {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-4 border-b border-border/50 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
                {/* Back */}
                <Button
                    onClick={() => router.replace(`/families/${family.id}`)}
                    variant="ghost"
                    size="sm"
                    className="-ml-2 h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="size-3.5" />
                    Back to Details
                </Button>

                {/* Title */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <PencilLine className="size-6 text-primary" />

                        <h1 className="bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                            Edit Family
                        </h1>
                    </div>

                    <Badge
                        variant="outline"
                        className="rounded-md border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary"
                    >
                        #{family.familyNo}
                    </Badge>

                    <Badge
                        variant={family.isActive ? "success" : "destructive"}
                        className="rounded-full px-2.5 py-0.5 text-xs"
                    >
                        {family.isActive ? "Active" : "Inactive"}
                    </Badge>
                </div>

                <p className="text-xs text-muted-foreground sm:text-sm">
                    Update family information, contact details and monthly fee.
                </p>
            </div>

            <Button asChild variant="outline">
                <Link href={`/families/${family.id}`}>
                    <PencilLine className="mr-2 size-4" />
                    View Family
                </Link>
            </Button>
        </div>
    )
}
