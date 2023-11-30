import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";

export const schema = {
  params: z.object({
    enrollRequestId: z.number(),
    isApproved: z.boolean()
  }),
  reply: z.object({
    // TODO: access denied
  })
} satisfies ApiSchema
export const call = Api('/courses/course/enrolls/enroll', schema, {method: 'PUT'})
