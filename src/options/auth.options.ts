/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { UserType } from '@/features/auth/types/user.type';
import { api } from '@/lib/axios';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }
        try {
          const { data: response } = await api.post<{
            user: UserType;
            accessToken: string;
          }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            username: credentials.username,
            password: credentials.password,
          });

          if (response) {
            return {
              id: response.user.id,
              user: response.user,
              accessToken: response.accessToken,
            };
          }

          return null;
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message ||
              error.message ||
              'Invalid credentials',
          );
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          avatar: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    }),
  ],

  secret: process.env.NEXT_PUBLIC_JWT_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        try {
          const {
            data: { user: newUser, accessToken },
          } = await api.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
            {
              googleId: profile.sub,
              email: profile.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
              avatar: profile.picture,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );

          token.user = {
            id: newUser.id,
            email: newUser.email,
            avatar: newUser.avatar,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
          };
          token.accessToken = accessToken;
        } catch (error) {
          console.error('Google auth error:', error);
        }
      } else if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default authOptions;
