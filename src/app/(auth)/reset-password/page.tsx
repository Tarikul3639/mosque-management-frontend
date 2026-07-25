import { Suspense } from "react"
import AuthHero from "@/components/auth/auth-hero"
import AuthQuoteCard from "@/components/auth/auth-quote-card"
import ResetPasswordForm from "@/components/auth/reset-password-form"
import Loading from "@/components/common/loading"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Create a new secure password to regain access to your Mosque Management System account.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6 lg:p-10">
        <div className="grid w-full overflow-hidden rounded-3xl border bg-background shadow-sm max-lg:max-w-md lg:grid-cols-2">
          {/* Left Side */}
          <AuthHero
            image="/images/login-hero.png"
            title={
              <>
                Create a
                <br />
                <p className="ml-10 text-primary-foreground">_New Password</p>
              </>
            }
            description="Choose a strong password to keep your account secure. Make sure it is unique and not used elsewhere."
          >
            <AuthQuoteCard
              title="Indeed, Allah loves those who repent."
              subtitle="And loves those who purify themselves."
              author="— Quran 2:222"
            />
          </AuthHero>

          {/* Right Side */}
          <section className="flex w-full items-center justify-center p-8 lg:p-14">
            <Suspense fallback={<Loading />}>
              <ResetPasswordForm />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  )
}
