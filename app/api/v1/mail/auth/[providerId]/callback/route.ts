import { NextRequest, NextResponse } from "next/server";
import { createDriver } from "@/app/api/driver";
import { connection } from "@/db/schema";
import { env } from "@/lib/env";
import { db } from "@/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ providerId: string }> },
) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(`${env.NEXT_PUBLIC_APP_URL}/settings/email?error=missing_params`);
  }

  const { providerId } = await params;

  const driver = await createDriver(providerId, {});

  try {
    // Exchange the authorization code for tokens
    const { tokens } = await driver.getTokens(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      console.error("Missing tokens:", tokens);
      return new NextResponse(JSON.stringify({ error: "Could not get token" }), { status: 400 });
    }

    // Get user info using the access token
    const userInfo = await driver.getUserInfo({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    if (!userInfo.email) {
      console.error("Missing email in user info:", userInfo);
      return new NextResponse(JSON.stringify({ error: 'Missing "email" in user info' }), {
        status: 400,
      });
    }

    // Store the connection in the database
    await db.insert(connection).values({
      providerId,
      id: crypto.randomUUID(),
      userId: state,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture || "",
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      scope: driver.getScope(),
      expiresAt: new Date(Date.now() + (tokens.expiry_date || 3600000)),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.redirect(new URL("/connect-emails?success=true", request.url));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }));
  }
}
