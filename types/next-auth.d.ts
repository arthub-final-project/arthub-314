/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number | string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }

  interface User {
    id: number;
  }
  interface JWT {
    id: number | string;
    role?: string;
  }
}
