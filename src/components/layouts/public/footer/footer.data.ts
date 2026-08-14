import { Globe } from "lucide-react"

import { FacebookIcon } from "@/components/icons/FacebookIcon"
import { YouTubeIcon } from "@/components/icons/YouTubeIcon"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"

import { ROUTES } from "@/config/routes"

export const FOOTER_LINKS = [
  {
    title: "দ্রুত লিংক",
    links: [
      { label: "হোম", href: ROUTES.PUBLIC.HOME },
      { label: "কমিটি", href: ROUTES.PUBLIC.COMMITTEE.INDEX },
      { label: "পরিবারসমূহ", href: ROUTES.PUBLIC.FAMILIES.INDEX },
      { label: "প্রকল্পসমূহ", href: ROUTES.PUBLIC.PROJECTS.INDEX },
      { label: "খরচসমূহ", href: ROUTES.PUBLIC.EXPENSES.INDEX },
      { label: "গ্যালারি", href: ROUTES.PUBLIC.GALLERIES.INDEX },
    ],
  },
  {
    title: "সহায়ক লিংক",
    links: [
      { label: "নামাজের সময়সূচী", href: ROUTES.PUBLIC.PRAYER_TIMES },
      { label: "অনুদান করুন", href: ROUTES.PUBLIC.DONATE },
      { label: "যোগাযোগ", href: ROUTES.PUBLIC.CONTACT },
      { label: "গোপনীয়তা নীতি", href: ROUTES.PUBLIC.PRIVACY_POLICY },
      { label: "ব্যবহারের শর্তাবলী", href: ROUTES.PUBLIC.TERMS },
    ],
  },
]

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "https://facebook.com",
  },
  {
    label: "YouTube",
    icon: YouTubeIcon,
    href: "https://youtube.com",
  },
  {
    label: "WhatsApp",
    icon: WhatsAppIcon,
    href: "https://wa.me/8801700000000",
  },
  {
    label: "Website",
    icon: Globe,
    href: ROUTES.PUBLIC.HOME,
  },
]
