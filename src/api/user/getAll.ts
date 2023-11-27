import {z} from 'zod'
import {Api, ApiSchema} from '../fetcher'
import {userType} from "@/api/commonType";

export const schema = {
  reply: z.array(z.object({
    id: z.number(),
    login: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: userType
  })),
} satisfies ApiSchema

export const call = Api('/users', schema, {method: 'GET'})
