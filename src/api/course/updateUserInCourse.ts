import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  body: z.object({
    mark: z.number(),
    isPassed: z.boolean(),
    finalFeedback: z.string().nullable(), // TODO: do not know actual type
  }),
  params: z.object({
    courseId: z.number(),
    userId: z.number(),
  }),
  reply: z.object({
    // TODO: 404 NOT FOUND
  }),
} satisfies ApiSchema
export const call = Api('/courses/course/users/user/info', schema, {
  method: 'PUT',
})
