"use client"

import { UserRole, UserStatus } from "@/types/user"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserFiltersProps {
  role?: UserRole
  status?: UserStatus

  onRoleChange: (value: UserRole | undefined) => void
  onStatusChange: (value: UserStatus | undefined) => void
}

export function UserFilters({
  role,
  status,
  onRoleChange,
  onStatusChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        key={`${role ?? "ALL"}-role-filter`}
        value={role ?? "ALL"}
        onValueChange={(value) =>
          onRoleChange(value === "ALL" ? undefined : (value as UserRole))
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Role" />
        </SelectTrigger>

        <SelectContent className="p-1">
          <SelectItem value="ALL" disabled>
            All Roles
          </SelectItem>
          <SelectSeparator />

          <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="USER">User</SelectItem>
        </SelectContent>
      </Select>

      <Select
        key={`${status ?? "ALL"}-status-filter`}
        value={status ?? "ALL"}
        onValueChange={(value) =>
          onStatusChange(value === "ALL" ? undefined : (value as UserStatus))
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent className="p-1">
          <SelectItem value="ALL" disabled>
            All Status
          </SelectItem>
          <SelectSeparator />
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
          <SelectItem value="SUSPENDED">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
