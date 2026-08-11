import Link from "next/link"

import { Logo } from "@/components/icons/Logo"
import { ROUTES } from "@/config/routes"
import { SOCIAL_LINKS } from "./footer.data"

export function FooterBrand() {
  return (
    <div className="col-span-4 lg:col-span-1 space-y-6">

      <Link
        href={ROUTES.PUBLIC.HOME}
        className="flex items-center gap-3"
      >
        <Logo className="size-14" color="var(--primary)"/>

        <div>
          <h3 className="font-bold text-lg">
            মসজিদ ব্যবস্থাপনা সিস্টেম
          </h3>

          <p className="text-sm text-muted-foreground">
            সুশাসন • সেবা • উন্নয়ন
          </p>
        </div>
      </Link>

      <p className="max-w-xs leading-7 text-muted-foreground">
        একটি মসজিদ, একটি পরিবার,
        একটি সমাজ — আল্লাহর সন্তুষ্টি
        অর্জনের লক্ষ্যে একসাথে পথচলা।
      </p>

      <div className="flex gap-3">

        {SOCIAL_LINKS.map(({ icon: Icon, href }, index) => (
          <Link
            key={`footer-social-link-${href}-${index}`}
            href={href}
            className="flex size-10 items-center justify-center rounded-full border transition hover:bg-primary hover:text-white"
          >
            <Icon className="size-4" />
          </Link>
        ))}

      </div>

    </div>
  )
}