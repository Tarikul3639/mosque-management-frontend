import { NextRequest, NextResponse } from "next/server"

const AUTH_COOKIE = "access_token"

const AUTH_PAGES = ["/login", "/forgot-password", "/reset-password"]

const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const hasToken = request.cookies.has(AUTH_COOKIE)

  // Logged in user -> login page block
  if (hasToken && AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Not logged in -> protect admin routes
  if (!hasToken && !AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/families/:path*",
    "/donors/:path*",
    "/donations/:path*",
    "/expenses/:path*",
    "/committee/:path*",
    "/gallery/:path*",
    "/projects/:path*",
    "/login",
    "/forgot-password",
    "/reset-password",
  ],
}
export default proxy
