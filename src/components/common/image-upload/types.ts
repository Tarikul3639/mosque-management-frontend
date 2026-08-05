import { FileReference } from "@/types/common"

export interface UploadImage extends FileReference {
  uploading?: boolean
  completed?: boolean
  error?: boolean

  progress?: number
}
