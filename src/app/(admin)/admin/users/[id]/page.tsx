// src/app/(admin)/users/[id]/page.tsx

import { UserDetailsPage } from "@/features/admin/users/details/UserDetailsPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "User Details",
  description: "View user details.",
}

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params
  return <UserDetailsPage id={id} />
}
