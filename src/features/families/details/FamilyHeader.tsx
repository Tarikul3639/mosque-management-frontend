"use client"

import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

import type { FamilyDetails } from "@/types/family"

interface FamilyHeaderProps {
    family: FamilyDetails
}

export function FamilyHeader({ family }: FamilyHeaderProps) {
    const router = useRouter()
    return (
        <div className="flex flex-col gap-4 border-b border-border/50 pb-5 lg:flex-row lg:items-center sm:justify-between">
            <div className="space-y-2">
                {/* Back Link Button */}
                <Button
                    onClick={() => router.replace("/families")}
                    variant="ghost"
                    size="sm"
                    className="-ml-2 h-8 gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                        <ArrowLeft className="size-3.5" />
                        Back to Families
                </Button>

                {/* Dynamic Title with Family Head Name & Family No. Badge */}
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                        {family.headName}
                    </h1>

                    <Badge
                        variant="outline"
                        className="rounded-md border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary"
                    >
                        #{family.familyNo}
                    </Badge>

                    <Badge
                        variant={family.isActive ? "default" : "destructive"}
                        className="rounded-full px-2.5 py-0.5 text-xs"
                    >
                        {family.isActive ? "Active" : "Inactive"}
                    </Badge>
                </div>

                {/* Compact & Relevant Dynamic Context */}
                <p className="text-xs text-muted-foreground/80 sm:text-sm">
                    Overview & payment logs for {family.headName}&apos;s family account.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                    <Link href={`/families/${family.id}/edit`}>
                        <Pencil className="mr-2 size-4" />
                        Edit Family
                    </Link>
                </Button>
            </div>
        </div>
    )
}
