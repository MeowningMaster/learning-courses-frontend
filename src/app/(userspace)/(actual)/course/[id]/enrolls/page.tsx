import * as api from '@/api'
import ListFallback from '@/components/fallback/list'
import { Suspense } from 'react'
import { EnrollReply, EnrollsList } from './list'

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<ListFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}

const reply: EnrollReply = async (enroll, action) => {
  'use server'
  await api.course.enrollReply.call({
    params: { enrollRequestId: enroll.id, isApproved: action === 'accept' },
    canFail: true,
  })
}

async function Content({ id }: { id: number }) {
  const enrolls = await api.course.showAllEnrolls.call({
    params: { courseId: id, isActive: true },
  })
  const users = await Promise.all(
    enrolls.map(({ userId }) => api.user.get.call({ params: { userId } })),
  )

  const enrollsWithUsers = enrolls.map((enroll, index) => ({
    ...enroll,
    user: users[index],
  }))

  return <EnrollsList enrolls={enrollsWithUsers} reply={reply} />
}
