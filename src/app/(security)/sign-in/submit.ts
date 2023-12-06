'use server'

import { security } from '@/api'
import { auth } from '@/utilities/auth'
import { redirect } from 'next/navigation'

export async function submitSignIn(data: FormData) {
  const dataObject = Object.fromEntries(data.entries())
  const crendentials = security.signIn.schema.body.parse(dataObject)

  const authData = await security.signIn.call({
    body: crendentials,
    canFail: true,
  })

  if (!authData) {
    return 'Bad credentials'
  }

  auth.set(authData)
  redirect('/')
}
