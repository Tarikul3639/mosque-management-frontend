// page.tsx

import { FamilyEditPage } from "./components/FamilyEditPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <FamilyEditPage id={id} />;
}