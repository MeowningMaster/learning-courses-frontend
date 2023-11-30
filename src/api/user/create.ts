import { userType } from '@/api/commonType'
import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  body: z.object({
    id: z.number(),
    login: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: userType,
  }),
  params: z.object({
    userId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    login: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: userType,
  }),
} satisfies ApiSchema

export const call = Api('/users', schema, { method: 'POST' })
