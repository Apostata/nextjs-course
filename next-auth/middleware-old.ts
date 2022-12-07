import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("next-auth.session-token");
  const isAuthenticated = !!authCookie?.value
  const {pathname} = req.nextUrl;

  if (pathname.startsWith("/profile")) {
    if (!isAuthenticated) {
      req.nextUrl.pathname = "/auth";
      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
}