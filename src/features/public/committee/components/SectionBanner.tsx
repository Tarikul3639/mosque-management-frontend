import Image from "next/image"

/* ------------------------ Gold mosque arch icon ------------------------ */
function MosqueArchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Pointed arch (mihrab/dome shape) */}
      <path d="M7.5 20v-8c0-3 2-5.5 4.5-7 2.5 1.5 4.5 4 4.5 7v8" />
      {/* Inner arch line */}
      <path d="M10 20v-6c0-1.5.8-2.8 2-3.8 1.2 1 2 2.3 2 3.8v6" />
      {/* Base line */}
      <path d="M5.5 20h13" />
      {/* Finial dot */}
      <circle cx="12" cy="3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ------------------------------ Props ------------------------------ */
interface SectionBannerProps {
  title: string
  description?: string
  image?: string
}

/* --------------------------- Section Banner --------------------------- */
export function SectionBanner({
  title,
  description,
  image = "/images/mosque-hero.jpg",
}: SectionBannerProps) {
  return (
    <section className="relative flex h-72 items-center justify-center overflow-hidden bg-primary md:h-96">
      {/* Background mosque image (duotone effect) */}
      <Image
        src={image}
        alt=""
        fill
        priority={false}
        className="object-cover opacity-20"
      />
      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/50 via-primary/30 to-primary/50" />

      {/* Content */}
      <div className="relative px-4 py-14 text-center sm:px-6 md:py-16">
        {/* -------- Decorative gold divider -------- */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          {/* Left line */}
          <span className="h-px w-14 bg-linear-to-l from-chart-3 to-transparent sm:w-24" />
          {/* Left diamond */}
          <span className="size-1.5 rotate-45 bg-chart-3" />

          {/* Mosque icon */}
          <MosqueArchIcon className="h-8 w-8 text-chart-3 sm:h-9 sm:w-9" />

          {/* Right diamond */}
          <span className="size-1.5 rotate-45 bg-chart-3" />
          {/* Right line */}
          <span className="h-px w-14 bg-linear-to-r from-chart-3 to-transparent sm:w-24" />
        </div>

        {/* -------- Title -------- */}
        <h2 className="mt-4 text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>

        {/* -------- Description -------- */}
        {description && (
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-primary-foreground/80 sm:text-base sm:leading-8">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
