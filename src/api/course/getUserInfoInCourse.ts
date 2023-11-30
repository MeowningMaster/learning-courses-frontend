import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    courseId: z.number(),
    userId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    mark: z.number(),
    userId: z.number(),
    courseId: z.number(),
    finalFeedback: z.string().nullable(),
    isPassed: z.boolean(),
  })
} satisfies ApiSchema
export const call = Api('/courses/course/users/user', schema, {method: 'GET'})
