import { Mail, MapPin, Phone } from "lucide-react"

export function FooterContact() {
  return (
    <div className="col-span-4 space-y-6 sm:col-span-1">
      <h3 className="mb-5 font-semibold">যোগাযোগ করুন</h3>

      <div className="space-y-5">
        <div className="flex gap-3">
          <MapPin className="mt-1 size-5 text-primary" />

          <a
            className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
            href="https://maps.app.goo.gl/bZ3NKsaN9CEPNt8T9"
            target="_blank"
            rel="noopener noreferrer"
          >
            নামা রাথুরা নাসুমার্কেট, কালীগঞ্জ, গাজীপুর
          </a>
        </div>

        <div className="flex gap-3">
          <Phone className="size-5 text-primary" />
          <span>+৮৮০ ১৩০৪-৫৬৭৮৯০</span>
        </div>

        <div className="flex gap-3">
          <Mail className="size-5 text-primary" />
          <span>info@masjidms.com</span>
        </div>
      </div>
    </div>
  )
}
