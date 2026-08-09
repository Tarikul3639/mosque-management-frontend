import { MessageCircle } from "lucide-react"

import { ROUTES } from "@/config/routes"

export const FOOTER_LINKS = [
  {
    title: "দ্রুত লিংক",
    links: [
      { label: "হোম", href: ROUTES.PUBLIC.HOME },
      { label: "কমিটি", href: ROUTES.PUBLIC.COMMITTEE.INDEX },
      { label: "পরিবারসমূহ", href: ROUTES.PUBLIC.FAMILIES.INDEX },
      { label: "প্রকল্পসমূহ", href: ROUTES.PUBLIC.PROJECTS.INDEX },
      { label: "দানসমূহ", href: ROUTES.PUBLIC.DONATIONS.INDEX },
      { label: "গ্যালারি", href: ROUTES.PUBLIC.GALLERY.INDEX },
    ],
  },
  {
    title: "সহায়ক লিংক",
    links: [
      { label: "নামাজের সময়সূচী", href: ROUTES.PUBLIC.PRAYER_TIMES },
      { label: "অনুদান করুন", href: ROUTES.PUBLIC.DONATIONS.INDEX },
      { label: "যোগাযোগ", href: ROUTES.PUBLIC.CONTACT },
      { label: "গোপনীয়তা নীতি", href: ROUTES.PUBLIC.PRIVACY_POLICY },
      { label: "ব্যবহারের শর্তাবলী", href: ROUTES.PUBLIC.TERMS },
    ],
  },
]

export const SOCIAL_LINKS = [
  {
    icon: MessageCircle,
    href: "#",
  },
  {
    icon: MessageCircle,
    href: "#",
  },
  {
    icon: MessageCircle,
    href: "#",
  },
  {
    icon: MessageCircle,
    href: "#",
  },
]