import Image from "next/image"
import { ReceiptText } from "lucide-react"

export function ExpenseBanner() {
  return (
    <section className="relative isolate overflow-hidden border-b h-96 md:h-105">
      {/* Background Image */}
      <Image
        src="/images/expense-banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/95 to-transparent" />

      {/* Content */}
      <div className="container h-full flex items-center mx-auto px-4 py-14 md:px-6 md:py-20">
        <div className="max-w-3xl">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur">
            <ReceiptText className="size-7" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
            মসজিদের ব্যয়ের তালিকা
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/85 md:text-lg">
            মসজিদের সকল ব্যয়ের তথ্য স্বচ্ছভাবে প্রকাশ করা হয়েছে। কোন খাতে কত
            টাকা ব্যয় হয়েছে, ব্যয়ের তারিখ এবং বিস্তারিত তথ্য এখান থেকে সহজেই
            দেখতে পারবেন।
          </p>
        </div>
      </div>
    </section>
  )
}
