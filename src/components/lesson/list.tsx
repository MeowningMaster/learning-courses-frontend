'use client'

import { course } from '@/api'
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { z } from 'zod'

type List = z.infer<typeof course.getAllLessonsInCourse.schema.reply>
type Lesson = List[number]
export type LessonCardActions = {
  click?: (lesson: Lesson) => void
}

function LessonCard({
  lesson,
  actions,
}: { lesson: Lesson; actions?: LessonCardActions }) {
  return (
    <Card key={lesson.id} onClick={() => actions?.click?.(lesson)}>
      <CardActionArea>
        <CardContent>
          <div className="flex justify-between">
            <Typography gutterBottom variant="h5" component="div">
              {lesson.title}
            </Typography>
            {lesson.isFinished && (
              <Chip label="Finished" variant="outlined" color="warning" />
            )}
          </div>

          <Typography variant="body2" color="text.secondary">
            {lesson.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export function LessonList({
  list,
  actions,
}: { list: List; actions?: LessonCardActions }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {list.map((lesson) => LessonCard({ lesson, actions }))}
      </div>
    </>
  )
}

export function CatalogLessonList({ list }: { list: List }) {
  const router = useRouter()
  return (
    <LessonList
      list={list}
      actions={{
        click: (lesson) => {
          router.push(`/lesson/${lesson.id}`)
        },
      }}
    />
  )
}
