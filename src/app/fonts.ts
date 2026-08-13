// src/app/fonts.ts

import { Geist } from "next/font/google"
import { Hind_Siliguri } from "next/font/google"

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

export const bangla = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
})
