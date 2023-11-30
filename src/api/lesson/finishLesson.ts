import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    lessonId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    number: z.string(),
    maxMark: z.number(),
    chapterId: z.number(),
    courseId: z.number(),
    isFinished: z.boolean()
  })
} satisfies ApiSchema
export const call = Api('/lessons/lesson/finish', schema, {method: 'PUT'})
