"use client";

import { useState } from "react";
import { Bell, Calendar, ChevronDown, Download } from "lucide-react";

interface DashboardHeaderProps {
    userName?: string;
    subtitle?: string;
    dateRangeLabel?: string;
    onDateRangeClick?: () => void;
    onExportReport?: () => void;
    onNotificationsClick?: () => void; notificationCount?: number;
}

export function Header({
    userName = "Tariqul Islam",
    subtitle = "Here's what's happening in your mosque today.",
    dateRangeLabel = "May 1, 2024 - May 31, 2024",
    onDateRangeClick,
    onExportReport,
    onNotificationsClick,
    notificationCount = 5,
}: DashboardHeaderProps) {
    const [dateOpen, setDateOpen] = useState(false);

    const handleDateClick = () => {
        setDateOpen((prev) => !prev);
        onDateRangeClick?.();
    };

    return (
        <div className="flex w-full flex-wrap items-center justify-between gap-4 px-6 py-5">
            {/* Left: greeting */}
            <div className="min-w-0">
                <h1 className="flex items-center gap-2 truncate text-xl font-semibold text-foreground">
                    Welcome back, {userName}
                    <span aria-hidden>👋</span>
                </h1>
                <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
            </div>

            {/* Right: date range + export */}
            <div className="flex shrink-0 items-center gap-3">
                <button
                    type="button"
                    onClick={handleDateClick}
                    aria-expanded={dateOpen}
                    className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{dateRangeLabel}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                {/* Right: notifications */}
                <button
                    type="button"
                    onClick={onNotificationsClick}
                    aria-label="Notifications"
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-secondary"
                >
                    <Bell className="h-4.5 w-4.5" size={18} />
                    {notificationCount > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-semibold text-white">
                            {notificationCount > 9 ? "9+" : notificationCount}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onExportReport}
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                    <Download className="h-4 w-4" />
                    <span>Export Report</span>
                </button>
            </div>
        </div>
    );
}

export default Header;