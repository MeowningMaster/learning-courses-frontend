import * as api from '@/api'
import { PageFallback } from '@/components/fallback/page'
import { TemplateLessonList } from '@/components/lesson/list'
import { Typography } from '@mui/material'
import { Suspense } from 'react'

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
      <div className="flex gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {chapter.title}
        </Typography>
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
