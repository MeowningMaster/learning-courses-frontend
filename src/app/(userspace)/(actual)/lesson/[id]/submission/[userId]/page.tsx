import { PageFallback } from '@/components/fallback/page'
import { Suspense } from 'react'

export default function Page({
  params: { id, userId },
}: { params: { id: string; userId: string } }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Content id={Number(id)} userId={Number(userId)} />
    </Suspense>
  )
}

import * as api from '@/api'
import {Chip, Typography} from '@mui/material'
import { DownloadButton } from './download-button'
import { GradeForm } from './grade-form'

async function Content({
  id: lessonId,
  userId,
}: { id: number; userId: number }) {
  const [fileInfo, submitter, grades, lesson] = await Promise.all([
    api.file.getHomeworkInfo.call({ params: { lessonId, userId } }),
    api.user.get.call({ params: { userId } }),
    api.userToLesson.homeworkSubmissions.call({ params: { lessonId } }),
    api.lesson.get.call({ params: { lessonId } }),
  ])

  const gradeInfo = grades.find(({ userId }) => userId === submitter.id)
  if (!gradeInfo) throw new Error('No grade info')

  async function grade(data: FormData) {
    'use server'
    const mark = Number(data.get('mark'))
    await api.userToLesson.gradeHomework.call({
      params: { lessonId, userId },
      body: { mark },
    })
  }

  return (
    <>
      <Typography variant="h5" component="div">
        {submitter.firstName}`s homework
      </Typography>
      <div className="mt-4 flex gap-4">
        <Chip label={`Max mark: ${lesson.maxMark}`}/>
        <Chip label={`Success mark: ${lesson.successMark}`}/>
      </div>
      {fileInfo && (
        <DownloadButton
          fileInfo={fileInfo}
          lessonId={lessonId}
          submitter={submitter}
        />)}
      <GradeForm
        gradeInfo={{mark: gradeInfo.mark, maxMark: lesson.maxMark}}
        grade={grade}
      />
    </>
  )
}
