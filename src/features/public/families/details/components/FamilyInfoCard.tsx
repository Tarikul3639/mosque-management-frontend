import { MapPin, Mail, Phone, Calendar, Hash } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FamilyDetails } from "@/services/api/families.service"

interface FamilyInfoCardProps {
  family: FamilyDetails
}

export function FamilyInfoCard({ family }: FamilyInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>পরিবারের তথ্য</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <InfoItem
          icon={<Hash className="size-4" />}
          label="পরিবার নম্বর"
          value={family.familyNo}
        />

        <InfoItem
          icon={<Phone className="size-4" />}
          label="মোবাইল"
          value={family.phone ?? "প্রযোজ্য নয়"}
        />

        <InfoItem
          icon={<Mail className="size-4" />}
          label="ইমেইল"
          value={family.email ?? "প্রযোজ্য নয়"}
        />

        <InfoItem
          icon={<MapPin className="size-4" />}
          label="ঠিকানা"
          value={family.address}
        />

        <InfoItem
          icon={<Calendar className="size-4" />}
          label="নিবন্ধনের তারিখ"
          value={new Date(family.createdAt).toLocaleDateString("bn-BD")}
        />
      </CardContent>
    </Card>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">{label}</p>

        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
