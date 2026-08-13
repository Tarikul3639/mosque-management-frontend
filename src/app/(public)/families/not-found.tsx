import { SearchX } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"

export default function NotFound() {
    return (
        <section className="mx-auto container px-4 py-16">
            <EmptyState
                title="পৃষ্ঠা পাওয়া যায়নি"
                description="আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি বিদ্যমান নয়।"
                icon={<SearchX className="size-5" />}
            />
        </section>
    )
}