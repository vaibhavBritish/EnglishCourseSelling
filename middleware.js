import { NextResponse } from "next/server";


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
      const verifyUrl = new URL("/api/auth/me", req.url);
      const verifyRes = await fetch(verifyUrl, {
        headers: {
          Cookie: `token=${token}`,
        },
      });

      const { user } = await verifyRes.json();

      if (!user || !user.isAdmin) {
        return NextResponse.redirect(
          new URL("/auth/login?message=Access denied", req.url)
        );
      }

      const response = NextResponse.next();
      response.headers.set("x-user-id", user.id);
      response.headers.set("x-user-email", user.email);
      return response;
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