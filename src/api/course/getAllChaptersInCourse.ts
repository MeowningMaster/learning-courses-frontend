import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    courseId: z.number(),
  }),
  reply: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      number: z.number(),
      courseId: z.number(),
      isFinished: z.boolean(),
    }),
  ),
} satisfies ApiSchema

export const call = Api('/courses/course/chapters', schema, {
  method: 'GET',
})
