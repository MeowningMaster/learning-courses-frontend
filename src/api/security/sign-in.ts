import { z } from 'zod'
import { userType } from '../commonType'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  body: z.object({
    login: z.string(),
    password: z.string(),
  }),
  reply: z.object({
    id: z.number().int(),
    login: z.string().email(),
    role: userType,
    token: z.string(),
  }),
} satisfies ApiSchema

export const call = Api('/sign-in', schema)
