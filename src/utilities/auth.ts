import { signIn } from '@/api/security'
import { z } from 'zod'
import { cookies } from './cookies'

type AuthData = z.infer<typeof signIn.schema.reply>

const cookieName = 'auth'

export const auth = {
  set(data: AuthData) {
    cookies.set(cookieName, JSON.stringify(data))
  },
  get(): AuthData | undefined {
    const data = cookies.get(cookieName)
    if (!data) return undefined
    return JSON.parse(data)
  },
  getOrThrow(): AuthData {
    const data = this.get()
    if (!data) throw new Error('No auth data found')
    return data
  },
  remove() {
    cookies.remove(cookieName)
  },
}
