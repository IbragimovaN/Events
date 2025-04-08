import { User as DbUser } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}
