// src/features/public/contact/ContactPage.tsx

import { ContactBanner } from "./components/ContactBanner"
import { ContactCTA } from "./components/ContactCTA"
import { ContactDepartments } from "./components/ContactDepartments"
import { ContactFAQ } from "./components/ContactFAQ"
import { ContactInfo } from "./components/ContactInfo"
import { ContactMap } from "./components/ContactMap"
import { ContactSocialLinks } from "./components/ContactSocialLinks"
import { EmergencyContact } from "./components/EmergencyContact"

export function ContactPage() {
  return (
    <>
      <ContactBanner />

      <section className="container mx-auto px-4 py-10 md:px-6">
        <ContactDepartments />
      </section>

      <section className="container mx-auto px-4 py-10 md:px-6 md:py-14">
        <ContactInfo />
      </section>

      <section className="container mx-auto px-4 py-10 md:px-6">
        <EmergencyContact />
      </section>

      <section className="container mx-auto px-4 py-10 md:px-6">
        <ContactMap />
      </section>

      <section className="container mx-auto px-4 py-10 md:px-6">
        <ContactSocialLinks />
      </section>

      <section className="container mx-auto px-4 py-10 md:px-6">
        <ContactFAQ />
      </section>

      <section className="container mx-auto px-4 pt-10 pb-16 md:px-6">
        <ContactCTA />
      </section>
    </>
  )
}
