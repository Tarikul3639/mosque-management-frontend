import { HeartHandshake, ShieldCheck, TrendingUp, Users } from "lucide-react"

/* --------------------------- Small gold mosque icon --------------------------- */
function MosqueIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M7.5 20v-8c0-3 2-5.5 4.5-7 2.5 1.5 4.5 4 4.5 7v8" />
            <path d="M5.5 20h13" />
            <circle cx="12" cy="3" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    )
}

/* ---------------------------------- Data ---------------------------------- */
const VALUE_CARDS = [
    {
        items: [
            {
                icon: ShieldCheck,
                title: "স্বচ্ছতা",
                description: "সকল কার্যক্রমে স্বচ্ছতা নিশ্চিত",
            },
            {
                icon: Users,
                title: "জবাবদিহিতা",
                description: "সকল কাজে জবাবদিহিতা ও দায়িত্বশীলতা",
            },
        ],
    },
    {
        items: [
            {
                icon: HeartHandshake,
                title: "সেবা",
                description: "মুসলিম উম্মাহর সেবা করাই আমাদের লক্ষ্য",
            },
            {
                icon: TrendingUp,
                title: "উন্নয়ন",
                description: "মসজিদের সার্বিক উন্নয়নে নিরলস কাজ",
            },
        ],
    },
]

/* ------------------------------- Value Item ------------------------------- */
function ValueItem({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}) {
    return (
        <div className="flex items-start gap-3">
            {/* Icon circle */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
            </div>

            <div>
                <h3 className="text-sm font-bold text-foreground sm:text-base">
                    {title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    )
}

/* -------------------------------- Component -------------------------------- */
export function MissionValues() {
    return (
        <section className="bg-muted py-14 md:py-20">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
                    {/* ---------------- Left: Mission text ---------------- */}
                    <div>
                        {/* Label with gold mosque icon */}
                        <div className="inline-flex items-center gap-1 border-b-2 border-chart-3/60 pb-1">
                            <MosqueIcon className="size-6 text-chart-3" />
                            <span className="text-sm font-bold text-primary sm:text-base">
                                আমাদের লক্ষ্য
                            </span>
                        </div>

                        <h2 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl">
                            সেবাই আমাদের অঙ্গীকার
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                            মসজিদকে একটি আদর্শ ইবাদতের স্থান হিসেবে গড়ে তোলা, ইসলামের সঠিক
                            শিক্ষা প্রচার, এবং সমাজের কল্যাণে কাজ করাই আমাদের মূল লক্ষ্য।
                        </p>
                    </div>

                    {/* ---------------- Right: Value cards ---------------- */}
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                        {VALUE_CARDS.map((card, i) => (
                            <div
                                key={i}
                                className="grid content-start gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm"
                            >
                                {card.items.map((item) => (
                                    <ValueItem key={item.title} {...item} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}