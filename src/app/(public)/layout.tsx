import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/admin/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Masjid Management System",
  description: "Manage donations, expenses, families, and more.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <div className="flex h-screen overflow-hidden bg-background text-foreground antialiased">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
  );
}