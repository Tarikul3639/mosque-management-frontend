import { HADITH, HADITH_TRANSLATION, HADITH_REFERENCE } from "../constants"
import { Lantern } from "@/components/icons/Lantern"
import { StarPattern } from "@/components/icons/StarPattern"

/* ------------------------------- Main banner ------------------------------ */
export function HadithBanner() {
  return (
    <section className="relative bg-transparent px-3 sm:px-4 lg:px-12">
      {/* Professional Header */}
      <div className="bg-transparent pt-8 pb-6 lg:hidden">
        <div className="flex items-end justify-between">
          {/* Left: Direct & Simple Title */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              হাদিসের আলোকে
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              প্রতিদিনের শিক্ষা ও প্রেরণা
            </p>
          </div>

          {/* Right: Minimal Label */}
          <span className="hidden text-xs text-slate-400 sm:inline dark:text-slate-500">
            দৈনিক নির্দেশনা
          </span>
        </div>
      </div>

      {/* 
        Main banner container 
        - Large screens: Negative top margin (`lg:-mt-[50px]`)
      */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0c4a3b] via-[#08382c] to-[#04241c] shadow-2xl lg:-mt-20">
        {/* Decorative Star Patterns */}
        <StarPattern className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 text-amber-300/10" />
        <StarPattern className="pointer-events-none absolute right-20 -bottom-16 h-44 w-44 text-amber-300/10" />

        <div className="relative flex flex-col items-center gap-5 px-5 py-6 md:flex-row md:gap-8 md:px-10 md:py-8">
          {/* Lantern (left) */}
          <div className="shrink-0">
            <Lantern />
          </div>

          {/* Hadith text (center) */}
          <div className="flex-1 space-y-3 text-center">
            {/* Arabic Hadith */}
            <p
              dir="rtl"
              lang="ar"
              style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              className="text-xl leading-relaxed font-semibold text-amber-300 drop-shadow-sm md:text-2xl md:leading-loose"
            >
              {HADITH}
            </p>

            {/* Translation */}
            <p className="mx-auto max-w-3xl text-xs leading-relaxed font-normal text-emerald-50/90 sm:text-sm">
              {HADITH_TRANSLATION}
            </p>

            {/* Reference Badge */}
            <div className="pt-1">
              <span className="inline-block rounded-full border border-amber-500/15 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-medium tracking-wide text-amber-200/90 sm:text-xs">
                {HADITH_REFERENCE}
              </span>
            </div>
          </div>

          {/* Right spacer for symmetrical centering on desktop */}
          <div className="hidden w-20 shrink-0 md:block" />
        </div>
      </div>
    </section>
  )
}
