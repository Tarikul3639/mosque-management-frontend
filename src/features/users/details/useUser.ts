"use client"

// src/features/user/details/useUser.ts
import { useGetUserQuery } from "@/store/api/user.api"

export function useUser({ id }: { id: string }) {
  const {
    data: user,

    isLoading,
    isFetching,

    isError,
    refetch,
  } = useGetUserQuery(id, {
    skip: !id,
  })

  return {
    user,

    isLoading,
    isFetching,

    isError,
    refetch,
  }
}
