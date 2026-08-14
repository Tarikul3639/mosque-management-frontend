// src/features/public/contact/components/ContactSocialLinks.tsx

import Link from "next/link"

import { ArrowUpRight, Globe } from "lucide-react"

import { FacebookIcon as Facebook } from "@/components/icons/FacebookIcon"
import { WhatsAppIcon as WhatsApp } from "@/components/icons/WhatsAppIcon"
import { YouTubeIcon as Youtube } from "@/components/icons/YouTubeIcon"

const SOCIAL_LINKS = [
  {
    title: "Facebook",
    subtitle: "সর্বশেষ আপডেট",
    href: "https://facebook.com/",
    icon: Facebook,
  },
  {
    title: "YouTube",
    subtitle: "ওয়াজ ও ভিডিও",
    href: "https://youtube.com/",
    icon: Youtube,
  },
  {
    title: "WhatsApp",
    subtitle: "দ্রুত যোগাযোগ",
    href: "https://wa.me/8801700000000",
    icon: WhatsApp,
  },
  {
    title: "Website",
    subtitle: "অফিসিয়াল সাইট",
    href: "/",
    icon: Globe,
  },
]

export function ContactSocialLinks() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
          FOLLOW US
        </span>

        <div className="mt-3 flex items-center gap-4">
          <h2 className="shrink-0 text-2xl font-bold sm:text-3xl">
            সামাজিক যোগাযোগ মাধ্যম
          </h2>

          <div className="hidden h-px flex-1 bg-border sm:block" />
        </div>

        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          আমাদের সর্বশেষ কার্যক্রম, ঘোষণা এবং ভিডিও পেতে সামাজিক যোগাযোগ মাধ্যমে
          যুক্ত থাকুন।
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {SOCIAL_LINKS.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group rounded-2xl border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm md:p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary md:size-11">
                  <Icon className="size-5" />
                </div>

                <div className="flex items-center justify-center rounded-full border border-border bg-card p-1.5 text-muted-foreground transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:p-2">
                  <ArrowUpRight className="size-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <h3 className="mt-4 text-sm font-semibold md:text-base">
                {item.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-muted-foreground md:text-sm">
                {item.subtitle}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
