import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if the user is authenticated
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Specify which routes should be protected
export const config = {
  matcher: [
    // Protect these routes
    "/user-profile/:path*",
    "/event-profile/:path*",
    "/create-event/:path*",
    "/dashboard/:path*",
    // Add more protected routes as needed
  ],
};