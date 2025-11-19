import { NextResponse } from "next/server";

export async function GET() {

  const redirectURI = process.env.GOOGLE_REDIRECT_URI!;
  
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: redirectURI,
      response_type: "code",
      scope: "email profile",
      access_type: "offline",
      prompt: "consent",
    });

  return NextResponse.redirect(url);
}
