import clientCookies from 'js-cookie'
import { isServerSide } from './context-checker'

async function getServerCookies() {
  const { cookies: serverCookies } = await import('next/headers')
  return serverCookies
}

export const cookies = {
  async get(key: string): Promise<string | undefined> {
    if (isServerSide()) {
      const serverCookies = await getServerCookies()
      return serverCookies().get(key)?.value
    }
    return clientCookies.get(key)
  },
  async set(key: string, value: string) {
    if (isServerSide()) {
      const serverCookies = await getServerCookies()
      serverCookies().set(key, value)
    } else {
      clientCookies.set(key, value)
    }
  },
  async remove(key: string) {
    if (isServerSide()) {
      const serverCookies = await getServerCookies()
      serverCookies().delete(key)
    } else {
      clientCookies.remove(key)
    }
  },
}
