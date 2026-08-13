// src/components/public/navbar/NavbarMobile.tsx

"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "./MobileSidebar"

export function NavbarMobile() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-6" />
      </Button>

      <MobileSidebar open={open} onOpenChange={setOpen} />
    </>
  )
}
