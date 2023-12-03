import { course } from '@/api'
import { CatalogCourseList } from '@/components/course/list'
import ListFallback from '@/components/fallback/list'
import { Typography } from '@mui/material'
import { Suspense } from 'react'

export default function CoursesCatalog() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Courses catalog
      </Typography>
      <Suspense fallback={<ListFallback />}>
        <Context />
      </Suspense>
    </>
  )
}

async function Context() {
  const courses = await course.getAll.call()
  return <CatalogCourseList list={courses} />
}
