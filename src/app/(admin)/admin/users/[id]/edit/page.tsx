import { Metadata } from "next"
import { UserEditPage } from "@/features/users/edit/UserEditPage"

export const metadata: Metadata = {
  title: "Edit User",
  description: "Edit user details.",
}

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params
  return <UserEditPage id={id} />
}
