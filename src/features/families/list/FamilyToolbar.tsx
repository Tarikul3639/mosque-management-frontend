// src/modules/families/components/FamilyToolbar.tsx

"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FamilyToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export function FamilyToolbar({
  search,
  onSearchChange,
  onReset,
}: FamilyToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search families..."
          className="pl-9"
        />
      </div>

      {search && (
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}