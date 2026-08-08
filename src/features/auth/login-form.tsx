"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LogIn } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { GoogleIcon } from "@/components/icons/GoogleIcon"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ROUTES } from "@/config/routes"

import EmailInput from "./email-input"
import PasswordInput from "./password-input"
import FormError from "./form-error"

import { useLoginMutation } from "@/store/api/auth.api"
import { useAppDispatch } from "@/store/hooks"
import { openFeatureDialog } from "@/store/slices/ui.slice"

import { loginSchema, type LoginSchema } from "@/schemas/auth/login.schema"
import { getErrorMessage } from "@/utils/get-error-message"

export default function LoginForm() {
  // TODO: Implement remember me functionality using cookies or local storage
  const dispatch = useAppDispatch()

  const router = useRouter()

  const [rememberMe, setRememberMe] = useState(true)
  const [formError, setFormError] = useState("")

  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    setFormError("")

    try {
      await login(data).unwrap()

      toast.success("Login successful!", {
        description: "Redirecting to dashboard...",
      })

      router.replace(ROUTES.ADMIN.DASHBOARD)
    } catch (error) {
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <div className="mx-auto w-full">
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          Admin Portal
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access the Mosque Management Dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormError message={formError} />

        <EmailInput
          placeholder="admin@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", {
            onChange: () => {
              clearErrors("email")
              setFormError("")
            },
          })}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password", {
            onChange: () => {
              clearErrors("password")
              setFormError("")
            },
          })}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />

            <Label
              htmlFor="remember"
              className="cursor-pointer text-sm font-normal"
            >
              Remember me
            </Label>
          </div>

          <Link
            href={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="h-11 w-full gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              <LogIn className="size-5" />
              Sign In
            </>
          )}
        </Button>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-10 w-full"
          onClick={() =>
            dispatch(
              openFeatureDialog({
                title: "Google Sign In",
                description:
                  "Google authentication is not available yet. It will be added in a future update.",
              })
            )
          }
        >
          <GoogleIcon className="mr-2 size-4" />
          Sign in with Google
        </Button>

        <p className="pt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.PUBLIC.CONTACT}
            className="font-medium text-primary transition-opacity hover:opacity-80"
          >
            Contact your administrator
          </Link>
        </p>
      </form>
    </div>
  )
}
