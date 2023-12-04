import { userToCourse } from '@/api'
import { CatalogCourseList } from '@/components/course/list'
import ListFallback from '@/components/fallback/list'
import { Typography } from '@mui/material'
import { Suspense } from 'react'

export default function EnrolledCourses() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Enrolled courses
      </Typography>
      <Suspense fallback={<ListFallback />}>
        <Context />
      </Suspense>
    </>
  )
}

async function Context() {
  const courses = await userToCourse.getAll.call()
  return <CatalogCourseList list={courses} />
}
