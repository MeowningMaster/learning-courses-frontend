'use client'

import { course } from '@/api'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { redirect, useRouter } from 'next/navigation'
import { z } from 'zod'

type List = z.infer<typeof course.getAll.schema.reply>
export type CourseCardActions = {
  click?: (id: number) => void
}

function CourseCard({
  course,
  actions,
}: { course: List[number]; actions?: CourseCardActions }) {
  return (
    <Card key={course.id} onClick={() => actions?.click?.(course.id)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export function CourseList({
  list,
  actions,
}: { list: List; actions?: CourseCardActions }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {list.map((course) => CourseCard({ course, actions }))}
      </div>
    </>
  )
}

export function CatalogCourseList({ list }: { list: List }) {
  const router = useRouter()
  return (
    <CourseList
      list={list}
      actions={{
        click: (id) => {
          router.push(`/course/${id}`)
        },
      }}
    />
  )
}
