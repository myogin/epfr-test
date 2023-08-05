import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: srring;
    user: {
      id: string;
      role: string;
      fullName: string;
    };
  }
}
