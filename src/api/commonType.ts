import { z } from 'zod'

export type UserType = z.infer<typeof userType>
export const userType = z.enum(['ADMIN', 'STUDENT', 'INSTRUCTOR'])
