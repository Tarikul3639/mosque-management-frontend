export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 md:px-6">
      <div className="space-y-8">
        <div>
          <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
            TERMS & CONDITIONS
          </span>

          <h1 className="mt-3 text-4xl font-bold">ব্যবহারের শর্তাবলী</h1>

          <p className="mt-4 leading-7 text-muted-foreground">
            এই ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলী মেনে চলতে
            সম্মত হচ্ছেন।
          </p>
        </div>

        <div className="space-y-8 leading-8">
          <section>
            <h2 className="text-2xl font-semibold">১. ওয়েবসাইট ব্যবহার</h2>

            <p className="mt-3 text-muted-foreground">
              ওয়েবসাইটটি শুধুমাত্র তথ্য প্রদান ও মসজিদের প্রশাসনিক সেবার জন্য
              ব্যবহৃত হবে।
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">২. তথ্যের সঠিকতা</h2>

            <p className="mt-3 text-muted-foreground">
              ব্যবহারকারী প্রদত্ত তথ্য সঠিক ও হালনাগাদ হওয়া আবশ্যক।
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">৩. নিষিদ্ধ কার্যক্রম</h2>

            <p className="mt-3 text-muted-foreground">
              ওয়েবসাইটে ভুয়া তথ্য প্রদান, অবৈধ কার্যক্রম বা সিস্টেমের ক্ষতি
              করার চেষ্টা সম্পূর্ণ নিষিদ্ধ।
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">৪. দায়বদ্ধতা</h2>

            <p className="mt-3 text-muted-foreground">
              প্রযুক্তিগত সমস্যার কারণে সাময়িকভাবে সেবা বিঘ্নিত হতে পারে।
              কর্তৃপক্ষ প্রয়োজন অনুযায়ী যেকোনো সময় সেবা পরিবর্তন বা হালনাগাদ
              করার অধিকার সংরক্ষণ করে।
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
