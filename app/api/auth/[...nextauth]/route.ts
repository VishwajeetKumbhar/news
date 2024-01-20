
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GitHubProvide from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import { authOptions } from "./option";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }