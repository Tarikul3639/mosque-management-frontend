// src/components/public/navbar/NavbarActions.tsx

import Link from "next/link"

import { HeartHandshake } from "lucide-react"
import { ROUTES } from "@/config/routes"
import { Button } from "@/components/ui/button"

export function NavbarActions() {
  return (
    <div className="items-center gap-3 lg:flex">
      <Button asChild size="lg">
        <Link href={ROUTES.PUBLIC.CONTACT}>
          <HeartHandshake className="mr-2 hidden size-4 sm:block" />
          অনুদান করুন
        </Link>
      </Button>
    </div>
  )
}
