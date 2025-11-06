import NextAuth, { type AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  // Dev-safe: trust incoming host to avoid NEXTAUTH_URL requirement
  trustHost: true,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        const extended = { ...(session.user || {}), id: token.sub } as Record<string, unknown> & {
          id: string;
        };
        // atribui mantendo possíveis campos já existentes
        session.user = extended as typeof session.user;
      }
      return session;
    },
  },
  // Dev-safe fallback to avoid crashes when NEXTAUTH_SECRET is missing
  secret: process.env.NEXTAUTH_SECRET ?? 'dev-secret',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
