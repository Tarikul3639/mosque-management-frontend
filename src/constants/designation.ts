export enum Designation {
  PRESIDENT = "PRESIDENT",
  VICE_PRESIDENT = "VICE_PRESIDENT",
  SECRETARY = "SECRETARY",
  ASSISTANT_SECRETARY = "ASSISTANT_SECRETARY",
  TREASURER = "TREASURER",
  MEMBER = "MEMBER",
  IMAM = "IMAM",
  MUAZZIN = "MUAZZIN",
}

export const DESIGNATION_OPTIONS = [
  {
    label: "President",
    value: Designation.PRESIDENT,
  },
  {
    label: "Vice President",
    value: Designation.VICE_PRESIDENT,
  },
  {
    label: "Secretary",
    value: Designation.SECRETARY,
  },
  {
    label: "Assistant Secretary",
    value: Designation.ASSISTANT_SECRETARY,
  },
  {
    label: "Treasurer",
    value: Designation.TREASURER,
  },
  {
    label: "Member",
    value: Designation.MEMBER,
  },
  {
    label: "Imam",
    value: Designation.IMAM,
  },
  {
    label: "Muazzin",
    value: Designation.MUAZZIN,
  },
] as const

export const DESIGNATION_LABELS: Record<Designation, string> = {
  [Designation.PRESIDENT]: "President",
  [Designation.VICE_PRESIDENT]: "Vice President",
  [Designation.SECRETARY]: "Secretary",
  [Designation.ASSISTANT_SECRETARY]: "Assistant Secretary",
  [Designation.TREASURER]: "Treasurer",
  [Designation.MEMBER]: "Member",
  [Designation.IMAM]: "Imam",
  [Designation.MUAZZIN]: "Muazzin",
}

export function getDesignationLabel(designation: Designation): string {
  return DESIGNATION_LABELS[designation]
}
