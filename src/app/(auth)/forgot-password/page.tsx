import AuthHero from "@/features/auth/auth-hero"
import AuthQuoteCard from "@/features/auth/auth-quote-card"
import ForgotPasswordForm from "@/features/auth/forgot-password-form"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Recover your Mosque Management System account by requesting a secure password reset link.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-2 sm:p-6 lg:p-10">
        <div className="grid w-full overflow-hidden rounded-xl sm:rounded-3xl border border-border bg-background shadow sm:shadow-lg lg:grid-cols-2">
          {/* Left Side */}
          <AuthHero
            image="/images/login-hero.png"
            title="Reset Your Password"
            description="Choose a strong password to keep your account secure. Make sure it is unique and not used elsewhere."
          >
            <AuthQuoteCard
              title="Indeed, Allah loves those who repent."
              subtitle="And loves those who purify themselves."
              author="— Quran 2:222"
            />
          </AuthHero>

          {/* Right Side */}
          <section className="flex w-full items-center justify-center p-5 sm:p-8 lg:p-14">
            <ForgotPasswordForm />
          </section>
        </div>
      </div>
    </main>
  )
}
