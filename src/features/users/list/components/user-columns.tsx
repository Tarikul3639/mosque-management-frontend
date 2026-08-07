"use client"

import { format } from "date-fns"
import Link from "next/link"

import type { ColumnDef } from "@tanstack/react-table"

import { Shield, ShieldCheck, UserRound } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/common/data-table"

import { UserTableActions } from "./UserTableActions"
import type { User } from "@/types/user"

export const userColumns: ColumnDef<User>[] = [
  {
    id: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    accessorKey: "name",

    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src={user.avatar?.url ?? ""} />

            <AvatarFallback>
              <UserRound className="size-4" />
            </AvatarFallback>
          </Avatar>

          <div className="max-w-60">
            <Link
              href={`/users/${user.id}`}
              className="line-clamp-1 font-semibold hover:text-primary hover:underline"
            >
              {user.name}
            </Link>

            <p className="line-clamp-1 text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      )
    },
  },

  {
    accessorKey: "phone",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },

  {
    accessorKey: "role",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),

    cell: ({ row }) => {
      const role = row.original.role

      return (
        <Badge variant={role === "SUPER_ADMIN" ? "default" : "secondary"}>
          {role === "SUPER_ADMIN" ? (
            <>
              <ShieldCheck className="mr-1 size-3.5" />
              Super Admin
            </>
          ) : (
            <>
              <Shield className="mr-1 size-3.5" />
              Admin
            </>
          )}
        </Badge>
      )
    },
  },

  {
    accessorKey: "status",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => {
      const active = row.original.status === "ACTIVE"

      return (
        <Badge variant={active ? "success" : "secondary"}>
          {active ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },

  {
    accessorKey: "lastLoginAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Login" />
    ),

    cell: ({ row }) =>
      row.original.lastLoginAt
        ? format(new Date(row.original.lastLoginAt), "dd MMM yyyy")
        : "Never",
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),

    cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },

  {
    id: "actions",

    enableSorting: false,
    enableHiding: false,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),

    cell: ({ row }) => <UserTableActions id={row.original.id} />,
  },
]
