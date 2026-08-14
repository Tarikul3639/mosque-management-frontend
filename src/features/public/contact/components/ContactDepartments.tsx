// src/features/public/contact/components/ContactDepartments.tsx

import { Landmark, ShieldCheck, UserCog, Wallet } from "lucide-react"

const departments = [
  {
    title: "সাধারণ তথ্য",
    description:
      "মসজিদের সাধারণ কার্যক্রম, সময়সূচী এবং অন্যান্য তথ্যের জন্য যোগাযোগ করুন।",
    person: "অফিস প্রশাসন",
    icon: Landmark,
  },
  {
    title: "মাসিক চাঁদা",
    description:
      "পরিবারের মাসিক চাঁদা, বকেয়া অথবা অর্থ প্রদান সংক্রান্ত সহায়তা।",
    person: "কোষাধ্যক্ষ",
    icon: Wallet,
  },
  {
    title: "পরিবার নিবন্ধন",
    description:
      "নতুন পরিবার নিবন্ধন, তথ্য সংশোধন অথবা সদস্য সংক্রান্ত সহায়তা।",
    person: "অ্যাডমিন",
    icon: UserCog,
  },
  {
    title: "কমিটি",
    description: "কমিটির সিদ্ধান্ত, সভা এবং প্রশাসনিক বিষয়ে যোগাযোগ করুন।",
    person: "সাধারণ সম্পাদক",
    icon: ShieldCheck,
  },
]

export function ContactDepartments() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
          DEPARTMENTS
        </span>

        <div className="mt-3 flex items-center gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl line-clamp-2">
            কোন বিষয়ে কার সাথে যোগাযোগ করবেন?
          </h2>

          <div className="hidden h-px flex-1 bg-border sm:block" />
        </div>

        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          আপনার প্রয়োজন অনুযায়ী সংশ্লিষ্ট দায়িত্বপ্রাপ্ত ব্যক্তির সাথে
          যোগাযোগ করুন।
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {departments.map((department) => {
          const Icon = department.icon

          return (
            <div
              key={department.title}
              className="rounded-2xl border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold">{department.title}</h3>

                    <span className="text-sm font-medium text-primary">
                      {department.person}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {department.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
