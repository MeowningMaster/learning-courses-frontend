import { z } from 'zod'
import { Api, ApiSchema } from '../../fetcher'

export const schema = {
  params: z.object({
    lessonTemplateId: z.number(),
  }),
} satisfies ApiSchema

export const call = Api('/templates/lessons/lesson', schema, {
  method: 'DELETE',
})
