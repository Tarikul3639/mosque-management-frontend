import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminLayout } from "./wrapper";

export const metadata: Metadata = {
  title: "Masjid Management System",
  description: "Manage donations, expenses, families, and more.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}