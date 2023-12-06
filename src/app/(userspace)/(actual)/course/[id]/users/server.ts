'use server'

import * as api from '@/api'

export async function remove(params: { userId: number; courseId: number }) {
  console.log('remove', params)
  await api.course.deleteUserFromCourse.call({
    params,
    canFail: true,
  })
}
