import { router, userProcedure } from "../trpc";

export const authRouter = router({
  getSession: userProcedure.query(({ ctx }) => ctx.session),
});
