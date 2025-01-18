import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials");
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }
                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",  
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
});
  