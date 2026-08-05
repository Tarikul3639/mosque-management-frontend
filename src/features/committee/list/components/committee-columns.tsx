"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { DataTableColumnHeader } from "@/components/common/data-table"

import { getAvatarInitials } from "@/utils/avatar.utils"
import { getDesignationLabel } from "@/constants/designation"

import { CommitteeTableActions } from "./CommitteeTableActions"
import type { CommitteeMember } from "@/types/committee"

export const committeeColumns: ColumnDef<CommitteeMember>[] = [
  // 1. Member Info (Name, Avatar, Phone & Status merged)
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member" />
    ),
    cell: ({ row }) => {
      const member = row.original

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src={member.avatar?.url} />
            <AvatarFallback>{getAvatarInitials(member.name)}</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Link
                href={`/committee/${member.id}`}
                className="font-medium hover:text-primary hover:underline"
              >
                {member.name}
              </Link>
              {member.isActive ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-destructive/10 text-destructive">
                  Inactive
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{member.phone}</p>
          </div>
        </div>
      )
    },
  },

  // 2. Designation
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">
        {getDesignationLabel(row.original.designation)}
      </Badge>
    ),
  },

  // 3. Contact Info (Email & Phone reference)
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Info" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{row.original.email}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.phone}
        </span>
      </div>
    ),
  },

  // 4. Timeline (Joining & End Date)
  {
    accessorKey: "joiningDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenure / Joining" />
    ),
    cell: ({ row }) => {
      const joining = format(new Date(row.original.joiningDate), "dd MMM yyyy")
      const end = row.original.endDate
        ? format(new Date(row.original.endDate), "dd MMM yyyy")
        : "Present"

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{joining}</span>
          <span className="text-xs text-muted-foreground">To: {end}</span>
        </div>
      )
    },
  },

  // 5. Address
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <p className="text-sm">{row.original.address}</p>,
  },

  // 6. End Date (Individual fallback if needed)
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) =>
      row.original.endDate
        ? format(new Date(row.original.endDate), "dd MMM yyyy")
        : "Current Member",
  },

  // 7. Created At
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "dd MMM yyyy, hh:mm a"),
  },

  // 8. Updated At
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) =>
      format(new Date(row.original.updatedAt), "dd MMM yyyy, hh:mm a"),
  },

  // 9. Actions
  {
    id: "actions",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <CommitteeTableActions member={row.original} />,
  },
]