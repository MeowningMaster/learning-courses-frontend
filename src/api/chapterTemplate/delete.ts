import {z} from 'zod'
import {Api, ApiSchema} from '../fetcher'

export const schema = {
  params: z.object({
    chapterTemplateId: z.number(),
  }),
} satisfies ApiSchema

export const call = Api('/templates/chapters/chapter', schema, {method: 'DELETE'})
