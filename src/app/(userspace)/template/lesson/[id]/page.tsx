import * as api from '@/api'
import { PageFallback } from '@/components/fallback/page'
import { Chip, Typography } from '@mui/material'
import { Suspense } from 'react'

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [lesson] = await Promise.all([
    api.lesson.get.call({ params: { lessonId: id } }),
  ])

  return (
    <>
      <div className="flex gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {lesson.title}
        </Typography>
        {lesson.isFinished && (
          <Chip label="Finished" variant="outlined" color="warning" />
        )}
      </div>
      <Typography variant="body1" color="text.secondary">
        {lesson.description}
      </Typography>

      {/* <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Lessons
        </Typography>
      </div> */}
    </>
  )
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}
