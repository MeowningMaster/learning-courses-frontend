import {z} from "zod";
import {Api, ApiSchema} from "@/api/fetcher";
import {userType} from "@/api/commonType";

export const schema = {
  params: z.object({
    courseId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    login: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: userType
  })
} satisfies ApiSchema
export const call = Api('/courses/course/users/owner', schema, {method: 'GET'})
