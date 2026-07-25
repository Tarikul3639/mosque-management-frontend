"use client"

import Image from "next/image"
import { ReactNode } from "react"

import { Logo } from "@/components/icons/Logo"

interface AuthHeroProps {
  image: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

export default function AuthHero({
  image,
  title,
  description,
  children,
}: AuthHeroProps) {
  return (
    <section className="relative hidden overflow-hidden bg-linear-to-br from-sidebar via-sidebar-primary to-primary lg:flex">
      {/* Background Image */}
      <Image
        src={image}
        alt="Auth Hero"
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
          <div className="flex items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-md">
              <Logo className="p-1.5" color="white" />
              <span className="sr-only">Mosque Management System</span>
            </div>

            <div className="ml-3 flex flex-col justify-center text-lg leading-tight font-semibold">
              <p className="text-primary-foreground">Mosque</p>

              <p className="text-primary-foreground">Management System</p>
            </div>
          </div>

          <h2 className="mt-12 text-3xl leading-tight font-bold">{title}</h2>

          {description && (
            <p className="mt-5 max-w-md text-base leading-7 text-primary-foreground">
              {description}
            </p>
          )}
        </div>

        {/* Bottom Content */}
        {children}
      </div>
    </section>
  )
}
