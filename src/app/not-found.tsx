import Image from "next/image";
import Link from "next/link";
import { Home, Compass, BookOpen, ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7]">
            {/* Background Mosque */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    src="/images/404-mosque.webp"
                    alt=""
                    fill
                    priority
                    className="object-cover object-right"
                />
            </div>
            {/* Blur effect left to right */}
            <div
                className="absolute inset-0 backdrop-blur-2xl mask-[linear-gradient(to_right,black_0%,black_45%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_45%,transparent_100%)]"
            />

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12">
                {/* Left: content */}
                <div className="flex w-full max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
                    <h1 className="text-[7rem] font-extrabold leading-none tracking-tight text-[#1F4D3A] sm:text-[8.5rem]">
                        404
                    </h1>

                    <h2 className="mt-2 text-3xl font-bold text-[#12291F] sm:text-4xl">
                        Page Not Found
                    </h2>

                    {/* divider with compass mark */}
                    <div className="my-6 flex items-center gap-3 text-[#2F6B4F]">
                        <span className="h-px w-14 bg-[#2F6B4F]/40" />
                        <Compass className="h-4 w-4" strokeWidth={2} />
                        <span className="h-px w-14 bg-[#2F6B4F]/40" />
                    </div>

                    <p className="max-w-sm text-base text-[#5B6B63] sm:text-lg">
                        The page you are looking for doesn&apos;t exist or has been
                        moved.
                    </p>

                    <Link
                        href="/"
                        className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-[#1F4D3A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#173B2C] sm:text-base"
                    >
                        <Home className="h-4 w-4" strokeWidth={2.25} />
                        Back to Dashboard
                    </Link>

                    {/* quote card */}
                    <div className="mt-10 w-full max-w-md rounded-lg border border-[#1F4D3A]/10 bg-white/70 p-6 text-left shadow-sm backdrop-blur-sm">
                        <BookOpen className="mb-3 h-5 w-5 text-[#2F6B4F]" strokeWidth={2} />
                        <p className="text-[15px] leading-relaxed text-[#2A362F]">
                            &ldquo;And do not lose hope in the mercy of Allah.&rdquo;
                            Indeed, no one despairs of relief from Allah except the
                            disbelieving people.
                        </p>
                        <p className="mt-3 text-sm font-medium text-[#5B6B63]">
                            — Surah Yusuf (12:87)
                        </p>
                    </div>
                </div>

                {/* Right: Badge */}
                <div className="absolute bottom-10 right-8 z-20">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3 rounded-xl bg-[#1F4D3A] px-5 py-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <BookOpen className="h-5 w-5 shrink-0" strokeWidth={2} />

                        <span className="text-sm leading-tight">
                            Let&apos;s find
                            <br />
                            the right path
                        </span>

                        <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            strokeWidth={2.5}
                        />
                    </Link>
                </div>
            </div>
        </main>
    );
}