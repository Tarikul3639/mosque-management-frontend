import type { Metadata } from "next"
import { DonorDetailsPage } from "@/features/donors/details/DonorDetailsPage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: "Donor Details",
  description:
    "View donor information, contact details, and donation activity.",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <DonorDetailsPage id={id} />
}
