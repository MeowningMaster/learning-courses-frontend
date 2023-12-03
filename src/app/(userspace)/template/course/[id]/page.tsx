import * as api from '@/api'
import { TemplateChapterList } from '@/components/chapter/list'
import { DeleteButton } from '@/components/delete-button'
import { PageFallback } from '@/components/fallback/page'
import { Edit } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import React from 'react'
import { Suspense } from 'react'

async function remove({ id }: { id: number }) {
  'use server'
  await api.template.course.delete_.call({ params: { courseTemplateId: id } })
  redirect('/template')
}

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
      <div className="flex gap-4 justify-between">
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            startIcon={<Edit />}
            href={`/template/course/${id}/edit`}
            className="h-fit"
          >
            Edit
          </Button>
          <DeleteButton object={course} remove={remove} />
        </div>
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
