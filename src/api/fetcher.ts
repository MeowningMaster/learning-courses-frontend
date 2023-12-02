import { auth } from '@/utilities/auth'
import { env } from '@/utilities/env'
import { Prettify } from '@/utilities/types/prettify'
import { z } from 'zod'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type ApiSchema<
  Body extends z.ZodType = z.ZodType,
  Params extends ParamsSchema = ParamsSchema,
  Reply extends z.ZodType = z.ZodType,
> = {
  body?: Body
  params?: Params
  reply?: Reply
}

type ApiOptions<Body extends z.ZodType, Params extends ParamsSchema> = {
  method?: Method
  params?: z.infer<Params>
  body?: z.infer<Body>
}

type ParamsPrimitive = z.ZodString | z.ZodNumber | z.ZodBoolean
type ParamsSchema = z.ZodObject<{
  [k: string]: ParamsPrimitive | z.ZodEnum<[string, ...string[]]>
}>

export async function fetchApi<
  Body extends z.ZodType,
  Params extends ParamsSchema,
  Reply extends z.ZodType,
>(
  path: string,
  schema: ApiSchema<Body, Params, Reply> = {},
  options: ApiOptions<Body, Params> = {},
): Promise<z.infer<Reply>> {
  const { method = 'POST', body, params } = options

  const url = new URL(`${env.API_BASE_URL}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }
  }

  const headers: [string, string][] = [['Content-Type', 'application/json']]

  const authData = auth.get()
  if (authData) {
    headers.push(['Authorization', `Bearer ${authData.token}`])
  }

  const reply = await fetch(url, {
    method,
    headers,
    body: body && JSON.stringify(body),
  })

  if (!reply.ok) {
    throw new Error(reply.statusText)
  }

  const replyBody = await reply.json()
  return schema.reply ? schema.reply.parse(replyBody) : replyBody
}

export function Api<
  Body extends z.ZodType,
  Params extends ParamsSchema,
  Reply extends z.ZodType,
>(
  path: string,
  schema: ApiSchema<Body, Params, Reply> = {},
  options: Prettify<Omit<ApiOptions<Body, Params>, 'body' | 'params'>> = {},
) {
  return async (
    localOptions: {
      body?: z.infer<Body>
      params?: z.infer<Params>
    } = {},
  ) => await fetchApi(path, schema, { ...options, ...localOptions })
}
