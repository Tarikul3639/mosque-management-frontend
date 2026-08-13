import type { CommitteeDesignation } from "@/services/api/committee.service"

export interface CommitteeDesignationInfo {
  label: string
  order: number
}

export const DESIGNATION_MAP: Record<
  CommitteeDesignation,
  CommitteeDesignationInfo
> = {
  PRESIDENT: {
    label: "সভাপতি",
    order: 1,
  },
  VICE_PRESIDENT: {
    label: "সহ-সভাপতি",
    order: 2,
  },
  SECRETARY: {
    label: "সাধারণ সম্পাদক",
    order: 3,
  },
  ASSISTANT_SECRETARY: {
    label: "যুগ্ম সম্পাদক",
    order: 4,
  },
  TREASURER: {
    label: "কোষাধ্যক্ষ",
    order: 5,
  },
  IMAM: {
    label: "ইমাম",
    order: 6,
  },
  MUAZZIN: {
    label: "মুয়াজ্জিন",
    order: 7,
  },
  MEMBER: {
    label: "সদস্য",
    order: 8,
  },
}
