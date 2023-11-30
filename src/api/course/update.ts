import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  body: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    finalFeedback: z.string().nullable(),
    isFinished: z.boolean(),
  }),
  params: z.object({
    courseId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    isFinished: z.boolean(),
  }),
} satisfies ApiSchema
export const call = Api('/courses/course', schema, { method: 'PUT' })
