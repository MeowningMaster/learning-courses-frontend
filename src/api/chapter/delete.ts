import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    chapterId: z.number(),
  }),
} satisfies ApiSchema
export const call = Api('/chapters/chapter', schema, {method: 'GET'})
