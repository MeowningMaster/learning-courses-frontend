import * as api from '@/api'
import { CatalogChapterList } from '@/components/chapter/list'
import { ListFallback } from '@/components/list-fallback'
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
import React from 'react'
import { Suspense } from 'react'
import { z } from 'zod'

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [course, chapters, Instructors] = await Promise.all([
    api.course.get.call({ params: { courseId: id } }),
    api.course.getAllChaptersInCourse.call({ params: { courseId: id } }),
    api.course.getInfoOfUsersInCourse.call({
      params: { courseId: id, roleType: 'INSTRUCTOR' },
    }),
  ])

  return (
    <>
      <div className="flex gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        {!course.isFinished && (
          <Chip label="Ongoing" variant="outlined" color="success" />
        )}
      </div>
      <Typography variant="body1" color="text.secondary">
        {course.description}
      </Typography>

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Instructors
        </Typography>
      </div>

      <InstructorsList list={Instructors} />

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

function InstructorsList({ list }: { list: Instructors }) {
  return (
    <List className="w-fit">
      {list.map(({ user }, index) => {
        return (
          <React.Fragment key={user.id}>
            {index !== 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar />
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

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<ListFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}
