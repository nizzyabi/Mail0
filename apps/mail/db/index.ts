import { createDbConnection } from "@mail0/db";
import { env } from "@/lib/env";

export const db = createDbConnection(env.DATABASE_URL);
