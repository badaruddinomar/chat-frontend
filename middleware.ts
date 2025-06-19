// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes are protected
const protectedRoutes = ["/chat"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  console.log(token);
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ["/chat/:path*"],
};
