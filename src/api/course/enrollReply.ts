import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    enrollRequestId: z.number(),
    isApproved: z.boolean(),
  }),
} satisfies ApiSchema
export const call = Api('/courses/course/enrolls/enroll', schema, {
  method: 'PUT',
})
