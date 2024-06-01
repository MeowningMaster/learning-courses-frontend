import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    lessonId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    number: z.number(),
    maxMark: z.number(),
    successMark: z.number(),
    chapterId: z.number(),
    courseId: z.number(),
    isFinished: z.boolean(),
  }),
} satisfies ApiSchema
export const call = Api('/lessons/lesson', schema, { method: 'GET' })
