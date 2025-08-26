import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user: {
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      image?: string;
    };
  }
}