import * as api from '@/api'
import ListFallback from '@/components/fallback/list'
import { Suspense } from 'react'
import { EnrollsList } from './list'

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<ListFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}

async function Content({ id }: { id: number }) {
  const users = await api.course.getInfoOfUsersInCourse.call({
    params: { courseId: id },
  })

  return <EnrollsList users={users} courseId={id} />
}
