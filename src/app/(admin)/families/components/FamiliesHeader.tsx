import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FamiliesHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Families
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage registered families, search records, and keep household information up to date.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="lg"
                >
                    <Download className="h-4 w-4" />
                    Export
                </Button>

                <Button size="lg">
                    <Plus className="h-4 w-4" />
                    Create Family
                </Button>
            </div>
        </div>
    );
}