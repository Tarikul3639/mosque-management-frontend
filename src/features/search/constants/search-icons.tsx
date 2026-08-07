"use client"

import {
  Banknote,
  FolderKanban,
  HandCoins,
  Image,
  ReceiptText,
  Users,
  UserRoundCog,
  Clock,
} from "lucide-react"

import type { ReactNode } from "react"

export const SEARCH_ICONS: Record<string, ReactNode> = {
  USER: <UserRoundCog className="size-4" />,
  FAMILY: <Users className="size-4" />,
  DONOR: <HandCoins className="size-4" />,
  PROJECT: <FolderKanban className="size-4" />,
  PAYMENT: <Banknote className="size-4" />,
  EXPENSE: <ReceiptText className="size-4" />,
  DONATION: <HandCoins className="size-4" />,
  COMMITTEE: <UserRoundCog className="size-4" />,
  GALLERY: <Image className="size-4" />,
  PRAYER_TIME: <Clock className="size-4" />,
}
