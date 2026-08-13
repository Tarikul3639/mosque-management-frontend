// src/config/navigation.ts

import type { LucideIcon } from "lucide-react"

import {
  Bell,
  Building2,
  ClipboardList,
  HandCoins,
  HeartHandshake,
  Home,
  Image,
  Receipt,
  Settings,
  UserCog,
  Users,
  ShieldUser,
  Wallet,
  Phone,
} from "lucide-react"

import { ROUTES } from "@/config/routes"

export interface NavigationItem {
  title: string
  href: string
  icon?: LucideIcon
  badge?: string
  children?: NavigationItem[]
}

// ======================================================
// Admin Navigation
// ======================================================

export const ADMIN_NAVIGATION: NavigationItem[] = [
  {
    title: "Dashboard",
    href: ROUTES.ADMIN.DASHBOARD,
    icon: Home,
  },

  {
    title: "Users",
    href: ROUTES.ADMIN.USERS.INDEX,
    icon: Users,
  },

  {
    title: "Families",
    href: ROUTES.ADMIN.FAMILIES.INDEX,
    icon: Building2,
  },

  {
    title: "Committee",
    href: ROUTES.ADMIN.COMMITTEE.INDEX,
    icon: UserCog,
  },

  {
    title: "Donors",
    href: ROUTES.ADMIN.DONORS.INDEX,
    icon: HandCoins,
  },

  {
    title: "Donations",
    href: ROUTES.ADMIN.DONATIONS.INDEX,
    icon: HeartHandshake,
  },

  {
    title: "Payments",
    href: ROUTES.ADMIN.PAYMENTS.INDEX,
    icon: Wallet,
  },

  {
    title: "Expenses",
    href: ROUTES.ADMIN.EXPENSES.INDEX,
    icon: Receipt,
  },

  {
    title: "Projects",
    href: ROUTES.ADMIN.PROJECTS.INDEX,
    icon: ClipboardList,
  },

  {
    title: "Gallery",
    href: ROUTES.ADMIN.GALLERY.INDEX,
    icon: Image,
  },

  // {
  //     title: "Notices",
  //     href: ROUTES.ADMIN.NOTICES.INDEX,
  //     icon: Bell,
  // },

  // {
  //     title: "Settings",
  //     href: ROUTES.ADMIN.SETTINGS,
  //     icon: Settings,
  // },
]

// ======================================================
// Public Navigation
// ======================================================

export const PUBLIC_NAVIGATION: NavigationItem[] = [
  {
    title: "হোম",
    href: ROUTES.PUBLIC.HOME,
    icon: Home,
  },

  {
    title: "কমিটি",
    href: ROUTES.PUBLIC.COMMITTEE.INDEX,
    icon: UserCog,
  },

  {
    title: "পরিবারসমূহ",
    href: ROUTES.PUBLIC.FAMILIES.INDEX,
    icon: Building2,
  },

  {
    title: "প্রকল্পসমূহ",
    href: ROUTES.PUBLIC.PROJECTS.INDEX,
    icon: ClipboardList,
  },

  {
    title: "ব্যয়সমূহ",
    href: ROUTES.PUBLIC.EXPENSES.INDEX,
    icon: Receipt,
  },

  {
    title: "গ্যালারি",
    href: ROUTES.PUBLIC.GALLERY.INDEX,
    icon: Image,
  },

  {
    title: "যোগাযোগ",
    href: ROUTES.PUBLIC.CONTACT,
    icon: Phone,
  },
  {
    title: "অ্যাডমিন",
    href: ROUTES.ADMIN.DASHBOARD,
    icon: ShieldUser,
  },
]
