import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    courseId: z.number(),
  }),
  reply: z.object({
    // TODO: access denied
  }),
} satisfies ApiSchema
export const call = Api('/courses/course/enrolls', schema, {method: 'GET'})
