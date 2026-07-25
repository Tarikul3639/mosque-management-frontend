"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar/Sidebar"
import { Navbar } from "@/components/admin/navbar/Navbar"
import { useMeQuery } from "@/store/api/auth.api"
import Loader from "@/components/common/loading"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const { data: me, isLoading, isError } = useMeQuery()

  const handleSearch = (query: string) => {
    console.log(query)
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    router.replace("/login")
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isOpen}
        userName={me?.name ?? ""}
        userRole={me?.role}
        userAvatarUrl={me?.avatar || "./images/placeholder.svg"}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onSearch={handleSearch}
          onMenuClick={() => setIsOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
