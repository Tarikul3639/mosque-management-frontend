import Image from "next/image"
import { BookOpenCheck, HeartHandshake, MoonStar } from "lucide-react"

import { StarPattern } from "@/components/icons/StarPattern"

/* ------------------------------ Features Data ------------------------------ */
const FEATURES = [
  {
    icon: BookOpenCheck,
    title: "কুরআন শিক্ষা কেন্দ্র",
    description:
      "শিশু ও বয়স্কদের জন্য কুরআন তিলাওয়াত, হিফজ ও তাজবিদ শিক্ষার ব্যবস্থা। অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে প্রতিদিন ক্লাস পরিচালিত হয়।",
  },
  {
    icon: MoonStar,
    title: "দৈনিক জামাত ও জুমআ",
    description:
      "পাঁচ ওয়াক্ত নামাজ, জুমআ এবং তারাবিহসহ সকল জামাত নিয়মিত অনুষ্ঠিত হয়। মুসল্লিদের সুবিধার্থে মসজিদ সবসময় পরিচ্ছন্ন রাখা হয়।",
  },
  {
    icon: HeartHandshake,
    title: "সমাজ সেবা কার্যক্রম",
    description:
      "দরিদ্র পরিবারের মাঝে খাদ্য সহায়তা, এতিম শিক্ষা বৃত্তি এবং দাফন-কাফনের ব্যবস্থাসহ নানা সামাজিক সেবা পরিচালিত হয়।",
  },
]

/* -------------------------------- Component -------------------------------- */
export function MosqueActivities() {
  return (
    <section className="relative overflow-hidden bg-muted py-14 md:py-20">
      {/* Subtle Islamic pattern background (image এর texture এর মতো) */}
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full text-foreground/4" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left: 2 vertical images ---------------- */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative h-64 overflow-hidden rounded-lg shadow-lg sm:h-80 md:h-104">
              <Image
                src="/images/mosque-prayer-1.jpg"
                alt="মসজিদে নামাজ আদায়রত মুসল্লি"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 2nd image — slight offset for editorial look */}
            <div className="relative mt-10 h-64 overflow-hidden rounded-lg shadow-lg sm:h-80 md:h-104">
              <Image
                src="/images/mosque-prayer-2.jpg"
                alt="কুরআন তিলাওয়াতরত মুসল্লি"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* ---------------- Right: feature list ---------------- */}
          <div className="space-y-8 md:space-y-10">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group flex items-start gap-4 sm:gap-5"
              >
                {/* Circular icon badge (image এর orange circle এর মতো) */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-chart-3/30 transition-transform group-hover:scale-110 sm:size-14">
                  <Icon className="size-5 sm:size-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
