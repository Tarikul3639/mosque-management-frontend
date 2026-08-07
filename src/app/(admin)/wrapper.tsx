"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Sidebar } from "@/components/admin/sidebar/Sidebar"
import { Navbar } from "@/components/admin/navbar/Navbar"
import { PageLoader } from "@/components/common/page-loader"
import { ErrorComponent } from "@/components/common/error"

import { useMeQuery } from "@/store/api/auth.api"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(true)

  const { data: me, isLoading, isError, error, refetch } = useMeQuery()

  useEffect(() => {
    if (isError && "status" in error && error.status === 401) {
      router.replace("/login")
    }
  }, [isError, error, router])

  if (isLoading) {
    return <PageLoader />
  }

  if (isError && "status" in error && error.status !== 401) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorComponent
          title="Failed to load user."
          error="Unable to connect to the server."
          onRetry={refetch}
        />
      </div>
    )
  }

  if (!me) {
    return <PageLoader />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isOpen}
        userId={me.id}
        userName={me.name}
        userRole={me.role}
        userAvatarUrl={me.avatar ?? "/images/placeholder.svg"}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onMenuClick={() => setIsOpen((x) => !x)}
        />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
