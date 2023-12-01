import * as api from '@/api'
import { Chip, Skeleton, Typography } from '@mui/material'
import { Suspense } from 'react'

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const course = await api.course.get.call({ params: { courseId: id } })
  const lessons = await api.course.getAllLessonsInCourse.call({
    params: { courseId: id },
  })

  return (
    <>
      <div className="flex gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        {!course.isFinished && (
          <Chip label="Ongoing" variant="outlined" color="success" />
        )}
      </div>
      <Typography variant="body1" color="text.secondary">
        {course.description}
      </Typography>

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Lessons
        </Typography>

        {JSON.stringify(lessons)}
      </div>
    </>
  )
}

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}

export function Fallback() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Skeleton variant="text" height={60} width="60%" />
        <Skeleton variant="text" height={40} width="40%" />
      </div>
      <Skeleton variant="text" height={60} width="60%" />
      <Skeleton variant="rounded" height={80} />
      <Skeleton variant="rounded" height={100} />
      <Skeleton variant="rounded" height={80} />
    </div>
  )
}
