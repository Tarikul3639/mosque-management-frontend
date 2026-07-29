"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ErrorComponent } from "@/components/common/error";
import { getErrorMessage } from "@/utils/get-error-message";

import {
    useGetFamilyDetailsQuery,
    useUpdateFamilyMutation,
} from "@/store/api/family.api";

import { CloudinaryFolder } from "@/types/upload";

import {
    familySchema,
    type FamilyFormValues,
} from "@/schemas/family.schema";

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";

import { FamilyEditHeader } from "./FamilyEditHeader";
import { FamilyEditProfileCard } from "./FamilyEditProfileCard";
import { FamilyEditForm } from "./FamilyEditForm";
import { FamilyEditSkeleton } from "./FamilyEditSkeleton";

import { toast } from "sonner";

interface FamilyEditPageProps {
    id: string;
}

export function FamilyEditPage({
    id,
}: FamilyEditPageProps) {
    const router = useRouter();

    const form = useForm<FamilyFormValues>({
        resolver: zodResolver(familySchema),
        defaultValues: {
            headName: "",
            phone: "",
            address: "",
            avatarId: "",
            isActive: true,
        },
    });

    const {
        upload,
        uploading,
        progress,
    } = useCloudinaryUpload();

    const {
        data: family,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetFamilyDetailsQuery(id);

    const [updateFamily, { isLoading: isSubmitting }] =
        useUpdateFamilyMutation();

    useEffect(() => {
        if (!family) return;

        form.reset({
            headName: family.headName,
            phone: family.phone ?? "",
            address: family.address ?? "",
            avatarId: family.avatar?.id ?? "",
            isActive: family.isActive,
        });
    }, [family, form]);

    const onSubmit = async (
        values: FamilyFormValues,
    ) => {
        try {
            await updateFamily({
                id: family!.id,
                body: values,
            }).unwrap();

            router.push(`/families/${family!.id}`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update family.", {
                description: getErrorMessage(err),
            });
        }
    };

    const handleAvatarChange = async (file: File) => {
        try {
            const uploaded = await upload(
                file,
                CloudinaryFolder.FAMILIES,
            );

            form.setValue("avatarId", uploaded.id, {
                shouldDirty: true,
                shouldValidate: true,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload avatar.", {
                description: getErrorMessage(error),
            });
        }
    };

    if (isLoading) {
        return <FamilyEditSkeleton />;
    }

    if (isError) {
        return (
            <ErrorComponent
                title="Failed to load family."
                error={getErrorMessage(error)}
                onRetry={refetch}
            />
        );
    }

    if (!family) {
        return null;
    }

    return (
        <div className="space-y-6 p-6">
            <FamilyEditHeader family={family} />

            <div className="grid gap-6 xl:grid-cols-12">
                <div className="xl:col-span-4 2xl:col-span-3">
                    <FamilyEditProfileCard
                        family={family}
                        isEditable
                        uploading={uploading}
                        progress={progress}
                        completed={!uploading && progress === 100}
                        onAvatarChange={handleAvatarChange}
                    />
                </div>

                <div className="xl:col-span-8 2xl:col-span-9">
                    <FamilyEditForm
                        family={family}
                        form={form}
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}