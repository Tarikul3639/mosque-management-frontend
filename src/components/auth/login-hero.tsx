"use client"

import Image from "next/image"
import { BadgeCheck, HeartHandshake, ShieldCheck } from "lucide-react"

import { Logo } from "@/components/icons/Logo"

export default function LoginHero() {
  return (
    <section className="relative hidden overflow-hidden bg-linear-to-br from-sidebar via-sidebar-primary to-primary lg:flex">
      {/* Background Image */}
      <Image
        src="/images/login-hero.png"
        alt="Mosque"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div
        className="absolute -inset-40 rotate-45 bg-linear-to-br from-primary via-primary to-transparent backdrop-blur-xs"
        style={{
          maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-12 text-sidebar-foreground">
        {/* Logo */}
        <div>
          <div className="flex">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-md">
              <Logo className="p-1.5" color="white" />
              <span className="sr-only">Mosque Management System</span>
            </div>

            <div className="ml-3 flex flex-col justify-center text-lg leading-tight font-semibold">
              <p className="text-primary-foreground">Mosque</p>
              <p className="text-primary-foreground">Management System</p>
            </div>
          </div>

          <h2 className="mt-12 text-3xl leading-tight font-bold">
            Manage Your Mosque
            <br />
            Smartly & Efficiently
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-primary-foreground">
            A complete solution to manage members, donations, expenses, events
            and more.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="flex w-64 items-start rounded-lg bg-primary/50 p-2.5 font-sans text-muted shadow-lg backdrop-blur-sm">
          {/* Icon */}
          <div className="mt-1 mr-3 shrink-0">
            <ShieldCheck
              className="h-10 w-10 text-primary-foreground"
              strokeWidth={1.8}
            />
          </div>

          {/* Content */}
          <div className="grow">
            <h2 className="mb-1.5 text-sm leading-tight font-bold tracking-wide">
              Secure. Simple. Reliable.
            </h2>

            <p className="text-xs leading-relaxed font-normal opacity-90">
              Built for mosques, committees <br /> & communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
