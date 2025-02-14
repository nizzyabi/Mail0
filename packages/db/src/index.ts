import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

export const createDbConnection = (databaseUrl: string) => {
  const conn = globalForDb.conn ?? postgres(databaseUrl);
  if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

  return drizzle(conn, { schema });
};

export type Database = ReturnType<typeof createDbConnection>;
