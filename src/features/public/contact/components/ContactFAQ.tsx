// src/features/public/contact/components/ContactFAQ.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "মাসিক চাঁদা কীভাবে প্রদান করবো?",
    answer:
      "মসজিদ কর্তৃপক্ষের নির্ধারিত ব্যক্তির কাছে সরাসরি অথবা অনুমোদিত মাধ্যমে মাসিক চাঁদা প্রদান করতে পারবেন।",
  },
  {
    question: "নতুন পরিবার নিবন্ধন কীভাবে করবো?",
    answer:
      "মসজিদের অফিসে যোগাযোগ করে অথবা দায়িত্বপ্রাপ্ত প্রশাসকের মাধ্যমে নতুন পরিবার নিবন্ধনের আবেদন করতে পারবেন।",
  },
  {
    question: "মসজিদে অনুদান কীভাবে প্রদান করা যাবে?",
    answer:
      "নগদ, ব্যাংক, মোবাইল ব্যাংকিং অথবা মসজিদ কর্তৃপক্ষের অনুমোদিত যেকোনো মাধ্যমে অনুদান প্রদান করা যাবে।",
  },
  {
    question: "কমিটির সদস্যদের সাথে কীভাবে যোগাযোগ করবো?",
    answer:
      "যোগাযোগ পাতায় দেওয়া ফোন নম্বর অথবা অফিসে সরাসরি এসে কমিটির সদস্যদের সাথে যোগাযোগ করতে পারবেন।",
  },
  {
    question: "মসজিদের অফিস কখন খোলা থাকে?",
    answer:
      "প্রতিদিন নির্ধারিত অফিস সময়ে মসজিদের অফিস খোলা থাকে। বিস্তারিত সময়সূচী এই পাতার অফিস সময় অংশে দেওয়া রয়েছে।",
  },
  {
    question: "ভুল তথ্য সংশোধন করতে চাই। কী করবো?",
    answer:
      "আপনার পরিবার বা ব্যক্তিগত তথ্য সংশোধনের জন্য মসজিদের প্রশাসনের সাথে যোগাযোগ করুন। প্রয়োজনীয় যাচাই শেষে তথ্য হালনাগাদ করা হবে।",
  },
]

export function ContactFAQ() {
  return (
    <section className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
      {/* Left */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
          FAQ
        </span>

        <h2 className="mt-3 text-3xl font-bold">সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>

        <p className="mt-4 leading-7 text-muted-foreground">
          মসজিদের কার্যক্রম, অনুদান, সদস্য নিবন্ধন এবং প্রশাসনিক বিষয় নিয়ে
          সবচেয়ে বেশি করা প্রশ্নগুলোর উত্তর এখানে দেওয়া হয়েছে।
        </p>
      </div>

      {/* Right */}
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="rounded-xl border bg-card px-5"
          >
            <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="pb-5 leading-7 text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
