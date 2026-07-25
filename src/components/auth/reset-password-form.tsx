"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Loader2, LockKeyhole, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import PasswordInput from "./password-input"
import FormError from "./form-error"

import { Button } from "@/components/ui/button"
import { useResetPasswordMutation } from "@/store/api/auth.api"
import { getErrorMessage } from "@/utils/get-error-message"

import {
    resetPasswordSchema,
    type ResetPasswordSchema,
} from "@/schemas/auth/reset-password.schema"

export default function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const [formError, setFormError] = useState("")

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: ResetPasswordSchema) => {
        setFormError("")

        if (!token) {
            setFormError("Invalid or missing reset token.")
            return
        }

        try {
            await resetPassword({
                token,
                newPassword: data.password,
            }).unwrap()

            toast.success("Password reset successfully!")

            router.push("/login")
        } catch (error) {
            setFormError(getErrorMessage(error))
        }
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <LockKeyhole className="h-7 w-7 text-primary" />
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight">
                    Reset Password
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Enter your new password below.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormError message={formError} />

                <PasswordInput
                    label="New Password"
                    placeholder="Enter new password"
                    error={errors.password?.message}
                    {...register("password", {
                        onChange: () => {
                            clearErrors("password")
                            setFormError("")
                        },
                    })}
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                        onChange: () => {
                            clearErrors("confirmPassword")
                            setFormError("")
                        },
                    })}
                />

                <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="h-11 w-full rounded-sm"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </Button>

                <Button asChild variant="outline" className="h-10 w-full rounded-sm">
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Link>
                </Button>

                <div className="flex gap-3 rounded-lg border border-primary/15 bg-primary/5 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                        Use at least 8 characters with uppercase, lowercase, numbers, and
                        symbols for a stronger password.
                    </p>
                </div>
            </form>
        </div>
    )
}
