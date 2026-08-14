// src/app/fonts.ts

import { Geist } from "next/font/google"
import { Noto_Sans_Bengali } from "next/font/google"

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

export const bangla = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
})
