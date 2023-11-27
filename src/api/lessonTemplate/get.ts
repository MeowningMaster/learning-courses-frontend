import {z} from 'zod'
import {Api, ApiSchema} from '../fetcher'
import {userType} from "@/api/commonType";


export const schema = {
  params: z.object({
    lessonTemplateId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    number: z.number(),
    maxMark: z.number(),
    successMark: z.number(),
    courseTemplateId: z.number(),
    chapterTemplateId: z.number(),
  }),
} satisfies ApiSchema

export const call = Api('/templates/lessons/lesson', schema, {method: 'GET'})
