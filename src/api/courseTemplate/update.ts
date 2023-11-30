import {z} from 'zod'
import {Api, ApiSchema} from '../fetcher'

// TODO: do not know the replay type because back-end response is bad request 400
export const schema = {
  body: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string()
  }),
  params: z.object({
    courseTemplateId: z.number(),
  }),
} satisfies ApiSchema

export const call = Api('/templates/courses/course', schema, {method: 'PUT'})
