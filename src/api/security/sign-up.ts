import { z } from 'zod'
import { Api, ApiSchema } from '..'

export const schema = {
  body: z.object({
    login: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  reply: z.object({
    id: z.string(),
  }),
} satisfies ApiSchema

export const signUp = Api('/sign-up', schema)
