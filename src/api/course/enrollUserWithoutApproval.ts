import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    userId: z.number(),
    courseId: z.number(),
  }),
  reply: z.object({
    // TODO: 404 NOT FOUND
  }),
} satisfies ApiSchema
export const call = Api('/courses/course/users/enroll', schema, {
  method: 'POST',
})
