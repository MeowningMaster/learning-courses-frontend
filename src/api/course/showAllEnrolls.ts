import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    courseId: z.number(),
    isActive: z.boolean().optional(),
  }),
  reply: z.array(
    z.object({
      id: z.number(),
      courseId: z.number(),
      userId: z.number(),
      isActive: z.boolean(),
      isApproved: z.boolean(),
    }),
  ),
} satisfies ApiSchema
export const call = Api('/courses/course/enrolls', schema, { method: 'GET' })
