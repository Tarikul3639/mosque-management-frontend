// src/components/common/ContactCTA.tsx

import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/config/routes"

/* -------------------------------------------------------------------------- */
/*                                Contact CTA                                 */
/* -------------------------------------------------------------------------- */

export function ContactCTA() {
    return (
        <section className="bg-muted px-3 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-background via-primary/95 to-primary shadow-2xl">
                    {/* Glow */}
                    <div className="absolute -top-20 -left-32 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />

                    <div className="absolute -right-24 -bottom-20 h-72 w-72 rounded-full bg-chart-3/20 blur-3xl" />

                    {/* Illustration */}
                    <div className="pointer-events-none absolute bottom-10 right-10 flex items-center justify-center overflow-hidden">
                        <MessageCircle className="h-64 w-64 text-primary-foreground/10 sm:h-72 sm:w-72 md:h-80 md:w-80" />
                    </div>

                    {/* Bottom Wave */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-none">
                        <svg
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            className="relative block h-20 w-full text-primary-foreground/5"
                        >
                            <path
                                d="M0,0 C180,110 340,-30 520,45 C720,125 930,10 1200,60 L1200,120 L0,120 Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center lg:px-20 lg:py-24">
                        <div className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-5 py-2 backdrop-blur">
                            <span className="text-sm font-medium text-primary-foreground/80">
                                আমরা আপনার পাশে আছি
                            </span>
                        </div>

                        <h2 className="mt-8 max-w-3xl text-3xl leading-tight font-bold text-primary-foreground md:text-5xl">
                            কোনো প্রশ্ন বা <span className="text-chart-3">পরামর্শ আছে?</span>
                        </h2>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/80 md:text-lg">
                            যেকোনো তথ্য, মতামত কিংবা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।
                            মসজিদ পরিচালনা কমিটি সর্বদা আপনাদের সেবায় নিয়োজিত।
                        </p>

                        <Button
                            asChild
                            size="lg"
                            className="mt-10 h-12 rounded-xl bg-chart-3 px-8 text-foreground shadow-xl shadow-chart-3/30 transition-all duration-300 hover:scale-105 hover:bg-chart-3/90"
                        >
                            <Link href={ROUTES.PUBLIC.CONTACT}>
                                <Mail className="mr-2 size-5" />
                                যোগাযোগ করুন
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
