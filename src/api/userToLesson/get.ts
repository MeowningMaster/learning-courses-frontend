import {z} from 'zod'
import {Api, ApiSchema} from '../fetcher'


export const schema = {
  params: z.object({
    lessonId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    mark: z.number(),
    userId: z.number(),
    lessonId: z.number(),
    isPassed: z.boolean(),
  }),
} satisfies ApiSchema

export const call = Api('/my/lessons/lesson', schema, {method: 'GET'})
