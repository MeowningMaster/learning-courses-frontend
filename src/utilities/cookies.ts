import clientCookies from 'js-cookie'
import type { cookies as nextCookies } from 'next/headers'
import { isServerSide } from './context-checker'

let serverCookies: typeof nextCookies
if (isServerSide()) {
  serverCookies = require('next/headers').cookies
}

export const cookies = {
  get(key: string): string | undefined {
    if (isServerSide()) {
      return serverCookies().get(key)?.value
    }
    return clientCookies.get(key)
  },
  set(key: string, value: string) {
    if (isServerSide()) {
      serverCookies().set(key, value)
    } else {
      clientCookies.set(key, value)
    }
  },
  remove(key: string) {
    if (isServerSide()) {
      serverCookies().delete(key)
    } else {
      clientCookies.remove(key)
    }
  },
}
