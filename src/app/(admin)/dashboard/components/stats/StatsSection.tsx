"use client";

import {
    Wallet,
    Receipt,
    Landmark,
    Users,
} from "lucide-react";

import { StatsCard } from "./StatsCard";

export function StatsSection() {
    return (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 px-2">
            <StatsCard
                title="Total Donations"
                value="৳ 245,680"
                change="18.5%"
                icon={<Wallet size={30} />}
                iconBg="bg-green-100"
                iconColor="text-green-600"
            />

            <StatsCard
                title="Total Expenses"
                value="৳ 175,420"
                change="12.3%"
                icon={<Receipt size={30} />}
                iconBg="bg-red-100"
                iconColor="text-red-600"
            />

            <StatsCard
                title="Net Balance"
                value="৳ 70,260"
                change="25.7%"
                icon={<Landmark size={30} />}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
            />

            <StatsCard
                title="Total Families"
                value="245"
                change="8.2%"
                icon={<Users size={30} />}
                iconBg="bg-violet-100"
                iconColor="text-violet-600"
            />
        </section>
    );
}