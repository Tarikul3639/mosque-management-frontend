import { PhoneCall } from "lucide-react"

const contacts = [
  {
    title: "ইমাম",
    name: "মাওলানা আব্দুল্লাহ",
    phone: "+8801700000001",
  },
  {
    title: "মুয়াজ্জিন",
    name: "মোঃ আব্দুর রহমান",
    phone: "+8801700000002",
  },
  {
    title: "সভাপতি",
    name: "মোঃ আবুল কালাম",
    phone: "+8801700000003",
  },
]

export function EmergencyContact() {
  return (
    <section className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
          EMERGENCY CONTACT
        </span>

        <div className="mt-3 flex items-center gap-3 md:gap-4">
          <h2 className="shrink-0 text-2xl font-bold sm:text-3xl">
            জরুরি যোগাযোগ
          </h2>

          <div className="h-px flex-1 bg-border" />
        </div>

        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          প্রয়োজন হলে নিচের দায়িত্বশীল ব্যক্তিদের সাথে সরাসরি যোগাযোগ করতে
          পারবেন।
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <a
            key={contact.phone}
            href={`tel:${contact.phone}`}
            className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm md:gap-4 md:p-5"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground md:size-12">
              <PhoneCall className="size-4 md:size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium tracking-wider text-primary uppercase md:text-xs">
                {contact.title}
              </p>

              <h3 className="mt-1 truncate text-sm font-semibold md:text-base">
                {contact.name}
              </h3>

              <p className="mt-1 truncate text-xs text-muted-foreground md:text-sm">
                {contact.phone}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
