import { connectionsRouter } from "./routers/connections";
import { authRouter } from "./routers/auth";
import { mailRouter } from "./routers/mail";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  mail: mailRouter,
  connections: connectionsRouter,
});

export type AppRouter = typeof appRouter;
