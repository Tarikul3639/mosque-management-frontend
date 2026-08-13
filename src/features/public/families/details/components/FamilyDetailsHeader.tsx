import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function FamilyDetailsHeader() {
    return (
        <section className="bg-background pb-2">
            <div className="mx-auto flex container items-center px-4 py-4">
                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-1 transition-colors hover:text-primary"
                    >
                        <Home className="size-4" />
                        <span>হোম</span>
                    </Link>

                    <ChevronRight className="size-4" />

                    <Link
                        href="/families"
                        className="transition-colors hover:text-primary"
                    >
                        পরিবারসমূহ
                    </Link>

                    <ChevronRight className="size-4" />

                    <span className="font-medium text-foreground">
                        পরিবারের তথ্য
                    </span>
                </nav>
            </div>
        </section>
    )
}