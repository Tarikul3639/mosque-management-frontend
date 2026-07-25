"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import EmailInput from "./email-input";
import PasswordInput from "./password-input";
import FormError from "./form-error";

import { useLoginMutation } from "@/store/api/auth.api";
import { getErrorMessage } from "@/utils/get-error-message";

import {
    loginSchema,
    type LoginSchema,
} from "@/schemas/auth/login.schema";

export default function LoginForm() {
    const router = useRouter();

    const [rememberMe, setRememberMe] = useState(true);
    const [formError, setFormError] = useState("");

    const [login, { isLoading }] = useLoginMutation();

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
    });

    const onSubmit = async (data: LoginSchema) => {
        setFormError("");

        try {
            await login({
                ...data,
            }).unwrap();

            toast.success("Login successful!", {
                description: "Redirecting to dashboard...",
            });

            router.replace("/dashboard");
        } catch (error) {
            setFormError(getErrorMessage(error));
        }
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Admin Portal
                </span>

                <h1 className="mt-5 text-3xl font-bold tracking-tight">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Sign in to access the Mosque Management Dashboard.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
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

                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    error={errors.password?.message}
                    {...register("password", {
                        onChange: () => {
                            clearErrors("password");
                            setFormError("");
                        },
                    })}
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) =>
                                setRememberMe(checked === true)
                            }
                        />

                        <Label
                            htmlFor="remember"
                            className="cursor-pointer text-sm font-normal"
                        >
                            Remember me
                        </Label>
                    </div>

                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="h-11 w-full gap-2 rounded-sm text-sm"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            <LogIn className="h-5 w-5" />
                            Sign In
                        </>
                    )}
                </Button>

                <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm text-muted-foreground">
                        or
                    </span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full rounded-sm"
                >
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Sign in with Google
                </Button>

                <p className="pt-2 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/contact"
                        className="font-medium text-primary hover:text-primary/80"
                    >
                        Contact your administrator
                    </Link>
                </p>
            </form>
        </div>
    );
}