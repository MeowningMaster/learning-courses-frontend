import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    lessonId: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/lessons/lesson', schema, {method: 'DELETE'})
