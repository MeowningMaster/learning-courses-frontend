import { z } from 'zod'
import { Api, ApiSchema } from '../../fetcher'

// TODO: replay
export const schema = {
  params: z.object({
    chapterTemplateId: z.number(),
  }),
  reply: z.object({}),
} satisfies ApiSchema

export const call = Api('/templates/chapters/chapter/lessons', schema, {
  method: 'GET',
})
