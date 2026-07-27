"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/Logo";

interface ErrorComponentProps {
  error?: string;
  title?: string;
  onRetry?: () => void;
}

export function ErrorComponent({
  error = "Something went wrong. Please try again.",
  title = "Failed to load data",
  onRetry,
}: ErrorComponentProps) {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-lg border bg-card p-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="flex size-24 items-center justify-center rounded-full border border-destructive/20 bg-destructive/5">
            <Logo className="h-12 w-auto opacity-40" />
          </div>

          <div className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm">
            <AlertTriangle className="size-4" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {error}
        </p>

        {onRetry && (
          <Button
            onClick={onRetry}
            className="mt-6 gap-2"
          >
            <RotateCcw className="size-4" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}