import { AuthOptions } from "next-auth";
import GitHubProvide from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
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
