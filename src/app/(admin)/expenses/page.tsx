// src/app/(admin)/expenses/page.tsx

import { ExpensesPage } from "@/features/expenses/list/ExpensesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expenses",
  description:
    "Manage and track expenses for the mosque.",
};

export default function Page() {
  return <ExpensesPage />;
}