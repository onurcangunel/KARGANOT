import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';
import { loginSchema } from './validations/auth';

/**
 * NEXTAUTH EXTENDED TYPES
 * Session ve JWT'ye custom field'ler ekliyoruz
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      credits: number;
      points: number;
      university?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    credits: number;
    points: number;
    university?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    credits: number;
    points: number;
    university?: string;
  }
}

/**
 * NEXTAUTH CONFIGURATION
 */
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Prisma Adapter (Session ve Account yönetimi için)
  adapter: PrismaAdapter(prisma),

  // Session stratejisi
  session: {
    strategy: 'jwt', // JWT kullanıyoruz (stateless)
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },

  // Pages (custom login/register sayfaları)
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    newUser: '/dashboard', // Yeni kullanıcı kayıttan sonra buraya yönlendirilir
  },

  // Providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Validate input
          const { email, password } = loginSchema.parse(credentials);

          // Find user
          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true,
              image: true,
              credits: true,
              points: true,
              university: true,
              verified: true,
            },
          });

          if (!user) {
            throw new Error('Email veya şifre hatalı');
          }

          // Verify password
          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Email veya şifre hatalı');
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          });

          // Return user (password excluded)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            credits: user.credits,
            points: user.points,
            university: user.university,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],

  // Callbacks
  callbacks: {
    // JWT callback - Token'a custom field'ler ekliyoruz
    async jwt({ token, user, trigger, session }) {
      // İlk login'de user bilgilerini token'a ekle
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.credits = user.credits;
        token.points = user.points;
        token.university = user.university;
      }

      // Session update trigger (profile güncelleme vs.)
      if (trigger === 'update' && session) {
        token.name = session.user.name;
        token.email = session.user.email;
        token.image = session.user.image;
      }

      return token;
    },

    // Session callback - Client'a gönderilecek session objesini oluştur
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.credits = token.credits as number;
        session.user.points = token.points as number;
        session.user.university = token.university as string;
      }

      return session;
    },
  },

  // Events (logging, analytics)
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`);
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token?.email}`);
    },
  },

  // Debug (sadece development'ta)
  debug: process.env.NODE_ENV === 'development',
});

// Export authOptions for use in API routes
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // Validate with Zod
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error('Invalid credentials format');
        }

        const { email, password } = validatedFields.data;

        // Find user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        // Update lastLogin
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          credits: user.credits,
          points: user.points,
          university: user.university,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.credits = user.credits;
        token.points = user.points;
        token.university = user.university;
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.credits = token.credits as number;
        session.user.points = token.points as number;
        session.user.university = token.university as string;
      }

      return session;
    },
  },
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`);
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token?.email}`);
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

// Export getServerSession helper
export { getServerSession } from 'next-auth';
