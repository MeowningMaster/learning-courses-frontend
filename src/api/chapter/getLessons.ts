import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    chapterId: z.number(),
  }),
  reply: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      number: z.string(),
      maxMark: z.number(),
      successMark: z.number(),
      chapterId: z.number(),
      courseId: z.number(),
      isFinished: z.boolean(),
    }),
  ),
} satisfies ApiSchema
export const call = Api('/chapters/chapter/lessons', schema, { method: 'GET' })
