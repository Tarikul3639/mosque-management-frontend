import Image from "next/image";

export const FamilyBanner = () => {
    return (
        <section className="relative h-72 md:h-96 overflow-hidden">
            {/* Generated banner image */}
            <Image
                src="/images/family-banner.jpg"
                alt="Community families banner"
                fill
                priority={false}
                className="absolute inset-0 h-full w-full object-cover object-bottom"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-emerald-950/85 via-emerald-900/50 to-transparent" />

            {/* Banner text */}
            <div className="relative h-full mx-auto max-w-6xl px-4 flex flex-col justify-center">
                <span className="w-fit rounded-full border border-emerald-300/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-100">
                    পরিবারসমূহ
                </span>
                <h1 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                    আমাদের পরিবারসমূহ
                </h1>
                <p className="mt-2 max-w-xl text-sm md:text-base text-emerald-50/90">
                    আমাদের কমিউনিটির নিবন্ধিত পরিবারগুলোকে খুঁজে নিন — একসাথে যুক্ত হন, সহযোগিতা করুন এবং এগিয়ে যান।
                </p>
            </div>
        </section>
    );
};