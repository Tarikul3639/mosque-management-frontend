"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/sidebar/Sidebar";
import { Navbar } from "@/components/admin/navbar/Navbar";

export function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onSearch={handleSearch}
          onMenuClick={() => setIsOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}