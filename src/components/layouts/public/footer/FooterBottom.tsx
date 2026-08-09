export function FooterBottom() {
  return (
    <div className="border-t border-border/60 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-center text-sm text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} নামা রাথুরা বাইতুল আমান জামে মসজিদ।
          সর্বস্বত্ব সংরক্ষিত।
        </p>

        <p>
          ডিজাইন ও উন্নয়ন করেছেন{" "}
          <a
            href="https://tarikul-islam.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4"
          >
            তরিকুল ইসলাম
          </a>
        </p>
      </div>
    </div>
  )
}