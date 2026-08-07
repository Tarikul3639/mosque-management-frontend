// src/config/navigation.ts

import type { LucideIcon } from "lucide-react"

import {
    Bell,
    Building2,
    ClipboardList,
    HandCoins,
    Home,
    Image,
    Receipt,
    Settings,
    UserCog,
    Users,
    Wallet,
} from "lucide-react"

import { ROUTES } from "./routes"

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

    {
        title: "Notices",
        href: ROUTES.ADMIN.NOTICES.INDEX,
        icon: Bell,
    },

    {
        title: "Settings",
        href: ROUTES.ADMIN.SETTINGS,
        icon: Settings,
    },
]

// ======================================================
// Public Navigation
// ======================================================

export const PUBLIC_NAVIGATION: NavigationItem[] = [
    {
        title: "Home",
        href: ROUTES.PUBLIC.HOME,
    },

    {
        title: "Committee",
        href: ROUTES.PUBLIC.COMMITTEE.INDEX,
    },

    {
        title: "Families",
        href: ROUTES.PUBLIC.FAMILIES.INDEX,
    },

    {
        title: "Projects",
        href: ROUTES.PUBLIC.PROJECTS.INDEX,
    },

    {
        title: "Gallery",
        href: ROUTES.PUBLIC.GALLERY.INDEX,
    },

    {
        title: "Donations",
        href: ROUTES.PUBLIC.DONATIONS.INDEX,
    },

    {
        title: "Prayer Times",
        href: ROUTES.PUBLIC.PRAYER_TIMES,
    },

    {
        title: "Contact",
        href: ROUTES.PUBLIC.CONTACT,
    },
]