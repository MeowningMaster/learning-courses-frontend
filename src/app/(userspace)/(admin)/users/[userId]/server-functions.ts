'use server'
import * as api from '@/api'
import { redirect } from 'next/navigation'

export async function save(data: FormData) {
  const dataObject = Object.fromEntries(data.entries()) as Record<
    string,
    unknown
  >
  dataObject.password ||= undefined
  const user = api.user.create.schema.body.parse(dataObject)
  console.log(user)

  await api.user.update.call({
    body: user,
    params: { userId: Number(dataObject.id) },
  })
  redirect('/users')
}

export async function remove(userId: number) {
  await api.user.delete_.call({ params: { userId } })
  redirect('/users')
}
