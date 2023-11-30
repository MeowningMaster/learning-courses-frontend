import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    courseId: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/courses/course', schema, {method: 'DELETE'})
