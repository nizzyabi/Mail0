import { router, userProcedure } from "../trpc";
import { connection, user } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const connectionsRouter = router({
  getAllConnections: userProcedure.query(async ({ ctx: { db, session } }) => {
    const connections = await db.query.connection.findMany({
      where: eq(connection.userId, session.user.id),
      columns: {
        id: true,
        email: true,
        name: true,
        providerId: true,
        picture: true,
        createdAt: true,
      },
    });
    return { connections };
  }),

  deleteConnection: userProcedure
    .input(
      z.object({
        connectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input: { connectionId } }) => {
      const found = await db.query.connection.findFirst({
        where: and(eq(connection.id, connectionId), eq(connection.userId, session.user.id)),
      });
      if (!found) throw new TRPCError({ code: "NOT_FOUND", message: "Connection not found" });
      await db
        .delete(connection)
        .where(and(eq(connection.id, connectionId), eq(connection.userId, session.user.id)));
      return { success: true };
    }),

  setDefaultConnection: userProcedure
    .input(
      z.object({
        connectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input: { connectionId } }) => {
      const found = await db.query.connection.findFirst({
        where: and(eq(connection.id, connectionId), eq(connection.userId, session.user.id)),
      });
      if (!found) throw new TRPCError({ code: "NOT_FOUND", message: "Connection not found" });
      await db
        .update(user)
        .set({ defaultConnectionId: connectionId })
        .where(eq(user.id, session.user.id));
      return { success: true };
    }),
});
