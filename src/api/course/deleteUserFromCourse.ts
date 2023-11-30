import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    courseId: z.number(),
    userId: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/courses/course/users/user', schema, {
  method: 'DELETE',
})
