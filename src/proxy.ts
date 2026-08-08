import { NextRequest, NextResponse } from "next/server"
import { ROUTES } from "@/config/routes"

const AUTH_COOKIE = "access_token"

const AUTH_PAGES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
  ROUTES.AUTH.VERIFY_EMAIL,
]

const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const hasToken = request.cookies.has(AUTH_COOKIE)

  // Logged in user -> login page block
  if (hasToken && AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN.DASHBOARD, request.url))
  }

  // Not logged in -> protect admin routes
  if (!hasToken && pathname.startsWith(ROUTES.ADMIN.ROOT)) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export default proxy
