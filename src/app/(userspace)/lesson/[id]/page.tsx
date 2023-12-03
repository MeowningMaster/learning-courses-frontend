import * as api from '@/api'
import { FinishButton } from '@/components/button/finish'
import { PageFallback } from '@/components/fallback/page'
import { getPermissions } from '@/utilities/permissions'
import { Chip, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function finish({ id, chapterId }: { id: number; chapterId: number }) {
  'use server'
  await api.lesson.finishLesson.call({ params: { lessonId: id } })
  redirect(`/chapter/${chapterId}`)
}

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [lesson] = await Promise.all([
    api.lesson.get.call({ params: { lessonId: id } }),
  ])

  const canOperate = getPermissions().course.operate

  return (
    <>
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <Typography gutterBottom variant="h5" component="div">
            {lesson.title}
          </Typography>
          {lesson.isFinished && (
            <Chip label="Finished" variant="outlined" color="warning" />
          )}
        </div>
        <div className="flex gap-4">
          {canOperate && !lesson.isFinished && (
            <FinishButton object={lesson} finish={finish} />
          )}
        </div>
      </div>
      <Typography variant="body1" color="text.secondary">
        {lesson.description}
      </Typography>
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
