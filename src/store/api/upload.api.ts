import { baseApi } from "./base.api";

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

export const uploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUploadSignature: builder.query<
            UploadSignatureResponse,
            CloudinaryFolder
        >({
            query: (folder) => ({
                url: "/uploads/signature",
                params: { folder },
            }),
        }),

        createFile: builder.mutation<
            FileResponse,
            CreateFileRequest
        >({
            query: (body) => ({
                url: "/uploads/file",
                method: "POST",
                body,
            }),
        }),

        deleteImage: builder.mutation<
            DeleteImageResponse,
            string
        >({
            query: (publicId) => ({
                url: `/uploads/${encodeURIComponent(publicId)}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useLazyGetUploadSignatureQuery,
    useCreateFileMutation,
    useDeleteImageMutation,
} = uploadApi;