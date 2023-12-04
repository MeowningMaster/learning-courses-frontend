import * as api from '@/api'
import { DeleteButton } from '@/components/button/delete'
import { EnrollButton } from '@/components/button/enroll'
import { FinishButton } from '@/components/button/finish'
import { CatalogChapterList } from '@/components/chapter/list'
import { PageFallback } from '@/components/fallback/page'
import { auth } from '@/utilities/auth'
import { getPermissions } from '@/utilities/permissions'
import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors'
import { redirect } from 'next/navigation'
import React from 'react'
import { Suspense } from 'react'
import { z } from 'zod'

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

async function remove({ id }: { id: number }) {
  'use server'
  await api.course.delete.call({ params: { courseId: id } })
  redirect('/')
}

async function finish({ id }: { id: number }) {
  'use server'
  await api.course.finish.call({ params: { courseId: id } })
  redirect('/')
}

async function enroll({ id }: { id: number }) {
  'use server'
  await api.course.enroll.call({ params: { courseId: id }, canFail: true })
}

async function Content(params: { id: number }) {
  const id = Number(params.id)

  const user = auth.getOrThrow()
  const [course, chapters, instructors, owner, userInfo, enrollDetails] =
    await Promise.all([
      api.course.get.call({ params: { courseId: id } }),
      api.course.getAllChaptersInCourse.call({ params: { courseId: id } }),
      api.course.getInfoOfUsersInCourse.call({
        params: { courseId: id, roleType: 'INSTRUCTOR' },
      }),
      api.course.getOwner.call({ params: { courseId: id } }),
      api.userToCourse.get.call({ params: { courseId: id }, canFail: true }),
      api.course.getUsersLastEnrollRequest.call({
        params: { courseId: id, userId: user.id },
        canFail: true,
      }),
    ])

  const canOperate =
    getPermissions().course.operate &&
    (user.role === 'ADMIN' || owner.id === user.id)

  const isEnrolled = enrollDetails?.isApproved
  const canEnroll =
    getPermissions().course.enroll && !course.isFinished && owner.id !== user.id

  const canSeeResults = isEnrolled && user.role === 'STUDENT'

  return (
    <>
      <div className="flex gap-4 justify-between flex-wrap-reverse">
        <div className="flex gap-4">
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          {!course.isFinished && (
            <Chip label="Ongoing" variant="outlined" color="success" />
          )}
          {canSeeResults && (
            <Chip
              label={`Mark: ${userInfo.mark}`}
              color={userInfo.isPassed ? 'success' : 'warning'}
              variant="outlined"
            />
          )}
        </div>
        <div className="flex gap-4">
          {canEnroll && (
            <EnrollButton
              object={course}
              enroll={enroll}
              details={enrollDetails}
            />
          )}
          {canOperate && !course.isFinished && (
            <FinishButton object={course} finish={finish} />
          )}
          {canOperate && <DeleteButton object={course} remove={remove} />}
        </div>
      </div>
      <Typography variant="body1" color="text.secondary">
        {course.description}
      </Typography>

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Instructors
        </Typography>
      </div>

      <InstructorsList list={instructors} ownerId={owner.id} />
      {canSeeResults && userInfo.finalFeedback && (
        <>
          <div className="mt-10">
            <Typography gutterBottom variant="h5" component="div">
              Final feedback
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userInfo.finalFeedback}
            </Typography>
          </div>
        </>
      )}
      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Chapters
        </Typography>
      </div>

      <CatalogChapterList list={chapters} />
    </>
  )
}

type Instructors = z.infer<
  typeof api.course.getInfoOfUsersInCourse.schema.reply
>

function InstructorsList({
  list,
  ownerId,
}: { list: Instructors; ownerId: number }) {
  return (
    <List className="w-fit">
      {list.map(({ user }, index) => {
        return (
          <React.Fragment key={user.id}>
            {index !== 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: deepPurple[500],
                    border:
                      user.id === ownerId
                        ? `2px solid ${deepOrange[500]}`
                        : undefined,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.login}
              />
            </ListItem>
          </React.Fragment>
        )
      })}
    </List>
  )
}
