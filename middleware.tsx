import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/"];
const publicRoutes = ["/auth"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isClient = req.nextUrl.hostname.includes(
    process.env.NEXT_PUBLIC_CLIENT_DOMAIN || ""
  );
  const cookie = (await cookies()).get("refresh_token")?.value;
  if (isClient) {
    if (!path.includes("/auth") && !cookie) {
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }
    if (path.includes("/auth") && cookie) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  if (!isClient) {
    if (isProtectedRoute && !cookie) {
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }
    if (isPublicRoute && cookie && !req.nextUrl.pathname.startsWith("/")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
