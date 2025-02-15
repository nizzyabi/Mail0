import { initTRPC, TRPCError } from "@trpc/server";
import { createDriver } from "@/app/api/driver";
import { connection } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { SuperJSON } from "superjson";
import { auth } from "@/lib/auth";
import { DrizzleDB } from "@/db";

export type TrpcContext = {
  request: Request;
  db: DrizzleDB;
};

const t = initTRPC.context<TrpcContext>().create({ transformer: SuperJSON });

export const router = t.router;
export const publicProcedure = t.procedure;

export const userProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: ctx.request.headers });
  if (!session || !session.connectionId)
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not logged in" });
  return next({ ctx: { ...ctx, session: { ...session, connectionId: session.connectionId } } });
});

export const mailAccessibleProcedure = userProcedure.use(async ({ ctx, next }) => {
  const { db, session } = ctx;
  const foundConnection = await db.query.connection.findFirst({
    where: and(eq(connection.userId, session.user.id), eq(connection.id, session.connectionId)),
  });
  if (!foundConnection?.accessToken || !foundConnection.refreshToken)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `The connection is not accessible, please reconnect`,
    });
  const driver = await createDriver(foundConnection.providerId, {
    auth: {
      access_token: foundConnection.accessToken,
      refresh_token: foundConnection.refreshToken,
    },
  });
  return next({ ctx: { ...ctx, driver } });
});
