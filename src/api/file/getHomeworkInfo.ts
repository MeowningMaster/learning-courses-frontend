import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    lessonId: z.number(),
    userId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    s3Name: z.string(),
    size: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/lessons/lesson/files/file/info', schema, {
  method: 'GET',
})
