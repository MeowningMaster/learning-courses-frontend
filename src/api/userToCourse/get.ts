import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  params: z.object({
    courseId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    mark: z.number(),
    userId: z.number(),
    courseId: z.number(),
    finalFeedback: z.string().nullable(),
    isPassed: z.boolean(),
  }),
} satisfies ApiSchema

export const call = Api('/my/courses/course', schema, { method: 'GET' })
