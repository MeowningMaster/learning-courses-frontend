'use client'

import { course } from '@/api'
import { SemiPartial } from '@/utilities/types/semi-partial'
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { z } from 'zod'

type FullLesson = z.infer<
  typeof course.getAllLessonsInCourse.schema.reply
>[number]
type Lesson = Omit<
  SemiPartial<FullLesson, 'isFinished' | 'courseId' | 'chapterId'>,
  'number'
> & { mark?: number; isPassed?: number }
type List = Lesson[]
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
            <div className="flex gap-4">
              {lesson.isFinished === true && (
                <Chip label="Finished" variant="outlined" color="warning" />
              )}
              {typeof lesson.mark === 'number' && (
                <Chip
                  label={`Mark: ${lesson.mark}`}
                  variant="outlined"
                  color={lesson.isPassed ? 'success' : 'warning'}
                />
              )}
            </div>
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

export function TemplateLessonList({ list }: { list: List }) {
  const router = useRouter()
  return (
    <LessonList
      list={list}
      actions={{
        click: (lesson) => {
          router.push(`/template/lesson/${lesson.id}`)
        },
      }}
    />
  )
}
