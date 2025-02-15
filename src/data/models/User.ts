import { z } from "zod";

export const UserResponse = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export type UserModel = z.infer<typeof UserResponse>;
