import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "No code provided" }, { status: 400 });
  }

  try {
    // 1. Exchange "code" for access_token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch Google User Info
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleUser = await userRes.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    let user;

    // 3. If new user → create user
    if (!existingUser) {
      user = await prisma.user.create({
        data: {
          username: googleUser.name,
          email: googleUser.email,
          password: "", // no password for google users
        },
      });
    } else {
      user = existingUser;
    }

    // 4. Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // 5. Set cookie
    const response = NextResponse.redirect("http://localhost:3000/");
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Google login failed" }, { status: 500 });
  }
}
