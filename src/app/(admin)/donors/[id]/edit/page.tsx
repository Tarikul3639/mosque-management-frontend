// src/app/(dashboard)/donors/[id]/edit/page.tsx

import type { Metadata } from "next"

import { DonorEditPage } from "@/features/donors/edit/DonorEditPage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: "Edit Donor",
  description: "Update donor information.",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <DonorEditPage id={id} />
}
