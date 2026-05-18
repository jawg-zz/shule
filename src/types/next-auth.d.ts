declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      staffId?: string;
    } & Record<string, any>;
  }
  interface User {
    role?: string;
    staffId?: string;
  }
  export default function NextAuth(
    config: any
  ): {
    handlers: { GET: any; POST: any };
    auth: any;
    signIn: any;
    signOut: any;
  };
}

declare module "next-auth/providers/credentials" {
  const Credentials: (config: any) => any;
  export default Credentials;
}

declare module "next-auth/react" {
  import { Session } from "next-auth";
  import React from "react";

  export function signIn(provider?: string, options?: Record<string, any>): Promise<any>;
  export function signOut(options?: Record<string, any>): Promise<any>;
  export function useSession(): { data: Session | null; status: "loading" | "authenticated" | "unauthenticated" };
  export function SessionProvider(props: { children: React.ReactNode; session?: Session | null }): React.ReactNode;
}
