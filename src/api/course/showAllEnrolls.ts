import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    courseId: z.number(),
  }),
  reply: z.object({
    // TODO: access denied
  }),
} satisfies ApiSchema
export const call = Api('/courses/course/enrolls', schema, { method: 'GET' })
