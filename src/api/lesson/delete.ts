import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    lessonId: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/lessons/lesson', schema, { method: 'DELETE' })
