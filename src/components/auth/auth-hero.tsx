"use client";

import Image from "next/image";
import { ReactNode } from "react";

import { Logo } from "@/components/icons/Logo";

interface AuthHeroProps {
  image: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export default function AuthHero({
  image,
  title,
  description,
  children,
}: AuthHeroProps) {
  return (
    <section className="relative hidden overflow-hidden bg-gradient-to-br from-sidebar via-sidebar to-sidebar-primary lg:flex">
      {/* Background Image */}
      <Image
        src={image}
        alt="Authentication"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-sidebar/90 via-sidebar-primary/80 to-primary/70"
        style={{
          maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-12 text-sidebar-foreground">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-sidebar-border bg-sidebar-accent/20 backdrop-blur-sm">
              <Logo
                className="p-1.5"
                color="currentColor"
              />
              <span className="sr-only">Mosque Management System</span>
            </div>

            <div>
              <p className="text-lg font-semibold text-sidebar-foreground">
                Mosque
              </p>

              <p className="text-lg font-semibold text-sidebar-foreground">
                Management System
              </p>
            </div>
          </div>

          <h2 className="mt-12 max-w-md text-4xl font-bold tracking-tight text-sidebar-foreground">
            {title}
          </h2>

          {description && (
            <p className="mt-5 max-w-md text-base leading-7 text-sidebar-foreground/80">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}