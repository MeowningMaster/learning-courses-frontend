import { env } from '@/utilities/env'
import { Prettify } from '@/utilities/types/prettify'
import { z } from 'zod'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ApiSchema<
  Body extends z.ZodType = z.ZodType,
  Reply extends z.ZodType = z.ZodType,
> = {
  body?: Body
  reply?: Reply
}
type ApiOptions<Body extends z.ZodType> = {
  method?: Method
  body?: z.infer<Body>
}

export async function fetchApi<Body extends z.ZodType, Reply extends z.ZodType>(
  path: string,
  schema: ApiSchema<Body, Reply> = {},
  options: ApiOptions<Body> = {},
): Promise<z.infer<Reply>> {
  const { method = 'POST', body } = options
  const reply = await fetch(`${env.API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  })
  if (!reply.ok) {
    throw new Error(reply.statusText)
  }
  const replyBody = await reply.json()
  return schema.reply ? schema.reply.parse(replyBody) : replyBody
}

export function Api<Body extends z.ZodType, Reply extends z.ZodType>(
  path: string,
  schema: ApiSchema<Body, Reply> = {},
  options: Prettify<Omit<ApiOptions<Body>, 'body'>> = {},
) {
  return async (body?: z.infer<Body>) =>
    await fetchApi(path, schema, { ...options, body })
}
