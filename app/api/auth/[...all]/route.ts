import { toNextJsHandler } from "better-auth/next-js";

// uncomment below line for using drizzle
// import { auth } from "@/lib/auth"; // path to your auth file

// uncomment below line for using prisma
import { auth } from "@/lib/auth.prisma";

export const { POST, GET } = toNextJsHandler(auth);
