// page.tsx

import { FamilyDetailsPage } from "@/features/families/details/FamilyDetailsPage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <FamilyDetailsPage id={id} />
}
