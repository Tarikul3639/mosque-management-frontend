// src/store/api/project.api.ts

import { baseApi } from "./base.api"

import type {
    CreateProjectDto,
    Project,
    ProjectListResponse,
    ProjectQuery,
    ProjectSummary,
    UpdateProjectDto,
} from "@/types/project"

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<
            ProjectListResponse,
            Partial<ProjectQuery>
        >({
            query: (params) => ({
                url: "/projects",
                params,
            }),

            providesTags: ["Project"],
        }),

        getProjectSummary: builder.query<
            ProjectSummary,
            void
        >({
            query: () => "/projects/summary",

            providesTags: ["Project"],
        }),

        getProject: builder.query<
            Project,
            string
        >({
            query: (id) => `/projects/${id}`,

            providesTags: (_, __, id) => [
                {
                    type: "Project",
                    id,
                },
            ],
        }),

        createProject: builder.mutation<
            Project,
            CreateProjectDto
        >({
            query: (body) => ({
                url: "/projects",
                method: "POST",
                body,
            }),

            invalidatesTags: ["Project"],
        }),

        updateProject: builder.mutation<
            Project,
            {
                id: string
                body: UpdateProjectDto
            }
        >({
            query: ({ id, body }) => ({
                url: `/projects/${id}`,
                method: "PATCH",
                body,
            }),

            invalidatesTags: (_, __, { id }) => [
                "Project",
                {
                    type: "Project",
                    id,
                },
            ],
        }),

        deleteProject: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Project"],
        }),
    }),
})

export const {
    useGetProjectsQuery,
    useGetProjectSummaryQuery,
    useGetProjectQuery,

    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi