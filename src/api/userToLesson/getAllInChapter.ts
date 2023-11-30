import {z} from 'zod'
import {Api, ApiSchema} from '../fetcher'


export const schema = {
  params: z.object({
    chapterId: z.number(),
  }),
  reply: z.array(z.object({
    id: z.number(),
    mark: z.number(),
    userId: z.number(),
    lessonId: z.number(),
    isPassed: z.boolean(),
  })),
} satisfies ApiSchema

export const call = Api('/my/chapters/chapter/lessons', schema, {method: 'GET'})
