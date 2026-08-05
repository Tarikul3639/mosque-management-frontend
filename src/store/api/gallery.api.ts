import { baseApi } from "./base.api"

import type {
  CreateGalleryDto,
  Gallery,
  GalleryListResponse,
  GalleryQuery,
  GallerySummary,
  UpdateGalleryDto,
} from "@/types/gallery"

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGalleries: builder.query<GalleryListResponse, Partial<GalleryQuery>>({
      query: (params) => ({
        url: "/galleries",
        params,
      }),

      providesTags: ["Gallery"],
    }),

    getGallerySummary: builder.query<GallerySummary, void>({
      query: () => "/galleries/summary",

      providesTags: ["Gallery"],
    }),

    getGallery: builder.query<Gallery, string>({
      query: (id) => `/galleries/${id}`,

      providesTags: (_, __, id) => [
        {
          type: "Gallery",
          id,
        },
      ],
    }),

    createGallery: builder.mutation<Gallery, CreateGalleryDto>({
      query: (body) => ({
        url: "/galleries",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Gallery"],
    }),

    updateGallery: builder.mutation<
      Gallery,
      {
        id: string
        body: UpdateGalleryDto
      }
    >({
      query: ({ id, body }) => ({
        url: `/galleries/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_, __, { id }) => [
        "Gallery",
        {
          type: "Gallery",
          id,
        },
      ],
    }),

    deleteGallery: builder.mutation<
      {
        message: string
      },
      string
    >({
      query: (id) => ({
        url: `/galleries/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Gallery"],
    }),
  }),
})

export const {
  useGetGalleriesQuery,
  useGetGallerySummaryQuery,
  useGetGalleryQuery,

  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} = galleryApi
