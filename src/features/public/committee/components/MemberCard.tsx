"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CalendarDays,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { getAvatarClass, getAvatarInitials } from "@/utils/avatar.utils"

import { formatBengaliDate as formatDate } from "@/utils/format-bengali-date"
import { formatBengaliNumber as formatNum } from "@/utils/format-bengali-number"

import type { CommitteeMember } from "@/types/committee"

import { DESIGNATION_MAP } from "../constants"

interface ContactRowProps {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  href?: string
  external?: boolean
}

function ContactRow({ icon: Icon, children, href, external }: ContactRowProps) {
  const content = (
    <div className="group/row flex items-start gap-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground transition-colors group-hover/row:border-primary/40 group-hover/row:text-primary">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1 pt-1 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  )

  if (!href) return content

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="-mx-2 block rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/60"
    >
      {content}
    </Link>
  )
}

export function MemberCard({ member }: { member: CommitteeMember }) {
  const [open, setOpen] = useState(false)

  const designation =
    DESIGNATION_MAP[member.designation]?.label ?? member.designation

  return (
    <article
      className={`group/card relative self-start overflow-visible rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-md ${open ? "z-20" : "z-0"
        }`}
    >
      {/* ---------------- Header ---------------- */}
      <div className="relative overflow-hidden rounded-t-xl border-b border-border bg-muted/30 px-6 pt-7 pb-6">
        <Badge
          variant="outline"
          className={`absolute top-4 right-4 rounded-full border px-2.5 py-1 text-xs font-medium ${member.isActive
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-border bg-background text-muted-foreground"
            }`}
        >
          {member.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
        </Badge>

        <div className="flex items-center justify-center">
          {/* Decorative Background */}
          <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-r from-transparent via-primary/25 to-transparent" />

          <Avatar className="size-30 border border-border shadow-sm sm:size-32">
            <AvatarImage
              src={member.avatar?.url ?? undefined}
              alt={member.name}
            />
            <AvatarFallback
              className={`${getAvatarClass(member.name)} text-2xl sm:text-3xl`}
            >
              {getAvatarInitials(member.name) || <User className="size-8" />}
            </AvatarFallback>
          </Avatar>
        </div>

        <h3 className="mt-4 line-clamp-1 text-center text-lg font-bold text-foreground">
          {member.name}
        </h3>

        <div className="mt-1.5 flex justify-center">
          <Badge
            variant="secondary"
            className="text-center text-xs font-medium tracking-wide uppercase"
          >
            {designation}
          </Badge>
        </div>
      </div>

      {/* ---------------- Details (Collapsible, floats as an overlay so it doesn't stretch the grid row) ---------------- */}
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-b-xl px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=open]:rounded-b-none"
          >
            <span className="flex items-center gap-2">
              <ChevronDown
                className={`size-4 transition-transform ${open ? "rotate-180" : ""
                  }`}
              />
              আরো তথ্য
            </span>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="absolute inset-x-0 top-full z-30 rounded-b-xl border border-t-0 border-border bg-card shadow-lg">
          <div className="space-y-0.5 px-6 py-5">
            {member.phone && (
              <ContactRow
                icon={Phone}
                href={`tel:${member.phone.replace(/\s+/g, "")}`}
              >
                <span className="font-medium text-foreground tabular-nums">
                  {formatNum(member.phone)}
                </span>
              </ContactRow>
            )}

            {member.email && (
              <ContactRow icon={Mail} href={`mailto:${member.email}`}>
                <span className="block truncate" title={member.email}>
                  {member.email}
                </span>
              </ContactRow>
            )}

            {member.address && (
              <ContactRow
                icon={MapPin}
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  member.address
                )}`}
                external
              >
                <span className="line-clamp-1">{member.address}</span>
              </ContactRow>
            )}

            {member.joiningDate && (
              <ContactRow icon={CalendarDays}>
                <span>
                  <span className="text-foreground">যোগদান:</span>{" "}
                  {formatDate(member.joiningDate)}
                </span>
              </ContactRow>
            )}

            {member.endDate && (
              <div className="mt-0.5 border-t border-border bg-muted/20">
                <ContactRow icon={CalendarDays}>
                  <span>
                    <span className="text-foreground">মেয়াদ শেষ:</span>{" "}
                    {formatDate(member.endDate)}
                  </span>
                </ContactRow>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </article>
  )
}
