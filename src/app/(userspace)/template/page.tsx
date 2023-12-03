import { template } from '@/api'
import { TemplateCourseList } from '@/components/course/list'
import ListFallback from '@/components/fallback/list'
import { Typography } from '@mui/material'
import { Suspense } from 'react'

async function Context() {
  const courses = await template.course.getAll.call()
  return <TemplateCourseList list={courses} />
}

export default function CoursesCatalog() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Courses templates
      </Typography>
      <Suspense fallback={<ListFallback />}>
        <Context />
      </Suspense>
    </>
  )
}
