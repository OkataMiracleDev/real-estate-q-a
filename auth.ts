import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Define public routes that don't require authentication
      const isPublicRoute =
        nextUrl.pathname.startsWith("/signup") ||
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/auth");

      if (isLoggedIn) {
        // If user is logged in and tries to access auth pages, redirect to home
        if (isPublicRoute) {
          return Response.redirect(new URL("/", nextUrl));
        }
        // Allow access to other pages (like dashboard)
        return true;
      }

      // If user is NOT logged in
      if (!isPublicRoute) {
        // Redirect ANY unauthenticated access to protected pages to /signup
        return Response.redirect(new URL("/signup", nextUrl));
      }

      // Allow access to public routes for unauthenticated users
      return true;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;
        return { id: email, name: email.split("@")[0], email } as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
