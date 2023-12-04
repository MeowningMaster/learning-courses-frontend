import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  params: z.object({
    isFinished: z.optional(z.boolean()),
  }),
  reply: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      isFinished: z.boolean(),
    }),
  ),
} satisfies ApiSchema

export const call = Api('/my/courses', schema, { method: 'GET' })
