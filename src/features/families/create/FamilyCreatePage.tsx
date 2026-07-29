"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateFamilyMutation } from "@/store/api/family.api";
import { CloudinaryFolder } from "@/types/upload";

import {
    familySchema,
    type FamilyFormValues,
} from "@/schemas/family.schema";

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";
import { getErrorMessage } from "@/utils/get-error-message";

import { FamilyCreateHeader } from "./FamilyCreateHeader";
import { FamilyCreateProfileCard } from "./FamilyCreateProfileCard";
import { FamilyCreateForm } from "./FamilyCreateForm";

export function FamilyCreatePage() {
    const router = useRouter();

    const form = useForm<FamilyFormValues>({
        resolver: zodResolver(familySchema),
        defaultValues: {
            headName: "",
            phone: "",
            address: "",
            avatarId: undefined,
            isActive: true,
        },
    });

    const {
        upload,
        uploading,
        progress,
    } = useCloudinaryUpload();

    const [createFamily, { isLoading: isSubmitting }] =
        useCreateFamilyMutation();

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

    const onSubmit = async (
        values: FamilyFormValues,
    ) => {
        console.log("Submitted", values);
        try {
            const family = await createFamily(values).unwrap();

            toast.success("Family created successfully.");

            router.push(`/families/${family.id}`);
        } catch (err) {
            console.error(err);

            toast.error("Failed to create family.", {
                description: getErrorMessage(err),
            });
        }
    };

    return (
        <div className="space-y-6 p-6">
            <FamilyCreateHeader />

            <div className="grid gap-6 xl:grid-cols-12">
                <div className="xl:col-span-4 2xl:col-span-3">
                    <FamilyCreateProfileCard
                        name={form.watch("headName")}
                        image={undefined}
                        isActive={form.watch("isActive")}
                        isEditable
                        uploading={uploading}
                        progress={progress}
                        completed={!uploading && progress === 100}
                        onAvatarChange={handleAvatarChange}
                    />
                </div>

                <div className="xl:col-span-8 2xl:col-span-9">
                    <FamilyCreateForm
                        form={form}
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}