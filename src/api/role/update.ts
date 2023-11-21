import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

const userType = z.enum(['ADMIN', 'STUDENT', 'INSTRUCTOR'])

export const schema = {
  body: z.object({
    type: userType,
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

export const call = Api('/users/user/role', schema, { method: 'PUT' })
