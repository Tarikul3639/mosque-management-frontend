import { FooterBrand } from "./FooterBrand"
import { FooterLinks } from "./FooterLinks"
import { FooterContact } from "./FooterContact"
import { FooterBottom } from "./FooterBottom"

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-16">

        <div className="grid gap-10 grid-cols-2 lg:grid-cols-4 pb-6">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>

        <FooterBottom />
      </div>
    </footer>
  )
}