import * as api from '@/api'
import { DeleteButton } from '@/components/delete-button'
import { PageFallback } from '@/components/fallback/page'
import { TemplateLessonList } from '@/components/lesson/list'
import { Edit } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function remove({
  id,
  courseTemplateId,
}: { id: number; courseTemplateId: number }) {
  'use server'
  await api.template.chapter.delete_.call({ params: { chapterTemplateId: id } })
  redirect(`/template/course/${courseTemplateId}`)
}

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [chapter, lessons] = await Promise.all([
    api.template.chapter.get.call({ params: { chapterTemplateId: id } }),
    api.template.chapter.getLessonsInChapterTemplate.call({
      params: { chapterTemplateId: id },
    }),
  ])

  return (
    <>
      <div className="flex gap-4 justify-between">
        <Typography gutterBottom variant="h5" component="div">
          {chapter.title}
        </Typography>

        <div className="flex gap-4">
          <Button
            variant="outlined"
            startIcon={<Edit />}
            href={`/template/chapter/${id}/edit`}
            className="h-fit"
          >
            Edit
          </Button>
          <DeleteButton object={chapter} remove={remove} />
        </div>
      </div>
      <Typography variant="body1" color="text.secondary">
        {chapter.description}
      </Typography>

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Lessons
        </Typography>
      </div>

      <TemplateLessonList list={lessons} />
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
