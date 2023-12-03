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

type Chapter = z.infer<
  typeof course.getAllChaptersInCourse.schema.reply
>[number]
type PartialChapter = SemiPartial<Chapter, 'isFinished' | 'courseId'>
type List = PartialChapter[]

export type CardActions = {
  click?: (chapter: PartialChapter) => void
}

function ChapterCard({
  chapter,
  actions,
}: { chapter: PartialChapter; actions?: CardActions }) {
  return (
    <Card key={chapter.id} onClick={() => actions?.click?.(chapter)}>
      <CardActionArea>
        <CardContent>
          <div className="flex justify-between">
            <Typography gutterBottom variant="h5" component="div">
              {chapter.title}
            </Typography>
            {chapter.isFinished && (
              <Chip label="Finished" variant="outlined" color="warning" />
            )}
          </div>

          <Typography variant="body2" color="text.secondary">
            {chapter.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export function ChapterList({
  list,
  actions,
}: { list: List; actions?: CardActions }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {list.map((chapter) => ChapterCard({ chapter, actions }))}
      </div>
    </>
  )
}

export function CatalogChapterList({ list }: { list: List }) {
  const router = useRouter()
  return (
    <ChapterList
      list={list}
      actions={{
        click: (chapter) => {
          router.push(`/chapter/${chapter.id}`)
        },
      }}
    />
  )
}

export function TemplateChapterList({ list }: { list: List }) {
  const router = useRouter()
  return (
    <ChapterList
      list={list}
      actions={{
        click: (chapter) => {
          router.push(`/chapter/${chapter.id}`)
        },
      }}
    />
  )
}
