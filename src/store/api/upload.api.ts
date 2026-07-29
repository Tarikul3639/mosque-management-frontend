import { baseApi } from "./base.api";

import type {
    UploadSignatureResponse,
    CloudinaryFolder,
    CreateFileRequest,
    FileResponse,
    DeleteImageResponse,
} from "@/types/upload";

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