import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    token: string;
    id: string;
    role: string;
    name: string;
  }

  interface User {
    token: string;
    user: {
      id: string;
      role: string;
      fullName: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    id: string;
    role: string;
    name: string;
  }
}
