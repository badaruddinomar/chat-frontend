import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/chat"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  console.log("🍪 All cookies:", request.cookies.getAll());
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*"],
};
