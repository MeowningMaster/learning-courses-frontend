import { course } from '@/api'
import { CatalogCourseList } from '@/components/course/list'
import { Suspense } from 'react'

async function Context() {
  const courses = await course.getAll.call()
  return <CatalogCourseList list={courses} />
}

export default function CoursesCatalog() {
  return (
    <>
      <Suspense>
        <Context />
      </Suspense>
    </>
  )
}
