"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { MosqueLogo } from "@/components/icons/MosqueLogo";
import { navItems } from "./navItems";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
    isOpen?: boolean;
    userName?: string;
    userRole?: string;
    userAvatarUrl?: string;
}

function Collapsible({
    isOpen,
    padding = "pl-3",
    children,
}: {
    isOpen: boolean;
    padding?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={[
                "grid min-w-0 transition-[grid-template-columns,opacity] duration-300 ease-in-out",
                isOpen
                    ? "grid-cols-[1fr] opacity-100"
                    : "grid-cols-[0fr] opacity-0",
            ].join(" ")}
        >
            {/* shrink wrapper */}
            <div className="overflow-hidden">
                {/* padding wrapper */}
                <div className={padding}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function Sidebar({
    isOpen = true,
    userName = "Tarikul Islam",
    userRole = "Super Admin",
    userAvatarUrl,
}: SidebarProps) {
    const pathname = usePathname();

    const initials = userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <aside
            className={[
                "flex h-screen flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
                "transition-[width] duration-300 ease-in-out",
                isOpen ? "w-64" : "w-0 sm:w-20",
            ].join(" ")}
        >
            {/* ================= Brand ================= */}

            <Link
                href="/dashboard"
                className="flex h-24 items-center border-b border-sidebar-border px-4"
            >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary/50">
                    <MosqueLogo className="h-full w-full p-1" color="white" />
                </div>

                <Collapsible isOpen={isOpen}>
                    <h1 className="whitespace-nowrap text-lg font-bold text-white">
                        MasjidMS
                    </h1>
                    <p className="whitespace-nowrap text-xs text-sidebar-foreground/70">
                        Mosque Management System
                    </p>
                </Collapsible>
            </Link>

            {/* ================= Navigation ================= */}

            <nav className="flex-1 overflow-y-auto px-3 py-3">
                <ul className="space-y-1">
                    {navItems.map(({ id, label, icon: Icon }) => {
                        const href = `/${id}`;
                        const isActive =
                            pathname === href || pathname.startsWith(`${href}/`);

                        return (
                            <li key={id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={href}
                                            className={[
                                                "flex h-11 items-center rounded-lg px-3 transition-colors",
                                                isActive
                                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                            ].join(" ")}
                                        >
                                            <div className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <Collapsible isOpen={isOpen}>
                                                <span className="whitespace-nowrap text-sm font-medium">
                                                    {label}
                                                </span>
                                            </Collapsible>
                                        </Link>
                                    </TooltipTrigger>

                                    {!isOpen && (
                                        <TooltipContent side="right" sideOffset={10}>
                                            {label}
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* ================= User ================= */}

            <div className="border-t border-sidebar-border p-3">
                <Tooltip >
                    <TooltipTrigger asChild>
                        <Link
                            href="/profile"
                            className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-sidebar-accent"
                        >
                            <Avatar className="h-9 w-9 shrink-0">
                                <AvatarImage src={userAvatarUrl} alt={userName} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>

                            <Collapsible isOpen={isOpen} padding="pl-2">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0 flex-1 text-left">
                                        <p className="truncate text-sm font-medium text-white">
                                            {userName}
                                        </p>
                                        <p className="truncate text-xs text-emerald-300">
                                            {userRole}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
                                </div>
                            </Collapsible>
                        </Link>
                    </TooltipTrigger>

                    {!isOpen && (
                        <TooltipContent side="right" sideOffset={10}>
                            {userName}
                        </TooltipContent>
                    )}
                </Tooltip>
            </div>
        </aside>
    );
}

export default Sidebar;