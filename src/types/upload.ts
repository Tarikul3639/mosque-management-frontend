export enum CloudinaryFolder {
    DOCUMENTS = "documents",
    FAMILIES = "families",
    USERS = "users",
    COMMITTEE = "committee",
    DONORS = "donors",
    GALLERY = "gallery",
    PROJECTS = "projects",
}

export interface UploadSignatureResponse {
    timestamp: number;
    signature: string;
    apiKey: string;
    cloudName: string;
    folder: CloudinaryFolder;
}

export interface CreateFileRequest {
    publicId: string;
    url: string;
    originalName?: string;
    mimeType?: string;
    format?: string;
    size: number;
    width?: number;
    height?: number;
}

export interface FileResponse {
    id: string;
    publicId: string;
    url: string;
    originalName?: string;
    mimeType?: string;
    format?: string;
    size: number;
    width?: number;
    height?: number;
    createdAt: string;
}

export interface DeleteImageResponse {
    message: string;
}
