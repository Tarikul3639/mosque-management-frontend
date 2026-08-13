import Link from "next/link"

import { FOOTER_LINKS } from "./footer.data"

export function FooterLinks() {
  return (
    <>
      {FOOTER_LINKS.map((group) => (
        <div key={group.title}>
          <h3 className="mb-5 font-semibold">{group.title}</h3>

          <ul className="space-y-3">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
