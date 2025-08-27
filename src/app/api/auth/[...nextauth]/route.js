import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials?.token || !credentials?.user) return null;
        return {
          accessToken: credentials.token,
          ...JSON.parse(credentials.user),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.user_id,
          email: user.email,
          role: user.role,
          status: user.status,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async redirect({ url, baseUrl, token }) {
      if (token?.user?.role === "ADMIN") return baseUrl + "/admin";
      if (token?.user?.role === "ORGANIZER") return baseUrl + "/organizer";
      if (token?.user?.role === "ATTENDEE") return baseUrl + "/dashboard";
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
};
