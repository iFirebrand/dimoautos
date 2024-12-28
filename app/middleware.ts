import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("user"); // Example cookie check
  const url = req.nextUrl.clone();

  if (!isAuthenticated && url.pathname.startsWith("/protected")) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
