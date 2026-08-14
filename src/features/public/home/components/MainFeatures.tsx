import { HeartHandshake, Landmark, Users, Wallet } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "@/config/routes"

/* ------------------------------ Features Data ------------------------------ */
const FEATURES = [
  {
    icon: Users,
    title: "সদস্য ব্যবস্থাপনা",
    description: "মসজিদের সদস্য ও পরিবারের সকল তথ্য সহজেই পরিচালনা করুন।",
    href: ROUTES.PUBLIC.COMMITTEE.INDEX,
  },
  {
    icon: HeartHandshake,
    title: "দান ও যাকাত",
    description: "দান, যাকাত ও অনুদান স্বচ্ছতার সাথে সংগ্রহ ও পরিচালনা করুন।",
    href: ROUTES.PUBLIC.CONTACT,
  },
  {
    icon: Wallet,
    title: "ব্যয় ব্যবস্থাপনা",
    description: "মসজিদের সকল ব্যয়ের হিসাব রাখুন বিস্তারিত রিপোর্টসহ।",
    href: ROUTES.PUBLIC.EXPENSES.INDEX,
  },
  {
    icon: Landmark,
    title: "প্রকল্প ব্যবস্থাপনা",
    description: "শুরু থেকে সমাপ্তি পর্যন্ত মসজিদের প্রকল্পগুলো পরিচালনা করুন।",
    href: ROUTES.PUBLIC.PROJECTS.INDEX,
  },
]

/* ------------- Decorative gold divider ------------- */
function Divider() {
  return (
    <div className="mt-3 flex items-center justify-center gap-2" aria-hidden>
      <span className="h-px w-8 bg-chart-3/70" />
      <span className="size-1.5 rotate-45 bg-chart-3" />
      <span className="h-px w-8 bg-chart-3/70" />
    </div>
  )
}

/* -------------------------------- Component -------------------------------- */
export function MainFeatures() {
  return (
    <section className="bg-muted py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            আমাদের মূল ফিচারসমূহ
          </h2>
          <Divider />
        </div>

        {/* Feature cards - Mobile-e 2-columns (grid-cols-2) */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 md:grid-cols-4 md:gap-5">
          {FEATURES.map(({ icon: Icon, title, description, href }) => (
            <Link
              key={title}
              href={href}
              className="group relative overflow-hidden rounded-xl border border-border bg-linear-to-b from-card to-chart-3/5 p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-chart-3/30 hover:shadow-md sm:p-6"
            >
              {/* Subtle Background Bubble */}
              <div className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-chart-3/5 blur-2xl transition-all duration-300 group-hover:bg-chart-3/10" />

              {/* Card Content Wrapper */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <div className="mx-auto flex size-10 items-center justify-center text-primary transition-transform group-hover:scale-110 sm:size-14">
                  <Icon className="size-7 sm:size-10" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-3 text-sm font-bold text-foreground sm:mt-4 sm:text-lg">
                  {title}
                </h3>

                {/* Description */}
                <p className="mt-1 text-xs leading-4 text-muted-foreground sm:mt-2 sm:leading-6">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
