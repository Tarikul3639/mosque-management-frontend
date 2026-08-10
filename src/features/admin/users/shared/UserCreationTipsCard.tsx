"use client"

// src/features/user/shared/UserCreationTipsCard.tsx
import {
  Info,
  KeyRound,
  ListChecks,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UserCreationTipsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="size-5 text-primary" />
          User Guidelines
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <UserRound className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">User Information</p>

              <p className="text-xs text-muted-foreground">
                Enter the user's full name, valid email address, and phone
                number. Make sure the information is accurate and unique.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <KeyRound className="mt-0.5 size-4 shrink-0 text-chart-2" />

            <div>
              <p className="text-sm font-medium">Password Security</p>

              <p className="text-xs text-muted-foreground">
                Use a strong password containing uppercase, lowercase, numbers,
                and special characters. Encourage users to change it after their
                first login.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-chart-3" />

            <div>
              <p className="text-sm font-medium">Role & Permissions</p>

              <p className="text-xs text-muted-foreground">
                Assign the correct role carefully. Only trusted users should
                receive administrator privileges.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <ListChecks className="size-4 text-primary" />

            <p className="text-sm font-semibold">Before Creating</p>
          </div>

          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Verify the user's full name.</li>
            <li>• Confirm email and phone number.</li>
            <li>• Assign the correct role.</li>
            <li>• Use a secure password.</li>
            <li>• Upload a profile photo if available.</li>
            <li>• Review all information before submitting.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
