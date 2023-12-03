import * as api from '@/api'
import { DeleteButton } from '@/components/button/delete'
import { PageFallback } from '@/components/fallback/page'
import { Edit } from '@mui/icons-material'
import { Button, Chip, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}

async function remove({
  id,
  chapterTemplateId,
}: { id: number; chapterTemplateId: number }) {
  'use server'
  await api.template.lesson.delete_.call({ params: { lessonTemplateId: id } })
  redirect(`/template/chapter/${chapterTemplateId}`)
}

async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [lesson] = await Promise.all([
    api.template.lesson.get.call({ params: { lessonTemplateId: id } }),
  ])

  return (
    <>
      <div className="flex gap-4 justify-between">
        <Typography gutterBottom variant="h5" component="div">
          {lesson.title}
        </Typography>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            startIcon={<Edit />}
            href={`/template/lesson/${id}/edit`}
            className="h-fit"
          >
            Edit
          </Button>
          <DeleteButton object={lesson} remove={remove} />
        </div>
      </div>
      <Typography variant="body1" color="text.secondary">
        {lesson.description}
      </Typography>
      <div className="mt-4 flex gap-4">
        <Chip label={`Max mark: ${lesson.maxMark}`} />
        <Chip label={`Success mark: ${lesson.successMark}`} />
      </div>
    </>
  )
}
