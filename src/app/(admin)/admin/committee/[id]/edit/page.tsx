import { CommitteeEditPage } from "@/features/admin/committee/edit/CommitteeEditPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Committee Member",
  description: "Edit the details of a committee member.",
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <CommitteeEditPage id={id} />
}
