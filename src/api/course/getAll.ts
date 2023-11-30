import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  reply: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      isFinished: z.boolean(),
    }),
  ),
} satisfies ApiSchema

export const call = Api('/courses', schema, { method: 'GET' })
