import axios from "axios"

import type { UploadSignatureResponse } from "@/types/upload"

export interface CloudinaryUploadResponse {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  original_filename: string
}

export async function uploadToCloudinary(
  file: File,
  signature: UploadSignatureResponse,
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResponse> {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("api_key", signature.apiKey)
  formData.append("timestamp", String(signature.timestamp))
  formData.append("signature", signature.signature)
  formData.append("folder", signature.folder)

  const { data } = await axios.post<CloudinaryUploadResponse>(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress(event) {
        if (!event.total || !onProgress) return

        onProgress(Math.round((event.loaded * 100) / event.total))
      },
    }
  )

  return data
}
