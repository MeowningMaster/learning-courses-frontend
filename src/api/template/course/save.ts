import { z } from 'zod'
import { Api, ApiSchema } from '../../fetcher'

export const schema = {
  body: z.object({
    title: z.string(),
    description: z.string(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
  }),
} satisfies ApiSchema

export const call = Api('/templates/courses', schema, { method: 'POST' })
