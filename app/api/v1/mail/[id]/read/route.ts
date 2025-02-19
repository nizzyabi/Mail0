import { createDriver } from "@/app/api/driver";
import { NextRequest } from "next/server";
import { connection } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import pino from "pino";

const logger = pino();

export const POST = async (
  { headers }: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const session = await auth.api.getSession({ headers });
  if (!session) {
    logger.warn("Unauthorized: No session found");
    return new Response("Unauthorized", { status: 401 });
  }
  if (!session.connectionId) {
    logger.warn("Unauthorized: No connectionId in session");
    return new Response("Unauthorized", { status: 401 });
  }
  const [_connection] = await db
    .select()
    .from(connection)
    .where(and(eq(connection.userId, session.user.id), eq(connection.id, session.connectionId)));
  if (!_connection?.accessToken || !_connection.refreshToken) {
    logger.warn("Unauthorized: Missing tokens, require reconnect", { connection: _connection });
    return new Response("Unauthorized, reconnect", { status: 401 });
  }
  const driver = await createDriver(_connection.providerId, {
    auth: {
      access_token: _connection.accessToken,
      refresh_token: _connection.refreshToken,
    },
  });
  try {
    await driver.markAsRead(id);
    logger.info("Message marked as read", { id });
    return new Response("OK", { status: 200 });
  } catch (error: any) {
    logger.error({ error }, "Error marking message as read");
    return new Response("Internal Server Error", { status: 500 });
  }
};
