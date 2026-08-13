// src/config/metadata.ts

import type { Metadata } from "next"

export const SITE_CONFIG = {
  name: "Mosque Management",
  title: "Mosque Management System",
  description:
    "Modern mosque management system for committee, families, donations, expenses and community.",
  keywords: [
    "Mosque",
    "Mosjid",
    "Management",
    "Donation",
    "Community",
    "Bangladesh",
  ],
  url: "https://example.com",
  locale: "en_US",
  creator: "Tarikul Islam",
  author: "Tarikul Islam",
  image: "/images/og-image.png",
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [
    {
      name: SITE_CONFIG.author,
    },
  ],
  creator: SITE_CONFIG.creator,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.title,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: SITE_CONFIG.image,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.image],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const adminMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}
