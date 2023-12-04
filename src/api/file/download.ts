import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    lessonId: z.number(),
    userId: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/lessons/lesson/files/file', schema, {
  method: 'GET',
})
