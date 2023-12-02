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

type List = z.infer<typeof course.getAllChaptersInCourse.schema.reply>
type Chapter = List[number]
export type CardActions = {
  click?: (chapter: Chapter) => void
}

function ChapterCard({
  chapter,
  actions,
}: { chapter: Chapter; actions?: CardActions }) {
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
