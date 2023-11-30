import { userType } from '@/api/commonType'
import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  reply: z.object({
    id: z.number(),
    login: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: userType,
  }),
} satisfies ApiSchema

export const call = Api('/self', schema, { method: 'GET' })
