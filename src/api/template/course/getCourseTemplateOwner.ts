import { userType } from '@/api/commonType'
import { z } from 'zod'
import { Api, ApiSchema } from '../../fetcher'

export const schema = {
  params: z.object({
    courseTemplateId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    login: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: userType,
  }),
} satisfies ApiSchema

export const call = Api('/templates/courses/course/users/owner', schema, {
  method: 'GET',
})
