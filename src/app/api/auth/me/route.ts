import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  email: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JWTPayload;

    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      },
    });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}