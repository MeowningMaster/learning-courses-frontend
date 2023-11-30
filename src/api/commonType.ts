import {z} from "zod";

export const userType = z.enum(['ADMIN', 'STUDENT', 'INSTRUCTOR'])
