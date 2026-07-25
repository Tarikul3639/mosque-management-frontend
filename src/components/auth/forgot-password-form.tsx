"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  Loader2,
  LockKeyhole,
  Send,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import EmailInput from "@/components/auth/email-input"

import { toast } from "sonner"
import { getErrorMessage } from "@/utils/get-error-message"
import { useForgotPasswordMutation } from "@/store/api/auth.api"

import FormError from "./form-error"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schemas/auth/forgot-password.schema"

export default function ForgotPasswordForm() {
  const [formError, setFormError] = useState("")
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordSchema) {
    setFormError("")
    try {
      await forgotPassword(data).unwrap()
      toast.success("Password reset link sent successfully!")
    } catch (error) {
      toast.error(getErrorMessage(error))
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <LockKeyhole className="h-7 w-7 text-primary" />
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
          Forgot Password
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormError message={formError} />

        <EmailInput
          placeholder="admin@example.com"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full gap-2 rounded-sm text-sm"
          disabled={isLoading || isSuccess}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Reset Link
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Back */}
        <Button asChild variant="outline" className="h-10 w-full rounded-sm">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </Button>

        {/* Info */}
        <div className="flex gap-3 rounded-lg border border-primary/15 bg-primary/5 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-4 w-4 text-primary" />
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            If you don't receive the email within a few minutes, please check
            your spam folder or try again later.
          </p>
        </div>
      </form>
    </div>
  )
}
