import * as api from '@/api'
import { FinishButton } from '@/components/button/finish'
import { PageFallback } from '@/components/fallback/page'
import { auth } from '@/utilities/auth'
import { getPermissions } from '@/utilities/permissions'
import { Chip, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import { Fragment, Suspense } from 'react'
import { z } from 'zod'
import { SubmissionsList } from './submission/list'
import { FileInfo, UploadForm } from './upload-form'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}

async function finish({ id, chapterId }: { id: number; chapterId: number }) {
  'use server'
  await api.lesson.finishLesson.call({ params: { lessonId: id } })
  redirect(`/chapter/${chapterId}`)
}

async function Content(params: { id: number }) {
  const id = Number(params.id)
  const user = auth.getOrThrow()
  const [lesson, markInfo, homeworkInfo] = await Promise.all([
    api.lesson.get.call({ params: { lessonId: id } }),
    api.userToLesson.get.call({ params: { lessonId: id }, canFail: true }),
    api.file.getHomeworkInfo.call({
      params: { lessonId: id, userId: user.id },
      canFail: true,
    }),
  ])

  const canOperate = getPermissions().course.operate
  const canSubmitHomework =
    user.role === 'STUDENT' && markInfo && !lesson.isFinished

  async function submitHomework(data: FormData): Promise<FileInfo> {
    'use server'

    const reply = await api.file.submitHomework.call({
      params: { lessonId: id },
      body: data,
    })

    return { id: reply.id, name: reply.title }
  }

  const initialFile: FileInfo | undefined = homeworkInfo
    ? { id: homeworkInfo.id, name: homeworkInfo.title }
    : undefined

  async function deleteFile() {
    'use server'
    await api.file.delete.call({ params: { lessonId: id, userId: user.id } })
  }

  return (
    <>
      <div className="flex gap-4 justify-between flex-wrap-reverse">
        <div className="flex gap-4">
          <Typography gutterBottom variant="h5" component="div">
            {lesson.title}
          </Typography>
          {lesson.isFinished && (
            <Chip label="Finished" variant="outlined" color="warning" />
          )}
          {markInfo && (
            <Chip
              label={`Mark: ${markInfo.mark}`}
              color={markInfo.isPassed ? 'success' : 'warning'}
              variant="outlined"
            />
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

      {canSubmitHomework && (
        <UploadForm
          submit={submitHomework}
          initialFile={initialFile}
          deleteFile={deleteFile}
          lessonId={id}
        />
      )}

      <SubmissionsListWrapper lesson={lesson} />
    </>
  )
}

type Lesson = z.infer<typeof api['lesson']['get']['schema']['reply']>
async function SubmissionsListWrapper({ lesson }: { lesson: Lesson }) {
  const user = auth.getOrThrow()
  if (user.role !== 'INSTRUCTOR') return

  const instructors = await api.course.getInfoOfUsersInCourse.call({
    params: { courseId: lesson.courseId, roleType: 'INSTRUCTOR' },
  })
  const isLocalInstructor = instructors.some(
    ({ user: { id } }) => id === user.id,
  )

  if (!isLocalInstructor) return

  const submissions = await api.userToLesson.homeworkSubmissions.call({
    params: { lessonId: lesson.id },
  })

  const users = await Promise.all(
    submissions.map((submission) =>
      api.user.get.call({ params: { userId: submission.userId } }),
    ),
  )

  return (
    <>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ marginTop: '1rem' }}
      >
        Submissions
      </Typography>
      {submissions.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          There is no submissions yet 🙌
        </Typography>
      ) : (
        <SubmissionsList
          submissions={submissions}
          users={users}
          lessonId={lesson.id}
        />
      )}
    </>
  )
}
