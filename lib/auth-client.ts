import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth"; // Import the auth instance as a type

const BASE_URL = process.env.BASE_URL as string;

export const authClient = createAuthClient({
  baseURL: BASE_URL, // the base url of your auth server
  plugins: [customSessionClient<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession, getSession, $fetch } = authClient;
