import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    chapterId: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/chapters/chapter', schema, { method: 'GET' })
