import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  params: z.object({
    userId: z.number(),
  }),
} satisfies ApiSchema

export const call = Api('/users/user', schema, { method: 'DELETE' })
