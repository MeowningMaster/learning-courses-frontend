import * as api from '@/api'
import { TemplateChapterList } from '@/components/chapter/list'
import { PageFallback } from '@/components/fallback/page'
import { Typography } from '@mui/material'
import React from 'react'
import { Suspense } from 'react'

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [course, chapters] = await Promise.all([
    api.template.course.get.call({ params: { courseTemplateId: id } }),
    api.template.course.getChaptersInCourseTemplate.call({
      params: { courseTemplateId: id },
    }),
  ])

  return (
    <>
      <div className="flex gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
      </div>
      <Typography variant="body1" color="text.secondary">
        {course.description}
      </Typography>

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Chapters
        </Typography>
      </div>

      <TemplateChapterList list={chapters} />
    </>
  )
}

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}
