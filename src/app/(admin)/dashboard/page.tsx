import type { Metadata } from "next"

import { DashboardPage } from "@/features/dashboard/DashboardPage"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View mosque management statistics, financial overview, recent donations, recent expenses, and analytics from the admin dashboard.",
}

export default function Page() {
  return <DashboardPage />
}
