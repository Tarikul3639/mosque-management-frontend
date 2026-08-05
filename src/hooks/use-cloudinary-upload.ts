import { useCallback } from "react"

import {
  useCreateFileMutation,
  useLazyGetUploadSignatureQuery,
} from "@/store/api/upload.api"

import { uploadToCloudinary } from "@/lib/cloudinary/upload"

import type { CloudinaryFolder, FileResponse } from "@/types/upload"

interface UploadOptions {
  onStart?: () => void
  onProgress?: (progress: number) => void
  onSuccess?: (file: FileResponse) => void
  onError?: (error: Error) => void
  onComplete?: () => void
}

interface UseCloudinaryUploadReturn {
  upload: (
    file: File,
    folder: CloudinaryFolder,
    options?: UploadOptions
  ) => Promise<FileResponse>
}

export function useCloudinaryUpload(): UseCloudinaryUploadReturn {
  const [getSignature] = useLazyGetUploadSignatureQuery()

  const [createFile] = useCreateFileMutation()

  const upload = useCallback(
    async (
      file: File,
      folder: CloudinaryFolder,
      options?: UploadOptions
    ): Promise<FileResponse> => {
      try {
        options?.onStart?.()

        const signature = await getSignature(folder).unwrap()

        const uploaded = await uploadToCloudinary(
          file,
          signature,
          (progress) => {
            options?.onProgress?.(progress)
          }
        )

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

        options?.onProgress?.(100)
        options?.onSuccess?.(dbFile)

        return dbFile
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed.")

        options?.onError?.(error)

        throw error
      } finally {
        options?.onComplete?.()
      }
    },
    [getSignature, createFile]
  )

  return {
    upload,
  }
}
