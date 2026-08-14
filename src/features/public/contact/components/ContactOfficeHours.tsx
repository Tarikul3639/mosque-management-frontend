// src/features/public/contact/components/ContactOfficeHours.tsx

const officeHours = [
  {
    day: "শনিবার",
    time: "সকাল ৯:০০ - দুপুর ১:০০",
  },
  {
    day: "রবিবার",
    time: "সকাল ৯:০০ - দুপুর ১:০০",
  },
  {
    day: "সোমবার",
    time: "সকাল ৯:০০ - দুপুর ১:০০",
  },
  {
    day: "মঙ্গলবার",
    time: "সকাল ৯:০০ - দুপুর ১:০০",
  },
  {
    day: "বুধবার",
    time: "সকাল ৯:০০ - দুপুর ১:০০",
  },
  {
    day: "বৃহস্পতিবার",
    time: "সকাল ৯:০০ - দুপুর ১:০০",
  },
  {
    day: "শুক্রবার",
    time: "জুমার নামাজের পূর্বে ও পরে",
  },
]

export function ContactOfficeHours() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
          OFFICE HOURS
        </span>

        <div className="mt-3 flex items-center gap-4">
          <h2 className="shrink-0 text-3xl font-bold">অফিস সময়সূচী</h2>

          <div className="h-px flex-1 bg-border" />
        </div>

        <p className="mt-3 text-muted-foreground">
          নিচের সময়সূচী অনুযায়ী মসজিদ অফিসে যোগাযোগ করতে পারবেন।
        </p>
      </div>

      {/* Schedule */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {officeHours.map((item) => (
          <div
            key={item.day}
            className="rounded-xl border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <span className="text-sm font-semibold text-primary">
              {item.day}
            </span>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
