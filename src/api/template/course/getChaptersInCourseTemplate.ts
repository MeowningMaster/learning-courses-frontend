import { z } from 'zod'
import { Api, ApiSchema } from '../../fetcher'

export const schema = {
  params: z.object({
    courseTemplateId: z.number(),
  }),
  reply: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      number: z.number(),
      courseTemplateId: z.number(),
    }),
  ),
} satisfies ApiSchema

export const call = Api('/templates/courses/course/chapters', schema, {
  method: 'GET',
})
