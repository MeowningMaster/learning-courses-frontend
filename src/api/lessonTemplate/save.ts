import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  body: z.object({
    title: z.string(),
    description: z.string(),
    number: z.number(),
    maxMark: z.number(),
    successMark: z.number(),
  }),
  params: z.object({
    chapterTemplateId: z.number(),
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

export const call = Api('/templates/lessons', schema, { method: 'POST' })
