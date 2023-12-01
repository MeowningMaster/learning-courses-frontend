import { course } from '@/api'
import { CatalogCourseList } from '@/components/course/list'
import { Skeleton } from '@mui/material'
import { Suspense } from 'react'

async function Context() {
  const courses = await course.getAll.call()
  return <CatalogCourseList list={courses} />
}

async function Fallback() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton variant="rounded" height={100} />
      <Skeleton variant="rounded" height={80} />
      <Skeleton variant="rounded" height={100} />
      <Skeleton variant="rounded" height={80} />
    </div>
  )
}

export default function CoursesCatalog() {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Context />
      </Suspense>
    </>
  )
}
