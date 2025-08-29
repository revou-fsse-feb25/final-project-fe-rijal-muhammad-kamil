import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    user: {
      user_id: string;
      email: string;
      role: string;
      status?: string;
    };
  }

  interface JWT {
    access_token?: string;
    user?: {
      user_id: string;
      email: string;
      role: string;
      status?: string;
    };
  }
}
