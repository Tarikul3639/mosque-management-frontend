"use client";

import { Camera } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarUpload } from "@/components/common/avatar-upload/avatar-upload";

interface FamilyCreateProfileCardProps {
    name: string;
    image?: string | null;
    isActive?: boolean;
    uploading?: boolean;
    progress?: number;
    completed?: boolean;
    isEditable?: boolean;
    onAvatarChange?: (file: File) => void;
}

export function FamilyCreateProfileCard({
    name,
    image,
    isActive = true,
    uploading,
    progress,
    completed,
    isEditable,
    onAvatarChange,
}: FamilyCreateProfileCardProps) {
    return (
        <Card className="relative h-full overflow-hidden rounded-2xl py-0">
            <div className="h-24 bg-linear-to-r from-primary via-primary/50 to-primary" />

            <CardContent className="relative -mt-16 flex flex-col items-center px-6 pb-8">
                <AvatarUpload
                    name={name || "Family"}
                    image={image}
                    uploading={uploading}
                    completed={completed}
                    isEditable={isEditable}
                    progress={progress}
                    onChange={onAvatarChange}
                />

                <h2 className="mt-4 line-clamp-1 text-center text-2xl font-bold tracking-tight">
                    {name || "New Family"}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Family information will appear here
                </p>

                <Badge
                    className="mt-4 rounded-full px-4"
                    variant={isActive ? "success" : "destructive"}
                >
                    {isActive ? "Active" : "Inactive"}
                </Badge>

                <div className="mt-6 flex items-center gap-2 text-center text-xs text-muted-foreground">
                    <Camera className="size-4" />
                    <span>Click the avatar to upload a photo.</span>
                </div>
            </CardContent>
        </Card>
    );
}