import type { Metadata } from "next";

import LoginForm from "@/components/auth/login-form";
import AuthHero from "@/components/auth/auth-hero";
import AuthQuoteCard from "@/components/auth/auth-quote-card";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to the Mosque Management System to securely access the administration dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6 lg:p-10">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-background shadow-lg lg:grid-cols-2">
          {/* Left */}
          <AuthHero
            image="/images/login-hero.png"
            title={
              <>
                Manage Your Mosque
                <br />
                Smartly &amp; Efficiently
              </>
            }
            description="A complete solution to manage members, donations, expenses, events, and more."
          >
            <AuthQuoteCard
              title="And whoever relies upon Allah —"
              subtitle={
                <>
                  then He is sufficient
                  <br />
                  for him.
                </>
              }
              author="— Quran 65:3"
            />
          </AuthHero>

          {/* Right */}
          <section className="flex items-center justify-center p-8 sm:p-10 lg:p-14">
            <LoginForm />
          </section>
        </div>
      </div>
    </main>
  );
}