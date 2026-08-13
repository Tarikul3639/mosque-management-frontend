"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"

import { useLogoutMutation } from "@/store/api/auth.api"
import { ROUTES } from "@/config/routes"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface LogoutButtonProps {
  isOpen?: boolean
}

export function LogoutButton({ isOpen = false }: LogoutButtonProps) {
  const [open, setOpen] = useState(false)
  const [logout, { isLoading }] = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap()
      setOpen(false)
      router.push(ROUTES.PUBLIC.HOME)
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              className="flex h-10 w-full items-center justify-start rounded-md px-3 text-sidebar-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                <LogOut className="h-5 w-5" />
              </div>

              <div
                className={[
                  "grid min-w-0 transition-[grid-template-columns,opacity] duration-300 ease-in-out",
                  isOpen
                    ? "grid-cols-[1fr] opacity-100"
                    : "grid-cols-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden pl-3 text-left">
                  <span className="text-base whitespace-nowrap">Logout</span>
                </div>
              </div>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>

        {!isOpen && (
          <TooltipContent side="right" sideOffset={10}>
            Logout
          </TooltipContent>
        )}
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to logout of your account. You will need to login
            again to access the dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleLogout()
            }}
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
