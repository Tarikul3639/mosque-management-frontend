"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"

import { Sidebar } from "@/components/layouts/admin/Sidebar"
import { Navbar } from "@/components/layouts/admin/Navbar"
import { PageLoader } from "@/components/common/page-loader"
import { ErrorComponent } from "@/components/common/error"
import { ROUTES } from "@/config/routes"

import { useMeQuery } from "@/store/api/auth.api"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutside(sidebarRef, () => {
    if (isOpen) setIsOpen(false)
  })

  const { data: me, isLoading, isError, error, refetch } = useMeQuery()

  useEffect(() => {
    if (isError && "status" in error && error.status === 401) {
      router.replace(ROUTES.AUTH.LOGIN)
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
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={isOpen}
          userId={me.id}
          userName={me.name}
          userRole={me.role}
          userAvatarUrl={me.avatar ?? "/images/placeholder.svg"}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsOpen((x) => !x)} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
