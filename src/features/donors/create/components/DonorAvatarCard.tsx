"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarUpload } from "@/components/common/avatar-upload/avatar-upload";

interface DonorAvatarCardProps {
    name: string;
    avatarUrl?: string | null;
    onAvatarChange?: (file: File) => void;
    uploading?: boolean;
    progress?: number;
    completed?: boolean;
}

export function DonorAvatarCard({
    name,
    avatarUrl,
    onAvatarChange,
    uploading,
    progress,
    completed,
}: DonorAvatarCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-6">
                <AvatarUpload
                    isEditable
                    name={name}
                    image={avatarUrl}
                    onChange={onAvatarChange}
                    uploading={uploading}
                    progress={progress}
                    completed={completed}
                />

                <div className="space-y-1 text-center">
                    <h3 className="text-lg font-semibold">
                        {name || "New Donor"}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Upload a profile photo for this donor.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}