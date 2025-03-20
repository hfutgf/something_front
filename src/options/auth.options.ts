/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { UserType } from '@/features/auth/types/user.type';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'Your username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }
        try {
          const { data: response } = await axios.post<{
            user: UserType;
            accessToken: string;
          }>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );

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
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, user, account, profile }: any) {
      if (account && profile) {
        try {
          const {
            data: { user: newUser, accessToken },
          } = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google-auth`,
            {
              googleId: profile.sub,
              email: profile.email,
              firstName: profile.firstName,
              lastName: profile.lastName,
              avatar: profile.avatar,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );

          token.user = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            avatar: newUser.avatar,
          };
          token.accessToken = accessToken;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {}
      } else if (user) {
        token.user = user.user;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user = token.user.user as UserType;
      session.accessToken = token.user.accessToken as string;
      return session;
    },
  },
};

export default authOptions;
