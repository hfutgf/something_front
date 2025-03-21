import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string;
      avatar?: string;
      firstName?: string;
      lastName?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    email?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
  }

  interface Profile {
    sub: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email?: string;
      avatar?: string;
      firstName?: string;
      lastName?: string;
    };
    accessToken?: string;
  }
}
