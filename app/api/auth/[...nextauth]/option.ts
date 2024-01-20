import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GitHubProvide from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [GitHubProvide({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }), GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    ],
    pages: {
        signIn: "/sign-in"
    },
    secret: process.env.NEXTAUTH_SECRET
}
