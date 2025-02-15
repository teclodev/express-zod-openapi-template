/* eslint-disable @typescript-eslint/no-explicit-any */
import { handler } from "./lambda"

export async function api(event: any, context: any) {
  return handler(event, context)
}
