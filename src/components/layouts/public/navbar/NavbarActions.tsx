// src/components/public/navbar/NavbarActions.tsx

import Link from "next/link"

import { HeartHandshake } from "lucide-react"
import { ROUTES } from "@/config/routes"
import { Button } from "@/components/ui/button"

export function NavbarActions() {
  return (
    <div className="items-center gap-3 lg:flex">
      <Button asChild size="lg">
        <Link href={ROUTES.PUBLIC.DONATIONS.INDEX}>
          <HeartHandshake className="hidden sm:block mr-2 size-4" />
          অনুদান করুন
        </Link>
      </Button>
    </div>
  )
}