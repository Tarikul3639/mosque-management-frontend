"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Loader2,
  LockKeyhole,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import EmailInput from "@/components/auth/email-input";

import FormError from "./form-error";

import { useForgotPasswordMutation } from "@/store/api/auth.api";
import { getErrorMessage } from "@/utils/get-error-message";

import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schemas/auth/forgot-password.schema";

export default function ForgotPasswordForm() {
  const [formError, setFormError] = useState("");

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordSchema) {
    setFormError("");

    try {
      await forgotPassword(data).unwrap();

      toast.success("Password reset link sent successfully!", {
        description: "Please check your email inbox.",
      });
    } catch (error) {
      const message = getErrorMessage(error);

      toast.error(message);
      setFormError(message);
    }
  }

  return (
    <div className="mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
          <LockKeyhole className="size-7 text-primary" />
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
          Forgot Password
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter your registered email address and we&apos;ll send you a password
          reset link.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <FormError message={formError} />

        <EmailInput
          placeholder="admin@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", {
            onChange: () => {
              clearErrors("email");
              setFormError("");
            },
          })}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isLoading || isSuccess}
          className="h-11 w-full gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send Reset Link
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Back */}
        <Button
          asChild
          variant="outline"
          className="h-10 w-full"
        >
          <Link href="/login">
            <ArrowLeft className="mr-2 size-4" />
            Back to Sign In
          </Link>
        </Button>

        {/* Info */}
        <div className="flex gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="size-4 text-primary" />
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            If you don&apos;t receive the email within a few minutes, please
            check your spam folder or try again later.
          </p>
        </div>
      </form>
    </div>
  );
}