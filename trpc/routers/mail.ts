import { mailAccessibleProcedure, router } from "../trpc";
import { z } from "zod";

export const mailRouter = router({
  getMessages: mailAccessibleProcedure
    .input(
      z.object({
        folder: z.string(),
        q: z.string().optional(),
        maxResults: z.number().optional(),
        labelIds: z.string().array().min(1).optional(),
      }),
    )
    .query(async ({ ctx: { driver }, input }) => ({
      messages: await driver.list(input.folder, input.q, input.maxResults, input.labelIds),
    })),

  getSingleMessage: mailAccessibleProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx: { driver }, input }) => ({
      message: await driver.get(input.id),
    })),

  getTotalCount: mailAccessibleProcedure.query(async ({ ctx: { driver } }) => ({
    count: await driver.count(),
  })),

  markAsRead: mailAccessibleProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { driver }, input: { id } }) => {
      await driver.markAsRead(id);
      return { success: true };
    }),
});
