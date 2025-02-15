import { z } from "zod";

export const Pagination = z.object({
  page: z.coerce.number().optional().openapi({ description: "page" }),
  pageSize: z.coerce.number().optional().openapi({ description: "pageSize" }),
});

export type Pagination = z.infer<typeof Pagination>;
