import { useCallback, useState } from "react"

import {
    useCreateFileMutation,
    useLazyGetUploadSignatureQuery,
} from "@/store/api/upload.api"

import { uploadToCloudinary } from "@/lib/cloudinary/upload"

import type { CloudinaryFolder, FileResponse } from "@/types/upload"

interface UseCloudinaryUploadReturn {
    upload: (file: File, folder: CloudinaryFolder) => Promise<FileResponse>

    uploading: boolean
    progress: number
    error: Error | null
    reset: () => void
}

export function useCloudinaryUpload(): UseCloudinaryUploadReturn {
    const [getSignature] = useLazyGetUploadSignatureQuery()

    const [createFile] = useCreateFileMutation()

    const [uploading, setUploading] = useState(false)

    const [progress, setProgress] = useState(0)

    const [error, setError] = useState<Error | null>(null)

    const reset = useCallback(() => {
        setUploading(false)
        setProgress(0)
        setError(null)
    }, [])

    const upload = useCallback(
        async (file: File, folder: CloudinaryFolder): Promise<FileResponse> => {
            try {
                setUploading(true)
                setProgress(0)
                setError(null)

                const signature = await getSignature(folder).unwrap()

                const uploaded = await uploadToCloudinary(file, signature, setProgress)

                const dbFile = await createFile({
                    publicId: uploaded.public_id,
                    url: uploaded.secure_url,
                    originalName: uploaded.original_filename,
                    mimeType: file.type,
                    format: uploaded.format,
                    size: uploaded.bytes,
                    width: uploaded.width,
                    height: uploaded.height,
                }).unwrap()

                setProgress(100)

                return dbFile
            } catch (err) {
                console.error(err);

                if (err instanceof Error) {
                    setError(err);
                    throw err;
                }

                setError(new Error("Upload failed."));
                throw new Error("Upload failed.");
            } finally {
                setUploading(false)
            }
        },
        [getSignature, createFile]
    )

    return {
        upload,
        uploading,
        progress,
        error,
        reset,
    }
}
