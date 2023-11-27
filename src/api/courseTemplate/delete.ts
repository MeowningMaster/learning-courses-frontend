import {z} from 'zod'
import {Api, ApiSchema} from '../fetcher'

export const schema = {
  params: z.object({
    courseTemplateId: z.number(),
  }),
} satisfies ApiSchema

export const call = Api('/templates/courses/course', schema, {method: 'DELETE'})
