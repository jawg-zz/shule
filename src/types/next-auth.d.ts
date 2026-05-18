import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      staffId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    staffId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    staffId?: string;
  }
}
