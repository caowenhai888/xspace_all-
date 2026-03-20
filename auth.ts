import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  secret: process.env.AUTH_SECRET || 'fallback-secret-for-dev-only',
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize attempt:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        const email = (credentials.email as string).trim();
        const password = (credentials.password as string).trim();

        // Hardcoded credentials as requested
        if (email === 'admin@xspark.ai' && password === 'admin123') {
          console.log('Login successful for:', email);
          return {
            id: '1',
            name: '管理员',
            email: 'admin@xspark.ai',
            image: 'https://picsum.photos/seed/admin/200/200'
          };
        }

        console.log('Invalid credentials for:', email);
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname === '/admin/login';

      if (isOnAdmin && !isOnLogin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
});
