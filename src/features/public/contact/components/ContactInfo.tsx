// src/features/public/contact/components/ContactInfo.tsx

import Image from "next/image"
import { Clock3, Mail, MapPin, Phone, Quote } from "lucide-react"

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "ঠিকানা",
    value: (
      <>
        নামা রাথুরা বাইতুল আমান জামে মসজিদ
        <br />
        কালীগঞ্জ, গাজীপুর, বাংলাদেশ
      </>
    ),
  },
  {
    icon: Phone,
    title: "ফোন নম্বর",
    value: (
      <a
        href="tel:+8801700000000"
        className="transition-colors hover:text-primary"
      >
        +৮৮০ ১৭০০-০০০০০০
      </a>
    ),
  },
  {
    icon: Mail,
    title: "ইমেইল",
    value: (
      <a
        href="mailto:mosque@example.com"
        className="break-all transition-colors hover:text-primary"
      >
        mosque@example.com
      </a>
    ),
  },
  {
    icon: Clock3,
    title: "যোগাযোগের সময়",
    value: <>প্রতিদিন সকাল ৮:০০ - রাত ৯:০০</>,
  },
]

export function ContactInfo() {
  return (
    <section className="space-y-10 md:space-y-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-2 text-center">
        <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
          CONTACT INFORMATION
        </span>

        <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">
          আমাদের সাথে যোগাযোগ করুন
        </h2>

        <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
          মসজিদ সম্পর্কিত যেকোনো তথ্য, পরামর্শ, অভিযোগ, অনুদান অথবা মাসিক চাঁদা
          সম্পর্কে জানতে নিচের যেকোনো মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারেন।
        </p>
      </div>

      {/* Content */}
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border">
          <Image
            src="/images/contact-info.jpg"
            alt="Contact"
            width={900}
            height={700}
            className="h-64 w-full object-cover sm:h-96 lg:h-155"
          />
        </div>

        {/* Right */}
        <div className="space-y-8 md:space-y-10">
          {/* Contact Items */}
          <div className="space-y-5 md:space-y-6">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 md:gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary md:size-11">
                    <Icon className="size-4 md:size-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold md:text-base">
                      {item.title}
                    </h3>

                    <div className="mt-1 text-sm leading-6 wrap-break-word text-muted-foreground md:text-base md:leading-7">
                      {item.value}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Hadith */}
          <div className="relative overflow-hidden rounded-2xl border bg-primary/5 p-5 md:p-6">
            <div className="absolute -top-6 -right-6 opacity-10">
              <Quote className="size-24 text-primary md:size-28" />
            </div>

            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-primary md:text-xs">
              আজকের হাদিস
            </span>

            <p className="mt-5 text-center text-xl leading-relaxed font-semibold md:text-2xl">
              خيركم من تعلم القرآن وعلمه
            </p>

            <p className="mt-5 text-sm leading-7 text-muted-foreground md:mt-6 md:text-base md:leading-8">
              <strong>অর্থ:</strong> তোমাদের মধ্যে সেই ব্যক্তি সর্বোত্তম, যে
              কুরআন শিক্ষা করে এবং অন্যকে শিক্ষা দেয়।
            </p>

            <div className="mt-5 border-t pt-4 md:mt-6">
              <p className="text-sm font-medium text-muted-foreground">
                — সহীহ বুখারী (৫০২৭)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
