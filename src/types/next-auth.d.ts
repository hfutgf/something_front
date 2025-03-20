import 'next-auth';

import { UserType } from '@/features/auth/types/user.type';

declare module 'next-auth' {
  interface Session {
    user: UserType;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: UserType;
    accessToken?: string;
  }
}
