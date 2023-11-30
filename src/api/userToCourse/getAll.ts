import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  params: z.object({
    isFinished: z.boolean(),
  }),
  reply: z.array(
    z.object({
      id: z.number(),
      mark: z.number(),
      userId: z.number(),
      courseId: z.number(),
      finalFeedback: z.string().nullable(),
      isPassed: z.boolean(),
    }),
  ),
} satisfies ApiSchema

export const call = Api('/my/courses', schema, { method: 'GET' })
