import Image from "next/image"
import { FolderKanban } from "lucide-react"

export function ProjectBanner() {
  return (
    <section className="relative flex h-96 items-center overflow-hidden bg-primary md:h-105">
      {/* Background image */}
      <Image
        src="/images/project-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-primary to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto flex h-full items-center px-4 py-12 md:px-6 md:py-14">
          <div className="max-w-2xl">
            {/* Icon */}
            <div className="mb-5 flex size-11 items-center justify-center rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
              <FolderKanban className="size-5" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
              উন্নয়ন প্রকল্পসমূহ
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
              মসজিদের চলমান, পরিকল্পনাধীন ও সম্পন্ন উন্নয়ন প্রকল্পগুলোর বাজেট,
              ব্যয় এবং অগ্রগতির তথ্য দেখুন।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
