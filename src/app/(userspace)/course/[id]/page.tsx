import * as api from '@/api'
import { Chip, Typography } from '@mui/material'

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
  const id = Number(params.id)
  const course = await api.course.get.call({ params: { courseId: id } })

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
    </>
  )
}
