// page.tsx

import { FamilyEditPage } from "@/features/families/edit/FamilyEditPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <FamilyEditPage id={id} />;
}