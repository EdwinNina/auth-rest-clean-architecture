import { PayloadInt } from "../lib/jwt.adapter";

export interface UserAuthToken {
   token: string;
   user: {
      id: string;
      name: string;
      email: string;
   }
}

export type SignTokenFunction = (payload: PayloadInt, expiresIn?: string) => Promise<string | null>