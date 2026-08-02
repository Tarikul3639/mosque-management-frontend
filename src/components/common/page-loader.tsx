import { Logo } from "@/components/icons/Logo"

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        {/* Rotating Circle */}
        <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />

        {/* Logo */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-background">
          <Logo className="h-12 w-auto" />
        </div>
      </div>
    </div>
  )
}
