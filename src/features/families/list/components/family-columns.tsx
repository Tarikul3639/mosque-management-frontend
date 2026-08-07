"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Calendar, MapPin, Phone, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { DataTableColumnHeader } from "@/components/common/data-table"

import { FamilyRowActions } from "./FamilyRowActions"

import { getAvatarColor, getAvatarInitials } from "@/utils/avatar.utils"
import { formatDate } from "@/utils/format-date"
import { cn } from "@/lib/utils"
import Link from "next/link"

import type { Family } from "@/types/family"

export const familyColumns: ColumnDef<Family>[] = [
  {
    accessorKey: "headName",

    meta: {
      title: "Family",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Family" />
    ),

    cell: ({ row }) => {
      const { avatar, headName, familyNo } = row.original

      const color = getAvatarColor(headName)

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={avatar?.url ?? undefined} alt={headName} />

            <AvatarFallback className={cn(color.bg, color.text)}>
              {getAvatarInitials(headName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <Link
              href={`/families/${row.original.id}`}
              className="truncate font-medium hover:text-primary hover:underline"
            >
              {headName}
            </Link>

            <p className="text-xs text-muted-foreground">{familyNo}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",

    meta: {
      title: "Email",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />

        <span>{row.original.email ?? "N/A"}</span>
      </div>
    ),
  },

  {
    accessorKey: "phone",

    meta: {
      title: "Phone",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />

        <span>{row.original.phone ?? "N/A"}</span>
      </div>
    ),
  },

  {
    accessorKey: "address",

    meta: {
      title: "Address",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),

    cell: ({ row }) => (
      <div className="flex max-w-xs items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />

        <span className="truncate">{row.original.address ?? "N/A"}</span>
      </div>
    ),
  },

  {
    accessorKey: "isActive",

    meta: {
      title: "Status",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={cn(
          "rounded-full px-3 font-medium",
          row.original.isActive
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-red-200 bg-red-50 text-red-700"
        )}
      >
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  {
    accessorKey: "createdAt",

    meta: {
      title: "Joined",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),

    cell: ({ row }) => (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Calendar className="h-4 w-4 text-muted-foreground" />

        <span>{formatDate(row.original.createdAt)}</span>
      </div>
    ),
  },

  {
    id: "actions",

    meta: {
      title: "",
    },

    enableSorting: false,
    enableHiding: false,

    cell: ({ row }) => <FamilyRowActions family={row.original} />,
  },
]
