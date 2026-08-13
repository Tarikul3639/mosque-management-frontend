// src/components/public/navbar/Navbar.tsx

import { NavbarActions } from "./NavbarActions"
import { NavbarBrand } from "./NavbarBrand"
import { NavbarDesktop } from "./NavbarDesktop"
import { NavbarMobile } from "./NavbarMobile"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 px-3 backdrop-blur-xl sm:px-4 md:px-6 lg:px-8">
      <div className="container mx-auto flex h-20 items-center justify-between">
        {/* Left */}
        <NavbarBrand />

        {/* Center */}
        <NavbarDesktop />

        {/* Right */}
        <div className="flex items-center gap-2">
          <NavbarActions />
          <NavbarMobile />
        </div>
      </div>
    </header>
  )
}
