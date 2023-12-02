import { userType } from '@/api/commonType'
import { Api, ApiSchema } from '@/api/fetcher'
import { z } from 'zod'

export const schema = {
  params: z.object({
    courseId: z.number(),
    roleType: userType,
  }),
  reply: z.array(
    z.object({
      id: z.number(),
      mark: z.number(),
      finalFeedback: z.string().nullable(),
      user: z.object({
        id: z.number(),
        login: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        role: userType,
      }),
      course: z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        isFinished: z.boolean(),
      }),
      isPassed: z.boolean(),
    }),
  ),
} satisfies ApiSchema
export const call = Api('/courses/course/users', schema, { method: 'GET' })
