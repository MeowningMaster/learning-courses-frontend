import { course } from '@/api'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { z } from 'zod'

type List = z.infer<typeof course.getAll.schema.reply>

function CourseCard({ course }: { course: List[number] }) {
  return (
    <Card key={course.id}>
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

export function CourseList({ list }: { list: List }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {list.map((course) => CourseCard({ course }))}
      </div>
    </>
  )
}
