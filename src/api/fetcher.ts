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
  canFail?: boolean
}

type ParamsPrimitive = z.ZodString | z.ZodNumber | z.ZodBoolean
type ParamsValue = ParamsPrimitive | z.ZodEnum<[string, ...string[]]>
type ParamsSchema = z.ZodObject<{
  [k: string]: ParamsValue | z.ZodOptional<ParamsValue>
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

  const headers: [string, string][] = []

  const authData = auth.get()
  if (authData) {
    headers.push(['Authorization', `Bearer ${authData.token}`])
  }

  let actualBody: RequestInit['body']
  if (body) {
    if (typeof body === 'object' && (body as object) instanceof FormData) {
      actualBody = body
    } else {
      actualBody = JSON.stringify(body)
      headers.push(['Content-Type', 'application/json'])
    }
  }

  const reply = await fetch(url, {
    method,
    headers,
    body: actualBody,
  })

  if (!reply.ok) {
    if (options.canFail && reply.status >= 400 && reply.status < 500) {
      return undefined
    }

    throw new Error(reply.statusText)
  }

  try {
    if (schema.reply) {
      const replyBody = await reply.json()
      return schema.reply.parse(replyBody)
    }
    if (
      reply.headers.get('Content-Type')?.includes('application/octet-stream')
    ) {
      return await reply.blob()
    }
  } catch (error) {
    if (options.canFail) {
      return undefined
    }
    throw error
  }
  return undefined
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
      canFail?: boolean
    } = {},
  ) => await fetchApi(path, schema, { ...options, ...localOptions })
}
