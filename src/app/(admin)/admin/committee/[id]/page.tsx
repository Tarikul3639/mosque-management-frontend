import { CommitteeDetailsPage } from "@/features/admin/committee/details/CommitteeDetailsPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Committee Member Details",
  description: "View detailed information about a committee member.",
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <CommitteeDetailsPage id={id} />
}
