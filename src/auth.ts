// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "@/server/db"
// import GitHub from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { compare } from "bcrypt-ts"

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut
// } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt"
//   },
//   basePath: "/api/auth",
//   cookies: {
//     sessionToken: {
//       name: `next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//       },
//     },
//   },
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials")
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string }
//         })

//         if (!user || !user?.id || !user?.email) {
//           throw new Error("User not found")
//         }

//         const isValid = await compare(credentials.password as string, user.password as string)

//         if (!isValid) {
//           throw new Error("Invalid password")
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.fullName,
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub!;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id;
//       }
//       return token;
//     }
//   },
//   pages: {
//     signIn: '/login',
//     error: '/login',
//     signOut: '/login',
//   },
// }) 