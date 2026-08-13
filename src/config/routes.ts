// src/config/routes.ts

export const ROUTES = {
  // ======================================================
  // Public
  // ======================================================
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",

    COMMITTEE: {
      INDEX: "/committee",
      DETAIL: (id: string) => `/committee/${id}`,
    },

    FAMILIES: {
      INDEX: "/families",
      DETAIL: (id: string) => `/families/${id}`,
    },

    DONATIONS: {
      INDEX: "/donations",
    },

    PROJECTS: {
      INDEX: "/projects",
      DETAIL: (slug: string) => `/projects/${slug}`,
    },

    GALLERY: {
      INDEX: "/gallery",
      ALBUM: (slug: string) => `/gallery/${slug}`,
    },

    NOTICES: {
      INDEX: "/notices",
      DETAIL: (slug: string) => `/notices/${slug}`,
    },

    PRAYER_TIMES: "/prayer-times",

    PRIVACY_POLICY: "/privacy-policy",
    TERMS: "/terms",
  },

  // ======================================================
  // Authentication
  // ======================================================
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_EMAIL: "/verify-email",
  },

  // ======================================================
  // Dashboard (Admin)
  // ======================================================
  ADMIN: {
    ROOT: "/admin",

    DASHBOARD: "/admin/dashboard",

    PROFILE: "/admin/profile",

    SETTINGS: "/admin/settings",

    SEARCH: "/admin/search",

    USERS: {
      INDEX: "/admin/users",
      CREATE: "/admin/users/create",
      DETAIL: (id: string) => `/admin/users/${id}`,
      EDIT: (id: string) => `/admin/users/${id}/edit`,
    },

    FAMILIES: {
      INDEX: "/admin/families",
      CREATE: "/admin/families/create",
      DETAIL: (id: string) => `/admin/families/${id}`,
      EDIT: (id: string) => `/admin/families/${id}/edit`,
    },

    COMMITTEE: {
      INDEX: "/admin/committee",
      CREATE: "/admin/committee/create",
      DETAIL: (id: string) => `/admin/committee/${id}`,
      EDIT: (id: string) => `/admin/committee/${id}/edit`,
    },

    DONORS: {
      INDEX: "/admin/donors",
      CREATE: "/admin/donors/create",
      DETAIL: (id: string) => `/admin/donors/${id}`,
      EDIT: (id: string) => `/admin/donors/${id}/edit`,
    },

    PAYMENTS: {
      INDEX: "/admin/payments",
      CREATE: "/admin/payments/create",
      DETAIL: (id: string) => `/admin/payments/${id}`,
      EDIT: (id: string) => `/admin/payments/${id}/edit`,
    },

    EXPENSES: {
      INDEX: "/admin/expenses",
      CREATE: "/admin/expenses/create",
      DETAIL: (id: string) => `/admin/expenses/${id}`,
      EDIT: (id: string) => `/admin/expenses/${id}/edit`,
    },

    DONATIONS: {
      INDEX: "/admin/donations",
      CREATE: "/admin/donations/create",
      DETAIL: (id: string) => `/admin/donations/${id}`,
      EDIT: (id: string) => `/admin/donations/${id}/edit`,
    },

    PROJECTS: {
      INDEX: "/admin/projects",
      CREATE: "/admin/projects/create",
      DETAIL: (id: string) => `/admin/projects/${id}`,
      EDIT: (id: string) => `/admin/projects/${id}/edit`,
    },

    GALLERY: {
      INDEX: "/admin/gallery",
      CREATE: "/admin/gallery/create",
      DETAIL: (id: string) => `/admin/gallery/${id}`,
      EDIT: (id: string) => `/admin/gallery/${id}/edit`,
    },

    NOTICES: {
      INDEX: "/admin/notices",
      CREATE: "/admin/notices/create",
      DETAIL: (id: string) => `/admin/notices/${id}`,
      EDIT: (id: string) => `/admin/notices/${id}/edit`,
    },
  },
} as const
