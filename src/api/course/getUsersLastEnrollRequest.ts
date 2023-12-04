import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  params: z.object({
    userId: z.number(),
    courseId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    courseId: z.number(),
    userId: z.number(),
    isActive: z.boolean(),
    isApproved: z.boolean(),
  }),
} satisfies ApiSchema

export const call = Api('/courses/course/users/enrolls/enroll', schema, {
  method: 'GET',
})
