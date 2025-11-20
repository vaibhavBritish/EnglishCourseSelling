import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login?message=please login first", req.url)
      );
    }

    try {
      // Verify JWT
      const { payload } = await jwtVerify(token, secret);

      if (!payload || !payload.isAdmin) {
        return NextResponse.redirect(
          new URL("/auth/login?message=Access denied", req.url)
        );
      }

      // Pass user info in headers
      const res = NextResponse.next();
      res.headers.set("x-user-id", String(payload.id));
      res.headers.set("x-user-email", String(payload.email));
      return res;
    } catch (error) {
      console.error("Auth verification error:", error);
      return NextResponse.redirect(
        new URL("/auth/login?message=Authentication failed", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
