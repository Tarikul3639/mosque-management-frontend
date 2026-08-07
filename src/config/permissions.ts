// src/config/permissions.ts

import type { UserRole } from "@/types/user"

interface Permissions {
    [role: string]: readonly string[]
}

export const PERMISSIONS: Permissions = {
    SUPER_ADMIN: [
        "dashboard",
        "users",
        "families",
        "committee",
        "donors",
        "payments",
        "expenses",
        "projects",
        "gallery",
        "notices",
        "settings",
    ],
    ADMIN: [
        "dashboard",
        "families",
        "committee",
        "donors",
        "payments",
        "expenses",
        "projects",
        "gallery",
        "notices",
    ],
    USER: [],

}

export function hasPermission(role: UserRole, permission: string) {
    return PERMISSIONS[role].includes(permission)
}
