import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    chapterId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    number: z.string(),
    courseId: z.number(),
    isFinished: z.boolean()
  })
} satisfies ApiSchema
export const call = Api('/chapters/chapter', schema, {method: 'GET'})
