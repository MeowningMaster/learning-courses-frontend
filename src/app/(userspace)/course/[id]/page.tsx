import * as api from '@/api'
import { Chip, Typography } from '@mui/material'

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
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
