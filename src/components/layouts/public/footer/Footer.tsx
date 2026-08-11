import { FooterBrand } from "./FooterBrand"
import { FooterLinks } from "./FooterLinks"
import { FooterContact } from "./FooterContact"
import { FooterBottom } from "./FooterBottom"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-muted/20">
      {/* Image */}
      <div className="flex justify-center container mx-auto pt-10 px-3 sm:px-6 lg:px-8 lg:pt-16">
        <Image
          src="/images/footer-makeup.webp"
          alt="Footer Makeup"
          width={1200}
          height={300}
          className="object-contain opacity-80 mix-blend-luminosity brightness-110"
        />
      </div>

      {/* Content */}
      <div className="container border-t mx-auto px-4 pt-10 pb-6 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-2 gap-10 pb-6 lg:grid-cols-4">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>

        <FooterBottom />
      </div>
    </footer>
  )
}
