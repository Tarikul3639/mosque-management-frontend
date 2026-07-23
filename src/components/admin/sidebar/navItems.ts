import type { LucideIcon } from "lucide-react";
import {
    LayoutDashboard,
    Users,
    UserRound,
    HeartHandshake,
    Wallet,
    CalendarClock,
    CreditCard,
    UsersRound,
    Building2,
    Images,
    BarChart3,
    Settings,
} from "lucide-react";

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
}

export const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "families", label: "Families", icon: Users, href: "/families" },
    { id: "donors", label: "Donors", icon: UserRound, href: "/donors" },
    { id: "donations", label: "Donations", icon: HeartHandshake, href: "/donations" },
    { id: "expenses", label: "Expenses", icon: Wallet, href: "/expenses" },
    { id: "monthly-charges", label: "Monthly Charges", icon: CalendarClock, href: "/monthly-charges" },
    { id: "payments", label: "Payments", icon: CreditCard, href: "/payments" },
    { id: "committee", label: "Committee", icon: UsersRound, href: "/committee" },
    { id: "development-projects", label: "Development Projects", icon: Building2, href: "/development-projects" },
    { id: "galleries", label: "Galleries", icon: Images, href: "/galleries" },
    { id: "reports", label: "Reports", icon: BarChart3, href: "/reports" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];