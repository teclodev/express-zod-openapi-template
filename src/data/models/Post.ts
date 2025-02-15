import { z } from "zod"

export const PostResponse = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string()
})

export type PostModel = z.infer<typeof PostResponse>
