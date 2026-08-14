// src/features/public/contact/components/ContactMap.tsx

export function ContactMap() {
  return (
    <section className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase md:text-xs">
            LOCATION
          </span>

          <h2 className="mt-3 text-2xl font-bold md:mt-4 md:text-3xl lg:text-4xl">
            আমাদের অবস্থান
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
            নিচের মানচিত্রে মসজিদের সঠিক অবস্থান দেখতে পারবেন। Google Maps-এর
            মাধ্যমে খুব সহজেই এখানে পৌঁছানোর দিকনির্দেশনা পাওয়া যাবে।
          </p>
        </div>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full justify-center rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground sm:w-fit"
        >
          Google Maps-এ খুলুন
        </a>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl border">
        <iframe
          title="Mosque Location"
          src="https://www.google.com/maps?q=23.9926,90.4145&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-70 w-full border-0 sm:h-87.5 md:h-125 lg:h-150"
        />
      </div>
    </section>
  )
}
