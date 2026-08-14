import type { Metadata } from "next"

import { SITE_CONFIG } from "@/config/metadata"
import { ContactPage } from "@/features/public/contact/ContactPage"

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description:
    "মসজিদের ঠিকানা, ফোন নম্বর, ইমেইল এবং অন্যান্য যোগাযোগের তথ্য দেখুন।",
  openGraph: {
    title: `যোগাযোগ | ${SITE_CONFIG.title}`,
    description: "মসজিদের সাথে যোগাযোগের সকল তথ্য এক জায়গায়।",
    images: [SITE_CONFIG.image],
  },
}

export default function Page() {
  return <ContactPage />
}
