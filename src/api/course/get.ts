import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  params: z.object({
    courseId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    isFinished: z.boolean(),
  }),
} satisfies ApiSchema

export const call = Api('/courses/course', schema, { method: 'GET' })
